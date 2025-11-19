import json
import openpyxl
from pathlib import Path

# Subject mapping from filenames to app subject IDs
SUBJECT_MAP = {
    'C_500_QA': 'pds',  # Programming & Data Structures (C Programming)
    'ALGO_500_QA': 'algo',
    'CA_500_QA': 'coa',  # Computer Architecture
    'DS_500_QA': 'ds'
}

def read_excel_questions(excel_file):
    """Read questions from an Excel file"""
    questions = []
    
    try:
        workbook = openpyxl.load_workbook(excel_file)
        sheet = workbook.active
        
        # Try to detect header row
        headers = []
        for cell in sheet[1]:
            if cell.value:
                headers.append(str(cell.value).strip().lower())
        
        print(f"  Headers detected: {headers}")
        
        # Find column indices
        question_col = None
        option_cols = []
        answer_col = None
        explanation_col = None
        
        for idx, header in enumerate(headers):
            if 'question' in header:
                question_col = idx
            elif 'option' in header or header in ['a', 'b', 'c', 'd']:
                option_cols.append(idx)
            elif 'answer' in header or 'correct' in header:
                answer_col = idx
            elif 'explanation' in header or 'solution' in header:
                explanation_col = idx
        
        # Read data rows (skip header)
        for row_idx, row in enumerate(sheet.iter_rows(min_row=2, values_only=True), start=2):
            if not row or not any(row):  # Skip empty rows
                continue
            
            # Get question
            if question_col is None or question_col >= len(row):
                continue
            question_text = row[question_col]
            if not question_text:
                continue
            
            # Get options
            options = []
            for col_idx in option_cols[:4]:  # Max 4 options
                if col_idx < len(row) and row[col_idx]:
                    options.append(str(row[col_idx]).strip())
            
            # Ensure we have 4 options
            while len(options) < 4:
                options.append("")
            
            # Get correct answer
            correct_answer = 0
            if answer_col is not None and answer_col < len(row) and row[answer_col]:
                answer_val = str(row[answer_col]).strip().upper()
                # Try to parse as A/B/C/D or 1/2/3/4 or 0/1/2/3
                if answer_val in ['A', '1']:
                    correct_answer = 0
                elif answer_val in ['B', '2']:
                    correct_answer = 1
                elif answer_val in ['C', '3']:
                    correct_answer = 2
                elif answer_val in ['D', '4']:
                    correct_answer = 3
                elif answer_val.isdigit():
                    num = int(answer_val)
                    if 0 <= num <= 3:
                        correct_answer = num
                    elif 1 <= num <= 4:
                        correct_answer = num - 1
            
            # Get explanation
            explanation = ""
            if explanation_col is not None and explanation_col < len(row) and row[explanation_col]:
                explanation = str(row[explanation_col]).strip()
            
            question_obj = {
                "question": str(question_text).strip(),
                "options": options,
                "correctAnswer": correct_answer,
                "explanation": explanation if explanation else "Solution not provided."
            }
            
            questions.append(question_obj)
        
        workbook.close()
        
    except Exception as e:
        print(f"  Error reading {excel_file}: {e}")
        return []
    
    return questions

def merge_with_existing(new_questions_by_subject):
    """Merge new questions with existing questions.js"""
    questions_file = Path('src/data/questions.js')
    
    # Read existing questions
    existing_questions = {}
    if questions_file.exists():
        with open(questions_file, 'r', encoding='utf-8') as f:
            content = f.read()
            json_start = content.find('{')
            json_end = content.rfind('}') + 1
            if json_start != -1 and json_end > json_start:
                json_str = content[json_start:json_end]
                existing_questions = json.loads(json_str)
    
    # Merge
    for subject, questions in new_questions_by_subject.items():
        if subject in existing_questions:
            existing_questions[subject].extend(questions)
        else:
            existing_questions[subject] = questions
    
    # Reassign IDs
    for subject in existing_questions:
        for idx, q in enumerate(existing_questions[subject]):
            q['id'] = idx + 1
    
    # Write back
    js_content = f"export const questionsData = {json.dumps(existing_questions, indent=2)};"
    with open(questions_file, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    return existing_questions

def main():
    print("=" * 60)
    print("  Excel Question Importer")
    print("=" * 60)
    
    # Find Excel files
    excel_files = list(Path('.').glob('*.xlsx'))
    excel_files = [f for f in excel_files if '~$' not in str(f)]  # Exclude temp files
    
    if not excel_files:
        print("\n❌ No Excel files found!")
        return
    
    print(f"\n📁 Found {len(excel_files)} Excel file(s):")
    for f in excel_files:
        print(f"   - {f.name}")
    
    all_new_questions = {}
    
    for excel_file in excel_files:
        print(f"\n📖 Reading {excel_file.name}...")
        
        # Determine subject from filename
        subject_id = None
        for key, value in SUBJECT_MAP.items():
            if key in excel_file.stem:
                subject_id = value
                break
        
        if not subject_id:
            print(f"  ⚠️  Could not determine subject for {excel_file.name}, skipping...")
            continue
        
        questions = read_excel_questions(excel_file)
        
        if questions:
            all_new_questions[subject_id] = questions
            print(f"  ✅ Imported {len(questions)} questions for subject '{subject_id}'")
        else:
            print(f"  ❌ No questions found in {excel_file.name}")
    
    if not all_new_questions:
        print("\n❌ No valid questions imported!")
        return
    
    print("\n" + "=" * 60)
    print("📊 Import Summary:")
    print("=" * 60)
    total = 0
    for subject, questions in all_new_questions.items():
        count = len(questions)
        total += count
        print(f"  {subject.upper():8} : {count:4} questions")
    print("=" * 60)
    print(f"  TOTAL   : {total:4} questions")
    print("=" * 60)
    
    print("\n🔄 Merging with existing questions...")
    final_questions = merge_with_existing(all_new_questions)
    
    print("\n✅ Successfully updated src/data/questions.js!")
    print("\n📊 Final question count per subject:")
    print("=" * 60)
    for subject, questions in sorted(final_questions.items()):
        print(f"  {subject.upper():8} : {len(questions):4} questions")
    print("=" * 60)
    print(f"\n🎉 Import complete! Total: {sum(len(q) for q in final_questions.values())} questions")

if __name__ == "__main__":
    main()

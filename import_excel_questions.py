import json
import csv
import os
from pathlib import Path

# Expected CSV format:
# Subject, Question, OptionA, OptionB, OptionC, OptionD, CorrectAnswer, Explanation

def import_from_csv(csv_path):
    """Import questions from a CSV file"""
    questions_by_subject = {}
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            subject = row.get('Subject', '').strip().lower()
            
            # Map subject names to IDs
            subject_map = {
                'operating systems': 'os',
                'os': 'os',
                'database': 'db',
                'dbms': 'db',
                'digital logic': 'dl',
                'networks': 'cn',
                'computer networks': 'cn',
                'algorithms': 'algo',
                'data structures': 'ds',
                'theory of computation': 'toc',
                'toc': 'toc',
                'compiler design': 'cd',
                'computer organization': 'coa',
                'coa': 'coa',
                'engineering mathematics': 'em',
                'mathematics': 'em'
            }
            
            subject_id = subject_map.get(subject, subject)
            
            if subject_id not in questions_by_subject:
                questions_by_subject[subject_id] = []
            
            question_obj = {
                "question": row.get('Question', '').strip(),
                "options": [
                    row.get('OptionA', '').strip(),
                    row.get('OptionB', '').strip(),
                    row.get('OptionC', '').strip(),
                    row.get('OptionD', '').strip()
                ],
                "correctAnswer": int(row.get('CorrectAnswer', 0)),
                "explanation": row.get('Explanation', '').strip()
            }
            
            questions_by_subject[subject_id].append(question_obj)
    
    return questions_by_subject

def merge_with_existing(new_questions):
    """Merge new questions with existing questions.js"""
    questions_file = Path('src/data/questions.js')
    
    # Read existing questions
    existing_questions = {}
    if questions_file.exists():
        with open(questions_file, 'r', encoding='utf-8') as f:
            content = f.read()
            # Extract JSON data from the export statement
            json_start = content.find('{')
            json_end = content.rfind('}') + 1
            if json_start != -1 and json_end > json_start:
                json_str = content[json_start:json_end]
                existing_questions = json.loads(json_str)
    
    # Merge
    for subject, questions in new_questions.items():
        if subject in existing_questions:
            # Append to existing
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
    print("=== Question Importer ===")
    print("\nLooking for CSV files...")
    
    # Look for CSV files in common locations
    csv_files = []
    for pattern in ['*.csv', '**/*.csv']:
        csv_files.extend(Path('.').glob(pattern))
    
    # Filter out temp_quiz_repo
    csv_files = [f for f in csv_files if 'temp_quiz_repo' not in str(f) and 'node_modules' not in str(f)]
    
    if not csv_files:
        print("\n❌ No CSV files found in the project directory.")
        print("\n📝 Please create a CSV file with the following format:")
        print("   Subject, Question, OptionA, OptionB, OptionC, OptionD, CorrectAnswer, Explanation")
        print("\nExample:")
        print("   Operating Systems, What is a process?, Program in execution, Program in memory, Program on disk, None, 0, A process is a program in execution.")
        return
    
    print(f"\nFound {len(csv_files)} CSV file(s):")
    for i, f in enumerate(csv_files, 1):
        print(f"  {i}. {f}")
    
    # Import all CSV files
    all_new_questions = {}
    for csv_file in csv_files:
        print(f"\nImporting from {csv_file}...")
        try:
            new_q = import_from_csv(csv_file)
            for subject, questions in new_q.items():
                if subject not in all_new_questions:
                    all_new_questions[subject] = []
                all_new_questions[subject].extend(questions)
            print(f"  ✓ Imported {sum(len(q) for q in new_q.values())} questions")
        except Exception as e:
            print(f"  ✗ Error: {e}")
    
    if not all_new_questions:
        print("\n❌ No valid questions imported.")
        return
    
    print(f"\n📊 Total new questions by subject:")
    for subject, questions in all_new_questions.items():
        print(f"  - {subject}: {len(questions)} questions")
    
    print("\n🔄 Merging with existing questions...")
    final_questions = merge_with_existing(all_new_questions)
    
    print("\n✅ Successfully updated questions.js!")
    print(f"\n📊 Final question count:")
    for subject, questions in final_questions.items():
        print(f"  - {subject}: {len(questions)} questions")

if __name__ == "__main__":
    main()

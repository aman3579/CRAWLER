import json
import time
from youtubesearchpython import VideosSearch

# GATE CS Subjects
SUBJECTS = {
    'em': 'Engineering Mathematics',
    'dl': 'Digital Logic',
    'coa': 'Computer Organization and Architecture',
    'pds': 'Programming and Data Structures',
    'algo': 'Algorithms',
    'toc': 'Theory of Computation',
    'cd': 'Compiler Design',
    'os': 'Operating System',
    'db': 'Database Management System',
    'cn': 'Computer Networks'
}

def search_videos(query, limit=5):
    print(f"Searching for: {query}")
    videos_search = VideosSearch(query, limit=limit)
    results = videos_search.result()
    
    video_list = []
    if 'result' in results:
        for video in results['result']:
            video_list.append({
                'title': video['title'],
                'url': video['link'],
                'channel': video['channel']['name'],
                'thumbnail': video['thumbnails'][0]['url'] if video['thumbnails'] else None,
                'duration': video['duration']
            })
    return video_list

def main():
    crawled_data = {}

    for code, subject in SUBJECTS.items():
        print(f"\nProcessing {subject}...")
        crawled_data[code] = {
            'pyqs': [],
            'practice': []
        }

        # Search for PYQs
        pyq_query = f"GATE {subject} previous year questions solving"
        crawled_data[code]['pyqs'] = search_videos(pyq_query, limit=5)
        time.sleep(1) # Be nice to YouTube

        # Search for Practice Questions
        practice_query = f"GATE {subject} practice questions solving"
        crawled_data[code]['practice'] = search_videos(practice_query, limit=5)
        time.sleep(1)

    # Save to file
    output_file = 'src/data/crawled_resources.json'
    with open(output_file, 'w') as f:
        json.dump(crawled_data, f, indent=2)
    
    print(f"\nCrawling complete! Data saved to {output_file}")

if __name__ == "__main__":
    main()

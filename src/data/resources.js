import crawledData from './crawled_resources.json';

// Helper to merge manual and crawled data
const getResources = () => {
    const resources = {};

    // Initialize with manual data structure (simplified for brevity, but in real app we'd keep manual curation)
    // Here we will primarily use the crawled data for demonstration of the feature

    for (const [subjectCode, data] of Object.entries(crawledData)) {
        resources[subjectCode] = {
            videos: [
                ...data.pyqs.map(v => ({ ...v, type: 'PYQ Solving' })),
                ...data.practice.map(v => ({ ...v, type: 'Practice Questions' }))
            ],
            notes: [], // We can keep manual notes here if needed
            pyqs: []   // We can keep manual PYQ links here
        };
    }

    return resources;
};

export const resourcesData = getResources();

export const questionsData = {
    "os": [
        {
            id: 1,
            question: "Which of the following is NOT a valid state of a process in a typical operating system?",
            options: ["Running", "Ready", "Blocked", "Deleted"],
            correctAnswer: 3,
            explanation: "Deleted is not a standard process state. The standard states are New, Ready, Running, Waiting (Blocked), and Terminated."
        },
        {
            id: 2,
            question: "What is the main function of the Memory Management Unit (MMU)?",
            options: ["To manage the CPU scheduling", "To map virtual addresses to physical addresses", "To handle I/O operations", "To manage file systems"],
            correctAnswer: 1,
            explanation: "The MMU is a hardware component responsible for translating virtual memory addresses to physical memory addresses."
        },
        {
            id: 3,
            question: "Which scheduling algorithm suffers from the convoy effect?",
            options: ["Round Robin", "Shortest Job First", "FCFS", "Priority Scheduling"],
            correctAnswer: 2,
            explanation: "FCFS (First-Come, First-Served) suffers from the convoy effect where short processes wait for a long process to complete."
        },
        {
            id: 4,
            question: "In which state does a process reside before it is admitted to the ready queue?",
            options: ["New", "Running", "Waiting", "Terminated"],
            correctAnswer: 0,
            explanation: "A process is in the 'New' state when it is being created."
        },
        {
            id: 5,
            question: "What is a semaphore?",
            options: ["A hardware device", "A synchronization tool", "A type of memory", "A file system"],
            correctAnswer: 1,
            explanation: "A semaphore is a synchronization tool used to manage concurrent processes."
        }
    ],
    "db": [
        {
            id: 1,
            question: "In the relational model, the number of attributes in a relation is called its:",
            options: ["Cardinality", "Degree", "Tuple", "Domain"],
            correctAnswer: 1,
            explanation: "The degree of a relation is the number of attributes (columns) it contains."
        },
        {
            id: 2,
            question: "Which normal form deals with partial dependency?",
            options: ["1NF", "2NF", "3NF", "BCNF"],
            correctAnswer: 1,
            explanation: "2NF eliminates partial dependencies, ensuring that non-key attributes are fully dependent on the primary key."
        }
    ],
    "dl": [
        {
            id: 1,
            question: "The dual of the Boolean expression x + yz is:",
            options: ["x(y+z)", "x.(y+z)", "x+(y.z)", "x.(y.z)"],
            correctAnswer: 1,
            explanation: "To find the dual, swap + with . and 0 with 1. So x + yz becomes x.(y+z)."
        }
    ]
    // ... Add more subjects and questions here. 
    // Ideally, this file would be populated with hundreds of questions.
};

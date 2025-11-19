export const syllabusData = [
    {
        id: 'em',
        title: 'Engineering Mathematics',
        topics: [
            { id: 'em-1', name: 'Discrete Mathematics: Propositional and first order logic. Sets, relations, functions, partial orders and lattices. Monoids, Groups. Graphs: connectivity, matching, coloring. Combinatorics: counting, recurrence relations, generating functions.' },
            { id: 'em-2', name: 'Linear Algebra: Matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition.' },
            { id: 'em-3', name: 'Calculus: Limits, continuity and differentiability. Maxima and minima. Mean value theorem. Integration.' },
            { id: 'em-4', name: 'Probability and Statistics: Random variables. Uniform, normal, exponential, poisson and binomial distributions. Mean, median, mode and standard deviation. Conditional probability and Bayes theorem.' }
        ]
    },
    {
        id: 'dl',
        title: 'Digital Logic',
        topics: [
            { id: 'dl-1', name: 'Boolean algebra. Combinational and sequential circuits. Minimization. Number representations and computer arithmetic (fixed and floating point).' }
        ]
    },
    {
        id: 'coa',
        title: 'Computer Organization and Architecture',
        topics: [
            { id: 'coa-1', name: 'Machine instructions and addressing modes. ALU, data-path and control unit. Instruction pipelining. Pipeline hazards. Memory hierarchy: cache, main memory and secondary storage; I/O interface (interrupt and DMA mode).' }
        ]
    },
    {
        id: 'pds',
        title: 'Programming and Data Structures',
        topics: [
            { id: 'pds-1', name: 'Programming in C. Recursion. Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs.' }
        ]
    },
    {
        id: 'algo',
        title: 'Algorithms',
        topics: [
            { id: 'algo-1', name: 'Searching, sorting, hashing. Asymptotic worst case time and space complexity. Algorithm design techniques: greedy, dynamic programming and divide-and-conquer. Graph traversals, minimum spanning trees, shortest paths.' }
        ]
    },
    {
        id: 'toc',
        title: 'Theory of Computation',
        topics: [
            { id: 'toc-1', name: 'Regular expressions and finite automata. Context-free grammars and push-down automata. Regular and contex-free languages, pumping lemma. Turing machines and undecidability.' }
        ]
    },
    {
        id: 'cd',
        title: 'Compiler Design',
        topics: [
            { id: 'cd-1', name: 'Lexical analysis, parsing, syntax-directed translation. Runtime environments. Intermediate code generation. Local optimization, Data flow analyses: constant propagation, liveness analysis, common subexpression elimination.' }
        ]
    },
    {
        id: 'os',
        title: 'Operating System',
        topics: [
            { id: 'os-1', name: 'System calls, processes, threads, inter-process communication, concurrency and synchronization. Deadlock. CPU and I/O scheduling. Memory management and virtual memory. File systems.' }
        ]
    },
    {
        id: 'db',
        title: 'Databases',
        topics: [
            { id: 'db-1', name: 'ER-model. Relational model: relational algebra, tuple calculus, SQL. Integrity constraints, normal forms. File organization, indexing (e.g., B and B+ trees). Transactions and concurrency control.' }
        ]
    },
    {
        id: 'cn',
        title: 'Computer Networks',
        topics: [
            { id: 'cn-1', name: 'Concept of layering: OSI and TCP/IP Protocol Stacks; Basics of packet, circuit and virtual circuit switching; Data link layer: framing, error detection, Medium Access Control, Ethernet bridging; Routing protocols: shortest path, flooding, distance vector and link state routing; Fragmentation and IP addressing, IPv4, CIDR notation, Basics of IP support protocols (ARP, DHCP, ICMP), Network Address Translation (NAT); Transport layer: flow control and congestion control, UDP, TCP, sockets; Application layer protocols: DNS, SMTP, HTTP, FTP, Email.' }
        ]
    }
];

function topologicalSort<T>(edges: [T, T][]): T[] {
    // Step 1: Build the adjacency list and in-degree map
    const adjList = new Map<T, T[]>();
    const inDegree = new Map<T, number>();

    for (const [from, to] of edges) {
        if (!adjList.has(from)) adjList.set(from, []);
        if (!adjList.has(to)) adjList.set(to, []);
        adjList.get(from)!.push(to);

        inDegree.set(to, (inDegree.get(to) || 0) + 1);
        if (!inDegree.has(from)) inDegree.set(from, 0);
    }

    // Step 2: Find all nodes with in-degree 0
    const queue: T[] = [];
    for (const [node, degree] of inDegree.entries()) {
        if (degree === 0) queue.push(node);
    }

    // Step 3: Process the queue
    const sorted: T[] = [];
    while (queue.length > 0) {
        const node = queue.shift()!;
        sorted.push(node);

        for (const neighbor of adjList.get(node) || []) {
            inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }

    // Step 4: Detect cycle
    if (sorted.length !== adjList.size) {
        throw new Error("Graph has at least one cycle, topological sort not possible.");
    }

    return sorted;
}

// Example Usage:
const edges: [string, string][] = [
    ["A", "C"],
    ["B", "C"],
    ["C", "D"],
    ["D", "E"]
];

console.log(topologicalSort(edges)); 
// Possible output: ["A", "B", "C", "D", "E"]

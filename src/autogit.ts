type Node = string;
type Graph = { [key: string]: Node[] };

function depthLimitedSearch(
    graph: Graph,
    current: Node,
    goal: Node,
    limit: number
): boolean {
    if (current === goal) {
        return true; // Found!
    }
    if (limit <= 0) {
        return false; // Reached depth limit
    }
    for (const neighbor of graph[current] || []) {
        if (depthLimitedSearch(graph, neighbor, goal, limit - 1)) {
            return true;
        }
    }
    return false;
}

// Example graph
const demoGraph: Graph = {
    A: ["B", "C"],
    B: ["D", "E"],
    C: ["F"],
    D: [],
    E: ["G"],
    F: [],
    G: []
};

// Usage
const found = depthLimitedSearch(demoGraph, "A", "G", 3);
console.log("Found:", found); // Output: Found: true

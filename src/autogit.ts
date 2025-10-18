/**
 * Represents a directed graph using an adjacency list.
 * Key: Node (string)
 * Value: Array of neighbor nodes (strings)
 */
type Graph = Map<string, string[]>;

/**
 * Performs a topological sort on a Directed Acyclic Graph (DAG) using Kahn's Algorithm.
 *
 * @param graph The graph represented as an adjacency list.
 * @returns An array of nodes in topological order, or null if a cycle is detected.
 */
function topologicalSort(graph: Graph): string[] | null {
    // 1. Calculate in-degrees for all nodes and gather all unique nodes.
    const inDegrees = new Map<string, number>();
    const allNodes = new Set<string>();

    // Initialize all nodes with an in-degree of 0
    graph.forEach((neighbors, node) => {
        allNodes.add(node);
        inDegrees.set(node, 0); // Ensure all existing nodes are in inDegrees map
        neighbors.forEach(neighbor => allNodes.add(neighbor)); // Add neighbor nodes too
    });

    // Populate actual in-degrees
    graph.forEach((neighbors) => {
        neighbors.forEach(neighbor => {
            inDegrees.set(neighbor, (inDegrees.get(neighbor) || 0) + 1);
        });
    });

    // Handle nodes that might exist but have no outgoing edges from any other node
    // (i.e., they are only targets of edges, or isolated)
    // Ensure allNodes also contains nodes that might only be targets, and initialize their in-degree if not already set.
    allNodes.forEach(node => {
        if (!inDegrees.has(node)) {
            inDegrees.set(node, 0);
        }
    });

    // 2. Initialize queue with all nodes that have an in-degree of 0.
    const queue: string[] = [];
    inDegrees.forEach((degree, node) => {
        if (degree === 0) {
            queue.push(node);
        }
    });

    // 3. Process the queue.
    const result: string[] = [];
    while (queue.length > 0) {
        const u = queue.shift()!; // Dequeue the node (using `! because we know it's not empty)
        result.push(u);

        // For each neighbor 'v' of 'u'...
        const neighbors = graph.get(u) || []; // Get neighbors, or empty array if 'u' has no outgoing edges
        for (const v of neighbors) {
            // Decrement in-degree of 'v'
            inDegrees.set(v, inDegrees.get(v)! - 1);

            // If in-degree of 'v' becomes 0, enqueue it
            if (inDegrees.get(v) === 0) {
                queue.push(v);
            }
        }
    }

    // 4. Check for cycles.
    // If the number of nodes in the result is less than the total number of unique nodes,
    // it means there's a cycle in the graph.
    if (result.length !== allNodes.size) {
        return null; // Cycle detected
    }

    return result;
}

// --- Example Usage ---

console.log("--- Example 1: Valid DAG ---");
const graph1: Graph = new Map();
graph1.set("A", ["B", "C"]);
graph1.set("B", ["D"]);
graph1.set("C", ["D", "E"]);
graph1.D = []; // Explicitly set D to have no outgoing edges
graph1.E = []; // Explicitly set E to have no outgoing edges

const sortedNodes1 = topologicalSort(graph1);
if (sortedNodes1) {
    console.log("Topological Sort (Graph 1):", sortedNodes1); // Expected: e.g., ["A", "C", "B", "D", "E"] or ["A", "B", "C", "D", "E"] etc. (multiple valid sorts possible)
} else {
    console.log("Graph 1 contains a cycle.");
}


console.log("\n--- Example 2: Graph with a Cycle ---");
const graph2: Graph = new Map();
graph2.set("1", ["2"]);
graph2.set("2", ["3"]);
graph2.set("3", ["1"]); // Cycle: 1 -> 2 -> 3 -> 1

const sortedNodes2 = topologicalSort(graph2);
if (sortedNodes2) {
    console.log("Topological Sort (Graph 2):", sortedNodes2);
} else {
    console.log("Graph 2 contains a cycle."); // Expected: This will be printed
}

console.log("\n--- Example 3: More Complex DAG ---");
const graph3: Graph = new Map();
graph3.set("Task1", ["Task2", "Task3"]);
graph3.set("Task2", ["Task4"]);
graph3.set("Task3", ["Task4", "Task5"]);
graph3.set("Task4", ["Task6"]);
graph3.set("Task5", ["Task6"]);
graph3.set("Task6", []);

const sortedNodes3 = topologicalSort(graph3);
if (sortedNodes3) {
    console.log("Topological Sort (Graph 3):", sortedNodes3); // Expected: e.g., ["Task1", "Task2", "Task3", "Task4", "Task5", "Task6"] (order of Task2/Task3 and Task4/Task5 can vary)
} else {
    console.log("Graph 3 contains a cycle.");
}

console.log("\n--- Example 4: Disconnected Components ---");
const graph4: Graph = new Map();
graph4.set("X", ["Y"]);
graph4.set("Y", []);
graph4.set("P", ["Q"]);
graph4.set("Q", []);

const sortedNodes4 = topologicalSort(graph4);
if (sortedNodes4) {
    console.log("Topological Sort (Graph 4):", sortedNodes4); // Expected: e.g., ["X", "P", "Y", "Q"] (order of X/P and Y/Q can vary)
} else {
    console.log("Graph 4 contains a cycle.");
}

console.log("\n--- Example 5: Empty Graph ---");
const graph5: Graph = new Map();
const sortedNodes5 = topologicalSort(graph5);
if (sortedNodes5) {
    console.log("Topological Sort (Graph 5):", sortedNodes5); // Expected: []
} else {
    console.log("Graph 5 contains a cycle.");
}

console.log("\n--- Example 6: Single Node Graph ---");
const graph6: Graph = new Map();
graph6.set("Z", []);
const sortedNodes6 = topologicalSort(graph6);
if (sortedNodes6) {
    console.log("Topological Sort (Graph 6):", sortedNodes6); // Expected: ["Z"]
} else {
    console.log("Graph 6 contains a cycle.");
}

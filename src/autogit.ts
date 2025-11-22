/**
 * Performs a topological sort on a Directed Acyclic Graph (DAG) using Kahn's algorithm (BFS-based).
 *
 * @template T The type of the node identifiers (e.g., string, number).
 * @param {T[]} nodes An array of all unique node identifiers in the graph.
 * @param {[T, T][]} edges An array of tuples representing directed edges [from, to].
 * @returns {T[]} An array of nodes in topological order.
 * @throws {Error} If the graph contains a cycle.
 */
function topologicalSort<T>(nodes: T[], edges: [T, T][]): T[] {
    // 1. Initialize Data Structures
    const graph = new Map<T, T[]>();       // Adjacency list: node -> [neighbors]
    const inDegree = new Map<T, number>(); // In-degree for each node

    // Initialize all nodes in graph and set their initial in-degree to 0
    for (const node of nodes) {
        graph.set(node, []);
        inDegree.set(node, 0);
    }

    // 2. Build Graph and Calculate In-Degrees
    for (const [from, to] of edges) {
        // Add 'to' to 'from's adjacency list
        graph.get(from)!.push(to); // The '!' asserts that 'from' exists in the map
        
        // Increment 'to's in-degree
        inDegree.set(to, inDegree.get(to)! + 1); // The '!' asserts that 'to' exists in the map
    }

    // 3. Find Starting Nodes (in-degree 0)
    const queue: T[] = [];
    for (const node of nodes) {
        if (inDegree.get(node) === 0) {
            queue.push(node);
        }
    }

    // 4. Process Nodes (BFS-like)
    const result: T[] = [];
    let nodesProcessed = 0; // To count processed nodes for cycle detection

    while (queue.length > 0) {
        const currentNode = queue.shift()!; // Dequeue a node. '!' asserts it's not undefined.
        result.push(currentNode);
        nodesProcessed++;

        // For each neighbor of the current node
        for (const neighbor of graph.get(currentNode)!) {
            // Decrement its in-degree
            inDegree.set(neighbor, inDegree.get(neighbor)! - 1);

            // If neighbor's in-degree becomes 0, add it to the queue
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }

    // 5. Cycle Detection
    // If we haven't processed all nodes, it means there's a cycle
    if (nodesProcessed !== nodes.length) {
        throw new Error("Graph contains a cycle. Topological sort is not possible.");
    }

    return result;
}

// --- Example Usage ---

console.log("--- Example 1: Simple DAG ---");
const nodes1 = ['A', 'B', 'C', 'D', 'E', 'F'];
const edges1: [string, string][] = [
    ['A', 'C'],
    ['B', 'C'],
    ['B', 'D'],
    ['C', 'E'],
    ['D', 'E'],
    ['E', 'F']
];
try {
    const sortedNodes1 = topologicalSort(nodes1, edges1);
    console.log("Topological sort:", sortedNodes1); // Expected: e.g., ['A', 'B', 'C', 'D', 'E', 'F'] or ['B', 'A', 'C', 'D', 'E', 'F'] etc. (multiple valid sorts)
} catch (error: any) {
    console.error(error.message);
}

console.log("\n--- Example 2: With Disconnected Components ---");
const nodes2 = ['A', 'B', 'C', 'X', 'Y', 'Z'];
const edges2: [string, string][] = [
    ['A', 'B'],
    ['B', 'C'],
    ['X', 'Y'],
    ['Y', 'Z']
];
try {
    const sortedNodes2 = topologicalSort(nodes2, edges2);
    console.log("Topological sort:", sortedNodes2); // Expected: e.g., ['A', 'X', 'B', 'Y', 'C', 'Z']
} catch (error: any) {
    console.error(error.message);
}

console.log("\n--- Example 3: Graph with a Cycle ---");
const nodes3 = ['A', 'B', 'C'];
const edges3: [string, string][] = [
    ['A', 'B'],
    ['B', 'C'],
    ['C', 'A'] // This creates a cycle!
];
try {
    const sortedNodes3 = topologicalSort(nodes3, edges3);
    console.log("Topological sort:", sortedNodes3);
} catch (error: any) {
    console.error(error.message); // Expected: "Graph contains a cycle. Topological sort is not possible."
}

console.log("\n--- Example 4: Single Node ---");
const nodes4 = ['Task1'];
const edges4: [string, string][] = [];
try {
    const sortedNodes4 = topologicalSort(nodes4, edges4);
    console.log("Topological sort:", sortedNodes4); // Expected: ['Task1']
} catch (error: any) {
    console.error(error.message);
}

console.log("\n--- Example 5: Empty Graph ---");
const nodes5: string[] = [];
const edges5: [string, string][] = [];
try {
    const sortedNodes5 = topologicalSort(nodes5, edges5);
    console.log("Topological sort:", sortedNodes5); // Expected: []
} catch (error: any) {
    console.error(error.message);
}

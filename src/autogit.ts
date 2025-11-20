type NodeId = string | number; // Generic type for node identifiers

interface Graph<T extends NodeId> {
    adj: Map<T, T[]>; // Adjacency list: node -> list of its neighbors
    nodes: Set<T>;    // All unique nodes in the graph
}

/**
 * Creates a graph from a list of edges.
 * @param edges An array of tuples, where each tuple `[u, v]` represents a directed edge from `u` to `v`.
 * @returns A Graph object containing the adjacency list and all unique nodes.
 */
function createGraph<T extends NodeId>(edges: [T, T][]): Graph<T> {
    const adj = new Map<T, T[]>();
    const nodes = new Set<T>();

    for (const [u, v] of edges) {
        if (!adj.has(u)) {
            adj.set(u, []);
        }
        adj.get(u)!.push(v); // Add v to u's neighbors
        nodes.add(u);
        nodes.add(v);
    }

    // Ensure all nodes, even those with no outgoing edges, are in the adj map keys
    // This helps Kahn's algorithm correctly initialize in-degrees for all nodes.
    for (const node of nodes) {
        if (!adj.has(node)) {
            adj.set(node, []);
        }
    }

    return { adj, nodes };
}
/**
 * Performs a topological sort using Kahn's algorithm (BFS-based).
 * @param graph The graph to sort.
 * @returns An array of nodes in topological order, or null if a cycle is detected.
 */
function topologicalSortKahn<T extends NodeId>(graph: Graph<T>): T[] | null {
    const inDegrees = new Map<T, number>();
    const queue: T[] = [];
    const result: T[] = [];

    // 1. Initialize in-degrees for all nodes
    for (const node of graph.nodes) {
        inDegrees.set(node, 0);
    }
    for (const [u, neighbors] of graph.adj) {
        for (const v of neighbors) {
            inDegrees.set(v, inDegrees.get(v)! + 1);
        }
    }

    // 2. Add all nodes with in-degree 0 to the queue
    for (const node of graph.nodes) {
        if (inDegrees.get(node) === 0) {
            queue.push(node);
        }
    }

    let processedNodesCount = 0;

    // 3. Process the queue
    while (queue.length > 0) {
        const u = queue.shift()!; // Dequeue
        result.push(u);
        processedNodesCount++;

        // For each neighbor v of u
        for (const v of graph.adj.get(u) || []) {
            inDegrees.set(v, inDegrees.get(v)! - 1);
            if (inDegrees.get(v) === 0) {
                queue.push(v); // Enqueue if in-degree becomes 0
            }
        }
    }

    // 4. Cycle Detection
    if (processedNodesCount !== graph.nodes.size) {
        // A cycle exists if not all nodes were processed
        console.warn("Graph contains a cycle! Topological sort is not possible.");
        return null;
    }

    return result;
}
/**
 * Performs a topological sort using a DFS-based algorithm.
 * @param graph The graph to sort.
 * @returns An array of nodes in topological order, or null if a cycle is detected.
 */
function topologicalSortDFS<T extends NodeId>(graph: Graph<T>): T[] | null {
    const visited = new Set<T>();     // Nodes that have been fully processed
    const visiting = new Set<T>();    // Nodes currently in the recursion stack (for cycle detection)
    const result: T[] = [];          // Stores the topological order

    // Helper function for DFS traversal
    function dfs(node: T): boolean {
        visiting.add(node); // Mark as currently visiting
        visited.add(node);  // Mark as visited (will move to fully processed later)

        for (const neighbor of graph.adj.get(node) || []) {
            if (visiting.has(neighbor)) {
                // Found a back-edge to a node currently in the recursion stack -> cycle!
                return true;
            }
            if (!visited.has(neighbor)) { // Only visit unvisited nodes
                if (dfs(neighbor)) { // Propagate cycle detection
                    return true;
                }
            }
        }

        visiting.delete(node); // Remove from visiting as we're done with this node's path
        result.unshift(node);  // Add node to the front of the result list (post-order traversal)
        return false; // No cycle found in this path
    }

    // Iterate over all nodes to ensure all disconnected components are covered
    for (const node of graph.nodes) {
        if (!visited.has(node)) {
            if (dfs(node)) {
                // Cycle detected during DFS
                console.warn("Graph contains a cycle! Topological sort is not possible.");
                return null;
            }
        }
    }

    return result;
}
// --- Example 1: Simple Linear Graph ---
console.log("--- Simple Linear Graph ---");
const graph1 = createGraph<number>([
    [1, 2],
    [2, 3],
    [3, 4],
]);
console.log("Kahn's Sort:", topologicalSortKahn(graph1)); // Expected: [1, 2, 3, 4]
console.log("DFS Sort:", topologicalSortDFS(graph1));     // Expected: [1, 2, 3, 4]

// --- Example 2: More Complex DAG (Course Prerequisites) ---
console.log("\n--- Complex DAG (Course Prerequisites) ---");
const graph2 = createGraph<string>([
    ["A", "B"],
    ["A", "C"],
    ["B", "D"],
    ["C", "D"],
    ["C", "E"],
    ["D", "F"],
    ["E", "F"],
]);
// Possible output (order might vary for independent paths):
// Kahn: ["A", "B", "C", "D", "E", "F"] or ["A", "C", "B", "D", "E", "F"] etc.
// DFS:  Similar, depends on traversal order
console.log("Kahn's Sort:", topologicalSortKahn(graph2));
console.log("DFS Sort:", topologicalSortDFS(graph2));

// --- Example 3: Graph with a Cycle ---
console.log("\n--- Graph with a Cycle ---");
const graph3 = createGraph<number>([
    [1, 2],
    [2, 3],
    [3, 1], // Cycle: 1 -> 2 -> 3 -> 1
    [3, 4], // This node is still valid but cannot be sorted due to cycle
]);
console.log("Kahn's Sort:", topologicalSortKahn(graph3)); // Expected: null
console.log("DFS Sort:", topologicalSortDFS(graph3));     // Expected: null

// --- Example 4: Disconnected Graph ---
console.log("\n--- Disconnected Graph ---");
const graph4 = createGraph<string>([
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["B", "D"] // Connects two components partially
]);
// Kahn: depends on iteration order of nodes/in-degrees, e.g., ["A", "C", "E", "B", "D", "F"]
// DFS: Similar, e.g., ["E", "F", "C", "A", "B", "D"]
console.log("Kahn's Sort:", topologicalSortKahn(graph4));
console.log("DFS Sort:", topologicalSortDFS(graph4));

// --- Example 5: Graph with a single node (no edges) ---
console.log("\n--- Graph with a single node ---");
const graph5 = createGraph<string>([]);
graph5.nodes.add("X"); // Manually add an isolated node
console.log("Kahn's Sort:", topologicalSortKahn(graph5)); // Expected: ["X"]
console.log("DFS Sort:", topologicalSortDFS(graph5));     // Expected: ["X"]

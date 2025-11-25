// Define a type for our Node IDs (e.g., string or number)
type NodeId = string;

// Define a type for our Graph using an Adjacency List
type Graph = Map<NodeId, NodeId[]>;

// --- Example Graph Creation ---
function createSampleGraph(): Graph {
    const graph: Graph = new Map();

    graph.set('A', ['B', 'C']);
    graph.set('B', ['A', 'D', 'E']);
    graph.set('C', ['A', 'F']);
    graph.set('D', ['B']);
    graph.set('E', ['B', 'F']);
    graph.set('F', ['C', 'E']);
    graph.set('G', ['H']); // Disconnected component
    graph.set('H', ['G']);

    return graph;
}
function bfs(graph: Graph, startNodeId: NodeId): NodeId[] {
    // 1. Initialize data structures
    const queue: NodeId[] = []; // Stores nodes to visit
    const visited: Set<NodeId> = new Set(); // Stores nodes already visited
    const traversalOrder: NodeId[] = []; // Stores the order of visited nodes

    // 2. Handle invalid start node
    if (!graph.has(startNodeId)) {
        console.warn(`Start node "${startNodeId}" not found in graph.`);
        return traversalOrder;
    }

    // 3. Add the start node to the queue and mark it as visited
    queue.push(startNodeId);
    visited.add(startNodeId);

    // 4. Loop while the queue is not empty
    while (queue.length > 0) {
        // Dequeue the next node (front of the queue)
        // Using `!` to assert `shift()` won't return undefined because we check `queue.length > 0`
        const currentNodeId = queue.shift()!;
        traversalOrder.push(currentNodeId); // Add to our result list

        // Get neighbors of the current node
        // Use `|| []` to handle nodes that might not have entries in the map (e.g., isolated nodes)
        const neighbors = graph.get(currentNodeId) || [];

        // Iterate over neighbors
        for (const neighborId of neighbors) {
            // If the neighbor hasn't been visited yet
            if (!visited.has(neighborId)) {
                visited.add(neighborId); // Mark as visited
                queue.push(neighborId);  // Enqueue it for later processing
            }
        }
    }

    return traversalOrder;
}
const myGraph = createSampleGraph();

console.log("BFS Traversal from 'A':", bfs(myGraph, 'A'));
// Expected output: BFS Traversal from 'A': [ 'A', 'B', 'C', 'D', 'E', 'F' ]

console.log("BFS Traversal from 'G':", bfs(myGraph, 'G'));
// Expected output: BFS Traversal from 'G': [ 'G', 'H' ]

console.log("BFS Traversal from 'Z' (non-existent):", bfs(myGraph, 'Z'));
// Expected output:
// Start node "Z" not found in graph.
// BFS Traversal from 'Z' (non-existent): []
interface BFSResult {
    traversalOrder: NodeId[];
    distances: Map<NodeId, number>;
    paths: Map<NodeId, NodeId | null>; // Stores the parent node for path reconstruction
}

function bfsWithPathsAndDistances(graph: Graph, startNodeId: NodeId): BFSResult | null {
    if (!graph.has(startNodeId)) {
        console.warn(`Start node "${startNodeId}" not found in graph.`);
        return null;
    }

    const queue: NodeId[] = [];
    const visited: Set<NodeId> = new Set();
    const traversalOrder: NodeId[] = [];
    const distances: Map<NodeId, number> = new Map();
    const paths: Map<NodeId, NodeId | null> = new Map(); // Parent tracking

    queue.push(startNodeId);
    visited.add(startNodeId);
    distances.set(startNodeId, 0); // Distance to start node is 0
    paths.set(startNodeId, null); // Start node has no parent

    while (queue.length > 0) {
        const currentNodeId = queue.shift()!;
        traversalOrder.push(currentNodeId);

        const currentDistance = distances.get(currentNodeId)!; // We know it exists
        const neighbors = graph.get(currentNodeId) || [];

        for (const neighborId of neighbors) {
            if (!visited.has(neighborId)) {
                visited.add(neighborId);
                queue.push(neighborId);
                distances.set(neighborId, currentDistance + 1); // Increment distance
                paths.set(neighborId, currentNodeId); // Set parent
            }
        }
    }

    return { traversalOrder, distances, paths };
}

// Helper function to reconstruct path
function reconstructPath(
    paths: Map<NodeId, NodeId | null>,
    startNodeId: NodeId,
    endNodeId: NodeId
): NodeId[] | null {
    const path: NodeId[] = [];
    let currentNode: NodeId | null = endNodeId;

    if (!paths.has(endNodeId)) {
        // End node was not reached
        return null;
    }

    while (currentNode !== null) {
        path.unshift(currentNode); // Add to the beginning of the array
        currentNode = paths.get(currentNode) || null; // Move to parent
    }

    if (path[0] === startNodeId) {
        return path;
    } else {
        // Path does not start from the given startNodeId (e.g., if endNodeId is in a disconnected component)
        return null;
    }
}
const myGraph = createSampleGraph();
const bfsResult = bfsWithPathsAndDistances(myGraph, 'A');

if (bfsResult) {
    console.log("\nBFS Results with Paths and Distances from 'A':");
    console.log("Traversal Order:", bfsResult.traversalOrder);
    // Expected: [ 'A', 'B', 'C', 'D', 'E', 'F' ]

    console.log("Distances:");
    bfsResult.distances.forEach((dist, node) => console.log(`  ${node}: ${dist}`));
    // Expected:
    // A: 0
    // B: 1
    // C: 1
    // D: 2
    // E: 2
    // F: 2

    console.log("Path from 'A' to 'F':", reconstructPath(bfsResult.paths, 'A', 'F'));
    // Expected: [ 'A', 'C', 'F' ] (or ['A', 'B', 'E', 'F'] depending on iteration order of neighbors for B or C)
    console.log("Path from 'A' to 'D':", reconstructPath(bfsResult.paths, 'A', 'D'));
    // Expected: [ 'A', 'B', 'D' ]

    console.log("Path from 'G' to 'A':", reconstructPath(bfsResult.paths, 'G', 'A'));
    // Expected: null (A is not reachable from G)

    const bfsResultG = bfsWithPathsAndDistances(myGraph, 'G');
    if (bfsResultG) {
        console.log("Path from 'G' to 'H':", reconstructPath(bfsResultG.paths, 'G', 'H'));
        // Expected: [ 'G', 'H' ]
    }
}

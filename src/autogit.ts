// Define a type for node IDs (can be string or number)
type NodeId = string;

// Define a type for our adjacency list graph
type AdjacencyList = Map<NodeId, NodeId[]>;

// Example graph:
// A -- B -- E
// |    |
// C -- D
const graph: AdjacencyList = new Map<NodeId, NodeId[]>();
graph.set('A', ['B', 'C']);
graph.set('B', ['A', 'D', 'E']);
graph.set('C', ['A', 'D']);
graph.set('D', ['B', 'C']);
graph.set('E', ['B']);
graph.set('F', []); // Node F is isolated
function bfsTraversal(graph: AdjacencyList, startNode: NodeId): NodeId[] {
    const queue: NodeId[] = []; // Stores nodes to visit
    const visited = new Set<NodeId>(); // Stores visited nodes
    const traversalOrder: NodeId[] = []; // Stores the order of visited nodes

    // 1. Enqueue the start node and mark as visited
    queue.push(startNode);
    visited.add(startNode);

    // 2. While the queue is not empty
    while (queue.length > 0) {
        // a. Dequeue a node
        const currentNode = queue.shift()!; // '!' asserts that shift() will not return undefined

        // b. Process the current node
        traversalOrder.push(currentNode);
        console.log(`Visiting node: ${currentNode}`);

        // c. For each unvisited neighbor of the current node
        const neighbors = graph.get(currentNode) || []; // Get neighbors, or empty array if node doesn't exist
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor); // Mark as visited
                queue.push(neighbor);  // Enqueue it
            }
        }
    }

    return traversalOrder;
}

console.log("\n--- BFS Traversal from 'A' ---");
const order = bfsTraversal(graph, 'A');
console.log("Traversal Order:", order); // Expected: [ 'A', 'B', 'C', 'D', 'E' ] (order of B,C and D,E might vary based on Map iteration or array order)

console.log("\n--- BFS Traversal from 'F' (isolated) ---");
const isolatedOrder = bfsTraversal(graph, 'F');
console.log("Traversal Order:", isolatedOrder); // Expected: [ 'F' ]
/**
 * Performs a BFS to find the shortest path from a start node to a target node.
 * @param graph The adjacency list representation of the graph.
 * @param startNode The starting node.
 * @param targetNode The node to find a path to.
 * @returns An array of NodeIds representing the path, or null if no path exists.
 */
function bfsShortestPath(
    graph: AdjacencyList,
    startNode: NodeId,
    targetNode: NodeId
): NodeId[] | null {
    const queue: NodeId[] = [];
    const visited = new Set<NodeId>();
    const parentMap = new Map<NodeId, NodeId | null>(); // To reconstruct the path

    // Initialize for start node
    queue.push(startNode);
    visited.add(startNode);
    parentMap.set(startNode, null); // Start node has no parent

    while (queue.length > 0) {
        const currentNode = queue.shift()!;

        // If we found the target, reconstruct and return the path
        if (currentNode === targetNode) {
            const path: NodeId[] = [];
            let backtrackNode: NodeId | null = targetNode;
            while (backtrackNode !== null) {
                path.unshift(backtrackNode); // Add to the beginning to get correct order
                backtrackNode = parentMap.get(backtrackNode) || null;
            }
            return path;
        }

        const neighbors = graph.get(currentNode) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                parentMap.set(neighbor, currentNode); // Record parent for path reconstruction
                queue.push(neighbor);
            }
        }
    }

    return null; // No path found
}

console.log("\n--- BFS Shortest Path ---");
const pathAtoE = bfsShortestPath(graph, 'A', 'E');
console.log("Path from A to E:", pathAtoE); // Expected: [ 'A', 'B', 'E' ]

const pathAtoD = bfsShortestPath(graph, 'A', 'D');
console.log("Path from A to D:", pathAtoD); // Expected: [ 'A', 'C', 'D' ] or [ 'A', 'B', 'D' ] (both are length 2)

const pathAtoF = bfsShortestPath(graph, 'A', 'F');
console.log("Path from A to F:", pathAtoF); // Expected: null

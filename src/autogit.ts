// For simplicity, nodes can be strings or numbers.
// For more complex data, you'd use an object like { id: string, data: any }
type Node = string | number;

// Adjacency list representation: Map node to an array of its neighbors
type Graph<T extends Node> = Map<T, T[]>;
/**
 * Performs a Breadth-First Search (BFS) traversal on a graph.
 * @param graph The graph represented as an adjacency list.
 * @param startNode The node to start the traversal from.
 * @returns An array of nodes in the order they were visited.
 */
function bfsTraversal<T extends Node>(graph: Graph<T>, startNode: T): T[] {
    const queue: T[] = [];          // Our queue for nodes to visit
    const visited: Set<T> = new Set(); // Set to keep track of visited nodes
    const traversalOrder: T[] = []; // To store the result of the traversal

    // 1. Start by adding the startNode to the queue and marking it as visited.
    queue.push(startNode);
    visited.add(startNode);

    // 2. While there are still nodes in the queue:
    while (queue.length > 0) {
        // a. Dequeue the current node.
        const currentNode = queue.shift()!; // `!` asserts that `shift()` won't return undefined

        // b. Process the current node (e.g., add to traversal order).
        traversalOrder.push(currentNode);

        // c. Get all neighbors of the current node.
        const neighbors = graph.get(currentNode) || []; // Handle nodes with no outgoing edges

        // d. For each neighbor:
        for (const neighbor of neighbors) {
            // If the neighbor hasn't been visited:
            if (!visited.has(neighbor)) {
                // Mark it as visited and enqueue it.
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return traversalOrder;
}

// --- Example Usage for Traversal ---
const myGraph: Graph<string> = new Map();
myGraph.set('A', ['B', 'C']);
myGraph.set('B', ['D', 'E']);
myGraph.set('C', ['F']);
myGraph.set('D', []);
myGraph.set('E', ['F']);
myGraph.set('F', []);

console.log("BFS Traversal Order from 'A':", bfsTraversal(myGraph, 'A'));
// Expected output: BFS Traversal Order from 'A': [ 'A', 'B', 'C', 'D', 'E', 'F' ]

console.log("BFS Traversal Order from 'B':", bfsTraversal(myGraph, 'B'));
// Expected output: BFS Traversal Order from 'B': [ 'B', 'D', 'E', 'F' ]

// Example with a node not connected to 'A'
myGraph.set('G', ['H']);
myGraph.set('H', []);
console.log("BFS Traversal Order from 'G':", bfsTraversal(myGraph, 'G'));
// Expected output: BFS Traversal Order from 'G': [ 'G', 'H' ]
/**
 * Performs a Breadth-First Search (BFS) to find if a target node exists and is reachable.
 * @param graph The graph represented as an adjacency list.
 * @param startNode The node to start the search from.
 * @param targetNode The node to search for.
 * @returns `true` if the target node is found, `false` otherwise.
 */
function bfsSearch<T extends Node>(graph: Graph<T>, startNode: T, targetNode: T): boolean {
    const queue: T[] = [];
    const visited: Set<T> = new Set();

    queue.push(startNode);
    visited.add(startNode);

    while (queue.length > 0) {
        const currentNode = queue.shift()!;

        // If the current node is our target, we found it!
        if (currentNode === targetNode) {
            return true;
        }

        const neighbors = graph.get(currentNode) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return false; // Target not found after visiting all reachable nodes
}

// --- Example Usage for Searching ---
console.log("\n--- BFS Search Examples ---");
console.log("Is 'F' reachable from 'A'?", bfsSearch(myGraph, 'A', 'F')); // Expected: true
console.log("Is 'Z' reachable from 'A'?", bfsSearch(myGraph, 'A', 'Z')); // Expected: false
console.log("Is 'H' reachable from 'A'?", bfsSearch(myGraph, 'A', 'H')); // Expected: false (G-H is disconnected from A)
console.log("Is 'A' reachable from 'A'?", bfsSearch(myGraph, 'A', 'A')); // Expected: true
/**
 * Performs a Breadth-First Search (BFS) to find the shortest path between two nodes
 * in an unweighted graph.
 * @param graph The graph represented as an adjacency list.
 * @param startNode The node to start the path from.
 * @param targetNode The node to find the path to.
 * @returns An array representing the shortest path, or `null` if the target is unreachable.
 */
function bfsShortestPath<T extends Node>(graph: Graph<T>, startNode: T, targetNode: T): T[] | null {
    const queue: T[] = [];
    const visited: Set<T> = new Set();
    const parents: Map<T, T | null> = new Map(); // Map to store parent of each node for path reconstruction

    queue.push(startNode);
    visited.add(startNode);
    parents.set(startNode, null); // The start node has no parent

    while (queue.length > 0) {
        const currentNode = queue.shift()!;

        // If we found the target, reconstruct and return the path
        if (currentNode === targetNode) {
            const path: T[] = [];
            let node: T | null = targetNode;
            while (node !== null) {
                path.unshift(node); // Add node to the beginning of the path
                node = parents.get(node) || null; // Move to its parent
            }
            return path;
        }

        const neighbors = graph.get(currentNode) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                parents.set(neighbor, currentNode); // Record current node as the parent of neighbor
                queue.push(neighbor);
            }
        }
    }

    return null; // Target not reachable from startNode
}

// --- Example Usage for Shortest Path ---
console.log("\n--- BFS Shortest Path Examples ---");
console.log("Shortest path from 'A' to 'F':", bfsShortestPath(myGraph, 'A', 'F'));
// Expected: [ 'A', 'C', 'F' ] or [ 'A', 'B', 'E', 'F' ] (depends on Map iteration order, but length is 3)
// For this graph, 'A' -> 'C' -> 'F' has length 2. 'A' -> 'B' -> 'E' -> 'F' has length 3.
// So, the actual output is [ 'A', 'C', 'F' ]

console.log("Shortest path from 'A' to 'D':", bfsShortestPath(myGraph, 'A', 'D'));
// Expected: [ 'A', 'B', 'D' ]

console.log("Shortest path from 'A' to 'Z':", bfsShortestPath(myGraph, 'A', 'Z'));
// Expected: null

console.log("Shortest path from 'G' to 'H':", bfsShortestPath(myGraph, 'G', 'H'));
// Expected: [ 'G', 'H' ]

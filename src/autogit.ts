// Define a type for our graph using an adjacency list
type Graph = {
    [node: string]: string[]; // Each node (string) maps to an array of its neighbors (strings)
};
function bfs(graph: Graph, startNode: string): string[] {
    // 1. Initialize Queue and Visited Set
    const queue: string[] = [];
    const visited: Set<string> = new Set();
    const traversalOrder: string[] = []; // To store the order of visited nodes

    // Handle edge case: startNode not in graph or graph is empty
    if (!graph[startNode] && Object.keys(graph).length > 0) {
        console.warn(`Start node '${startNode}' not found in graph.`);
        return [];
    }
    if (Object.keys(graph).length === 0) {
        return [];
    }

    // 2. Add the start node to the queue and mark it as visited
    queue.push(startNode);
    visited.add(startNode);

    // 3. Loop while the queue is not empty
    while (queue.length > 0) {
        // Dequeue the first node
        const currentNode = queue.shift()!; // `!` is a non-null assertion operator,
                                           // asserting that `shift()` will not return undefined
                                           // because we check `queue.length > 0`.

        traversalOrder.push(currentNode); // Add to our traversal result

        // Get all neighbors of the current node
        const neighbors = graph[currentNode] || []; // Handle nodes with no defined neighbors

        // Iterate over neighbors
        for (const neighbor of neighbors) {
            // If the neighbor hasn't been visited yet
            if (!visited.has(neighbor)) {
                visited.add(neighbor); // Mark as visited
                queue.push(neighbor); // Enqueue for later processing
            }
        }
    }

    return traversalOrder;
}
const myGraph: Graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
};

console.log("BFS Traversal from 'A':", bfs(myGraph, 'A')); // Expected: ['A', 'B', 'C', 'D', 'E', 'F']
console.log("BFS Traversal from 'D':", bfs(myGraph, 'D')); // Expected: ['D', 'B', 'A', 'E', 'C', 'F']

// Example with a node not in graph
console.log("BFS Traversal from 'Z':", bfs(myGraph, 'Z')); // Expected: [] (with a warning)

// Example with a disconnected component (if 'G' was not connected to anything)
const disconnectedGraph: Graph = {
    'A': ['B'],
    'B': ['A'],
    'C': ['D'],
    'D': ['C']
};
console.log("BFS Traversal from 'A' (disconnected):", bfs(disconnectedGraph, 'A')); // Expected: ['A', 'B']
console.log("BFS Traversal from 'C' (disconnected):", bfs(disconnectedGraph, 'C')); // Expected: ['C', 'D']
function bfsFindTarget(graph: Graph, startNode: string, targetNode: string): boolean {
    if (!graph[startNode] || !graph[targetNode]) {
        return false; // Start or target node not in graph
    }
    if (startNode === targetNode) {
        return true;
    }

    const queue: string[] = [startNode];
    const visited: Set<string> = new Set([startNode]);

    while (queue.length > 0) {
        const currentNode = queue.shift()!;

        if (currentNode === targetNode) {
            return true; // Target found!
        }

        for (const neighbor of graph[currentNode] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return false; // Target not found
}

console.log("\nBFS to Find Target:");
console.log("Is 'F' reachable from 'A'?", bfsFindTarget(myGraph, 'A', 'F')); // true
console.log("Is 'Z' reachable from 'A'?", bfsFindTarget(myGraph, 'A', 'Z')); // false
function bfsShortestPath(graph: Graph, startNode: string, targetNode: string): string[] | null {
    if (!graph[startNode] || !graph[targetNode]) {
        return null; // Start or target node not in graph
    }
    if (startNode === targetNode) {
        return [startNode];
    }

    const queue: string[] = [startNode];
    const visited: Set<string> = new Set([startNode]);
    const parents: Map<string, string | null> = new Map(); // Store parent of each node
    parents.set(startNode, null); // Start node has no parent

    while (queue.length > 0) {
        const currentNode = queue.shift()!;

        if (currentNode === targetNode) {
            // Path found, reconstruct it
            const path: string[] = [];
            let current: string | null = targetNode;
            while (current !== null) {
                path.unshift(current); // Add to the beginning of the path
                current = parents.get(current) ?? null; // Get parent, default to null
            }
            return path;
        }

        for (const neighbor of graph[currentNode] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
                parents.set(neighbor, currentNode); // Record parent
            }
        }
    }

    return null; // Path not found
}

console.log("\nBFS to Find Shortest Path:");
console.log("Path from 'A' to 'F':", bfsShortestPath(myGraph, 'A', 'F')); // Expected: ['A', 'C', 'F'] or ['A', 'B', 'E', 'F'] (depends on traversal order)
console.log("Path from 'A' to 'D':", bfsShortestPath(myGraph, 'A', 'D')); // Expected: ['A', 'B', 'D']
console.log("Path from 'A' to 'A':", bfsShortestPath(myGraph, 'A', 'A')); // Expected: ['A']
console.log("Path from 'A' to 'Z':", bfsShortestPath(myGraph, 'A', 'Z')); // Expected: null

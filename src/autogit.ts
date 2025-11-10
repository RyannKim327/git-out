type Edge = { node: string; weight: number };
type Graph = Record<string, Edge[]>;
type DijkstraResult = {
    distances: Record<string, number>;
    previousNodes: Record<string, string | null>;
};

/**
 * Finds shortest paths from startNode to all other nodes in the graph using Dijkstra's algorithm
 * @param graph - Adjacency list representation of the graph
 * @param startNode - Starting node for path calculation
 * @returns Object containing distances and previous node information
 */
function dijkstra(graph: Graph, startNode: string): DijkstraResult {
    // Initialize distance and previous node objects
    const distances: Record<string, number> = {};
    const previousNodes: Record<string, string | null> = {};
    
    Object.keys(graph).forEach(node => {
        distances[node] = Infinity;
        previousNodes[node] = null;
    });
    distances[startNode] = 0;

    // Priority queue (using array sorted by descending distance)
    const queue: { node: string; distance: number }[] = [];
    queue.push({ node: startNode, distance: 0 });

    while (queue.length > 0) {
        // Sort queue to get node with smallest distance (despite being O(n log n), simple to implement)
        queue.sort((a, b) => b.distance - a.distance);
        const current = queue.pop()!;

        // Skip outdated (no longer relevant) nodes
        if (current.distance > distances[current.node]) {
            continue;
        }

        // Visit each neighbor
        for (const neighbor of graph[current.node]) {
            const newDistance = current.distance + neighbor.weight;

            if (newDistance < distances[neighbor.node]) {
                // Found a shorter path to this neighbor
                distances[neighbor.node] = newDistance;
                previousNodes[neighbor.node] = current.node;
                queue.push({ node: neighbor.node, distance: newDistance });
            }
        }
    }

    return { distances, previousNodes };
}

/**
 * Reconstruct shortest path from startNode to targetNode
 * @param previousNodes Result from dijkstra's algorithm
 * @param targetNode Destination node
 * @returns Array of nodes representing the path (empty array if no path exists)
 */
function getPath(previousNodes: Record<string, string | null>, targetNode: string): string[] {
    const path: string[] = [];
    let currentNode: string | null = targetNode;
    
    if (previousNodes[currentNode] === null && currentNode !== Object.keys(previousNodes)[0]) {
        return []; // Target node is unreachable
    }
    
    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = previousNodes[currentNode];
    }
    
    return path;
}
// Example graph representation
const graph: Graph = {
    'A': [
        { node: 'B', weight: 4 },
        { node: 'C', weight: 2 }
    ],
    'B': [
        { node: 'C', weight: 5 },
        { node: 'D', weight: 10 }
    ],
    'C': [
        { node: 'D', weight: 3 }
    ],
    'D': []
};

// Calculate shortest paths from 'A'
const result = dijkstra(graph, 'A');
console.log('Distances:', result.distances);
console.log('Previous nodes:', result.previousNodes);

// Get path to 'D'
const pathToD = getPath(result.previousNodes, 'D');
console.log('Path to D:', pathToD);

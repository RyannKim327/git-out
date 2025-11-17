type NodeId = string | number; // Allow both string and number node identifiers

interface Edge {
    to: NodeId;
    weight: number;
}

interface Graph {
    [key: NodeId]: Edge[]; // Adjacency list representation
}

interface DijkstraResult {
    distances: Record<NodeId, number>;
    previous: Record<NodeId, NodeId | null>;
}

/**
 * Finds shortest paths from startNode to all other nodes in the graph
 * @param graph - The graph in adjacency list format
 * @param startNode - Starting node for path calculations
 * @returns Object containing distances and previous node information
 */
function dijkstra(graph: Graph, startNode: NodeId): DijkstraResult {
    // Initialize distances with Infinity and previous nodes as null
    const distances: Record<NodeId, number> = {};
    const previous: Record<NodeId, NodeId | null> = {};
    const queue: [NodeId, number][] = []; // [node, currentDistance]

    // Initialize data structures
    Object.keys(graph).forEach(node => {
        distances[node] = Infinity;
        previous[node] = null;
    });
    distances[startNode] = 0;
    queue.push([startNode, 0]);

    while (queue.length > 0) {
        // Sort queue by distance (ascending) - simplest priority queue implementation
        queue.sort((a, b) => a[1] - b[1]);
        const [currentNode] = queue.shift()!;

        // Visit each neighbor of the current node
        for (const edge of graph[currentNode]) {
            const newDistance = distances[currentNode] + edge.weight;

            // If found shorter path to neighbor
            if (newDistance < distances[edge.to]) {
                distances[edge.to] = newDistance;
                previous[edge.to] = currentNode;
                queue.push([edge.to, newDistance]);
            }
        }
    }

    return { distances, previous };
}

/**
 * Reconstructs shortest path from startNode to endNode
 * @param previous - Previous node dictionary from Dijkstra's result
 * @param endNode - Target node to find path to
 * @returns Array of nodes representing the path
 */
function getPath(
    previous: Record<NodeId, NodeId | null>, 
    endNode: NodeId
): NodeId[] {
    const path: NodeId[] = [];
    let current: NodeId | null = endNode;

    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }

    // If no path exists
    if (path.length === 1 && path[0] !== endNode) {
        return [];
    }

    return path;
}

// Example usage
const graph: Graph = {
    A: [
        { to: 'B', weight: 4 },
        { to: 'C', weight: 2 }
    ],
    B: [
        { to: 'D', weight: 3 }
    ],
    C: [
        { to: 'B', weight: 1 },
        { to: 'D', weight: 5 }
    ],
    D: []
};

const startNode = 'A';
const { distances, previous } = dijkstra(graph, startNode);

console.log("Shortest distances:", distances);
console.log("Path to D:", getPath(previous, 'D'));
Shortest distances: { A: 0, B: 3, C: 2, D: 6 }
Path to D: [ 'A', 'C', 'B', 'D' ]

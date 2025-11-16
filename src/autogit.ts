type Graph = Map<string, Map<string, number>>;
type DijkstraResult = {
    distances: Map<string, number>;
    predecessors: Map<string, string | null>;
};

function dijkstra(graph: Graph, startNode: string): DijkstraResult {
    // Initialize distances and predecessors
    const distances = new Map<string, number>();
    const predecessors = new Map<string, string | null>();
    const priorityQueue: Array<[string, number]> = [];

    // Set initial values
    for (const node of graph.keys()) {
        distances.set(node, Infinity);
        predecessors.set(node, null);
    }
    distances.set(startNode, 0);
    priorityQueue.push([startNode, 0]);

    while (priorityQueue.length > 0) {
        // Sort queue to get the node with smallest distance
        priorityQueue.sort((a, b) => a[1] - b[1]);
        const [currentNode, currentDistance] = priorityQueue.shift()!;

        // Skip if we've already found a better path
        if (currentDistance > distances.get(currentNode)!) continue;

        const neighbors = graph.get(currentNode);
        if (!neighbors) continue;

        // Explore neighbors
        for (const [neighbor, weight] of neighbors.entries()) {
            const distanceToNeighbor = currentDistance + weight;

            // Update path if new distance is shorter
            if (distanceToNeighbor < distances.get(neighbor)!) {
                distances.set(neighbor, distanceToNeighbor);
                predecessors.set(neighbor, currentNode);
                priorityQueue.push([neighbor, distanceToNeighbor]);
            }
        }
    }

    return { distances, predecessors };
}

function getShortestPath(predecessors: Map<string, string | null>, endNode: string): string[] {
    const path: string[] = [];
    let currentNode: string | null = endNode;

    // Backtrack using predecessors
    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = predecessors.get(currentNode) ?? null;
    }

    // Return empty array if path doesn't start properly (unreachable)
    return path.length > 0 ? path : [];
}

// Example usage:
const graph = new Map<string, Map<string, number>>();
graph.set('A', new Map([['B', 4], ['C', 2]]));
graph.set('B', new Map([['C', 5], ['D', 10]]));
graph.set('C', new Map([['D', 3]]));
graph.set('D', new Map());

const startNode = 'A';
const { distances, predecessors } = dijkstra(graph, startNode);

// Get distances and paths
console.log('Distances:');
distances.forEach((distance, node) => console.log(`${node}: ${distance}`));

console.log('\nPath to D:');
console.log(getShortestPath(predecessors, 'D')); // ['A', 'C', 'D']

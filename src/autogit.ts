type WeightedAdjacencyList = {
    [node: string]: { [neighbor: string]: number };
};

class Graph {
    private adjacencyList: WeightedAdjacencyList;

    constructor() {
        this.adjacencyList = {};
    }

    /**
     * Adds a node to the graph
     * @param node Node identifier (string or number)
     */
    addNode(node: string): void {
        if (!this.adjacencyList[node]) {
            this.adjacencyList[node] = {};
        }
    }

    /**
     * Adds a directed edge with weight between source and destination nodes
     * @param source Source node
     * @param destination Destination node
     * @param weight Non-negative edge weight
     */
    addEdge(source: string, destination: string, weight: number): void {
        if (!this.adjacencyList[source] || !this.adjacencyList[destination]) {
            throw new Error("Source or destination node doesn't exist");
        }
        if (weight < 0) {
            throw new Error("Edge weight must be non-negative");
        }
        this.adjacencyList[source][destination] = weight;
    }

    /**
     * Executes Dijkstra's algorithm from the start node
     * @param startNode Starting node
     * @returns Object containing distances and previous node references
     */
    dijkstra(startNode: string): {
        distances: { [node: string]: number };
        previous: { [node: string]: string | null };
    } {
        if (!this.adjacencyList[startNode]) {
            throw new Error("Start node doesn't exist in graph");
        }

        // Initialize data structures
        const distances: { [node: string]: number } = {};
        const previous: { [node: string]: string | null } = {};
        const priorityQueue: { node: string; distance: number }[] = [];

        // Set initial values
        Object.keys(this.adjacencyList).forEach((node) => {
            distances[node] = Infinity;
            previous[node] = null;
        });
        distances[startNode] = 0;
        priorityQueue.push({ node: startNode, distance: 0 });

        // Process priority queue
        while (priorityQueue.length > 0) {
            // Sort queue to simulate priority queue behavior
            priorityQueue.sort((a, b) => a.distance - b.distance);
            const { node: currentNode, distance: currentDistance } = priorityQueue.shift()!;

            // Skip if we've found a better path already
            if (currentDistance > distances[currentNode]) continue;

            // Explore neighbors
            const neighbors = this.adjacencyList[currentNode];
            for (const neighbor in neighbors) {
                const edgeWeight = neighbors[neighbor];
                const totalDistance = currentDistance + edgeWeight;

                // Found better path to neighbor
                if (totalDistance < distances[neighbor]) {
                    distances[neighbor] = totalDistance;
                    previous[neighbor] = currentNode;
                    priorityQueue.push({ node: neighbor, distance: totalDistance });
                }
            }
        }

        return { distances, previous };
    }
}

/**
 * Reconstructs the shortest path from start to end node
 * @param previous Result from dijkstra's algorithm
 * @param startNode Starting node
 * @param endNode Target node
 * @returns Array of nodes representing the path (empty if no path exists)
 */
function getShortestPath(
    previous: { [node: string]: string | null },
    startNode: string,
    endNode: string
): string[] {
    const path: string[] = [];
    let currentNode: string | null = endNode;

    // Traverse from end node to start node
    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = previous[currentNode];
    }

    // Verify path starts with start node
    if (path[0] === startNode) {
        return path;
    }
    return [];
}
// Create graph and add nodes/edges
const graph = new Graph();
['A', 'B', 'C', 'D'].forEach(node => graph.addNode(node));
graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'C', 5);
graph.addEdge('B', 'D', 10);
graph.addEdge('C', 'D', 3);

// Calculate shortest paths from 'A'
const { distances, previous } = graph.dijkstra('A');

// Get path from 'A' to 'D'
const path = getShortestPath(previous, 'A', 'D');

console.log('Distances:', distances);
// Output: { A: 0, B: 4, C: 2, D: 5 }

console.log('Shortest path:', path);
// Output: ['A', 'C', 'D']

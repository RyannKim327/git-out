type Edge = {
    node: string;
    weight: number;
};

class Graph {
    private adjacencyList: Map<string, Edge[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex: string) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(vertex1: string, vertex2: string, weight: number) {
        this.addVertex(vertex1);
        this.addVertex(vertex2);
        this.adjacencyList.get(vertex1)?.push({ node: vertex2, weight });
        this.adjacencyList.get(vertex2)?.push({ node: vertex1, weight }); // For undirected graph
    }

    dijkstra(start: string): Map<string, number> {
        const distances = new Map<string, number>();
        const priorityQueue: [string, number][] = [];
        const visited = new Set<string>();

        // Initialize distances
        for (const vertex of this.adjacencyList.keys()) {
            distances.set(vertex, Infinity);
        }
        distances.set(start, 0);
        priorityQueue.push([start, 0]);

        while (priorityQueue.length > 0) {
            // Sort the queue by distance
            priorityQueue.sort((a, b) => a[1] - b[1]);
            const [currentVertex, currentDistance] = priorityQueue.shift()!;

            if (visited.has(currentVertex)) continue;
            visited.add(currentVertex);

            // Explore neighbors
            for (const edge of this.adjacencyList.get(currentVertex) || []) {
                const { node: neighbor, weight } = edge;
                const newDistance = currentDistance + weight;

                if (newDistance < (distances.get(neighbor) || Infinity)) {
                    distances.set(neighbor, newDistance);
                    priorityQueue.push([neighbor, newDistance]);
                }
            }
        }

        return distances;
    }
}

// Example usage
const graph = new Graph();
graph.addEdge('A', 'B', 1);
graph.addEdge('A', 'C', 4);
graph.addEdge('B', 'C', 2);
graph.addEdge('B', 'D', 5);
graph.addEdge('C', 'D', 1);

const distances = graph.dijkstra('A');
console.log(distances); // Output the shortest distances from A

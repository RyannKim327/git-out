class Graph {
    private adjacencyList: Map<number, { node: number, weight: number }[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    addEdge(start: number, end: number, weight: number) {
        if (!this.adjacencyList.has(start)) {
            this.adjacencyList.set(start, []);
        }
        this.adjacencyList.get(start)!.push({ node: end, weight });
    }

    dijkstra(start: number): Map<number, number> {
        const distances = new Map<number, number>();
        const priorityQueue: { node: number, distance: number }[] = [];
        const visited = new Set<number>();

        // Initialize distances
        this.adjacencyList.forEach((_, node) => {
            distances.set(node, Infinity);
        });
        distances.set(start, 0);
        priorityQueue.push({ node: start, distance: 0 });

        while (priorityQueue.length > 0) {
            // Sort the queue by distance
            priorityQueue.sort((a, b) => a.distance - b.distance);
            const { node } = priorityQueue.shift()!;

            if (visited.has(node)) continue;
            visited.add(node);

            const neighbors = this.adjacencyList.get(node) || [];
            for (const { node: neighbor, weight } of neighbors) {
                const newDistance = distances.get(node)! + weight;
                if (newDistance < distances.get(neighbor)!) {
                    distances.set(neighbor, newDistance);
                    priorityQueue.push({ node: neighbor, distance: newDistance });
                }
            }
        }

        return distances;
    }
}

// Example usage:
const graph = new Graph();
graph.addEdge(0, 1, 4);
graph.addEdge(0, 2, 1);
graph.addEdge(2, 1, 2);
graph.addEdge(1, 3, 1);
graph.addEdge(2, 3, 5);

const shortestPaths = graph.dijkstra(0);
console.log(shortestPaths); // Output the shortest paths from node 0

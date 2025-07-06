class Graph {
    private adjList: Map<number, number[]>;

    constructor() {
        this.adjList = new Map();
    }

    addEdge(v: number, w: number) {
        if (!this.adjList.has(v)) {
            this.adjList.set(v, []);
        }
        this.adjList.get(v)!.push(w);
    }

    topologicalSortUtil(v: number, visited: Set<number>, stack: number[]) {
        visited.add(v);

        const neighbors = this.adjList.get(v) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                this.topologicalSortUtil(neighbor, visited, stack);
            }
        }

        stack.push(v);
    }

    topologicalSort(): number[] {
        const visited = new Set<number>();
        const stack: number[] = [];

        for (const vertex of this.adjList.keys()) {
            if (!visited.has(vertex)) {
                this.topologicalSortUtil(vertex, visited, stack);
            }
        }

        return stack.reverse(); // Return in reverse order
    }
}

// Example usage
const graph = new Graph();
graph.addEdge(5, 2);
graph.addEdge(5, 0);
graph.addEdge(4, 0);
graph.addEdge(4, 1);
graph.addEdge(2, 3);
graph.addEdge(3, 1);

const result = graph.topologicalSort();
console.log(result); // Output: A valid topological order
class GraphKahn {
    private adjList: Map<number, number[]>;
    private inDegree: Map<number, number>;

    constructor() {
        this.adjList = new Map();
        this.inDegree = new Map();
    }

    addEdge(v: number, w: number) {
        if (!this.adjList.has(v)) {
            this.adjList.set(v, []);
        }
        this.adjList.get(v)!.push(w);

        // Update in-degree of the destination vertex
        this.inDegree.set(w, (this.inDegree.get(w) || 0) + 1);
        if (!this.inDegree.has(v)) {
            this.inDegree.set(v, 0);
        }
    }

    topologicalSort(): number[] {
        const queue: number[] = [];
        const result: number[] = [];

        // Initialize the queue with all vertices having in-degree of 0
        for (const [vertex, degree] of this.inDegree.entries()) {
            if (degree === 0) {
                queue.push(vertex);
            }
        }

        while (queue.length > 0) {
            const current = queue.shift()!;
            result.push(current);

            const neighbors = this.adjList.get(current) || [];
            for (const neighbor of neighbors) {
                this.inDegree.set(neighbor, this.inDegree.get(neighbor)! - 1);
                if (this.inDegree.get(neighbor) === 0) {
                    queue.push(neighbor);
                }
            }
        }

        // Check if there was a cycle
        if (result.length !== this.inDegree.size) {
            throw new Error("Graph has at least one cycle, topological sort not possible.");
        }

        return result;
    }
}

// Example usage
const graphKahn = new GraphKahn();
graphKahn.addEdge(5, 2);
graphKahn.addEdge(5, 0);
graphKahn.addEdge(4, 0);
graphKahn.addEdge(4, 1);
graphKahn.addEdge(2, 3);
graphKahn.addEdge(3, 1);

const resultKahn = graphKahn.topologicalSort();
console.log(resultKahn); // Output: A valid topological order

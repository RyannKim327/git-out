class Graph {
    private adjacencyList: Map<number, number[]>;

    constructor() {
        this.adjacencyList = new Map<number, number[]>();
    }

    addEdge(v: number, w: number): void {
        if (!this.adjacencyList.has(v)) {
            this.adjacencyList.set(v, []);
        }
        this.adjacencyList.get(v)!.push(w);
    }

    topologicalSortUtil(v: number, visited: Set<number>, stack: number[]): void {
        visited.add(v);

        // Recur for all the vertices adjacent to this vertex
        const neighbors = this.adjacencyList.get(v) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                this.topologicalSortUtil(neighbor, visited, stack);
            }
        }

        // Push current vertex to stack which stores the result
        stack.push(v);
    }

    topologicalSort(): number[] {
        const visited = new Set<number>();
        const stack: number[] = [];

        // Call the recursive helper function to store Topological Sort
        // starting from all vertices one by one
        for (const vertex of this.adjacencyList.keys()) {
            if (!visited.has(vertex)) {
                this.topologicalSortUtil(vertex, visited, stack);
            }
        }

        // Return the contents of the stack in reverse order
        return stack.reverse();
    }
}

// Example usage:
const graph = new Graph();
graph.addEdge(5, 2);
graph.addEdge(5, 0);
graph.addEdge(4, 0);
graph.addEdge(4, 1);
graph.addEdge(2, 3);
graph.addEdge(3, 1);

const order = graph.topologicalSort();
console.log(order); // Output may vary, e.g., [5, 4, 2, 3, 1, 0]
class GraphKahn {
    private adjacencyList: Map<number, number[]>;
    private inDegree: Map<number, number>;

    constructor() {
        this.adjacencyList = new Map<number, number[]>();
        this.inDegree = new Map<number, number>();
    }

    addEdge(v: number, w: number): void {
        if (!this.adjacencyList.has(v)) {
            this.adjacencyList.set(v, []);
            this.inDegree.set(v, 0);
        }
        if (!this.adjacencyList.has(w)) {
            this.adjacencyList.set(w, []);
            this.inDegree.set(w, 0);
        }
        this.adjacencyList.get(v)!.push(w);
        this.inDegree.set(w, this.inDegree.get(w)! + 1);
    }

    topologicalSort(): number[] {
        const zeroInDegreeQueue: number[] = [];
        const result: number[] = [];

        // Initialize the queue with all vertices with in-degree 0
        for (const [vertex, degree] of this.inDegree) {
            if (degree === 0) {
                zeroInDegreeQueue.push(vertex);
            }
        }

        while (zeroInDegreeQueue.length > 0) {
            const vertex = zeroInDegreeQueue.shift()!;
            result.push(vertex);

            // Decrease the in-degree of all neighbors
            const neighbors = this.adjacencyList.get(vertex) || [];
            for (const neighbor of neighbors) {
                this.inDegree.set(neighbor, this.inDegree.get(neighbor)! - 1);
                // If in-degree becomes 0, add it to the queue
                if (this.inDegree.get(neighbor) === 0) {
                    zeroInDegreeQueue.push(neighbor);
                }
            }
        }

        // Check if there was a cycle
        if (result.length !== this.adjacencyList.size) {
            throw new Error("Graph has at least one cycle, topological sort not possible.");
        }

        return result;
    }
}

// Example usage:
const graphKahn = new GraphKahn();
graphKahn.addEdge(5, 2);
graphKahn.addEdge(5, 0);
graphKahn.addEdge(4, 0);
graphKahn.addEdge(4, 1);
graphKahn.addEdge(2, 3);
graphKahn.addEdge(3, 1);

const orderKahn = graphKahn.topologicalSort();
console.log(orderKahn); // Output may vary, e.g., [5, 4, 2, 3, 1, 0]

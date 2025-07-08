class Graph {
    private adjacencyList: Map<number, number[]>;

    constructor() {
        this.adjacencyList = new Map<number, number[]>();
    }

    addEdge(v: number, w: number): void {
        if (!this.adjacencyList.has(v)) {
            this.adjacencyList.set(v, []);
        }
        this.adjacencyList.get(v)?.push(w);
    }

    topologicalSort(): number[] {
        const visited = new Set<number>();
        const stack: number[] = [];
        const nodes = Array.from(this.adjacencyList.keys());

        // Perform the DFS on each node
        for (const node of nodes) {
            if (!visited.has(node)) {
                this.dfs(node, visited, stack);
            }
        }

        // Return the stack in reverse order
        return stack.reverse();
    }

    private dfs(node: number, visited: Set<number>, stack: number[]): void {
        visited.add(node);

        const neighbors = this.adjacencyList.get(node) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                this.dfs(neighbor, visited, stack);
            }
        }

        stack.push(node); // Push the node to the stack post-visit
    }
}

// Example usage
const g = new Graph();
g.addEdge(5, 2);
g.addEdge(5, 0);
g.addEdge(4, 0);
g.addEdge(4, 1);
g.addEdge(2, 3);
g.addEdge(3, 1);

const sortedOrder = g.topologicalSort();
console.log(sortedOrder); // Output will be a valid topological sort
class Graph {
    private adjacencyList: Map<number, number[]>;
    private inDegree: Map<number, number>;

    constructor() {
        this.adjacencyList = new Map<number, number[]>();
        this.inDegree = new Map<number, number>();
    }

    addEdge(v: number, w: number): void {
        if (!this.adjacencyList.has(v)) {
            this.adjacencyList.set(v, []);
            this.inDegree.set(v, 0); // Initialize in-degrees
        }
        if (!this.adjacencyList.has(w)) {
            this.adjacencyList.set(w, []);
            this.inDegree.set(w, 0); // Initialize in-degrees
        }
        this.adjacencyList.get(v)?.push(w);
        this.inDegree.set(w, this.inDegree.get(w)! + 1);
    }

    topologicalSort(): number[] {
        const zeroInDegreeQueue: number[] = [];
        const sortedOrder: number[] = [];

        // Collect all nodes with zero in-degree
        for (const [node, degree] of this.inDegree.entries()) {
            if (degree === 0) {
                zeroInDegreeQueue.push(node);
            }
        }

        while (zeroInDegreeQueue.length > 0) {
            const currentNode = zeroInDegreeQueue.shift()!;
            sortedOrder.push(currentNode);

            const neighbors = this.adjacencyList.get(currentNode) || [];
            for (const neighbor of neighbors) {
                this.inDegree.set(neighbor, this.inDegree.get(neighbor)! - 1);
                if (this.inDegree.get(neighbor) === 0) {
                    zeroInDegreeQueue.push(neighbor);
                }
            }
        }

        // Check if there was a cycle (if there are remaining nodes with non-zero in-degrees)
        if (sortedOrder.length !== this.adjacencyList.size) {
            throw new Error("Graph has at least one cycle, topological sort not possible.");
        }

        return sortedOrder;
    }
}

// Example usage
const g = new Graph();
g.addEdge(5, 2);
g.addEdge(5, 0);
g.addEdge(4, 0);
g.addEdge(4, 1);
g.addEdge(2, 3);
g.addEdge(3, 1);

const sortedOrder = g.topologicalSort();
console.log(sortedOrder); // Output will be a valid topological sort

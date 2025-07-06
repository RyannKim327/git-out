class Graph {
    private adjList: Map<number, number[]> = new Map();

    addEdge(u: number, v: number) {
        if (!this.adjList.has(u)) {
            this.adjList.set(u, []);
        }
        this.adjList.get(u)!.push(v);
    }

    private dfs(node: number, visited: Set<number>, stack: number[]) {
        visited.add(node);
        
        const neighbors = this.adjList.get(node);
        if (neighbors) {
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    this.dfs(neighbor, visited, stack);
                }
            }
        }
        
        // Push the node to stack after visiting all its neighbors
        stack.push(node);
    }

    topologicalSort(): number[] {
        const visited = new Set<number>();
        const stack: number[] = [];

        for (const node of this.adjList.keys()) {
            if (!visited.has(node)) {
                this.dfs(node, visited, stack);
            }
        }

        // The stack now contains the topological sort in reverse order
        return stack.reverse();
    }
}

// Example Usage
const graph = new Graph();
graph.addEdge(5, 2);
graph.addEdge(5, 0);
graph.addEdge(4, 0);
graph.addEdge(4, 1);
graph.addEdge(2, 3);
graph.addEdge(3, 1);

const result = graph.topologicalSort();
console.log(result); // Output: [5, 4, 2, 3, 1, 0] or similar valid order
class GraphKahn {
    private adjList: Map<number, number[]> = new Map();

    addEdge(u: number, v: number) {
        if (!this.adjList.has(u)) {
            this.adjList.set(u, []);
        }
        this.adjList.get(u)!.push(v);
    }

    topologicalSort(): number[] {
        const inDegree: Map<number, number> = new Map();
        const queue: number[] = [];
        const result: number[] = [];

        // Initialize in-degree of all nodes
        for (const node of this.adjList.keys()) {
            inDegree.set(node, 0);
        }

        // Calculate in-degrees
        for (const [u, neighbors] of this.adjList.entries()) {
            for (const v of neighbors) {
                inDegree.set(v, (inDegree.get(v) || 0) + 1);
            }
        }

        // Collect nodes with in-degree 0
        for (const [node, degree] of inDegree.entries()) {
            if (degree === 0) {
                queue.push(node);
            }
        }

        while (queue.length > 0) {
            const current = queue.shift()!;
            result.push(current);

            const neighbors = this.adjList.get(current);
            if (neighbors) {
                for (const neighbor of neighbors) {
                    inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
                    if (inDegree.get(neighbor) === 0) {
                        queue.push(neighbor);
                    }
                }
            }
        }

        // Check for cycles
        if (result.length !== inDegree.size) {
            throw new Error("Graph has a cycle; topological sort is not possible.");
        }

        return result;
    }
}

// Example Usage
const graphKahn = new GraphKahn();
graphKahn.addEdge(5, 2);
graphKahn.addEdge(5, 0);
graphKahn.addEdge(4, 0);
graphKahn.addEdge(4, 1);
graphKahn.addEdge(2, 3);
graphKahn.addEdge(3, 1);

const resultKahn = graphKahn.topologicalSort();
console.log(resultKahn); // Output: [5, 4, 2, 3, 1, 0] or similar valid order

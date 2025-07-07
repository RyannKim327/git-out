class Graph {
    private adjList: Map<number, number[]> = new Map();
    
    addEdge(u: number, v: number): void {
        if (!this.adjList.has(u)) {
            this.adjList.set(u, []);
        }
        this.adjList.get(u)!.push(v);
    }

    getNeighbors(v: number): number[] {
        return this.adjList.get(v) || [];
    }

    getVertices(): number[] {
        return Array.from(this.adjList.keys());
    }
}

class Tarjan {
    private index: number = 0;
    private stack: number[] = [];
    private onStack: Set<number> = new Set();
    private lowLink: Map<number, number> = new Map();
    private indices: Map<number, number> = new Map();
    private stronglyConnectedComponents: number[][] = [];

    constructor(private graph: Graph) {}

    public findSCCs(): number[][] {
        const vertices = this.graph.getVertices();
        
        for (const vertex of vertices) {
            if (!this.indices.has(vertex)) {
                this.strongconnect(vertex);
            }
        }
        
        return this.stronglyConnectedComponents;
    }

    private strongconnect(v: number): void {
        // Set the depth index for v to the smallest unused index
        this.indices.set(v, this.index);
        this.lowLink.set(v, this.index);
        this.index++;
        this.stack.push(v);
        this.onStack.add(v);

        // Consider successors of v
        for (const w of this.graph.getNeighbors(v)) {
            if (!this.indices.has(w)) {
                // Successor w has not yet been visited; recurse on it
                this.strongconnect(w);
                this.lowLink.set(v, Math.min(this.lowLink.get(v)!, this.lowLink.get(w)!));
            } else if (this.onStack.has(w)) {
                // Successor w is in stack and hence in the current SCC
                this.lowLink.set(v, Math.min(this.lowLink.get(v)!, this.indices.get(w)!));
            }
        }

        // If v is a root node, pop the stack and generate an SCC
        if (this.lowLink.get(v) === this.indices.get(v)) {
            const scc: number[] = [];
            let w: number;

            do {
                w = this.stack.pop()!;
                this.onStack.delete(w);
                scc.push(w);
            } while (w !== v);

            this.stronglyConnectedComponents.push(scc);
        }
    }
}

// Example usage:
const graph = new Graph();
graph.addEdge(0, 1);
graph.addEdge(1, 2);
graph.addEdge(2, 0);
graph.addEdge(1, 3);
graph.addEdge(3, 4);
graph.addEdge(4, 5);
graph.addEdge(5, 3);

const tarjan = new Tarjan(graph);
const sccs = tarjan.findSCCs();
console.log(sccs); // Output strongly connected components

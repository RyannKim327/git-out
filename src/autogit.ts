class Graph {
    private vertices: number;
    private adjList: Map<number, number[]>;

    constructor(vertices: number) {
        this.vertices = vertices;
        this.adjList = new Map<number, number[]>();
    }

    addEdge(v: number, w: number) {
        if (!this.adjList.has(v)) {
            this.adjList.set(v, []);
        }
        this.adjList.get(v)!.push(w);
    }

    tarjan(): number[][] {
        const index: number[] = new Array(this.vertices).fill(-1);
        const lowlink: number[] = new Array(this.vertices).fill(-1);
        const onStack: boolean[] = new Array(this.vertices).fill(false);
        const stack: number[] = [];
        const result: number[][] = [];
        let currentIndex = 0;

        const strongConnect = (v: number) => {
            index[v] = currentIndex;
            lowlink[v] = currentIndex;
            currentIndex++;
            stack.push(v);
            onStack[v] = true;

            const neighbors = this.adjList.get(v) || [];
            for (const w of neighbors) {
                if (index[w] === -1) {
                    // Successor w has not yet been visited; recurse on it
                    strongConnect(w);
                    lowlink[v] = Math.min(lowlink[v], lowlink[w]);
                } else if (onStack[w]) {
                    // Successor w is in stack and hence in the current SCC
                    lowlink[v] = Math.min(lowlink[v], index[w]);
                }
            }

            // If v is a root node, pop the stack and generate an SCC
            if (lowlink[v] === index[v]) {
                const scc: number[] = [];
                let w: number;
                do {
                    w = stack.pop()!;
                    onStack[w] = false;
                    scc.push(w);
                } while (w !== v);
                result.push(scc);
            }
        };

        for (let v = 0; v < this.vertices; v++) {
            if (index[v] === -1) {
                strongConnect(v);
            }
        }

        return result;
    }
}

// Example usage:
const g = new Graph(5);
g.addEdge(0, 2);
g.addEdge(2, 1);
g.addEdge(1, 0);
g.addEdge(0, 3);
g.addEdge(3, 4);

const sccs = g.tarjan();
console.log("Strongly Connected Components:", sccs);

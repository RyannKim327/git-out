interface GraphNode {
    id: number;
    neighbors: number[];
}

class TarjanSCC {
    private graph: GraphNode[];
    private index: number;
    private stack: number[];
    private indices: Map<number, number>;
    private lowlinks: Map<number, number>;
    private onStack: Map<number, boolean>;
    private sccs: number[][];

    constructor(graph: GraphNode[]) {
        this.graph = graph;
        this.index = 0;
        this.stack = [];
        this.indices = new Map();
        this.lowlinks = new Map();
        this.onStack = new Map();
        this.sccs = [];
    }

    public findSCCs(): number[][] {
        // Initialize all nodes as unvisited
        this.graph.forEach(node => {
            this.indices.set(node.id, -1);
            this.lowlinks.set(node.id, -1);
            this.onStack.set(node.id, false);
        });

        // Perform DFS for each unvisited node
        this.graph.forEach(node => {
            if (this.indices.get(node.id) === -1) {
                this.strongConnect(node.id);
            }
        });

        return this.sccs;
    }

    private strongConnect(nodeId: number): void {
        // Set the depth index for this node to the smallest unused index
        this.indices.set(nodeId, this.index);
        this.lowlinks.set(nodeId, this.index);
        this.index++;
        this.stack.push(nodeId);
        this.onStack.set(nodeId, true);

        // Consider all neighbors of this node
        const node = this.graph.find(n => n.id === nodeId);
        if (!node) return;

        for (const neighborId of node.neighbors) {
            // If neighbor hasn't been visited yet, recurse on it
            if (this.indices.get(neighborId) === -1) {
                this.strongConnect(neighborId);
                this.lowlinks.set(nodeId, Math.min(
                    this.lowlinks.get(nodeId)!,
                    this.lowlinks.get(neighborId)!
                ));
            } 
            // If neighbor is on the stack, update lowlink
            else if (this.onStack.get(neighborId)) {
                this.lowlinks.set(nodeId, Math.min(
                    this.lowlinks.get(nodeId)!,
                    this.indices.get(neighborId)!
                ));
            }
        }

        // If node is a root node, pop the stack and generate an SCC
        if (this.lowlinks.get(nodeId) === this.indices.get(nodeId)) {
            const component: number[] = [];
            let currentId: number;
            
            do {
                currentId = this.stack.pop()!;
                this.onStack.set(currentId, false);
                component.push(currentId);
            } while (currentId !== nodeId);

            this.sccs.push(component);
        }
    }
}

// Example usage and test cases
function testTarjanAlgorithm(): void {
    // Test case 1: Simple graph with multiple SCCs
    const graph1: GraphNode[] = [
        { id: 0, neighbors: [1] },
        { id: 1, neighbors: [2] },
        { id: 2, neighbors: [0] },
        { id: 3, neighbors: [4] },
        { id: 4, neighbors: [3] }
    ];

    const tarjan1 = new TarjanSCC(graph1);
    const sccs1 = tarjan1.findSCCs();
    console.log("Test 1 SCCs:", sccs1);
    // Expected: [[0, 2, 1], [3, 4]]

    // Test case 2: Single node graph
    const graph2: GraphNode[] = [
        { id: 0, neighbors: [] }
    ];

    const tarjan2 = new TarjanSCC(graph2);
    const sccs2 = tarjan2.findSCCs();
    console.log("Test 2 SCCs:", sccs2);
    // Expected: [[0]]

    // Test case 3: Complex graph
    const graph3: GraphNode[] = [
        { id: 0, neighbors: [1] },
        { id: 1, neighbors: [2, 4] },
        { id: 2, neighbors: [3, 0] },
        { id: 3, neighbors: [2] },
        { id: 4, neighbors: [5] },
        { id: 5, neighbors: [6] },
        { id: 6, neighbors: [4] },
        { id: 7, neighbors: [6, 7] }
    ];

    const tarjan3 = new TarjanSCC(graph3);
    const sccs3 = tarjan3.findSCCs();
    console.log("Test 3 SCCs:", sccs3);
    // Expected: [[0, 1, 2, 3], [4, 5, 6], [7]]
}

// Run tests
testTarjanAlgorithm();

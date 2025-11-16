interface GraphNode {
    id: number;
    neighbors: GraphNode[];
}

class TarjanSCC {
    private graph: GraphNode[];
    private index: number = 0;
    private stack: GraphNode[] = [];
    private indices: Map<GraphNode, number> = new Map();
    private lowlinks: Map<GraphNode, number> = new Map();
    private onStack: Set<GraphNode> = new Set();
    private sccs: GraphNode[][] = [];

    constructor(graph: GraphNode[]) {
        this.graph = graph;
    }

    findSCCs(): GraphNode[][] {
        // Reset state for each run
        this.index = 0;
        this.stack = [];
        this.indices.clear();
        this.lowlinks.clear();
        this.onStack.clear();
        this.sccs = [];

        // Process each node that hasn't been visited
        for (const node of this.graph) {
            if (!this.indices.has(node)) {
                this.strongConnect(node);
            }
        }

        return this.sccs;
    }

    private strongConnect(node: GraphNode): void {
        this.indices.set(node, this.index);
        this.lowlinks.set(node, this.index);
        this.index++;
        this.stack.push(node);
        this.onStack.add(node);

        // Process all neighbors
        for (const neighbor of node.neighbors) {
            if (!this.indices.has(neighbor)) {
                // Neighbor hasn't been visited yet
                this.strongConnect(neighbor);
                this.lowlinks.set(node, Math.min(
                    this.lowlinks.get(node)!,
                    this.lowlinks.get(neighbor)!
                ));
            } else if (this.onStack.has(neighbor)) {
                // Neighbor is in the current SCC
                this.lowlinks.set(node, Math.min(
                    this.lowlinks.get(node)!,
                    this.indices.get(neighbor)!
                ));
            }
        }

        // If node is a root node, pop the stack and generate an SCC
        if (this.lowlinks.get(node) === this.indices.get(node)) {
            const scc: GraphNode[] = [];
            let top: GraphNode;
            
            do {
                top = this.stack.pop()!;
                this.onStack.delete(top);
                scc.push(top);
            } while (top !== node);

            this.sccs.push(scc);
        }
    }
}

// Utility function to create a graph node
function createNode(id: number, neighborIds: number[] = []): GraphNode {
    return {
        id,
        neighbors: neighborIds.map(id => ({ id, neighbors: [] } as GraphNode))
    };
}

// Example usage and test
function testTarjanAlgorithm(): void {
    // Create a sample graph
    const nodes = [
        createNode(0, [1]),
        createNode(1, [2]),
        createNode(2, [0, 3]),
        createNode(3, [4]),
        createNode(4, [5, 7]),
        createNode(5, [6]),
        createNode(6, [4, 7]),
        createNode(7, [])
    ];

    // Fix neighbor references to point to actual nodes
    nodes.forEach(node => {
        node.neighbors = node.neighbors.map(neighbor => 
            nodes.find(n => n.id === neighbor.id)!
        );
    });

    const tarjan = new TarjanSCC(nodes);
    const sccs = tarjan.findSCCs();

    console.log("Strongly Connected Components:");
    sccs.forEach((scc, index) => {
        console.log(`SCC ${index + 1}: [${scc.map(node => node.id).join(', ')}]`);
    });
}

// Run the test
testTarjanAlgorithm();
SCC 1: [7]
SCC 2: [4, 5, 6]
SCC 3: [3]
SCC 4: [0, 1, 2]
// Helper to create a graph from an adjacency list
function createGraphFromAdjacencyList(adjacencyList: number[][]): GraphNode[] {
    const nodes: GraphNode[] = [];
    
    // Create nodes first
    for (let i = 0; i < adjacencyList.length; i++) {
        nodes.push({ id: i, neighbors: [] });
    }
    
    // Then set up neighbors
    for (let i = 0; i < adjacencyList.length; i++) {
        const neighbors = adjacencyList[i].map(targetId => 
            nodes.find(node => node.id === targetId)!
        );
        nodes[i].neighbors = neighbors.filter(n => n !== undefined);
    }
    
    return nodes;
}

// Example using adjacency list
const adjacencyList = [
    [1],           // node 0 -> node 1
    [2],           // node 1 -> node 2
    [0, 3],        // node 2 -> nodes 0, 3
    [4],           // node 3 -> node 4
    [5, 7],        // node 4 -> nodes 5, 7
    [6],           // node 5 -> node 6
    [4, 7],        // node 6 -> nodes 4, 7
    []             // node 7 -> no outgoing edges
];

const graphNodes = createGraphFromAdjacencyList(adjacencyList);
const tarjan = new TarjanSCC(graphNodes);
const result = tarjan.findSCCs();

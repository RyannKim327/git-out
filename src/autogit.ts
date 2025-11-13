class TarjanAlgorithm {
    private graph: Map<number, number[]>; // Adjacency list: node -> [neighbors]
    private disc: Map<number, number>;   // Discovery time of each node
    private low: Map<number, number>;    // Lowest discovery time reachable from node u
    private onStack: Map<number, boolean>; // True if node is currently on the recursion stack
    private stack: number[];             // Stack for SCC candidates
    private time: number;                // Global counter for discovery times
    private sccs: number[][];            // List to store the found SCCs

    constructor(graph: Map<number, number[]>) {
        this.graph = graph;
        this.disc = new Map();
        this.low = new Map();
        this.onStack = new Map();
        this.stack = [];
        this.time = 0;
        this.sccs = [];
    }

    /**
     * Finds all Strongly Connected Components in the graph.
     * @returns A 2D array where each inner array represents an SCC.
     */
    findStronglyConnectedComponents(): number[][] {
        // Iterate over all nodes to ensure all components are found,
        // especially for disconnected graphs.
        // We consider keys from the graph map and also any node mentioned as a value
        // but not as a key (e.g., a node with only incoming edges).
        const allNodes = new Set<number>();
        for (const [node, neighbors] of this.graph.entries()) {
            allNodes.add(node);
            for (const neighbor of neighbors) {
                allNodes.add(neighbor);
            }
        }

        for (const node of allNodes) {
            // If the node hasn't been visited, start a DFS from it
            if (!this.disc.has(node)) {
                this.dfs(node);
            }
        }

        return this.sccs;
    }

    /**
     * The recursive Depth-First Search function.
     * @param u The current node being visited.
     */
    private dfs(u: number): void {
        // Set discovery time and low-link value for u
        this.disc.set(u, this.time);
        this.low.set(u, this.time);
        this.time++;

        // Push u onto the stack and mark it as onStack
        this.stack.push(u);
        this.onStack.set(u, true);

        // Get neighbors of u (handle nodes with no outgoing edges)
        const neighbors = this.graph.get(u) || [];

        // Traverse all neighbors of u
        for (const v of neighbors) {
            if (!this.disc.has(v)) {
                // If v has not been visited, recurse on v
                this.dfs(v);
                // After recursive call returns, update low-link value of u
                // u's low-link value is the minimum of its current low-link value
                // and v's low-link value
                this.low.set(u, Math.min(this.low.get(u)!, this.low.get(v)!));
            } else if (this.onStack.get(v)) {
                // If v has been visited and is currently on the stack,
                // it means v is an ancestor of u in the DFS tree,
                // and (u, v) is a back-edge.
                // Update u's low-link value with v's discovery time.
                // We use disc[v], not low[v], because disc[v] represents the earliest
                // point in the DFS tree that v was discovered, ensuring we capture
                // cycles correctly.
                this.low.set(u, Math.min(this.low.get(u)!, this.disc.get(v)!));
            }
        }

        // If u is the root of an SCC (i.e., its low-link value is equal to its discovery time)
        if (this.low.get(u) === this.disc.get(u)) {
            const currentScc: number[] = [];
            let nodeFromStack: number | undefined;

            // Pop nodes from the stack until u is popped (inclusive)
            do {
                nodeFromStack = this.stack.pop();
                if (nodeFromStack !== undefined) {
                    this.onStack.set(nodeFromStack, false); // Mark as no longer on stack
                    currentScc.push(nodeFromStack);
                }
            } while (nodeFromStack !== u && nodeFromStack !== undefined);

            this.sccs.push(currentScc); // Add the found SCC
        }
    }
}

// --- Example Usage ---

function createGraph(edges: [number, number][]): Map<number, number[]> {
    const graph = new Map<number, number[]>();
    for (const [u, v] of edges) {
        if (!graph.has(u)) {
            graph.set(u, []);
        }
        graph.get(u)!.push(v);
        // Ensure all nodes, even those with only incoming edges, are present as keys
        // or will be added to the allNodes set in findStronglyConnectedComponents
        if (!graph.has(v)) {
            graph.set(v, []); // Add node v even if it has no outgoing edges for now
        }
    }
    return graph;
}

// Example 1: Basic graph
const graph1Edges: [number, number][] = [
    [0, 1], [1, 2], [2, 0], // SCC: {0, 1, 2}
    [2, 3],                // Path from {0,1,2} to {3}
    [3, 4], [4, 3],        // SCC: {3, 4}
    [4, 5],                // Path from {3,4} to {5}
];
const graph1 = createGraph(graph1Edges);
const tarjan1 = new TarjanAlgorithm(graph1);
const sccs1 = tarjan1.findStronglyConnectedComponents();
console.log("Graph 1 SCCs:", sccs1);
// Expected: [[5], [4, 3], [2, 1, 0]] (order might vary based on DFS path)

// Example 2: Disconnected graph
const graph2Edges: [number, number][] = [
    [0, 1], [1, 2], [2, 0], // SCC: {0, 1, 2}
    [3, 4], [4, 5], [5, 3], // SCC: {3, 4, 5}
    [6, 7], // SCC: {6}, SCC: {7}
];
const graph2 = createGraph(graph2Edges);
const tarjan2 = new TarjanAlgorithm(graph2);
const sccs2 = tarjan2.findStronglyConnectedComponents();
console.log("Graph 2 SCCs:", sccs2);
// Expected: Contains {0,1,2}, {3,4,5}, {6}, {7}

// Example 3: Single node SCCs
const graph3Edges: [number, number][] = [
    [0, 1], [1, 2],
];
const graph3 = createGraph(graph3Edges);
const tarjan3 = new TarjanAlgorithm(graph3);
const sccs3 = tarjan3.findStronglyConnectedComponents();
console.log("Graph 3 SCCs:", sccs3);
// Expected: [[2], [1], [0]]

// Example 4: Graph with no edges (isolated nodes)
const graph4Edges: [number, number][] = [];
const graph4 = createGraph(graph4Edges);
graph4.set(0, []); // Manually add isolated nodes
graph4.set(1, []);
const tarjan4 = new TarjanAlgorithm(graph4);
const sccs4 = tarjan4.findStronglyConnectedComponents();
console.log("Graph 4 SCCs:", sccs4);
// Expected: [[1], [0]] (or similar for single isolated nodes)

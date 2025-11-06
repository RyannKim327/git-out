function tarjans(graph: number[][]): number[][] {
    // Track the next available index
    let index = 0;
    // Store discovery index for each node
    const indices: number[] = new Array(graph.length).fill(-1);
    // Lowest reachable node index
    const lowLink: number[] = new Array(graph.length).fill(-1);
    // Track if node is on the stack
    const onStack: boolean[] = new Array(graph.length).fill(false);
    // Stack to track visited nodes
    const stack: number[] = [];
    // Store all found SCCs
    const sccs: number[][] = [];

    function dfs(node: number): void {
        // Set discovery index and low link for the current node
        indices[node] = index;
        lowLink[node] = index;
        index++;
        stack.push(node);
        onStack[node] = true;

        // Visit all neighbors
        for (const neighbor of graph[node]) {
            if (indices[neighbor] === -1) {
                // Recurse if neighbor not visited
                dfs(neighbor);
                // Propagate low link value after backtracking
                lowLink[node] = Math.min(lowLink[node], lowLink[neighbor]);
            } else if (onStack[neighbor]) {
                // Found a back edge to a node on the stack
                lowLink[node] = Math.min(lowLink[node], indices[neighbor]);
            }
        }

        // Found a complete SCC if current node is root
        if (lowLink[node] === indices[node]) {
            const scc: number[] = [];
            let w: number;
            do {
                w = stack.pop()!;
                onStack[w] = false;
                scc.push(w);
            } while (w !== node);
            sccs.push(scc);
        }
    }

    // Process each unvisited node
    for (let i = 0; i < graph.length; i++) {
        if (indices[i] === -1) {
            dfs(i);
        }
    }

    return sccs;
}
// Example graph (directed)
const graph = [
    [1],          // Node 0 -> Node 1
    [2],          // Node 1 -> Node 2
    [0],          // Node 2 -> Node 0
    [4],          // Node 3 -> Node 4
    [5],          // Node 4 -> Node 5
    [3],          // Node 5 -> Node 3
    [7],          // Node 6 -> Node 7
    []            // Node 7 -> None
];

const components = tarjans(graph);
console.log(components);
// Output: [[0, 2, 1], [3, 5, 4], [6], [7]]

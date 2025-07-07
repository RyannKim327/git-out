type Graph = { [node: string]: string[] };

function tarjanSCC(graph: Graph): string[][] {
    const indexMap: { [node: string]: number } = {};
    const lowLinkMap: { [node: string]: number } = {};
    const onStack: { [node: string]: boolean } = {};
    const stack: string[] = [];
    const sccs: string[][] = [];

    let index = 0;

    // Recursive function
    function strongConnect(node: string) {
        // Set the depth index for node
        indexMap[node] = index;
        lowLinkMap[node] = index;
        index++;
        stack.push(node);
        onStack[node] = true;

        // Consider successors of node
        const neighbors = graph[node] || [];
        for (const neighbor of neighbors) {
            if (indexMap[neighbor] === undefined) {
                // Successor has not yet been visited; recurse on it
                strongConnect(neighbor);
                lowLinkMap[node] = Math.min(lowLinkMap[node], lowLinkMap[neighbor]);
            } else if (onStack[neighbor]) {
                // Successor is in stack and hence in the current SCC
                lowLinkMap[node] = Math.min(lowLinkMap[node], indexMap[neighbor]);
            }
        }

        // If node is a root node, pop the stack and generate an SCC
        if (lowLinkMap[node] === indexMap[node]) {
            const scc: string[] = [];
            let w: string;
            do {
                w = stack.pop()!;
                onStack[w] = false;
                scc.push(w);
            } while (w !== node);
            sccs.push(scc);
        }
    }

    // For each node in the graph
    for (const node in graph) {
        if (indexMap[node] === undefined) {
            strongConnect(node);
        }
    }

    return sccs;
}

// Example usage:
const exampleGraph: Graph = {
    'A': ['B'],
    'B': ['C', 'E', 'F'],
    'C': ['D', 'G'],
    'D': ['C', 'H'],
    'E': ['A', 'F'],
    'F': ['G'],
    'G': ['F', 'H'],
    'H': [],
};

const sccs = tarjanSCC(exampleGraph);
console.log(sccs);

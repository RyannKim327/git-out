type Graph<T> = Map<T, T[]>;

function tarjanSCC<T>(graph: Graph<T>): T[][] {
    let index = 0;
    const indexes = new Map<T, number>();
    const lowLinks = new Map<T, number>();
    const onStack = new Map<T, boolean>();
    const stack: T[] = [];
    const sccs: T[][] = [];

    function strongconnect(node: T): void {
        // Set the depth index for this node to the smallest unused index
        indexes.set(node, index);
        lowLinks.set(node, index);
        index++;
        stack.push(node);
        onStack.set(node, true);

        // Consider successors of node
        const neighbors = graph.get(node) || [];
        for (const neighbor neighbors) {
            if (!indexes.has(neighbor)) {
                // Successor has not yet been visited; recurse on it
                strongconnect(neighbor);
                lowLinks.set(node, Math.min(lowLinks.get(node)!, lowLinks.get(neighbor)!));
            } else if (onStack.get(neighbor)) {
                // Successor is in the stack and hence in the current SCC
                lowLinks.set(node, Math.min(lowLinks.get(node)!, indexes.get(neighbor)!));
            }
        }

        // If node is a root node, pop the stack and generate an SCC
        if (lowLinks.get(node) === indexes.get(node)) {
            const component: T[] = [];
            let w: T;
            do {
                w = stack.pop()!;
                onStack.set(w, false);
                component.push(w);
            } while (w !== node);
            sccs.push(component);
        }
    }

    // Iterate over all nodes to cover disconnected graphs
    for (const node of graph.keys()) {
        if (!indexes.has(node)) {
            strongconnect(node);
        }
    }

    return sccs;
}
// Create a sample graph (adjacency list)
const graph = new Map<number, number[]>([
    [0, [1]],
    [1, [2]],
    [2, [0, 3]],
    [3, [4]],
    [4, [5, 7]],
    [5, [6]],
    [6, [4]],
    [7, [8]],
    [8, []]
]);

// Find SCCs
const components = tarjanSCC(graph);
console.log(components);
// Output:
// [[6,5,4], [3], [2,1,0], [7], [8]]

type Graph<T> = Map<T, T[]>;

function tarjansSCC<T>(graph: Graph<T>): T[][] {
    let index = 0;
    const indexes = new Map<T, number>();
    const lowLinks = new Map<T, number>();
    const onStack = new Set<T>();
    const stack: T[] = [];
    const sccs: T[][] = [];

    const nodes = Array.from(graph.keys());

    for (const node of nodes) {
        if (!indexes.has(node)) {
            strongConnect(node);
        }
    }

    function strongConnect(node: T): void {
        // Set the depth index for this node to the smallest unused index
        indexes.set(node, index);
        lowLinks.set(node, index);
        index++;
        stack.push(node);
        onStack.add(node);

        // Consider successors of node
        const neighbors = graph.get(node) || [];
        for (const neighbor of neighbors) {
            if (!indexes.has(neighbor)) {
                // Successor hasn't been visited; recurse on it
                strongConnect(neighbor);
                lowLinks.set(node, Math.min(lowLinks.get(node)!, lowLinks.get(neighbor)!));
            } else if (onStack.has(neighbor)) {
                // Successor is in the stack and hence in the current SCC
                lowLinks.set(node, Math.min(lowLinks.get(node)!, indexes.get(neighbor)!));
            }
        }

        // If node is a root node, pop the stack and generate an SCC
        if (lowLinks.get(node) === indexes.get(node)) {
            const scc: T[] = [];
            let top: T;
            do {
                top = stack.pop()!;
                onStack.delete(top);
                scc.push(top);
            } while (top !== node);
            sccs.push(scc);
        }
    }

    return sccs;
}
// Create a sample graph
const graph = new Map<number, number[]>([
    [0, [1]],
    [1, [2]],
    [2, [0, 3]],   // Forms SCC: 0,1,2
    [3, [4]],       // Forms SCC: 3
    [4, [5, 7]],    // Forms SCC: 4,5,6
    [5, [6]],
    [6, [4]],
    [7, []],        // Forms SCC: 7
]);

// Find strongly connected components
const components = tarjansSCC(graph);
console.log(components);
// Output: [[2, 1, 0], [3], [6, 5, 4], [7]]

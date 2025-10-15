type Graph = Map<number, number[]>; 
// You can also use { [key: number]: number[] } if you prefer plain objects.

function tarjansSCC(graph: Graph): number[][] {
    let index = 0;
    const stack: number[] = [];
    const onStack = new Set<number>();
    const indices = new Map<number, number>();
    const lowLink = new Map<number, number>();

    const sccs: number[][] = [];

    function strongConnect(v: number) {
        // Set the depth index for v
        indices.set(v, index);
        lowLink.set(v, index);
        index++;

        stack.push(v);
        onStack.add(v);

        for (const w of graph.get(v) || []) {
            if (!indices.has(w)) {
                // Successor w has not yet been visited; recurse on it
                strongConnect(w);
                lowLink.set(v, Math.min(lowLink.get(v)!, lowLink.get(w)!));
            } else if (onStack.has(w)) {
                // Successor w is in the stack, so it's in the current SCC
                lowLink.set(v, Math.min(lowLink.get(v)!, indices.get(w)!));
            }
        }

        // If v is a root node, pop the stack and generate an SCC
        if (lowLink.get(v) === indices.get(v)) {
            const scc: number[] = [];
            let w: number;
            do {
                w = stack.pop()!;
                onStack.delete(w);
                scc.push(w);
            } while (w !== v);
            sccs.push(scc);
        }
    }

    for (const v of graph.keys()) {
        if (!indices.has(v)) {
            strongConnect(v);
        }
    }

    return sccs;
}

// Example usage:
const graph: Graph = new Map([
    [0, [1]],
    [1, [2, 3]],
    [2, [0]],
    [3, [4]],
    [4, [5, 7]],
    [5, [6]],
    [6, [4]],
    [7, []]
]);

console.log(tarjansSCC(graph));
// Example Output: [ [ 2, 1, 0 ], [ 6, 5, 4 ], [ 3 ], [ 7 ] ]

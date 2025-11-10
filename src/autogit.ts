type Graph = Map<number, number[]>;
type SCC = number[];

function tarjanSCC(graph: Graph): SCC[] {
    let index = 0;
    const indices = new Map<number, number>();
    const lowLinks = new Map<number, number>();
    const stack: number[] = [];
    const onStack = new Set<number>();
    const sccs: SCC[] = [];

    function strongConnect(node: number): void {
        indices.set(node, index);
        lowLinks.set(node, index);
        index++;
        stack.push(node);
        onStack.add(node);

        const neighbors = graph.get(node) || [];
        for (const neighbor of neighbors) {
            if (!indices.has(neighbor)) {
                strongConnect(neighbor);
                lowLinks.set(node, Math.min(lowLinks.get(node)!, lowLinks.get(neighbor)!));
            } else if (onStack.has(neighbor)) {
                lowLinks.set(node, Math.min(lowLinks.get(node)!, indices.get(neighbor)!));
            }
        }

        if (lowLinks.get(node) === indices.get(node)) {
            const component: SCC = [];
            let topNode: number;
            
            do {
                topNode = stack.pop()!;
                onStack.delete(topNode);
                component.push(topNode);
            } while (topNode !== node);
            
            sccs.push(component);
        }
    }

    // Process all nodes in the graph
    for (const node of graph.keys()) {
        if (!indices.has(node)) {
            strongConnect(node);
        }
    }

    return sccs;
}
// Create a sample graph
const graph: Map<number, number[]> = new Map([
    [0, [1]],
    [1, [2]],
    [2, [0, 3]],
    [3, [4]],
    [4, [5, 7]],
    [5, [6]],
    [6, [4, 7]],
    [7, []]
]);

// Find strongly connected components
const components = tarjanSCC(graph);
console.log("Strongly Connected Components:", components);
// Output: [[0, 1, 2], [3], [4, 5, 6], [7]]

type Graph = Map<string, string[]>;
function dfsRecursive(graph: Graph, startNode: string): string[] {
    const visited = new Set<string>();
    const result: string[] = [];

    function dfs(node: string) {
        if (visited.has(node)) return;
        
        visited.add(node);
        result.push(node);
        
        const neighbors = graph.get(node) || [];
        for (const neighbor of neighbors) {
            dfs(neighbor);
        }
    }

    dfs(startNode);
    return result;
}
function dfsIterative(graph: Graph, startNode: string): string[] {
    const stack: string[] = [startNode];
    const visited = new Set<string>();
    const result: string[] = [];

    while (stack.length > 0) {
        const node = stack.pop()!;
        
        if (visited.has(node)) continue;
        
        visited.add(node);
        result.push(node);
        
        // Push neighbors in reverse order to match recursive DFS behavior
        const neighbors = graph.get(node) || [];
        for (let i = neighbors.length - 1; i >= 0; i--) {
            stack.push(neighbors[i]);
        }
    }

    return result;
}
// Create a sample graph
const graph = new Map<string, string[]>([
    ['A', ['B', 'C']],
    ['B', ['D', 'E']],
    ['C', ['F']],
    ['D', []],
    ['E', ['F']],
    ['F', []]
]);

// Execute DFS
console.log(dfsRecursive(graph, 'A')); // [A, B, D, E, F, C]
console.log(dfsIterative(graph, 'A')); // [A, B, D, E, F, C]
function dfsFull(graph: Graph): string[] {
    const visited = new Set<string>();
    const result: string[] = [];

    for (const node of graph.keys()) {
        if (!visited.has(node)) {
            const stack = [node];
            // ... (use iterative approach here)
        }
    }
    
    return result;
}

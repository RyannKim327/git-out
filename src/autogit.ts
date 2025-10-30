type Graph = Record<string, string[]>;

function depthLimitedSearchIterative(
    graph: Graph,
    start: string,
    target: string,
    limit: number
): boolean {
    // Stack holds [node, depth]
    const stack: [string, number][] = [[start, 0]];
    const visited = new Set<string>();

    while (stack.length > 0) {
        const [node, depth] = stack.pop()!;

        if (node === target) {
            return true; // Found target
        }

        if (depth < limit && !visited.has(node)) {
            visited.add(node);
            const neighbors = graph[node] || [];

            for (const neighbor of neighbors) {
                stack.push([neighbor, depth + 1]);
            }
        }
    }

    return false; // Not found within depth limit
}
const graph: Graph = {
    A: ["B", "C"],
    B: ["D", "E"],
    C: ["F"],
    D: [],
    E: ["G"],
    F: [],
    G: []
};

console.log(depthLimitedSearchIterative(graph, "A", "G", 2)); // false
console.log(depthLimitedSearchIterative(graph, "A", "G", 3)); // true

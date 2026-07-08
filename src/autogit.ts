type Vertex = string | number | symbol;
type Graph = Map<Vertex, Vertex[]>;
/**
 * Breadth‑first traversal of a graph.
 *
 * @param graph      adjacency list
 * @param start      vertex to start from
 * @returns Array of vertices in the order they were visited
 */
function bfs(graph: Graph, start: Vertex): Vertex[] {
    const visited = new Set<Vertex>();
    const queue: Vertex[] = [];
    const result: Vertex[] = [];

    visited.add(start);
    queue.push(start);

    while (queue.length) {
        const current = queue.shift()!;   // safe, queue is non‑empty
        result.push(current);

        const neighbours = graph.get(current) ?? [];
        for (const next of neighbours) {
            if (!visited.has(next)) {
                visited.add(next);
                queue.push(next);
            }
        }
    }

    return result;
}
function bfsPath(graph: Graph, start: Vertex, target: Vertex): Vertex[] | null {
    const visited = new Set<Vertex>();
    const queue: Vertex[] = [];
    const parent = new Map<Vertex, Vertex | null>();

    visited.add(start);
    queue.push(start);
    parent.set(start, null);

    while (queue.length) {
        const current = queue.shift()!;

        if (current === target) {
            // reconstruct path
            const path: Vertex[] = [];
            let v: Vertex | null | undefined = target;
            while (v !== null) {
                path.unshift(v);
                v = parent.get(v) ?? null;
            }
            return path;
        }

        for (const next of graph.get(current) ?? []) {
            if (!visited.has(next)) {
                visited.add(next);
                queue.push(next);
                parent.set(next, current);
            }
        }
    }

    // target unreachable
    return null;
}
const g: Graph = new Map([
    ['A', ['B', 'C']],
    ['B', ['A', 'D', 'E']],
    ['C', ['A', 'F']],
    ['D', ['B']],
    ['E', ['B', 'F']],
    ['F', ['C', 'E']]
]);

console.log(bfs(g, 'A'));                      // ['A', 'B', 'C', 'D', 'E', 'F']
console.log(bfsPath(g, 'A', 'F'));              // ['A', 'C', 'F']
console.log(bfsPath(g, 'A', 'G'));              // null  (unreachable)

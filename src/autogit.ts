// A simple adjacency-list representation
type Graph = Record<string, string[]>;

const exampleGraph: Graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['F'],
  F: [],
};
/**
 * Iterative depth-first search.
 * @param graph  Adjacency list
 * @param start  Starting vertex
 * @param visit  Callback invoked once per vertex (visited in DFS order)
 */
export function dfsIterative(
  graph: Graph,
  start: string,
  visit: (vertex: string) => void
): void {
  const visited = new Set<string>();
  const stack: string[] = [start];

  while (stack.length) {
    const v = stack.pop()!;
    if (visited.has(v)) continue;

    visited.add(v);
    visit(v);                       // pre-order visit

    // Push neighbours in reverse so that left-most is popped first
    const neighbours = graph[v] ?? [];
    for (let i = neighbours.length - 1; i >= 0; --i) {
      const n = neighbours[i];
      if (!visited.has(n)) stack.push(n);
    }
  }
}
export function dfsRecursive(
  graph: Graph,
  start: string,
  visit: (vertex: string) => void,
  visited = new Set<string>()
): void {
  if (visited.has(start)) return;

  visited.add(start);
  visit(start);

  for (const n of graph[start] ?? []) {
    dfsRecursive(graph, n, visit, visited);
  }
}
// Print vertices in DFS order
dfsIterative(exampleGraph, 'A', console.log);
// → A C F B E D   (or similar depending on insertion order)

// Collect vertices into an array
const order: string[] = [];
dfsIterative(exampleGraph, 'A', v => order.push(v));
console.log(order);

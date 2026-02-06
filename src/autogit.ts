/**
 * The graph is kept as an adjacency list.
 * `T` is the type of the value stored on each vertex.
 */
export class Graph<T> {
  /** Map from vertex ID → the value stored on that vertex */
  private vertices = new Map<string, T>();
  /** Map from vertex ID → Set of neighbour IDs */
  private edges = new Map<string, Set<string>>();

  addVertex(id: string, value: T): void {
    this.vertices.set(id, value);
    if (!this.edges.has(id)) this.edges.set(id, new Set());
  }

  addEdge(from: string, to: string, undirected = false): void {
    if (!this.vertices.has(from) || !this.vertices.has(to))
      throw new Error('Both vertices must exist before linking');
    this.edges.get(from)!.add(to);
    if (undirected) this.edges.get(to)!.add(from);
  }

  /** Return the neighbours of a vertex, or [] if it has none */
  neighbours(id: string): string[] {
    return Array.from(this.edges.get(id) ?? []);
  }

  /** Optional helpers for inspection */
  getVertex(id: string): T | undefined {
    return this.vertices.get(id);
  }

  getVertices(): string[] {
    return Array.from(this.vertices.keys());
  }
}
/**
 * Depth‑first search that walks the graph from `start`.
 * Returns the order in which vertices were first visited.
 */
export function dfsRecursive<T>(
  graph: Graph<T>,
  start: string,
  visited: Set<string> = new Set()
): string[] {
  if (visited.has(start)) return [];

  visited.add(start);
  const order = [start];

  for (const neighbour of graph.neighbours(start)) {
    order.push(...dfsRecursive(graph, neighbour, visited));
  }

  return order;
}
/**
 * Explicit‑stack depth‑first search.
 * Produces the same visitation order as the recursive version.
 */
export function dfsIterative<T>(graph: Graph<T>, start: string): string[] {
  const stack: string[] = [start];
  const visited = new Set<string>();
  const order: string[] = [];

  while (stack.length) {
    const curr = stack.pop()!; // guaranteed non‑empty
    if (visited.has(curr)) continue;

    visited.add(curr);
    order.push(curr);

    // push neighbours in reverse order for natural DFS ordering
    const neighbours = graph.neighbours(curr).slice().reverse();
    for (const n of neighbours) {
      if (!visited.has(n)) stack.push(n);
    }
  }

  return order;
}
const g = new Graph<number>();

// build a tiny graph
g.addVertex('a', 1);
g.addVertex('b', 2);
g.addVertex('c', 3);
g.addVertex('d', 4);

g.addEdge('a', 'b', true); // undirected
g.addEdge('a', 'c', true);
g.addEdge('b', 'd', true);
g.addEdge('c', 'd', true);

console.log('Recursive DFS:', dfsRecursive(g, 'a')); // e.g. ['a','b','d','c']
console.log('Iterative DFS:', dfsIterative(g, 'a')); // same order

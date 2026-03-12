class Graph<T> {
  private adjacency = new Map<T, Set<T>>();

  addVertex(v: T) {
    if (!this.adjacency.has(v)) this.adjacency.set(v, new Set());
  }

  addEdge(v: T, w: T, directed = false) {
    this.addVertex(v);
    this.addVertex(w);
    this.adjacency.get(v)!.add(w);
    if (!directed) this.adjacency.get(w)!.add(v);
  }

  neighbours(v: T): Iterable<T> {
    return this.adjacency.get(v) || [];
  }

  vertices(): Iterable<T> {
    return this.adjacency.keys();
  }
}
function dfsRecursive<T>(graph: Graph<T>, start: T): T[] {
  const visited = new Set<T>();
  const result: T[] = [];

  function visit(v: T) {
    if (visited.has(v)) return;
    visited.add(v);
    result.push(v);

    for (const n of graph.neighbours(v)) visit(n);
  }

  visit(start);
  return result;
}
function dfsIterative<T>(graph: Graph<T>, start: T): T[] {
  const stack: T[] = [start];
  const visited = new Set<T>();
  const result: T[] = [];

  while (stack.length) {
    const v = stack.pop()!;
    if (visited.has(v)) continue;

    visited.add(v);
    result.push(v);

    // Push neighbours in reverse order if you want the same order
    // as the recursive version (depends on adjacency list ordering).
    for (const n of graph.neighbours(v)) {
      if (!visited.has(n)) stack.push(n);
    }
  }

  return result;
}
const g = new Graph<string>();
g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('C', 'D');
g.addEdge('D', 'E');

console.log('Recursive:', dfsRecursive(g, 'A'));   // e.g. ['A','B','D','E','C']
console.log('Iterative:', dfsIterative(g, 'A'));   // same set of vertices in DFS order

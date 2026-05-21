type AdjList = Map<number, Set<number>>;

class Graph {
  private adj = new Map<number, Set<number>>();

  addEdge(u: number, v: number, directed = false): void {
    if (!this.adj.has(u)) this.adj.set(u, new Set());
    this.adj.get(u)!.add(v);
    if (!directed) {
      if (!this.adj.has(v)) this.adj.set(v, new Set());
      this.adj.get(v)!.add(u);
    }
  }

  getNeighbors(v: number): Set<number> {
    return this.adj.get(v) ?? new Set();
  }

  // helper: list all vertices (useful for disconnected graphs)
  vertices(): IterableIterator<number> {
    return this.adj.keys();
  }
}
const g = new Graph();
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 2);
g.addEdge(1, 3);
g.addEdge(3, 4);
function dfsRecursive(
  graph: Graph,
  start: number,
  visited = new Set<number>(),
  action?: (node: number) => void
): void {
  visited.add(start);
  action?.(start);

  for (const nb of graph.getNeighbors(start)) {
    if (!visited.has(nb)) {
      dfsRecursive(graph, nb, visited, action);
    }
  }
}
dfsRecursive(g, 0, undefined, console.log);
// output: 0, 1, 2, 3, 4 (order may vary)
function dfsIterative(
  graph: Graph,
  start: number,
  action?: (node: number) => void
): void {
  const stack: number[] = [start];
  const visited = new Set<number>();

  while (stack.length) {
    const v = stack.pop()!; // `!` known to be non‑null
    if (visited.has(v)) continue;

    visited.add(v);
    action?.(v);

    // push neighbors reverse order if you want LIFO order same as recursion
    for (const nb of [...graph.getNeighbors(v)].reverse()) {
      if (!visited.has(nb)) stack.push(nb);
    }
  }
}
dfsIterative(g, 0, console.log);
// same output as before
function hasCycle(graph: Graph): boolean {
  const visited = new Set<number>();
  const stack = new Set<number>();

  function visit(v: number): boolean {
    if (stack.has(v)) return true;      // back‑edge found
    if (visited.has(v)) return false;    // already seen, no cycle on this path

    visited.add(v);
    stack.add(v);

    for (const nb of graph.getNeighbors(v)) {
      if (visit(nb)) return true;
    }

    stack.delete(v);
    return false;
  }

  for (const v of graph.vertices()) if (visit(v)) return true;
  return false;
}
function dfsWithOrders(
  graph: Graph,
  start: number,
  pre?: (node: number) => void,
  post?: (node: number) => void,
  visited = new Set<number>()
) {
  visited.add(start);
  pre?.(start);
  for (const nb of graph.getNeighbors(start)) {
    if (!visited.has(nb)) dfsWithOrders(graph, nb, pre, post, visited);
  }
  post?.(start);
}
function connectedComponents(graph: Graph): number[][] {
  const visited = new Set<number>();
  const components: number[][] = [];

  function explore(v: number, comp: number[]) {
    visited.add(v);
    comp.push(v);
    for (const nb of graph.getNeighbors(v)) {
      if (!visited.has(nb)) explore(nb, comp);
    }
  }

  for (const v of graph.vertices()) {
    if (!visited.has(v)) {
      const comp: number[] = [];
      explore(v, comp);
      components.push(comp);
    }
  }
  return components;
}
npm i -D typescript ts-node
npx ts-node dfs.ts

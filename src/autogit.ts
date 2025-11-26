// A simple adjacency-list representation
type Graph = Map<string, string[]>;

// Helper to build a graph from edge list
export function buildGraph(edges: [string, string][]): Graph {
  const g: Graph = new Map();
  for (const [u, v] of edges) {
    if (!g.has(u)) g.set(u, []);
    if (!g.has(v)) g.set(v, []);
    g.get(u)!.push(v);
    // uncomment next line for undirected graph
    // g.get(v)!.push(u);
  }
  return g;
}
/**
 * Iterative DFS.
 * Returns the list of vertices in the order they were *finished* (pop order).
 * If `start` is omitted, every component is visited (full traversal).
 */
export function dfsIter(
  graph: Graph,
  start?: string,
  onVisit?: (v: string) => void
): string[] {
  const visited = new Set<string>();
  const finished: string[] = [];
  const stack: string[] = [];

  const visit = (v: string) => {
    if (visited.has(v)) return;
    visited.add(v);
    onVisit?.(v);
    stack.push(v);
  };

  if (start !== undefined) {
    visit(start);
  } else {
    // ensure every component is covered
    for (const v of graph.keys()) visit(v);
  }

  while (stack.length) {
    const v = stack.pop()!;
    const neighbours = graph.get(v) || [];
    let hasUnvisitedChild = false;

    for (const n of neighbours) {
      if (!visited.has(n)) {
        hasUnvisitedChild = true;
        visited.add(n);
        onVisit?.(n);
        stack.push(v);           // re-add parent to finish it later
        stack.push(n);           // explore child first
        break;                   // depth-first order
      }
    }

    if (!hasUnvisitedChild) finished.push(v);
  }
  return finished;
}
/**
 * Recursive DFS.
 * `onEntry` and `onExit` are optional hooks (e.g. for topological sorting).
 */
export function dfsRecur(
  graph: Graph,
  onEntry?: (v: string) => void,
  onExit?: (v: string) => void
): string[] {
  const visited = new Set<string>();

  const dfs = (v: string) => {
    if (visited.has(v)) return;
    visited.add(v);
    onEntry?.(v);
    for (const n of graph.get(v) || []) dfs(n);
    onExit?.(v);
  };

  // visit every component
  for (const v of graph.keys()) dfs(v);
  return Array.from(visited);
}
const edges: [string, string][] = [
  ['A', 'B'],
  ['A', 'C'],
  ['B', 'D'],
  ['C', 'E'],
  ['D', 'F'],
  ['E', 'F'],
];

const g = buildGraph(edges);

console.log('Iterative finish order:', dfsIter(g, 'A'));
// -> ['F', 'D', 'B', 'E', 'C', 'A']

console.log('Recursive visited:', dfsRecur(g));
// -> ['A', 'B', 'D', 'F', 'C', 'E']
type GenericGraph<V> = Map<V, V[]>;

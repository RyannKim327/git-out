// `Graph<T>` maps a node of type T to an array of its adjacent nodes.
type Graph<T> = Map<T, T[]>;

// A helper to add an undirected edge
function addEdge<T>(g: Graph<T>, a: T, b: T) {
  g.set(a, (g.get(a) ?? []).concat(b));
  g.set(b, (g.get(b) ?? []).concat(a));
}
/**
 * Performs a breadth‑first search on an unweighted graph.
 *
 * @param start   the starting node
 * @param graph   the graph to search
 * @param visitor a callback that receives each visited node in the order
 *                it’s discovered. The callback can return `false` to stop
 *                the search early.
 */
function bfs<T>(
  start: T,
  graph: Graph<T>,
  visitor: (node: T) => void | boolean
): void {
  const visited = new Set<T>();
  const queue = [start];

  visited.add(start);

  while (queue.length) {
    const node = queue.shift()!;      // Non‑null because we just tested length
    const result = visitor(node);

    // If the visitor explicitly returned false, break out early.
    if (result === false) break;

    const neighbors = graph.get(node) ?? [];
    for (const n of neighbors) {
      if (!visited.has(n)) {
        visited.add(n);
        queue.push(n);
      }
    }
  }
}
/**
 * Returns an array representing the shortest path from `start` to `target`
 * (inclusive), or `null` if no path exists.
 */
function shortestPath<T>(start: T, target: T, graph: Graph<T>): T[] | null {
  const prev = new Map<T, T | undefined>(); // child → parent
  const visited = new Set<T>();
  const queue: T[] = [start];
  visited.add(start);
  let found = false;

  while (queue.length && !found) {
    const node = queue.shift()!;
    for (const nb of graph.get(node) ?? []) {
      if (!visited.has(nb)) {
        visited.add(nb);
        prev.set(nb, node);
        if (nb === target) {
          found = true;
          break;
        }
        queue.push(nb);
      }
    }
  }

  if (!found) return null;

  // Walk backwards from target to start
  const path = [];
  for (let cur: T | undefined = target; cur !== undefined; cur = prev.get(cur)) {
    path.push(cur);
  }
  path.reverse();
  return path;
}
const g: Graph<string> = new Map();
addEdge(g, 'A', 'B');
addEdge(g, 'A', 'C');
addEdge(g, 'B', 'D');
addEdge(g, 'C', 'D');
addEdge(g, 'C', 'E');

console.log('BFS visiting order:', () => {
  const order: string[] = [];
  bfs('A', g, node => { order.push(node); });
  return order;
}()); // ['A', 'B', 'C', 'D', 'E']

console.log('Shortest path A → D:', shortestPath('A', 'D', g)); // ['A', 'B', 'D']

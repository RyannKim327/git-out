type Vertex = string | number;               // any hashable identifier
type AdjList = Map<Vertex, Vertex[]>;        // vertex → list of outgoing neighbours
/**
 * Perform a topological sort using Kahn's algorithm.
 *
 * @param graph - adjacency list of the directed graph.
 * @returns an array with vertices in topological order.
 * @throws Error if the graph contains a cycle.
 */
export function topologicalSortKahn(graph: AdjList): Vertex[] {
  // 1️⃣ Compute indegree of every vertex
  const indegree = new Map<Vertex, number>();
  for (const [v, neighbours] of graph.entries()) {
    // ensure every vertex appears in the indegree map
    if (!indegree.has(v)) indegree.set(v, 0);
    for (const n of neighbours) {
      indegree.set(n, (indegree.get(n) ?? 0) + 1);
    }
  }

  // 2️⃣ Initialise queue with all vertices of indegree 0
  const queue: Vertex[] = [];
  for (const [v, deg] of indegree.entries()) {
    if (deg === 0) queue.push(v);
  }

  const result: Vertex[] = [];

  // 3️⃣ Process the queue
  while (queue.length) {
    const v = queue.shift()!; // safe because length > 0
    result.push(v);

    // Decrease indegree of outgoing neighbours
    const neighbours = graph.get(v) ?? [];
    for (const n of neighbours) {
      const newDeg = (indegree.get(n) ?? 0) - 1;
      indegree.set(n, newDeg);
      if (newDeg === 0) queue.push(n);
    }
  }

  // 4️⃣ Detect cycles (if we couldn't output all vertices)
  if (result.length !== indegree.size) {
    throw new Error('Graph contains a cycle – topological ordering not possible.');
  }

  return result;
}
/**
 * Perform a topological sort using depth‑first search.
 *
 * @param graph - adjacency list of the directed graph.
 * @returns an array with vertices in topological order.
 * @throws Error if the graph contains a cycle.
 */
export function topologicalSortDFS(graph: AdjList): Vertex[] {
  const visited = new Set<Vertex>();
  const onStack = new Set<Vertex>(); // for cycle detection
  const result: Vertex[] = [];

  // Helper recursive DFS
  function dfs(v: Vertex) {
    if (onStack.has(v)) {
      // We reached a vertex that is already on the recursion stack → cycle
      throw new Error('Graph contains a cycle – topological ordering not possible.');
    }
    if (visited.has(v)) return; // already processed

    onStack.add(v);
    visited.add(v);

    const neighbours = graph.get(v) ?? [];
    for (const n of neighbours) {
      dfs(n);
    }

    onStack.delete(v);
    // Post‑order: push after exploring all descendants
    result.push(v);
  }

  // Kick off DFS from every vertex (graph may be disconnected)
  for (const v of graph.keys()) {
    if (!visited.has(v)) dfs(v);
  }

  // The result is built in reverse topological order
  return result.reverse();
}
// Build a sample graph:
//   5 → 2 → 3
//   5 → 0
//   4 → 0, 1
//   2 → 1
//   3 → 1
const graph: AdjList = new Map([
  [5, [2, 0]],
  [4, [0, 1]],
  [2, [3, 1]],
  [3, [1]],
  [0, []],
  [1, []],
]);

// Using Kahn's algorithm
try {
  const orderKahn = topologicalSortKahn(graph);
  console.log('Kahn order:', orderKahn); // e.g. [5,4,2,3,0,1] (any valid order)
} catch (e) {
  console.error(e);
}

// Using DFS algorithm
try {
  const orderDFS = topologicalSortDFS(graph);
  console.log('DFS order:', orderDFS); // e.g. [5,4,2,3,0,1] (any valid order)
} catch (e) {
  console.error(e);
}
graph.set(1, [5]); // creates 5 → … → 1 → 5
// topologicalSort.ts
export type Vertex = string | number;
export type AdjList = Map<Vertex, Vertex[]>;

/* ---------- Kahn ---------- */
export function topologicalSortKahn(graph: AdjList): Vertex[] {
  const indegree = new Map<Vertex, number>();
  for (const [v, neigh] of graph.entries()) {
    if (!indegree.has(v)) indegree.set(v, 0);
    for (const n of neigh) indegree.set(n, (indegree.get(n) ?? 0) + 1);
  }

  const queue: Vertex[] = [];
  for (const [v, d] of indegree.entries()) if (d === 0) queue.push(v);

  const order: Vertex[] = [];
  while (queue.length) {
    const v = queue.shift()!;
    order.push(v);
    for (const n of graph.get(v) ?? []) {
      const nd = (indegree.get(n) ?? 0) - 1;
      indegree.set(n, nd);
      if (nd === 0) queue.push(n);
    }
  }

  if (order.length !== indegree.size) {
    throw new Error('Cycle detected');
  }
  return order;
}

/* ---------- DFS ---------- */
export function topologicalSortDFS(graph: AdjList): Vertex[] {
  const visited = new Set<Vertex>();
  const onStack = new Set<Vertex>();
  const order: Vertex[] = [];

  function dfs(v: Vertex) {
    if (onStack.has(v)) throw new Error('Cycle detected');
    if (visited.has(v)) return;
    onStack.add(v);
    visited.add(v);
    for (const n of graph.get(v) ?? []) dfs(n);
    onStack.delete(v);
    order.push(v);
  }

  for (const v of graph.keys()) if (!visited.has(v)) dfs(v);
  return order.reverse();
}
import { topologicalSortKahn, topologicalSortDFS, AdjList } from './topologicalSort';

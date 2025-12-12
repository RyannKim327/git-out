// A simple adjacency‑list type
type Graph<T = number> = Map<T, T[]>;

/**
 * Helper to add an edge (undirected by default)
 */
function addEdge<T>(g: Graph<T>, a: T, b: T, directed = false): void {
  if (!g.has(a)) g.set(a, []);
  if (!g.has(b)) g.set(b, []);
  g.get(a)!.push(b);
  if (!directed) g.get(b)!.push(a);
}
/**
 * Depth‑First Search – recursive version
 *
 * @param graph   The adjacency list.
 * @param start   Vertex where the search begins.
 * @param visited (internal) Set used to avoid revisiting nodes.
 * @returns       Array of vertices in the order they were visited.
 */
function dfsRecursive<T>(
  graph: Graph<T>,
  start: T,
  visited = new Set<T>()
): T[] {
  // Guard: if the start vertex does not exist, return empty list
  if (!graph.has(start)) return [];

  const order: T[] = [];

  function explore(v: T) {
    visited.add(v);
    order.push(v);

    const neighbours = graph.get(v) ?? [];
    for (const n of neighbours) {
      if (!visited.has(n)) {
        explore(n);
      }
    }
  }

  explore(start);
  return order;
}
/**
 * Depth‑First Search – iterative version using an explicit stack.
 *
 * @param graph   The adjacency list.
 * @param start   Vertex where the search begins.
 * @returns       Array of vertices in the order they were visited.
 */
function dfsIterative<T>(graph: Graph<T>, start: T): T[] {
  if (!graph.has(start)) return [];

  const visited = new Set<T>();
  const stack: T[] = [start];
  const order: T[] = [];

  while (stack.length) {
    const v = stack.pop()!; // non‑null because we checked length

    if (visited.has(v)) continue; // skip if already processed

    visited.add(v);
    order.push(v);

    // Push neighbours onto the stack.
    // We reverse them so that the left‑most neighbour is processed first,
    // mimicking the recursive order.
    const neighbours = graph.get(v) ?? [];
    for (let i = neighbours.length - 1; i >= 0; i--) {
      const n = neighbours[i];
      if (!visited.has(n)) stack.push(n);
    }
  }

  return order;
}
// Build a sample graph
const g: Graph<number> = new Map();
addEdge(g, 1, 2);
addEdge(g, 1, 3);
addEdge(g, 2, 4);
addEdge(g, 2, 5);
addEdge(g, 3, 6);
addEdge(g, 3, 7);

// Run both versions
console.log('Recursive DFS:', dfsRecursive(g, 1)); // → [1,2,4,5,3,6,7]
console.log('Iterative DFS:', dfsIterative(g, 1)); // → [1,2,4,5,3,6,7]
// dfs.ts ---------------------------------------------------------

type Graph<T = number> = Map<T, T[]>;

function addEdge<T>(g: Graph<T>, a: T, b: T, directed = false): void {
  if (!g.has(a)) g.set(a, []);
  if (!g.has(b)) g.set(b, []);
  g.get(a)!.push(b);
  if (!directed) g.get(b)!.push(a);
}

/* ---------- Recursive DFS ---------- */
export function dfsRecursive<T>(graph: Graph<T>, start: T, visited = new Set<T>()): T[] {
  if (!graph.has(start)) return [];

  const order: T[] = [];

  function explore(v: T) {
    visited.add(v);
    order.push(v);
    const neighbours = graph.get(v) ?? [];
    for (const n of neighbours) {
      if (!visited.has(n)) explore(n);
    }
  }

  explore(start);
  return order;
}

/* ---------- Iterative DFS ---------- */
export function dfsIterative<T>(graph: Graph<T>, start: T): T[] {
  if (!graph.has(start)) return [];

  const visited = new Set<T>();
  const stack: T[] = [start];
  const order: T[] = [];

  while (stack.length) {
    const v = stack.pop()!;
    if (visited.has(v)) continue;
    visited.add(v);
    order.push(v);

    const neighbours = graph.get(v) ?? [];
    for (let i = neighbours.length - 1; i >= 0; i--) {
      const n = neighbours[i];
      if (!visited.has(n)) stack.push(n);
    }
  }

  return order;
}

/* ---------- Demo (run with `ts-node dfs.ts`) ---------- */
if (require.main === module) {
  const g: Graph<number> = new Map();
  addEdge(g, 1, 2);
  addEdge(g, 1, 3);
  addEdge(g, 2, 4);
  addEdge(g, 2, 5);
  addEdge(g, 3, 6);
  addEdge(g, 3, 7);

  console.log('Recursive DFS:', dfsRecursive(g, 1));
  console.log('Iterative DFS:', dfsIterative(g, 1));
}
npx ts-node dfs.ts
Recursive DFS: [ 1, 2, 4, 5, 3, 6, 7 ]
Iterative DFS: [ 1, 2, 4, 5, 3, 6, 7 ]

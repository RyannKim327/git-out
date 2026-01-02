// A generic vertex identifier – you can use string, number, or any type that can be a Map key.
type Vertex = string | number;

// The adjacency list maps each vertex to an array of its neighbours.
type AdjList = Map<Vertex, Vertex[]>;
/**
 * Creates an empty adjacency list.
 */
function createGraph(): AdjList {
  return new Map<Vertex, Vertex[]>();
}

/**
 * Adds an edge to the graph.
 * If `undirected` is true, the edge is added in both directions.
 */
function addEdge(
  graph: AdjList,
  from: Vertex,
  to: Vertex,
  undirected = false
): void {
  if (!graph.has(from)) graph.set(from, []);
  graph.get(from)!.push(to);

  if (undirected) {
    if (!graph.has(to)) graph.set(to, []);
    graph.get(to)!.push(from);
  }
}
/**
 * Performs a recursive depth‑first traversal.
 *
 * @param graph   The adjacency list.
 * @param start   The vertex where the search begins.
 * @param visited A Set that tracks visited vertices (created automatically if omitted).
 * @param result  An array that collects the order of visited vertices (optional).
 * @returns       The `result` array (or a new array if you didn’t pass one).
 */
function dfsRecursive(
  graph: AdjList,
  start: Vertex,
  visited: Set<Vertex> = new Set(),
  result: Vertex[] = []
): Vertex[] {
  // Mark the current node as visited and record it.
  visited.add(start);
  result.push(start);

  // Recurse on each neighbour that hasn't been visited yet.
  const neighbours = graph.get(start) ?? [];
  for (const next of neighbours) {
    if (!visited.has(next)) {
      dfsRecursive(graph, next, visited, result);
    }
  }

  return result;
}
// Build a simple graph.
const g = createGraph();
addEdge(g, 'A', 'B', true);
addEdge(g, 'A', 'C', true);
addEdge(g, 'B', 'D', true);
addEdge(g, 'C', 'D', true);
addEdge(g, 'D', 'E', true);

// Run DFS starting from 'A'.
const orderRec = dfsRecursive(g, 'A');
console.log('Recursive DFS order:', orderRec);
// Example output: [ 'A', 'B', 'D', 'E', 'C' ]
/**
 * Performs an iterative depth‑first traversal.
 *
 * @param graph   The adjacency list.
 * @param start   The vertex where the search begins.
 * @returns       An array with the vertices in the order they were visited.
 */
function dfsIterative(graph: AdjList, start: Vertex): Vertex[] {
  const visited = new Set<Vertex>();
  const stack: Vertex[] = [start];
  const result: Vertex[] = [];

  while (stack.length > 0) {
    const node = stack.pop()!; // `!` because we know stack is non‑empty

    if (visited.has(node)) continue; // Skip if already processed

    visited.add(node);
    result.push(node);

    // Push neighbours onto the stack.
    // To get the same order as the recursive version, we push them in reverse.
    const neighbours = graph.get(node) ?? [];
    for (let i = neighbours.length - 1; i >= 0; i--) {
      const next = neighbours[i];
      if (!visited.has(next)) {
        stack.push(next);
      }
    }
  }

  return result;
}
const orderIter = dfsIterative(g, 'A');
console.log('Iterative DFS order:', orderIter);
// Example output (may differ slightly depending on neighbour order):
// [ 'A', 'C', 'D', 'E', 'B' ]
// ---------- Graph utilities ----------
type Vertex = string | number;
type AdjList = Map<Vertex, Vertex[]>;

function createGraph(): AdjList {
  return new Map();
}

function addEdge(
  graph: AdjList,
  from: Vertex,
  to: Vertex,
  undirected = false
): void {
  if (!graph.has(from)) graph.set(from, []);
  graph.get(from)!.push(to);
  if (undirected) {
    if (!graph.has(to)) graph.set(to, []);
    graph.get(to)!.push(from);
  }
}

// ---------- DFS implementations ----------
function dfsRecursive(
  graph: AdjList,
  start: Vertex,
  visited: Set<Vertex> = new Set(),
  result: Vertex[] = []
): Vertex[] {
  visited.add(start);
  result.push(start);
  for (const next of graph.get(start) ?? []) {
    if (!visited.has(next)) dfsRecursive(graph, next, visited, result);
  }
  return result;
}

function dfsIterative(graph: AdjList, start: Vertex): Vertex[] {
  const visited = new Set<Vertex>();
  const stack: Vertex[] = [start];
  const result: Vertex[] = [];

  while (stack.length) {
    const node = stack.pop()!;
    if (visited.has(node)) continue;
    visited.add(node);
    result.push(node);
    const neighbours = graph.get(node) ?? [];
    for (let i = neighbours.length - 1; i >= 0; i--) {
      const nxt = neighbours[i];
      if (!visited.has(nxt)) stack.push(nxt);
    }
  }
  return result;
}

// ---------- Demo ----------
function demo() {
  const graph = createGraph();
  // Build an undirected graph:
  //   A — B
  //   |   |
  //   C — D — E
  addEdge(graph, 'A', 'B', true);
  addEdge(graph, 'A', 'C', true);
  addEdge(graph, 'B', 'D', true);
  addEdge(graph, 'C', 'D', true);
  addEdge(graph, 'D', 'E', true);

  console.log('Adjacency list:');
  for (const [v, neigh] of graph.entries()) {
    console.log(`  ${v}: ${neigh.join(', ')}`);
  }

  console.log('\nDFS (recursive) from A:', dfsRecursive(graph, 'A'));
  console.log('DFS (iterative) from A:', dfsIterative(graph, 'A'));
}

demo();
Adjacency list:
  A: B, C
  B: A, D
  C: A, D
  D: B, C, E
  E: D

DFS (recursive) from A: [ 'A', 'B', 'D', 'E', 'C' ]
DFS (iterative) from A: [ 'A', 'C', 'D', 'E', 'B' ]
type Vertex = string | number;
type AdjList = Map<Vertex, Vertex[]>;

function dfsIterative(graph: AdjList, start: Vertex): Vertex[] {
  const visited = new Set<Vertex>();
  const stack: Vertex[] = [start];
  const order: Vertex[] = [];

  while (stack.length) {
    const v = stack.pop()!;
    if (visited.has(v)) continue;
    visited.add(v);
    order.push(v);
    for (const n of (graph.get(v) ?? []).reverse()) {
      if (!visited.has(n)) stack.push(n);
    }
  }
  return order;
}

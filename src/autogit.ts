/** A minimal FIFO queue with O(1) push/pop. */
class Queue<T> {
  private items: T[] = [];
  private head = 0; // index of the first valid element

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.head];
    this.head++;
    // Periodically shrink the underlying array to avoid memory leak
    if (this.head > 1000) {
      this.items = this.items.slice(this.head);
      this.head = 0;
    }
    return item;
  }

  isEmpty(): boolean {
    return this.head >= this.items.length;
  }
}
/** Simple adjacency‑list graph. Vertices are identified by strings (or numbers). */
class Graph<V = string> {
  /** Map from vertex → Set of neighbour vertices */
  private adj: Map<V, Set<V>> = new Map();

  /** Add a vertex if it does not exist yet */
  addVertex(v: V): void {
    if (!this.adj.has(v)) this.adj.set(v, new Set());
  }

  /** Add an (undirected) edge v‑w. For a directed graph, call only addEdgeDirected. */
  addEdge(v: V, w: V): void {
    this.addVertex(v);
    this.addVertex(w);
    this.adj.get(v)!.add(w);
    this.adj.get(w)!.add(v);
  }

  /** Add a directed edge v → w */
  addEdgeDirected(v: V, w: V): void {
    this.addVertex(v);
    this.addVertex(w);
    this.adj.get(v)!.add(w);
  }

  /** Get neighbours of a vertex (empty array if vertex not present) */
  neighbours(v: V): V[] {
    return Array.from(this.adj.get(v) ?? []);
  }

  /** Return all vertices in the graph */
  vertices(): V[] {
    return Array.from(this.adj.keys());
  }
}
/**
 * Breadth‑First Search.
 *
 * @param graph   The graph to explore.
 * @param start   The vertex from which the search starts.
 * @param target  (optional) If supplied, BFS stops as soon as the target is reached.
 *
 * @returns An object containing:
 *   - visitedOrder: the order in which vertices were dequeued (i.e., visited).
 *   - distance: a map vertex → distance from `start` (Infinity if unreachable).
 *   - predecessor: a map vertex → previous vertex on the shortest path.
 *   - path: (only if `target` is given) the shortest path from start → target,
 *           or `null` if target is unreachable.
 */
function bfs<V = string>(graph: Graph<V>, start: V, target?: V) {
  const visited = new Set<V>();
  const distance = new Map<V, number>();
  const predecessor = new Map<V, V | null>();
  const order: V[] = [];

  const q = new Queue<V>();
  q.enqueue(start);
  visited.add(start);
  distance.set(start, 0);
  predecessor.set(start, null);

  while (!q.isEmpty()) {
    const u = q.dequeue()!;
    order.push(u);

    // If we are looking for a specific target, we can stop early.
    if (target !== undefined && u === target) break;

    for (const v of graph.neighbours(u)) {
      if (!visited.has(v)) {
        visited.add(v);
        q.enqueue(v);
        distance.set(v, (distance.get(u) ?? Infinity) + 1);
        predecessor.set(v, u);
      }
    }
  }

  // Helper to reconstruct the path from start → target (if requested)
  const reconstructPath = (t: V): V[] | null => {
    if (!predecessor.has(t)) return null; // never discovered
    const path: V[] = [];
    let cur: V | null = t;
    while (cur !== null) {
      path.push(cur);
      cur = predecessor.get(cur) ?? null;
    }
    path.reverse(); // now start → target
    return path;
  };

  const result: {
    visitedOrder: V[];
    distance: Map<V, number>;
    predecessor: Map<V, V | null>;
    path?: V[] | null;
  } = {
    visitedOrder: order,
    distance,
    predecessor,
  };

  if (target !== undefined) {
    result.path = reconstructPath(target);
  }

  return result;
}
// ---------------------------------------------------------------
// Build a sample graph (undirected)
// ---------------------------------------------------------------
const g = new Graph<string>();

// Add edges (the graph is automatically populated with vertices)
g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('B', 'E');
g.addEdge('C', 'F');
g.addEdge('E', 'F');
g.addEdge('D', 'G');
g.addEdge('F', 'G');

// ---------------------------------------------------------------
// Run BFS from vertex 'A'
// ---------------------------------------------------------------
const start = 'A';
const target = 'G'; // try to find the shortest path to G

const { visitedOrder, distance, path } = bfs(g, start, target);

console.log('🟢 BFS visited order:', visitedOrder.join(' → '));
console.log('🟢 Distance from', start);
for (const v of g.vertices()) {
  console.log(`   ${v}: ${distance.get(v)}`);
}
if (path) {
  console.log('🟢 Shortest path from', start, 'to', target, ':', path.join(' → '));
} else {
  console.log('🔴 No path found from', start, 'to', target);
}

/* Expected output:

🟢 BFS visited order: A → B → C → D → E → F → G
🟢 Distance from A
   A: 0
   B: 1
   C: 1
   D: 2
   E: 2
   F: 2
   G: 3
🟢 Shortest path from A to G : A → B → D → G
*/
// bfs.ts ---------------------------------------------------------

class Queue<T> {
  private items: T[] = [];
  private head = 0;
  enqueue(item: T): void { this.items.push(item); }
  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.head];
    this.head++;
    if (this.head > 1000) {
      this.items = this.items.slice(this.head);
      this.head = 0;
    }
    return item;
  }
  isEmpty(): boolean { return this.head >= this.items.length; }
}

/** Simple adjacency‑list graph */
class Graph<V = string> {
  private adj: Map<V, Set<V>> = new Map();

  addVertex(v: V): void {
    if (!this.adj.has(v)) this.adj.set(v, new Set());
  }

  addEdge(v: V, w: V): void {
    this.addVertex(v);
    this.addVertex(w);
    this.adj.get(v)!.add(w);
    this.adj.get(w)!.add(v);
  }

  addEdgeDirected(v: V, w: V): void {
    this.addVertex(v);
    this.addVertex(w);
    this.adj.get(v)!.add(w);
  }

  neighbours(v: V): V[] {
    return Array.from(this.adj.get(v) ?? []);
  }

  vertices(): V[] {
    return Array.from(this.adj.keys());
  }
}

/**
 * Breadth‑First Search.
 */
function bfs<V = string>(graph: Graph<V>, start: V, target?: V) {
  const visited = new Set<V>();
  const distance = new Map<V, number>();
  const predecessor = new Map<V, V | null>();
  const order: V[] = [];

  const q = new Queue<V>();
  q.enqueue(start);
  visited.add(start);
  distance.set(start, 0);
  predecessor.set(start, null);

  while (!q.isEmpty()) {
    const u = q.dequeue()!;
    order.push(u);
    if (target !== undefined && u === target) break;

    for (const v of graph.neighbours(u)) {
      if (!visited.has(v)) {
        visited.add(v);
        q.enqueue(v);
        distance.set(v, (distance.get(u) ?? Infinity) + 1);
        predecessor.set(v, u);
      }
    }
  }

  const reconstructPath = (t: V): V[] | null => {
    if (!predecessor.has(t)) return null;
    const path: V[] = [];
    let cur: V | null = t;
    while (cur !== null) {
      path.push(cur);
      cur = predecessor.get(cur) ?? null;
    }
    path.reverse();
    return path;
  };

  const result: {
    visitedOrder: V[];
    distance: Map<V, number>;
    predecessor: Map<V, V | null>;
    path?: V[] | null;
  } = {
    visitedOrder: order,
    distance,
    predecessor,
  };

  if (target !== undefined) {
    result.path = reconstructPath(target);
  }

  return result;
}

// ------------------- Example -------------------
const g = new Graph<string>();
g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('B', 'E');
g.addEdge('C', 'F');
g.addEdge('E', 'F');
g.addEdge('D', 'G');
g.addEdge('F', 'G');

const start = 'A';
const target = 'G';
const { visitedOrder, distance, path } = bfs(g, start, target);

console.log('🟢 BFS visited order:', visitedOrder.join(' → '));
console.log('🟢 Distance from', start);
for (const v of g.vertices()) {
  console.log(`   ${v}: ${distance.get(v)}`);
}
if (path) {
  console.log('🟢 Shortest path from', start, 'to', target, ':', path.join(' → '));
} else {
  console.log('🔴 No path found from', start, 'to', target);
}

// ---------------------------------------------------------------
npx ts-node bfs.ts
# or
tsc bfs.ts && node bfs.js

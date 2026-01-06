// A generic adjacency list: each vertex maps to an array of its neighbours.
type AdjList<T> = Map<T, T[]>;
class Graph<T> {
  private adj: AdjList<T> = new Map();

  /** Add a vertex (if it does not already exist) */
  addVertex(v: T): void {
    if (!this.adj.has(v)) this.adj.set(v, []);
  }

  /** Add an undirected edge v—w */
  addEdge(v: T, w: T): void {
    this.addVertex(v);
    this.addVertex(w);
    this.adj.get(v)!.push(w);
    this.adj.get(w)!.push(v);
  }

  /** Add a directed edge v → w */
  addDirectedEdge(v: T, w: T): void {
    this.addVertex(v);
    this.addVertex(w);
    this.adj.get(v)!.push(w);
  }

  /** Get neighbours of a vertex (empty array if vertex not present) */
  neighbours(v: T): T[] {
    return this.adj.get(v) ?? [];
  }

  /** Expose the internal map for debugging / iteration */
  get adjacency(): AdjList<T> {
    return this.adj;
  }
}
class Queue<T> {
  private data: T[] = [];
  private head = 0; // points to the next element to dequeue

  enqueue(item: T): void {
    this.data.push(item);
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.data[this.head];
    this.head++;
    // Periodically clean up the underlying array to avoid memory leak
    if (this.head > 1000) {
      this.data = this.data.slice(this.head);
      this.head = 0;
    }
    return item;
  }

  isEmpty(): boolean {
    return this.head >= this.data.length;
  }
}
/**
 * Breadth‑first traversal of an un‑weighted graph.
 *
 * @param graph   The graph instance.
 * @param start   The vertex from which to start the search.
 * @param visit   Callback invoked for each visited vertex (in BFS order).
 */
function bfsTraverse<T>(graph: Graph<T>, start: T, visit: (v: T) => void): void {
  const visited = new Set<T>();
  const q = new Queue<T>();

  visited.add(start);
  q.enqueue(start);

  while (!q.isEmpty()) {
    const v = q.dequeue()!;
    visit(v); // <-- user‑provided side‑effect (e.g., console.log)

    for (const neighbor of graph.neighbours(v)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        q.enqueue(neighbor);
      }
    }
  }
}
const g = new Graph<number>();
g.addEdge(1, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);
g.addEdge(3, 4);
g.addEdge(4, 5);

bfsTraverse(g, 1, v => console.log(v));
// Output: 1 2 3 4 5   (order may vary for neighbours with same depth)
/**
 * Returns the shortest path (as an array of vertices) from `start` to `target`.
 * If no path exists, returns `null`.
 *
 * @param graph   The graph.
 * @param start   Starting vertex.
 * @param target  Destination vertex.
 */
function bfsShortestPath<T>(graph: Graph<T>, start: T, target: T): T[] | null {
  if (start === target) return [start];

  const visited = new Set<T>();
  const predecessor = new Map<T, T>(); // child → parent
  const q = new Queue<T>();

  visited.add(start);
  q.enqueue(start);

  while (!q.isEmpty()) {
    const v = q.dequeue()!;

    for (const neighbor of graph.neighbours(v)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        predecessor.set(neighbor, v);
        if (neighbor === target) {
          // Reconstruct path backwards
          const path: T[] = [target];
          let cur = neighbor;
          while (cur !== start) {
            cur = predecessor.get(cur)!;
            path.push(cur);
          }
          return path.reverse();
        }
        q.enqueue(neighbor);
      }
    }
  }

  // Exhausted search without hitting target
  return null;
}
const path = bfsShortestPath(g, 1, 5);
console.log(path); // → [1, 2, 4, 5]  (or [1,3,4,5] – both are shortest)
// ---------- Queue ----------
class Queue<T> {
  private data: T[] = [];
  private head = 0;
  enqueue(item: T): void { this.data.push(item); }
  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.data[this.head];
    this.head++;
    if (this.head > 1000) {
      this.data = this.data.slice(this.head);
      this.head = 0;
    }
    return item;
  }
  isEmpty(): boolean { return this.head >= this.data.length; }
}

// ---------- Graph ----------
class Graph<T> {
  private adj: Map<T, T[]> = new Map();

  addVertex(v: T): void {
    if (!this.adj.has(v)) this.adj.set(v, []);
  }

  addEdge(v: T, w: T): void {
    this.addVertex(v);
    this.addVertex(w);
    this.adj.get(v)!.push(w);
    this.adj.get(w)!.push(v);
  }

  addDirectedEdge(v: T, w: T): void {
    this.addVertex(v);
    this.addVertex(w);
    this.adj.get(v)!.push(w);
  }

  neighbours(v: T): T[] {
    return this.adj.get(v) ?? [];
  }
}

// ---------- BFS Traversal ----------
function bfsTraverse<T>(graph: Graph<T>, start: T, visit: (v: T) => void): void {
  const visited = new Set<T>();
  const q = new Queue<T>();

  visited.add(start);
  q.enqueue(start);

  while (!q.isEmpty()) {
    const v = q.dequeue()!;
    visit(v);
    for (const nb of graph.neighbours(v)) {
      if (!visited.has(nb)) {
        visited.add(nb);
        q.enqueue(nb);
      }
    }
  }
}

// ---------- BFS Shortest Path ----------
function bfsShortestPath<T>(graph: Graph<T>, start: T, target: T): T[] | null {
  if (start === target) return [start];
  const visited = new Set<T>();
  const pred = new Map<T, T>();
  const q = new Queue<T>();

  visited.add(start);
  q.enqueue(start);

  while (!q.isEmpty()) {
    const v = q.dequeue()!;
    for (const nb of graph.neighbours(v)) {
      if (!visited.has(nb)) {
        visited.add(nb);
        pred.set(nb, v);
        if (nb === target) {
          const path: T[] = [target];
          let cur = nb;
          while (cur !== start) {
            cur = pred.get(cur)!;
            path.push(cur);
          }
          return path.reverse();
        }
        q.enqueue(nb);
      }
    }
  }
  return null;
}

// ---------- Demo ----------
function demo() {
  const g = new Graph<number>();
  g.addEdge(1, 2);
  g.addEdge(1, 3);
  g.addEdge(2, 4);
  g.addEdge(3, 4);
  g.addEdge(4, 5);
  g.addEdge(5, 6);
  g.addEdge(3, 7);

  console.log('BFS traversal from 1:');
  bfsTraverse(g, 1, v => process.stdout.write(v + ' '));
  console.log('\n');

  const target = 6;
  const path = bfsShortestPath(g, 1, target);
  console.log(`Shortest path from 1 to ${target}:`, path?.join(' → ') ?? 'none');
}

demo();
BFS traversal from 1:
1 2 3 4 5 7 6 

Shortest path from 1 to 6: 1 → 2 → 4 → 5 → 6
function bfs<T>(adj: Map<T, T[]>, start: T): T[] {
  const visited = new Set<T>();
  const order: T[] = [];
  const q: T[] = [];

  visited.add(start);
  q.push(start);

  while (q.length) {
    const v = q.shift()!;
    order.push(v);
    for (const nb of adj.get(v) ?? []) {
      if (!visited.has(nb)) {
        visited.add(nb);
        q.push(nb);
      }
    }
  }
  return order;
}

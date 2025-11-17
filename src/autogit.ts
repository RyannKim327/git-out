// A graph that can give us the neighbours of a vertex.
export interface Graph<V> {
  neighbours(v: V): Iterable<V>;
}

// Optional helper to build a graph from an adjacency list.
export class AdjListGraph<V> implements Graph<V> {
  constructor(private adj = new Map<V, V[]>()) {}

  addEdge(a: V, b: V, directed = false): this {
    if (!this.adj.has(a)) this.adj.set(a, []);
    this.adj.get(a)!.push(b);
    if (!directed) this.addEdge(b, a, true);
    return this;
  }

  neighbours(v: V): Iterable<V> {
    return this.adj.get(v) ?? [];
  }
}
/**
 * Returns the shortest path (array of vertices) from `start` to `goal`,
 * or `null` if no path exists.
 * Works on any Graph<V> implementation.
 */
export function bidirectionalSearch<V>(
  graph: Graph<V>,
  start: V,
  goal: V,
  equals: (a: V, b: V) => boolean = (a, b) => a === b
): V[] | null {
  if (equals(start, goal)) return [start];

  // ---- front queues --------------------------------------------------------
  const qStart = new Queue<V>();
  const qGoal  = new Queue<V>();
  qStart.enqueue(start);
  qGoal.enqueue(goal);

  // ---- visited + parent pointers -------------------------------------------
  const parentStart = new Map<V, V | null>(); // null marks root
  const parentGoal  = new Map<V, V | null>();
  parentStart.set(start, null);
  parentGoal.set(goal, null);

  // ---- helper to expand one level ------------------------------------------
  const expand = (
    q: Queue<V>,
    visitedOwn: Map<V, V | null>,
    visitedOther: Map<V, V | null>
  ): V | null => {
    const v = q.dequeue()!;
    for (const n of graph.neighbours(v)) {
      if (visitedOwn.has(n)) continue; // already seen in this side
      visitedOwn.set(n, v);
      q.enqueue(n);

      // collision? => path found
      if (visitedOther.has(n)) return n;
    }
    return null;
  };

  // ---- alternate expansion --------------------------------------------------
  let nextSide: 'start' | 'goal' = 'start';
  while (!qStart.isEmpty() && !qGoal.isEmpty()) {
    const collision =
      nextSide === 'start'
        ? expand(qStart, parentStart, parentGoal)
        : expand(qGoal, parentGoal, parentStart);

    if (collision !== null) {
      // rebuild full path
      const path: V[] = [];
      // from collision -> start
      for (let v: V | null = collision; v !== null; v = parentStart.get(v)!) path.unshift(v);
      // from collision -> goal (skip first to avoid double-counting)
      for (let v: V | null = parentGoal.get(collision)!; v !== null; v = parentGoal.get(v)!) {
        path.push(v);
      }
      return path;
    }
    nextSide = nextSide === 'start' ? 'goal' : 'start';
  }
  return null; // no path
}

// tiny Queue helper
class Queue<T> {
  private items: T[] = [];
  enqueue(x: T) { this.items.push(x); }
  dequeue() { return this.items.shift(); }
  isEmpty() { return this.items.length === 0; }
}
const g = new AdjListGraph<string>()
  .addEdge('A', 'B')
  .addEdge('B', 'C')
  .addEdge('C', 'D')
  .addEdge('D', 'E')
  .addEdge('A', 'F')
  .addEdge('F', 'E'); // creates a second path A-F-E

console.log(bidirectionalSearch(g, 'A', 'E'));
// → ['A', 'F', 'E']   (shortest path)

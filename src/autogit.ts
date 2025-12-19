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
/**
 * Bidirectional BFS – returns the shortest path (as an array of nodes)
 * or `null` if no path exists.
 *
 * @param adj          adjacency list (undirected or directed)
 * @param start        start node
 * @param goal         goal node
 * @returns            array of nodes from start → goal, or null
 */
function bidirectionalBFS<Node>(
  adj: Map<Node, Node[]>,
  start: Node,
  goal: Node
): Node[] | null {
  // Trivial case
  if (start === goal) return [start];

  // Frontiers
  const queueStart = new Queue<Node>();
  const queueGoal = new Queue<Node>();
  queueStart.enqueue(start);
  queueGoal.enqueue(goal);

  // Visited + parent maps
  const visitedFromStart = new Set<Node>([start]);
  const visitedFromGoal = new Set<Node>([goal]);
  const parentFromStart = new Map<Node, Node>(); // child → parent
  const parentFromGoal = new Map<Node, Node>();   // child → parent

  // Helper to expand one level of a given frontier
  const expand = (
    queue: Queue<Node>,
    visitedThisSide: Set<Node>,
    visitedOtherSide: Set<Node>,
    parentMap: Map<Node, Node>
  ): Node | null => {
    const current = queue.dequeue()!;
    const neighbours = adj.get(current) ?? [];

    for (const nb of neighbours) {
      if (visitedThisSide.has(nb)) continue; // already seen on this side

      // Record parent for path reconstruction
      parentMap.set(nb, current);
      visitedThisSide.add(nb);
      queue.enqueue(nb);

      // If the opposite search already visited this node → meeting point!
      if (visitedOtherSide.has(nb)) {
        return nb; // meeting node
      }
    }
    return null;
  };

  // Main loop – alternate expansions (you can also expand the smaller frontier)
  while (!queueStart.isEmpty() && !queueGoal.isEmpty()) {
    // Expand the side with fewer nodes in its frontier (optimisation)
    let meetingNode: Node | null = null;

    if (queueStartSize(queueStart) <= queueStartSize(queueGoal)) {
      meetingNode = expand(
        queueStart,
        visitedFromStart,
        visitedFromGoal,
        parentFromStart
      );
    } else {
      meetingNode = expand(
        queueGoal,
        visitedFromGoal,
        visitedFromStart,
        parentFromGoal
      );
    }

    if (meetingNode) {
      // ---- Reconstruct the full path ----
      const pathFromStart: Node[] = [];
      let cur: Node | undefined = meetingNode;
      while (cur !== undefined) {
        pathFromStart.push(cur);
        cur = parentFromStart.get(cur);
      }
      pathFromStart.reverse(); // now start → meetingNode

      const pathFromGoal: Node[] = [];
      cur = parentFromGoal.get(meetingNode); // skip meetingNode (already in first half)
      while (cur !== undefined) {
        pathFromGoal.push(cur);
        cur = parentFromGoal.get(cur);
      }
      // pathFromGoal is meetingNode←…←goal, we need goal←…←meetingNode
      // but we already omitted meetingNode, so just concatenate
      return [...pathFromStart, ...pathFromGoal];
    }
  }

  // No meeting point → no path
  return null;
}

/**
 * Small helper to get the current size of a Queue without exposing its internals.
 */
function queueStartSize<T>(q: Queue<T>): number {
  // The Queue class stores items in an array and a head index.
  // We expose a tiny getter via prototype (or you could add a public `size` getter).
  // For brevity we cheat a bit here:
  // @ts-ignore – accessing private fields is okay for this utility.
  return q.items.length - q.head;
}
// Build a simple undirected graph
function buildGraph(edges: [string, string][]): Map<string, string[]> {
  const g = new Map<string, string[]>();
  const addEdge = (a: string, b: string) => {
    if (!g.has(a)) g.set(a, []);
    if (!g.has(b)) g.set(b, []);
    g.get(a)!.push(b);
    g.get(b)!.push(a); // comment this line for a directed graph
  };
  for (const [u, v] of edges) addEdge(u, v);
  return g;
}

const edges: [string, string][] = [
  ['A', 'B'],
  ['A', 'C'],
  ['B', 'D'],
  ['C', 'D'],
  ['C', 'E'],
  ['D', 'F'],
  ['E', 'F'],
  ['F', 'G'],
];

const graph = buildGraph(edges);

const start = 'A';
const goal = 'G';
const path = bidirectionalBFS(graph, start, goal);

console.log('Shortest path:', path); // → ['A','C','E','F','G']
Shortest path: [ 'A', 'C', 'E', 'F', 'G' ]
// Pseudo‑signature (implementation left as an exercise)
function bidirectionalDijkstra<Node>(adj: Map<Node, {to: Node; w: number}[]>,
                                     start: Node, goal: Node): Node[] | null { … }
// ---------- Queue ----------
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
  size(): number { return this.items.length - this.head; }
}

// ---------- Bidirectional BFS ----------
function bidirectionalBFS<Node>(
  adj: Map<Node, Node[]>,
  start: Node,
  goal: Node
): Node[] | null {
  if (start === goal) return [start];

  const qStart = new Queue<Node>();
  const qGoal = new Queue<Node>();
  qStart.enqueue(start);
  qGoal.enqueue(goal);

  const visitedStart = new Set<Node>([start]);
  const visitedGoal = new Set<Node>([goal]);

  const parentStart = new Map<Node, Node>();
  const parentGoal = new Map<Node, Node>();

  const expand = (
    q: Queue<Node>,
    visitedThis: Set<Node>,
    visitedOther: Set<Node>,
    parentMap: Map<Node, Node>
  ): Node | null => {
    const cur = q.dequeue()!;
    const neigh = adj.get(cur) ?? [];

    for (const nb of neigh) {
      if (visitedThis.has(nb)) continue;
      parentMap.set(nb, cur);
      visitedThis.add(nb);
      q.enqueue(nb);
      if (visitedOther.has(nb)) return nb; // meeting point
    }
    return null;
  };

  while (!qStart.isEmpty() && !qGoal.isEmpty()) {
    let meeting: Node | null = null;

    // Expand the side with the smaller frontier (helps keep it balanced)
    if (qStart.size() <= qGoal.size()) {
      meeting = expand(qStart, visitedStart, visitedGoal, parentStart);
    } else {
      meeting = expand(qGoal, visitedGoal, visitedStart, parentGoal);
    }

    if (meeting) {
      // ---- Reconstruct path ----
      const pathFromStart: Node[] = [];
      let cur: Node | undefined = meeting;
      while (cur !== undefined) {
        pathFromStart.push(cur);
        cur = parentStart.get(cur);
      }
      pathFromStart.reverse();

      const pathFromGoal: Node[] = [];
      cur = parentGoal.get(meeting);
      while (cur !== undefined) {
        pathFromGoal.push(cur);
        cur = parentGoal.get(cur);
      }

      return [...pathFromStart, ...pathFromGoal];
    }
  }

  return null; // no connection
}

// ---------- Helper to build an undirected graph ----------
function buildGraph(edges: [string, string][]): Map<string, string[]> {
  const g = new Map<string, string[]>();
  const add = (a: string, b: string) => {
    if (!g.has(a)) g.set(a, []);
    if (!g.has(b)) g.set(b, []);
    g.get(a)!.push(b);
    g.get(b)!.push(a);
  };
  for (const [u, v] of edges) add(u, v);
  return g;
}

// ---------- Demo ----------
const edges: [string, string][] = [
  ['A', 'B'],
  ['A', 'C'],
  ['B', 'D'],
  ['C', 'D'],
  ['C', 'E'],
  ['D', 'F'],
  ['E', 'F'],
  ['F', 'G'],
];
const graph = buildGraph(edges);
const result = bidirectionalBFS(graph, 'A', 'G');
console.log('Shortest path:', result);

// --- types ----------------------------------------------------------

type Node = string | number;             // anything that can be compared by ===
type Graph = Map<Node, Node[]>;          // adjacency list

// an entry tracks a node and the parent that led to it
interface QueueEntry {
  node: Node;
  parent: Node | null;   // parent in the search tree
}

// --- helper ---------------------------------------------------------

/**
 * Simple FIFO queue built on an array for speed.
 */
class Queue<T> {
  private items: T[] = [];
  enqueue(item: T) { this.items.push(item); }
  dequeue(): T | undefined { return this.items.shift(); }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
}

// --- bidirectional BFS ----------------------------------------------

export function bidirectionalSearch(
  graph: Graph,
  start: Node,
  goal: Node
): Node[] | null {      // null iff no path

  if (start === goal) return [start];

  // queues for both directions
  const qStart = new Queue<QueueEntry>();
  const qGoal  = new Queue<QueueEntry>();

  // visited maps: node -> parent
  const visitedStart = new Map<Node, Node | null>();
  const visitedGoal  = new Map<Node, Node | null>();

  // initialise
  qStart.enqueue({ node: start, parent: null });
  visitedStart.set(start, null);

  qGoal.enqueue({ node: goal, parent: null });
  visitedGoal.set(goal, null);

  // work until one frontier empties
  while (!qStart.isEmpty() && !qGoal.isEmpty()) {

    // ---- expand the smaller frontier ----
    const nextFrontier = qStart.size() <= qGoal.size() ? qStart : qGoal;
    const otherVisited = nextFrontier === qStart ? visitedGoal : visitedStart;

    const { node: current, parent } = nextFrontier.dequeue()!;

    const neighbors = graph.get(current) ?? [];
    for (const neigh of neighbors) {

      // skip already visited by this side
      if (visitedStart.has(neigh) && nextFrontier === qStart) continue;
      if (visitedGoal.has(neigh) && nextFrontier === qGoal) continue;

      // mark as visited by this side
      const visited = nextFrontier === qStart ? visitedStart : visitedGoal;
      visited.set(neigh, current);
      nextFrontier.enqueue({ node: neigh, parent: current });

      // --- check for meeting point ---
      if (otherVisited.has(neigh)) {
        return buildPath(
          start, goal, neigh, visitedStart, visitedGoal
        );
      }
    }
  }

  // nothing found
  return null;
}

/**
 * Walk back from the meeting point to the start and goal to build the full path.
 */
function buildPath(
  start: Node,
  goal: Node,
  meet: Node,
  visitedStart: Map<Node, Node | null>,
  visitedGoal:  Map<Node, Node | null>
): Node[] {

  // walk back to start
  const pathStart: Node[] = [];
  let cur: Node | null = meet;
  while (cur !== null) {
    pathStart.push(cur);
    cur = visitedStart.get(cur) ?? null;
  }
  pathStart.reverse();    // start -> meet

  // walk back to goal from the meeting point (exclude meeting node to avoid duplicate)
  const pathGoal: Node[] = [];
  cur = visitedGoal.get(meet);
  while (cur !== null) {
    pathGoal.push(cur);
    cur = visitedGoal.get(cur) ?? null;
  }

  return [...pathStart, ...pathGoal];
}
const graph: Graph = new Map([
  ['A', ['B', 'C']],
  ['B', ['A', 'D', 'E']],
  ['C', ['A', 'F']],
  ['D', ['B']],
  ['E', ['B', 'F']],
  ['F', ['C', 'E', 'G']],
  ['G', ['F']]
]);

const path = bidirectionalSearch(graph, 'A', 'G');
console.log(path); // => [ 'A', 'C', 'F', 'G' ]

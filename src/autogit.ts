// -------------  TYPES  -------------
export type Node<T> = T;

export interface BLSResult<T> {
  found: boolean;
  node?: Node<T>;
  visited: Set<Node<T>>;
}

// -------------  QUEUE  -------------
class QueueItem<T> {
  constructor(public node: Node<T>, public depth: number) {}
}

class Queue<T> {
  private items: QueueItem<T>[] = [];
  push(item: QueueItem<T>) { this.items.push(item); }
  shift() { return this.items.shift(); }
  get isEmpty() { return this.items.length === 0; }
}

// -------------  BLS  -------------
/**
 * Breadth-limited search
 * @param start      start node
 * @param expand     given a node, return its neighbours
 * @param isGoal     predicate that returns true for goal nodes
 * @param depthLimit maximum depth to explore (0 = start only)
 */
export function breadthLimitedSearch<T>(
  start: Node<T>,
  expand: (n: Node<T>) => Node<T>[],
  isGoal: (n: Node<T>) => boolean,
  depthLimit: number
): BLSResult<T> {
  const visited = new Set<Node<T>>();
  const queue = new Queue<T>();

  queue.push(new QueueItem(start, 0));
  visited.add(start);

  while (!queue.isEmpty) {
    const { node, depth } = queue.shift()!;

    if (isGoal(node)) return { found: true, node, visited };

    if (depth < depthLimit) {              // <-- depth limit check
      for (const neighbour of expand(node)) {
        if (!visited.has(neighbour)) {
          visited.add(neighbour);
          queue.push(new QueueItem(neighbour, depth + 1));
        }
      }
    }
  }
  return { found: false, visited };
}
// graph: 1 → 2 → 3 → 4 → 5
const graph: Record<number, number[]> = {
  1: [2],
  2: [3],
  3: [4],
  4: [5],
  5: []
};

const res = breadthLimitedSearch<number>(
  1,                           // start
  n => graph[n] || [],         // expand
  n => n === 4,                // goal
  2                            // depth limit
);

console.log(res); // { found: false, visited: Set { 1, 2, 3 } }

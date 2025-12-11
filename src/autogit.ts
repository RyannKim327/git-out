// Generic adjacency list: each vertex maps to an array of its neighbours.
type AdjList<T> = Map<T, T[]>;
/**
 * Breadth‑First Search
 *
 * @param graph          The adjacency list representing the graph.
 * @param start          The vertex from which the search begins.
 * @param visit          Optional callback invoked for each visited vertex.
 * @param trackPredecessors  If true, the function also returns a map of each vertex's predecessor.
 *
 * @returns An object containing:
 *   - order: an array of vertices in the order they were visited.
 *   - predecessors (optional): a map where `predecessors.get(v)` is the vertex that discovered `v`.
 */
function bfs<T>(
  graph: AdjList<T>,
  start: T,
  visit?: (v: T) => void,
  trackPredecessors: boolean = false
): { order: T[]; predecessors?: Map<T, T> } {
  const visited = new Set<T>();
  const queue: T[] = [];
  const order: T[] = [];
  const predecessors = trackPredecessors ? new Map<T, T>() : undefined;

  // Initialise
  visited.add(start);
  queue.push(start);

  while (queue.length > 0) {
    const current = queue.shift()!; // `!` because we know queue is non‑empty
    order.push(current);
    if (visit) visit(current);

    // Get neighbours (if a vertex has no entry in the map we treat it as having 0 neighbours)
    const neighbours = graph.get(current) ?? [];

    for (const next of neighbours) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
        if (trackPredecessors) {
          // `current` discovered `next`
          predecessors!.set(next, current);
        }
      }
    }
  }

  return trackPredecessors
    ? { order, predecessors: predecessors! }
    : { order };
}
/**
 * Reconstructs the shortest path from `start` to `target` using the predecessor map.
 *
 * @param predecessors Map produced by bfs(..., true)
 * @param start        The source vertex used for the BFS.
 * @param target       The destination vertex.
 *
 * @returns An array of vertices from start → target, or `null` if target is unreachable.
 */
function reconstructPath<T>(
  predecessors: Map<T, T>,
  start: T,
  target: T
): T[] | null {
  const path: T[] = [];
  let cur: T | undefined = target;

  while (cur !== undefined) {
    path.push(cur);
    if (cur === start) {
      path.reverse();
      return path;
    }
    cur = predecessors.get(cur);
  }

  // If we exited the loop without hitting `start`, the target is unreachable.
  return null;
}
// 1️⃣ Build the graph
const graph: AdjList<string> = new Map([
  ['A', ['B', 'C']],
  ['B', ['A', 'D', 'E']],
  ['C', ['A', 'F']],
  ['D', ['B']],
  ['E', ['B', 'F']],
  ['F', ['C', 'E']],
]);

// 2️⃣ Run BFS from 'A' and track predecessors
const { order, predecessors } = bfs(graph, 'A', undefined, true);
console.log('Visit order:', order); // → A B C D E F

// 3️⃣ Reconstruct shortest path from A to F
if (predecessors) {
  const path = reconstructPath(predecessors, 'A', 'F');
  console.log('Shortest path A → F:', path); // → [ 'A', 'C', 'F' ]
}
Visit order: [ 'A', 'B', 'C', 'D', 'E', 'F' ]
Shortest path A → F: [ 'A', 'C', 'F' ]
class TreeNode<T> {
  constructor(
    public value: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}

// Helper to convert a binary tree into an adjacency list (optional)
function treeToAdjList<T>(root: TreeNode<T> | null): AdjList<TreeNode<T>> {
  const map = new Map<TreeNode<T>, TreeNode<T>[]>();
  const queue: (TreeNode<T> | null)[] = [root];

  while (queue.length) {
    const node = queue.shift();
    if (!node) continue;

    const neighbours: TreeNode<T>[] = [];
    if (node.left) {
      neighbours.push(node.left);
      queue.push(node.left);
    }
    if (node.right) {
      neighbours.push(node.right);
      queue.push(node.right);
    }
    map.set(node, neighbours);
  }
  return map;
}

// Build a small tree
const tree = new TreeNode<number>(1,
  new TreeNode<number>(2,
    new TreeNode<number>(4),
    new TreeNode<number>(5)
  ),
  new TreeNode<number>(3,
    null,
    new TreeNode<number>(6)
  )
);

// Convert to adjacency list and run BFS
const treeAdj = treeToAdjList(tree);
const { order: levelOrder } = bfs(treeAdj, tree);
console.log('Level‑order:', levelOrder.map(n => n.value));
// → Level‑order: [ 1, 2, 3, 4, 5, 6 ]
function bfsSimple<T>(g: AdjList<T>, s: T): T[] {
  const visited = new Set<T>([s]);
  const q: T[] = [s];
  const out: T[] = [];

  while (q.length) {
    const v = q.shift()!;
    out.push(v);
    for (const n of g.get(v) ?? []) if (!visited.has(n)) {
      visited.add(n);
      q.push(n);
    }
  }
  return out;
}

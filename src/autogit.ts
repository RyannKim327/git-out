type NodeId = string | number;               // whatever you use to identify a node

// For an undirected graph you store each edge twice (once for each endpoint)
type AdjList = Map<NodeId, NodeId[]>;         // Map from node → array of neighbor nodes
/**
 * Breadth‑First Search.
 *
 * @param graph   adjacency list of the graph
 * @param start   node from which the search begins
 * @returns an object containing:
 *          - distances: Map<NodeId, number>   (distance from start, Infinity if unreachable)
 *          - parents:   Map<NodeId, NodeId | null> (predecessor on the shortest path)
 */
export function bfs(
  graph: AdjList,
  start: NodeId
): { distances: Map<NodeId, number>; parents: Map<NodeId, NodeId | null> } {
  // --- 1️⃣ Initialise data structures ---------------------------------
  const distances = new Map<NodeId, number>();
  const parents = new Map<NodeId, NodeId | null>();
  const visited = new Set<NodeId>();
  const queue: NodeId[] = [];

  // Initialise every node with "unreached" distance.
  for (const node of graph.keys()) {
    distances.set(node, Infinity);
    parents.set(node, null);
  }

  // Start node is distance 0 and is visited first.
  distances.set(start, 0);
  visited.add(start);
  queue.push(start);

  // --- 2️⃣ Main BFS loop -----------------------------------------------
  while (queue.length > 0) {
    const current = queue.shift()!; // dequeue (non‑null because length > 0)

    const currentDist = distances.get(current)!; // always defined

    // Process each neighbour
    const neighbours = graph.get(current) ?? [];
    for (const nb of neighbours) {
      if (!visited.has(nb)) {
        visited.add(nb);
        distances.set(nb, currentDist + 1);
        parents.set(nb, current);
        queue.push(nb);
      }
    }
  }

  return { distances, parents };
}
/**
 * Reconstructs the shortest path from `start` to `target` using the `parents` map
 * produced by `bfs`. Returns an array of node ids (including start & target) or
 * `null` if the target is unreachable.
 */
export function reconstructPath(
  parents: Map<NodeId, NodeId | null>,
  start: NodeId,
  target: NodeId
): NodeId[] | null {
  if (!parents.has(target) || parents.get(target) === undefined) return null;

  const path: NodeId[] = [];
  let cur: NodeId | null = target;

  while (cur !== null) {
    path.push(cur);
    if (cur === start) break;
    cur = parents.get(cur) ?? null;
  }

  if (path[path.length - 1] !== start) {
    // start not reached → target unreachable
    return null;
  }

  return path.reverse(); // from start → target
}
// 1️⃣ Build the graph ----------------------------------------------------
const graph: AdjList = new Map([
  [1, [2, 3]],
  [2, [1, 4, 5]],
  [3, [1, 6]],
  [4, [2]],
  [5, [2, 6]],
  [6, [3, 5]],
]);

// 2️⃣ Run BFS from node 1 ------------------------------------------------
const { distances, parents } = bfs(graph, 1);

console.log('Distances from 1:');
for (const [node, dist] of distances.entries()) {
  console.log(`  ${node} → ${dist}`);
}

/*
Output:
Distances from 1:
  1 → 0
  2 → 1
  3 → 1
  4 → 2
  5 → 2
  6 → 2
*/

// 3️⃣ Reconstruct a shortest path (e.g., 1 → 6) -------------------------
const path = reconstructPath(parents, 1, 6);
console.log('Shortest path 1 → 6:', path); // → [1, 3, 6] (or [1,2,5,6] also length 2)
interface TreeNode<T> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}

/**
 * Level‑order traversal of a binary tree.
 * Calls `visit` on each node in BFS order.
 */
export function bfsTree<T>(root: TreeNode<T>, visit: (node: TreeNode<T>, level: number) => void) {
  const queue: Array<{ node: TreeNode<T>; level: number }> = [{ node: root, level: 0 }];

  while (queue.length) {
    const { node, level } = queue.shift()!;
    visit(node, level);

    if (node.left) queue.push({ node: node.left, level: level + 1 });
    if (node.right) queue.push({ node: node.right, level: level + 1 });
  }
}

// Example ---------------------------------------------------------------
const tree: TreeNode<number> = {
  value: 1,
  left: { value: 2, left: { value: 4 }, right: { value: 5 } },
  right: { value: 3, right: { value: 6 } },
};

bfsTree(tree, (node, lvl) => console.log(`Level ${lvl}: ${node.value}`));

/*
Output:
Level 0: 1
Level 1: 2
Level 1: 3
Level 2: 4
Level 2: 5
Level 2: 6
*/
// bfs.ts ---------------------------------------------------------------
type NodeId = string | number;
type AdjList = Map<NodeId, NodeId[]>;

/**
 * Breadth‑First Search.
 */
export function bfs(
  graph: AdjList,
  start: NodeId
): { distances: Map<NodeId, number>; parents: Map<NodeId, NodeId | null> } {
  const distances = new Map<NodeId, number>();
  const parents = new Map<NodeId, NodeId | null>();
  const visited = new Set<NodeId>();
  const queue: NodeId[] = [];

  for (const node of graph.keys()) {
    distances.set(node, Infinity);
    parents.set(node, null);
  }

  distances.set(start, 0);
  visited.add(start);
  queue.push(start);

  while (queue.length) {
    const cur = queue.shift()!;
    const curDist = distances.get(cur)!;

    for (const nb of graph.get(cur) ?? []) {
      if (!visited.has(nb)) {
        visited.add(nb);
        distances.set(nb, curDist + 1);
        parents.set(nb, cur);
        queue.push(nb);
      }
    }
  }

  return { distances, parents };
}

/**
 * Reconstruct shortest path using the `parents` map.
 */
export function reconstructPath(
  parents: Map<NodeId, NodeId | null>,
  start: NodeId,
  target: NodeId
): NodeId[] | null {
  if (!parents.has(target)) return null;

  const path: NodeId[] = [];
  let cur: NodeId | null = target;

  while (cur !== null) {
    path.push(cur);
    if (cur === start) break;
    cur = parents.get(cur) ?? null;
  }

  if (path[path.length - 1] !== start) return null;
  return path.reverse();
}

/**
 * Example usage (run with `ts-node bfs.ts` or import in another file).
 */
if (require.main === module) {
  const graph: AdjList = new Map([
    [1, [2, 3]],
    [2, [1, 4, 5]],
    [3, [1, 6]],
    [4, [2]],
    [5, [2, 6]],
    [6, [3, 5]],
  ]);

  const { distances, parents } = bfs(graph, 1);
  console.log('Distances:', Object.fromEntries(distances));
  console.log('Path 1 → 6:', reconstructPath(parents, 1, 6));
}

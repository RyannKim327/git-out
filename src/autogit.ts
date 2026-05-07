/* 1️⃣  A node in a graph  */
interface Node<T = unknown> {
  /* Something that identifies the node (e.g. a string key) */
  id: string;
  /* The value that the node holds – may be anything you need */
  value: T;
}

/* 2️⃣  How the graph is stored  */
type AdjacencyList<T = unknown> = Record<string, Node<T>[]>;
/**
 * Run a breadth‑first search on a graph until the target is found *or*
 * the specified maximum depth is reached.
 *
 * @param startId     – ID of the node you start from
 * @param targetId    – ID of the node you’re looking for
 * @param graph       – adjacency list representing the graph
 * @param maxDepth    – maximum breadth level to explore (0 means only the start node)
 * @returns            – distance (depth) from start to target, or -1 if not found within limit
 */
export function breadthLimitedBFS<T>(
  startId: string,
  targetId: string,
  graph: AdjacencyList<T>,
  maxDepth: number
): number {
  // Edge‑case: “start” may already be the target.
  if (startId === targetId) return 0;
  if (maxDepth < 1) return -1; // cannot go further than the start node.

  // 3️⃣  Classic BFS ingredients
  const queue: Array<{ id: string; depth: number }> = [{ id: startId, depth: 0 }];
  const visited = new Set<string>([startId]);

  while (queue.length) {
    const { id, depth } = queue.shift()!;

    // Stop expanding beyond the user‑supplied depth limit.
    if (depth === maxDepth) continue;

    const neighbors = graph[id] ?? [];
    for (const neighbor of neighbors) {
      if (visited.has(neighbor.id)) continue;
      if (neighbor.id === targetId) return depth + 1; // found

      visited.add(neighbor.id);
      queue.push({ id: neighbor.id, depth: depth + 1 });
    }
  }

  // Not found within the depth bound.
  return -1;
}
// Sample graph: a small directed graph
const graph: AdjacencyList<number> = {
  A: [{ id: 'B', value: 2 }, { id: 'C', value: 3 }],
  B: [{ id: 'D', value: 4 }],
  C: [{ id: 'D', value: 4 }, { id: 'E', value: 5 }],
  D: [],
  E: [{ id: 'F', value: 6 }],
  F: []
};

const distance = breadthLimitedBFS('A', 'F', graph, 2);
console.log(distance); // prints 3? Actually depth 3 would exceed maxDepth 2, so it returns -1
// try a larger depth
console.log(breadthLimitedBFS('A', 'F', graph, 3)); // prints 3 (A→C→E→F)
breadthLimitedBFS(
  startId: string,
  targetId: string,
  graph: AdjacencyList<T>,
  maxDepth: number
): number

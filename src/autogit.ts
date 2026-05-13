/* ------------------------------------------------------------
   A tiny bidirectional BFS implementation
   ------------------------------------------------------------ */

type NodeId = string | number;

// A node in an undirected graph.
interface GraphNode<T> {
  id: NodeId;             // unique hashable identifier
  val: T;                 // payload you care about
  neighbors: NodeId[];    // adjacent node ids
}

// Helper: build a hash map (id → node) for quick lookup
function indexNodes<T>(nodes: GraphNode<T>[]): Map<NodeId, GraphNode<T>> {
  const map = new Map<NodeId, GraphNode<T>>();
  for (const node of nodes) map.set(node.id, node);
  return map;
}

// ------------------------------------------------------------

/**
 * Bidirectional search between `startId` and `goalId`.
 *
 * @param nodes          array of all nodes in the graph
 * @param startId       id of the starting node
 * @param goalId        id of the target node
 * @returns              array of node ids representing the shortest path,
 *                       or `null` if no path exists
 */
export function biBfs<T>(
  nodes: GraphNode<T>[],
  startId: NodeId,
  goalId: NodeId
): NodeId[] | null {
  if (startId === goalId) return [startId];

  const lookup = indexNodes(nodes);

  // Frontier queues for each direction
  const frontierStart: NodeId[] = [startId];
  const frontierGoal: NodeId[]   = [goalId];

  // Visited maps: id → predecessor id (to reconstruct)
  const predStart = new Map<NodeId, NodeId | null>();
  const predGoal  = new Map<NodeId, NodeId | null>();

  predStart.set(startId, null);
  predGoal.set(goalId, null);

  // Visited sets to decide intersection
  const visitedStart = new Set<NodeId>([startId]);
  const visitedGoal  = new Set<NodeId>([goalId]);

  while (frontierStart.length && frontierGoal.length) {
    // Expand the smaller frontier to keep the search balanced
    const expandStart = frontierStart.length <= frontierGoal.length;
    const currentFrontier = expandStart ? frontierStart : frontierGoal;
    const currentVisited = expandStart ? visitedStart : visitedGoal;
    const otherVisited = expandStart ? visitedGoal : visitedStart;
    const currentPred = expandStart ? predStart : predGoal;
    const otherPred = expandStart ? predGoal : predStart;
    const direction = expandStart ? 'start' : 'goal';

    // Pull the next batch of nodes (classic BFS layer)
    const nextLayer: NodeId[] = [];
    for (const nodeId of currentFrontier) {
      const node = lookup.get(nodeId)!;
      for (const neighId of node.neighbors) {
        if (currentVisited.has(neighId)) continue;

        // Mark visited and store predecessor
        currentVisited.add(neighId);
        currentPred.set(neighId, nodeId);
        nextLayer.push(neighId);

        // If the other side has already seen this neighbor, we’re done
        if (otherVisited.has(neighId)) {
          // Build the full path
          return buildPath(
            neighId,
            predStart,
            predGoal,
            startId,
            goalId,
            direction === 'start'
          );
        }
      }
    }

    // Replace frontier with the newly generated layer
    if (expandStart) frontierStart.length = 0; else frontierGoal.length = 0;
    if (expandStart) frontierStart.push(...nextLayer); else frontierGoal.push(...nextLayer);
  }

  // No meeting point found
  return null;
}

/** Reconstruct path once the two searches meet at `meetId`. */
function buildPath(
  meetId: NodeId,
  predStart: Map<NodeId, NodeId | null>,
  predGoal: Map<NodeId, NodeId | null>,
  startId: NodeId,
  goalId: NodeId,
  fromStart: boolean
): NodeId[] {
  const path: NodeId[] = [];

  // Walk back from the meeting point to the start
  let cur: NodeId | null = meetId;
  while (cur !== null) {
    path.unshift(cur);
    cur = predStart.get(cur) ?? null;
  }

  // Walk forward from the meeting point to the goal
  cur = predGoal.get(meetId) ?? null;
  while (cur !== null) {
    path.push(cur);
    cur = predGoal.get(cur) ?? null;
  }

  // Connect start and goal if they weren't directly the meet point
  if (path[0] !== startId) path.unshift(startId);
  if (path[path.length - 1] !== goalId) path.push(goalId);

  return path;
}

// ------------------------------------------------------------
// Demo usage ---------------------------------------------------

const graph: GraphNode<number>[] = [
  { id: 1, val: 1, neighbors: [2, 5] },
  { id: 2, val: 2, neighbors: [1, 3] },
  { id: 3, val: 3, neighbors: [2, 4] },
  { id: 4, val: 4, neighbors: [3] },
  { id: 5, val: 5, neighbors: [1, 6] },
  { id: 6, val: 6, neighbors: [5] },
];

const path = biBfs(graph, 1, 4);
console.log(path); // [1, 2, 3, 4]

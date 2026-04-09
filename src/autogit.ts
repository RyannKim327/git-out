// A node can be anything that uniquely identifies a state.
interface Node {
  /** A unique string – the node’s id. */
  id: string;
  // Whatever other data the node owns can live here.
  value?: any;
}

// Edges are just a mapping from a node id to its adjacent node ids.
type AdjacencyList = Record<string, string[]>;

// A path is simply an array of nodes (or their ids). Keep it generic so you
// can work with a tree, graph, maze, etc.
type Path = Node[];
/**
 * Depth‑limited search.
 *
 * @param node      the current node
 * @param goalId    id of the goal node
 * @param graph     adjacency list describing neighbours
 * @param maxDepth  maximum depth you are allowed to go
 * @param pathSoFar the nodes traversed so far
 * @returns a Path to the goal, or null if the goal is deeper than maxDepth
 */
function depthLimitedSearch(
  node: Node,
  goalId: string,
  graph: AdjacencyList,
  maxDepth: number,
  pathSoFar: Path = []
): Path | null {
  // If the current depth is already beyond what we’re allowed, reject.
  if (pathSoFar.length > maxDepth) return null;

  // Add the current node to the path
  const newPath = [...pathSoFar, node];

  // Goal check
  if (node.id === goalId) return newPath;

  // Stop if this depth is the last allowed – do NOT keep recursing
  if (newPath.length === maxDepth) return null;

  // Fetch neighbours; guard against a missing entry
  const neighbours = graph[node.id] ?? [];

  for (const neighbourId of neighbours) {
    // Avoid looping back on the same node in the current path
    if (newPath.some(n => n.id === neighbourId)) continue;

    const neighbourNode: Node = { id: neighbourId }; // or fetch real data

    const result = depthLimitedSearch(
      neighbourNode,
      goalId,
      graph,
      maxDepth,
      newPath
    );
    if (result) return result; // found a valid path
  }

  return null; // nothing found at this depth
}
/**
 * Iterative‑deepening DFS that stops when it finds the goal or
 * when a supplied depth limit is reached.
 *
 * @param startId    id of the start node
 * @param goalId     id of the goal node
 * @param graph      adjacency list
 * @param maxDepth   the deepest depth you’re willing to explore
 * @returns a Path to the goal or null if none exists within depth
 */
function iterativeDeepening(
  startId: string,
  goalId: string,
  graph: AdjacencyList,
  maxDepth: number
): Path | null {
  const startNode: Node = { id: startId }; // elaborate if needed

  for (let depth = 0; depth <= maxDepth; depth++) {
    const result = depthLimitedSearch(startNode, goalId, graph, depth);
    if (result) return result;
  }
  return null;
}
const graph: AdjacencyList = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['G', 'H'],
  F: ['I'],
  G: [],
  H: [],
  I: [],
};

const path = iterativeDeepening('A', 'H', graph, 10);
if (path) {
  console.log('Found path:', path.map(n => n.id).join(' → '));
} else {
  console.log('No path found within the depth limit');
}
Found path: A → B → E → H

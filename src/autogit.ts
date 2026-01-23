// ──────────────────────────────────────────────────────────────
// 1.  Types for the graph
// ──────────────────────────────────────────────────────────────
interface Node<T = void> {
  value: T;
  neighbours: Node<T>[];
}

// A small helper to create nodes
function createNode<T>(value: T): Node<T> {
  return { value, neighbours: [] };
}

function addEdge<T>(from: Node<T>, to: Node<T>): void {
  from.neighbours.push(to);
  to.neighbours.push(from);    // undirected; drop this line for directed graphs
}

// ──────────────────────────────────────────────────────────────
// 2.  Depth‑limited search (recursive DFS style)
// ──────────────────────────────────────────────────────────────
/**
 * Searches `startNode` for a node whose value satisfies `goalPredicate`,
 * but stops expanding any node that appears deeper than `limit` levels.
 *
 * @param start      the node to start from
 * @param goal       a predicate; if it returns true the node is considered the goal
 * @param limit      max depth to explore
 * @param visited    internal, tracks visited nodes
 * @param depth      internal, current depth
 * @returns          the goal node if found, or null
 */
function depthLimitedSearch<T>(
  start: Node<T>,
  goal: (value: T) => boolean,
  limit: number,
  visited = new Set<Node<T>>(),
  depth = 0
): Node<T> | null {
  if (depth > limit) return null;               // over the limit

  visited.add(start);
  if (goal(start.value)) return start;          // goal reached

  for (const neighbour of start.neighbours) {
    if (!visited.has(neighbour)) {
      const result = depthLimitedSearch(neighbour, goal, limit, visited, depth + 1);
      if (result !== null) return result;      // propagate success upwards
    }
  }

  return null;                                  // no goal found within this branch
}

// ──────────────────────────────────────────────────────────────
// 3.  Example usage
// ──────────────────────────────────────────────────────────────
/*
// Build a tiny graph
const a = createNode('A');
const b = createNode('B');
const c = createNode('C');
const d = createNode('D');
const e = createNode('E');

addEdge(a, b);
addEdge(a, c);
addEdge(b, d);
addEdge(c, e);

// Find node 'E' but stop after exploring 2 edges from 'A'
const found = depthLimitedSearch(a, val => val === 'E', 2);

console.log(found ? `Found ${found.value}` : 'Not found within depth limit');
*/

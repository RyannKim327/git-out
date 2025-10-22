// -------------- Types --------------
type Node = string;

interface Edge {
  to: Node;
}

type Graph = Map<Node, Edge[]>;

// -------------- DLS Core --------------
/**
 * Depth-limited search.
 * @param graph   Adjacency-list representation.
 * @param start   Starting node.
 * @param goal    Predicate that returns true for goal nodes.
 * @param limit   Maximum depth to explore.
 * @returns       The goal node if found within the depth limit, else null.
 */
function depthLimitedSearch(
  graph: Graph,
  start: Node,
  goal: (n: Node) => boolean,
  limit: number
): Node | null {
  const visited = new Set<Node>();          // only for cycle detection on graphs
  return dlsRecursive(start, 0);

  function dlsRecursive(node: Node, depth: number): Node | null {
    if (goal(node)) return node;
    if (depth === limit) return null;

    visited.add(node);
    const neighbors = graph.get(node) || [];
    for (const edge of neighbors) {
      if (!visited.has(edge.to)) {
        const found = dlsRecursive(edge.to, depth + 1);
        if (found) return found;
      }
    }
    visited.delete(node);          // backtrack (optional for tree, needed for DAG)
    return null;
  }
}

// -------------- Demo --------------
if (require.main === module) {
  const g: Graph = new Map([
    ['A', [{ to: 'B' }, { to: 'C' }]],
    ['B', [{ to: 'D' }, { to: 'E' }]],
    ['C', [{ to: 'F' }]],
    ['D', [{ to: 'G' }]],
    ['E', []],
    ['F', []],
    ['G', []],
  ]);

  const goal = (n: Node) => n === 'G';
  console.log(depthLimitedSearch(g, 'A', goal, 2)); // null
  console.log(depthLimitedSearch(g, 'A', goal, 3)); // 'G'
}

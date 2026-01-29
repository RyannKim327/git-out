// ------------------------------------------------------------------
//  Supporting types
// ------------------------------------------------------------------
/**
 * The shape of a graph node.  The `id` is used for a visited set.
 * `getNeighbours` must return raw references that `graph.getNode(id)` can resolve.
 */
interface Node {
  readonly id: string;
  getNeighbours(): Iterable<string>;
}

/**
 * A tiny graph interface that lets us look up nodes by id.
 * (You can replace this with your own representation; only the method
 * `getNode` is required by the algorithm.)
 */
interface Graph {
  /** Return the node instance for the supplied id or `undefined`. */
  getNode(id: string): Node | undefined;
}

/**
 * A function tested against a node, returning true when the node is
 * the thing you’re looking for.
 */
type Predicate = (node: Node) => boolean;

// ------------------------------------------------------------------
//  Depth‑limited DFS (iterative)
// ------------------------------------------------------------------
/**
 * Iterative depth‑limited depth‑first search.
 *
 * @param startId   id of the node where the search begins
 * @param maxDepth  stop expanding after this many edges from `startId`
 * @param graph     the graph interface
 * @param satisfies a predicate that tells when a node is a solution
 *
 * @returns the first node that satisfies `satisfies`, or undefined
 */
export function depthLimitedSearch(
  startId: string,
  maxDepth: number,
  graph: Graph,
  satisfies: Predicate
): Node | undefined {

  // Guard against an empty or overly deep request
  if (maxDepth < 0) return undefined;

  // A stack holds tuples of (node, currentDepth).
  const stack: Array<[Node, number]> = [];
  const visited = new Set<string>();

  const startNode = graph.getNode(startId);
  if (!startNode) return undefined;   // start id is missing

  stack.push([startNode, 0]);

  while (stack.length) {
    const [node, depth] = stack.pop()!;   // non‑empty promise

    // Avoid revisiting the same node (important for cycles)
    if (visited.has(node.id)) continue;
    visited.add(node.id);

    if (satisfies(node)) return node;    // found a match

    if (depth === maxDepth) continue;    // reached depth limit

    // Push neighbours onto the stack – order determines DFS order.
    for (const neighId of node.getNeighbours()) {
      const neighbour = graph.getNode(neighId);
      if (neighbour) stack.push([neighbour, depth + 1]);
    }
  }

  return undefined;   // nothing matched within the depth budget
}
// A simple example graph implementation
class SimpleNode implements Node {
  constructor(public readonly id: string, private readonly neighIds: string[]) {}
  getNeighbours() { return this.neighIds; }
}
class SimpleGraph implements Graph {
  private readonly nodes = new Map<string, Node>();
  addNode(node: Node) { this.nodes.set(node.id, node); }
  getNode(id: string) { return this.nodes.get(id); }
}

// Build a tiny graph
const g = new SimpleGraph();
g.addNode(new SimpleNode('A', ['B', 'C']));
g.addNode(new SimpleNode('B', ['D']));
g.addNode(new SimpleNode('C', []));
g.addNode(new SimpleNode('D', []));

// Define a search goal
const goal = (n: Node) => n.id === 'D';

// Run depth‑limited DFS limited to 2 edges from 'A'
const result = depthLimitedSearch('A', 2, g, goal);
console.log(result?.id); // → 'D'

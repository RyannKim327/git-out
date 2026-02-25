/** 
 * At its core a node only needs to expose
 *   - a unique identifier (for visited‑tracking)
 *   - a way to enumerate its successors
 */
export interface Node<T = any> {
  id: string | number;
  // Optional: depth, parent, cost – whatever your context needs
  getSuccessors(): Node[];
}
export interface BinaryNode<T = any> extends Node {
  left?: BinaryNode;
  right?: BinaryNode;
  getSuccessors(): BinaryNode[] {
    return [this.left, this.right].filter(Boolean);
  }
}
/**
 * depthLimitedSearch
 * ------------------
 * Classic depth‑first search that stops when a given depth threshold is reached.
 *
 * @param root the node to start from
 * @param goalTest a predicate that returns true for the desired node
 * @param depthLimit the maximum depth to explore (0 = only the root)
 * @returns the first node that satisfies goalTest, or null if not found
 */
export function depthLimitedSearch<T>(
  root: Node<T>,
  goalTest: (node: Node<T>) => boolean,
  depthLimit: number
): Node<T> | null {

  // A simple iterative DFS pile that also carries the current depth.
  const stack: { node: Node<T>; depth: number }[] = [];
  const visited = new Set<string | number>(); // avoid cycles

  stack.push({ node: root, depth: 0 });

  while (stack.length) {
    const { node, depth } = stack.pop()!; // pop returns a value, guaranteed not undefined

    // skip already visited nodes (useful for graphs)
    if (visited.has(node.id)) continue;
    visited.add(node.id);

    if (goalTest(node)) return node;   // success!

    // Recurse only if we haven't hit the limit yet
    if (depth < depthLimit) {
      // Add successors in reverse order so leftmost child is processed first
      const successors = node.getSuccessors();
      for (let i = successors.length - 1; i >= 0; i--) {
        stack.push({ node: successors[i], depth: depth + 1 });
      }
    }
  }

  // If we exhaust the stack without finding the goal
  return null;
}
// 1‑line node type with a simple integer value
class GraphNode implements Node {
  constructor(public id: number, public value: number) {}
  getSuccessors(): GraphNode[] {
    const n = this.value;
    return [
      new GraphNode(n * 2, n * 2),
      new GraphNode(n * 2 + 1, n * 2 + 1),
    ];
  }
}

const start = new GraphNode(1, 1);
const goalIf = (node: GraphNode) => node.value === 19;

const found = depthLimitedSearch(start, goalIf, 4);

console.log(found ? `found ${found.value}` : 'not found');
          1
        /   \
       2     3
      / \   / \
     4  5  6  7
    / \ ...   ...

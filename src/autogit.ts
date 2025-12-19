// Tree-like node
interface Node<T> {
  data: T;
  children: Node<T>[];
}

/**
 * Depth-limited search on a tree.
 * @param root  starting node
 * @param goal  predicate that returns true when the node is a solution
 * @param limit max depth (root == 0)
 * @returns the first node that satisfies goal within depth limit, or null
 */
function depthLimitedTree<T>(
  root: Node<T>,
  goal: (n: T) => boolean,
  limit: number
): Node<T> | null {
  function dls(node: Node<T>, depth: number): Node<T> | null {
    if (goal(node.data)) return node;
    if (depth >= limit) return null;

    for (const child of node.children) {
      const found = dls(child, depth + 1);
      if (found) return found;
    }
    return null;
  }
  return dls(root, 0);
}
// Graph-like node (adjacency list)
interface GraphNode<T> {
  id: string;          // unique identifier
  data: T;
  neighbors: GraphNode<T>[];
}

/**
 * Depth-limited search on a graph (handles cycles).
 */
function depthLimitedGraph<T>(
  start: GraphNode<T>,
  goal: (n: T) => boolean,
  limit: number
): GraphNode<T> | null {
  const visited = new Set<string>();

  function dls(node: GraphNode<T>, depth: number): GraphNode<T> | null {
    if (goal(node.data)) return node;
    if (depth >= limit) return null;

    visited.add(node.id);
    for (const next of node.neighbors) {
      if (visited.has(next.id)) continue;
      const found = dls(next, depth + 1);
      if (found) return found;
    }
    visited.delete(node.id); // back-track so other branches can reuse node
    return null;
  }

  return dls(start, 0);
}
function depthLimitedIterative<T>(
  root: Node<T>,
  goal: (n: T) => boolean,
  limit: number
): Node<T> | null {
  type Frame = { node: Node<T>; depth: number };
  const stack: Frame[] = [{ node: root, depth: 0 }];

  while (stack.length) {
    const { node, depth } = stack.pop()!;
    if (goal(node.data)) return node;
    if (depth >= limit) continue;

    // push children in reverse order so left-most is processed first
    for (let i = node.children.length - 1; i >= 0; --i) {
      stack.push({ node: node.children[i], depth: depth + 1 });
    }
  }
  return null;
}
const tree: Node<number> = {
  data: 1,
  children: [
    { data: 2, children: [{ data: 4, children: [] }] },
    { data: 3, children: [{ data: 5, children: [] }] },
  ],
};

const found = depthLimitedTree(tree, n => n === 5, 2);
console.log(found?.data); // 5 (found at depth 2)

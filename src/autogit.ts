// A generic graph node – you can replace this with whatever you’re actually
// storing.  Here we just keep a value and an array of child nodes.
export interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}
/**
 * Performs a breadth‑first search up to a depth limit.
 *
 * @param root The starting node.
 * @param maxDepth The maximum path length to explore (0 = only the root).
 * @param filter A callback that decides whether a node should be “accepted”.
 *               It receives the node and its depth (root = 0).
 * @returns An array of all nodes that satisfy the filter within the depth bound.
 */
export function breadthLimitedSearch<T>(
  root: TreeNode<T>,
  maxDepth: number,
  filter: (node: TreeNode<T>, depth: number) => boolean
): TreeNode<T>[] {
  const result: TreeNode<T>[] = [];
  const queue: Array<{ node: TreeNode<T>; depth: number }> = [{ node: root, depth: 0 }];

  while (queue.length) {
    const { node, depth } = queue.shift()!;           // FIFO
    if (depth > maxDepth) continue;                  // depth guard

    if (filter(node, depth)) result.push(node);

    // Push children *after* checking depth to avoid pushing out‑of‑range nodes
    if (depth < maxDepth) {
      for (const child of node.children) {
        queue.push({ node: child, depth: depth + 1 });
      }
    }
  }

  return result;
}
// Simple test tree
const tree: TreeNode<string> = {
  value: 'root',
  children: [
    { value: 'A', children: [] },
    { value: 'B', children: [
        { value: 'B1', children: [] },
        { value: 'B2', children: [] },
      ]
    },
    { value: 'C', children: [] }
  ]
};

// Want all nodes that start with "B" and only dive 2 levels deep
const matches = breadthLimitedSearch(
  tree,
  2,
  (node, depth) => node.value.startsWith('B')
);

console.log(matches.map(n => n.value)); // ['B', 'B1', 'B2']

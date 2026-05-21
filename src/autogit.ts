// A minimal Node interface.  Feel free to add more fields (value, color, etc.).
export interface TreeNode<T> {
  value: T;
  left?: TreeNode<T>;   // optional because a leaf might not have children
  right?: TreeNode<T>;
}
/**
 * Counts leaf nodes (nodes with no children) in a binary tree.
 *
 * @param root - root node of the tree
 * @returns number of leaf nodes
 */
export function countLeavesRec<T>(root?: TreeNode<T>): number {
  if (!root) return 0;                 // empty subtree -> 0 leaves

  const isLeaf = !root.left && !root.right;
  if (isLeaf) return 1;                // this node is a leaf

  // otherwise add leaves of the left and right sub‑trees
  return countLeavesRec(root.left) + countLeavesRec(root.right);
}
/**
 * Iterative breadth‑first traversal using a queue.
 * Does the same thing as the recursive version but avoids recursion depth limits.
 */
export function countLeavesIter<T>(root?: TreeNode<T>): number {
  if (!root) return 0;

  let leafCount = 0;
  const queue: TreeNode<T>[] = [root];   // simple array as a FIFO queue

  while (queue.length) {
    const node = queue.shift()!;         // dequeue

    // If the node has no children, it’s a leaf
    if (!node.left && !node.right) {
      leafCount += 1;
    } else {
      // enqueue any existing children
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return leafCount;
}
function buildSampleTree(): TreeNode<number> {
  //            1
  //          /   \
  //         2     3
  //        / \     \
  //       4   5     6
  return {
    value: 1,
    left: {
      value: 2,
      left: { value: 4 },
      right: { value: 5 }
    },
    right: {
      value: 3,
      right: { value: 6 }
    }
  };
}

const tree = buildSampleTree();
console.log('Recursive:', countLeavesRec(tree));   // → 3  (nodes 4,5,6)
console.log('Iterative:', countLeavesIter(tree)); // → 3
function leafMetrics<T>(root?: TreeNode<T>) {
  if (!root) return { leafCount: 0, leafDepthSum: 0 };

  // helper that returns (#leaves, sum of leaf depths)
  function helper(node: TreeNode<T>, depth: number): [number, number] {
    if (!node.left && !node.right) {
      return [1, depth];
    }
    const left = node.left ? helper(node.left, depth + 1) : [0, 0];
    const right = node.right ? helper(node.right, depth + 1) : [0, 0];
    return [left[0] + right[0], left[1] + right[1]];
  }

  const [cnt, depthSum] = helper(root, 0);
  return { leafCount: cnt, averageDepth: cnt ? depthSum / cnt : 0 };
}

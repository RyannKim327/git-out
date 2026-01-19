// A minimal binary‑tree node definition
interface TreeNode {
  value: number;
  left?: TreeNode | null;
  right?: TreeNode | null;
}

/**
 * Recursively sums the values of every node in a binary tree.
 * @param root – the root of the tree
 * @returns the total sum of all node values
 */
function sumTree(root: TreeNode | null | undefined): number {
  if (!root) return 0;
  return root.value + sumTree(root.left) + sumTree(root.right);
}

/*--- Example usage -------------------------------------------------------*/
// Construct a small tree:
//
//        4
//       / \
//      2   5
//     / \
//    1   3
const tree: TreeNode = {
  value: 4,
  left: {
    value: 2,
    left: { value: 1, left: null, right: null },
    right: { value: 3, left: null, right: null },
  },
  right: { value: 5, left: null, right: null },
};

console.log(sumTree(tree)); // 15
function sumTreeIterative(root: TreeNode | null): number {
  if (!root) return 0;
  let total = 0;
  const stack: Array<TreeNode> = [root];

  while (stack.length) {
    const node = stack.pop()!;
    total += node.value;
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return total;
}

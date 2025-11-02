class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
function sumTree(root: TreeNode | null): number {
  if (root === null) return 0;
  return root.value + sumTree(root.left) + sumTree(root.right);
}
// Build a simple tree:
//       10
//      /  \
//     5    20
//    / \
//   2   7

const root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(20);
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(7);

console.log("Sum of all nodes:", sumTree(root)); // Output: 44
function sumTreeIterative(root: TreeNode | null): number {
  if (!root) return 0;

  const stack: TreeNode[] = [root];
  let sum = 0;

  while (stack.length > 0) {
    const node = stack.pop()!;
    sum += node.value;
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return sum;
}

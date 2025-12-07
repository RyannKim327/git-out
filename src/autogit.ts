class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0; // Default to 0 if `val` is not provided
    this.left = left ?? null;
    this.right = right ?? null;
  }
}
function countLeafNodesRecursive(root: TreeNode | null): number {
  if (!root) return 0; // Base case: empty node
  if (!root.left && !root.right) return 1; // Current node is a leaf
  return countLeafNodesRecursive(root.left) + countLeafNodesRecursive(root.right);
}
function countLeafNodesIterative(root: TreeNode | null): number {
  if (!root) return 0;
  const queue: TreeNode[] = [root];
  let count = 0;

  while (queue.length > 0) {
    const node = queue.shift()!;
    if (!node.left && !node.right) count++; // Check if leaf
    if (node.left) queue.push(node.left);   // Add left child to queue
    if (node.right) queue.push(node.right); // Add right child to queue
  }

  return count;
}
// Example Tree:
//       1
//      / \
//     2   3
//    / \
//   4   5 (leaves: 4, 5, 3)

const root = new TreeNode(1,
  new TreeNode(2,
    new TreeNode(4),
    new TreeNode(5)
  ),
  new TreeNode(3)
);

console.log(countLeafNodesRecursive(root)); // Output: 3
console.log(countLeafNodesIterative(root)); // Output: 3

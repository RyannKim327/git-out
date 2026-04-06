// 1️⃣  Node definition
interface TreeNode<T = number> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}

// 2️⃣  Recursive depth counter
function maxDepth<T>(root: TreeNode<T> | undefined): number {
  if (!root) return 0;                      // base case – empty subtree

  // compute depth of each side, pick the larger one, then add 1 for the current node
  const leftHeight  = maxDepth(root.left);
  const rightHeight = maxDepth(root.right);
  return Math.max(leftHeight, rightHeight) + 1;
}
const root: TreeNode = {
  value: 1,
  left: { value: 2, left: { value: 4 }, right: { value: 5 } },
  right: { value: 3 }
};

console.log(maxDepth(root));  // 3

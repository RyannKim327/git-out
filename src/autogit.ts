// Binary tree node interface
interface TreeNode<T> {
  val: T;
  left?: TreeNode<T> | null;
  right?: TreeNode<T> | null;
}

// Diameter in edges (longest path length in edges)
function diameterOfBinaryTree<T>(root: TreeNode<T> | null): number {
  let diameter = 0;

  function height(node: TreeNode<T> | null): number {
    if (!node) return 0;
    const left = height(node.left);
    const right = height(node.right);
    // path through this node is left + right (in edges)
    diameter = Math.max(diameter, left + right);
    // height of this node is max(left, right) + 1 (in edges)
    return Math.max(left, right) + 1;
  }

  height(root);
  return diameter;
}
function diameterInNodes<T>(root: TreeNode<T> | null): number {
  if (!root) return 0;
  return diameterOfBinaryTree(root) + 1;
}
const root: TreeNode<number> = {
  val: 1,
  left: { val: 2, left: { val: 4 }, right: { val: 5 } },
  right: { val: 3 }
};

console.log(diameterOfBinaryTree(root)); // e.g., 3 (edges)
console.log(diameterInNodes(root));      // e.g., 4 (nodes)

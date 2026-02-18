// 1️⃣ Tree node definition
interface TreeNode {
  val: number;          // value is irrelevant for diameter
  left?: TreeNode | null;
  right?: TreeNode | null;
}

// 2️⃣ Main diameter function
function diameterOfBinaryTree(root: TreeNode | null): number {
  let diameter = 0;                 // global accumulator

  function dfs(node: TreeNode | null): number {
    if (!node) return 0;            // height of empty subtree

    // Recursively find heights of left/right subtrees
    const leftHeight  = dfs(node.left);
    const rightHeight = dfs(node.right);

    // Path through current node (in edges)
    const pathThrough = leftHeight + rightHeight;

    // Update global diameter if this is the largest seen so far
    diameter = Math.max(diameter, pathThrough);

    // Return height from this node up to a leaf
    return 1 + Math.max(leftHeight, rightHeight);
  }

  dfs(root);
  return diameter;
}
// Example tree:
//      1
//     / \
//    2   3
//   / \
//  4   5
const tree: TreeNode = {
  val: 1,
  left: {
    val: 2,
    left: { val: 4, left: null, right: null },
    right: { val: 5, left: null, right: null },
  },
  right: { val: 3, left: null, right: null },
};

console.log(diameterOfBinaryTree(tree)); // Output: 3
// Explanation: path 4‑2‑1‑3 uses 3 edges
console.log(diameterOfBinaryTree(null));           // 0
console.log(diameterOfBinaryTree({ val: 42 }));    // 0

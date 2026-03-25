// Basic binary‑tree node
class TreeNode<T> {
  constructor(
    public val: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}

// Main helper that returns the height of a node and updates maxDiameter
function computeHeight<T>(node: TreeNode<T> | null, maxDiameter: { value: number }): number {
  if (!node) return -1; // height of empty subtree is -1 so that a single node gives 0

  const leftHeight = computeHeight(node.left, maxDiameter);
  const rightHeight = computeHeight(node.right, maxDiameter);

  // Path that passes through this node
  const diameterAtNode = leftHeight + rightHeight + 2; // +2 edges to connect left and right via current node
  if (diameterAtNode > maxDiameter.value) {
    maxDiameter.value = diameterAtNode;
  }

  // Return height of this subtree
  return Math.max(leftHeight, rightHeight) + 1;
}

// Public API
export function treeDiameter<T>(root: TreeNode<T> | null): number {
  const maxDiameter = { value: 0 };
  computeHeight(root, maxDiameter);
  return maxDiameter.value; // number of edges on the longest path
}
        1
       / \
      2   3
     / \     
    4   5    

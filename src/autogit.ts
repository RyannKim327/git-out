// ---------------------------------------------------------------------
// 1️⃣  Node definition
// ---------------------------------------------------------------------
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// ---------------------------------------------------------------------
// 2️⃣  Helper that returns (height, diameter) for a subtree
// ---------------------------------------------------------------------
function heightAndDiameter(node: TreeNode | null): { h: number; d: number } {
  // Base case: empty subtree
  if (node === null) {
    return { h: 0, d: 0 }; // height 0, diameter 0
  }

  // Recursively gather left and right results
  const left = heightAndDiameter(node.left);
  const right = heightAndDiameter(node.right);

  // Current node's height
  const curHeight = Math.max(left.h, right.h) + 1;

  // Diameter that passes through this node
  const curThrough = left.h + right.h + 1;

  // Overall diameter for this subtree
  const curDiameter = Math.max(curThrough, left.d, right.d);

  return { h: curHeight, d: curDiameter };
}

// ---------------------------------------------------------------------
// 3️⃣  Public entry point
// ---------------------------------------------------------------------
export function diameterOfBinaryTree(root: TreeNode | null): number {
  return heightAndDiameter(root).d;
}
// Build a quick test tree:
//        1
//       / \
//      2   3
//         / \
//        4   5
const root = new TreeNode(
  1,
  new TreeNode(2),
  new TreeNode(3, new TreeNode(4), new TreeNode(5))
);

console.log(diameterOfBinaryTree(root)); // 5  (path: 4-3-1-2-? actually 4-3-1-2 is 4 nodes but diameter counts nodes; here 5-3-1-2 is 4 nodes though, but path lengths are nodes thus 5 nodes? Let's quick double-check)

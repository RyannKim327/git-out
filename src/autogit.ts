          1
        /   \
       2     3
      / \     \
     4   5     6
                \
                 7
// ---------- 1️⃣  Tree node definition ----------
class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(val: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val;
    if (left) this.left = left;
    if (right) this.right = right;
  }
}

// ---------- 2️⃣  Diameter calculation ----------
/**
 * Returns the diameter (number of edges) of the binary tree rooted at `root`.
 *
 * @param root - The root of the binary tree (null => empty tree → diameter 0)
 */
function treeDiameter(root: TreeNode | null): number {
  // Holds the best diameter we have seen so far.
  let maxDiameter = 0;

  /**
   * Post‑order DFS that returns the height of the subtree rooted at `node`.
   *
   * Height = number of edges on the longest downward path from `node`
   * to a leaf.  An empty subtree has height -1 (so a leaf node gets height 0).
   */
  function dfs(node: TreeNode | null): number {
    if (!node) return -1; // base case: empty child

    const leftHeight = dfs(node.left);
    const rightHeight = dfs(node.right);

    // Path that goes through this node = leftHeight + rightHeight + 2 edges.
    // (We add 2 because each height is measured in edges from child to leaf.)
    const pathThroughNode = leftHeight + rightHeight + 2;
    maxDiameter = Math.max(maxDiameter, pathThroughNode);

    // Return height of this node for its parent.
    return Math.max(leftHeight, rightHeight) + 1;
  }

  dfs(root);
  return maxDiameter; // 0 for an empty tree, otherwise number of edges
}

// ---------- 3️⃣  Example usage ----------
function buildExampleTree(): TreeNode {
  // Construct the tree from the picture above:
  //          1
  //        /   \
  //       2     3
  //      / \     \
  //     4   5     6
  //                \
  //                 7
  const n7 = new TreeNode(7);
  const n6 = new TreeNode(6, null, n7);
  const n5 = new TreeNode(5);
  const n4 = new TreeNode(4);
  const n3 = new TreeNode(3, null, n6);
  const n2 = new TreeNode(2, n4, n5);
  const n1 = new TreeNode(1, n2, n3);
  return n1;
}

const root = buildExampleTree();
console.log('Diameter (edges):', treeDiameter(root)); // → 5
function treeDiameter(root: TreeNode | null): number {
  let max = 0;
  const height = (n: TreeNode | null): number => {
    if (!n) return -1;
    const l = height(n.left), r = height(n.right);
    max = Math.max(max, l + r + 2);
    return Math.max(l, r) + 1;
  };
  height(root);
  return max;
}

// ----------  Tree node definition ----------
class TreeNode<T> {
  constructor(
    public val: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null,
  ) {}
}

// ----------  Diameter helper ----------
function diameter(root: TreeNode<any> | null): number {
  let maxDiameter = 0;           // global best

  // returns height of subtree rooted at `node`
  function dfs(node: TreeNode<any> | null): number {
    if (!node) return 0;

    const leftH  = dfs(node.left);
    const rightH = dfs(node.right);

    // path that passes through this node
    const candidate = leftH + rightH;
    if (candidate > maxDiameter) maxDiameter = candidate;

    // height of this subtree
    return Math.max(leftH, rightH) + 1;
  }

  dfs(root);
  return maxDiameter;                   // number of edges on the longest path
}

/* ------------------------------------------------------------------ */
/*  Quick sanity check – build a tree and run the function             */
/* ------------------------------------------------------------------ */

const a = new TreeNode('a');
const b = new TreeNode('b');
const c = new TreeNode('c');
const d = new TreeNode('d');
const e = new TreeNode('e');
const f = new TreeNode('f');

a.left  = b;                //   a
a.right = c;                //  / \
b.left  = d;                // d   c
b.right = e;                //  \   \
e.right = f;                //   f

console.log(diameter(a));   // → 4
const diameterInNodes = diameter(root) + 1;

diameter(root) = max(
        diameter(left)                                       // purely left side
      , diameter(right)                                      // purely right side
      , height(left) + height(right) + 1                     // path that goes through root
      )
export class TreeNode<T> {
  constructor(
    public val: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}
/**
 * Return [height, diameter] of the subtree rooted at `node`.
 *
 * - `height` is the number of nodes on the longest path from `node` downwards.
 * - `diameter` is the maximum number of nodes on any path that intersects the subtree.
 */
function heightAndDiameter<T>(
  node: TreeNode<T> | null
): [number, number] {
  if (!node) return [0, 0];          // height = 0, diameter = 0

  const [leftH, leftD]   = heightAndDiameter(node.left);
  const [rightH, rightD] = heightAndDiameter(node.right);

  const height = 1 + Math.max(leftH, rightH);
  // path that goes through this node uses left subtree, node itself, right subtree
  const throughRoot = leftH + rightH + 1;

  const diameter = Math.max(leftD, rightD, throughRoot);

  return [height, diameter];
}
export function diameter<T>(root: TreeNode<T> | null): number {
  // Return diameter as number of nodes on the longest path.
  // If you prefer “edges” instead, just return `diameter - 1`.
  const [, dia] = heightAndDiameter(root);
  return dia;
}
const root = new TreeNode(1,
  new TreeNode(2,
    new TreeNode(4),
    new TreeNode(5)
  ),
  new TreeNode(3,
    null,
    new TreeNode(6)
  )
);

console.log(diameter(root)); // → 5  (path 4‑2‑1‑3‑6)
export function diameterInEdges<T>(root: TreeNode<T> | null): number {
  const diaNodes = diameter(root);
  return diaNodes > 0 ? diaNodes - 1 : 0;
}

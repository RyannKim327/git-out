class TreeNode<T = number> {
  constructor(
    public val: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null,
  ) {}
}
function diameterOfBinaryTree(root: TreeNode | null): number {
  let maxDiameter = 0;

  function dfs(node: TreeNode | null): number {
    if (!node) return 0;          // height of a null subtree is 0

    const leftHeight  = dfs(node.left);
    const rightHeight = dfs(node.right);

    // potential diameter that passes through this node
    const localDiameter = leftHeight + rightHeight;
    if (localDiameter > maxDiameter) maxDiameter = localDiameter;

    // height is max child height + 1 edge to the child
    return Math.max(leftHeight, rightHeight) + 1;
  }

  dfs(root);
  return maxDiameter;  // edges count
}
// Build a tree:
//        1
//       / \
//      2   3
//     / \     
//    4   5  
const root = new TreeNode(1,
              new TreeNode(2,
                new TreeNode(4),
                new TreeNode(5)
              ),
              new TreeNode(3)
            );

console.log(diameterOfBinaryTree(root)); // → 3
function diameterIterative(root: TreeNode | null): number {
  if (!root) return 0;
  let maxDiameter = 0;
  const stack = [{ node: root, visited: false, height: 0 }];

  while (stack.length) {
    const frame = stack.pop()!;
    if (!frame.node) continue;

    if (frame.visited) {
      // Children already processed – compute height & diameter
      const leftHeight = frame.node.left?.height ?? 0;
      const rightHeight = frame.node.right?.height ?? 0;

      maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);
      frame.node.height = Math.max(leftHeight, rightHeight) + 1;
    } else {
      // First visit: push back as visited and push children
      stack.push({ node: frame.node, visited: true, height: 0 });
      if (frame.node.right) stack.push({ node: frame.node.right, visited: false, height: 0 });
      if (frame.node.left) stack.push({ node: frame.node.left, visited: false, height: 0 });
    }
  }
  return maxDiameter;
}

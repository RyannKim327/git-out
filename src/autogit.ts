// A standard binary‑tree node definition
class TreeNode<T = number> {
  constructor(
    public val: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null,
  ) {}
}
0                     if root is null
1                     if root has no children
count(left) + count(right)   otherwise
function countLeaves<T>(root: TreeNode<T> | null): number {
  if (!root) return 0;                    // Empty tree

  // No children → it’s a leaf!
  if (!root.left && !root.right) return 1;

  // Walk the two sub‑trees and add their leaf counts
  return countLeaves(root.left) + countLeaves(root.right);
}
const tree = new TreeNode(1,
             new TreeNode(2, new TreeNode(4), null),
             new TreeNode(3, null, new TreeNode(5))
          );

console.log(countLeaves(tree)); // → 3  (nodes 4, 3, 5)
function countLeavesIter<T>(root: TreeNode<T> | null): number {
  if (!root) return 0;

  let leafCount = 0;
  const stack: (TreeNode<T> | null)[] = [root];

  while (stack.length) {
    const node = stack.pop()!;
    if (!node) continue;

    if (!node.left && !node.right) {
      leafCount++;
    } else {
      // push children onto stack; order doesn’t matter
      if (node.right) stack.push(node.right);
      if (node.left)  stack.push(node.left);
    }
  }

  return leafCount;
}
function getLeafValues<T>(root: TreeNode<T> | null): T[] {
  const leaves: T[] = [];

  if (!root) return leaves;

  const stack: (TreeNode<T> | null)[] = [root];
  while (stack.length) {
    const node = stack.pop()!;
    if (!node) continue;

    if (!node.left && !node.right) leaves.push(node.val);
    else {
      if (node.right) stack.push(node.right);
      if (node.left)  stack.push(node.left);
    }
  }

  return leaves;
}

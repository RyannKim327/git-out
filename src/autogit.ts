// Simple binary tree node
export interface TreeNode<T = unknown> {
  val: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}
export function countLeavesRec<T>(root: TreeNode<T> | undefined): number {
  // No tree = no leaves
  if (!root) return 0;

  // If both children are missing → leaf
  if (!root.left && !root.right) return 1;

  // Recurse on children and add the results
  return countLeavesRec(root.left) + countLeavesRec(root.right);
}
export function countLeavesIter<T>(root: TreeNode<T> | undefined): number {
  if (!root) return 0;

  let leaves = 0;
  const stack: Array<TreeNode<T>> = [root];

  while (stack.length) {
    const node = stack.pop()!;

    // A leaf if both children are missing
    if (!node.left && !node.right) {
      leaves++;
    } else {
      // Push existing children onto the stack
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }
  }

  return leaves;
}
// Build a tiny tree:
//       a
//      / \
//     b   c
//    /
//   d
const tree: TreeNode<string> = {
  val: 'a',
  left: { val: 'b', left: { val: 'd' } },
  right: { val: 'c' },
};

console.log(countLeavesRec(tree)); // 2  (nodes d & c)
console.log(countLeavesIter(tree)); // 2

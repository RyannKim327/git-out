export interface TreeNode<T = number> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}
export function countLeaves<T>(root?: TreeNode<T>): number {
  if (!root) return 0;                     // empty tree

  // If the node has no children, it’s a leaf
  if (!root.left && !root.right) return 1;

  // Otherwise recurse on children and sum the results
  return countLeaves(root.left) + countLeaves(root.right);
}
export function countLeavesIter<T>(root?: TreeNode<T>): number {
  if (!root) return 0;

  let stack: TreeNode<T>[] = [root];
  let leaves = 0;

  while (stack.length) {
    const node = stack.pop()!;
    if (!node.left && !node.right) {
      leaves++;                // it’s a leaf
    } else {
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }
  }

  return leaves;
}
const tree: TreeNode = {
  value: 1,
  left: { value: 2, left: { value: 4 }, right: { value: 5 } },
  right: { value: 3, right: { value: 6 } }
};

console.log(countLeaves(tree));          // → 3  (nodes 4, 5, 6)
console.log(countLeavesIter(tree));      // → 3

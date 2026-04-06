interface TreeNode<T = any> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}
function countLeaves<T>(root?: TreeNode<T>): number {
  if (!root) return 0;                     // empty tree
  if (!root.left && !root.right) return 1; // leaf

  // otherwise count leaves in both sub‑trees
  return countLeaves(root.left) + countLeaves(root.right);
}
function countLeavesIter<T>(root?: TreeNode<T>): number {
  if (!root) return 0;

  let count = 0;
  const stack: TreeNode<T>[] = [root];

  while (stack.length) {
    const node = stack.pop()!;

    if (!node.left && !node.right) {
      count++;
    } else {
      if (node.right) stack.push(node.right);
      if (node.left)  stack.push(node.left);
    }
  }

  return count;
}
const root: TreeNode<number> = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4 },
    right: { value: 5 }
  },
  right: {
    value: 3,
    right: { value: 6 }
  }
};

console.log(countLeaves(root));          // → 3  (4, 5, 6)
console.log(countLeavesIter(root));      // → 3

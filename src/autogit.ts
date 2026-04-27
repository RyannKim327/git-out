// A minimal node definition
interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

// Recursive helper that treats the tree as an expression tree
function sumTree(node: TreeNode<number> | null): number {
  if (!node) return 0;                // nothing here – contributes nothing
  return node.value + sumTree(node.left) + sumTree(node.right);
}
const root: TreeNode<number> = {
  value: 10,
  left: { value: 5, left: null, right: null },
  right: { value: -3, left: null, right: null },
};

console.log(sumTree(root)); // 12
function sumTreeIterative(root: TreeNode<number> | null): number {
  if (!root) return 0;

  let sum = 0;
  const stack: TreeNode<number>[] = [root];

  while (stack.length) {
    const node = stack.pop()!;
    sum += node.value;

    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return sum;
}

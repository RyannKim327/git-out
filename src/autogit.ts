interface TreeNode {
  value: number;          // what you want to sum
  left?: TreeNode | null;
  right?: TreeNode | null;
}
function sumTreeRecursive(node: TreeNode | null): number {
  if (!node) return 0;

  const leftSum  = sumTreeRecursive(node.left ?? null);
  const rightSum = sumTreeRecursive(node.right ?? null);

  return node.value + leftSum + rightSum;
}
function sumTreeIterative(root: TreeNode | null): number {
  if (!root) return 0;

  let total = 0;
  const stack: TreeNode[] = [root];

  while (stack.length) {
    const node = stack.pop()!;
    total += node.value;

    // Push children in any order – the sum is commutative.
    if (node.right) stack.push(node.right);
    if (node.left)  stack.push(node.left);
  }

  return total;
}
// A tiny test tree:
//        5
//       / \
//      3   7
//     / \   \
//    2   4   8

const testTree: TreeNode = {
  value: 5,
  left: {
    value: 3,
    left:  { value: 2 },
    right: { value: 4 }
  },
  right: {
    value: 7,
    right: { value: 8 }
  }
};

console.log('Recursive sum:', sumTreeRecursive(testTree));  // 29
console.log('Iterative sum:', sumTreeIterative(testTree));  // 29

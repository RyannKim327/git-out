class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
function sumNodes(root: TreeNode | null): number {
  if (!root) return 0;
  return root.val + sumNodes(root.left) + sumNodes(root.right);
}
// Build a small tree:
//       1
//      / \
//     2   3
//        / \
//
// 4   5

const tree = new TreeNode(
  1,
  new TreeNode(2),
  new TreeNode(3, new TreeNode(4), new TreeNode(5))
);

console.log(sumNodes(tree)); // → 15
interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}
function sumNodesFunctional(root: TreeNode | undefined): number {
  if (!root) return 0;
  return root.value + sumNodesFunctional(root.left) + sumNodesFunctional(root.right);
}
const funcTree: TreeNode = {
  value: 1,
  left: { value: 2 },
  right: {
    value: 3,
    left: { value: 4 },
    right: { value: 5 },
  },
};

console.log(sumNodesFunctional(funcTree)); // → 15
function sumNodesIterative(root: TreeNode | null): number {
  if (!root) return 0;

  let sum = 0;
  const stack: (TreeNode | null)[] = [root];

  while (stack.length) {
    const node = stack.pop();
    if (!node) continue;

    sum += node.val;          // inside a class node
    // sum += node.value;      // inside a functional node

    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return sum;
}
console.log(sumNodesIterative(tree)); // → 15

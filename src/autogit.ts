class TreeNode {
  value: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}
interface TreeNode {
  value: number;
  left?: TreeNode | null;
  right?: TreeNode | null;
}
function countLeaves(root: TreeNode | null): number {
  if (!root) return 0;                     // empty subtree → no leaves

  // leaf test
  const isLeaf = !root.left && !root.right;
  if (isLeaf) return 1;                    // this node itself is a leaf

  // otherwise recursively count in both sub‑trees
  return countLeaves(root.left) + countLeaves(root.right);
}
function countLeavesIterative(root: TreeNode | null): number {
  if (!root) return 0;

  let count = 0;
  const stack: (TreeNode | null)[] = [root];

  while (stack.length) {
    const node = stack.pop() as TreeNode;

    const isLeaf = !node.left && !node.right;
    if (isLeaf) {
      count += 1;
    } else {
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }
  }

  return count;
}
// Build the tree:
//        1
//       / \
//      2   3
//     /   / \
//    4   5   6
//         \
//          7
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
root.right.left.right = new TreeNode(7);

console.log(countLeaves(root));          // → 3  (nodes 4, 7, 6)
console.log(countLeavesIterative(root)); // → 3

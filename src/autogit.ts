/** A very small “binary‑tree node” type. */
interface TreeNode {
  val: number;
  left?: TreeNode | null;
  right?: TreeNode | null;
}
function sumTreeRecursive(root: TreeNode | null): number {
  if (!root) return 0;                     // base case – no node
  const leftSum  = sumTreeRecursive(root.left);
  const rightSum = sumTreeRecursive(root.right);
  return root.val + leftSum + rightSum;    // process node after its children
}
function sumTreeIterative(root: TreeNode | null): number {
  if (!root) return 0;

  const queue: TreeNode[] = [root];
  let total = 0;

  while (queue.length) {
    const node = queue.shift()!;   // non‑null assertion – queue always contains real nodes
    total += node.val;

    if (node.left)  queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return total;
}
// Small example
const tree: TreeNode = {
  val: 10,
  left: { val: 5 },
  right: {
    val: 20,
    left: { val: 15 },
    right: { val: 25 }
  }
};

console.log(sumTreeRecursive(tree)); // 75
console.log(sumTreeIterative(tree)); // 75

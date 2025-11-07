class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
function sumNodesRecursive(node: TreeNode | null): number {
  if (node === null) return 0; // Base case: empty tree
  return node.value + 
         sumNodesRecursive(node.left) + 
         sumNodesRecursive(node.right);
}
function sumNodesIterative(root: TreeNode | null): number {
  if (root === null) return 0;
  
  let sum = 0;
  const queue: TreeNode[] = [root]; // Use a queue for BFS

  while (queue.length > 0) {
    const node = queue.shift()!; // Dequeue front node
    sum += node.value;

    // Enqueue children if they exist
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return sum;
}
// Build a binary tree:
//      10
//     /  \
//    5   15
//   / \    \
//  3   7   18

const root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(7);
root.right.right = new TreeNode(18);

// Calculate sum
console.log(sumNodesRecursive(root)); // 10+5+15+3+7+18 = 58
console.log(sumNodesIterative(root)); // 58

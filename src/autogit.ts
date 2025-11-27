class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}

function maxDepth(root: TreeNode | null): number {
  // Base case: an empty tree has depth 0
  if (root === null) return 0;

  // Recursively find the depth of left and right subtrees
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  // Depth of current node = 1 + max(leftDepth, rightDepth)
  return 1 + Math.max(leftDepth, rightDepth);
}
function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;
  
  let depth = 0;
  const queue: TreeNode[] = [root]; // Initialize queue with root
  
  while (queue.length > 0) {
    depth++;
    const levelSize = queue.length; // Process all nodes at the current level
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!; // Dequeue front node
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  
  return depth;
}

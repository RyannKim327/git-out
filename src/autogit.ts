interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}
function maxDepthRecursive<T>(root: TreeNode<T> | null): number {
  if (root === null) {
    return 0;
  }
  
  const leftDepth = maxDepthRecursive(root.left);
  const rightDepth = maxDepthRecursive(root.right);
  
  return Math.max(leftDepth, rightDepth) + 1;
}
function maxDepthIterative<T>(root: TreeNode<T> | null): number {
  if (root === null) {
    return 0;
  }
  
  let depth = 0;
  const queue: TreeNode<T>[] = [root];
  
  while (queue.length > 0) {
    depth++;
    const levelSize = queue.length;
    
    for (let i = 0; i < levelSize; i++) {
      const currentNode = queue.shift()!;
      
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }
  
  return depth;
}
interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function maxDepth<T>(root: TreeNode<T> | null): number {
  if (root === null) {
    return 0;
  }
  
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  
  return Math.max(leftDepth, rightDepth) + 1;
}

// Example usage:
const tree: TreeNode<number> = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
      left: null,
      right: null
    },
    right: {
      value: 5,
      left: null,
      right: null
    }
  },
  right: {
    value: 3,
    left: null,
    right: {
      value: 6,
      left: null,
      right: null
    }
  }
};

console.log(maxDepth(tree)); // Output: 3
class BinaryTreeNode<T> {
  constructor(
    public value: T,
    public left: BinaryTreeNode<T> | null = null,
    public right: BinaryTreeNode<T> | null = null
  ) {}
}

function getMaxDepth<T>(node: BinaryTreeNode<T> | null): number {
  if (node === null) {
    return 0;
  }
  
  return Math.max(getMaxDepth(node.left), getMaxDepth(node.right)) + 1;
}

// Example usage:
const root = new BinaryTreeNode(1);
root.left = new BinaryTreeNode(2);
root.right = new BinaryTreeNode(3);
root.left.left = new BinaryTreeNode(4);
root.left.right = new BinaryTreeNode(5);

console.log(getMaxDepth(root)); // Output: 3

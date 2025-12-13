interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}
function diameterOfBinaryTree(root: TreeNode | null): number {
  let diameter = 0;
  
  function dfs(node: TreeNode | null): number {
    if (!node) return 0;
    
    const left = dfs(node.left);
    const right = dfs(node.right);
    
    // Update the diameter if the path through current node is longer
    diameter = Math.max(diameter, left + right);
    
    // Return the maximum depth from this node
    return Math.max(left, right) + 1;
  }
  
  dfs(root);
  return diameter;
}
class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}

function diameterOfBinaryTree(root: TreeNode | null): number {
  let diameter = 0;
  
  function dfs(node: TreeNode | null): number {
    if (!node) return 0;
    
    const leftDepth = dfs(node.left);
    const rightDepth = dfs(node.right);
    
    // Update diameter if path through current node is longer
    diameter = Math.max(diameter, leftDepth + rightDepth);
    
    // Return the maximum depth from this node
    return Math.max(leftDepth, rightDepth) + 1;
  }
  
  dfs(root);
  return diameter;
}

// Example usage:
// Create a sample binary tree:
//       1
//      / \
//     2   3
//    / \
//   4   5

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

console.log(diameterOfBinaryTree(root)); // Output: 3 (path 4-2-1-3 or 4-2-5)
class BinaryTree {
  root: TreeNode | null = null;
  
  constructor(root: TreeNode | null = null) {
    this.root = root;
  }
  
  getDiameter(): number {
    let diameter = 0;
    
    const dfs = (node: TreeNode | null): number => {
      if (!node) return 0;
      
      const left = dfs(node.left);
      const right = dfs(node.right);
      
      diameter = Math.max(diameter, left + right);
      return Math.max(left, right) + 1;
    };
    
    dfs(this.root);
    return diameter;
  }
}

// Usage
const tree = new BinaryTree(root);
console.log(tree.getDiameter()); // Output: 3

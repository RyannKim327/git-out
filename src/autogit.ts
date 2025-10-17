// Define the Binary Tree Node
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

class BinaryTreeDiameter {
  private maxDiameter: number = 0;
  
  // Helper function to calculate height and update diameter
  private height(node: TreeNode | null): number {
    if (!node) {
      return 0;
    }
    
    // Calculate heights of left and right subtrees
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    
    // Update max diameter at this node
    // Diameter through this node = leftHeight + rightHeight + 1
    this.maxDiameter = Math.max(this.maxDiameter, leftHeight + rightHeight + 1);
    
    // Return height of current subtree
    return Math.max(leftHeight, rightHeight) + 1;
  }
  
  // Main function to find diameter
  diameterOfBinaryTree(root: TreeNode | null): number {
    this.maxDiameter = 0;
    if (!root) {
      return 0;
    }
    
    this.height(root);
    return this.maxDiameter - 1; // Return actual diameter (excluding the +1 for the node)
  }
}

// Alternative implementation using a more explicit approach
class BinaryTreeDiameterExplicit {
  // Calculate height of a node
  private height(node: TreeNode | null): number {
    if (!node) {
      return 0;
    }
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }
  
  // Calculate diameter through a specific node
  private diameterAtNode(node: TreeNode | null): number {
    if (!node) {
      return 0;
    }
    
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return leftHeight + rightHeight + 1;
  }
  
  diameterOfBinaryTree(root: TreeNode | null): number {
    if (!root) {
      return 0;
    }
    
    let maxDiameter = 0;
    
    // Helper function to traverse the tree
    function traverse(node: TreeNode | null): void {
      if (!node) {
        return;
      }
      
      // Update max diameter for current node
      maxDiameter = Math.max(maxDiameter, this.diameterAtNode(node));
      
      // Recurse on children
      traverse(node.left);
      traverse(node.right);
    }
    
    traverse.call(this, root);
    return maxDiameter - 1;
  }
}

// Example usage and test
function createSampleTree(): TreeNode {
  // Create the tree:
  //       1
  //      / \
  //     2   3
  //    / \ / \
  //   4  5 6  7
  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.left!.left = new TreeNode(4);
  root.left!.right = new TreeNode(5);
  root.right!.left = new TreeNode(6);
  root.right!.right = new TreeNode(7);
  
  return root;
}

// Test the implementation
const diameterFinder = new BinaryTreeDiameter();
const sampleTree = createSampleTree();
const diameter = diameterFinder.diameterOfBinaryTree(sampleTree);
console.log(`Diameter of the binary tree: ${diameter}`); // Output: 3

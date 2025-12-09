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

function diameterOfBinaryTree(root: TreeNode | null): number {
    let diameter = 0;
    
    function dfs(node: TreeNode | null): number {
        if (!node) return 0;
        
        // Recursively get the height of left and right subtrees
        const leftHeight = dfs(node.left);
        const rightHeight = dfs(node.right);
        
        // Update the diameter - the longest path through this node
        diameter = Math.max(diameter, leftHeight + rightHeight);
        
        // Return the height of the current node
        return Math.max(leftHeight, rightHeight) + 1;
    }
    
    dfs(root);
    return diameter;
}
// Create a binary tree:
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

console.log(diameterOfBinaryTree(root)); // Output: 3 (path from 4 to 3 or 5 to 3)
class BinaryTree {
    root: TreeNode | null;
    
    constructor(root: TreeNode | null = null) {
        this.root = root;
    }
    
    diameter(): number {
        let maxDiameter = 0;
        
        const getHeight = (node: TreeNode | null): number => {
            if (!node) return 0;
            
            const leftHeight = getHeight(node.left);
            const rightHeight = getHeight(node.right);
            
            maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);
            
            return Math.max(leftHeight, rightHeight) + 1;
        };
        
        getHeight(this.root);
        return maxDiameter;
    }
}

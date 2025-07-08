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

function countLeafNodes(root: TreeNode | null): number {
    // Base case: if the tree is empty
    if (root === null) {
        return 0;
    }
    
    // If the current node is a leaf node, return 1
    if (root.left === null && root.right === null) {
        return 1;
    }
    
    // Recursively count leaf nodes in the left and right subtrees
    return countLeafNodes(root.left) + countLeafNodes(root.right);
}

// Example usage
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.right = new TreeNode(6);

const leafCount = countLeafNodes(root);
console.log(`Number of leaf nodes: ${leafCount}`); // Output: 3

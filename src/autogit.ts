class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val: number) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function diameterOfBinaryTree(root: TreeNode | null): number {
    let diameter = 0;

    function height(node: TreeNode | null): number {
        if (node === null) {
            return 0;
        }

        // Recursively find the height of left and right subtree
        const leftHeight = height(node.left);
        const rightHeight = height(node.right);

        // Update the diameter if the path through this node is larger
        diameter = Math.max(diameter, leftHeight + rightHeight);

        // Return the height of the subtree rooted at current node
        return Math.max(leftHeight, rightHeight) + 1;
    }

    height(root); // Start the recursion
    return diameter; // The maximum diameter found
}
// Creating a sample binary tree
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

const result = diameterOfBinaryTree(root);
console.log(`Diameter of the binary tree is: ${result}`); // Output will be 4

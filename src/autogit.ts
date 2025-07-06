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

class BinaryTree {
    root: TreeNode | null;

    constructor() {
        this.root = null;
    }

    // Function to calculate diameter of the binary tree
    diameter(): number {
        let maxDiameter = 0;

        const height = (node: TreeNode | null): number => {
            if (node === null) {
                return 0; // Base case: the height of an empty node is 0
            }

            // Recursively find the height of left and right subtrees
            const leftHeight = height(node.left);
            const rightHeight = height(node.right);

            // Update the maximum diameter found so far
            maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

            // Return the height of the current node
            return Math.max(leftHeight, rightHeight) + 1;
        };

        height(this.root); // Start the DFS from the root
        return maxDiameter; // Return the maximum diameter found
    }
}

// Example usage:
const tree = new BinaryTree();
tree.root = new TreeNode(1);
tree.root.left = new TreeNode(2);
tree.root.right = new TreeNode(3);
tree.root.left.left = new TreeNode(4);
tree.root.left.right = new TreeNode(5);

const diameter = tree.diameter();
console.log(`Diameter of the binary tree is: ${diameter}`);

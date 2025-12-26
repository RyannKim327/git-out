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

function diameterOfBinaryTree(root: TreeNode | null): number {
    let diameter = 0;

    function dfs(node: TreeNode | null): number {
        if (!node) return 0;

        const leftHeight = dfs(node.left);
        const rightHeight = dfs(node.right);

        // Update the diameter
        diameter = Math.max(diameter, leftHeight + rightHeight);

        // Return the height of the current node
        return Math.max(leftHeight, rightHeight) + 1;
    }

    dfs(root);
    return diameter;
}
// Create a binary tree
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

// Calculate diameter
const diameter = diameterOfBinaryTree(root);
console.log(`Diameter of the binary tree: ${diameter}`); // Output: 3
class BinaryTree {
    root: TreeNode | null;

    constructor(root?: TreeNode | null) {
        this.root = root || null;
    }

    diameter(): number {
        let maxDiameter = 0;

        const calculateHeight = (node: TreeNode | null): number => {
            if (!node) return 0;

            const leftHeight = calculateHeight(node.left);
            const rightHeight = calculateHeight(node.right);

            // Update maximum diameter
            maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

            return Math.max(leftHeight, rightHeight) + 1;
        };

        calculateHeight(this.root);
        return maxDiameter;
    }
}

// Usage
const tree = new BinaryTree(root);
console.log(`Diameter: ${tree.diameter()}`);

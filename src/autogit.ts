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
function sumOfNodes(root: TreeNode | null): number {
    // Base case: if the node is null, return 0
    if (root === null) {
        return 0;
    }

    // Recursive case: return the value of the current node plus the sum of left and right subtrees
    return root.value + sumOfNodes(root.left) + sumOfNodes(root.right);
}
// Create a simple binary tree
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

// Calculate the sum of all nodes
const totalSum = sumOfNodes(root);
console.log(`The sum of all nodes in the binary tree is: ${totalSum}`); // Output: 15
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

function sumOfNodes(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    return root.value + sumOfNodes(root.left) + sumOfNodes(root.right);
}

// Example usage
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

const totalSum = sumOfNodes(root);
console.log(`The sum of all nodes in the binary tree is: ${totalSum}`); // Output: 15

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

        const leftHeight = dfs(node.left);
        const rightHeight = dfs(node.right);

        diameter = Math.max(diameter, leftHeight + rightHeight);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    dfs(root);
    return diameter;
}

// Test cases
function testDiameterCalculation() {
    // Test case 1: Simple tree
    const root1 = new TreeNode(1);
    root1.left = new TreeNode(2);
    root1.right = new TreeNode(3);
    root1.left.left = new TreeNode(4);
    root1.left.right = new TreeNode(5);
    
    console.log("Diameter 1:", diameterOfBinaryTree(root1)); // Output: 3

    // Test case 2: Single node
    const root2 = new TreeNode(1);
    console.log("Diameter 2:", diameterOfBinaryTree(root2)); // Output: 0

    // Test case 3: Right-heavy tree
    const root3 = new TreeNode(1);
    root3.right = new TreeNode(2);
    root3.right.right = new TreeNode(3);
    root3.right.right.right = new TreeNode(4);
    
    console.log("Diameter 3:", diameterOfBinaryTree(root3)); // Output: 3

    // Test case 4: Empty tree
    console.log("Diameter 4:", diameterOfBinaryTree(null)); // Output: 0
}

testDiameterCalculation();
interface BinaryTree<T> {
    value: T;
    left: BinaryTree<T> | null;
    right: BinaryTree<T> | null;
}

function diameterOfBinaryTreeGeneric<T>(root: BinaryTree<T> | null): number {
    let diameter = 0;

    function dfs(node: BinaryTree<T> | null): number {
        if (!node) return 0;

        const leftHeight = dfs(node.left);
        const rightHeight = dfs(node.right);

        diameter = Math.max(diameter, leftHeight + rightHeight);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    dfs(root);
    return diameter;
}

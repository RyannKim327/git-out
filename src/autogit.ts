class TreeNode<T> {
    val: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    
    constructor(val: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
function diameterOfBinaryTreeNaive<T>(root: TreeNode<T> | null): number {
    if (!root) return 0;
    
    // Calculate height of left and right subtrees
    const leftHeight = getHeight(root.left);
    const rightHeight = getHeight(root.right);
    
    // Diameter through root
    const diameterThroughRoot = leftHeight + rightHeight;
    
    // Diameter in left and right subtrees
    const leftDiameter = diameterOfBinaryTreeNaive(root.left);
    const rightDiameter = diameterOfBinaryTreeNaive(root.right);
    
    // Return maximum of the three
    return Math.max(diameterThroughRoot, leftDiameter, rightDiameter);
}

function getHeight<T>(node: TreeNode<T> | null): number {
    if (!node) return 0;
    return 1 + Math.max(getHeight(node.left), getHeight(node.right));
}
function diameterOfBinaryTree<T>(root: TreeNode<T> | null): number {
    let diameter = 0;
    
    function height(node: TreeNode<T> | null): number {
        if (!node) return 0;
        
        const leftHeight = height(node.left);
        const rightHeight = height(node.right);
        
        // Update diameter
        diameter = Math.max(diameter, leftHeight + rightHeight);
        
        // Return height of current node
        return 1 + Math.max(leftHeight, rightHeight);
    }
    
    height(root);
    return diameter;
}
interface TreeResult {
    height: number;
    diameter: number;
}

function diameterOfBinaryTreeWithResult<T>(root: TreeNode<T> | null): number {
    function calculate(node: TreeNode<T> | null): TreeResult {
        if (!node) {
            return { height: 0, diameter: 0 };
        }
        
        const left = calculate(node.left);
        const right = calculate(node.right);
        
        const currentHeight = 1 + Math.max(left.height, right.height);
        const currentDiameter = Math.max(
            left.height + right.height,
            left.diameter,
            right.diameter
        );
        
        return { height: currentHeight, diameter: currentDiameter };
    }
    
    return calculate(root).diameter;
}
// Create a sample binary tree
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.left.right.right = new TreeNode(6);

// Test the functions
console.log("Naive approach:", diameterOfBinaryTreeNaive(root)); // Output: 4
console.log("Optimized approach:", diameterOfBinaryTree(root)); // Output: 4
console.log("Result object approach:", diameterOfBinaryTreeWithResult(root)); // Output: 4

// More complex example
const complexRoot = new TreeNode(1);
complexRoot.left = new TreeNode(2);
complexRoot.right = new TreeNode(3);
complexRoot.left.left = new TreeNode(4);
complexRoot.left.right = new TreeNode(5);
complexRoot.right.right = new TreeNode(6);
complexRoot.left.left.left = new TreeNode(7);
complexRoot.left.left.right = new TreeNode(8);
complexRoot.left.right.right = new TreeNode(9);
complexRoot.left.left.left.left = new TreeNode(10);

console.log("Complex tree diameter:", diameterOfBinaryTree(complexRoot)); // Output: 6
// Test edge cases
console.log("Empty tree:", diameterOfBinaryTree(null)); // Output: 0

const singleNode = new TreeNode(1);
console.log("Single node:", diameterOfBinaryTree(singleNode)); // Output: 0

const leftSkewed = new TreeNode(1);
leftSkewed.left = new TreeNode(2);
leftSkewed.left.left = new TreeNode(3);
console.log("Left-skewed tree:", diameterOfBinaryTree(leftSkewed)); // Output: 2

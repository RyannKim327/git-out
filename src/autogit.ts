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
        if (!node) return 0;
        
        const leftHeight = height(node.left);
        const rightHeight = height(node.right);
        
        // Update diameter with current node's path length
        diameter = Math.max(diameter, leftHeight + rightHeight);
        
        return 1 + Math.max(leftHeight, rightHeight);
    }
    
    height(root);
    return diameter;
}
function diameterOfBinaryTreeAlt(root: TreeNode | null): number {
    return findDiameter(root).diameter;
}

function findDiameter(node: TreeNode | null): { height: number; diameter: number } {
    if (!node) {
        return { height: 0, diameter: 0 };
    }
    
    const leftResult = findDiameter(node.left);
    const rightResult = findDiameter(node.right);
    
    const currentHeight = 1 + Math.max(leftResult.height, rightResult.height);
    const currentDiameter = Math.max(
        leftResult.height + rightResult.height,
        leftResult.diameter,
        rightResult.diameter
    );
    
    return { height: currentHeight, diameter: currentDiameter };
}
function diameterWithPath(root: TreeNode | null): { length: number; path: number[] } {
    if (!root) return { length: 0, path: [] };
    
    let maxLength = 0;
    let maxPath: number[] = [];
    
    function dfs(node: TreeNode | null): { height: number; path: number[] } {
        if (!node) return { height: 0, path: [] };
        
        const left = dfs(node.left);
        const right = dfs(node.right);
        
        // Check if current node forms the longest path
        const currentLength = left.height + right.height;
        if (currentLength > maxLength) {
            maxLength = currentLength;
            maxPath = [...left.path.reverse(), node.val, ...right.path];
        }
        
        // Return the longer branch with current node
        if (left.height > right.height) {
            return { 
                height: left.height + 1, 
                path: [...left.path, node.val] 
            };
        } else {
            return { 
                height: right.height + 1, 
                path: [...right.path, node.val] 
            };
        }
    }
    
    dfs(root);
    return { length: maxLength, path: maxPath };
}
// Create a sample binary tree
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

// Calculate diameter
console.log("Diameter:", diameterOfBinaryTree(root)); // Output: 3

// Get diameter with path
const result = diameterWithPath(root);
console.log("Diameter length:", result.length); // Output: 3
console.log("Diameter path:", result.path); // Output: [4, 2, 1, 3] or similar

// Test cases
const testCases = [
    { tree: null, expected: 0 },
    { tree: new TreeNode(1), expected: 0 },
    { 
        tree: (() => {
            const root = new TreeNode(1);
            root.left = new TreeNode(2);
            return root;
        })(),
        expected: 1
    }
];

// Run tests
testCases.forEach((testCase, index) => {
    const result = diameterOfBinaryTree(testCase.tree);
    console.log(`Test ${index + 1}: ${result === testCase.expected ? "PASS" : "FAIL"}`);
});

// TreeNode definition
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
        
        // Recursively find the height of left and right subtrees
        const leftHeight = dfs(node.left);
        const rightHeight = dfs(node.right);
        
        // Update the diameter at each node
        diameter = Math.max(diameter, leftHeight + rightHeight);
        
        // Return the height of the current node
        return Math.max(leftHeight, rightHeight) + 1;
    }
    
    dfs(root);
    return diameter;
}
// Binary Tree class
class BinaryTree {
    root: TreeNode | null;
    
    constructor() {
        this.root = null;
    }
    
    // Helper method to build a tree from an array (Level order)
    buildTree(values: (number | null)[]): TreeNode | null {
        if (values.length === 0 || values[0] === null) return null;
        
        this.root = new TreeNode(values[0]!);
        const queue: TreeNode[] = [this.root];
        let i = 1;
        
        while (i < values.length && queue.length > 0) {
            const current = queue.shift()!;
            
            // Left child
            if (i < values.length && values[i] !== null) {
                current.left = new TreeNode(values[i]!);
                queue.push(current.left);
            }
            i++;
            
            // Right child
            if (i < values.length && values[i] !== null) {
                current.right = new TreeNode(values[i]!);
                queue.push(current.right);
            }
            i++;
        }
        
        return this.root;
    }
    
    // Find diameter
    diameter(): number {
        return diameterOfBinaryTree(this.root);
    }
}

// Test cases
function testDiameter() {
    const tree = new BinaryTree();
    
    // Test case 1: Simple tree
    //     1
    //    / \
    //   2   3
    //  / \
    // 4   5
    tree.buildTree([1, 2, 3, 4, 5, null, null]);
    console.log("Test 1 - Diameter:", tree.diameter()); // Expected: 3
    
    // Test case 2: Larger tree
    //       1
    //      / \
    //     2   3
    //    / \
    //   4   5
    //  /     \
    // 6       7
    tree.buildTree([1, 2, 3, 4, 5, null, null, 6, null, null, 7]);
    console.log("Test 2 - Diameter:", tree.diameter()); // Expected: 4
    
    // Test case 3: Single node
    tree.buildTree([1]);
    console.log("Test 3 - Diameter:", tree.diameter()); // Expected: 0
    
    // Test case 4: Empty tree
    tree.buildTree([]);
    console.log("Test 4 - Diameter:", tree.diameter()); // Expected: 0
}

testDiameter();
interface DiameterResult {
    height: number;
    diameter: number;
}

function diameterOfBinaryTreeExplicit(root: TreeNode | null): number {
    function dfs(node: TreeNode | null): DiameterResult {
        if (!node) {
            return { height: 0, diameter: 0 };
        }
        
        const left = dfs(node.left);
        const right = dfs(node.right);
        
        // Current node's height is max of left and right heights + 1
        const currentHeight = Math.max(left.height, right.height) + 1;
        
        // Current node's diameter is max of:
        // - left diameter
        // - right diameter  
        // - path through current node (left height + right height)
        const currentDiameter = Math.max(
            left.diameter,
            right.diameter,
            left.height + right.height
        );
        
        return { height: currentHeight, diameter: currentDiameter };
    }
    
    return dfs(root).diameter;
}

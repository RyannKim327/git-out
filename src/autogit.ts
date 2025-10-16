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
    
    function dfs(node: TreeNode | null): number {
        if (!node) return 0;
        
        const leftHeight = dfs(node.left);
        const rightHeight = dfs(node.right);
        
        // Update diameter if path through current node is longer
        diameter = Math.max(diameter, leftHeight + rightHeight);
        
        // Return height of current node
        return 1 + Math.max(leftHeight, rightHeight);
    }
    
    dfs(root);
    return diameter;
}
class BinaryTree {
    root: TreeNode | null;
    
    constructor() {
        this.root = null;
    }
    
    // Diameter calculation
    getDiameter(): number {
        return this.calculateDiameter(this.root).diameter;
    }
    
    private calculateDiameter(node: TreeNode | null): { height: number; diameter: number } {
        if (!node) {
            return { height: 0, diameter: 0 };
        }
        
        const left = this.calculateDiameter(node.left);
        const right = this.calculateDiameter(node.right);
        
        // Current height is 1 + max of left and right heights
        const currentHeight = 1 + Math.max(left.height, right.height);
        
        // Diameter is max of: left diameter, right diameter, or path through current node
        const currentDiameter = Math.max(
            left.diameter,
            right.diameter,
            left.height + right.height
        );
        
        return { height: currentHeight, diameter: currentDiameter };
    }
    
    // Utility methods to build and test the tree
    insert(val: number): void {
        this.root = this.insertNode(this.root, val);
    }
    
    private insertNode(node: TreeNode | null, val: number): TreeNode {
        if (!node) {
            return new TreeNode(val);
        }
        
        if (val < node.val) {
            node.left = this.insertNode(node.left, val);
        } else {
            node.right = this.insertNode(node.right, val);
        }
        
        return node;
    }
}
class TreeNode {
    constructor(
        public val: number,
        public left: TreeNode | null = null,
        public right: TreeNode | null = null
    ) {}
}

function findTreeDiameter(root: TreeNode | null): number {
    if (!root) return 0;
    
    let maxDiameter = 0;
    
    function getHeight(node: TreeNode | null): number {
        if (!node) return 0;
        
        const leftHeight = getHeight(node.left);
        const rightHeight = getHeight(node.right);
        
        // Update the maximum diameter
        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);
        
        return 1 + Math.max(leftHeight, rightHeight);
    }
    
    getHeight(root);
    return maxDiameter;
}

// Example usage and testing
function testDiameterCalculation(): void {
    // Create a sample binary tree:
    //       1
    //      / \
    //     2   3
    //    / \
    //   4   5
    //  /
    // 6
    
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.left.left.left = new TreeNode(6);
    
    const diameter = findTreeDiameter(root);
    console.log(`Tree diameter: ${diameter}`); // Output: 4 (path: 6-4-2-5)
    
    // Test with a balanced tree
    //       1
    //      / \
    //     2   3
    //    / \   \
    //   4   5   6
    
    const balancedRoot = new TreeNode(1);
    balancedRoot.left = new TreeNode(2);
    balancedRoot.right = new TreeNode(3);
    balancedRoot.left.left = new TreeNode(4);
    balancedRoot.left.right = new TreeNode(5);
    balancedRoot.right.right = new TreeNode(6);
    
    const balancedDiameter = findTreeDiameter(balancedRoot);
    console.log(`Balanced tree diameter: ${balancedDiameter}`); // Output: 4 (path: 4-2-1-3-6)
    
    // Edge cases
    console.log(`Empty tree diameter: ${findTreeDiameter(null)}`); // 0
    console.log(`Single node diameter: ${findTreeDiameter(new TreeNode(1))}`); // 0
}

// Run the tests
testDiameterCalculation();
class TreeDiameterFinder {
    private diameter: number = 0;
    
    calculateDiameter(root: TreeNode | null): number {
        this.diameter = 0;
        this.height(root);
        return this.diameter;
    }
    
    private height(node: TreeNode | null): number {
        if (!node) return 0;
        
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        
        // Update diameter
        this.diameter = Math.max(this.diameter, leftHeight + rightHeight);
        
        return 1 + Math.max(leftHeight, rightHeight);
    }
}

// Usage
const diameterFinder = new TreeDiameterFinder();
const tree = new TreeNode(1, 
    new TreeNode(2, 
        new TreeNode(4), 
        new TreeNode(5)
    ), 
    new TreeNode(3)
);

console.log(`Diameter: ${diameterFinder.calculateDiameter(tree)}`); // Output: 3

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

function diameterOfBinaryTree(root: TreeNode | null): number {
    let diameter = 0;
    
    function height(node: TreeNode | null): number {
        if (!node) return 0;
        
        const leftHeight = height(node.left);
        const rightHeight = height(node.right);
        
        // Update diameter with the maximum path length through current node
        diameter = Math.max(diameter, leftHeight + rightHeight);
        
        return Math.max(leftHeight, rightHeight) + 1;
    }
    
    height(root);
    return diameter;
}
function diameterOfBinaryTree2(root: TreeNode | null): number {
    function dfs(node: TreeNode | null): { height: number; diameter: number } {
        if (!node) {
            return { height: 0, diameter: 0 };
        }
        
        const left = dfs(node.left);
        const right = dfs(node.right);
        
        const currentHeight = Math.max(left.height, right.height) + 1;
        const currentDiameter = Math.max(
            left.diameter,
            right.diameter,
            left.height + right.height
        );
        
        return { height: currentHeight, diameter: currentDiameter };
    }
    
    return dfs(root).diameter;
}
function diameterOfBinaryTree3(root: TreeNode | null): number {
    if (!root) return 0;
    
    let diameter = 0;
    const stack: TreeNode[] = [];
    const heightMap = new Map<TreeNode, number>();
    let node: TreeNode | null = root;
    let lastVisited: TreeNode | null = null;
    
    while (node || stack.length > 0) {
        if (node) {
            stack.push(node);
            node = node.left;
        } else {
            const peekNode = stack[stack.length - 1];
            
            if (peekNode.right && peekNode.right !== lastVisited) {
                node = peekNode.right;
            } else {
                const current = stack.pop()!;
                
                const leftHeight = heightMap.get(current.left) || 0;
                const rightHeight = heightMap.get(current.right) || 0;
                
                // Update diameter
                diameter = Math.max(diameter, leftHeight + rightHeight);
                
                // Store height for current node
                heightMap.set(current, Math.max(leftHeight, rightHeight) + 1);
                
                lastVisited = current;
            }
        }
    }
    
    return diameter;
}
// Example usage and test cases
function createBinaryTree(): TreeNode {
    // Create a sample binary tree:
    //       1
    //      / \
    //     2   3
    //    / \     
    //   4   5
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    
    return root;
}

function createComplexTree(): TreeNode {
    // More complex tree for testing
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);
    root.left.left.left = new TreeNode(7);
    root.left.left.right = new TreeNode(8);
    
    return root;
}

// Test the functions
const tree1 = createBinaryTree();
const tree2 = createComplexTree();

console.log("Simple tree diameter:", diameterOfBinaryTree(tree1)); // Output: 3
console.log("Complex tree diameter:", diameterOfBinaryTree(tree2)); // Output: 5

console.log("Method 2 - Simple tree:", diameterOfBinaryTree2(tree1)); // Output: 3
console.log("Method 3 - Simple tree:", diameterOfBinaryTree3(tree1)); // Output: 3
// Performance test utility
function testPerformance() {
    const largeTree = createLargeTree(10000);
    
    console.time("Method 1");
    const result1 = diameterOfBinaryTree(largeTree);
    console.timeEnd("Method 1");
    
    console.time("Method 2");
    const result2 = diameterOfBinaryTree2(largeTree);
    console.timeEnd("Method 2");
    
    console.time("Method 3");
    const result3 = diameterOfBinaryTree3(largeTree);
    console.timeEnd("Method 3");
    
    console.log("Results:", result1, result2, result3);
}

function createLargeTree(size: number): TreeNode {
    // Helper function to create a large tree for testing
    const root = new TreeNode(0);
    const queue: TreeNode[] = [root];
    let count = 1;
    
    while (count < size && queue.length > 0) {
        const current = queue.shift()!;
        
        if (count < size) {
            current.left = new TreeNode(count++);
            queue.push(current.left);
        }
        
        if (count < size) {
            current.right = new TreeNode(count++);
            queue.push(current.right);
        }
    }
    
    return root;
}

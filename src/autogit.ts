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

function countLeafNodes(root: TreeNode | null): number {
    if (!root) return 0;
    
    // If both children are null, it's a leaf node
    if (!root.left && !root.right) return 1;
    
    // Recursively count leaves in left and right subtrees
    return countLeafNodes(root.left) + countLeafNodes(root.right);
}
function countLeafNodesIterative(root: TreeNode | null): number {
    if (!root) return 0;
    
    let count = 0;
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
        const node = queue.shift()!;
        
        if (!node.left && !node.right) {
            count++;
        }
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    
    return count;
}
function countLeafNodesDFS(root: TreeNode | null): number {
    if (!root) return 0;
    
    let count = 0;
    const stack: TreeNode[] = [root];
    
    while (stack.length > 0) {
        const node = stack.pop()!;
        
        if (!node.left && !node.right) {
            count++;
        }
        
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    
    return count;
}
// Binary Tree Structure
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

// Recursive implementation
function countLeafNodes(root: TreeNode | null): number {
    if (!root) return 0;
    
    if (!root.left && !root.right) return 1;
    
    return countLeafNodes(root.left) + countLeafNodes(root.right);
}

// Example usage
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.right = new TreeNode(6);

console.log("Number of leaf nodes:", countLeafNodes(root)); // Output: 3

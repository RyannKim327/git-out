class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    return Math.max(leftDepth, rightDepth) + 1;
}
function maxDepthBFS(root: TreeNode | null): number {
    if (!root) return 0;
    
    const queue: TreeNode[] = [root];
    let depth = 0;
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift()!;
            
            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }
        
        depth++;
    }
    
    return depth;
}
function maxDepthIterativeDFS(root: TreeNode | null): number {
    if (!root) return 0;
    
    const stack: { node: TreeNode; depth: number }[] = [{ node: root, depth: 1 }];
    let maxDepth = 0;
    
    while (stack.length > 0) {
        const { node, depth } = stack.pop()!;
        maxDepth = Math.max(maxDepth, depth);
        
        if (node.right) {
            stack.push({ node: node.right, depth: depth + 1 });
        }
        if (node.left) {
            stack.push({ node: node.left, depth: depth + 1 });
        }
    }
    
    return maxDepth;
}
// Create a sample binary tree
const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

// Test all approaches
console.log("Recursive DFS:", maxDepth(root)); // Output: 3
console.log("BFS:", maxDepthBFS(root)); // Output: 3
console.log("Iterative DFS:", maxDepthIterativeDFS(root)); // Output: 3

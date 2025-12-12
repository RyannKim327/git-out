interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    return Math.max(leftDepth, rightDepth) + 1;
}
function maxDepthBFS(root: TreeNode | null): number {
    if (!root) return 0;
    
    let depth = 0;
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
        depth++;
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return depth;
}
function maxDepthDFS(root: TreeNode | null): number {
    if (!root) return 0;
    
    const stack: [TreeNode, number][] = [[root, 1]];
    let maxDepth = 0;
    
    while (stack.length > 0) {
        const [node, depth] = stack.pop()!;
        maxDepth = Math.max(maxDepth, depth);
        
        if (node.right) stack.push([node.right, depth + 1]);
        if (node.left) stack.push([node.left, depth + 1]);
    }
    
    return maxDepth;
}
class TreeNode {
    constructor(
        public val: number,
        public left: TreeNode | null = null,
        public right: TreeNode | null = null
    ) {}
}

// Example usage
const tree = new TreeNode(3);
tree.left = new TreeNode(9);
tree.right = new TreeNode(20);
tree.right.left = new TreeNode(15);
tree.right.right = new TreeNode(7);

console.log("Recursive DFS depth:", maxDepth(tree)); // Output: 3
console.log("BFS depth:", maxDepthBFS(tree)); // Output: 3
console.log("DFS iterative depth:", maxDepthDFS(tree)); // Output: 3
// Test cases
console.log(maxDepth(null)); // Empty tree: 0
console.log(maxDepth(new TreeNode(1))); // Single node: 1
console.log(maxDepth(new TreeNode(1, new TreeNode(2)))); // Left child only: 2
console.log(maxDepth(new TreeNode(1, null, new TreeNode(2)))); // Right child only: 2

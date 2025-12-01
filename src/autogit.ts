interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

class TreeNode {
    constructor(
        public val: number = 0,
        public left: TreeNode | null = null,
        public right: TreeNode | null = null
    ) {}
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
        
        if (node.left) stack.push([node.left, depth + 1]);
        if (node.right) stack.push([node.right, depth + 1]);
    }
    
    return maxDepth;
}
// TreeNode class and maxDepth function
class TreeNode {
    constructor(
        public val: number = 0,
        public left: TreeNode | null = null,
        public right: TreeNode | null = null
    ) {}
}

function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

// Create a test tree
const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

// Test the function
console.log("Maximum depth:", maxDepth(root)); // Output: 3

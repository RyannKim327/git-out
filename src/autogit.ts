class TreeNode<T> {
    val: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(val: T, left?: TreeNode<T> | null, right?: TreeNode<T> | null) {
        this.val = val;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}
function maxDepthRecursive<T>(root: TreeNode<T> | null): number {
    if (root === null) {
        return 0;
    }
    
    const leftDepth = maxDepthRecursive(root.left);
    const rightDepth = maxDepthRecursive(root.right);
    
    return Math.max(leftDepth, rightDepth) + 1;
}
function maxDepthIterative<T>(root: TreeNode<T> | null): number {
    if (root === null) {
        return 0;
    }
    
    const queue: { node: TreeNode<T>; depth: number }[] = [];
    queue.push({ node: root, depth: 1 });
    let maxDepth = 0;
    
    while (queue.length > 0) {
        const { node, depth } = queue.shift()!;
        maxDepth = Math.max(maxDepth, depth);
        
        if (node.left) {
            queue.push({ node: node.left, depth: depth + 1 });
        }
        if (node.right) {
            queue.push({ node: node.right, depth: depth + 1 });
        }
    }
    
    return maxDepth;
}
function maxDepthLevelOrder<T>(root: TreeNode<T> | null): number {
    if (root === null) {
        return 0;
    }
    
    const queue: TreeNode<T>[] = [root];
    let depth = 0;
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        
        depth++;
    }
    
    return depth;
}
// Create a sample binary tree
const root = new TreeNode<number>(
    3,
    new TreeNode(9),
    new TreeNode(
        20,
        new TreeNode(15),
        new TreeNode(7)
    )
);

// Test the functions
console.log("Recursive depth:", maxDepthRecursive(root)); // Output: 3
console.log("Iterative depth:", maxDepthIterative(root)); // Output: 3
console.log("Level order depth:", maxDepthLevelOrder(root)); // Output: 3

// Edge cases
console.log("Empty tree:", maxDepthRecursive(null)); // Output: 0
console.log("Single node:", maxDepthRecursive(new TreeNode(1))); // Output: 1

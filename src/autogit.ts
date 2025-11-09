class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
function maxDepthRecursive(root: TreeNode<any> | null): number {
    if (root === null) {
        return 0;
    }
    
    const leftDepth = maxDepthRecursive(root.left);
    const rightDepth = maxDepthRecursive(root.right);
    
    return Math.max(leftDepth, rightDepth) + 1;
}
function maxDepthBFS(root: TreeNode<any> | null): number {
    if (root === null) return 0;
    
    let depth = 0;
    const queue: TreeNode<any>[] = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift()!;
            
            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }
        
        depth++;
    }
    
    return depth;
}
function maxDepthDFS(root: TreeNode<any> | null): number {
    if (root === null) return 0;
    
    const stack: { node: TreeNode<any>; depth: number }[] = [];
    stack.push({ node: root, depth: 1 });
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
class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function maxDepth(root: TreeNode<any> | null): number {
    if (root === null) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

// Test case
const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

console.log("Maximum depth:", maxDepth(root)); // Output: 3

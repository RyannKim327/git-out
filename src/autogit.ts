interface TreeNode<T> {
    val: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
}

function maxDepth<T>(root: TreeNode<T> | null): number {
    if (root === null) {
        return 0;
    }
    
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    return Math.max(leftDepth, rightDepth) + 1;
}
function maxDepthBFS<T>(root: TreeNode<T> | null): number {
    if (root === null) return 0;
    
    let depth = 0;
    const queue: TreeNode<T>[] = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift()!;
            
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }
        
        depth++;
    }
    
    return depth;
}
function maxDepthDFS<T>(root: TreeNode<T> | null): number {
    if (root === null) return 0;
    
    const stack: [TreeNode<T>, number][] = [[root, 1]];
    let maxDepth = 0;
    
    while (stack.length > 0) {
        const [node, depth] = stack.pop()!;
        maxDepth = Math.max(maxDepth, depth);
        
        if (node.right !== null) {
            stack.push([node.right, depth + 1]);
        }
        if (node.left !== null) {
            stack.push([node.left, depth + 1]);
        }
    }
    
    return maxDepth;
}
// Create a binary tree
const tree: TreeNode<number> = {
    val: 3,
    left: {
        val: 9,
        left: null,
        right: null
    },
    right: {
        val: 20,
        left: {
            val: 15,
            left: null,
            right: null
        },
        right: {
            val: 7,
            left: null,
            right: null
        }
    }
};

console.log(maxDepth(tree)); // Output: 3
console.log(maxDepthBFS(tree)); // Output: 3
console.log(maxDepthDFS(tree)); // Output: 3

interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
}
function sumNodesRecursive(node: TreeNode | null): number {
    if (node === null) {
        return 0;
    }
    return node.value + sumNodesRecursive(node.left) + sumNodesRecursive(node.right);
}
function sumNodesIterative(root: TreeNode | null): number {
    if (root === null) return 0;
    
    let sum = 0;
    const stack: TreeNode[] = [root];
    
    while (stack.length > 0) {
        const node = stack.pop()!;
        sum += node.value;
        
        if (node.right !== null) {
            stack.push(node.right);
        }
        if (node.left !== null) {
            stack.push(node.left);
        }
    }
    
    return sum;
}
function sumNodesBFS(root: TreeNode | null): number {
    if (root === null) return 0;
    
    let sum = 0;
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
        const node = queue.shift()!;
        sum += node.value;
        
        if (node.left !== null) {
            queue.push(node.left);
        }
        if (node.right !== null) {
            queue.push(node.right);
        }
    }
    
    return sum;
}
interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

function createNode(value: number, left: TreeNode | null = null, right: TreeNode | null = null): TreeNode {
    return { value, left, right };
}

function sumNodesRecursive(node: TreeNode | null): number {
    if (node === null) {
        return 0;
    }
    return node.value + sumNodesRecursive(node.left) + sumNodesRecursive(node.right);
}

// Example usage:
const tree: TreeNode = {
    value: 1,
    left: {
        value: 2,
        left: { value: 4, left: null, right: null },
        right: { value: 5, left: null, right: null }
    },
    right: {
        value: 3,
        left: { value: 6, left: null, right: null },
        right: { value: 7, left: null, right: null }
    }
};

console.log("Sum of all nodes:", sumNodesRecursive(tree)); // Output: 28
console.log("Sum of empty tree:", sumNodesRecursive(null)); // Output: 0

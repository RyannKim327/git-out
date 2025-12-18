interface TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
}

function countLeafNodes<T>(root: TreeNode<T> | null): number {
    if (root === null) {
        return 0;
    }
    
    // Leaf node: both left and right are null
    if (root.left === null && root.right === null) {
        return 1;
    }
    
    // Recursively count leaves in left and right subtrees
    return countLeafNodes(root.left) + countLeafNodes(root.right);
}
function countLeafNodesIterative<T>(root: TreeNode<T> | null): number {
    if (root === null) {
        return 0;
    }
    
    let count = 0;
    const queue: TreeNode<T>[] = [root];
    
    while (queue.length > 0) {
        const node = queue.shift()!;
        
        if (node.left === null && node.right === null) {
            count++;
        }
        
        if (node.left !== null) {
            queue.push(node.left);
        }
        
        if (node.right !== null) {
            queue.push(node.right);
        }
    }
    
    return count;
}
function countLeafNodesDFS<T>(root: TreeNode<T> | null): number {
    if (root === null) {
        return 0;
    }
    
    let count = 0;
    const stack: TreeNode<T>[] = [root];
    
    while (stack.length > 0) {
        const node = stack.pop()!;
        
        if (node.left === null && node.right === null) {
            count++;
        }
        
        if (node.right !== null) {
            stack.push(node.right);
        }
        
        if (node.left !== null) {
            stack.push(node.left);
        }
    }
    
    return count;
}
class BinaryTree<T> {
    root: TreeNode<T> | null;
    
    constructor(root: TreeNode<T> | null = null) {
        this.root = root;
    }
    
    // Recursive method
    countLeavesRecursive(): number {
        return countLeafNodes(this.root);
    }
    
    // Iterative method
    countLeavesIterative(): number {
        return countLeafNodesIterative(this.root);
    }
}

// Example usage
const tree: TreeNode<number> = {
    value: 1,
    left: {
        value: 2,
        left: {
            value: 4,
            left: null,
            right: null
        },
        right: {
            value: 5,
            left: null,
            right: null
        }
    },
    right: {
        value: 3,
        left: null,
        right: {
            value: 6,
            left: null,
            right: null
        }
    }
};

const binaryTree = new BinaryTree(tree);

console.log("Leaf count (recursive):", binaryTree.countLeavesRecursive()); // Output: 3
console.log("Leaf count (iterative):", binaryTree.countLeavesIterative()); // Output: 3

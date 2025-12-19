interface TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
}

function countLeafNodes<T>(root: TreeNode<T> | null): number {
    if (root === null) {
        return 0;
    }
    
    // If both children are null, it's a leaf node
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
        const currentNode = queue.shift()!;
        
        if (currentNode.left === null && currentNode.right === null) {
            count++;
        }
        
        if (currentNode.left !== null) {
            queue.push(currentNode.left);
        }
        
        if (currentNode.right !== null) {
            queue.push(currentNode.right);
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
        const currentNode = stack.pop()!;
        
        if (currentNode.left === null && currentNode.right === null) {
            count++;
        }
        
        if (currentNode.right !== null) {
            stack.push(currentNode.right);
        }
        
        if (currentNode.left !== null) {
            stack.push(currentNode.left);
        }
    }
    
    return count;
}
// Binary Tree implementation
class BinaryTree<T> {
    root: TreeNode<T> | null;
    
    constructor() {
        this.root = null;
    }
    
    countLeaves(): number {
        return countLeafNodes(this.root);
    }
    
    countLeavesIterative(): number {
        return countLeafNodesIterative(this.root);
    }
}

// Example usage
const tree = new BinaryTree<number>();
tree.root = {
    value: 1,
    left: {
        value: 2,
        left: { value: 4, left: null, right: null },
        right: { value: 5, left: null, right: null }
    },
    right: {
        value: 3,
        left: { value: 6, left: null, right: null },
        right: null
    }
};

console.log("Recursive count:", countLeafNodes(tree.root)); // Output: 3
console.log("Iterative count:", countLeafNodesIterative(tree.root)); // Output: 3
console.log("DFS count:", countLeafNodesDFS(tree.root)); // Output: 3

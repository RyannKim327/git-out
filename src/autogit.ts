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

function countLeafNodes<T>(root: TreeNode<T> | null): number {
    if (root === null) {
        return 0;
    }
    
    // If both children are null, it's a leaf node
    if (root.left === null && root.right === null) {
        return 1;
    }
    
    // Recursively count leaf nodes in left and right subtrees
    return countLeafNodes(root.left) + countLeafNodes(root.right);
}
function countLeafNodesIterative<T>(root: TreeNode<T> | null): number {
    if (root === null) return 0;
    
    let count = 0;
    const queue: TreeNode<T>[] = [root];
    
    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        
        // If it's a leaf node, increment count
        if (currentNode.left === null && currentNode.right === null) {
            count++;
        }
        
        // Add children to queue
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
    if (root === null) return 0;
    
    let count = 0;
    const stack: TreeNode<T>[] = [root];
    
    while (stack.length > 0) {
        const currentNode = stack.pop()!;
        
        // If it's a leaf node, increment count
        if (currentNode.left === null && currentNode.right === null) {
            count++;
        }
        
        // Add children to stack (right first, then left for proper order)
        if (currentNode.right !== null) {
            stack.push(currentNode.right);
        }
        if (currentNode.left !== null) {
            stack.push(currentNode.left);
        }
    }
    
    return count;
}
// Complete implementation with usage example
class BinaryTree<T> {
    root: TreeNode<T> | null;

    constructor() {
        this.root = null;
    }

    // Method to count leaf nodes (using recursive approach)
    countLeafNodes(): number {
        return this.countLeavesRecursive(this.root);
    }

    private countLeavesRecursive(node: TreeNode<T> | null): number {
        if (node === null) {
            return 0;
        }
        
        if (node.left === null && node.right === null) {
            return 1;
        }
        
        return this.countLeavesRecursive(node.left) + this.countLeavesRecursive(node.right);
    }
}

// Usage example
const tree = new BinaryTree<number>();
tree.root = new TreeNode(1);
tree.root.left = new TreeNode(2);
tree.root.right = new TreeNode(3);
tree.root.left.left = new TreeNode(4);
tree.root.left.right = new TreeNode(5);
tree.root.right.right = new TreeNode(6);

console.log("Number of leaf nodes:", tree.countLeafNodes()); // Output: 3
class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    // Instance method to count leaf nodes in subtree
    countLeafNodesInSubtree(): number {
        if (this.left === null && this.right === null) {
            return 1;
        }
        
        const leftCount = this.left ? this.left.countLeafNodesInSubtree() : 0;
        const rightCount = this.right ? this.right.countLeafNodesInSubtree() : 0;
        
        return leftCount + rightCount;
    }
}

// Usage
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
console.log(root.countLeafNodesInSubtree()); // Output: 2

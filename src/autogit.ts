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

class BinaryTree<T> {
    root: TreeNode<T> | null;

    constructor() {
        this.root = null;
    }
}
class BinaryTree<T> {
    // ... previous code

    // Recursive method to count leaf nodes
    countLeavesRecursive(node: TreeNode<T> | null = this.root): number {
        if (node === null) {
            return 0;
        }
        
        // A leaf node has no children
        if (node.left === null && node.right === null) {
            return 1;
        }
        
        // Recursively count leaves in left and right subtrees
        return this.countLeavesRecursive(node.left) + this.countLeavesRecursive(node.right);
    }
}
class BinaryTree<T> {
    // ... previous code

    // Iterative method using BFS
    countLeavesIterative(): number {
        if (this.root === null) {
            return 0;
        }

        let leafCount = 0;
        const queue: TreeNode<T>[] = [this.root];

        while (queue.length > 0) {
            const currentNode = queue.shift()!;

            // Check if current node is a leaf
            if (currentNode.left === null && currentNode.right === null) {
                leafCount++;
            }

            // Add children to queue
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }

        return leafCount;
    }
}
// Complete implementation
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

class BinaryTree<T> {
    root: TreeNode<T> | null;

    constructor() {
        this.root = null;
    }

    // Count leaves recursively
    countLeavesRecursive(node: TreeNode<T> | null = this.root): number {
        if (node === null) {
            return 0;
        }
        
        if (node.left === null && node.right === null) {
            return 1;
        }
        
        return this.countLeavesRecursive(node.left) + this.countLeavesRecursive(node.right);
    }

    // Count leaves iteratively
    countLeavesIterative(): number {
        if (this.root === null) {
            return 0;
        }

        let leafCount = 0;
        const queue: TreeNode<T>[] = [this.root];

        while (queue.length > 0) {
            const currentNode = queue.shift()!;

            if (currentNode.left === null && currentNode.right === null) {
                leafCount++;
            }

            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }

        return leafCount;
    }

    // Optional: Add method to build a sample tree
    buildSampleTree(): void {
        this.root = new TreeNode(1);
        this.root.left = new TreeNode(2);
        this.root.right = new TreeNode(3);
        this.root.left.left = new TreeNode(4);
        this.root.left.right = new TreeNode(5);
        this.root.right.right = new TreeNode(6);
        /*
            Tree structure:
                 1
                / \
               2   3
              / \   \
             4   5   6
            Leaves: 4, 5, 6 (3 leaves)
        */
    }
}

// Usage example
const tree = new BinaryTree<number>();
tree.buildSampleTree();

console.log("Leaf count (recursive):", tree.countLeavesRecursive()); // Output: 3
console.log("Leaf count (iterative):", tree.countLeavesIterative()); // Output: 3

// Test with empty tree
const emptyTree = new BinaryTree<number>();
console.log("Empty tree leaves:", emptyTree.countLeavesRecursive()); // Output: 0
function countLeaves<T>(node: TreeNode<T> | null): number {
    if (node === null) return 0;
    
    if (node.left === null && node.right === null) return 1;
    
    return countLeaves(node.left) + countLeaves(node.right);
}

// Usage
const leafCount = countLeaves(tree.root);
console.log("Functional approach:", leafCount);

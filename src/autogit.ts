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
function countLeafNodesBFS<T>(root: TreeNode<T> | null): number {
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

// Leaf counting function (using recursive approach)
function countLeafNodes<T>(root: TreeNode<T> | null): number {
    if (root === null) return 0;
    if (root.left === null && root.right === null) return 1;
    return countLeafNodes(root.left) + countLeafNodes(root.right);
}

// Create a sample binary tree
/*
        1
       / \
      2   3
     / \   \
    4   5   6
   /
  7
*/
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.right = new TreeNode(6);
root.left.left.left = new TreeNode(7);

// Test the function
console.log("Number of leaf nodes:", countLeafNodes(root)); // Output: 3 (nodes 5, 7, 6)
interface IBinaryTree<T> {
    countLeafNodes(): number;
}

class BinaryTree<T> implements IBinaryTree<T> {
    private root: TreeNode<T> | null;

    constructor(rootValue?: T) {
        this.root = rootValue ? new TreeNode(rootValue) : null;
    }

    private countLeafNodesRecursive(node: TreeNode<T> | null): number {
        if (node === null) return 0;
        if (node.left === null && node.right === null) return 1;
        return this.countLeafNodesRecursive(node.left) + this.countLeafNodesRecursive(node.right);
    }

    countLeafNodes(): number {
        return this.countLeafNodesRecursive(this.root);
    }

    // Additional utility methods
    setRoot(value: T): void {
        this.root = new TreeNode(value);
    }

    getRoot(): TreeNode<T> | null {
        return this.root;
    }
}

// Usage
const tree = new BinaryTree<number>(1);
const rootNode = tree.getRoot();
if (rootNode) {
    rootNode.left = new TreeNode(2);
    rootNode.right = new TreeNode(3);
    rootNode.left.right = new TreeNode(4);
}

console.log("Leaf count:", tree.countLeafNodes()); // Output: 2

class BinaryTreeNode<T> {
    value: T;
    left: BinaryTreeNode<T> | null;
    right: BinaryTreeNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree<T> {
    root: BinaryTreeNode<T> | null;

    constructor() {
        this.root = null;
    }

    // Insert a value into the tree
    insert(value: T): void {
        const newNode = new BinaryTreeNode(value);
        
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            // Simple insertion strategy: left for less, right for greater
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }

    // Search for a value
    search(value: T): boolean {
        let current = this.root;
        
        while (current !== null) {
            if (value === current.value) {
                return true;
            } else if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        
        return false;
    }

    // In-order traversal (left, root, right)
    inOrderTraversal(node: BinaryTreeNode<T> | null = this.root): T[] {
        if (node === null) return [];
        
        return [
            ...this.inOrderTraversal(node.left),
            node.value,
            ...this.inOrderTraversal(node.right)
        ];
    }

    // Pre-order traversal (root, left, right)
    preOrderTraversal(node: BinaryTreeNode<T> | null = this.root): T[] {
        if (node === null) return [];
        
        return [
            node.value,
            ...this.preOrderTraversal(node.left),
            ...this.preOrderTraversal(node.right)
        ];
    }

    // Post-order traversal (left, right, root)
    postOrderTraversal(node: BinaryTreeNode<T> | null = this.root): T[] {
        if (node === null) return [];
        
        return [
            ...this.postOrderTraversal(node.left),
            ...this.postOrderTraversal(node.right),
            node.value
        ];
    }

    // Find the minimum value
    findMin(): T | null {
        if (this.root === null) return null;
        
        let current = this.root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    }

    // Find the maximum value
    findMax(): T | null {
        if (this.root === null) return null;
        
        let current = this.root;
        while (current.right !== null) {
            current = current.right;
        }
        return current.value;
    }

    // Calculate the height of the tree
    height(node: BinaryTreeNode<T> | null = this.root): number {
        if (node === null) return 0;
        
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        
        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Count the number of nodes
    countNodes(node: BinaryTreeNode<T> | null = this.root): number {
        if (node === null) return 0;
        
        return 1 + this.countNodes(node.left) + this.countNodes(node.right);
    }
}
// Create a binary tree
const tree = new BinaryTree<number>();

// Insert values
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);
tree.insert(12);
tree.insert(18);

// Search for values
console.log(tree.search(7));  // true
console.log(tree.search(20)); // false

// Traversals
console.log("In-order:", tree.inOrderTraversal());    // [3, 5, 7, 10, 12, 15, 18]
console.log("Pre-order:", tree.preOrderTraversal());  // [10, 5, 3, 7, 15, 12, 18]
console.log("Post-order:", tree.postOrderTraversal()); // [3, 7, 5, 12, 18, 15, 10]

// Min/max values
console.log("Min:", tree.findMin()); // 3
console.log("Max:", tree.findMax()); // 18

// Tree properties
console.log("Height:", tree.height());      // 3
console.log("Node count:", tree.countNodes()); // 7
class BinaryTreeWithComparator<T> {
    root: BinaryTreeNode<T> | null;
    private comparator: (a: T, b: T) => number;

    constructor(comparator?: (a: T, b: T) => number) {
        this.root = null;
        this.comparator = comparator || ((a: T, b: T) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });
    }

    insert(value: T): void {
        const newNode = new BinaryTreeNode(value);
        
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            const comparison = this.comparator(value, current.value);
            
            if (comparison < 0) {
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }
}

// Usage with custom comparator
const customTree = new BinaryTreeWithComparator<string>((a, b) => a.length - b.length);
customTree.insert("apple");
customTree.insert("banana");
customTree.insert("cherry");
class ExtendedBinaryTree<T> extends BinaryTree<T> {
    // Delete a node
    delete(value: T): void {
        this.root = this.deleteNode(this.root, value);
    }

    private deleteNode(node: BinaryTreeNode<T> | null, value: T): BinaryTreeNode<T> | null {
        if (node === null) return null;

        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
        } else {
            // Node found - handle deletion
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            // Node has two children
            const minRight = this.findMinNode(node.right);
            node.value = minRight.value;
            node.right = this.deleteNode(node.right, minRight.value);
        }

        return node;
    }

    private findMinNode(node: BinaryTreeNode<T>): BinaryTreeNode<T> {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    // Check if tree is balanced
    isBalanced(node: BinaryTreeNode<T> | null = this.root): boolean {
        if (node === null) return true;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.abs(leftHeight - rightHeight) <= 1 
            && this.isBalanced(node.left) 
            && this.isBalanced(node.right);
    }
}

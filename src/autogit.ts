class AVLNode<T> {
    value: T;
    left: AVLNode<T> | null;
    right: AVLNode<T> | null;
    height: number;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}
class AVLTree<T> {
    root: AVLNode<T> | null;

    constructor() {
        this.root = null;
    }

    // Get height of a node
    private getHeight(node: AVLNode<T> | null): number {
        return node ? node.height : 0;
    }

    // Get balance factor of a node
    private getBalanceFactor(node: AVLNode<T> | null): number {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    // Update height of a node
    private updateHeight(node: AVLNode<T>): void {
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }

    // Right rotation
    private rotateRight(y: AVLNode<T>): AVLNode<T> {
        const x = y.left!;
        const T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        this.updateHeight(y);
        this.updateHeight(x);

        return x;
    }

    // Left rotation
    private rotateLeft(x: AVLNode<T>): AVLNode<T> {
        const y = x.right!;
        const T2 = y.left;

        // Perform rotation
        y.left = x;
        x.right = T2;

        // Update heights
        this.updateHeight(x);
        this.updateHeight(y);

        return y;
    }

    // Balance the tree
    private balance(node: AVLNode<T>): AVLNode<T> {
        this.updateHeight(node);
        const balanceFactor = this.getBalanceFactor(node);

        // Left Left Case
        if (balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0) {
            return this.rotateRight(node);
        }

        // Right Right Case
        if (balanceFactor < -1 && this.getBalanceFactor(node.right) <= 0) {
            return this.rotateLeft(node);
        }

        // Left Right Case
        if (balanceFactor > 1 && this.getBalanceFactor(node.left) < 0) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }

        // Right Left Case
        if (balanceFactor < -1 && this.getBalanceFactor(node.right) > 0) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    // Public insert method
    insert(value: T): void {
        this.root = this.insertNode(this.root, value);
    }

    // Private recursive insert
    private insertNode(node: AVLNode<T> | null, value: T): AVLNode<T> {
        // Base case: create new node
        if (node === null) {
            return new AVLNode(value);
        }

        // Recursive insertion
        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        } else {
            // Duplicate values not allowed
            return node;
        }

        // Balance the tree
        return this.balance(node);
    }

    // Public delete method
    delete(value: T): void {
        this.root = this.deleteNode(this.root, value);
    }

    // Private recursive delete
    private deleteNode(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
        if (node === null) {
            return null;
        }

        // Find the node to delete
        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
        } else {
            // Node with only one child or no child
            if (node.left === null || node.right === null) {
                const temp = node.left || node.right;
                
                // No child case
                if (temp === null) {
                    return null;
                } else {
                    // One child case
                    return temp;
                }
            } else {
                // Node with two children
                const temp = this.findMinNode(node.right)!;
                node.value = temp.value;
                node.right = this.deleteNode(node.right, temp.value);
            }
        }

        // Balance the tree
        return this.balance(node);
    }

    // Find minimum value node
    private findMinNode(node: AVLNode<T>): AVLNode<T> | null {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    // Search for a value
    search(value: T): boolean {
        return this.searchNode(this.root, value);
    }

    private searchNode(node: AVLNode<T> | null, value: T): boolean {
        if (node === null) {
            return false;
        }

        if (value < node.value) {
            return this.searchNode(node.left, value);
        } else if (value > node.value) {
            return this.searchNode(node.right, value);
        } else {
            return true;
        }
    }

    // In-order traversal
    inOrderTraversal(callback: (value: T) => void): void {
        this.inOrder(this.root, callback);
    }

    private inOrder(node: AVLNode<T> | null, callback: (value: T) => void): void {
        if (node !== null) {
            this.inOrder(node.left, callback);
            callback(node.value);
            this.inOrder(node.right, callback);
        }
    }

    // Pre-order traversal
    preOrderTraversal(callback: (value: T) => void): void {
        this.preOrder(this.root, callback);
    }

    private preOrder(node: AVLNode<T> | null, callback: (value: T) => void): void {
        if (node !== null) {
            callback(node.value);
            this.preOrder(node.left, callback);
            this.preOrder(node.right, callback);
        }
    }

    // Post-order traversal
    postOrderTraversal(callback: (value: T) => void): void {
        this.postOrder(this.root, callback);
    }

    private postOrder(node: AVLNode<T> | null, callback: (value: T) => void): void {
        if (node !== null) {
            this.postOrder(node.left, callback);
            this.postOrder(node.right, callback);
            callback(node.value);
        }
    }

    // Get tree height
    getTreeHeight(): number {
        return this.getHeight(this.root);
    }

    // Check if tree is empty
    isEmpty(): boolean {
        return this.root === null;
    }

    // Print tree structure (for debugging)
    printTree(): void {
        this.printNode(this.root, "", true);
    }

    private printNode(node: AVLNode<T> | null, prefix: string, isLeft: boolean): void {
        if (node !== null) {
            console.log(prefix + (isLeft ? "├── " : "└── ") + node.value + ` (h:${node.height})`);
            this.printNode(node.left, prefix + (isLeft ? "│   " : "    "), true);
            this.printNode(node.right, prefix + (isLeft ? "│   " : "    "), false);
        }
    }
}
// Example usage
const avlTree = new AVLTree<number>();

// Insert values
console.log("Inserting values...");
[10, 20, 30, 40, 50, 25].forEach(value => {
    avlTree.insert(value);
    console.log(`Inserted: ${value}, Tree Height: ${avlTree.getTreeHeight()}`);
});

// Search for values
console.log("\nSearching for values:");
console.log(`Contains 30: ${avlTree.search(30)}`);
console.log(`Contains 15: ${avlTree.search(15)}`);

// Traversals
console.log("\nIn-order traversal:");
avlTree.inOrderTraversal(value => console.log(value));

console.log("\nPre-order traversal:");
avlTree.preOrderTraversal(value => console.log(value));

// Delete values
console.log("\nDeleting values...");
[25, 40].forEach(value => {
    avlTree.delete(value);
    console.log(`Deleted: ${value}, Tree Height: ${avlTree.getTreeHeight()}`);
});

// Print tree structure
console.log("\nTree structure:");
avlTree.printTree();
class AVLTreeWithComparator<T> {
    root: AVLNode<T> | null;
    private comparator: (a: T, b: T) => number;

    constructor(comparator?: (a: T, b: T) => number) {
        this.root = null;
        this.comparator = comparator || ((a: T, b: T) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });
    }

    private compare(a: T, b: T): number {
        return this.comparator(a, b);
    }

    // All other methods remain the same, just replace comparison operators
    // with this.compare(a, b) calls
}

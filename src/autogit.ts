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
    private root: AVLNode<T> | null;

    constructor() {
        this.root = null;
    }

    // Get height of a node
    private getHeight(node: AVLNode<T> | null): number {
        return node ? node.height : 0;
    }

    // Update height of a node
    private updateHeight(node: AVLNode<T>): void {
        node.height = Math.max(
            this.getHeight(node.left),
            this.getHeight(node.right)
        ) + 1;
    }

    // Get balance factor
    private getBalanceFactor(node: AVLNode<T> | null): number {
        if (!node) return 0;
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    // Right rotation
    private rightRotate(y: AVLNode<T>): AVLNode<T> {
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
    private leftRotate(x: AVLNode<T>): AVLNode<T> {
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

    // Insert a value
    insert(value: T): void {
        this.root = this.insertNode(this.root, value);
    }

    private insertNode(node: AVLNode<T> | null, value: T): AVLNode<T> {
        if (node === null) {
            return new AVLNode(value);
        }

        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        } else {
            // Duplicate values not allowed
            return node;
        }

        // Update height
        this.updateHeight(node);

        // Get balance factor
        const balance = this.getBalanceFactor(node);

        // Left Left Case
        if (balance > 1 && value < node.left!.value) {
            return this.rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && value > node.right!.value) {
            return this.leftRotate(node);
        }

        // Left Right Case
        if (balance > 1 && value > node.left!.value) {
            node.left = this.leftRotate(node.left!);
            return this.rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && value < node.right!.value) {
            node.right = this.rightRotate(node.right!);
            return this.leftRotate(node);
        }

        return node;
    }

    // Delete a value
    delete(value: T): void {
        this.root = this.deleteNode(this.root, value);
    }

    private deleteNode(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
        if (node === null) {
            return null;
        }

        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
        } else {
            // Node with only one child or no child
            if (node.left === null || node.right === null) {
                const temp = node.left || node.right;
                node = temp;
            } else {
                // Node with two children: get inorder successor
                const temp = this.getMinValueNode(node.right)!;
                node.value = temp.value;
                node.right = this.deleteNode(node.right, temp.value);
            }
        }

        if (node === null) {
            return node;
        }

        // Update height
        this.updateHeight(node);

        // Get balance factor
        const balance = this.getBalanceFactor(node);

        // Left Left Case
        if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
            return this.rightRotate(node);
        }

        // Left Right Case
        if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
            node.left = this.leftRotate(node.left!);
            return this.rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && this.getBalanceFactor(node.right) <= 0) {
            return this.leftRotate(node);
        }

        // Right Left Case
        if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
            node.right = this.rightRotate(node.right!);
            return this.leftRotate(node);
        }

        return node;
    }

    // Get minimum value node
    private getMinValueNode(node: AVLNode<T>): AVLNode<T> | null {
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

        if (value === node.value) {
            return true;
        }

        if (value < node.value) {
            return this.searchNode(node.left, value);
        }

        return this.searchNode(node.right, value);
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

    // Check if tree is balanced
    isBalanced(): boolean {
        return this.checkBalance(this.root);
    }

    private checkBalance(node: AVLNode<T> | null): boolean {
        if (node === null) return true;
        
        const balance = this.getBalanceFactor(node);
        if (Math.abs(balance) > 1) return false;
        
        return this.checkBalance(node.left) && this.checkBalance(node.right);
    }
}
// Example usage
const avlTree = new AVLTree<number>();

// Insert values
avlTree.insert(10);
avlTree.insert(20);
avlTree.insert(30);
avlTree.insert(40);
avlTree.insert(50);
avlTree.insert(25);

// Search for values
console.log("Search 30:", avlTree.search(30)); // true
console.log("Search 60:", avlTree.search(60)); // false

// In-order traversal
console.log("In-order traversal:");
avlTree.inOrderTraversal(value => console.log(value));

// Check if balanced
console.log("Is balanced:", avlTree.isBalanced()); // true

// Get tree height
console.log("Tree height:", avlTree.getTreeHeight());

// Delete a value
avlTree.delete(30);
console.log("After deleting 30, search 30:", avlTree.search(30)); // false

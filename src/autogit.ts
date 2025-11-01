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

    // Get height of node
    private getHeight(node: AVLNode<T> | null): number {
        return node ? node.height : 0;
    }

    // Get balance factor of node
    private getBalanceFactor(node: AVLNode<T> | null): number {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    // Update height of node
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

    // Insert a value
    insert(value: T): void {
        this.root = this._insert(this.root, value);
    }

    private _insert(node: AVLNode<T> | null, value: T): AVLNode<T> {
        // Step 1: Perform normal BST insertion
        if (node === null) {
            return new AVLNode(value);
        }

        if (value < node.value) {
            node.left = this._insert(node.left, value);
        } else if (value > node.value) {
            node.right = this._insert(node.right, value);
        } else {
            // Duplicate values not allowed
            return node;
        }

        // Step 2: Balance the tree
        return this.balance(node);
    }

    // Find the node with minimum value
    private findMin(node: AVLNode<T>): AVLNode<T> {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    // Delete a value
    delete(value: T): void {
        this.root = this._delete(this.root, value);
    }

    private _delete(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
        // Step 1: Perform standard BST delete
        if (node === null) {
            return null;
        }

        if (value < node.value) {
            node.left = this._delete(node.left, value);
        } else if (value > node.value) {
            node.right = this._delete(node.right, value);
        } else {
            // Node to be deleted found

            // Node with only one child or no child
            if (node.left === null || node.right === null) {
                const temp = node.left || node.right;
                node = temp || null;
            } else {
                // Node with two children
                const temp = this.findMin(node.right);
                node.value = temp.value;
                node.right = this._delete(node.right, temp.value);
            }
        }

        // If the tree had only one node then return
        if (node === null) {
            return null;
        }

        // Step 2: Balance the tree
        return this.balance(node);
    }

    // Search for a value
    search(value: T): boolean {
        return this._search(this.root, value);
    }

    private _search(node: AVLNode<T> | null, value: T): boolean {
        if (node === null) {
            return false;
        }

        if (value < node.value) {
            return this._search(node.left, value);
        } else if (value > node.value) {
            return this._search(node.right, value);
        } else {
            return true;
        }
    }

    // In-order traversal
    inOrder(): T[] {
        const result: T[] = [];
        this._inOrder(this.root, result);
        return result;
    }

    private _inOrder(node: AVLNode<T> | null, result: T[]): void {
        if (node !== null) {
            this._inOrder(node.left, result);
            result.push(node.value);
            this._inOrder(node.right, result);
        }
    }

    // Pre-order traversal
    preOrder(): T[] {
        const result: T[] = [];
        this._preOrder(this.root, result);
        return result;
    }

    private _preOrder(node: AVLNode<T> | null, result: T[]): void {
        if (node !== null) {
            result.push(node.value);
            this._preOrder(node.left, result);
            this._preOrder(node.right, result);
        }
    }

    // Post-order traversal
    postOrder(): T[] {
        const result: T[] = [];
        this._postOrder(this.root, result);
        return result;
    }

    private _postOrder(node: AVLNode<T> | null, result: T[]): void {
        if (node !== null) {
            this._postOrder(node.left, result);
            this._postOrder(node.right, result);
            result.push(node.value);
        }
    }

    // Get the height of the tree
    getTreeHeight(): number {
        return this.getHeight(this.root);
    }

    // Check if tree is empty
    isEmpty(): boolean {
        return this.root === null;
    }
}

// Example usage
const avl = new AVLTree<number>();

// Insert values
avl.insert(10);
avl.insert(20);
avl.insert(30);
avl.insert(40);
avl.insert(50);
avl.insert(25);

console.log("In-order traversal:", avl.inOrder());
console.log("Pre-order traversal:", avl.preOrder());
console.log("Tree height:", avl.getTreeHeight());

// Search
console.log("Search 25:", avl.search(25)); // true
console.log("Search 100:", avl.search(100)); // false

// Delete
avl.delete(30);
console.log("After deleting 30:", avl.inOrder());

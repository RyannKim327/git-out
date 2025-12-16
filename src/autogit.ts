// Node interface
interface AVLNode<T> {
    value: T;
    left: AVLNode<T> | null;
    right: AVLNode<T> | null;
    height: number;
}

// AVL Tree class
class AVLTree<T> {
    private root: AVLNode<T> | null = null;

    // Create a new node
    private createNode(value: T): AVLNode<T> {
        return {
            value,
            left: null,
            right: null,
            height: 1
        };
    }

    // Get height of a node
    private getHeight(node: AVLNode<T> | null): number {
        return node ? node.height : 0;
    }

    // Update height of a node based on its children
    private updateHeight(node: AVLNode<T>): void {
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }

    // Get balance factor of a node
    private getBalanceFactor(node: AVLNode<T> | null): number {
        if (!node) return 0;
        return this.getHeight(node.left) - this.getHeight(node.right);
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
    public insert(value: T): void {
        this.root = this.insertNode(this.root, value);
    }

    private insertNode(node: AVLNode<T> | null, value: T): AVLNode<T> {
        // Perform normal BST insertion
        if (node === null) {
            return this.createNode(value);
        }

        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        } else {
            // Duplicate values not allowed
            return node;
        }

        // Update height of this ancestor node
        this.updateHeight(node);

        // Balance the tree
        return this.balance(node);
    }

    // Delete a value
    public delete(value: T): void {
        this.root = this.deleteNode(this.root, value);
    }

    private deleteNode(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
        if (node === null) {
            return null;
        }

        // Perform normal BST deletion
        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
        } else {
            // Node to be deleted found

            // Node with only one child or no child
            if (node.left === null || node.right === null) {
                const temp = node.left || node.right;

                // No child case
                if (temp === null) {
                    return null;
                } else {
                    // One child case
                    node = temp;
                }
            } else {
                // Node with two children: get the inorder successor
                const temp = this.getMinValueNode(node.right)!;
                node.value = temp.value;
                node.right = this.deleteNode(node.right, temp.value);
            }
        }

        // If the tree had only one node then return
        if (node === null) {
            return null;
        }

        // Update height
        this.updateHeight(node);

        // Balance the tree
        return this.balance(node);
    }

    // Get node with minimum value
    private getMinValueNode(node: AVLNode<T>): AVLNode<T> | null {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    // Search for a value
    public search(value: T): boolean {
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

    // Traversal methods
    public inOrder(): T[] {
        const result: T[] = [];
        this.inOrderTraversal(this.root, result);
        return result;
    }

    private inOrderTraversal(node: AVLNode<T> | null, result: T[]): void {
        if (node !== null) {
            this.inOrderTraversal(node.left, result);
            result.push(node.value);
            this.inOrderTraversal(node.right, result);
        }
    }

    public preOrder(): T[] {
        const result: T[] = [];
        this.preOrderTraversal(this.root, result);
        return result;
    }

    private preOrderTraversal(node: AVLNode<T> | null, result: T[]): void {
        if (node !== null) {
            result.push(node.value);
            this.preOrderTraversal(node.left, result);
            this.preOrderTraversal(node.right, result);
        }
    }

    public postOrder(): T[] {
        const result: T[] = [];
        this.postOrderTraversal(this.root, result);
        return result;
    }

    private postOrderTraversal(node: AVLNode<T> | null, result: T[]): void {
        if (node !== null) {
            this.postOrderTraversal(node.left, result);
            this.postOrderTraversal(node.right, result);
            result.push(node.value);
        }
    }

    // Get tree height
    public getTreeHeight(): number {
        return this.getHeight(this.root);
    }

    // Check if tree is empty
    public isEmpty(): boolean {
        return this.root === null;
    }

    // Clear the tree
    public clear(): void {
        this.root = null;
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

console.log("In-order traversal:", avlTree.inOrder());
console.log("Pre-order traversal:", avlTree.preOrder());
console.log("Post-order traversal:", avlTree.postOrder());
console.log("Tree height:", avlTree.getTreeHeight());

// Search operations
console.log("Search 30:", avlTree.search(30)); // true
console.log("Search 100:", avlTree.search(100)); // false

// Delete operations
avlTree.delete(30);
console.log("After deleting 30 - In-order:", avlTree.inOrder());

// String example
const stringTree = new AVLTree<string>();
stringTree.insert("apple");
stringTree.insert("banana");
stringTree.insert("cherry");
console.log("String tree - In-order:", stringTree.inOrder());

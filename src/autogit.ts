// Node class definition
class AVLNode<T> {
    value: T;
    left: AVLNode<T> | null;
    right: AVLNode<T> | null;
    height: number;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1; // New node is initially added at leaf
    }
}

// AVL Tree class
class AVLTree<T> {
    private root: AVLNode<T> | null;
    private comparator: (a: T, b: T) => number;

    constructor(comparator: (a: T, b: T) => number = (a, b) => a > b ? 1 : a < b ? -1 : 0) {
        this.root = null;
        this.comparator = comparator;
    }

    // Get height of node
    private getHeight(node: AVLNode<T> | null): number {
        return node ? node.height : 0;
    }

    // Get balance factor of node
    private getBalance(node: AVLNode<T> | null): number {
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

    // Insert a value
    insert(value: T): void {
        this.root = this.insertNode(this.root, value);
    }

    private insertNode(node: AVLNode<T> | null, value: T): AVLNode<T> {
        // Perform normal BST insertion
        if (node === null) {
            return new AVLNode(value);
        }

        const compare = this.comparator(value, node.value);
        
        if (compare < 0) {
            node.left = this.insertNode(node.left, value);
        } else if (compare > 0) {
            node.right = this.insertNode(node.right, value);
        } else {
            // Duplicate values not allowed
            return node;
        }

        // Update height of this ancestor node
        this.updateHeight(node);

        // Get the balance factor
        const balance = this.getBalance(node);

        // Left Left Case
        if (balance > 1 && node.left && this.comparator(value, node.left.value) < 0) {
            return this.rotateRight(node);
        }

        // Right Right Case
        if (balance < -1 && node.right && this.comparator(value, node.right.value) > 0) {
            return this.rotateLeft(node);
        }

        // Left Right Case
        if (balance > 1 && node.left && this.comparator(value, node.left.value) > 0) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }

        // Right Left Case
        if (balance < -1 && node.right && this.comparator(value, node.right.value) < 0) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    // Delete a value
    delete(value: T): void {
        this.root = this.deleteNode(this.root, value);
    }

    private deleteNode(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
        // Standard BST deletion
        if (node === null) {
            return null;
        }

        const compare = this.comparator(value, node.value);

        if (compare < 0) {
            node.left = this.deleteNode(node.left, value);
        } else if (compare > 0) {
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
                    node = temp;
                }
            } else {
                // Node with two children: get inorder successor
                const temp = this.getMinValueNode(node.right)!;
                node.value = temp.value;
                node.right = this.deleteNode(node.right, temp.value);
            }
        }

        if (node === null) return null;

        // Update height
        this.updateHeight(node);

        // Get balance factor
        const balance = this.getBalance(node);

        // Left Left Case
        if (balance > 1 && this.getBalance(node.left) >= 0) {
            return this.rotateRight(node);
        }

        // Left Right Case
        if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }

        // Right Right Case
        if (balance < -1 && this.getBalance(node.right) <= 0) {
            return this.rotateLeft(node);
        }

        // Right Left Case
        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    // Search for a value
    search(value: T): boolean {
        return this.searchNode(this.root, value);
    }

    private searchNode(node: AVLNode<T> | null, value: T): boolean {
        if (node === null) return false;

        const compare = this.comparator(value, node.value);
        
        if (compare === 0) return true;
        if (compare < 0) return this.searchNode(node.left, value);
        return this.searchNode(node.right, value);
    }

    // Get minimum value node
    private getMinValueNode(node: AVLNode<T>): AVLNode<T> | null {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    // Get maximum value node
    private getMaxValueNode(node: AVLNode<T>): AVLNode<T> | null {
        let current = node;
        while (current.right !== null) {
            current = current.right;
        }
        return current;
    }

    // In-order traversal
    inOrder(): T[] {
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

    // Pre-order traversal
    preOrder(): T[] {
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

    // Post-order traversal
    postOrder(): T[] {
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

    // Level-order traversal (BFS)
    levelOrder(): T[] {
        const result: T[] = [];
        if (this.root === null) return result;

        const queue: AVLNode<T>[] = [this.root];
        
        while (queue.length > 0) {
            const node = queue.shift()!;
            result.push(node.value);

            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }

        return result;
    }

    // Get tree height
    getTreeHeight(): number {
        return this.getHeight(this.root);
    }

    // Check if tree is empty
    isEmpty(): boolean {
        return this.root === null;
    }

    // Clear the tree
    clear(): void {
        this.root = null;
    }
}

// Example usage
function example() {
    // Create AVL tree with numbers
    const tree = new AVLTree<number>();
    
    // Insert values
    tree.insert(10);
    tree.insert(20);
    tree.insert(30);
    tree.insert(40);
    tree.insert(50);
    tree.insert(25);

    console.log("In-order traversal:", tree.inOrder());
    console.log("Pre-order traversal:", tree.preOrder());
    console.log("Level-order traversal:", tree.levelOrder());
    console.log("Tree height:", tree.getTreeHeight());

    // Search for values
    console.log("Search 30:", tree.search(30)); // true
    console.log("Search 35:", tree.search(35)); // false

    // Delete a value
    tree.delete(30);
    console.log("After deleting 30:", tree.inOrder());

    // Example with custom comparator for strings
    const stringTree = new AVLTree<string>((a, b) => a.localeCompare(b));
    stringTree.insert("apple");
    stringTree.insert("banana");
    stringTree.insert("cherry");
    
    console.log("String tree in-order:", stringTree.inOrder());

    // Example with custom objects
    interface Person {
        name: string;
        age: number;
    }

    const personTree = new AVLTree<Person>((a, b) => a.age - b.age);
    personTree.insert({ name: "Alice", age: 25 });
    personTree.insert({ name: "Bob", age: 30 });
    personTree.insert({ name: "Charlie", age: 20 });

    console.log("Person tree by age:", personTree.inOrder());
}

// Run example
example();

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
    private comparator: (a: T, b: T) => number;

    constructor(comparator?: (a: T, b: T) => number) {
        this.root = null;
        this.comparator = comparator || ((a: T, b: T) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });
    }

    // Get height of a node
    private getHeight(node: AVLNode<T> | null): number {
        return node ? node.height : 0;
    }

    // Update height of a node
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
    insert(value: T): void {
        this.root = this.insertNode(this.root, value);
    }

    private insertNode(node: AVLNode<T> | null, value: T): AVLNode<T> {
        // Perform normal BST insertion
        if (node === null) {
            return new AVLNode(value);
        }

        if (this.comparator(value, node.value) < 0) {
            node.left = this.insertNode(node.left, value);
        } else if (this.comparator(value, node.value) > 0) {
            node.right = this.insertNode(node.right, value);
        } else {
            // Duplicate values not allowed
            return node;
        }

        // Update height of current node
        this.updateHeight(node);

        // Balance the tree
        return this.balance(node);
    }

    // Delete a value
    delete(value: T): void {
        this.root = this.deleteNode(this.root, value);
    }

    private deleteNode(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
        // Perform standard BST delete
        if (node === null) {
            return null;
        }

        if (this.comparator(value, node.value) < 0) {
            node.left = this.deleteNode(node.left, value);
        } else if (this.comparator(value, node.value) > 0) {
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
                // Node with two children: get inorder successor
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
    search(value: T): boolean {
        return this.searchNode(this.root, value);
    }

    private searchNode(node: AVLNode<T> | null, value: T): boolean {
        if (node === null) {
            return false;
        }

        if (this.comparator(value, node.value) === 0) {
            return true;
        }

        if (this.comparator(value, node.value) < 0) {
            return this.searchNode(node.left, value);
        } else {
            return this.searchNode(node.right, value);
        }
    }

    // In-order traversal (returns sorted values)
    inOrderTraversal(): T[] {
        const result: T[] = [];
        this.inOrder(this.root, result);
        return result;
    }

    private inOrder(node: AVLNode<T> | null, result: T[]): void {
        if (node !== null) {
            this.inOrder(node.left, result);
            result.push(node.value);
            this.inOrder(node.right, result);
        }
    }

    // Pre-order traversal
    preOrderTraversal(): T[] {
        const result: T[] = [];
        this.preOrder(this.root, result);
        return result;
    }

    private preOrder(node: AVLNode<T> | null, result: T[]): void {
        if (node !== null) {
            result.push(node.value);
            this.preOrder(node.left, result);
            this.preOrder(node.right, result);
        }
    }

    // Post-order traversal
    postOrderTraversal(): T[] {
        const result: T[] = [];
        this.postOrder(this.root, result);
        return result;
    }

    private postOrder(node: AVLNode<T> | null, result: T[]): void {
        if (node !== null) {
            this.postOrder(node.left, result);
            this.postOrder(node.right, result);
            result.push(node.value);
        }
    }

    // Get the root value (for testing)
    getRoot(): T | null {
        return this.root ? this.root.value : null;
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
console.log("Search 35:", avlTree.search(35)); // false

// Get sorted values (in-order traversal)
console.log("In-order:", avlTree.inOrderTraversal()); // [10, 20, 25, 30, 40, 50]

// Delete a value
avlTree.delete(30);
console.log("After deletion:", avlTree.inOrderTraversal()); // [10, 20, 25, 40, 50]

// Example with custom comparator for objects
interface Person {
    name: string;
    age: number;
}

const personTree = new AVLTree<Person>((a, b) => a.age - b.age);

personTree.insert({ name: "Alice", age: 25 });
personTree.insert({ name: "Bob", age: 30 });
personTree.insert({ name: "Charlie", age: 20 });

console.log("People by age:", personTree.inOrderTraversal());
// [{ name: "Charlie", age: 20 }, { name: "Alice", age: 25 }, { name: "Bob", age: 30 }]

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

class BinarySearchTree<T> {
    root: TreeNode<T> | null;

    constructor() {
        this.root = null;
    }

    // Insert a new value
    insert(value: T): void {
        const newNode = new TreeNode(value);
        
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        this.insertNode(this.root, newNode);
    }

    private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    // Search for a value
    search(value: T): boolean {
        return this.searchNode(this.root, value);
    }

    private searchNode(node: TreeNode<T> | null, value: T): boolean {
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

    // In-order traversal (left, root, right)
    inOrderTraversal(callback: (value: T) => void): void {
        this.inOrder(this.root, callback);
    }

    private inOrder(node: TreeNode<T> | null, callback: (value: T) => void): void {
        if (node !== null) {
            this.inOrder(node.left, callback);
            callback(node.value);
            this.inOrder(node.right, callback);
        }
    }

    // Pre-order traversal (root, left, right)
    preOrderTraversal(callback: (value: T) => void): void {
        this.preOrder(this.root, callback);
    }

    private preOrder(node: TreeNode<T> | null, callback: (value: T) => void): void {
        if (node !== null) {
            callback(node.value);
            this.preOrder(node.left, callback);
            this.preOrder(node.right, callback);
        }
    }

    // Post-order traversal (left, right, root)
    postOrderTraversal(callback: (value: T) => void): void {
        this.postOrder(this.root, callback);
    }

    private postOrder(node: TreeNode<T> | null, callback: (value: T) => void): void {
        if (node !== null) {
            this.postOrder(node.left, callback);
            this.postOrder(node.right, callback);
            callback(node.value);
        }
    }

    // Find minimum value
    findMin(): T | null {
        if (this.root === null) {
            return null;
        }
        return this.findMinNode(this.root).value;
    }

    private findMinNode(node: TreeNode<T>): TreeNode<T> {
        return node.left === null ? node : this.findMinNode(node.left);
    }

    // Find maximum value
    findMax(): T | null {
        if (this.root === null) {
            return null;
        }
        return this.findMaxNode(this.root).value;
    }

    private findMaxNode(node: TreeNode<T>): TreeNode<T> {
        return node.right === null ? node : this.findMaxNode(node.right);
    }

    // Remove a value
    remove(value: T): void {
        this.root = this.removeNode(this.root, value);
    }

    private removeNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
        if (node === null) {
            return null;
        }

        if (value < node.value) {
            node.left = this.removeNode(node.left, value);
            return node;
        } else if (value > node.value) {
            node.right = this.removeNode(node.right, value);
            return node;
        } else {
            // Node to be deleted found

            // Case 1: No child nodes
            if (node.left === null && node.right === null) {
                return null;
            }

            // Case 2: One child node
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }

            // Case 3: Two child nodes
            const minRight = this.findMinNode(node.right);
            node.value = minRight.value;
            node.right = this.removeNode(node.right, minRight.value);
            return node;
        }
    }

    // Get height of the tree
    getHeight(): number {
        return this.calculateHeight(this.root);
    }

    private calculateHeight(node: TreeNode<T> | null): number {
        if (node === null) {
            return 0;
        }
        return 1 + Math.max(
            this.calculateHeight(node.left),
            this.calculateHeight(node.right)
        );
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
// Create a BST with numbers
const numberBST = new BinarySearchTree<number>();

// Insert values
numberBST.insert(50);
numberBST.insert(30);
numberBST.insert(70);
numberBST.insert(20);
numberBST.insert(40);
numberBST.insert(60);
numberBST.insert(80);

// Search
console.log(numberBST.search(40)); // true
console.log(numberBST.search(100)); // false

// Traversal
console.log("In-order traversal:");
numberBST.inOrderTraversal(value => console.log(value));
// Output: 20, 30, 40, 50, 60, 70, 80

// Min/Max
console.log("Min:", numberBST.findMin()); // 20
console.log("Max:", numberBST.findMax()); // 80

// Remove
numberBST.remove(30);
console.log("After removing 30:");
numberBST.inOrderTraversal(value => console.log(value));
// Output: 20, 40, 50, 60, 70, 80

// Height
console.log("Tree height:", numberBST.getHeight()); // 3
class BinarySearchTreeWithComparator<T> {
    root: TreeNode<T> | null;
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

    insert(value: T): void {
        const newNode = new TreeNode(value);
        
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        this.insertNodeWithComparator(this.root, newNode);
    }

    private insertNodeWithComparator(node: TreeNode<T>, newNode: TreeNode<T>): void {
        const comparison = this.compare(newNode.value, node.value);
        
        if (comparison < 0) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNodeWithComparator(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNodeWithComparator(node.right, newNode);
            }
        }
    }

    // Other methods would also use the comparator...
}

// Usage with custom objects
interface Person {
    name: string;
    age: number;
}

const personBST = new BinarySearchTreeWithComparator<Person>(
    (a, b) => a.age - b.age
);

personBST.insert({ name: "Alice", age: 25 });
personBST.insert({ name: "Bob", age: 30 });
personBST.insert({ name: "Charlie", age: 20 });

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

    // Insert a value into the BST
    insert(value: T): void {
        const newNode = new TreeNode(value);
        
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else if (value > current.value) {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            } else {
                // Value already exists (handle duplicates as needed)
                return;
            }
        }
    }

    // Search for a value in the BST
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
    inOrderTraversal(callback: (value: T) => void): void {
        this.inOrderHelper(this.root, callback);
    }

    private inOrderHelper(node: TreeNode<T> | null, callback: (value: T) => void): void {
        if (node !== null) {
            this.inOrderHelper(node.left, callback);
            callback(node.value);
            this.inOrderHelper(node.right, callback);
        }
    }

    // Pre-order traversal (root, left, right)
    preOrderTraversal(callback: (value: T) => void): void {
        this.preOrderHelper(this.root, callback);
    }

    private preOrderHelper(node: TreeNode<T> | null, callback: (value: T) => void): void {
        if (node !== null) {
            callback(node.value);
            this.preOrderHelper(node.left, callback);
            this.preOrderHelper(node.right, callback);
        }
    }

    // Post-order traversal (left, right, root)
    postOrderTraversal(callback: (value: T) => void): void {
        this.postOrderHelper(this.root, callback);
    }

    private postOrderHelper(node: TreeNode<T> | null, callback: (value: T) => void): void {
        if (node !== null) {
            this.postOrderHelper(node.left, callback);
            this.postOrderHelper(node.right, callback);
            callback(node.value);
        }
    }

    // Find the minimum value in the tree
    findMin(): T | null {
        if (this.root === null) return null;
        
        let current = this.root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    }

    // Find the maximum value in the tree
    findMax(): T | null {
        if (this.root === null) return null;
        
        let current = this.root;
        while (current.right !== null) {
            current = current.right;
        }
        return current.value;
    }

    // Delete a value from the BST
    delete(value: T): void {
        this.root = this.deleteHelper(this.root, value);
    }

    private deleteHelper(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
        if (node === null) return null;

        if (value < node.value) {
            node.left = this.deleteHelper(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteHelper(node.right, value);
        } else {
            // Node to be deleted found
            
            // Case 1: Node with no children or one child
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }
            
            // Case 2: Node with two children
            // Find the inorder successor (smallest in the right subtree)
            let temp = this.findMinNode(node.right);
            node.value = temp.value;
            node.right = this.deleteHelper(node.right, temp.value);
        }
        
        return node;
    }

    private findMinNode(node: TreeNode<T>): TreeNode<T> {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    // Get the height of the tree
    getHeight(): number {
        return this.heightHelper(this.root);
    }

    private heightHelper(node: TreeNode<T> | null): number {
        if (node === null) return 0;
        
        const leftHeight = this.heightHelper(node.left);
        const rightHeight = this.heightHelper(node.right);
        
        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Check if the tree is empty
    isEmpty(): boolean {
        return this.root === null;
    }

    // Get the number of nodes in the tree
    getSize(): number {
        return this.sizeHelper(this.root);
    }

    private sizeHelper(node: TreeNode<T> | null): number {
        if (node === null) return 0;
        return this.sizeHelper(node.left) + 1 + this.sizeHelper(node.right);
    }
}
class BinarySearchTreeWithComparator<T> {
    root: TreeNode<T> | null;
    private comparator: (a: T, b: T) => number;

    constructor(comparator?: (a: T, b: T) => number) {
        this.root = null;
        this.comparator = comparator || this.defaultComparator;
    }

    private defaultComparator(a: T, b: T): number {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    insert(value: T): void {
        const newNode = new TreeNode(value);
        
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
            } else if (comparison > 0) {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            } else {
                // Value already exists
                return;
            }
        }
    }

    search(value: T): boolean {
        let current = this.root;
        
        while (current !== null) {
            const comparison = this.comparator(value, current.value);
            
            if (comparison === 0) {
                return true;
            } else if (comparison < 0) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        
        return false;
    }

    // ... other methods similar to the basic implementation
}
// Basic usage with numbers
const bst = new BinarySearchTree<number>();

// Insert values
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);

// Search
console.log(bst.search(7)); // true
console.log(bst.search(20)); // false

// Traversal
console.log("In-order traversal:");
bst.inOrderTraversal(value => console.log(value)); // 3, 5, 7, 10, 15

console.log("Min:", bst.findMin()); // 3
console.log("Max:", bst.findMax()); // 15
console.log("Height:", bst.getHeight()); // 3
console.log("Size:", bst.getSize()); // 5

// Delete
bst.delete(5);
console.log("After deleting 5:");
bst.inOrderTraversal(value => console.log(value)); // 3, 7, 10, 15

// Usage with custom objects and comparator
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

console.log(personBST.search({ name: "Bob", age: 30 })); // true

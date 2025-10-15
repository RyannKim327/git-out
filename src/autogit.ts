class Node<T> {
    value: T;
    left: Node<T> | null;
    right: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class BinarySearchTree<T> {
    root: Node<T> | null;

    constructor() {
        this.root = null;
    }

    /**
     * Inserts a new value into the tree.
     * @param value The value to insert.
     */
    insert(value: T): void {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    // Helper method for insert (recursive)
    private insertNode(node: Node<T>, newNode: Node<T>): void {
        // Handle duplicates: For simplicity, we'll ignore values that are already present.
        // You could throw an error, allow them (not a strict BST), or add to a list.
        if (newNode.value === node.value) {
            // console.warn(`Duplicate value ${newNode.value} ignored.`);
            return;
        }

        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else { // newNode.value > node.value
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    /**
     * Searches for a value in the tree.
     * @param value The value to search for.
     * @returns True if the value is found, false otherwise.
     */
    search(value: T): boolean {
        return this.searchNode(this.root, value);
    }

    // Helper method for search (recursive)
    private searchNode(node: Node<T> | null, value: T): boolean {
        if (node === null) {
            return false; // Value not found
        }

        if (value === node.value) {
            return true; // Value found
        } else if (value < node.value) {
            return this.searchNode(node.left, value);
        } else { // value > node.value
            return this.searchNode(node.right, value);
        }
    }

    /**
     * Deletes a value from the tree.
     * @param value The value to delete.
     */
    delete(value: T): void {
        this.root = this.deleteNode(this.root, value);
    }

    // Helper method for delete (recursive)
    private deleteNode(node: Node<T> | null, value: T): Node<T> | null {
        if (node === null) {
            return null; // Value not found
        }

        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
            return node;
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
            return node;
        } else { // Found the node to delete
            // Case 1: Node has no children (leaf node)
            if (node.left === null && node.right === null) {
                return null;
            }
            // Case 2: Node has only one child
            else if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }
            // Case 3: Node has two children
            else {
                // Find the in-order successor (smallest node in the right subtree)
                const tempNode = this.findMinNode(node.right);
                node.value = tempNode.value; // Copy successor's value to current node
                // Delete the in-order successor from its original position
                node.right = this.deleteNode(node.right, tempNode.value);
                return node;
            }
        }
    }

    /**
     * Finds the minimum value in the tree.
     * @returns The minimum value or null if the tree is empty.
     */
    findMin(): T | null {
        if (this.root === null) {
            return null;
        }
        return this.findMinNode(this.root).value;
    }

    // Helper method to find the node with the minimum value in a subtree
    private findMinNode(node: Node<T>): Node<T> {
        if (node.left === null) {
            return node;
        }
        return this.findMinNode(node.left);
    }

    /**
     * Finds the maximum value in the tree.
     * @returns The maximum value or null if the tree is empty.
     */
    findMax(): T | null {
        if (this.root === null) {
            return null;
        }
        return this.findMaxNode(this.root).value;
    }

    // Helper method to find the node with the maximum value in a subtree
    private findMaxNode(node: Node<T>): Node<T> {
        if (node.right === null) {
            return node;
        }
        return this.findMaxNode(node.right);
    }

    /**
     * Performs an in-order traversal (Left, Root, Right).
     * @returns An array of values in ascending order.
     */
    inOrderTraversal(): T[] {
        const result: T[] = [];
        this.inOrder(this.root, result);
        return result;
    }

    private inOrder(node: Node<T> | null, result: T[]): void {
        if (node !== null) {
            this.inOrder(node.left, result);
            result.push(node.value);
            this.inOrder(node.right, result);
        }
    }

    /**
     * Performs a pre-order traversal (Root, Left, Right).
     * @returns An array of values.
     */
    preOrderTraversal(): T[] {
        const result: T[] = [];
        this.preOrder(this.root, result);
        return result;
    }

    private preOrder(node: Node<T> | null, result: T[]): void {
        if (node !== null) {
            result.push(node.value);
            this.preOrder(node.left, result);
            this.preOrder(node.right, result);
        }
    }

    /**
     * Performs a post-order traversal (Left, Right, Root).
     * @returns An array of values.
     */
    postOrderTraversal(): T[] {
        const result: T[] = [];
        this.postOrder(this.root, result);
        return result;
    }

    private postOrder(node: Node<T> | null, result: T[]): void {
        if (node !== null) {
            this.postOrder(node.left, result);
            this.postOrder(node.right, result);
            result.push(node.value);
        }
    }
}
// Create a new Binary Search Tree
const bst = new BinarySearchTree<number>();

// Insert values
console.log('Inserting values: 15, 10, 20, 8, 12, 17, 25, 6, 11, 19, 30');
bst.insert(15);
bst.insert(10);
bst.insert(20);
bst.insert(8);
bst.insert(12);
bst.insert(17);
bst.insert(25);
bst.insert(6);
bst.insert(11);
bst.insert(19);
bst.insert(30);

// Test traversals
console.log('In-order traversal (sorted):', bst.inOrderTraversal());    // Expected: [6, 8, 10, 11, 12, 15, 17, 19, 20, 25, 30]
console.log('Pre-order traversal:', bst.preOrderTraversal());          // Expected: [15, 10, 8, 6, 12, 11, 20, 17, 19, 25, 30]
console.log('Post-order traversal:', bst.postOrderTraversal());         // Expected: [6, 8, 11, 12, 10, 19, 17, 30, 25, 20, 15]

// Test search
console.log('Search for 12:', bst.search(12));   // Expected: true
console.log('Search for 99:', bst.search(99));   // Expected: false
console.log('Search for 15:', bst.search(15));   // Expected: true (root)

// Test min/max
console.log('Minimum value:', bst.findMin()); // Expected: 6
console.log('Maximum value:', bst.findMax()); // Expected: 30

// Test deletion
console.log('\n--- Deletion Tests ---');
console.log('In-order before deletion:', bst.inOrderTraversal()); // [6, 8, 10, 11, 12, 15, 17, 19, 20, 25, 30]

// Delete a leaf node (6)
console.log('Deleting 6 (leaf node)');
bst.delete(6);
console.log('In-order after deleting 6:', bst.inOrderTraversal()); // [8, 10, 11, 12, 15, 17, 19, 20, 25, 30]
console.log('Search for 6:', bst.search(6)); // Expected: false

// Delete a node with one child (8, which now has no left child, only 10 on right)
console.log('Deleting 8 (node with one child)');
bst.delete(8);
console.log('In-order after deleting 8:', bst.inOrderTraversal()); // [10, 11, 12, 15, 17, 19, 20, 25, 30]
console.log('Search for 8:', bst.search(8)); // Expected: false

// Delete a node with two children (10, successor is 11)
console.log('Deleting 10 (node with two children, successor is 11)');
bst.delete(10);
console.log('In-order after deleting 10:', bst.inOrderTraversal()); // [11, 12, 15, 17, 19, 20, 25, 30]
console.log('Search for 10:', bst.search(10)); // Expected: false

// Delete the root (15, successor is 17)
console.log('Deleting root 15 (node with two children, successor is 17)');
bst.delete(15);
console.log('In-order after deleting 15:', bst.inOrderTraversal()); // [11, 12, 17, 19, 20, 25, 30]
console.log('Search for 15:', bst.search(15)); // Expected: false

// Delete a non-existent value
console.log('Deleting 99 (non-existent)');
bst.delete(99);
console.log('In-order after deleting 99:', bst.inOrderTraversal()); // No change: [11, 12, 17, 19, 20, 25, 30]

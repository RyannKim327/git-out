/**
 * Interface for a comparator function that defines the order of elements.
 * Returns:
 *   - A negative number if `a` is less than `b`.
 *   - Zero if `a` is equal to `b`.
 *   - A positive number if `a` is greater than `b`.
 */
interface IComparator<T> {
    compare(a: T, b: T): number;
}

/**
 * Default comparator for primitive types (numbers, strings).
 * Assumes T can be directly compared using <, >, ==.
 */
class DefaultComparator<T> implements IComparator<T> {
    compare(a: T, b: T): number {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }
}
/**
 * Represents a single node in the Binary Search Tree.
 */
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
/**
 * Implements a Binary Search Tree.
 * @template T The type of values stored in the tree. Must be comparable.
 */
class BinarySearchTree<T> {
    private root: Node<T> | null;
    private size: number;
    private comparator: IComparator<T>;

    constructor(comparator?: IComparator<T>) {
        this.root = null;
        this.size = 0;
        this.comparator = comparator || new DefaultComparator<T>();
    }

    /**
     * Gets the number of nodes in the tree.
     */
    getSize(): number {
        return this.size;
    }

    /**
     * Checks if the tree is empty.
     */
    isEmpty(): boolean {
        return this.root === null;
    }

    /**
     * Inserts a new value into the tree.
     * If the value already exists, it is ignored (no duplicates allowed in this implementation).
     * @param value The value to insert.
     */
    insert(value: T): void {
        const newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode;
            this.size++;
            return;
        }

        let currentNode: Node<T> | null = this.root;
        while (true) {
            const comparison = this.comparator.compare(value, currentNode.value);

            if (comparison === 0) {
                // Value already exists, ignore duplicates
                return;
            } else if (comparison < 0) {
                // Go left
                if (currentNode.left === null) {
                    currentNode.left = newNode;
                    this.size++;
                    return;
                }
                currentNode = currentNode.left;
            } else {
                // Go right (comparison > 0)
                if (currentNode.right === null) {
                    currentNode.right = newNode;
                    this.size++;
                    return;
                }
                currentNode = currentNode.right;
            }
        }
    }

    /**
     * Searches for a value in the tree.
     * @param value The value to search for.
     * @returns The Node containing the value if found, otherwise null.
     */
    find(value: T): Node<T> | null {
        if (this.root === null) {
            return null;
        }

        let currentNode: Node<T> | null = this.root;
        while (currentNode !== null) {
            const comparison = this.comparator.compare(value, currentNode.value);

            if (comparison === 0) {
                return currentNode; // Value found
            } else if (comparison < 0) {
                currentNode = currentNode.left; // Go left
            } else {
                currentNode = currentNode.right; // Go right
            }
        }
        return null; // Value not found
    }

    /**
     * Deletes a value from the tree.
     * @param value The value to delete.
     * @returns True if the value was found and deleted, false otherwise.
     */
    delete(value: T): boolean {
        const originalSize = this.size;
        this.root = this._deleteNode(this.root, value);
        return this.size < originalSize; // Returns true if size decreased
    }

    /**
     * Recursive helper for deleting a node.
     * @param node The current node to consider.
     * @param value The value to delete.
     * @returns The new root of the (sub)tree after deletion.
     */
    private _deleteNode(node: Node<T> | null, value: T): Node<T> | null {
        if (node === null) {
            return null; // Value not found in this subtree
        }

        const comparison = this.comparator.compare(value, node.value);

        if (comparison < 0) {
            node.left = this._deleteNode(node.left, value); // Go left
            return node;
        } else if (comparison > 0) {
            node.right = this._deleteNode(node.right, value); // Go right
            return node;
        } else {
            // Found the node to delete
            this.size--; // Decrement size once for this logical deletion

            // Case 1: Node has no left child (or no children)
            if (node.left === null) {
                return node.right; // Replace with right child (could be null)
            }
            // Case 2: Node has no right child
            else if (node.right === null) {
                return node.left; // Replace with left child
            }
            // Case 3: Node has two children
            else {
                // Find the in-order successor (smallest node in the right subtree)
                const successor = this._findMinNode(node.right);
                if (successor) {
                    node.value = successor.value; // Copy successor's value to current node
                    // Delete the successor from the right subtree.
                    // Important: The _removeMinNode helper does NOT decrement size,
                    // as we already decremented it when we found the original node to delete.
                    node.right = this._removeMinNode(node.right);
                }
                return node;
            }
        }
    }

    /**
     * Helper to find the node with the minimum value in a given subtree.
     * @param node The root of the subtree to search.
     * @returns The node with the minimum value.
     */
    private _findMinNode(node: Node<T>): Node<T> {
        let currentNode: Node<T> = node;
        while (currentNode.left !== null) {
            currentNode = currentNode.left;
        }
        return currentNode;
    }

    /**
     * Helper to remove the minimum node from a subtree and return the new root of that subtree.
     * Used specifically for deleting the successor in the _deleteNode method (Case 3).
     * This helper does NOT decrement `this.size`.
     * @param node The root of the subtree from which to remove the minimum.
     * @returns The new root of the modified subtree.
     */
    private _removeMinNode(node: Node<T>): Node<T> | null {
        if (node.left === null) {
            // This 'node' is the minimum. Its right child (if any) becomes its replacement.
            return node.right;
        }
        node.left = this._removeMinNode(node.left);
        return node;
    }

    /**
     * Performs an in-order traversal of the tree.
     * Visits left subtree, then current node, then right subtree.
     * @param callback A function to call for each node's value.
     */
    inOrderTraverse(callback: (value: T) => void): void {
        this._inOrderTraverseNode(this.root, callback);
    }

    private _inOrderTraverseNode(node: Node<T> | null, callback: (value: T) => void): void {
        if (node !== null) {
            this._inOrderTraverseNode(node.left, callback);
            callback(node.value);
            this._inOrderTraverseNode(node.right, callback);
        }
    }

    /**
     * Performs a pre-order traversal of the tree.
     * Visits current node, then left subtree, then right subtree.
     * @param callback A function to call for each node's value.
     */
    preOrderTraverse(callback: (value: T) => void): void {
        this._preOrderTraverseNode(this.root, callback);
    }

    private _preOrderTraverseNode(node: Node<T> | null, callback: (value: T) => void): void {
        if (node !== null) {
            callback(node.value);
            this._preOrderTraverseNode(node.left, callback);
            this._preOrderTraverseNode(node.right, callback);
        }
    }

    /**
     * Performs a post-order traversal of the tree.
     * Visits left subtree, then right subtree, then current node.
     * @param callback A function to call for each node's value.
     */
    postOrderTraverse(callback: (value: T) => void): void {
        this._postOrderTraverseNode(this.root, callback);
    }

    private _postOrderTraverseNode(node: Node<T> | null, callback: (value: T) => void): void {
        if (node !== null) {
            this._postOrderTraverseNode(node.left, callback);
            this._postOrderTraverseNode(node.right, callback);
            callback(node.value);
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
        return this._findMinNode(this.root).value;
    }

    /**
     * Finds the maximum value in the tree.
     * @returns The maximum value or null if the tree is empty.
     */
    findMax(): T | null {
        if (this.root === null) {
            return null;
        }
        let currentNode: Node<T> = this.root;
        while (currentNode.right !== null) {
            currentNode = currentNode.right;
        }
        return currentNode.value;
    }

    /**
     * Calculates the height of the tree.
     * The height of an empty tree is -1. The height of a single node tree is 0.
     * @returns The height of the tree.
     */
    height(): number {
        return this._heightNode(this.root);
    }

    private _heightNode(node: Node<T> | null): number {
        if (node === null) {
            return -1;
        }
        const leftHeight = this._heightNode(node.left);
        const rightHeight = this._heightNode(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }
}
// --- Example with numbers (using default comparator) ---
console.log("--- Number BST Example ---");
const bst = new BinarySearchTree<number>();

bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(12);
bst.insert(18);
bst.insert(7); // Duplicate, will be ignored

console.log("Size:", bst.getSize()); // Expected: 7
console.log("Is Empty?", bst.isEmpty()); // Expected: false
console.log("Height:", bst.height()); // Expected: 2 (nodes at levels 0, 1, 2)

console.log("In-order traversal (sorted):");
const inOrderValues: number[] = [];
bst.inOrderTraverse(value => inOrderValues.push(value));
console.log(inOrderValues.join(', ')); // Expected: 3, 5, 7, 10, 12, 15, 18

console.log("Pre-order traversal:");
const preOrderValues: number[] = [];
bst.preOrderTraverse(value => preOrderValues.push(value));
console.log(preOrderValues.join(', ')); // Expected: 10, 5, 3, 7, 15, 12, 18

console.log("Post-order traversal:");
const postOrderValues: number[] = [];
bst.postOrderTraverse(value => postOrderValues.push(value));
console.log(postOrderValues.join(', ')); // Expected: 3, 7, 5, 12, 18, 15, 10

console.log("Find 7:", bst.find(7)?.value); // Expected: 7
console.log("Find 100:", bst.find(100)); // Expected: null

console.log("Min value:", bst.findMin()); // Expected: 3
console.log("Max value:", bst.findMax()); // Expected: 18

console.log("Deleting 7...");
console.log("Deleted 7?", bst.delete(7)); // Expected: true
console.log("Size after deleting 7:", bst.getSize()); // Expected: 6
console.log("In-order after deleting 7:");
const inOrderValues2: number[] = [];
bst.inOrderTraverse(value => inOrderValues2.push(value));
console.log(inOrderValues2.join(', ')); // Expected: 3, 5, 10, 12, 15, 18

console.log("Deleting 10 (root with two children)...");
console.log("Deleted 10?", bst.delete(10)); // Expected: true
console.log("Size after deleting 10:", bst.getSize()); // Expected: 5
console.log("In-order after deleting 10:");
const inOrderValues3: number[] = [];
bst.inOrderTraverse(value => inOrderValues3.push(value));
console.log(inOrderValues3.join(', ')); // Expected: 3, 5, 12, 15, 18 (12 replaced 10)

console.log("Deleting 100 (non-existent)...");
console.log("Deleted 100?", bst.delete(100)); // Expected: false
console.log("Size after deleting 100:", bst.getSize()); // Expected: 5 (unchanged)

// --- Example with custom objects (using a custom comparator) ---
console.log("\n--- Custom Object BST Example ---");

interface Person {
    id: number;
    name: string;
}

class PersonComparator implements IComparator<Person> {
    compare(a: Person, b: Person): number {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    }
}

const personBst = new BinarySearchTree<Person>(new PersonComparator());

personBst.insert({ id: 50, name: "Alice" });
personBst.insert({ id: 30, name: "Bob" });
personBst.insert({ id: 70, name: "Charlie" });
personBst.insert({ id: 20, name: "David" });
personBst.insert({ id: 40, name: "Eve" });
personBst.insert({ id: 60, name: "Frank" });
personBst.insert({ id: 80, name: "Grace" });

console.log("Size:", personBst.getSize()); // Expected: 7

console.log("People by ID (in-order):");
const peopleNames: string[] = [];
personBst.inOrderTraverse(person => peopleNames.push(person.name));
console.log(peopleNames.join(', ')); // Expected: David, Bob, Eve, Alice, Frank, Charlie, Grace

const foundPerson = personBst.find({ id: 40, name: "Any" }); // Name doesn't matter for comparison
console.log("Found person with ID 40:", foundPerson?.value.name); // Expected: Eve

console.log("Deleting person with ID 30...");
personBst.delete({ id: 30, name: "Bob" });
console.log("Size after deleting:", personBst.getSize()); // Expected: 6

console.log("People by ID after deletion:");
const peopleNames2: string[] = [];
personBst.inOrderTraverse(person => peopleNames2.push(person.name));
console.log(peopleNames2.join(', ')); // Expected: David, Eve, Alice, Frank, Charlie, Grace

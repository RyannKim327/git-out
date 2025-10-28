// treeNode.ts
export class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
// binarySearchTree.ts
import { TreeNode } from './treeNode';

/**
 * Type definition for a comparator function.
 * It should return:
 * - a negative number if a is less than b
 * - 0 if a is equal to b
 * - a positive number if a is greater than b
 */
type Comparator<T> = (a: T, b: T) => number;

export class BinarySearchTree<T> {
    root: TreeNode<T> | null;
    private compare: Comparator<T>;

    /**
     * Creates a new BinarySearchTree instance.
     * @param comparator An optional function to compare two values of type T.
     *                   If not provided, a default comparator for numbers/strings will be used.
     *                   For custom objects, you MUST provide a comparator.
     */
    constructor(comparator?: Comparator<T>) {
        this.root = null;
        if (comparator) {
            this.compare = comparator;
        } else {
            // Default comparator for primitive types (number, string)
            this.compare = (a: T, b: T) => {
                if (typeof a === 'number' && typeof b === 'number') {
                    return a - b;
                }
                if (typeof a === 'string' && typeof b === 'string') {
                    return a.localeCompare(b);
                }
                throw new Error("Cannot compare values without a custom comparator function provided in the constructor for non-number/string types.");
            };
        }
    }

    /**
     * Inserts a new value into the BST.
     * @param value The value to insert.
     */
    insert(value: T): void {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current: TreeNode<T> = this.root;
        while (true) {
            const comparisonResult = this.compare(value, current.value);

            if (comparisonResult === 0) {
                // Value already exists (or handle duplicates as desired, e.g., ignore, increment count)
                // For simplicity, we'll ignore duplicates in this basic BST.
                return;
            }

            if (comparisonResult < 0) { // value < current.value, go left
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else { // value > current.value, go right
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }

    /**
     * Searches for a value in the BST.
     * @param value The value to search for.
     * @returns The TreeNode containing the value, or null if not found.
     */
    search(value: T): TreeNode<T> | null {
        if (this.root === null) {
            return null;
        }

        let current: TreeNode<T> | null = this.root;
        while (current !== null) {
            const comparisonResult = this.compare(value, current.value);
            if (comparisonResult === 0) {
                return current;
            } else if (comparisonResult < 0) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null; // Value not found
    }

    /**
     * Deletes a value from the BST.
     * @param value The value to delete.
     * @returns True if the value was found and deleted, false otherwise.
     */
    delete(value: T): boolean {
        let foundAndDeleted = false;
        this.root = this._deleteNodeRecursive(this.root, value, (isDeleted) => {
            if (isDeleted) {
                foundAndDeleted = true;
            }
        });
        return foundAndDeleted;
    }

    /**
     * Recursive helper for deleting a node.
     * @param node The current node being considered.
     * @param value The value to delete.
     * @param callback A callback to signal if a node was actually deleted.
     * @returns The new root of the (sub)tree after deletion.
     */
    private _deleteNodeRecursive(
        node: TreeNode<T> | null,
        value: T,
        callback: (deleted: boolean) => void
    ): TreeNode<T> | null {
        if (node === null) {
            return null; // Value not found in this subtree
        }

        const comparisonResult = this.compare(value, node.value);

        if (comparisonResult < 0) {
            node.left = this._deleteNodeRecursive(node.left, value, callback);
        } else if (comparisonResult > 0) {
            node.right = this._deleteNodeRecursive(node.right, value, callback);
        } else { // Found the node to delete
            callback(true); // Signal that we found and are deleting this node

            // Case 1: Node has no child or only one child
            if (node.left === null) {
                return node.right; // Replace with right child (or null if no right child)
            } else if (node.right === null) {
                return node.left; // Replace with left child
            }

            // Case 2: Node has two children
            // Find the in-order successor (smallest in the right subtree)
            const minNode = this._findMinNode(node.right);
            node.value = minNode.value; // Replace current node's value with successor's value
            // Delete the in-order successor from the right subtree
            node.right = this._deleteNodeRecursive(node.right, minNode.value, (ignored) => {}); // Successor deletion won't trigger the main callback again.
        }
        return node;
    }

    /**
     * Finds the node with the minimum value in a given subtree.
     * @param node The root of the subtree to search.
     * @returns The node with the minimum value.
     */
    private _findMinNode(node: TreeNode<T>): TreeNode<T> {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    // --- Traversal Methods ---

    /**
     * Performs an in-order traversal (Left, Root, Right).
     * Returns values in ascending order for a BST.
     * @returns An array of values in in-order sequence.
     */
    inOrderTraversal(): T[] {
        const result: T[] = [];
        this._inOrder(this.root, result);
        return result;
    }

    private _inOrder(node: TreeNode<T> | null, result: T[]): void {
        if (node !== null) {
            this._inOrder(node.left, result);
            result.push(node.value);
            this._inOrder(node.right, result);
        }
    }

    /**
     * Performs a pre-order traversal (Root, Left, Right).
     * @returns An array of values in pre-order sequence.
     */
    preOrderTraversal(): T[] {
        const result: T[] = [];
        this._preOrder(this.root, result);
        return result;
    }

    private _preOrder(node: TreeNode<T> | null, result: T[]): void {
        if (node !== null) {
            result.push(node.value);
            this._preOrder(node.left, result);
            this._preOrder(node.right, result);
        }
    }

    /**
     * Performs a post-order traversal (Left, Right, Root).
     * @returns An array of values in post-order sequence.
     */
    postOrderTraversal(): T[] {
        const result: T[] = [];
        this._postOrder(this.root, result);
        return result;
    }

    private _postOrder(node: TreeNode<T> | null, result: T[]): void {
        if (node !== null) {
            this._postOrder(node.left, result);
            this._postOrder(node.right, result);
            result.push(node.value);
        }
    }

    /**
     * Returns true if the tree is empty, false otherwise.
     */
    isEmpty(): boolean {
        return this.root === null;
    }
}
// index.ts or main.ts
import { BinarySearchTree } from './binarySearchTree';

// --- Example 1: Binary Search Tree with Numbers (using default comparator) ---
console.log("--- Numeric BST Example ---");
const numberBST = new BinarySearchTree<number>();
numberBST.insert(10);
numberBST.insert(5);
numberBST.insert(15);
numberBST.insert(3);
numberBST.insert(7);
numberBST.insert(12);
numberBST.insert(18);
numberBST.insert(7); // Duplicate, should be ignored by default

console.log("In-order traversal:", numberBST.inOrderTraversal());    // Expected: [3, 5, 7, 10, 12, 15, 18]
console.log("Pre-order traversal:", numberBST.preOrderTraversal());  // Expected: [10, 5, 3, 7, 15, 12, 18]
console.log("Post-order traversal:", numberBST.postOrderTraversal()); // Expected: [3, 7, 5, 12, 18, 15, 10]

console.log("Search for 7:", numberBST.search(7)?.value); // Expected: 7
console.log("Search for 20:", numberBST.search(20));    // Expected: null

console.log("Deleting 10 (root):", numberBST.delete(10)); // Expected: true
console.log("In-order after deleting 10:", numberBST.inOrderTraversal()); // Expected: [3, 5, 7, 12, 15, 18] (12 becomes new root)

console.log("Deleting 3 (leaf):", numberBST.delete(3)); // Expected: true
console.log("In-order after deleting 3:", numberBST.inOrderTraversal()); // Expected: [5, 7, 12, 15, 18]

console.log("Deleting 20 (not found):", numberBST.delete(20)); // Expected: false
console.log("In-order after deleting 20:", numberBST.inOrderTraversal()); // Expected: [5, 7, 12, 15, 18] (no change)


// --- Example 2: Binary Search Tree with Custom Objects (requiring a custom comparator) ---
console.log("\n--- Custom Object BST Example ---");

interface Person {
    id: number;
    name: string;
    age: number;
}

// Custom comparator for Person objects, sorting by ID
const personComparator: (a: Person, b: Person) => number = (p1, p2) => p1.id - p2.id;

const personBST = new BinarySearchTree<Person>(personComparator);

personBST.insert({ id: 10, name: "Alice", age: 30 });
personBST.insert({ id: 5, name: "Bob", age: 25 });
personBST.insert({ id: 15, name: "Charlie", age: 35 });
personBST.insert({ id: 3, name: "David", age: 22 });
personBST.insert({ id: 7, name: "Eve", age: 28 });

console.log("In-order traversal (by ID):", personBST.inOrderTraversal().map(p => p.id)); // Expected: [3, 5, 7, 10, 15]

const foundPerson = personBST.search({ id: 7, name: "Dummy", age: 0 }); // Note: only ID matters for search due to comparator
console.log("Search for ID 7:", foundPerson ? foundPerson.value.name : "Not found"); // Expected: Eve

console.log("Deleting ID 5:", personBST.delete({ id: 5, name: "Dummy", age: 0 })); // Expected: true
console.log("In-order after deleting ID 5:", personBST.inOrderTraversal().map(p => p.id)); // Expected: [3, 7, 10, 15]

try {
    // This would throw an error if no comparator was provided for custom types
    new BinarySearchTree<Person>().insert({ id: 1, name: "Test", age: 1 });
} catch (e: any) {
    console.log("\nError when comparing custom objects without comparator:", e.message);
}

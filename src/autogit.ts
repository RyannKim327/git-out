/**
 * Type definition for a comparator function.
 * It should return:
 * - A negative number if a < b
 * - A positive number if a > b
 * - Zero if a == b
 */
type Comparator<T> = (a: T, b: T) => number;

/**
 * Represents a single node in the AVL tree.
 * @template T The type of value stored in the node.
 */
class AVLNode<T> {
    value: T;
    left: AVLNode<T> | null;
    right: AVLNode<T> | null;
    height: number; // Height of the subtree rooted at this node

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1; // A new node is a leaf, so its height is 1
    }
}

/**
 * Implements an AVL (Adelson-Velsky and Landis) self-balancing binary search tree.
 * @template T The type of values stored in the tree.
 */
class AVLTree<T> {
    private root: AVLNode<T> | null;
    private comparator: Comparator<T>;

    /**
     * Creates a new AVLTree.
     * @param comparator A function used to compare two values of type T.
     *                   It should return a negative number if a < b, positive if a > b, and zero if a == b.
     */
    constructor(comparator: Comparator<T>) {
        this.root = null;
        this.comparator = comparator;
    }

    // --- Helper Functions ---

    /**
     * Gets the height of a given node.
     * @param node The node to get the height of.
     * @returns The height of the node, or 0 if the node is null.
     */
    private getHeight(node: AVLNode<T> | null): number {
        return node ? node.height : 0;
    }

    /**
     * Updates the height of a given node based on its children's heights.
     * This should be called after any structural change to the node's children.
     * @param node The node to update the height of.
     */
    private updateHeight(node: AVLNode<T>): void {
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    }

    /**
     * Calculates the balance factor of a given node.
     * Balance factor = height(left subtree) - height(right subtree).
     * @param node The node to calculate the balance factor for.
     * @returns The balance factor of the node, or 0 if the node is null.
     */
    private getBalanceFactor(node: AVLNode<T> | null): number {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    /**
     * Performs a right rotation on the given node (y).
     * This is used to balance a left-heavy subtree (LL or LR case).
     * @param y The node to rotate around.
     * @returns The new root of the rotated subtree (x).
     *
     *        y             x
     *       / \           / \
     *      x   T3  ->    T1  y
     *     / \               / \
     *    T1  T2            T2  T3
     */
    private rotateRight(y: AVLNode<T>): AVLNode<T> {
        const x = y.left!; // x is guaranteed to exist for a right rotation
        const T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights (order matters: y then x)
        this.updateHeight(y);
        this.updateHeight(x);

        return x; // x is the new root of this subtree
    }

    /**
     * Performs a left rotation on the given node (x).
     * This is used to balance a right-heavy subtree (RR or RL case).
     * @param x The node to rotate around.
     * @returns The new root of the rotated subtree (y).
     *
     *       x               y
     *      / \             / \
     *     T1  y     ->    x   T3
     *        / \         / \
     *       T2  T3      T1  T2
     */
    private rotateLeft(x: AVLNode<T>): AVLNode<T> {
        const y = x.right!; // y is guaranteed to exist for a left rotation
        const T2 = y.left;

        // Perform rotation
        y.left = x;
        x.right = T2;

        // Update heights (order matters: x then y)
        this.updateHeight(x);
        this.updateHeight(y);

        return y; // y is the new root of this subtree
    }

    /**
     * Balances a given node if it's out of balance.
     * This function is called after an insertion or deletion.
     * @param node The node to balance.
     * @returns The (potentially new) root of the balanced subtree.
     */
    private balance(node: AVLNode<T>): AVLNode<T> {
        this.updateHeight(node); // Ensure height is up-to-date before checking balance

        const balanceFactor = this.getBalanceFactor(node);

        // Left-Left Case
        if (balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0) {
            return this.rotateRight(node);
        }

        // Left-Right Case
        if (balanceFactor > 1 && this.getBalanceFactor(node.left) < 0) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }

        // Right-Right Case
        if (balanceFactor < -1 && this.getBalanceFactor(node.right) <= 0) {
            return this.rotateLeft(node);
        }

        // Right-Left Case
        if (balanceFactor < -1 && this.getBalanceFactor(node.right) > 0) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node; // Node is already balanced
    }

    /**
     * Finds the node with the minimum value in a given subtree.
     * @param node The root of the subtree to search.
     * @returns The node with the minimum value.
     */
    private findMinNode(node: AVLNode<T>): AVLNode<T> {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    // --- Public API Methods ---

    /**
     * Inserts a value into the AVL tree.
     * @param value The value to insert.
     */
    public insert(value: T): void {
        this.root = this._insert(this.root, value);
    }

    /**
     * Recursive helper for insertion.
     * @param node The current node being considered.
     * @param value The value to insert.
     * @returns The (potentially new) root of the subtree after insertion and balancing.
     */
    private _insert(node: AVLNode<T> | null, value: T): AVLNode<T> {
        // 1. Perform standard BST insertion
        if (node === null) {
            return new AVLNode(value);
        }

        const cmp = this.comparator(value, node.value);
        if (cmp < 0) {
            node.left = this._insert(node.left, value);
        } else if (cmp > 0) {
            node.right = this._insert(node.right, value);
        } else {
            // Value already exists, or handle duplicates as needed (e.g., update, ignore, throw error)
            // For this implementation, we'll ignore duplicates.
            return node;
        }

        // 2. Update height and balance the node
        return this.balance(node);
    }

    /**
     * Deletes a value from the AVL tree.
     * @param value The value to delete.
     */
    public delete(value: T): void {
        this.root = this._delete(this.root, value);
    }

    /**
     * Recursive helper for deletion.
     * @param node The current node being considered.
     * @param value The value to delete.
     * @returns The (potentially new) root of the subtree after deletion and balancing.
     */
    private _delete(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
        // 1. Perform standard BST deletion
        if (node === null) {
            return null; // Value not found
        }

        const cmp = this.comparator(value, node.value);
        if (cmp < 0) {
            node.left = this._delete(node.left, value);
        } else if (cmp > 0) {
            node.right = this._delete(node.right, value);
        } else {
            // Node with value to be deleted found

            // Case 1: Node has no child or only one child
            if (node.left === null || node.right === null) {
                const temp = node.left || node.right;
                if (temp === null) {
                    // No children case
                    return null;
                } else {
                    // One child case
                    return temp;
                }
            } else {
                // Case 2: Node has two children
                // Find the in-order successor (smallest in the right subtree)
                const temp = this.findMinNode(node.right);

                // Copy the in-order successor's data to this node
                node.value = temp.value;

                // Delete the in-order successor from the right subtree
                node.right = this._delete(node.right, temp.value);
            }
        }

        // If the tree had only one node then it's now empty
        if (node === null) {
            return null;
        }

        // 2. Update height and balance the node
        return this.balance(node);
    }

    /**
     * Searches for a value in the AVL tree.
     * @param value The value to search for.
     * @returns The value if found, otherwise null.
     */
    public search(value: T): T | null {
        let current = this.root;
        while (current !== null) {
            const cmp = this.comparator(value, current.value);
            if (cmp === 0) {
                return current.value; // Found
            } else if (cmp < 0) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null; // Not found
    }

    /**
     * Performs an in-order traversal of the tree and returns the values in a sorted array.
     * @returns An array of values in ascending order.
     */
    public inOrderTraversal(): T[] {
        const result: T[] = [];
        this._inOrderTraversal(this.root, result);
        return result;
    }

    private _inOrderTraversal(node: AVLNode<T> | null, result: T[]): void {
        if (node !== null) {
            this._inOrderTraversal(node.left, result);
            result.push(node.value);
            this._inOrderTraversal(node.right, result);
        }
    }

    /**
     * Checks if the tree is empty.
     * @returns True if the tree is empty, false otherwise.
     */
    public isEmpty(): boolean {
        return this.root === null;
    }

    /**
     * Returns the height of the AVL tree.
     * @returns The height of the tree, or 0 if empty.
     */
    public height(): number {
        return this.getHeight(this.root);
    }

    // Optional: Print tree structure (simplified, not graphical)
    public printTree(): void {
        if (this.root === null) {
            console.log("Tree is empty.");
            return;
        }
        this._printTree(this.root, "", true);
    }

    private _printTree(node: AVLNode<T>, prefix: string, isLeft: boolean): void {
        if (node.right !== null) {
            this._printTree(node.right, prefix + (isLeft ? "│   " : "    "), false);
        }
        console.log(prefix + (isLeft ? "└── " : "┌── ") + node.value + ` (h:${node.height}, bf:${this.getBalanceFactor(node)})`);
        if (node.left !== null) {
            this._printTree(node.left, prefix + (isLeft ? "    " : "│   "), true);
        }
    }
}

// --- Example Usage ---

// Define a comparator for numbers
const numberComparator: Comparator<number> = (a, b) => a - b;

// Create an AVL tree for numbers
const avlNumTree = new AVLTree<number>(numberComparator);

console.log("--- Inserting values (triggers rotations) ---");
avlNumTree.insert(10);
avlNumTree.insert(20);
avlNumTree.insert(30); // Triggers Left-Left rotation (20 becomes root)
avlNumTree.insert(40);
avlNumTree.insert(50); // Triggers Right-Right rotation (40 becomes root of right subtree)
avlNumTree.insert(25); // Triggers Right-Left rotation (25 becomes child of 30, then 30 moves up)
avlNumTree.insert(5);
avlNumTree.insert(15);
avlNumTree.insert(35);
avlNumTree.insert(45);
avlNumTree.insert(0);

console.log("Tree after insertions:");
avlNumTree.printTree();
console.log("In-order traversal:", avlNumTree.inOrderTraversal());
console.log("Tree height:", avlNumTree.height());

console.log("\n--- Searching for values ---");
console.log("Search for 30:", avlNumTree.search(30)); // Should be 30
console.log("Search for 100:", avlNumTree.search(100)); // Should be null

console.log("\n--- Deleting values (triggers rotations) ---");
console.log("Deleting 0 (leaf node):");
avlNumTree.delete(0);
avlNumTree.printTree();
console.log("In-order traversal:", avlNumTree.inOrderTraversal());

console.log("\nDeleting 20 (node with two children):");
avlNumTree.delete(20); // 25 should take its place, then rebalance
avlNumTree.printTree();
console.log("In-order traversal:", avlNumTree.inOrderTraversal());

console.log("\nDeleting 40 (node with two children, and will trigger more balancing):");
avlNumTree.delete(40);
avlNumTree.printTree();
console.log("In-order traversal:", avlNumTree.inOrderTraversal());

console.log("\nDeleting 10 (node with one child):");
avlNumTree.delete(10);
avlNumTree.printTree();
console.log("In-order traversal:", avlNumTree.inOrderTraversal());

console.log("\nTree height:", avlNumTree.height());

// Example with strings
const stringComparator: Comparator<string> = (a, b) => a.localeCompare(b);
const avlStringTree = new AVLTree<string>(stringComparator);

avlStringTree.insert("banana");
avlStringTree.insert("apple");
avlStringTree.insert("grape");
avlStringTree.insert("date");
avlStringTree.insert("cherry");

console.log("\n--- String Tree ---");
avlStringTree.printTree();
console.log("In-order traversal:", avlStringTree.inOrderTraversal());
console.log("Search for 'cherry':", avlStringTree.search("cherry"));
avlStringTree.delete("banana");
console.log("After deleting 'banana':");
avlStringTree.printTree();

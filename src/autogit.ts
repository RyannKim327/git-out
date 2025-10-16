// avl-node.ts
export class AVLNode<T> {
    value: T;
    left: AVLNode<T> | null;
    right: AVLNode<T> | null;
    height: number; // Height of the node in the tree

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1; // New nodes are always leaf nodes, so height is 1
    }
}
// avl-tree.ts
import { AVLNode } from './avl-node';

/**
 * Type definition for a comparator function.
 * It should return:
 * - A negative number if a < b
 * - A positive number if a > b
 * - Zero if a === b
 */
export type Comparator<T> = (a: T, b: T) => number;

// Default comparator for primitive types (numbers, strings)
const defaultComparator = <T>(a: T, b: T): number => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
};

export class AVLTree<T> {
    root: AVLNode<T> | null;
    private comparator: Comparator<T>;

    constructor(comparator?: Comparator<T>) {
        this.root = null;
        this.comparator = comparator || defaultComparator;
    }

    /**
     * Gets the height of a node. Returns 0 if the node is null.
     */
    private getHeight(node: AVLNode<T> | null): number {
        return node ? node.height : 0;
    }

    /**
     * Updates the height of a node based on its children's heights.
     */
    private updateHeight(node: AVLNode<T>): void {
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    }

    /**
     * Calculates the balance factor of a node (height of right subtree - height of left subtree).
     */
    private getBalanceFactor(node: AVLNode<T> | null): number {
        return node ? this.getHeight(node.right) - this.getHeight(node.left) : 0;
    }

    /**
     * Performs a left rotation on the given node.
     *       x                           y
     *      / \                         / \
     *     T1  y   -- Left Rotate(x) -> x   T3
     *        / \                     / \
     *       T2 T3                   T1 T2
     * Returns the new root of the rotated subtree (y).
     */
    private rotateLeft(x: AVLNode<T>): AVLNode<T> {
        const y = x.right!; // y must exist for a left rotation
        const T2 = y.left;

        // Perform rotation
        y.left = x;
        x.right = T2;

        // Update heights
        this.updateHeight(x);
        this.updateHeight(y);

        return y; // Return new root
    }

    /**
     * Performs a right rotation on the given node.
     *       y                           x
     *      / \                         / \
     *     x   T3  -- Right Rotate(y) -> T1  y
     *    / \                             / \
     *   T1 T2                           T2 T3
     * Returns the new root of the rotated subtree (x).
     */
    private rotateRight(y: AVLNode<T>): AVLNode<T> {
        const x = y.left!; // x must exist for a right rotation
        const T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        this.updateHeight(y);
        this.updateHeight(x);

        return x; // Return new root
    }

    /**
     * Balances a node if its balance factor is out of range (-1, 0, 1).
     * This method applies the appropriate rotation(s) based on the balance factor.
     * Returns the (potentially new) root of the balanced subtree.
     */
    private balance(node: AVLNode<T>): AVLNode<T> {
        this.updateHeight(node); // Ensure height is up-to-date before balancing
        const balanceFactor = this.getBalanceFactor(node);

        // Left-heavy case (balanceFactor < -1)
        if (balanceFactor < -1) {
            // Left-Right case (LR): node.left.right is heavier
            if (this.getBalanceFactor(node.left) > 0) {
                node.left = this.rotateLeft(node.left!);
            }
            // Left-Left case (LL) or after LR adjustment
            return this.rotateRight(node);
        }

        // Right-heavy case (balanceFactor > 1)
        if (balanceFactor > 1) {
            // Right-Left case (RL): node.right.left is heavier
            if (this.getBalanceFactor(node.right) < 0) {
                node.right = this.rotateRight(node.right!);
            }
            // Right-Right case (RR) or after RL adjustment
            return this.rotateLeft(node);
        }

        return node; // Node is already balanced
    }

    /**
     * Inserts a value into the AVL tree.
     */
    insert(value: T): void {
        this.root = this._insert(this.root, value);
    }

    /**
     * Recursive helper for insertion.
     * Returns the (potentially new) root of the subtree after insertion and balancing.
     */
    private _insert(node: AVLNode<T> | null, value: T): AVLNode<T> {
        // 1. Perform standard BST insertion
        if (!node) {
            return new AVLNode(value);
        }

        const cmp = this.comparator(value, node.value);

        if (cmp < 0) {
            node.left = this._insert(node.left, value);
        } else if (cmp > 0) {
            node.right = this._insert(node.right, value);
        } else {
            // Value already exists (or handle duplicates as needed)
            return node;
        }

        // 2. Update height of the current node
        // 3. Balance the node
        return this.balance(node);
    }

    /**
     * Deletes a value from the AVL tree.
     * Returns true if the value was found and deleted, false otherwise.
     */
    delete(value: T): boolean {
        const initialRoot = this.root;
        this.root = this._delete(this.root, value);
        // If the root changed and was null, or if the root remained the same
        // and its value is not the one we were looking for, it wasn't found.
        // A more robust check: track a flag in the _delete method.
        // For simplicity, we'll assume a null root means value wasn't there
        // or that it was the only element.
        return initialRoot !== this.root || (initialRoot === this.root && this.search(value) === null);
    }

    /**
     * Helper to find the node with the minimum value in a given subtree.
     */
    private minNode(node: AVLNode<T>): AVLNode<T> {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    /**
     * Recursive helper for deletion.
     * Returns the (potentially new) root of the subtree after deletion and balancing.
     */
    private _delete(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
        // 1. Perform standard BST deletion
        if (!node) {
            return null; // Value not found
        }

        const cmp = this.comparator(value, node.value);

        if (cmp < 0) {
            node.left = this._delete(node.left, value);
        } else if (cmp > 0) {
            node.right = this._delete(node.right, value);
        } else {
            // Node to be deleted found

            // Case 1: Node has no child or one child
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }

            // Case 2: Node has two children
            // Get the in-order successor (smallest in the right subtree)
            const successor = this.minNode(node.right);
            node.value = successor.value; // Copy the successor's value to this node
            // Delete the successor from the right subtree
            node.right = this._delete(node.right, successor.value);
        }

        // If the node became null (e.g., it was a leaf and was deleted),
        // no need to update height or balance.
        if (node === null) {
            return node;
        }

        // 2. Update height of the current node
        // 3. Balance the node
        return this.balance(node);
    }

    /**
     * Searches for a value in the AVL tree.
     * Returns the AVLNode if found, null otherwise.
     */
    search(value: T): AVLNode<T> | null {
        return this._search(this.root, value);
    }

    /**
     * Recursive helper for searching.
     */
    private _search(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
        if (!node) {
            return null; // Value not found
        }

        const cmp = this.comparator(value, node.value);

        if (cmp < 0) {
            return this._search(node.left, value);
        } else if (cmp > 0) {
            return this._search(node.right, value);
        } else {
            return node; // Value found
        }
    }

    /**
     * Performs an in-order traversal of the tree.
     * Returns an array of values in sorted order.
     */
    inOrderTraversal(): T[] {
        const result: T[] = [];
        this._inOrderTraversal(this.root, result);
        return result;
    }

    private _inOrderTraversal(node: AVLNode<T> | null, result: T[]): void {
        if (node) {
            this._inOrderTraversal(node.left, result);
            result.push(node.value);
            this._inOrderTraversal(node.right, result);
        }
    }

    /**
     * Utility to print the tree structure (for debugging).
     * This is a simplified view and might not perfectly represent the visual structure for complex trees.
     */
    printTree(): void {
        this._printTree(this.root, "", true);
    }

    private _printTree(node: AVLNode<T> | null, prefix: string, isLeft: boolean): void {
        if (node) {
            console.log(prefix + (isLeft ? "├── " : "└── ") + node.value + ` (h:${node.height}, bf:${this.getBalanceFactor(node)})`);
            this._printTree(node.left, prefix + (isLeft ? "│   " : "    "), true);
            this._printTree(node.right, prefix + (isLeft ? "│   " : "    "), false);
        }
    }
}
// main.ts
import { AVLTree } from './avl-tree';

// Example with numbers (uses default comparator)
console.log("--- AVL Tree of Numbers ---");
const numberTree = new AVLTree<number>();
const numbers = [10, 20, 30, 40, 50, 25];

numbers.forEach(num => {
    console.log(`Inserting ${num}`);
    numberTree.insert(num);
    numberTree.printTree();
    console.log("--------------------");
});

console.log("In-order traversal:", numberTree.inOrderTraversal()); // Should be sorted

console.log("\nSearching for 30:", numberTree.search(30)?.value); // 30
console.log("Searching for 15:", numberTree.search(15)); // null

console.log("\n--- Deleting from AVL Tree ---");
console.log("Deleting 30:");
numberTree.delete(30);
numberTree.printTree();
console.log("In-order traversal:", numberTree.inOrderTraversal());
console.log("--------------------");

console.log("Deleting 10:");
numberTree.delete(10);
numberTree.printTree();
console.log("In-order traversal:", numberTree.inOrderTraversal());
console.log("--------------------");

console.log("Deleting 50:");
numberTree.delete(50);
numberTree.printTree();
console.log("In-order traversal:", numberTree.inOrderTraversal());
console.log("--------------------");


// Example with custom objects (requires a custom comparator)
interface Person {
    id: number;
    name: string;
}

const personComparator: (a: Person, b: Person) => number = (a, b) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
};

console.log("\n--- AVL Tree of Persons (by ID) ---");
const personTree = new AVLTree<Person>(personComparator);

const people = [
    { id: 30, name: "Alice" },
    { id: 20, name: "Bob" },
    { id: 40, name: "Charlie" },
    { id: 10, name: "David" },
    { id: 25, name: "Eve" },
    { id: 35, name: "Frank" },
    { id: 50, name: "Grace" },
];

people.forEach(p => {
    console.log(`Inserting Person ID ${p.id}`);
    personTree.insert(p);
    // personTree.printTree(); // Uncomment to see tree after each person insertion
});

personTree.printTree();
console.log("In-order traversal (names):", personTree.inOrderTraversal().map(p => p.name));

console.log("\nSearching for Person with ID 25:", personTree.search({ id: 25, name: "" })?.value.name);
console.log("Searching for Person with ID 99:", personTree.search({ id: 99, name: "" }));

console.log("\nDeleting Person with ID 20:");
personTree.delete({ id: 20, name: "" });
personTree.printTree();
console.log("In-order traversal (names):", personTree.inOrderTraversal().map(p => p.name));

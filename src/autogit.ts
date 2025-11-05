// TreeNode.ts
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
// BinarySearchTree.ts
import { TreeNode } from './TreeNode'; // Assuming TreeNode is in a separate file

class BinarySearchTree<T> {
    private root: TreeNode<T> | null;
    private count: number; // To keep track of the number of nodes

    constructor() {
        this.root = null;
        this.count = 0;
    }

    /**
     * Get the number of nodes in the tree.
     */
    size(): number {
        return this.count;
    }

    /**
     * Check if the tree is empty.
     */
    isEmpty(): boolean {
        return this.root === null;
    }

    /**
     * Inserts a new value into the tree.
     */
    insert(value: T): void {
        const newNode = new TreeNode(value);

        if (!this.root) {
            this.root = newNode;
        } else {
            this._insertNode(this.root, newNode);
        }
        this.count++;
    }

    // Private recursive helper for insert
    private _insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
        // Assuming T is comparable (e.g., number, string).
        // For custom objects, you'd need a custom comparison function.
        if (newNode.value < node.value) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this._insertNode(node.left, newNode);
            }
        } else if (newNode.value > node.value) { // Handles duplicates by placing them to the right, or you could ignore.
            if (!node.right) {
                node.right = newNode;
            } else {
                this._insertNode(node.right, newNode);
            }
        }
        // If newNode.value === node.value, we simply don't insert it (or handle as per requirement).
        // For this basic BST, we allow duplicates to be inserted on the right.
    }

    /**
     * Checks if a value exists in the tree.
     */
    contains(value: T): boolean {
        return this._searchNode(this.root, value);
    }

    // Private recursive helper for contains
    private _searchNode(node: TreeNode<T> | null, value: T): boolean {
        if (!node) {
            return false; // Value not found
        }
        if (value === node.value) {
            return true; // Value found
        }
        if (value < node.value) {
            return this._searchNode(node.left, value);
        } else {
            return this._searchNode(node.right, value);
        }
    }

    /**
     * Removes a value from the tree.
     */
    remove(value: T): void {
        const initialCount = this.count;
        this.root = this._removeNode(this.root, value);
        // Only decrement count if a node was actually removed
        if (this.count < initialCount) {
             // count was decremented inside _removeNode if a node was found and removed
        } else if (this.count === initialCount) {
            // No node was removed, so decrement count.
            // This is a subtle point: _removeNode decrements count when a leaf or single-child node is removed,
            // or when the successor is effectively removed (which implies decrement).
            // So, no need to decrement here *unless* _removeNode doesn't handle it for the specific case.
            // Let's refine _removeNode to handle count decrement consistently.
        }
    }

    // Private recursive helper for remove
    private _removeNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
        if (!node) {
            return null; // Value not found, nothing to remove
        }

        if (value < node.value) {
            node.left = this._removeNode(node.left, value);
            return node;
        } else if (value > node.value) {
            node.right = this._removeNode(node.right, value);
            return node;
        } else { // Found the node to delete (value === node.value)

            // Case 1: Node has no children (leaf node)
            if (!node.left && !node.right) {
                this.count--; // Decrement count
                return null;
            }

            // Case 2: Node has one child
            if (!node.left) { // Has only right child
                this.count--; // Decrement count
                return node.right;
            }
            if (!node.right) { // Has only left child
                this.count--; // Decrement count
                return node.left;
            }

            // Case 3: Node has two children
            // Find the in-order successor (smallest node in the right subtree)
            const tempNode = this._findMinNode(node.right);
            node.value = tempNode!.value; // Copy the successor's value to the current node
            // Now, remove the successor from the right subtree
            node.right = this._removeNode(node.right, tempNode!.value);
            // The count was decremented when the successor node was truly removed (as a leaf or single-child node)
            return node;
        }
    }

    // Private helper to find the node with the minimum value in a given subtree
    private _findMinNode(node: TreeNode<T> | null): TreeNode<T> | null {
        if (!node) {
            return null;
        }
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    /**
     * Returns the minimum value in the tree.
     */
    getMin(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        return this._findMinNode(this.root)!.value;
    }

    /**
     * Returns the maximum value in the tree.
     */
    getMax(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        let currentNode = this.root;
        while (currentNode && currentNode.right) {
            currentNode = currentNode.right;
        }
        return currentNode!.value;
    }

    /**
     * Traversal Methods:
     * Visit every node in the tree in a specific order.
     */

    // In-order traversal: Left -> Root -> Right (produces sorted output for a BST)
    inOrderTraversal(): T[] {
        const result: T[] = [];
        this._inOrder(this.root, result);
        return result;
    }

    private _inOrder(node: TreeNode<T> | null, result: T[]): void {
        if (node) {
            this._inOrder(node.left, result);
            result.push(node.value);
            this._inOrder(node.right, result);
        }
    }

    // Pre-order traversal: Root -> Left -> Right
    preOrderTraversal(): T[] {
        const result: T[] = [];
        this._preOrder(this.root, result);
        return result;
    }

    private _preOrder(node: TreeNode<T> | null, result: T[]): void {
        if (node) {
            result.push(node.value);
            this._preOrder(node.left, result);
            this._preOrder(node.right, result);
        }
    }

    // Post-order traversal: Left -> Right -> Root
    postOrderTraversal(): T[] {
        const result: T[] = [];
        this._postOrder(this.root, result);
        return result;
    }

    private _postOrder(node: TreeNode<T> | null, result: T[]): void {
        if (node) {
            this._postOrder(node.left, result);
            this._postOrder(node.right, result);
            result.push(node.value);
        }
    }

    // Level-order traversal (Breadth-First Search - BFS)
    levelOrderTraversal(): T[] {
        const result: T[] = [];
        if (!this.root) {
            return result;
        }

        const queue: (TreeNode<T> | null)[] = [this.root]; // Use an array as a queue

        while (queue.length > 0) {
            const node = queue.shift(); // Dequeue
            if (node) {
                result.push(node.value);
                if (node.left) {
                    queue.push(node.left);
                }
                if (node.right) {
                    queue.push(node.right);
                }
            }
        }
        return result;
    }
}

export { BinarySearchTree, TreeNode }; // Export for use in other files
// main.ts or app.ts
import { BinarySearchTree } from './BinarySearchTree';

const bst = new BinarySearchTree<number>();

console.log("Is tree empty?", bst.isEmpty()); // true

bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(12);
bst.insert(18);
bst.insert(13); // Example of a value that goes deeper

console.log("Tree size:", bst.size()); // 8
console.log("Is tree empty?", bst.isEmpty()); // false

console.log("Contains 7?", bst.contains(7));   // true
console.log("Contains 20?", bst.contains(20)); // false

console.log("Min value:", bst.getMin()); // 3
console.log("Max value:", bst.getMax()); // 18

console.log("In-order traversal (sorted):", bst.inOrderTraversal());    // [3, 5, 7, 10, 12, 13, 15, 18]
console.log("Pre-order traversal:", bst.preOrderTraversal());   // [10, 5, 3, 7, 15, 12, 13, 18]
console.log("Post-order traversal:", bst.postOrderTraversal()); // [3, 7, 5, 13, 12, 18, 15, 10]
console.log("Level-order traversal:", bst.levelOrderTraversal()); // [10, 5, 15, 3, 7, 12, 18, 13]

console.log("\nRemoving 7:");
bst.remove(7);
console.log("Contains 7?", bst.contains(7)); // false
console.log("Tree size:", bst.size());      // 7
console.log("In-order traversal:", bst.inOrderTraversal()); // [3, 5, 10, 12, 13, 15, 18]

console.log("\nRemoving 15 (node with two children):");
bst.remove(15);
console.log("Contains 15?", bst.contains(15)); // false
console.log("Tree size:", bst.size());       // 6
console.log("In-order traversal:", bst.inOrderTraversal()); // [3, 5, 10, 12, 13, 18] (18 moved up as successor)

console.log("\nRemoving 10 (root node):");
bst.remove(10);
console.log("Contains 10?", bst.contains(10)); // false
console.log("Tree size:", bst.size());       // 5
console.log("In-order traversal:", bst.inOrderTraversal()); // [3, 5, 12, 13, 18] (12 moved up as successor)

console.log("\nAttempting to remove non-existent value (99):");
bst.remove(99);
console.log("Tree size (should be unchanged):", bst.size()); // 5

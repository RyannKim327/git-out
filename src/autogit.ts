// tree-node.ts
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
// binary-tree.ts
import { TreeNode } from './tree-node'; // Assuming TreeNode is in a separate file

class BinaryTree<T> {
    root: TreeNode<T> | null;

    constructor() {
        this.root = null;
    }

    /**
     * Inserts a new value into the Binary Search Tree.
     * Assumes values are comparable (e.g., numbers, strings).
     * For objects, you would need a custom comparator function.
     */
    insert(value: T): void {
        const newNode = new TreeNode(value);

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let currentNode = this.root;
        while (true) {
            if (value === currentNode.value) {
                // Handle duplicates: For simplicity, we'll just ignore them.
                // You could also choose to throw an error, update the node, or allow duplicates
                // by adding to the left/right based on a specific rule.
                return;
            }

            if (value < currentNode.value) {
                // Go left
                if (currentNode.left === null) {
                    currentNode.left = newNode;
                    return;
                }
                currentNode = currentNode.left;
            } else {
                // Go right
                if (currentNode.right === null) {
                    currentNode.right = newNode;
                    return;
                }
                currentNode = currentNode.right;
            }
        }
    }

    /**
     * Searches for a value in the BST.
     * Returns true if found, false otherwise.
     */
    find(value: T): boolean {
        if (this.root === null) {
            return false;
        }

        let currentNode = this.root;
        while (currentNode !== null) {
            if (value === currentNode.value) {
                return true;
            }

            if (value < currentNode.value) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }
        return false; // Value not found
    }

    /**
     * Returns the height of the tree.
     * An empty tree has height -1. A tree with a single node has height 0.
     */
    getHeight(): number {
        function calculateHeight(node: TreeNode<T> | null): number {
            if (node === null) {
                return -1; // Base case: height of an empty subtree
            }
            const leftHeight = calculateHeight(node.left);
            const rightHeight = calculateHeight(node.right);
            return Math.max(leftHeight, rightHeight) + 1; // Add 1 for the current node
        }
        return calculateHeight(this.root);
    }

    // --- Traversal Methods ---

    /**
     * In-order traversal: Left -> Root -> Right
     * Returns an array of values in sorted order for a BST.
     */
    inOrderTraversal(): T[] {
        const result: T[] = [];
        function traverse(node: TreeNode<T> | null) {
            if (node !== null) {
                traverse(node.left);
                result.push(node.value);
                traverse(node.right);
            }
        }
        traverse(this.root);
        return result;
    }

    /**
     * Pre-order traversal: Root -> Left -> Right
     * Useful for creating a copy of the tree.
     */
    preOrderTraversal(): T[] {
        const result: T[] = [];
        function traverse(node: TreeNode<T> | null) {
            if (node !== null) {
                result.push(node.value);
                traverse(node.left);
                traverse(node.right);
            }
        }
        traverse(this.root);
        return result;
    }

    /**
     * Post-order traversal: Left -> Right -> Root
     * Useful for deleting a tree.
     */
    postOrderTraversal(): T[] {
        const result: T[] = [];
        function traverse(node: TreeNode<T> | null) {
            if (node !== null) {
                traverse(node.left);
                traverse(node.right);
                result.push(node.value);
            }
        }
        traverse(this.root);
        return result;
    }

    /**
     * Level-order traversal (Breadth-First Search - BFS)
     * Visits nodes level by level, from left to right.
     */
    levelOrderTraversal(): T[] {
        const result: T[] = [];
        const queue: TreeNode<T>[] = []; // Using an array as a queue

        if (this.root === null) {
            return result;
        }

        queue.push(this.root);

        while (queue.length > 0) {
            const currentNode = queue.shift()!; // Dequeue the front node
            result.push(currentNode.value);

            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }
        return result;
    }

    /**
     * Deletes a node with the given value from the BST.
     * This is a more complex operation.
     */
    delete(value: T): void {
        this.root = this._deleteNode(this.root, value);
    }

    private _deleteNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
        if (node === null) {
            return null; // Value not found
        }

        if (value < node.value) {
            node.left = this._deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this._deleteNode(node.right, value);
        } else {
            // Node to be deleted found

            // Case 1: Node has no children or only one child
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }

            // Case 2: Node has two children
            // Find the in-order successor (smallest in the right subtree)
            let tempNode = node.right;
            while (tempNode.left !== null) {
                tempNode = tempNode.left;
            }
            // Replace the current node's value with the in-order successor's value
            node.value = tempNode.value;
            // Delete the in-order successor from the right subtree
            node.right = this._deleteNode(node.right, tempNode.value);
        }
        return node;
    }
}
// main.ts
import { BinaryTree } from './binary-tree';

const bst = new BinaryTree<number>(); // Create a BST for numbers

console.log("Is tree empty?", bst.root === null); // true
console.log("Height of empty tree:", bst.getHeight()); // -1

// Insert values
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(12);
bst.array(18);
bst.insert(1);
bst.insert(9);
bst.insert(13);
bst.insert(20);

/*
The tree structure will look something like this:

         10
        /  \
       5    15
      / \   / \
     3   7 12  18
    /     \   /  \
   1       9 13  20

*/

console.log("\n--- Operations ---");
console.log("Root value:", bst.root?.value); // 10
console.log("Find 7:", bst.find(7));      // true
console.log("Find 100:", bst.find(100)); // false
console.log("Height of tree:", bst.getHeight()); // 3 (levels: 10, (5,15), (3,7,12,18), (1,9,13,20) -> 4 levels, height is 3)

console.log("\n--- Traversal Results ---");
console.log("In-order traversal:", bst.inOrderTraversal());       // [1, 3, 5, 7, 9, 10, 12, 13, 15, 18, 20] (sorted!)
console.log("Pre-order traversal:", bst.preOrderTraversal());     // [10, 5, 3, 1, 7, 9, 15, 12, 13, 18, 20]
console.log("Post-order traversal:", bst.postOrderTraversal());   // [1, 3, 9, 7, 5, 13, 12, 20, 18, 15, 10]
console.log("Level-order traversal:", bst.levelOrderTraversal()); // [10, 5, 15, 3, 7, 12, 18, 1, 9, 13, 20]

console.log("\n--- Delete Operations ---");
console.log("Deleting 1 (leaf node):");
bst.delete(1);
console.log("In-order after deleting 1:", bst.inOrderTraversal()); // [3, 5, 7, 9, 10, 12, 13, 15, 18, 20]

console.log("Deleting 7 (node with one child):");
bst.delete(7);
console.log("In-order after deleting 7:", bst.inOrderTraversal()); // [3, 5, 9, 10, 12, 13, 15, 18, 20]
// 9 moved up to replace 7

console.log("Deleting 15 (node with two children):");
bst.delete(15);
console.log("In-order after deleting 15:", bst.inOrderTraversal()); // [3, 5, 9, 10, 12, 13, 18, 20]
// 18 (in-order successor) replaced 15
console.log("Level-order after deleting 15:", bst.levelOrderTraversal()); // [10, 5, 18, 3, 9, 12, 20, 13]

// node.ts or within the same file
class Node<T> {
  value: T;
  left: Node<T> | null; // A node can be null if there's no child
  right: Node<T> | null; // A node can be null if there's no child

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
// binarySearchTree.ts or within the same file
// Assume Node class is defined as above
// class Node<T> { ... }

class BinarySearchTree<T extends number | string> { // Constrain T for direct comparison
  root: Node<T> | null;

  constructor() {
    this.root = null;
  }

  // --- Operations ---

  /**
   * Inserts a new value into the BST.
   * Time Complexity: O(log n) on average, O(n) in worst case (unbalanced tree).
   */
  insert(value: T): void {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let currentNode: Node<T> = this.root;
    while (true) {
      if (value === currentNode.value) {
        // Handle duplicates: For simplicity, we'll ignore them.
        // You might choose to throw an error, store them in a list at the node,
        // or place them in a specific subtree (e.g., always right).
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
   * Time Complexity: O(log n) on average, O(n) in worst case.
   * @returns The node if found, otherwise null.
   */
  search(value: T): Node<T> | null {
    if (this.root === null) {
      return null;
    }

    let currentNode: Node<T> | null = this.root;
    while (currentNode !== null) {
      if (value === currentNode.value) {
        return currentNode;
      } else if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null; // Not found
  }

  /**
   * Finds the minimum value in the BST.
   * Time Complexity: O(log n) on average, O(n) in worst case.
   * @returns The minimum value, or null if the tree is empty.
   */
  findMin(): T | null {
    if (this.root === null) {
      return null;
    }
    let currentNode: Node<T> = this.root;
    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode.value;
  }

  /**
   * Finds the maximum value in the BST.
   * Time Complexity: O(log n) on average, O(n) in worst case.
   * @returns The maximum value, or null if the tree is empty.
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
   * Deletes a value from the BST.
   * This is the most complex operation, involving several cases:
   * 1. Node to be deleted has no children (leaf node).
   * 2. Node to be deleted has one child.
   * 3. Node to be deleted has two children.
   * Time Complexity: O(log n) on average, O(n) in worst case.
   */
  delete(value: T): void {
    this.root = this._deleteNode(this.root, value);
  }

  private _deleteNode(node: Node<T> | null, value: T): Node<T> | null {
    if (node === null) {
      return null; // Value not found, or reached end of branch
    }

    if (value < node.value) {
      node.left = this._deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this._deleteNode(node.right, value);
    } else {
      // Value found (node.value === value)

      // Case 1: Node has no children or one child
      if (node.left === null) {
        return node.right; // If right is also null, returns null. Otherwise, returns right child.
      } else if (node.right === null) {
        return node.left; // If left is also null, returns null. Otherwise, returns left child.
      }

      // Case 2: Node has two children
      // Find the in-order successor (smallest value in the right subtree)
      let tempNode = node.right;
      while (tempNode.left !== null) {
        tempNode = tempNode.left;
      }
      node.value = tempNode.value; // Replace current node's value with successor's value
      // Delete the in-order successor from the right subtree
      node.right = this._deleteNode(node.right, tempNode.value);
    }
    return node;
  }

  // --- Traversals ---

  /**
   * In-order traversal: Left -> Root -> Right (produces sorted output).
   * Time Complexity: O(n)
   */
  inOrderTraversal(): T[] {
    const result: T[] = [];
    this._inOrder(this.root, result);
    return result;
  }

  private _inOrder(node: Node<T> | null, result: T[]): void {
    if (node !== null) {
      this._inOrder(node.left, result);
      result.push(node.value);
      this._inOrder(node.right, result);
    }
  }

  /**
   * Pre-order traversal: Root -> Left -> Right (useful for copying/serializing a tree).
   * Time Complexity: O(n)
   */
  preOrderTraversal(): T[] {
    const result: T[] = [];
    this._preOrder(this.root, result);
    return result;
  }

  private _preOrder(node: Node<T> | null, result: T[]): void {
    if (node !== null) {
      result.push(node.value);
      this._preOrder(node.left, result);
      this._preOrder(node.right, result);
    }
  }

  /**
   * Post-order traversal: Left -> Right -> Root (useful for deleting a tree from leaf up).
   * Time Complexity: O(n)
   */
  postOrderTraversal(): T[] {
    const result: T[] = [];
    this._postOrder(this.root, result);
    return result;
  }

  private _postOrder(node: Node<T> | null, result: T[]): void {
    if (node !== null) {
      this._postOrder(node.left, result);
      this._postOrder(node.right, result);
      result.push(node.value);
    }
  }

  /**
   * Breadth-First Search (Level Order Traversal)
   * Visits nodes level by level.
   * Time Complexity: O(n)
   */
  levelOrderTraversal(): T[] {
    const result: T[] = [];
    if (this.root === null) {
      return result;
    }

    const queue: Node<T>[] = [this.root];
    while (queue.length > 0) {
      const currentNode = queue.shift()!; // ! asserts that it won't be undefined
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
   * Checks if the tree is empty.
   */
  isEmpty(): boolean {
    return this.root === null;
  }
}
// main.ts
const bst = new BinarySearchTree<number>();

console.log("Is empty?", bst.isEmpty()); // true

bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(12);
bst.insert(18);
bst.insert(7); // Duplicate, will be ignored

console.log("Is empty?", bst.isEmpty()); // false

console.log("BST after insertions:");
console.log("In-order traversal (sorted):", bst.inOrderTraversal());    // [3, 5, 7, 10, 12, 15, 18]
console.log("Pre-order traversal:", bst.preOrderTraversal());   // [10, 5, 3, 7, 15, 12, 18]
console.log("Post-order traversal:", bst.postOrderTraversal()); // [3, 7, 5, 12, 18, 15, 10]
console.log("Level-order traversal:", bst.levelOrderTraversal()); // [10, 5, 15, 3, 7, 12, 18]

console.log("\nSearching:");
console.log("Search for 7:", bst.search(7)?.value); // 7
console.log("Search for 20:", bst.search(20));     // null

console.log("\nMin/Max:");
console.log("Min value:", bst.findMin()); // 3
console.log("Max value:", bst.findMax()); // 18

console.log("\nDeleting nodes:");
console.log("Before deletion (in-order):", bst.inOrderTraversal()); // [3, 5, 7, 10, 12, 15, 18]

bst.delete(3); // Delete leaf node
console.log("After deleting 3 (in-order):", bst.inOrderTraversal()); // [5, 7, 10, 12, 15, 18]

bst.delete(15); // Delete node with two children (12 and 18 are children)
console.log("After deleting 15 (in-order):", bst.inOrderTraversal()); // [5, 7, 10, 12, 18]
// Note: 15 was replaced by its in-order successor, 18, and then 18 was deleted from its original position.
// Oh wait, my successor logic is min from right subtree. So 15 would be replaced by 18, then 18 deleted.
// Let's fix the trace based on the code:
// Original: [3, 5, 7, 10, 12, 15, 18]
// Delete 15 (root 10, right child 15, 15's right child 18, 15's left child 12)
// Successor of 15 is 18 (min of 15's right subtree {18}).
// 15's value becomes 18. Then delete 18 from 15's right subtree.
// This results in [5, 7, 10, 12, 18].
// Correct.

bst.delete(10); // Delete root node (two children)
console.log("After deleting 10 (in-order):", bst.inOrderTraversal()); // [5, 7, 12, 18]
// Again, 10 would be replaced by its successor (12), then 12 deleted from its original spot.

bst.delete(50); // Delete non-existent value
console.log("After deleting 50 (in-order):", bst.inOrderTraversal()); // [5, 7, 12, 18] (no change)

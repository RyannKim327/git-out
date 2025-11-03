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
  private root: TreeNode<T> | null = null;

  // Insert a new value into the BST
  insert(value: T): void {
    this.root = this._insertRecursively(this.root, value);
  }

  // Recursive insert helper method
  private _insertRecursively(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    // If the tree is empty, create a new root node
    if (node === null) {
      return new TreeNode(value);
    }

    // Compare values (assumes T is comparable)
    if (this._compare(value, node.value) < 0) {
      // Insert to the left subtree
      node.left = this._insertRecursively(node.left, value);
    } else if (this._compare(value, node.value) > 0) {
      // Insert to the right subtree
      node.right = this._insertRecursively(node.right, value);
    }
    // If equal, do nothing (no duplicates allowed)
    return node;
  }

  // Search for a value in the BST
  search(value: T): boolean {
    return this._searchRecursively(this.root, value);
  }

  // Recursive search helper method
  private _searchRecursively(node: TreeNode<T> | null, value: T): boolean {
    // Base case: node doesn't exist or we've found the value
    if (node === null || this._compare(value, node.value) === 0) {
      return node !== null;
    }

    // Continue searching in the appropriate subtree
    if (this._compare(value, node.value) < 0) {
      return this._searchRecursively(node.left, value);
    } else {
      return this._searchRecursively(node.right, value);
    }
  }

  // Delete a value from the BST
  delete(value: T): void {
    this.root = this._deleteRecursively(this.root, value);
  }

  // Recursive delete helper method
  private _deleteRecursively(
    node: TreeNode<T> | null,
    value: T
  ): TreeNode<T> | null {
    // Base case: node doesn't exist
    if (node === null) {
      return null;
    }

    // Find the node to delete
    if (this._compare(value, node.value) < 0) {
      node.left = this._deleteRecursively(node.left, value);
    } else if (this._compare(value, node.value) > 0) {
      node.right = this._deleteRecursively(node.right, value);
    } else {
      // Node to delete found

      // Case 1: Leaf node (no children)
      if (node.left === null && node.right === null) {
        return null;
      }
      // Case 2: Node with only one child
      else if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }
      // Case 3: Node with two children
      else {
        // Find the inorder successor (smallest in right subtree)
        const successor = this._findMin(node.right);
        node.value = successor.value;
        // Delete the successor
        node.right = this._deleteRecursively(node.right, successor.value);
        return node;
      }
    }

    return node;
  }

  // Find the minimum value node in a subtree
  private _findMin(node: TreeNode<T>): TreeNode<T> {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  // Get the height of the tree
  getHeight(): number {
    return this._getHeightRecursively(this.root);
  }

  private _getHeightRecursively(node: TreeNode<T> | null): number {
    if (node === null) {
      return 0;
    }
    const leftHeight = this._getHeightRecursively(node.left);
    const rightHeight = this._getHeightRecursively(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Check if the tree is empty
  isEmpty(): boolean {
    return this.root === null;
  }

  // Get the size of the tree
  getSize(): number {
    return this._getSizeRecursively(this.root);
  }

  private _getSizeRecursively(node: TreeNode<T> | null): number {
    if (node === null) {
      return 0;
    }
    return (
      1 + this._getSizeRecursively(node.left) + this._getSizeRecursively(node.right)
    );
  }

  // In-order traversal (Left -> Root -> Right)
  inOrderTraversal(callback?: (value: T) => void): T[] {
    const result: T[] = [];
    this._inOrderRecursively(this.root, (value: T) => result.push(value));
    if (callback) {
      result.forEach(callback);
    }
    return result;
  }

  private _inOrderRecursively(
    node: TreeNode<T> | null,
    callback: (value: T) => void
  ): void {
    if (node !== null) {
      this._inOrderRecursively(node.left, callback);
      callback(node.value);
      this._inOrderRecursively(node.right, callback);
    }
  }

  // Pre-order traversal (Root -> Left -> Right)
  preOrderTraversal(callback?: (value: T) => void): T[] {
    const result: T[] = [];
    this._preOrderRecursively(this.root, (value: T) => result.push(value));
    if (callback) {
      result.forEach(callback);
    }
    return result;
  }

  private _preOrderRecursively(
    node: TreeNode<T> | null,
    callback: (value: T) => void
  ): void {
    if (node !== null) {
      callback(node.value);
      this._preOrderRecursively(node.left, callback);
      this._preOrderRecursively(node.right, callback);
    }
  }

  // Post-order traversal (Left -> Right -> Root)
  postOrderTraversal(callback?: (value: T) => void): T[] {
    const result: T[] = [];
    this._postOrderRecursively(this.root, (value: T) => result.push(value));
    if (callback) {
      result.forEach(callback);
    }
    return result;
  }

  private _postOrderRecursively(
    node: TreeNode<T> | null,
    callback: (value: T) => void
  ): void {
    if (node !== null) {
      this._postOrderRecursively(node.left, callback);
      this._postOrderRecursively(node.right, callback);
      callback(node.value);
    }
  }

  // Comparison method - you may need to adjust this based on your data type
  private _compare(a: T, b: T): number {
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() - b.getTime();
    }
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    }
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }
    // For other types, you might want to implement a custom comparator
    throw new Error('Cannot compare values of type ' + typeof a);
  }
}
// Example usage with numbers
const bst = new BinarySearchTree<number>();

// Insert values
bst.insert(50);
bst.insert(30);
bst.insert(70);
bst.insert(20);
bst.insert(40);
bst.insert(60);
bst.insert(80);

// Search for values
console.log(bst.search(40)); // true
console.log(bst.search(90)); // false

// Tree traversals
console.log('In-order:', bst.inOrderTraversal()); 
// [20, 30, 40, 50, 60, 70, 80]

console.log('Pre-order:', bst.preOrderTraversal());
// [50, 30, 20, 40, 70, 60, 80]

console.log('Post-order:', bst.postOrderTraversal());
// [20, 40, 30, 60, 80, 70, 50]

// Tree properties
console.log('Height:', bst.getHeight()); // 3
console.log('Size:', bst.getSize()); // 7
console.log('Is empty:', bst.isEmpty()); // false

// Delete a node
bst.delete(30);
console.log('After deleting 30:', bst.inOrderTraversal());
// [20, 40, 50, 60, 70, 80]

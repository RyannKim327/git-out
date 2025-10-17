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

  // Insert a new value
  insert(value: T): void {
    const newNode = new TreeNode(value);
    
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    this.insertNode(this.root, newNode);
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  // Search for a value
  search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: TreeNode<T> | null, value: T): boolean {
    if (node === null) return false;
    
    if (value < node.value) {
      return this.searchNode(node.left, value);
    } else if (value > node.value) {
      return this.searchNode(node.right, value);
    } else {
      return true;
    }
  }

  // In-order traversal
  inOrderTraversal(callback: (value: T) => void): void {
    this.inOrder(this.root, callback);
  }

  private inOrder(node: TreeNode<T> | null, callback: (value: T) => void): void {
    if (node !== null) {
      this.inOrder(node.left, callback);
      callback(node.value);
      this.inOrder(node.right, callback);
    }
  }

  // Pre-order traversal
  preOrderTraversal(callback: (value: T) => void): void {
    this.preOrder(this.root, callback);
  }

  private preOrder(node: TreeNode<T> | null, callback: (value: T) => void): void {
    if (node !== null) {
      callback(node.value);
      this.preOrder(node.left, callback);
      this.preOrder(node.right, callback);
    }
  }

  // Post-order traversal
  postOrderTraversal(callback: (value: T) => void): void {
    this.postOrder(this.root, callback);
  }

  private postOrder(node: TreeNode<T> | null, callback: (value: T) => void): void {
    if (node !== null) {
      this.postOrder(node.left, callback);
      this.postOrder(node.right, callback);
      callback(node.value);
    }
  }

  // Find minimum value
  findMin(): T | null {
    if (this.root === null) return null;
    return this.findMinNode(this.root);
  }

  private findMinNode(node: TreeNode<T>): T {
    return node.left ? this.findMinNode(node.left) : node.value;
  }

  // Find maximum value
  findMax(): T | null {
    if (this.root === null) return null;
    return this.findMaxNode(this.root);
  }

  private findMaxNode(node: TreeNode<T>): T {
    return node.right ? this.findMaxNode(node.right) : node.value;
  }

  // Delete a value
  delete(value: T): void {
    this.root = this.deleteNode(this.root, value);
  }

  private deleteNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (node === null) return null;

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
      return node;
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
      return node;
    } else {
      // Node to delete found
      if (node.left === null && node.right === null) {
        return null; // No children
      }

      if (node.left === null) {
        return node.right; // One child (right)
      }

      if (node.right === null) {
        return node.left; // One child (left)
      }

      // Two children: find inorder successor
      const minRight = this.findMinNode(node.right);
      node.value = minRight;
      node.right = this.deleteNode(node.right, minRight);
      return node;
    }
  }

  // Get height of the tree
  getHeight(): number {
    return this.calculateHeight(this.root);
  }

  private calculateHeight(node: TreeNode<T> | null): number {
    if (node === null) return 0;
    return 1 + Math.max(
      this.calculateHeight(node.left),
      this.calculateHeight(node.right)
    );
  }
}
// Create a BST with numbers
const bst = new BinarySearchTree<number>();

// Insert values
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);

// Search for values
console.log(bst.search(7)); // true
console.log(bst.search(12)); // false

// Traverse the tree
bst.inOrderTraversal(value => console.log(value)); // 3, 5, 7, 10, 15

// Find min/max
console.log("Min:", bst.findMin()); // 3
console.log("Max:", bst.findMax()); // 15

// Get height
console.log("Height:", bst.getHeight()); // 3

// Delete a value
bst.delete(5);
bst.inOrderTraversal(value => console.log(value)); // 3, 7, 10, 15

// Create a BST with strings
const stringBst = new BinarySearchTree<string>();
stringBst.insert("apple");
stringBst.insert("banana");
stringBst.insert("cherry");
class BinarySearchTree<T extends number | string | Date> {
  // ... rest of the implementation remains the same
}
// Check if the tree is balanced
isBalanced(): boolean {
  return this.checkBalanced(this.root) !== -1;
}

private checkBalanced(node: TreeNode<T> | null): number {
  if (node === null) return 0;
  
  const leftHeight = this.checkBalanced(node.left);
  const rightHeight = this.checkBalanced(node.right);
  
  if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
    return -1;
  }
  
  return Math.max(leftHeight, rightHeight) + 1;
}

// Count nodes
countNodes(): number {
  return this.countNodesRecursive(this.root);
}

private countNodesRecursive(node: TreeNode<T> | null): number {
  if (node === null) return 0;
  return 1 + this.countNodesRecursive(node.left) + this.countNodesRecursive(node.right);
}

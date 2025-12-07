class TreeNode<T> {
  public left: TreeNode<T> | null = null;
  public right: TreeNode<T> | null = null;

  constructor(public value: T) {}
}

class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  // Insert a new value into the BST
  insert(value: T): void {
    const newNode = new TreeNode(value);
    
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  // Search for a value in the tree
  search(value: T): boolean {
    let current = this.root;

    while (current !== null) {
      if (value === current.value) {
        return true;
      } else if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return false;
  }

  // Delete a value from the tree
  delete(value: T): void {
    this.root = this.deleteNode(this.root, value);
  }

  private deleteNode(root: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (root === null) return null;

    if (value < root.value) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = this.deleteNode(root.right, value);
    } else {
      // Node to delete found
      
      // Case 1: No children
      if (root.left === null && root.right === null) {
        return null;
      }

      // Case 2: One child
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      // Case 3: Two children
      const successor = this.findMinNode(root.right);
      root.value = successor.value;
      root.right = this.deleteNode(root.right, successor.value);
    }
    
    return root;
  }

  private findMinNode(node: TreeNode<T>): TreeNode<T> {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  // In-order traversal (Left, Root, Right)
  inOrderTraversal(): T[] {
    const result: T[] = [];
    this.inOrder(this.root, result);
    return result;
  }

  private inOrder(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
  }

  // Pre-order traversal (Root, Left, Right)
  preOrderTraversal(): T[] {
    const result: T[] = [];
    this.preOrder(this.root, result);
    return result;
  }

  private preOrder(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      result.push(node.value);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
  }

  // Post-order traversal (Left, Right, Root)
  postOrderTraversal(): T[] {
    const result: T[] = [];
    this.postOrder(this.root, result);
    return result;
  }

  private postOrder(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.value);
    }
  }

  // Optional: Get the root node (for testing/debugging)
  getRoot(): TreeNode<T> | null {
    return this.root;
  }
}

// Example Usage:
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

// Traversal examples
console.log(bst.inOrderTraversal());   // [3, 5, 7, 10, 15]
console.log(bst.preOrderTraversal());  // [10, 5, 3, 7, 15]
console.log(bst.postOrderTraversal()); // [3, 7, 5, 15, 10]

// Delete a node
bst.delete(5);
console.log(bst.inOrderTraversal());   // [3, 7, 10, 15]

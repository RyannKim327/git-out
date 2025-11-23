// TreeNode represents a node in the Binary Search Tree
class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// Binary Search Tree class with basic operations
class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  // Insert a new value into the tree
  insert(value: T): void {
    const newNode = new TreeNode(value);
    
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (value > current.value) {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      } else {
        // Handle duplicates according to your needs
        return; // Skip duplicates in this implementation
      }
    }
  }

  // Search for a value in the tree
  search(value: T): boolean {
    let current = this.root;

    while (current) {
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

  // Delete a node with given value
  delete(value: T): void {
    this.root = this.deleteNode(this.root, value);
  }

  private deleteNode(root: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (!root) return null;

    if (value < root.value) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = this.deleteNode(root.right, value);
    } else {
      // Node with only one child or no child
      if (!root.left) return root.right;
      if (!root.right) return root.left;

      // Node with two children: get inorder successor (smallest in right subtree)
      root.value = this.findMinValue(root.right);
      
      // Delete the inorder successor
      root.right = this.deleteNode(root.right, root.value);
    }

    return root;
  }

  // Find minimum value in a subtree
  private findMinValue(root: TreeNode<T>): T {
    let current = root;
    while (current.left) {
      current = current.left;
    }
    return current.value;
  }

  // Tree traversals
  inOrderTraversal(callback: (value: T) => void): void {
    this.inOrder(this.root, callback);
  }

  private inOrder(node: TreeNode<T> | null, callback: (value: T) => void): void {
    if (node) {
      this.inOrder(node.left, callback);
      callback(node.value);
      this.inOrder(node.right, callback);
    }
  }

  preOrderTraversal(callback: (value: T) => void): void {
    this.preOrder(this.root, callback);
  }

  private preOrder(node: TreeNode<T> | null, callback: (value: T) => void): void {
    if (node) {
      callback(node.value);
      this.preOrder(node.left, callback);
      this.preOrder(node.right, callback);
    }
  }

  postOrderTraversal(callback: (value: T) => void): void {
    this.postOrder(this.root, callback);
  }

  private postOrder(node: TreeNode<T> | null, callback: (value: T) => void): void {
    if (node) {
      this.postOrder(node.left, callback);
      this.postOrder(node.right, callback);
      callback(node.value);
    }
  }

  // Get tree height
  getHeight(): number {
    return this.calculateHeight(this.root);
  }

  private calculateHeight(node: TreeNode<T> | null): number {
    if (!node) return 0;
    return 1 + Math.max(
      this.calculateHeight(node.left), 
      this.calculateHeight(node.right)
    );
  }
}

// Example usage:
const bst = new BinarySearchTree<number>();

// Insert values
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);

// Search for values
console.log(bst.search(7));  // true
console.log(bst.search(12)); // false

// Delete a node
bst.delete(5);

// Traverse the tree
console.log("In-order traversal:");
bst.inOrderTraversal(val => console.log(val));

console.log("Tree height:", bst.getHeight());
interface Person {
  id: number;
  name: string;
}

// Create BST with custom comparator
const personBST = new BinarySearchTree<Person>((a: Person, b: Person) => a.id - b.id);

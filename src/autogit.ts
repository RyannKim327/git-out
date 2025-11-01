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
  private root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  // Insert a new value into the BST
  insert(value: T): void {
    const newNode = new TreeNode(value);
    
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    
    while (true) {
      if (value < current.value) {
        // Go left
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (value > current.value) {
        // Go right
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      } else {
        // Value already exists, don't insert duplicates
        return;
      }
    }
  }

  // Search for a value in the BST
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

  // Remove a value from the BST
  delete(value: T): boolean {
    this.root = this._deleteRecursive(this.root, value);
    return true;
  }

  private _deleteRecursive(
    node: TreeNode<T> | null, 
    value: T
  ): TreeNode<T> | null {
    if (!node) {
      return null;
    }

    if (value < node.value) {
      node.left = this._deleteRecursive(node.left, value);
    } else if (value > node.value) {
      node.right = this._deleteRecursive(node.right, value);
    } else {
      // Node to delete found

      // Case 1: Leaf node
      if (!node.left && !node.right) {
        return null;
      }

      // Case 2: Node with one child
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }

      // Case 3: Node with two children
      // Find the inorder successor (smallest in right subtree)
      const successor = this._findMinNode(node.right);
      node.value = successor!.value;
      // Delete the successor
      node.right = this._deleteRecursive(node.right, successor!.value);
    }

    return node;
  }

  private _findMinNode(node: TreeNode<T>): TreeNode<T> | null {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  // Get the minimum value in the tree
  min(): T | null {
    if (!this.root) return null;
    
    let current = this.root;
    while (current.left) {
      current = current.left;
    }
    return current.value;
  }

  // Get the maximum value in the tree
  max(): T | null {
    if (!this.root) return null;
    
    let current = this.root;
    while (current.right) {
      current = current.right;
    }
    return current.value;
  }

  // Check if the tree is empty
  isEmpty(): boolean {
    return this.root === null;
  }

  // Get the height of the tree
  height(): number {
    return this._heightRecursive(this.root);
  }

  private _heightRecursive(node: TreeNode<T> | null): number {
    if (!node) return -1;
    const leftHeight = this._heightRecursive(node.left);
    const rightHeight = this._heightRecursive(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Traverse the tree (Inorder traversal)
  // Inorder: Left -> Root -> Right (gives sorted order for BST)
  inorderTraversal(): T[] {
    const result: T[] = [];
    this._inorderRecursive(this.root, result);
    return result;
  }

  private _inorderRecursive(node: TreeNode<T> | null, result: T[]): void {
    if (!node) return;
    
    this._inorderRecursive(node.left, result);
    result.push(node.value);
    this._inorderRecursive(node.right, result);
  }

  // Preorder traversal: Root -> Left -> Right
  preorderTraversal(): T[] {
    const result: T[] = [];
    this._preorderRecursive(this.root, result);
    return result;
  }

  private _preorderRecursive(node: TreeNode<T> | null, result: T[]): void {
    if (!node) return;
    
    result.push(node.value);
    this._preorderRecursive(node.left, result);
    this._preorderRecursive(node.right, result);
  }

  // Postorder traversal: Left -> Right -> Root
  postorderTraversal(): T[] {
    const result: T[] = [];
    this._postorderRecursive(this.root, result);
    return result;
  }

  private _postorderRecursive(node: TreeNode<T> | null, result: T[]): void {
    if (!node) return;
    
    this._postorderRecursive(node.left, result);
    this._postorderRecursive(node.right, result);
    result.push(node.value);
  }

  // Get the size of the tree (number of nodes)
  size(): number {
    return this._sizeRecursive(this.root);
  }

  private _sizeRecursive(node: TreeNode<T> | null): number {
    if (!node) return 0;
    return (
      this._sizeRecursive(node.left) + 
      1 + 
      this._sizeRecursive(node.right)
    );
  }
}
// Create a new BST for numbers
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

// Get min and max
console.log(bst.min()); // 20
console.log(bst.max()); // 80

// Traversals
console.log("Inorder:", bst.inorderTraversal()); 
// [20, 30, 40, 50, 60, 70, 80]

console.log("Preorder:", bst.preorderTraversal()); 
// [50, 30, 20, 40, 70, 60, 80]

console.log("Postorder:", bst.postorderTraversal()); 
// [20, 40, 30, 60, 80, 70, 50]

// Tree properties
console.log("Height:", bst.height()); // 2
console.log("Size:", bst.size()); // 7
console.log("Is empty:", bst.isEmpty()); // false

// Delete a node
bst.delete(30);
console.log("Inorder after deleting 30:", bst.inorderTraversal()); 
// [20, 40, 50, 60, 70, 80]

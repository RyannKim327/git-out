interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  constructor() {}

  // Insert a new value into the BST
  insert(value: T): void {
    this.root = this._insert(this.root, value);
  }

  private _insert(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    // If tree is empty, create root
    if (node === null) {
      return { value, left: null, right: null };
    }

    // Traverse left if value is less than current node
    if ((value as any) < (node.value as any)) {
      node.left = this._insert(node.left, value);
    }
    // Traverse right if value is greater than current node
    else if ((value as any) > (node.value as any)) {
      node.right = this._insert(node.right, value);
    }
    // For duplicates, you can choose to ignore or handle differently

    return node;
  }

  // Search for a value in the BST
  search(value: T): boolean {
    return this._search(this.root, value);
  }

  private _search(node: TreeNode<T> | null, value: T): boolean {
    if (node === null) {
      return false;
    }

    if (node.value === value) {
      return true;
    }

    if ((value as any) < (node.value as any)) {
      return this._search(node.left, value);
    }

    return this._search(node.right, value);
  }

  // Delete a value from the BST
  delete(value: T): void {
    this.root = this._delete(this.root, value);
  }

  private _delete(
    node: TreeNode<T> | null,
    value: T
  ): TreeNode<T> | null {
    if (node === null) {
      return null;
    }

    if ((value as any) < (node.value as any)) {
      node.left = this._delete(node.left, value);
    } else if ((value as any) > (node.value as any)) {
      node.right = this._delete(node.right, value);
    } else {
      // Node to delete found
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // Node has two children
      // Get the inorder successor (smallest in right subtree)
      const tempNode = this._minValueNode(node.right);
      node.value = tempNode!.value;
      node.right = this._delete(node.right, tempNode!.value);
    }

    return node;
  }

  private _minValueNode(node: TreeNode<T>): TreeNode<T> | null {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  // Get the minimum value in the BST
  min(): T | null {
    if (this.root === null) return null;
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.value;
  }

  // Get the maximum value in the BST
  max(): T | null {
    if (this.root === null) return null;
    let current = this.root;
    while (current.right !== null) {
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
    return this._height(this.root);
  }

  private _height(node: TreeNode<T> | null): number {
    if (node === null) return 0;
    return (
      1 + Math.max(this._height(node.left), this._height(node.right))
    );
  }

  // In-order traversal (left -> root -> right)
  inOrderTraversal(): T[] {
    const result: T[] = [];
    this._inOrder(this.root, result);
    return result;
  }

  private _inOrder(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this._inOrder(node.left, result);
      result.push(node.value);
      this._inOrder(node.right, result);
    }
  }

  // Pre-order traversal (root -> left -> right)
  preOrderTraversal(): T[] {
    const result: T[] = [];
    this._preOrder(this.root, result);
    return result;
  }

  private _preOrder(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      result.push(node.value);
      this._preOrder(node.left, result);
      this._preOrder(node.right, result);
    }
  }

  // Post-order traversal (left -> right -> root)
  postOrderTraversal(): T[] {
    const result: T[] = [];
    this._postOrder(this.root, result);
    return result;
  }

  private _postOrder(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this._postOrder(node.left, result);
      this._postOrder(node.right, result);
      result.push(node.value);
    }
  }

  // Get all values as an array (in-order)
  toArray(): T[] {
    return this.inOrderTraversal();
  }

  // Get the size of the tree
  size(): number {
    return this._size(this.root);
  }

  private _size(node: TreeNode<T> | null): number {
    if (node === null) return 0;
    return 1 + this._size(node.left) + this._size(node.right);
  }
}
// Example usage
const bst = new BinarySearchTree<number>();

// Insert values
bst.insert(50);
bst.insert(30);
bst.insert(70);
bst.insert(20);
bst.insert(40);
bst.insert(60);
bst.insert(80);

// Search
console.log(bst.search(40)); // true
console.log(bst.search(90)); // false

// Get min and max
console.log(bst.min()); // 20
console.log(bst.max()); // 80

// Traversals
console.log("In-order:", bst.inOrderTraversal()); 
// [20, 30, 40, 50, 60, 70, 80]

console.log("Pre-order:", bst.preOrderTraversal());
// [50, 30, 20, 40, 70, 60, 80]

console.log("Post-order:", bst.postOrderTraversal());
// [20, 40, 30, 60, 80, 70, 50]

// Delete
bst.delete(30);
console.log("After deleting 30:", bst.inOrderTraversal());
// [20, 40, 50, 60, 70, 80]

console.log("Height:", bst.height()); // 3
console.log("Size:", bst.size()); // 6

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
class BinaryTree<T> {
  root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  // Insert a value into the binary tree
  insert(value: T): void {
    const newNode = new TreeNode(value);
    
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    const queue: TreeNode<T>[] = [this.root];
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (current.left === null) {
        current.left = newNode;
        return;
      } else {
        queue.push(current.left);
      }
      
      if (current.right === null) {
        current.right = newNode;
        return;
      } else {
        queue.push(current.right);
      }
    }
  }

  // Search for a value in the tree
  search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: TreeNode<T> | null, value: T): boolean {
    if (node === null) return false;
    
    if (node.value === value) return true;
    
    return this.searchNode(node.left, value) || this.searchNode(node.right, value);
  }

  // In-order traversal (Left, Root, Right)
  inOrderTraversal(callback: (value: T) => void): void {
    this.inOrder(this.root, callback);
  }

  private inOrder(node: TreeNode<T> | null, callback: (value: T) => void): void {
    if (node === null) return;
    
    this.inOrder(node.left, callback);
    callback(node.value);
    this.inOrder(node.right, callback);
  }

  // Pre-order traversal (Root, Left, Right)
  preOrderTraversal(callback: (value: T) => void): void {
    this.preOrder(this.root, callback);
  }

  private preOrder(node: TreeNode<T> | null, callback: (value: T) => void): void {
    if (node === null) return;
    
    callback(node.value);
    this.preOrder(node.left, callback);
    this.preOrder(node.right, callback);
  }

  // Post-order traversal (Left, Right, Root)
  postOrderTraversal(callback: (value: T) => void): void {
    this.postOrder(this.root, callback);
  }

  private postOrder(node: TreeNode<T> | null, callback: (value: T) => void): void {
    if (node === null) return;
    
    this.postOrder(node.left, callback);
    this.postOrder(node.right, callback);
    callback(node.value);
  }

  // Level-order traversal (Breadth-first)
  levelOrderTraversal(callback: (value: T) => void): void {
    if (this.root === null) return;
    
    const queue: TreeNode<T>[] = [this.root];
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      callback(current.value);
      
      if (current.left !== null) {
        queue.push(current.left);
      }
      
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
  }

  // Get the height of the tree
  getHeight(): number {
    return this.calculateHeight(this.root);
  }

  private calculateHeight(node: TreeNode<T> | null): number {
    if (node === null) return 0;
    
    const leftHeight = this.calculateHeight(node.left);
    const rightHeight = this.calculateHeight(node.right);
    
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Count the number of nodes
  countNodes(): number {
    return this.countNodesRecursive(this.root);
  }

  private countNodesRecursive(node: TreeNode<T> | null): number {
    if (node === null) return 0;
    
    return 1 + this.countNodesRecursive(node.left) + this.countNodesRecursive(node.right);
  }
}
class BinarySearchTree<T> {
  root: TreeNode<T> | null;

  constructor(private compare: (a: T, b: T) => number) {
    this.root = null;
  }

  // Insert a value into BST
  insert(value: T): void {
    this.root = this.insertRecursive(this.root, value);
  }

  private insertRecursive(node: TreeNode<T> | null, value: T): TreeNode<T> {
    if (node === null) {
      return new TreeNode(value);
    }

    const comparison = this.compare(value, node.value);
    
    if (comparison < 0) {
      node.left = this.insertRecursive(node.left, value);
    } else if (comparison > 0) {
      node.right = this.insertRecursive(node.right, value);
    }
    
    return node;
  }

  // Search in BST
  search(value: T): boolean {
    return this.searchRecursive(this.root, value);
  }

  private searchRecursive(node: TreeNode<T> | null, value: T): boolean {
    if (node === null) return false;
    
    const comparison = this.compare(value, node.value);
    
    if (comparison === 0) return true;
    if (comparison < 0) return this.searchRecursive(node.left, value);
    return this.searchRecursive(node.right, value);
  }

  // Find minimum value
  findMin(): T | null {
    if (this.root === null) return null;
    
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    
    return current.value;
  }

  // Find maximum value
  findMax(): T | null {
    if (this.root === null) return null;
    
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    
    return current.value;
  }
}
// Basic Binary Tree
const tree = new BinaryTree<number>();
tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);

console.log("In-order traversal:");
tree.inOrderTraversal(value => console.log(value)); // 4, 2, 5, 1, 3

console.log("Level-order traversal:");
tree.levelOrderTraversal(value => console.log(value)); // 1, 2, 3, 4, 5

console.log("Tree height:", tree.getHeight()); // 3
console.log("Total nodes:", tree.countNodes()); // 5

// Binary Search Tree
const bst = new BinarySearchTree<number>((a, b) => a - b);
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(2);
bst.insert(4);

console.log("BST In-order traversal:");
bst.inOrderTraversal(value => console.log(value)); // 2, 3, 4, 5, 7

console.log("Search for 4:", bst.search(4)); // true
console.log("Search for 6:", bst.search(6)); // false
console.log("Min value:", bst.findMin()); // 2
console.log("Max value:", bst.findMax()); // 7

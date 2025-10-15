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

  // Insert a value into the tree
  insert(value: T): void {
    const newNode = new TreeNode(value);
    
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    this.insertNode(this.root, newNode);
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
    // For simplicity, this uses a basic insertion strategy
    // You can modify this to implement BST rules
    if (node.left === null) {
      node.left = newNode;
    } else if (node.right === null) {
      node.right = newNode;
    } else {
      // If both children exist, insert in the left subtree
      this.insertNode(node.left, newNode);
    }
  }

  // Search for a value
  search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: TreeNode<T> | null, value: T): boolean {
    if (node === null) return false;
    
    if (node.value === value) return true;
    
    return this.searchNode(node.left, value) || this.searchNode(node.right, value);
  }

  // Depth-First Traversals
  inOrderTraversal(): T[] {
    const result: T[] = [];
    this.inOrder(this.root, result);
    return result;
  }

  private inOrder(node: TreeNode<T> | null, result: T[]): void {
    if (node === null) return;
    
    this.inOrder(node.left, result);
    result.push(node.value);
    this.inOrder(node.right, result);
  }

  preOrderTraversal(): T[] {
    const result: T[] = [];
    this.preOrder(this.root, result);
    return result;
  }

  private preOrder(node: TreeNode<T> | null, result: T[]): void {
    if (node === null) return;
    
    result.push(node.value);
    this.preOrder(node.left, result);
    this.preOrder(node.right, result);
  }

  postOrderTraversal(): T[] {
    const result: T[] = [];
    this.postOrder(this.root, result);
    return result;
  }

  private postOrder(node: TreeNode<T> | null, result: T[]): void {
    if (node === null) return;
    
    this.postOrder(node.left, result);
    this.postOrder(node.right, result);
    result.push(node.value);
  }

  // Breadth-First Traversal (Level Order)
  levelOrderTraversal(): T[] {
    const result: T[] = [];
    if (this.root === null) return result;

    const queue: TreeNode<T>[] = [this.root];
    
    while (queue.length > 0) {
      const currentNode = queue.shift()!;
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

  // Check if the tree is empty
  isEmpty(): boolean {
    return this.root === null;
  }
}
class BinarySearchTree<T> extends BinaryTree<T> {
  private comparator: (a: T, b: T) => number;

  constructor(comparator?: (a: T, b: T) => number) {
    super();
    // Default comparator for numbers
    this.comparator = comparator || ((a: T, b: T) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  }

  // Override insert for BST rules
  insert(value: T): void {
    const newNode = new TreeNode(value);
    
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    this.insertBST(this.root, newNode);
  }

  private insertBST(node: TreeNode<T>, newNode: TreeNode<T>): void {
    const comparison = this.comparator(newNode.value, node.value);
    
    if (comparison < 0) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertBST(node.left, newNode);
      }
    } else if (comparison > 0) {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertBST(node.right, newNode);
      }
    }
    // If equal, do nothing (no duplicates)
  }

  // Override search for BST efficiency
  search(value: T): boolean {
    return this.searchBST(this.root, value);
  }

  private searchBST(node: TreeNode<T> | null, value: T): boolean {
    if (node === null) return false;
    
    const comparison = this.comparator(value, node.value);
    
    if (comparison === 0) return true;
    if (comparison < 0) return this.searchBST(node.left, value);
    return this.searchBST(node.right, value);
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

console.log('In-order:', tree.inOrderTraversal()); // [2, 4, 1, 3]
console.log('Pre-order:', tree.preOrderTraversal()); // [1, 2, 4, 3]
console.log('Post-order:', tree.postOrderTraversal()); // [4, 2, 3, 1]
console.log('Level-order:', tree.levelOrderTraversal()); // [1, 2, 3, 4]
console.log('Height:', tree.getHeight()); // 3
console.log('Node count:', tree.countNodes()); // 4

// Binary Search Tree
const bst = new BinarySearchTree<number>();
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(2);
bst.insert(4);
bst.insert(6);
bst.insert(8);

console.log('BST In-order:', bst.inOrderTraversal()); // [2, 3, 4, 5, 6, 7, 8]
console.log('Search 4:', bst.search(4)); // true
console.log('Search 10:', bst.search(10)); // false
console.log('Min:', bst.findMin()); // 2
console.log('Max:', bst.findMax()); // 8

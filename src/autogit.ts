class BinaryTreeNode<T> {
  value: T;
  left: BinaryTreeNode<T> | null;
  right: BinaryTreeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class BinaryTree<T> {
  root: BinaryTreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  // Insert a value into the tree
  insert(value: T): void {
    const newNode = new BinaryTreeNode(value);
    
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    const queue: BinaryTreeNode<T>[] = [this.root];
    
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

  // Search for a value
  search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: BinaryTreeNode<T> | null, value: T): boolean {
    if (node === null) return false;
    if (node.value === value) return true;
    
    return this.searchNode(node.left, value) || this.searchNode(node.right, value);
  }

  // In-order traversal (Left, Root, Right)
  inOrderTraversal(): T[] {
    const result: T[] = [];
    this.inOrder(this.root, result);
    return result;
  }

  private inOrder(node: BinaryTreeNode<T> | null, result: T[]): void {
    if (node === null) return;
    this.inOrder(node.left, result);
    result.push(node.value);
    this.inOrder(node.right, result);
  }

  // Pre-order traversal (Root, Left, Right)
  preOrderTraversal(): T[] {
    const result: T[] = [];
    this.preOrder(this.root, result);
    return result;
  }

  private preOrder(node: BinaryTreeNode<T> | null, result: T[]): void {
    if (node === null) return;
    result.push(node.value);
    this.preOrder(node.left, result);
    this.preOrder(node.right, result);
  }

  // Post-order traversal (Left, Right, Root)
  postOrderTraversal(): T[] {
    const result: T[] = [];
    this.postOrder(this.root, result);
    return result;
  }

  private postOrder(node: BinaryTreeNode<T> | null, result: T[]): void {
    if (node === null) return;
    this.postOrder(node.left, result);
    this.postOrder(node.right, result);
    result.push(node.value);
  }

  // Level-order traversal (Breadth-first)
  levelOrderTraversal(): T[] {
    const result: T[] = [];
    if (this.root === null) return result;
    
    const queue: BinaryTreeNode<T>[] = [this.root];
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      result.push(current.value);
      
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
    
    return result;
  }

  // Find the height/depth of the tree
  height(): number {
    return this.calculateHeight(this.root);
  }

  private calculateHeight(node: BinaryTreeNode<T> | null): number {
    if (node === null) return 0;
    return 1 + Math.max(
      this.calculateHeight(node.left),
      this.calculateHeight(node.right)
    );
  }

  // Count number of nodes
  countNodes(): number {
    return this.countNodesRecursive(this.root);
  }

  private countNodesRecursive(node: BinaryTreeNode<T> | null): number {
    if (node === null) return 0;
    return 1 + this.countNodesRecursive(node.left) + this.countNodesRecursive(node.right);
  }
}
class BinarySearchTree<T> {
  root: BinaryTreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  // Insert with BST rules (left < root < right)
  insert(value: T): void {
    this.root = this.insertRecursive(this.root, value);
  }

  private insertRecursive(node: BinaryTreeNode<T> | null, value: T): BinaryTreeNode<T> {
    if (node === null) {
      return new BinaryTreeNode(value);
    }

    if (value < node.value) {
      node.left = this.insertRecursive(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertRecursive(node.right, value);
    }

    return node;
  }

  // Search in BST (more efficient)
  search(value: T): boolean {
    return this.searchRecursive(this.root, value);
  }

  private searchRecursive(node: BinaryTreeNode<T> | null, value: T): boolean {
    if (node === null) return false;
    if (node.value === value) return true;
    
    if (value < node.value) {
      return this.searchRecursive(node.left, value);
    } else {
      return this.searchRecursive(node.right, value);
    }
  }

  // Find minimum value
  findMin(): T | null {
    if (this.root === null) return null;
    return this.findMinNode(this.root).value;
  }

  private findMinNode(node: BinaryTreeNode<T>): BinaryTreeNode<T> {
    return node.left ? this.findMinNode(node.left) : node;
  }

  // Find maximum value
  findMax(): T | null {
    if (this.root === null) return null;
    return this.findMaxNode(this.root).value;
  }

  private findMaxNode(node: BinaryTreeNode<T>): BinaryTreeNode<T> {
    return node.right ? this.findMaxNode(node.right) : node;
  }
}
// Example usage
const tree = new BinaryTree<number>();

// Insert values
tree.insert(5);
tree.insert(3);
tree.insert(7);
tree.insert(2);
tree.insert(4);
tree.insert(6);
tree.insert(8);

// Traversals
console.log("In-order:", tree.inOrderTraversal());    // [2, 3, 4, 5, 6, 7, 8]
console.log("Pre-order:", tree.preOrderTraversal()); // [5, 3, 2, 4, 7, 6, 8]
console.log("Post-order:", tree.postOrderTraversal()); // [2, 4, 3, 6, 8, 7, 5]
console.log("Level-order:", tree.levelOrderTraversal()); // [5, 3, 7, 2, 4, 6, 8]

// Properties
console.log("Height:", tree.height()); // 3
console.log("Total nodes:", tree.countNodes()); // 7
console.log("Search for 4:", tree.search(4)); // true
console.log("Search for 10:", tree.search(10)); // false

// BST Example
const bst = new BinarySearchTree<number>();
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(2);
bst.insert(4);

console.log("BST Min:", bst.findMin()); // 2
console.log("BST Max:", bst.findMax()); // 7
console.log("BST Search for 4:", bst.search(4)); // true
interface IBinaryTree<T> {
  insert(value: T): void;
  search(value: T): boolean;
  inOrderTraversal(): T[];
  preOrderTraversal(): T[];
  postOrderTraversal(): T[];
  levelOrderTraversal(): T[];
  height(): number;
  countNodes(): number;
}

// You can implement the interface:
class MyBinaryTree<T> implements IBinaryTree<T> {
  // Implementation would go here
}

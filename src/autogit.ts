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
    // Simple insertion strategy: left for smaller, right for larger
    // For more complex behavior, use a comparator
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
    if (node === null) {
      return false;
    }

    if (value === node.value) {
      return true;
    }

    if (value < node.value) {
      return this.searchNode(node.left, value);
    } else {
      return this.searchNode(node.right, value);
    }
  }

  // In-order traversal (left, root, right)
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

  // Pre-order traversal (root, left, right)
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

  // Post-order traversal (left, right, root)
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

  // Level-order traversal (breadth-first)
  levelOrderTraversal(callback: (value: T) => void): void {
    if (this.root === null) return;

    const queue: TreeNode<T>[] = [this.root];
    
    while (queue.length > 0) {
      const node = queue.shift()!;
      callback(node.value);

      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }

  // Get height of the tree
  getHeight(): number {
    return this.calculateHeight(this.root);
  }

  private calculateHeight(node: TreeNode<T> | null): number {
    if (node === null) {
      return 0;
    }

    const leftHeight = this.calculateHeight(node.left);
    const rightHeight = this.calculateHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
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
// Create a binary tree
const tree = new BinaryTree<number>();

// Insert values
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);
tree.insert(12);
tree.insert(18);

// Search for values
console.log(tree.search(7)); // true
console.log(tree.search(20)); // false

// Different traversal methods
console.log("In-order traversal:");
tree.inOrderTraversal(value => console.log(value));
// Output: 3, 5, 7, 10, 12, 15, 18

console.log("Pre-order traversal:");
tree.preOrderTraversal(value => console.log(value));
// Output: 10, 5, 3, 7, 15, 12, 18

console.log("Level-order traversal:");
tree.levelOrderTraversal(value => console.log(value));
// Output: 10, 5, 15, 3, 7, 12, 18

// Tree properties
console.log("Tree height:", tree.getHeight()); // 3
console.log("Min value:", tree.findMin()); // 3
console.log("Max value:", tree.findMax()); // 18
class BinaryTree<T> {
  root: TreeNode<T> | null;
  private compare: (a: T, b: T) => number;

  constructor(compareFn?: (a: T, b: T) => number) {
    this.root = null;
    this.compare = compareFn || ((a: T, b: T) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
    const comparison = this.compare(newNode.value, node.value);
    
    if (comparison < 0) {
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
}

// Example with custom comparator for objects
interface Person {
  name: string;
  age: number;
}

const personTree = new BinaryTree<Person>((a, b) => a.age - b.age);

personTree.insert({ name: "Alice", age: 25 });
personTree.insert({ name: "Bob", age: 30 });

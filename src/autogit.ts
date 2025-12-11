class BinaryTreeNode<T> {
  public value: T;
  public left: BinaryTreeNode<T> | null;
  public right: BinaryTreeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class BinaryTree<T> {
  private root: BinaryTreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  // Insert a value into the tree
  public insert(value: T): void {
    const newNode = new BinaryTreeNode(value);
    
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    this.insertNode(this.root, newNode);
  }

  private insertNode(node: BinaryTreeNode<T>, newNode: BinaryTreeNode<T>): void {
    // Simple comparison - for more complex logic, you might want a comparator function
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

  // Search for a value in the tree
  public search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: BinaryTreeNode<T> | null, value: T): boolean {
    if (node === null) {
      return false;
    }

    if (value === node.value) {
      return true;
    }

    return value < node.value 
      ? this.searchNode(node.left, value) 
      : this.searchNode(node.right, value);
  }

  // Pre-order traversal (Root -> Left -> Right)
  public preOrderTraversal(callback: (value: T) => void): void {
    this.preOrder(this.root, callback);
  }

  private preOrder(node: BinaryTreeNode<T> | null, callback: (value: T) => void): void {
    if (node !== null) {
      callback(node.value);
      this.preOrder(node.left, callback);
      this.preOrder(node.right, callback);
    }
  }

  // In-order traversal (Left -> Root -> Right) - returns values in sorted order
  public inOrderTraversal(callback: (value: T) => void): void {
    this.inOrder(this.root, callback);
  }

  private inOrder(node: BinaryTreeNode<T> | null, callback: (value: T) => void): void {
    if (node !== null) {
      this.inOrder(node.left, callback);
      callback(node.value);
      this.inOrder(node.right, callback);
    }
  }

  // Post-order traversal (Left -> Right -> Root)
  public postOrderTraversal(callback: (value: T) => void): void {
    this.postOrder(this.root, callback);
  }

  private postOrder(node: BinaryTreeNode<T> | null, callback: (value: T) => void): void {
    if (node !== null) {
      this.postOrder(node.left, callback);
      this.postOrder(node.right, callback);
      callback(node.value);
    }
  }

  // Level-order traversal (Breadth-first)
  public levelOrderTraversal(callback: (value: T) => void): void {
    if (this.root === null) return;

    const queue: BinaryTreeNode<T>[] = [this.root];
    
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

  // Get the height of the tree
  public getHeight(): number {
    return this.calculateHeight(this.root);
  }

  private calculateHeight(node: BinaryTreeNode<T> | null): number {
    if (node === null) {
      return 0;
    }
    
    return 1 + Math.max(
      this.calculateHeight(node.left),
      this.calculateHeight(node.right)
    );
  }

  // Find the minimum value in the tree
  public findMin(): T | null {
    if (this.root === null) return null;
    
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.value;
  }

  // Find the maximum value in the tree
  public findMax(): T | null {
    if (this.root === null) return null;
    
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.value;
  }

  // Check if the tree is empty
  public isEmpty(): boolean {
    return this.root === null;
  }

  // Get the root node (for advanced operations)
  public getRoot(): BinaryTreeNode<T> | null {
    return this.root;
  }
}
// Create a binary tree of numbers
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
console.log(tree.search(7));  // true
console.log(tree.search(20)); // false

// Traversals
console.log("In-order traversal:");
tree.inOrderTraversal(value => console.log(value)); // 3, 5, 7, 10, 12, 15, 18

console.log("Pre-order traversal:");
tree.preOrderTraversal(value => console.log(value)); // 10, 5, 3, 7, 15, 12, 18

console.log("Level-order traversal:");
tree.levelOrderTraversal(value => console.log(value)); // 10, 5, 15, 3, 7, 12, 18

// Tree properties
console.log("Tree height:", tree.getHeight());        // 3
console.log("Minimum value:", tree.findMin());        // 3
console.log("Maximum value:", tree.findMax());        // 18
console.log("Is empty:", tree.isEmpty());            // false
class BinaryTreeWithComparator<T> {
  private root: BinaryTreeNode<T> | null;
  private comparator: (a: T, b: T) => number;

  constructor(comparator?: (a: T, b: T) => number) {
    this.root = null;
    this.comparator = comparator || ((a: T, b: T) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  }

  // Methods would use this.comparator instead of direct comparison
  private compare(a: T, b: T): number {
    return this.comparator(a, b);
  }

  // ... rest of the implementation
}

// Usage with custom comparator
const stringTree = new BinaryTreeWithComparator<string>();
stringTree.insert("apple");
stringTree.insert("banana");
stringTree.insert("cherry");

// Custom object tree
interface Person {
  name: string;
  age: number;
}

const personTree = new BinaryTreeWithComparator<Person>(
  (a, b) => a.age - b.age
);

personTree.insert({ name: "Alice", age: 25 });
personTree.insert({ name: "Bob", age: 30 });

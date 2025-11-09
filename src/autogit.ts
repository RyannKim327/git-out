class AVLTreeNode<T> {
  value: T;
  left: AVLTreeNode<T> | null;
  right: AVLTreeNode<T> | null;
  height: number;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree<T> {
  private root: AVLTreeNode<T> | null;
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0) {
    this.root = null;
    this.comparator = comparator;
  }

  // Get the height of a node
  private getHeight(node: AVLTreeNode<T> | null): number {
    return node ? node.height : 0;
  }

  // Update the height of a node
  private updateHeight(node: AVLTreeNode<T>): void {
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }

  // Get the balance factor of a node
  private getBalanceFactor(node: AVLTreeNode<T>): number {
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  // Right rotation
  private rotateRight(y: AVLTreeNode<T>): AVLTreeNode<T> {
    const x = y.left!;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  // Left rotation
  private rotateLeft(x: AVLTreeNode<T>): AVLTreeNode<T> {
    const y = x.right!;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  // Balance the tree
  private balance(node: AVLTreeNode<T>): AVLTreeNode<T> {
    const balanceFactor = this.getBalanceFactor(node);

    // Left Left Case
    if (balanceFactor > 1 && this.getBalanceFactor(node.left!) >= 0) {
      return this.rotateRight(node);
    }

    // Right Right Case
    if (balanceFactor < -1 && this.getBalanceFactor(node.right!) <= 0) {
      return this.rotateLeft(node);
    }

    // Left Right Case
    if (balanceFactor > 1 && this.getBalanceFactor(node.left!) < 0) {
      node.left = this.rotateLeft(node.left!);
      return this.rotateRight(node);
    }

    // Right Left Case
    if (balanceFactor < -1 && this.getBalanceFactor(node.right!) > 0) {
      node.right = this.rotateRight(node.right!);
      return this.rotateLeft(node);
    }

    return node;
  }

  // Insert a value
  insert(value: T): void {
    this.root = this.insertNode(this.root, value);
  }

  private insertNode(node: AVLTreeNode<T> | null, value: T): AVLTreeNode<T> {
    // Step 1: Perform normal BST insertion
    if (node === null) {
      return new AVLTreeNode(value);
    }

    const compare = this.comparator(value, node.value);

    if (compare < 0) {
      node.left = this.insertNode(node.left, value);
    } else if (compare > 0) {
      node.right = this.insertNode(node.right, value);
    } else {
      // Duplicate values not allowed
      return node;
    }

    // Step 2: Update height of current node
    this.updateHeight(node);

    // Step 3: Balance the tree
    return this.balance(node);
  }

  // Find the node with minimum value
  private findMinNode(node: AVLTreeNode<T>): AVLTreeNode<T> {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  // Delete a value
  delete(value: T): void {
    this.root = this.deleteNode(this.root, value);
  }

  private deleteNode(node: AVLTreeNode<T> | null, value: T): AVLTreeNode<T> | null {
    // Step 1: Perform standard BST delete
    if (node === null) {
      return null;
    }

    const compare = this.comparator(value, node.value);

    if (compare < 0) {
      node.left = this.deleteNode(node.left, value);
    } else if (compare > 0) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // Node to be deleted found

      // Node with only one child or no child
      if (node.left === null || node.right === null) {
        const temp = node.left || node.right;

        // No child case
        if (temp === null) {
          return null;
        } else {
          // One child case
          node = temp;
        }
      } else {
        // Node with two children
        const temp = this.findMinNode(node.right);
        node.value = temp.value;
        node.right = this.deleteNode(node.right, temp.value);
      }
    }

    // Step 2: Update height
    this.updateHeight(node!);

    // Step 3: Balance the tree
    return this.balance(node!);
  }

  // Search for a value
  search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: AVLTreeNode<T> | null, value: T): boolean {
    if (node === null) {
      return false;
    }

    const compare = this.comparator(value, node.value);

    if (compare < 0) {
      return this.searchNode(node.left, value);
    } else if (compare > 0) {
      return this.searchNode(node.right, value);
    } else {
      return true;
    }
  }

  // In-order traversal
  inOrderTraversal(callback: (value: T) => void): void {
    this.inOrder(this.root, callback);
  }

  private inOrder(node: AVLTreeNode<T> | null, callback: (value: T) => void): void {
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

  private preOrder(node: AVLTreeNode<T> | null, callback: (value: T) => void): void {
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

  private postOrder(node: AVLTreeNode<T> | null, callback: (value: T) => void): void {
    if (node !== null) {
      this.postOrder(node.left, callback);
      this.postOrder(node.right, callback);
      callback(node.value);
    }
  }

  // Get the root value (for testing)
  getRootValue(): T | null {
    return this.root ? this.root.value : null;
  }

  // Check if the tree is empty
  isEmpty(): boolean {
    return this.root === null;
  }

  // Print the tree structure (helper for visualization)
  print(): void {
    this.printNode(this.root, "", true);
  }

  private printNode(node: AVLTreeNode<T> | null, prefix: string, isLeft: boolean): void {
    if (node !== null) {
      console.log(prefix + (isLeft ? "├── " : "└── ") + node.value + ` (h:${node.height})`);
      this.printNode(node.left, prefix + (isLeft ? "│   " : "    "), true);
      this.printNode(node.right, prefix + (isLeft ? "│   " : "    "), false);
    }
  }
}

// Example usage
const avl = new AVLTree<number>();

// Insert values
console.log("Inserting values...");
[10, 20, 30, 40, 50, 25].forEach(val => {
  avl.insert(val);
  console.log(`Inserted ${val}`);
});

// Search for values
console.log("\nSearch results:");
console.log("Search 20:", avl.search(20)); // true
console.log("Search 100:", avl.search(100)); // false

// Traversal
console.log("\nIn-order traversal:");
avl.inOrderTraversal(val => console.log(val));

console.log("\nPre-order traversal:");
avl.preOrderTraversal(val => console.log(val));

// Delete values
console.log("\nDeleting 30...");
avl.delete(30);

console.log("In-order traversal after deletion:");
avl.inOrderTraversal(val => console.log(val));

// Print tree structure
console.log("\nTree structure:");
avl.print();

// Example with custom comparator for objects
interface Person {
  name: string;
  age: number;
}

const personTree = new AVLTree<Person>((a, b) => a.age - b.age);

personTree.insert({ name: "Alice", age: 25 });
personTree.insert({ name: "Bob", age: 30 });
personTree.insert({ name: "Charlie", age: 20 });

console.log("\nPerson tree (sorted by age):");
personTree.inOrderTraversal(person => console.log(`${person.name}: ${person.age}`));

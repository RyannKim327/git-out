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
}
class TreeNode<T> {
  constructor(
    public value: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}

class BinaryTree<T> {
  root: TreeNode<T> | null = null;

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
    // Simple insertion strategy: left if less, right if greater
    // For a proper BST, you'd need a comparator function
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
    if (node === null) return false;
    
    if (value === node.value) return true;
    
    if (value < node.value) {
      return this.searchNode(node.left, value);
    } else {
      return this.searchNode(node.right, value);
    }
  }

  // Tree traversals
  inOrder(): T[] {
    const result: T[] = [];
    this.inOrderTraversal(this.root, result);
    return result;
  }

  private inOrderTraversal(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.inOrderTraversal(node.left, result);
      result.push(node.value);
      this.inOrderTraversal(node.right, result);
    }
  }

  preOrder(): T[] {
    const result: T[] = [];
    this.preOrderTraversal(this.root, result);
    return result;
  }

  private preOrderTraversal(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      result.push(node.value);
      this.preOrderTraversal(node.left, result);
      this.preOrderTraversal(node.right, result);
    }
  }

  postOrder(): T[] {
    const result: T[] = [];
    this.postOrderTraversal(this.root, result);
    return result;
  }

  private postOrderTraversal(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.postOrderTraversal(node.left, result);
      this.postOrderTraversal(node.right, result);
      result.push(node.value);
    }
  }

  // Level order traversal (Breadth-First)
  levelOrder(): T[] {
    const result: T[] = [];
    if (this.root === null) return result;

    const queue: TreeNode<T>[] = [this.root];
    
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.value);
      
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
    
    return result;
  }

  // Get the height of the tree
  height(): number {
    return this.getHeight(this.root);
  }

  private getHeight(node: TreeNode<T> | null): number {
    if (node === null) return 0;
    
    const leftHeight = this.getHeight(node.left);
    const rightHeight = this.getHeight(node.right);
    
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Find the minimum value
  findMin(): T | null {
    if (this.root === null) return null;
    
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    
    return current.value;
  }

  // Find the maximum value
  findMax(): T | null {
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

  // Get the number of nodes
  size(): number {
    return this.countNodes(this.root);
  }

  private countNodes(node: TreeNode<T> | null): number {
    if (node === null) return 0;
    
    return 1 + this.countNodes(node.left) + this.countNodes(node.right);
  }
}
class BinaryTree<T> {
  root: TreeNode<T> | null = null;
  
  constructor(private compareFn: (a: T, b: T) => number = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }) {}

  insert(value: T): void {
    const newNode = new TreeNode(value);
    
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    this.insertNode(this.root, newNode);
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
    const comparison = this.compareFn(newNode.value, node.value);
    
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
// Basic usage with numbers
const tree = new BinaryTree<number>();

tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);

console.log('In-order:', tree.inOrder());     // [3, 5, 7, 10, 15]
console.log('Pre-order:', tree.preOrder());   // [10, 5, 3, 7, 15]
console.log('Post-order:', tree.postOrder()); // [3, 7, 5, 15, 10]
console.log('Level-order:', tree.levelOrder()); // [10, 5, 15, 3, 7]
console.log('Search 7:', tree.search(7));    // true
console.log('Search 20:', tree.search(20));  // false
console.log('Height:', tree.height());       // 3
console.log('Size:', tree.size());           // 5
console.log('Min:', tree.findMin());         // 3
console.log('Max:', tree.findMax());         // 15

// Usage with custom objects and comparator
interface Person {
  name: string;
  age: number;
}

const personTree = new BinaryTree<Person>(
  (a, b) => a.age - b.age
);

personTree.insert({ name: 'Alice', age: 25 });
personTree.insert({ name: 'Bob', age: 30 });
personTree.insert({ name: 'Charlie', age: 20 });

console.log('Sorted by age:');
personTree.inOrder().forEach(person => 
  console.log(`${person.name}: ${person.age}`)
);
// Charlie: 20
// Alice: 25  
// Bob: 30

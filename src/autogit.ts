interface TreeNode<T> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}

class BinarySearchTree<T> {
  private root?: TreeNode<T>;

  constructor(private compareFn: (a: T, b: T) => number = (a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  }) {}

  // Insert a value into the BST
  insert(value: T): void {
    this.root = this.insertNode(this.root, value);
  }

  private insertNode(node: TreeNode<T> | undefined, value: T): TreeNode<T> {
    if (!node) {
      return { value };
    }

    const comparison = this.compareFn(value, node.value);
    
    if (comparison < 0) {
      node.left = this.insertNode(node.left, value);
    } else if (comparison > 0) {
      node.right = this.insertNode(node.right, value);
    }
    
    return node;
  }

  // Search for a value
  search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: TreeNode<T> | undefined, value: T): boolean {
    if (!node) return false;

    const comparison = this.compareFn(value, node.value);
    
    if (comparison === 0) return true;
    if (comparison < 0) return this.searchNode(node.left, value);
    return this.searchNode(node.right, value);
  }

  // In-order traversal (left, root, right)
  inOrderTraversal(callback: (value: T) => void): void {
    this.inOrder(this.root, callback);
  }

  private inOrder(node: TreeNode<T> | undefined, callback: (value: T) => void): void {
    if (node) {
      this.inOrder(node.left, callback);
      callback(node.value);
      this.inOrder(node.right, callback);
    }
  }

  // Pre-order traversal (root, left, right)
  preOrderTraversal(callback: (value: T) => void): void {
    this.preOrder(this.root, callback);
  }

  private preOrder(node: TreeNode<T> | undefined, callback: (value: T) => void): void {
    if (node) {
      callback(node.value);
      this.preOrder(node.left, callback);
      this.preOrder(node.right, callback);
    }
  }

  // Post-order traversal (left, right, root)
  postOrderTraversal(callback: (value: T) => void): void {
    this.postOrder(this.root, callback);
  }

  private postOrder(node: TreeNode<T> | undefined, callback: (value: T) => void): void {
    if (node) {
      this.postOrder(node.left, callback);
      this.postOrder(node.right, callback);
      callback(node.value);
    }
  }

  // Find minimum value
  findMin(): T | undefined {
    if (!this.root) return undefined;
    return this.findMinNode(this.root).value;
  }

  private findMinNode(node: TreeNode<T>): TreeNode<T> {
    return node.left ? this.findMinNode(node.left) : node;
  }

  // Find maximum value
  findMax(): T | undefined {
    if (!this.root) return undefined;
    return this.findMaxNode(this.root).value;
  }

  private findMaxNode(node: TreeNode<T>): TreeNode<T> {
    return node.right ? this.findMaxNode(node.right) : node;
  }

  // Remove a value
  remove(value: T): void {
    this.root = this.removeNode(this.root, value);
  }

  private removeNode(node: TreeNode<T> | undefined, value: T): TreeNode<T> | undefined {
    if (!node) return undefined;

    const comparison = this.compareFn(value, node.value);
    
    if (comparison < 0) {
      node.left = this.removeNode(node.left, value);
      return node;
    } else if (comparison > 0) {
      node.right = this.removeNode(node.right, value);
      return node;
    } else {
      // Node to delete found
      if (!node.left && !node.right) {
        return undefined; // No children
      }
      
      if (!node.left) {
        return node.right; // Only right child
      }
      
      if (!node.right) {
        return node.left; // Only left child
      }
      
      // Node has two children
      const minRight = this.findMinNode(node.right);
      node.value = minRight.value;
      node.right = this.removeNode(node.right, minRight.value);
      return node;
    }
  }

  // Get height of the tree
  height(): number {
    return this.getHeight(this.root);
  }

  private getHeight(node: TreeNode<T> | undefined): number {
    if (!node) return -1;
    
    const leftHeight = this.getHeight(node.left);
    const rightHeight = this.getHeight(node.right);
    
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Check if tree is empty
  isEmpty(): boolean {
    return !this.root;
  }

  // Clear the tree
  clear(): void {
    this.root = undefined;
  }
}
// Example 1: Number BST
const numberBST = new BinarySearchTree<number>();
numberBST.insert(10);
numberBST.insert(5);
numberBST.insert(15);
numberBST.insert(3);
numberBST.insert(7);

console.log('In-order traversal:');
numberBST.inOrderTraversal(value => console.log(value));
// Output: 3, 5, 7, 10, 15

console.log('Search for 7:', numberBST.search(7)); // true
console.log('Search for 20:', numberBST.search(20)); // false
console.log('Min value:', numberBST.findMin()); // 3
console.log('Max value:', numberBST.findMax()); // 15

// Example 2: Custom objects with comparison function
interface Person {
  name: string;
  age: number;
}

const personBST = new BinarySearchTree<Person>((a, b) => a.age - b.age);
personBST.insert({ name: 'Alice', age: 25 });
personBST.insert({ name: 'Bob', age: 30 });
personBST.insert({ name: 'Charlie', age: 20 });

console.log('People in age order:');
personBST.inOrderTraversal(person => console.log(`${person.name}: ${person.age}`));
// Output: Charlie:20, Alice:25, Bob:30

// Example 3: String BST with custom comparison
const stringBST = new BinarySearchTree<string>((a, b) => a.localeCompare(b));
stringBST.insert('apple');
stringBST.insert('banana');
stringBST.insert('cherry');

console.log('Pre-order traversal:');
stringBST.preOrderTraversal(value => console.log(value));
// Output: apple, banana, cherry

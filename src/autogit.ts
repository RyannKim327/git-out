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

  // Insert a value (simple level-order insertion for completeness)
  insert(value: T): void {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    const queue: TreeNode<T>[] = [this.root];
    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (!current.left) {
        current.left = newNode;
        return;
      } else {
        queue.push(current.left);
      }

      if (!current.right) {
        current.right = newNode;
        return;
      } else {
        queue.push(current.right);
      }
    }
  }

  // Pre-order traversal (root -> left -> right)
  preOrderTraversal(node: TreeNode<T> | null, callback: (value: T) => void): void {
    if (!node) return;
    callback(node.value);
    this.preOrderTraversal(node.left, callback);
    this.preOrderTraversal(node.right, callback);
  }

  // In-order traversal (left -> root -> right)
  inOrderTraversal(node: TreeNode<T> | null, callback: (value: T) => void): void {
    if (!node) return;
    this.inOrderTraversal(node.left, callback);
    callback(node.value);
    this.inOrderTraversal(node.right, callback);
  }

  // Post-order traversal (left -> right -> root)
  postOrderTraversal(node: TreeNode<T> | null, callback: (value: T) => void): void {
    if (!node) return;
    this.postOrderTraversal(node.left, callback);
    this.postOrderTraversal(node.right, callback);
    callback(node.value);
  }

  // Level-order traversal (breadth-first)
  levelOrderTraversal(callback: (value: T) => void): void {
    if (!this.root) return;
    
    const queue: TreeNode<T>[] = [this.root];
    while (queue.length > 0) {
      const current = queue.shift()!;
      callback(current.value);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }
}
// Create a binary tree of numbers
const numberTree = new BinaryTree<number>();

// Insert values
numberTree.insert(1);
numberTree.insert(2);
numberTree.insert(3);
numberTree.insert(4);
numberTree.insert(5);

// Traversal examples
console.log('Pre-order:');
numberTree.preOrderTraversal(numberTree.root, v => console.log(v));

console.log('\nIn-order:');
numberTree.inOrderTraversal(numberTree.root, v => console.log(v));

console.log('\nPost-order:');
numberTree.postOrderTraversal(numberTree.root, v => console.log(v));

console.log('\nLevel-order:');
numberTree.levelOrderTraversal(v => console.log(v));
class BinarySearchTree<T> extends BinaryTree<T> {
  constructor(private compare: (a: T, b: T) => number) {
    super();
  }

  // BST-specific insertion
  insert(value: T): void {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (this.compare(value, current.value) < 0) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  // BST search
  search(value: T): boolean {
    let current = this.root;
    while (current) {
      const comparison = this.compare(value, current.value);
      if (comparison === 0) return true;
      current = comparison < 0 ? current.left : current.right;
    }
    return false;
  }
}

// Usage
const bst = new BinarySearchTree<number>((a, b) => a - b);
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(2);

console.log('\nBST Search for 3:', bst.search(3)); // true
console.log('BST Search for 9:', bst.search(9)); // false

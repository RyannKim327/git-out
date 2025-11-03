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
    // Simple insertion logic (you might want to modify this for BST)
    if (node.left === null) {
      node.left = newNode;
    } else if (node.right === null) {
      node.right = newNode;
    } else {
      // For a complete binary tree, alternate sides
      this.insertNode(node.left, newNode);
    }
  }

  // In-order traversal
  inOrderTraversal(node: TreeNode<T> | null = this.root): T[] {
    if (node === null) return [];
    
    return [
      ...this.inOrderTraversal(node.left),
      node.value,
      ...this.inOrderTraversal(node.right)
    ];
  }

  // Pre-order traversal
  preOrderTraversal(node: TreeNode<T> | null = this.root): T[] {
    if (node === null) return [];
    
    return [
      node.value,
      ...this.preOrderTraversal(node.left),
      ...this.preOrderTraversal(node.right)
    ];
  }

  // Post-order traversal
  postOrderTraversal(node: TreeNode<T> | null = this.root): T[] {
    if (node === null) return [];
    
    return [
      ...this.postOrderTraversal(node.left),
      ...this.postOrderTraversal(node.right),
      node.value
    ];
  }

  // Search for a value
  search(value: T, node: TreeNode<T> | null = this.root): boolean {
    if (node === null) return false;
    
    if (node.value === value) return true;
    
    return this.search(value, node.left) || this.search(value, node.right);
  }

  // Get height of the tree
  getHeight(node: TreeNode<T> | null = this.root): number {
    if (node === null) return 0;
    
    const leftHeight = this.getHeight(node.left);
    const rightHeight = this.getHeight(node.right);
    
    return Math.max(leftHeight, rightHeight) + 1;
  }
}
class BSTNode<T> {
  value: T;
  left: BSTNode<T> | null;
  right: BSTNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree<T> {
  root: BSTNode<T> | null;

  constructor() {
    this.root = null;
  }

  // Insert with comparison for BST
  insert(value: T): void {
    const newNode = new BSTNode(value);
    
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    this.insertBST(this.root, newNode);
  }

  private insertBST(node: BSTNode<T>, newNode: BSTNode<T>): void {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertBST(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertBST(node.right, newNode);
      }
    }
  }

  // Search in BST (more efficient)
  search(value: T, node: BSTNode<T> | null = this.root): boolean {
    if (node === null) return false;
    
    if (value === node.value) return true;
    
    if (value < node.value) {
      return this.search(value, node.left);
    } else {
      return this.search(value, node.right);
    }
  }

  // Find minimum value
  findMin(node: BSTNode<T> | null = this.root): T | null {
    if (node === null) return null;
    
    while (node.left !== null) {
      node = node.left;
    }
    
    return node.value;
  }

  // Find maximum value
  findMax(node: BSTNode<T> | null = this.root): T | null {
    if (node === null) return null;
    
    while (node.right !== null) {
      node = node.right;
    }
    
    return node.value;
  }
}
// Basic Binary Tree
const tree = new BinaryTree<number>();
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);

console.log('In-order:', tree.inOrderTraversal());
console.log('Pre-order:', tree.preOrderTraversal());
console.log('Post-order:', tree.postOrderTraversal());
console.log('Height:', tree.getHeight());
console.log('Search 7:', tree.search(7));

// Binary Search Tree
const bst = new BinarySearchTree<number>();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);

console.log('BST In-order:', bst.inOrderTraversal());
console.log('Min value:', bst.findMin());
console.log('Max value:', bst.findMax());
console.log('Search 7 in BST:', bst.search(7));
interface IBinaryTree<T> {
  insert(value: T): void;
  search(value: T): boolean;
  inOrderTraversal(): T[];
  preOrderTraversal(): T[];
  postOrderTraversal(): T[];
  getHeight(): number;
}

// Implement the interface
class GenericBinaryTree<T> implements IBinaryTree<T> {
  // ... implementation same as above
}

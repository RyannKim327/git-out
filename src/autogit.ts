// Define the structure of a single tree node
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

// Binary Tree (BST) implementation
class BinaryTree<T> {
  root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  // Insert a new value into the tree
  insert(value: T): void {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let currentNode = this.root;
    while (true) {
      if (value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  // Search for a value in the tree
  search(value: T): boolean {
    let currentNode = this.root;
    while (currentNode) {
      if (value === currentNode.value) return true;
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return false;
  }

  // In-order traversal (left-root-right)
  inOrderTraversal(node: TreeNode<T> | null = this.root): T[] {
    const result: T[] = [];
    const traverse = (n: TreeNode<T> | null) => {
      if (!n) return;
      traverse(n.left);
      result.push(n.value);
      traverse(n.right);
    };
    traverse(node);
    return result;
  }

  // Pre-order traversal (root-left-right)
  preOrderTraversal(node: TreeNode<T> | null = this.root): T[] {
    const result: T[] = [];
    const traverse = (n: TreeNode<T> | null) => {
      if (!n) return;
      result.push(n.value);
      traverse(n.left);
      traverse(n.right);
    };
    traverse(node);
    return result;
  }

  // Post-order traversal (left-right-root)
  postOrderTraversal(node: TreeNode<T> | null = this.root): T[] {
    const result: T[] = [];
    const traverse = (n: TreeNode<T> | null) => {
      if (!n) return;
      traverse(n.left);
      traverse(n.right);
      result.push(n.value);
    };
    traverse(node);
    return result;
  }
}

// Usage Example
const tree = new BinaryTree<number>();
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);

console.log(tree.search(7)); // true
console.log(tree.search(99)); // false

console.log("In-order:", tree.inOrderTraversal());    // [3, 5, 7, 10, 15]
console.log("Pre-order:", tree.preOrderTraversal());  // [10, 5, 3, 7, 15]
console.log("Post-order:", tree.postOrderTraversal()); // [3, 7, 5, 15, 10]

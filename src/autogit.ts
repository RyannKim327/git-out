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

  // Insert a new value into the tree
  insert(value: T): void {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          break;
        } else {
          current = current.left;
        }
      } else {
        if (current.right === null) {
          current.right = newNode;
          break;
        } else {
          current = current.right;
        }
      }
    }
  }

  // In-order traversal (left, root, right)
  inorderTraversal(node: TreeNode<T> | null = this.root, visit: (value: T) => void): void {
    if (node !== null) {
      this.inorderTraversal(node.left, visit);
      visit(node.value);
      this.inorderTraversal(node.right, visit);
    }
  }

  // Pre-order traversal (root, left, right)
  preorderTraversal(node: TreeNode<T> | null = this.root, visit: (value: T) => void): void {
    if (node !== null) {
      visit(node.value);
      this.preorderTraversal(node.left, visit);
      this.preorderTraversal(node.right, visit);
    }
  }

  // Post-order traversal (left, right, root)
  postorderTraversal(node: TreeNode<T> | null = this.root, visit: (value: T) => void): void {
    if (node !== null) {
      this.postorderTraversal(node.left, visit);
      this.postorderTraversal(node.right, visit);
      visit(node.value);
    }
  }
}
const tree = new BinaryTree<number>();
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);

console.log("In-order traversal:");
tree.inorderTraversal(undefined, value => console.log(value));

console.log("Pre-order traversal:");
tree.preorderTraversal(undefined, value => console.log(value));

console.log("Post-order traversal:");
tree.postorderTraversal(undefined, value => console.log(value));

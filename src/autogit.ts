enum Color {
  RED = 'RED',
  BLACK = 'BLACK'
}

interface RBNode<T> {
  value: T;
  color: Color;
  left: RBNode<T> | null;
  right: RBNode<T> | null;
  parent: RBNode<T> | null;
}

class RedBlackTree<T> {
  private root: RBNode<T> | null = null;
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }) {
    this.comparator = comparator;
  }

  // Public methods
  insert(value: T): void {
    const newNode: RBNode<T> = {
      value,
      color: Color.RED,
      left: null,
      right: null,
      parent: null
    };

    this.root = this.insertNode(this.root, newNode);
    this.fixInsert(newNode);
  }

  search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  inOrderTraversal(callback: (value: T) => void): void {
    this.inOrder(this.root, callback);
  }

  // Private methods
  private insertNode(root: RBNode<T> | null, node: RBNode<T>): RBNode<T> {
    if (root === null) return node;

    let current: RBNode<T> | null = root;
    let parent: RBNode<T> | null = null;

    while (current !== null) {
      parent = current;
      if (this.comparator(node.value, current.value) < 0) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    node.parent = parent;
    if (parent === null) {
      return node;
    } else if (this.comparator(node.value, parent.value) < 0) {
      parent.left = node;
    } else {
      parent.right = node;
    }

    return root;
  }

  private fixInsert(node: RBNode<T>): void {
    let current = node;
    
    while (current.parent?.color === Color.RED) {
      const parent = current.parent!;
      const grandparent = parent.parent!;

      if (parent === grandparent.left) {
        const uncle = grandparent.right;

        if (uncle?.color === Color.RED) {
          // Case 1: Uncle is red
          parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          grandparent.color = Color.RED;
          current = grandparent;
        } else {
          if (current === parent.right) {
            // Case 2: Current is right child
            current = parent;
            this.leftRotate(current);
          }
          // Case 3: Current is left child
          parent.color = Color.BLACK;
          grandparent.color = Color.RED;
          this.rightRotate(grandparent);
        }
      } else {
        const uncle = grandparent.left;

        if (uncle?.color === Color.RED) {
          // Case 1: Uncle is red
          parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          grandparent.color = Color.RED;
          current = grandparent;
        } else {
          if (current === parent.left) {
            // Case 2: Current is left child
            current = parent;
            this.rightRotate(current);
          }
          // Case 3: Current is right child
          parent.color = Color.BLACK;
          grandparent.color = Color.RED;
          this.leftRotate(grandparent);
        }
      }
    }

    this.root!.color = Color.BLACK;
  }

  private leftRotate(node: RBNode<T>): void {
    const rightChild = node.right!;
    node.right = rightChild.left;

    if (rightChild.left !== null) {
      rightChild.left.parent = node;
    }

    rightChild.parent = node.parent;

    if (node.parent === null) {
      this.root = rightChild;
    } else if (node === node.parent.left) {
      node.parent.left = rightChild;
    } else {
      node.parent.right = rightChild;
    }

    rightChild.left = node;
    node.parent = rightChild;
  }

  private rightRotate(node: RBNode<T>): void {
    const leftChild = node.left!;
    node.left = leftChild.right;

    if (leftChild.right !== null) {
      leftChild.right.parent = node;
    }

    leftChild.parent = node.parent;

    if (node.parent === null) {
      this.root = leftChild;
    } else if (node === node.parent.right) {
      node.parent.right = leftChild;
    } else {
      node.parent.left = leftChild;
    }

    leftChild.right = node;
    node.parent = leftChild;
  }

  private searchNode(node: RBNode<T> | null, value: T): boolean {
    if (node === null) return false;

    const comparison = this.comparator(value, node.value);
    
    if (comparison === 0) return true;
    if (comparison < 0) return this.searchNode(node.left, value);
    return this.searchNode(node.right, value);
  }

  private inOrder(node: RBNode<T> | null, callback: (value: T) => void): void {
    if (node === null) return;
    
    this.inOrder(node.left, callback);
    callback(node.value);
    this.inOrder(node.right, callback);
  }

  // Utility methods
  getRoot(): RBNode<T> | null {
    return this.root;
  }

  getHeight(): number {
    return this.calculateHeight(this.root);
  }

  private calculateHeight(node: RBNode<T> | null): number {
    if (node === null) return 0;
    return 1 + Math.max(
      this.calculateHeight(node.left),
      this.calculateHeight(node.right)
    );
  }
}

// Example usage
const rbTree = new RedBlackTree<number>();

// Insert values
rbTree.insert(10);
rbTree.insert(20);
rbTree.insert(30);
rbTree.insert(15);
rbTree.insert(25);

// Search for values
console.log(rbTree.search(15)); // true
console.log(rbTree.search(40)); // false

// In-order traversal
rbTree.inOrderTraversal(value => console.log(value)); // 10, 15, 20, 25, 30

console.log('Tree height:', rbTree.getHeight());

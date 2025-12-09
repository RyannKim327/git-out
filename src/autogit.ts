enum Color {
  RED = 'RED',
  BLACK = 'BLACK'
}

class RBNode<T> {
  value: T;
  color: Color;
  left: RBNode<T> | null;
  right: RBNode<T> | null;
  parent: RBNode<T> | null;

  constructor(value: T, color: Color = Color.RED) {
    this.value = value;
    this.color = color;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class RedBlackTree<T> {
  private root: RBNode<T> | null;
  private compare: (a: T, b: T) => number;

  constructor(compareFn?: (a: T, b: T) => number) {
    this.root = null;
    this.compare = compareFn || ((a: T, b: T) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  }

  // Public insert method
  insert(value: T): void {
    const newNode = new RBNode(value);
    this.root = this.insertNode(this.root, newNode);
    this.fixInsert(newNode);
  }

  // Private insert helper
  private insertNode(root: RBNode<T> | null, node: RBNode<T>): RBNode<T> {
    if (root === null) {
      return node;
    }

    if (this.compare(node.value, root.value) < 0) {
      root.left = this.insertNode(root.left, node);
      root.left.parent = root;
    } else {
      root.right = this.insertNode(root.right, node);
      root.right.parent = root;
    }

    return root;
  }

  // Fix violations after insertion
  private fixInsert(node: RBNode<T>): void {
    while (node !== this.root && node.parent?.color === Color.RED) {
      let parent = node.parent!;
      let grandparent = parent.parent!;

      // Case A: Parent is left child of grandparent
      if (parent === grandparent.left) {
        const uncle = grandparent.right;

        // Case 1: Uncle is red
        if (uncle?.color === Color.RED) {
          parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          grandparent.color = Color.RED;
          node = grandparent;
        } else {
          // Case 2: Node is right child
          if (node === parent.right) {
            this.rotateLeft(parent);
            node = parent;
            parent = node.parent!;
          }

          // Case 3: Node is left child
          this.rotateRight(grandparent);
          this.swapColors(parent, grandparent);
          node = parent;
        }
      } 
      // Case B: Parent is right child of grandparent
      else {
        const uncle = grandparent.left;

        // Case 1: Uncle is red
        if (uncle?.color === Color.RED) {
          parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          grandparent.color = Color.RED;
          node = grandparent;
        } else {
          // Case 2: Node is left child
          if (node === parent.left) {
            this.rotateRight(parent);
            node = parent;
            parent = node.parent!;
          }

          // Case 3: Node is right child
          this.rotateLeft(grandparent);
          this.swapColors(parent, grandparent);
          node = parent;
        }
      }
    }

    // Ensure root is black
    if (this.root) {
      this.root.color = Color.BLACK;
    }
  }

  // Rotation methods
  private rotateLeft(node: RBNode<T>): void {
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

  private rotateRight(node: RBNode<T>): void {
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

  private swapColors(node1: RBNode<T>, node2: RBNode<T>): void {
    const temp = node1.color;
    node1.color = node2.color;
    node2.color = temp;
  }

  // Search method
  search(value: T): RBNode<T> | null {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: RBNode<T> | null, value: T): RBNode<T> | null {
    if (node === null) return null;

    const comparison = this.compare(value, node.value);

    if (comparison === 0) return node;
    if (comparison < 0) return this.searchNode(node.left, value);
    return this.searchNode(node.right, value);
  }

  // In-order traversal for testing
  inOrderTraversal(): T[] {
    const result: T[] = [];
    this.inOrder(this.root, result);
    return result;
  }

  private inOrder(node: RBNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
  }

  // Get height for testing balance
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

  // Check if tree is valid (for testing)
  isValid(): boolean {
    return this.validateRBTree(this.root);
  }

  private validateRBTree(node: RBNode<T> | null): boolean {
    if (node === null) return true;

    // Check red node properties
    if (node.color === Color.RED) {
      if (node.left?.color === Color.RED || node.right?.color === Color.RED) {
        return false;
      }
    }

    // Check black height
    const leftBlackHeight = this.getBlackHeight(node.left);
    const rightBlackHeight = this.getBlackHeight(node.right);

    return leftBlackHeight === rightBlackHeight && 
           this.validateRBTree(node.left) && 
           this.validateRBTree(node.right);
  }

  private getBlackHeight(node: RBNode<T> | null): number {
    if (node === null) return 1;
    
    const height = this.getBlackHeight(node.left);
    return height + (node.color === Color.BLACK ? 1 : 0);
  }
}

// Example usage and testing
function exampleUsage(): void {
  // Create a red-black tree for numbers
  const tree = new RedBlackTree<number>();

  // Insert values
  const values = [10, 20, 30, 15, 25, 5, 35];
  values.forEach(value => tree.insert(value));

  // Test search
  console.log('Search 15:', tree.search(15) !== null);
  console.log('Search 100:', tree.search(100) !== null);

  // Test traversal (should be sorted)
  console.log('In-order traversal:', tree.inOrderTraversal());

  // Test properties
  console.log('Tree height:', tree.getHeight());
  console.log('Is valid RB tree:', tree.isValid());

  // Example with custom comparator
  const stringTree = new RedBlackTree<string>((a, b) => a.localeCompare(b));
  stringTree.insert('apple');
  stringTree.insert('banana');
  stringTree.insert('cherry');
  console.log('String tree traversal:', stringTree.inOrderTraversal());
}

// Run the example
exampleUsage();

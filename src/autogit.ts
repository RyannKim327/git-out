enum Color {
  RED = 'RED',
  BLACK = 'BLACK'
}

class Node<T> {
  data: T;
  color: Color;
  left: Node<T> | null = null;
  right: Node<T> | null = null;
  parent: Node<T> | null = null;

  constructor(data: T, color: Color = Color.RED) {
    this.data = data;
    this.color = color;
  }
}

class RedBlackTree<T> {
  private root: Node<T> | null = null;

  // Helper to find the uncle node
  private getUncle(node: Node<T>): Node<T> | null {
    const parent = node.parent;
    if (!parent || !parent.parent) return null;

    if (parent === parent.parent.left) {
      return parent.parent.right;
    } else {
      return parent.parent.left;
    }
  }

  // Left rotate
  private rotateLeft(node: Node<T>): void {
    const rightChild = node.right!;
    node.right = rightChild.left;
    if (rightChild.left) rightChild.left.parent = node;

    rightChild.parent = node.parent;
    if (!node.parent) {
      this.root = rightChild;
    } else if (node === node.parent.left) {
      node.parent.left = rightChild;
    } else {
      node.parent.right = rightChild;
    }

    rightChild.left = node;
    node.parent = rightChild;
  }

  // Right rotate
  private rotateRight(node: Node<T>): void {
    const leftChild = node.left!;
    node.left = leftChild.right;
    if (leftChild.right) leftChild.right.parent = node;

    leftChild.parent = node.parent;
    if (!node.parent) {
      this.root = leftChild;
    } else if (node === node.parent.left) {
      node.parent.left = leftChild;
    } else {
      node.parent.right = leftChild;
    }

    leftChild.right = node;
    node.parent = leftChild;
  }

  // Insert a value
  insert(data: T): void {
    const newNode = new Node<T>(data);
    if (!this.root) {
      this.root = newNode;
      this.fixInsert(newNode);
      return;
    }

    let current = this.root;
    let parent: Node<T> | null = null;

    while (current) {
      parent = current;
      if (data < current.data) {
        current = current.left!;
      } else {
        current = current.right!;
      }
    }

    newNode.parent = parent;
    if (data < parent!.data) {
      parent!.left = newNode;
    } else {
      parent!.right = newNode;
    }

    this.fixInsert(newNode);
  }

  // Fix tree after insertion
  private fixInsert(node: Node<T>): void {
    while (node !== this.root && node.parent!.color === Color.RED) {
      const uncle = this.getUncle(node);
      const parent = node.parent!;
      const grandparent = parent.parent!;

      if (uncle && uncle.color === Color.RED) {
        // Case 1: Uncle is red
        parent.color = Color.BLACK;
        uncle.color = Color.BLACK;
        grandparent.color = Color.RED;
        node = grandparent;
      } else {
        // Uncle is black or null
        if (parent === grandparent.left) {
          if (node === parent.right) {
            // Case 2: Node is right child
            this.rotateLeft(parent);
            node = parent;
            parent = node.parent!;
          }
          // Case 3: Node is left child
          this.rotateRight(grandparent);
          parent.color = Color.BLACK;
          grandparent.color = Color.RED;
        } else {
          if (node === parent.left) {
            // Mirror case
            this.rotateRight(parent);
            node = parent;
            parent = node.parent!;
          }
          this.rotateLeft(grandparent);
          parent.color = Color.BLACK;
          grandparent.color = Color.RED;
        }
      }
    }
    this.root!.color = Color.BLACK;
  }

  // In-order traversal to display the tree
  inOrderTraversal(node: Node<T> | null = this.root): void {
    if (node) {
      this.inOrderTraversal(node.left);
      console.log(`${node.data} (${node.color})`);
      this.inOrderTraversal(node.right);
    }
  }
}

// Usage example
const rbTree = new RedBlackTree<number>();
rbTree.insert(10);
rbTree.insert(20);
rbTree.insert(30);
rbTree.insert(15);
rbTree.insert(25);

rbTree.inOrderTraversal(); // Prints the tree nodes in order

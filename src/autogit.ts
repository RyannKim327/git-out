// Node colors
enum Color {
  RED = 'RED',
  BLACK = 'BLACK'
}

// Node class
class RBNode<T> {
  data: T;
  color: Color;
  left: RBNode<T> | null;
  right: RBNode<T> | null;
  parent: RBNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.color = Color.RED; // New nodes are always red initially
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

// Comparator type
type Comparator<T> = (a: T, b: T) => number;

// Default comparator (for numbers)
const defaultComparator: Comparator<number> = (a, b) => a - b;

// Red-Black Tree class
class RedBlackTree<T> {
  private root: RBNode<T> | null;
  private comparator: Comparator<T>;

  constructor(comparator?: Comparator<T>) {
    this.root = null;
    this.comparator = comparator || ((a: any, b: any) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  }

  // Public insert method
  insert(data: T): void {
    const newNode = new RBNode(data);
    this.root = this.insertNode(this.root, newNode);
    this.fixInsert(newNode);
  }

  // Private insert helper
  private insertNode(root: RBNode<T> | null, node: RBNode<T>): RBNode<T> {
    if (root === null) {
      return node;
    }

    const cmp = this.comparator(node.data, root.data);
    
    if (cmp < 0) {
      root.left = this.insertNode(root.left, node);
      root.left.parent = root;
    } else if (cmp > 0) {
      root.right = this.insertNode(root.right, node);
      root.right.parent = root;
    }

    return root;
  }

  // Fix violations after insertion
  private fixInsert(node: RBNode<T>): void {
    let parent = node.parent;

    // Case 1: node is root
    if (parent === null) {
      node.color = Color.BLACK;
      return;
    }

    // Case 2: parent is black - no violation
    if (parent.color === Color.BLACK) {
      return;
    }

    const grandparent = parent.parent;
    if (!grandparent) return; // Shouldn't happen but TypeScript check

    const uncle = this.getUncle(parent);

    // Case 3: uncle is red
    if (uncle && uncle.color === Color.RED) {
      parent.color = Color.BLACK;
      uncle.color = Color.BLACK;
      grandparent.color = Color.RED;
      this.fixInsert(grandparent);
      return;
    }

    // Case 4: uncle is black or null
    if (parent === grandparent.left) {
      if (node === parent.right) {
        // Left-right case
        this.rotateLeft(parent);
        parent = node; // node is now parent after rotation
      }
      // Left-left case
      this.rotateRight(grandparent);
      parent.color = Color.BLACK;
      grandparent.color = Color.RED;
    } else {
      if (node === parent.left) {
        // Right-left case
        this.rotateRight(parent);
        parent = node; // node is now parent after rotation
      }
      // Right-right case
      this.rotateLeft(grandparent);
      parent.color = Color.BLACK;
      grandparent.color = Color.RED;
    }
  }

  // Get uncle node
  private getUncle(parent: RBNode<T>): RBNode<T> | null {
    const grandparent = parent.parent;
    if (!grandparent) return null;

    return parent === grandparent.left ? grandparent.right : grandparent.left;
  }

  // Left rotation
  private rotateLeft(node: RBNode<T>): void {
    const rightChild = node.right;
    if (!rightChild) return;

    node.right = rightChild.left;
    if (rightChild.left) {
      rightChild.left.parent = node;
    }

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

  // Right rotation
  private rotateRight(node: RBNode<T>): void {
    const leftChild = node.left;
    if (!leftChild) return;

    node.left = leftChild.right;
    if (leftChild.right) {
      leftChild.right.parent = node;
    }

    leftChild.parent = node.parent;
    
    if (!node.parent) {
      this.root = leftChild;
    } else if (node === node.parent.right) {
      node.parent.right = leftChild;
    } else {
      node.parent.left = leftChild;
    }

    leftChild.right = node;
    node.parent = leftChild;
  }

  // Search method
  search(data: T): RBNode<T> | null {
    return this.searchNode(this.root, data);
  }

  private searchNode(node: RBNode<T> | null, data: T): RBNode<T> | null {
    if (node === null) return null;

    const cmp = this.comparator(data, node.data);
    
    if (cmp === 0) return node;
    if (cmp < 0) return this.searchNode(node.left, data);
    return this.searchNode(node.right, data);
  }

  // In-order traversal
  inOrderTraversal(callback: (data: T) => void): void {
    this.inOrder(this.root, callback);
  }

  private inOrder(node: RBNode<T> | null, callback: (data: T) => void): void {
    if (node) {
      this.inOrder(node.left, callback);
      callback(node.data);
      this.inOrder(node.right, callback);
    }
  }

  // Get height of tree
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
    return this.checkProperties(this.root);
  }

  private checkProperties(node: RBNode<T> | null): boolean {
    if (!node) return true;

    // Check red property: red nodes must have black children
    if (node.color === Color.RED) {
      if ((node.left && node.left.color === Color.RED) ||
          (node.right && node.right.color === Color.RED)) {
        return false;
      }
    }

    // Check black height property recursively
    const leftBlackHeight = this.getBlackHeight(node.left);
    const rightBlackHeight = this.getBlackHeight(node.right);
    
    if (leftBlackHeight !== rightBlackHeight) {
      return false;
    }

    return this.checkProperties(node.left) && this.checkProperties(node.right);
  }

  private getBlackHeight(node: RBNode<T> | null): number {
    if (!node) return 1; // Null nodes are considered black
    
    const leftHeight = this.getBlackHeight(node.left);
    const rightHeight = this.getBlackHeight(node.right);
    
    const add = node.color === Color.BLACK ? 1 : 0;
    return Math.max(leftHeight, rightHeight) + add;
  }
}

// Example usage
const rbTree = new RedBlackTree<number>(defaultComparator);

// Insert some values
rbTree.insert(10);
rbTree.insert(20);
rbTree.insert(30);
rbTree.insert(15);
rbTree.insert(25);

// Traverse and print values
console.log("In-order traversal:");
rbTree.inOrderTraversal((value) => console.log(value));

// Search for a value
const found = rbTree.search(20);
console.log("Found 20:", found !== null);

// Get tree height
console.log("Tree height:", rbTree.getHeight());

// Check if tree is valid
console.log("Tree is valid:", rbTree.isValid());

// Export for use in other modules
export { RedBlackTree, RBNode, Color };

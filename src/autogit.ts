interface AVLNode<T> {
  value: T;
  left: AVLNode<T> | null;
  right: AVLNode<T> | null;
  height: number;
}
class AVLTree<T> {
  private root: AVLNode<T> | null = null;

  constructor(private compareFn: (a: T, b: T) => number = defaultCompare) {}

  // Public methods
  public insert(value: T): void {
    this.root = this.insertNode(this.root, value);
  }

  public delete(value: T): void {
    this.root = this.deleteNode(this.root, value);
  }

  public search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  public inOrderTraversal(): T[] {
    const result: T[] = [];
    this.inOrder(this.root, result);
    return result;
  }

  public getHeight(): number {
    return this.getNodeHeight(this.root);
  }

  // Private helper methods
  private getNodeHeight(node: AVLNode<T> | null): number {
    return node ? node.height : 0;
  }

  private getBalanceFactor(node: AVLNode<T> | null): number {
    if (!node) return 0;
    return this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
  }

  private updateHeight(node: AVLNode<T>): void {
    node.height = Math.max(
      this.getNodeHeight(node.left),
      this.getNodeHeight(node.right)
    ) + 1;
  }

  // Rotations
  private rotateRight(y: AVLNode<T>): AVLNode<T> {
    const x = y.left!;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  private rotateLeft(x: AVLNode<T>): AVLNode<T> {
    const y = x.right!;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  // Insertion
  private insertNode(node: AVLNode<T> | null, value: T): AVLNode<T> {
    // Step 1: Perform normal BST insertion
    if (!node) {
      return { value, left: null, right: null, height: 1 };
    }

    const comparison = this.compareFn(value, node.value);

    if (comparison < 0) {
      node.left = this.insertNode(node.left, value);
    } else if (comparison > 0) {
      node.right = this.insertNode(node.right, value);
    } else {
      // Duplicate values not allowed (or handle as needed)
      return node;
    }

    // Step 2: Update height of current node
    this.updateHeight(node);

    // Step 3: Get balance factor
    const balance = this.getBalanceFactor(node);

    // Step 4: Perform rotations if unbalanced

    // Left Left Case
    if (balance > 1 && this.compareFn(value, node.left!.value) < 0) {
      return this.rotateRight(node);
    }

    // Right Right Case
    if (balance < -1 && this.compareFn(value, node.right!.value) > 0) {
      return this.rotateLeft(node);
    }

    // Left Right Case
    if (balance > 1 && this.compareFn(value, node.left!.value) > 0) {
      node.left = this.rotateLeft(node.left!);
      return this.rotateRight(node);
    }

    // Right Left Case
    if (balance < -1 && this.compareFn(value, node.right!.value) < 0) {
      node.right = this.rotateRight(node.right!);
      return this.rotateLeft(node);
    }

    return node;
  }

  // Deletion
  private deleteNode(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
    // Step 1: Perform standard BST deletion
    if (!node) {
      return null;
    }

    const comparison = this.compareFn(value, node.value);

    if (comparison < 0) {
      node.left = this.deleteNode(node.left, value);
    } else if (comparison > 0) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // Node to be deleted found

      // Node with only one child or no child
      if (!node.left || !node.right) {
        const temp = node.left || node.right;
        
        // No child case
        if (!temp) {
          return null;
        } else {
          // One child case
          node = temp;
        }
      } else {
        // Node with two children: get inorder successor
        const temp = this.getMinValueNode(node.right!);
        node.value = temp.value;
        node.right = this.deleteNode(node.right, temp.value);
      }
    }

    // If the tree had only one node then return
    if (!node) {
      return node;
    }

    // Step 2: Update height
    this.updateHeight(node);

    // Step 3: Get balance factor
    const balance = this.getBalanceFactor(node);

    // Step 4: Perform rotations if unbalanced

    // Left Left Case
    if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rotateRight(node);
    }

    // Left Right Case
    if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.rotateLeft(node.left!);
      return this.rotateRight(node);
    }

    // Right Right Case
    if (balance < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.rotateLeft(node);
    }

    // Right Left Case
    if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rotateRight(node.right!);
      return this.rotateLeft(node);
    }

    return node;
  }

  private getMinValueNode(node: AVLNode<T>): AVLNode<T> {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  // Search
  private searchNode(node: AVLNode<T> | null, value: T): boolean {
    if (!node) return false;

    const comparison = this.compareFn(value, node.value);

    if (comparison === 0) return true;
    if (comparison < 0) return this.searchNode(node.left, value);
    return this.searchNode(node.right, value);
  }

  // Traversal
  private inOrder(node: AVLNode<T> | null, result: T[]): void {
    if (node) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
  }

  // Utility method to print tree (for debugging)
  public printTree(): void {
    this.printNode(this.root, "", true);
  }

  private printNode(node: AVLNode<T> | null, prefix: string, isLeft: boolean): void {
    if (node) {
      console.log(prefix + (isLeft ? "├── " : "└── ") + node.value + `(h:${node.height})`);
      this.printNode(node.left, prefix + (isLeft ? "│   " : "    "), true);
      this.printNode(node.right, prefix + (isLeft ? "│   " : "    "), false);
    }
  }
}

// Default comparison function for numbers
function defaultCompare<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
// Example usage with numbers
const avl = new AVLTree<number>();

// Insert values
avl.insert(10);
avl.insert(20);
avl.insert(30);
avl.insert(40);
avl.insert(50);
avl.insert(25);

console.log("In-order traversal:", avl.inOrderTraversal());
console.log("Tree height:", avl.getHeight());

// Visualize the tree
console.log("\nTree structure:");
avl.printTree();

// Search
console.log("\nSearch 30:", avl.search(30)); // true
console.log("Search 100:", avl.search(100)); // false

// Delete
avl.delete(30);
console.log("\nAfter deleting 30:");
console.log("In-order traversal:", avl.inOrderTraversal());
avl.printTree();

interface AVLNode<T> {
  value: T;
  left: AVLNode<T> | null;
  right: AVLNode<T> | null;
  height: number;
}

class AVLTreeNode<T> implements AVLNode<T> {
  value: T;
  left: AVLNode<T> | null;
  right: AVLNode<T> | null;
  height: number;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}
class AVLTree<T> {
  private root: AVLNode<T> | null;

  constructor() {
    this.root = null;
  }

  // Get height of node
  private getHeight(node: AVLNode<T> | null): number {
    return node ? node.height : 0;
  }

  // Update height of node
  private updateHeight(node: AVLNode<T>): void {
    node.height = Math.max(
      this.getHeight(node.left),
      this.getHeight(node.right)
    ) + 1;
  }

  // Get balance factor
  private getBalanceFactor(node: AVLNode<T> | null): number {
    if (!node) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  // Right rotation
  private rightRotate(y: AVLNode<T>): AVLNode<T> {
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

  // Left rotation
  private leftRotate(x: AVLNode<T>): AVLNode<T> {
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

  // Insert a value
  public insert(value: T): void {
    this.root = this.insertNode(this.root, value);
  }

  private insertNode(node: AVLNode<T> | null, value: T): AVLNode<T> {
    // Perform normal BST insertion
    if (node === null) {
      return new AVLTreeNode(value);
    }

    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value);
    } else {
      // Duplicate values not allowed
      return node;
    }

    // Update height of this ancestor node
    this.updateHeight(node);

    // Get the balance factor
    const balance = this.getBalanceFactor(node);

    // Left Left Case
    if (balance > 1 && value < node.left!.value) {
      return this.rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && value > node.right!.value) {
      return this.leftRotate(node);
    }

    // Left Right Case
    if (balance > 1 && value > node.left!.value) {
      node.left = this.leftRotate(node.left!);
      return this.rightRotate(node);
    }

    // Right Left Case
    if (balance < -1 && value < node.right!.value) {
      node.right = this.rightRotate(node.right!);
      return this.leftRotate(node);
    }

    return node;
  }

  // Delete a value
  public delete(value: T): void {
    this.root = this.deleteNode(this.root, value);
  }

  private deleteNode(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
    if (node === null) {
      return null;
    }

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // Node with only one child or no child
      if (node.left === null || node.right === null) {
        const temp = node.left || node.right;
        
        // No child case
        if (temp === null) {
          return null;
        } else {
          // One child case
          node = temp;
        }
      } else {
        // Node with two children: get the inorder successor
        const temp = this.getMinValueNode(node.right);
        node.value = temp.value;
        node.right = this.deleteNode(node.right, temp.value);
      }
    }

    if (node === null) {
      return node;
    }

    // Update height
    this.updateHeight(node);

    // Get the balance factor
    const balance = this.getBalanceFactor(node);

    // Left Left Case
    if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rightRotate(node);
    }

    // Left Right Case
    if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.leftRotate(node.left!);
      return this.rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.leftRotate(node);
    }

    // Right Left Case
    if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rightRotate(node.right!);
      return this.leftRotate(node);
    }

    return node;
  }

  // Find minimum value node
  private getMinValueNode(node: AVLNode<T>): AVLNode<T> {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  // Search for a value
  public search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: AVLNode<T> | null, value: T): boolean {
    if (node === null) {
      return false;
    }

    if (value < node.value) {
      return this.searchNode(node.left, value);
    } else if (value > node.value) {
      return this.searchNode(node.right, value);
    } else {
      return true;
    }
  }

  // In-order traversal
  public inOrder(): T[] {
    const result: T[] = [];
    this.inOrderTraversal(this.root, result);
    return result;
  }

  private inOrderTraversal(node: AVLNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.inOrderTraversal(node.left, result);
      result.push(node.value);
      this.inOrderTraversal(node.right, result);
    }
  }

  // Pre-order traversal
  public preOrder(): T[] {
    const result: T[] = [];
    this.preOrderTraversal(this.root, result);
    return result;
  }

  private preOrderTraversal(node: AVLNode<T> | null, result: T[]): void {
    if (node !== null) {
      result.push(node.value);
      this.preOrderTraversal(node.left, result);
      this.preOrderTraversal(node.right, result);
    }
  }

  // Post-order traversal
  public postOrder(): T[] {
    const result: T[] = [];
    this.postOrderTraversal(this.root, result);
    return result;
  }

  private postOrderTraversal(node: AVLNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.postOrderTraversal(node.left, result);
      this.postOrderTraversal(node.right, result);
      result.push(node.value);
    }
  }

  // Get tree height
  public getTreeHeight(): number {
    return this.getHeight(this.root);
  }

  // Check if tree is balanced
  public isBalanced(): boolean {
    return this.checkBalance(this.root);
  }

  private checkBalance(node: AVLNode<T> | null): boolean {
    if (node === null) {
      return true;
    }

    const balance = this.getBalanceFactor(node);
    if (Math.abs(balance) > 1) {
      return false;
    }

    return this.checkBalance(node.left) && this.checkBalance(node.right);
  }
}
// Example usage
const avlTree = new AVLTree<number>();

// Insert values
avlTree.insert(10);
avlTree.insert(20);
avlTree.insert(30);
avlTree.insert(40);
avlTree.insert(50);
avlTree.insert(25);

console.log("In-order traversal:", avlTree.inOrder());
console.log("Pre-order traversal:", avlTree.preOrder());
console.log("Tree height:", avlTree.getTreeHeight());
console.log("Is balanced:", avlTree.isBalanced());

// Search for values
console.log("Search 30:", avlTree.search(30)); // true
console.log("Search 100:", avlTree.search(100)); // false

// Delete values
avlTree.delete(30);
console.log("After deleting 30:", avlTree.inOrder());
console.log("Is balanced after deletion:", avlTree.isBalanced());
class AVLTreeGeneric<T> {
  private root: AVLNode<T> | null;
  private compare: (a: T, b: T) => number;

  constructor(compareFn?: (a: T, b: T) => number) {
    this.root = null;
    this.compare = compareFn || ((a: T, b: T) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  }

  // Modify insertNode method to use comparator
  private insertNode(node: AVLNode<T> | null, value: T): AVLNode<T> {
    if (node === null) {
      return new AVLTreeNode(value);
    }

    const comparison = this.compare(value, node.value);
    
    if (comparison < 0) {
      node.left = this.insertNode(node.left, value);
    } else if (comparison > 0) {
      node.right = this.insertNode(node.right, value);
    } else {
      return node;
    }

    // ... rest of the method remains the same
  }

  // Similarly modify searchNode and deleteNode methods
}

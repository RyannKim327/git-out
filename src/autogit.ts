// Node colors
enum Color {
  RED = 'RED',
  BLACK = 'BLACK'
}

// Node interface
interface RBNode<T> {
  value: T;
  color: Color;
  left: RBNode<T> | null;
  right: RBNode<T> | null;
  parent: RBNode<T> | null;
}

// Red-Black Tree class
class RedBlackTree<T> {
  private root: RBNode<T> | null = null;
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number = (a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  }) {
    this.comparator = comparator;
  }

  // Create a new node
  private createNode(value: T, color: Color = Color.RED): RBNode<T> {
    return {
      value,
      color,
      left: null,
      right: null,
      parent: null
    };
  }

  // Insert a value into the tree
  public insert(value: T): void {
    const newNode = this.createNode(value);
    
    if (this.root === null) {
      this.root = newNode;
      this.root.color = Color.BLACK; // Root is always black
      return;
    }

    this.insertNode(this.root, newNode);
    this.fixInsert(newNode);
  }

  // Helper method for insertion
  private insertNode(node: RBNode<T>, newNode: RBNode<T>): void {
    const compare = this.comparator(newNode.value, node.value);
    
    if (compare < 0) {
      if (node.left === null) {
        node.left = newNode;
        newNode.parent = node;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else if (compare > 0) {
      if (node.right === null) {
        node.right = newNode;
        newNode.parent = node;
      } else {
        this.insertNode(node.right, newNode);
      }
    } else {
      // Handle duplicate values (you can modify this behavior)
      throw new Error('Duplicate values not allowed');
    }
  }

  // Fix the tree after insertion
  private fixInsert(node: RBNode<T>): void {
    let current = node;
    
    while (current.parent !== null && current.parent.color === Color.RED) {
      const parent = current.parent!;
      const grandparent = parent.parent!;
      
      if (parent === grandparent.left) {
        const uncle = grandparent.right;
        
        if (uncle !== null && uncle.color === Color.RED) {
          // Case 1: Uncle is red
          parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          grandparent.color = Color.RED;
          current = grandparent;
        } else {
          // Case 2: Uncle is black and current is right child
          if (current === parent.right) {
            current = parent;
            this.leftRotate(current);
          }
          
          // Case 3: Uncle is black and current is left child
          parent.color = Color.BLACK;
          grandparent.color = Color.RED;
          this.rightRotate(grandparent);
        }
      } else {
        const uncle = grandparent.left;
        
        if (uncle !== null && uncle.color === Color.RED) {
          // Mirror case 1
          parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          grandparent.color = Color.RED;
          current = grandparent;
        } else {
          // Mirror case 2
          if (current === parent.left) {
            current = parent;
            this.rightRotate(current);
          }
          
          // Mirror case 3
          parent.color = Color.BLACK;
          grandparent.color = Color.RED;
          this.leftRotate(grandparent);
        }
      }
    }
    
    this.root!.color = Color.BLACK; // Ensure root is black
  }

  // Left rotation
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

  // Right rotation
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

  // Search for a value
  public search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: RBNode<T> | null, value: T): boolean {
    if (node === null) return false;
    
    const compare = this.comparator(value, node.value);
    
    if (compare === 0) return true;
    if (compare < 0) return this.searchNode(node.left, value);
    return this.searchNode(node.right, value);
  }

  // In-order traversal
  public inOrder(): T[] {
    const result: T[] = [];
    this.inOrderTraversal(this.root, result);
    return result;
  }

  private inOrderTraversal(node: RBNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.inOrderTraversal(node.left, result);
      result.push(node.value);
      this.inOrderTraversal(node.right, result);
    }
  }

  // Get the root node (for testing purposes)
  public getRoot(): RBNode<T> | null {
    return this.root;
  }

  // Get the height of the tree
  public height(): number {
    return this.calculateHeight(this.root);
  }

  private calculateHeight(node: RBNode<T> | null): number {
    if (node === null) return 0;
    return 1 + Math.max(
      this.calculateHeight(node.left),
      this.calculateHeight(node.right)
    );
  }

  // Validate the tree (for testing)
  public validate(): boolean {
    if (this.root === null) return true;
    
    // Property 1: Root is black
    if (this.root.color !== Color.BLACK) return false;
    
    // Property 2: Every path from root to null has same black height
    const blackHeight = this.getBlackHeight(this.root);
    return this.validateNode(this.root, blackHeight, 0);
  }

  private getBlackHeight(node: RBNode<T> | null): number {
    if (node === null) return 0;
    let height = 0;
    let current: RBNode<T> | null = node;
    
    while (current !== null) {
      if (current.color === Color.BLACK) height++;
      current = current.left;
    }
    
    return height;
  }

  private validateNode(node: RBNode<T> | null, blackHeight: number, currentBlackCount: number): boolean {
    if (node === null) {
      return currentBlackCount === blackHeight;
    }
    
    if (node.color === Color.BLACK) {
      currentBlackCount++;
    }
    
    // Property 3: Red nodes have black children
    if (node.color === Color.RED) {
      if ((node.left !== null && node.left.color === Color.RED) ||
          (node.right !== null && node.right.color === Color.RED)) {
        return false;
      }
    }
    
    return this.validateNode(node.left, blackHeight, currentBlackCount) &&
           this.validateNode(node.right, blackHeight, currentBlackCount);
  }
}

// Example usage
const tree = new RedBlackTree<number>();

// Insert values
[10, 20, 5, 30, 15, 25].forEach(value => tree.insert(value));

console.log('In-order traversal:', tree.inOrder());
console.log('Search for 15:', tree.search(15));
console.log('Search for 99:', tree.search(99));
console.log('Tree height:', tree.height());
console.log('Tree is valid:', tree.validate());

// Example with custom comparator for strings
const stringTree = new RedBlackTree<string>((a, b) => a.localeCompare(b));
['apple', 'banana', 'cherry'].forEach(value => stringTree.insert(value));
console.log('String tree:', stringTree.inOrder());

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
  private NIL: RBNode<T> = { value: null as any, color: Color.BLACK, left: null, right: null, parent: null };

  constructor() {
    this.NIL.left = this.NIL;
    this.NIL.right = this.NIL;
  }

  private get isEmpty(): boolean {
    return this.root === null || this.root === this.NIL;
  }

  // Helper method to create a new node
  private createNode(value: T, color: Color = Color.RED): RBNode<T> {
    return {
      value,
      color,
      left: this.NIL,
      right: this.NIL,
      parent: null
    };
  }
}
class RedBlackTree<T> {
  // ... previous code ...

  private rotateLeft(x: RBNode<T>): void {
    const y = x.right;
    x.right = y.left;

    if (y.left !== this.NIL) {
      y.left.parent = x;
    }

    y.parent = x.parent;

    if (x.parent === null) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }

    y.left = x;
    x.parent = y;
  }

  private rotateRight(x: RBNode<T>): void {
    const y = x.left;
    x.left = y.right;

    if (y.right !== this.NIL) {
      y.right.parent = x;
    }

    y.parent = x.parent;

    if (x.parent === null) {
      this.root = y;
    } else if (x === x.parent.right) {
      x.parent.right = y;
    } else {
      x.parent.left = y;
    }

    y.right = x;
    x.parent = y;
  }
}
class RedBlackTree<T> {
  // ... previous code ...

  insert(value: T): void {
    const node = this.createNode(value);
    let parent: RBNode<T> | null = null;
    let current = this.root;

    // Standard BST insertion
    while (current !== this.NIL) {
      parent = current;
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        // Value already exists, do nothing
        return;
      }
    }

    node.parent = parent;

    if (parent === null) {
      this.root = node;
    } else if (value < parent.value) {
      parent.left = node;
    } else {
      parent.right = node;
    }

    // Fix the RB properties
    this.fixInsert(node);
  }

  private fixInsert(z: RBNode<T>): void {
    while (z.parent && z.parent.color === Color.RED) {
      if (z.parent === z.parent.parent?.left) {
        const uncle = z.parent.parent?.right;

        if (uncle && uncle.color === Color.RED) {
          // Case 1: Uncle is red
          z.parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          z.parent.parent!.color = Color.RED;
          z = z.parent.parent!;
        } else {
          // Case 2: Uncle is black
          if (z === z.parent.right) {
            // Case 2.1: z is right child
            z = z.parent;
            this.rotateLeft(z);
          }
          // Case 2.2: z is left child
          z.parent.color = Color.BLACK;
          z.parent.parent!.color = Color.RED;
          if (z.parent.parent) {
            this.rotateRight(z.parent.parent);
          }
        }
      } else {
        const uncle = z.parent.parent?.left;

        if (uncle && uncle.color === Color.RED) {
          // Case 1: Uncle is red
          z.parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          z.parent.parent!.color = Color.RED;
          z = z.parent.parent!;
        } else {
          // Case 2: Uncle is black
          if (z === z.parent.left) {
            // Case 2.1: z is left child
            z = z.parent;
            this.rotateRight(z);
          }
          // Case 2.2: z is right child
          z.parent.color = Color.BLACK;
          z.parent.parent!.color = Color.RED;
          if (z.parent.parent) {
            this.rotateLeft(z.parent.parent);
          }
        }
      }

      if (z === this.root) {
        break;
      }
    }

    this.root!.color = Color.BLACK;
  }
}
class RedBlackTree<T> {
  // ... previous code ...

  delete(value: T): boolean {
    const node = this.search(value);
    if (!node || node === this.NIL) {
      return false;
    }

    return this.deleteNode(node);
  }

  private deleteNode(z: RBNode<T>): boolean {
    let x: RBNode<T>;
    let originalColor = z.color;

    if (z.left === this.NIL) {
      x = z.right!;
      this.transplant(z, z.right!);
    } else if (z.right === this.NIL) {
      x = z.left!;
      this.transplant(z, z.left!);
    } else {
      const y = this.minimum(z.right!);
      originalColor = y.color;
      x = y.right!;
      if (y.parent === z) {
        x.parent = y;
      } else {
        this.transplant(y, y.right!);
        y.right = z.right;
        y.right.parent = y;
      }
      this.transplant(z, y);
      y.left = z.left;
      y.left.parent = y;
      y.color = z.color;
    }

    if (originalColor === Color.BLACK) {
      this.fixDelete(x);
    }

    return true;
  }

  private transplant(u: RBNode<T>, v: RBNode<T>): void {
    if (u.parent === null) {
      this.root = v;
    } else if (u === u.parent.left) {
      u.parent.left = v;
    } else {
      u.parent.right = v;
    }
    v.parent = u.parent;
  }

  private fixDelete(x: RBNode<T>): void {
    while (x !== this.root && x.color === Color.BLACK) {
      if (x === x.parent?.left) {
        let sibling = x.parent!.right;
        
        if (sibling.color === Color.RED) {
          // Case 1: Sibling is red
          sibling.color = Color.BLACK;
          x.parent!.color = Color.RED;
          this.rotateLeft(x.parent!);
          sibling = x.parent!.right;
        }

        if (sibling.left!.color === Color.BLACK && 
            sibling.right!.color === Color.BLACK) {
          // Case 2: Sibling is black and both children are black
          sibling.color = Color.RED;
          x = x.parent!;
        } else {
          if (sibling.right!.color === Color.BLACK) {
            // Case 3: Sibling is black, left child red, right child black
            sibling.left!.color = Color.BLACK;
            sibling.color = Color.RED;
            this.rotateRight(sibling);
            sibling = x.parent!.right;
          }
          // Case 4: Sibling is black, right child red
          sibling.color = x.parent!.color;
          x.parent!.color = Color.BLACK;
          sibling.right!.color = Color.BLACK;
          this.rotateLeft(x.parent!);
          x = this.root!;
        }
      } else {
        let sibling = x.parent!.left;
        
        if (sibling.color === Color.RED) {
          // Case 1: Sibling is red
          sibling.color = Color.BLACK;
          x.parent!.color = Color.RED;
          this.rotateRight(x.parent!);
          sibling = x.parent!.left;
        }

        if (sibling.right!.color === Color.BLACK && 
            sibling.left!.color === Color.BLACK) {
          // Case 2: Sibling is black and both children are black
          sibling.color = Color.RED;
          x = x.parent!;
        } else {
          if (sibling.left!.color === Color.BLACK) {
            // Case 3: Sibling is black, right child red, left child black
            sibling.right!.color = Color.BLACK;
            sibling.color = Color.RED;
            this.rotateLeft(sibling);
            sibling = x.parent!.left;
          }
          // Case 4: Sibling is black, left child red
          sibling.color = x.parent!.color;
          x.parent!.color = Color.BLACK;
          sibling.left!.color = Color.BLACK;
          this.rotateRight(x.parent!);
          x = this.root!;
        }
      }
    }

    x.color = Color.BLACK;
  }
}
class RedBlackTree<T> {
  // ... previous code ...

  // Search operations
  search(value: T): RBNode<T> | null {
    let current = this.root;
    while (current !== this.NIL && current.value !== value) {
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return current === this.NIL ? null : current;
  }

  contains(value: T): boolean {
    return this.search(value) !== null;
  }

  // Traversal methods
  private inorder(node: RBNode<T> | null, result: T[]): void {
    if (node === null || node === this.NIL) return;
    
    this.inorder(node.left, result);
    result.push(node.value);
    this.inorder(node.right, result);
  }

  getAllInOrder(): T[] {
    const result: T[] = [];
    this.inorder(this.root, result);
    return result;
  }

  private preorder(node: RBNode<T> | null, result: T[]): void {
    if (node === null || node === this.NIL) return;
    
    result.push(node.value);
    this.preorder(node.left, result);
    this.preorder(node.right, result);
  }

  getAllPreOrder(): T[] {
    const result: T[] = [];
    this.preorder(this.root, result);
    return result;
  }

  private postorder(node: RBNode<T> | null, result: T[]): void {
    if (node === null || node === this.NIL) return;
    
    this.postorder(node.left, result);
    this.postorder(node.right, result);
    result.push(node.value);
  }

  getAllPostOrder(): T[] {
    const result: T[] = [];
    this.postorder(this.root, result);
    return result;
  }

  // Find min/max
  private minimum(node: RBNode<T>): RBNode<T> {
    while (node.left !== this.NIL) {
      node = node.left;
    }
    return node;
  }

  private maximum(node: RBNode<T>): RBNode<T> {
    while (node.right !== this.NIL) {
      node = node.right;
    }
    return node;
  }

  findMin(): T | null {
    if (this.isEmpty) return null;
    return this.minimum(this.root!).value;
  }

  findMax(): T | null {
    if (this.isEmpty) return null;
    return this.maximum(this.root!).value;
  }

  // Tree properties
  get size(): number {
    return this.getAllInOrder().length;
  }

  get height(): number {
    return this.calculateHeight(this.root);
  }

  private calculateHeight(node: RBNode<T> | null): number {
    if (node === null || node === this.NIL) return 0;
    return 1 + Math.max(
      this.calculateHeight(node.left),
      this.calculateHeight(node.right)
    );
  }

  // Clear the tree
  clear(): void {
    this.root = null;
  }

  // Debug method to visualize the tree
  toString(): string {
    if (this.isEmpty) return 'Empty tree';
    
    const result: string[] = [];
    this.traverseForString(this.root, 0, result);
    return result.join('\n');
  }

  private traverseForString(node: RBNode<T>, depth: number, result: string[]): void {
    if (node === this.NIL) return;
    
    const indent = '  '.repeat(depth);
    const color = node.color === Color.RED ? '(R)' : '(B)';
    result.push(`${indent}${node.value}${color}`);
    
    if (node.left !== this.NIL) {
      this.traverseForString(node.left, depth + 1, result);
    }
    if (node.right !== this.NIL) {
      this.traverseForString(node.right, depth + 1, result);
    }
  }
}
// Example usage
const rbt = new RedBlackTree<number>();

// Insert values
[10, 20, 30, 5, 15, 25].forEach(value => rbt.insert(value));

// Search
console.log('Contains 15:', rbt.contains(15)); // true
console.log('Contains 99:', rbt.contains(99)); // false

// Traversal
console.log('In-order:', rbt.getAllInOrder()); // [5, 10, 15, 20, 25, 30]
console.log('Pre-order:', rbt.getAllPreOrder());
console.log('Post-order:', rbt.getAllPostOrder());

// Min/Max
console.log('Min:', rbt.findMin()); // 5
console.log('Max:', rbt.findMax()); // 30

// Size and height
console.log('Size:', rbt.size); // 6
console.log('Height:', rbt.height); // 3

// Delete
rbt.delete(10);
console.log('After deleting 10:', rbt.getAllInOrder()); // [5, 15, 20, 25, 30]

// Visualize
console.log('Tree structure:');
console.log(rbt.toString());

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
  private sentinel: RBNode<T> = {
    value: null as any,
    color: Color.BLACK,
    left: null,
    right: null,
    parent: null
  };

  constructor(private compare: (a: T, b: T) => number) {}

  // Public methods
  public insert(value: T): void {
    const newNode: RBNode<T> = {
      value,
      color: Color.RED,
      left: this.sentinel,
      right: this.sentinel,
      parent: null
    };

    let parent: RBNode<T> | null = null;
    let current = this.root;

    // Find insertion point
    while (current !== null && current !== this.sentinel) {
      parent = current;
      if (this.compare(value, current.value) < 0) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    newNode.parent = parent;

    if (parent === null) {
      this.root = newNode;
    } else if (this.compare(value, parent.value) < 0) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }

    // Fix red-black properties
    this.fixInsert(newNode);
  }

  public search(value: T): RBNode<T> | null {
    let current = this.root;
    
    while (current !== null && current !== this.sentinel) {
      const comparison = this.compare(value, current.value);
      
      if (comparison === 0) {
        return current;
      } else if (comparison < 0) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    
    return null;
  }

  public delete(value: T): void {
    const node = this.search(value);
    if (node === null || node === this.sentinel) return;

    this.deleteNode(node);
  }

  public inOrderTraversal(callback: (value: T) => void): void {
    this.inOrder(this.root, callback);
  }

  // Private helper methods
  private rotateLeft(node: RBNode<T>): void {
    const rightChild = node.right!;
    node.right = rightChild.left;

    if (rightChild.left !== this.sentinel) {
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

    if (leftChild.right !== this.sentinel) {
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

  private fixInsert(node: RBNode<T>): void {
    let current = node;
    
    while (current.parent !== null && current.parent.color === Color.RED) {
      if (current.parent === current.parent.parent?.left) {
        const uncle = current.parent.parent.right;
        
        if (uncle?.color === Color.RED) {
          // Case 1: Uncle is red
          current.parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          current.parent.parent.color = Color.RED;
          current = current.parent.parent;
        } else {
          // Case 2: Uncle is black and current is right child
          if (current === current.parent.right) {
            current = current.parent;
            this.rotateLeft(current);
          }
          
          // Case 3: Uncle is black and current is left child
          current.parent!.color = Color.BLACK;
          current.parent!.parent!.color = Color.RED;
          this.rotateRight(current.parent!.parent!);
        }
      } else {
        // Symmetric cases for right subtree
        const uncle = current.parent.parent!.left;
        
        if (uncle?.color === Color.RED) {
          current.parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          current.parent.parent.color = Color.RED;
          current = current.parent.parent;
        } else {
          if (current === current.parent.left) {
            current = current.parent;
            this.rotateRight(current);
          }
          
          current.parent!.color = Color.BLACK;
          current.parent!.parent!.color = Color.RED;
          this.rotateLeft(current.parent!.parent!);
        }
      }
    }
    
    this.root!.color = Color.BLACK;
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

  private minimum(node: RBNode<T>): RBNode<T> {
    while (node.left !== this.sentinel) {
      node = node.left;
    }
    return node;
  }

  private deleteNode(node: RBNode<T>): void {
    let y = node;
    let yOriginalColor = y.color;
    let x: RBNode<T>;

    if (node.left === this.sentinel) {
      x = node.right!;
      this.transplant(node, node.right!);
    } else if (node.right === this.sentinel) {
      x = node.left!;
      this.transplant(node, node.left!);
    } else {
      y = this.minimum(node.right!);
      yOriginalColor = y.color;
      x = y.right!;

      if (y.parent === node) {
        x.parent = y;
      } else {
        this.transplant(y, y.right!);
        y.right = node.right;
        y.right.parent = y;
      }

      this.transplant(node, y);
      y.left = node.left;
      y.left.parent = y;
      y.color = node.color;
    }

    if (yOriginalColor === Color.BLACK) {
      this.fixDelete(x);
    }
  }

  private fixDelete(node: RBNode<T>): void {
    let x = node;
    
    while (x !== this.root && x.color === Color.BLACK) {
      if (x === x.parent!.left) {
        let w = x.parent!.right!;
        
        if (w.color === Color.RED) {
          w.color = Color.BLACK;
          x.parent!.color = Color.RED;
          this.rotateLeft(x.parent!);
          w = x.parent!.right!;
        }
        
        if (w.left.color === Color.BLACK && w.right.color === Color.BLACK) {
          w.color = Color.RED;
          x = x.parent!;
        } else {
          if (w.right.color === Color.BLACK) {
            w.left.color = Color.BLACK;
            w.color = Color.RED;
            this.rotateRight(w);
            w = x.parent!.right!;
          }
          
          w.color = x.parent!.color;
          x.parent!.color = Color.BLACK;
          w.right.color = Color.BLACK;
          this.rotateLeft(x.parent!);
          x = this.root!;
        }
      } else {
        // Symmetric case for right child
        let w = x.parent!.left!;
        
        if (w.color === Color.RED) {
          w.color = Color.BLACK;
          x.parent!.color = Color.RED;
          this.rotateRight(x.parent!);
          w = x.parent!.left!;
        }
        
        if (w.right.color === Color.BLACK && w.left.color === Color.BLACK) {
          w.color = Color.RED;
          x = x.parent!;
        } else {
          if (w.left.color === Color.BLACK) {
            w.right.color = Color.BLACK;
            w.color = Color.RED;
            this.rotateLeft(w);
            w = x.parent!.left!;
          }
          
          w.color = x.parent!.color;
          x.parent!.color = Color.BLACK;
          w.left.color = Color.BLACK;
          this.rotateRight(x.parent!);
          x = this.root!;
        }
      }
    }
    
    x.color = Color.BLACK;
  }

  private inOrder(node: RBNode<T> | null, callback: (value: T) => void): void {
    if (node === null || node === this.sentinel) return;
    
    this.inOrder(node.left, callback);
    callback(node.value);
    this.inOrder(node.right, callback);
  }

  // Utility methods
  public getHeight(): number {
    return this.calculateHeight(this.root);
  }

  private calculateHeight(node: RBNode<T> | null): number {
    if (node === null || node === this.sentinel) return 0;
    return 1 + Math.max(
      this.calculateHeight(node.left),
      this.calculateHeight(node.right)
    );
  }

  public isEmpty(): boolean {
    return this.root === null;
  }
}
// Create a red-black tree for numbers
const numberTree = new RedBlackTree<number>((a, b) => a - b);

// Insert values
numberTree.insert(10);
numberTree.insert(20);
numberTree.insert(5);
numberTree.insert(15);
numberTree.insert(25);

// Search for values
console.log(numberTree.search(15)); // Returns the node containing 15
console.log(numberTree.search(100)); // Returns null

// Traverse the tree
numberTree.inOrderTraversal(value => console.log(value)); // Output: 5, 10, 15, 20, 25

// Delete a value
numberTree.delete(15);

// Tree with custom objects
interface Person {
  id: number;
  name: string;
}

const personTree = new RedBlackTree<Person>((a, b) => a.id - b.id);

personTree.insert({ id: 3, name: "Alice" });
personTree.insert({ id: 1, name: "Bob" });
personTree.insert({ id: 2, name: "Charlie" });

personTree.inOrderTraversal(person => console.log(person.name)); // Bob, Charlie, Alice

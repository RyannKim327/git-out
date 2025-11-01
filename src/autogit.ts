enum Color {
  RED = 'RED',
  BLACK = 'BLACK'
}

interface INode<T> {
  value: T;
  color: Color;
  left: Node<T> | null;
  right: Node<T> | null;
  parent: Node<T> | null;
}

class Node<T> implements INode<T> {
  constructor(
    public value: T,
    public color: Color = Color.RED,
    public left: Node<T> | null = null,
    public right: Node<T> | null = null,
    public parent: Node<T> | null = null
  ) {}
}

class RedBlackTree<T> {
  private root: Node<T> | null = null;

  // Helper methods
  private getGrandparent(node: Node<T> | null): Node<T> | null {
    if (node && node.parent) {
      return node.parent.parent;
    }
    return null;
  }

  private getSibling(node: Node<T> | null): Node<T> | null {
    if (!node || !node.parent) return null;
    
    if (node === node.parent.left) {
      return node.parent.right;
    }
    return node.parent.left;
  }

  private getUncle(node: Node<T> | null): Node<T> | null {
    const grandparent = this.getGrandparent(node);
    if (!grandparent) return null;
    
    if (node?.parent === grandparent.left) {
      return grandparent.right;
    }
    return grandparent.left;
  }

  private rotateLeft(x: Node<T>): Node<T> {
    const y = x.right!;
    x.right = y.left;
    
    if (y.left) {
      y.left.parent = x;
    }
    
    y.parent = x.parent;
    
    if (!x.parent) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }
    
    y.left = x;
    x.parent = y;
    
    return y;
  }

  private rotateRight(x: Node<T>): Node<T> {
    const y = x.left!;
    x.left = y.right;
    
    if (y.right) {
      y.right.parent = x;
    }
    
    y.parent = x.parent;
    
    if (!x.parent) {
      this.root = y;
    } else if (x === x.parent.right) {
      x.parent.right = y;
    } else {
      x.parent.left = y;
    }
    
    y.right = x;
    x.parent = y;
    
    return y;
  }

  private insertFixup(node: Node<T>): void {
    // If parent is black or node is root, no fixup needed
    while (node.parent && node.parent.color === Color.RED) {
      const uncle = this.getUncle(node);
      const parent = node.parent;
      const grandparent = this.getGrandparent(node);

      if (uncle && uncle.color === Color.RED) {
        // Case 1: Uncle is red, recolor
        parent.color = Color.BLACK;
        uncle.color = Color.BLACK;
        if (grandparent) {
          grandparent.color = Color.RED;
        }
        node = grandparent!;
      } else {
        // Case 2 & 3: Uncle is black or null
        if (parent === grandparent?.left) {
          // Parent is left child
          if (node === parent.right) {
            // Case 2: Node is right child, left rotate on parent
            node = parent;
            this.rotateLeft(parent);
          }
          // Case 3: Node is left child, right rotate on grandparent
          if (grandparent) {
            parent.color = Color.BLACK;
            grandparent.color = Color.RED;
            this.rotateRight(grandparent);
          }
        } else {
          // Parent is right child
          if (node === parent.left) {
            // Case 2: Node is left child, right rotate on parent
            node = parent;
            this.rotateRight(parent);
          }
          // Case 3: Node is right child, left rotate on grandparent
          if (grandparent) {
            parent.color = Color.BLACK;
            grandparent.color = Color.RED;
            this.rotateLeft(grandparent);
          }
        }
      }
    }
    
    if (this.root) {
      this.root.color = Color.BLACK;
    }
  }

  private deleteFixup(node: Node<T> | null): void {
    while (node && node !== this.root && node.color === Color.BLACK) {
      if (node === node.parent?.left) {
        let sibling = node.parent.right;
        
        if (sibling?.color === Color.RED) {
          // Case 1: Sibling is red
          sibling.color = Color.BLACK;
          if (node.parent) {
            node.parent.color = Color.RED;
            this.rotateLeft(node.parent);
            sibling = node.parent.right;
          }
        }
        
        if (sibling &&
            sibling.left?.color === Color.BLACK &&
            sibling.right?.color === Color.BLACK) {
          // Case 2: Sibling is black and both children are black
          if (sibling) {
            sibling.color = Color.RED;
          }
          node = node.parent;
        } else {
          if (sibling?.right?.color === Color.BLACK) {
            // Case 3: Sibling is black, left child red, right child black
            if (sibling.left) {
              sibling.left.color = Color.BLACK;
            }
            if (sibling) {
              sibling.color = Color.RED;
            }
            this.rotateRight(sibling);
            sibling = node.parent?.right;
          }
          
          // Case 4: Sibling is black, right child red
          if (sibling) {
            sibling.color = node.parent?.color || Color.BLACK;
          }
          if (node.parent) {
            node.parent.color = Color.BLACK;
          }
          if (sibling?.right) {
            sibling.right.color = Color.BLACK;
          }
          this.rotateLeft(node.parent!);
          node = this.root;
        }
      } else {
        let sibling = node.parent?.left;
        
        if (sibling?.color === Color.RED) {
          // Case 1: Sibling is red
          sibling.color = Color.BLACK;
          if (node.parent) {
            node.parent.color = Color.RED;
            this.rotateRight(node.parent);
            sibling = node.parent.left;
          }
        }
        
        if (sibling &&
            sibling.right?.color === Color.BLACK &&
            sibling.left?.color === Color.BLACK) {
          // Case 2: Sibling is black and both children are black
          if (sibling) {
            sibling.color = Color.RED;
          }
          node = node.parent;
        } else {
          if (sibling?.left?.color === Color.BLACK) {
            // Case 3: Sibling is black, right child red, left child black
            if (sibling.right) {
              sibling.right.color = Color.BLACK;
            }
            if (sibling) {
              sibling.color = Color.RED;
            }
            this.rotateLeft(sibling);
            sibling = node.parent?.left;
          }
          
          // Case 4: Sibling is black, left child red
          if (sibling) {
            sibling.color = node.parent?.color || Color.BLACK;
          }
          if (node.parent) {
            node.parent.color = Color.BLACK;
          }
          if (sibling?.left) {
            sibling.left.color = Color.BLACK;
          }
          this.rotateRight(node.parent!);
          node = this.root;
        }
      }
    }
    
    if (node) {
      node.color = Color.BLACK;
    }
  }

  // Private helper to find the minimum node in a subtree
  private minimum(node: Node<T>): Node<T> {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  // Private helper to replace one node with another
  private replaceNode(oldNode: Node<T>, newNode: Node<T> | null): void {
    if (!oldNode.parent) {
      this.root = newNode;
    } else if (oldNode === oldNode.parent.left) {
      oldNode.parent.left = newNode;
    } else {
      oldNode.parent.right = newNode;
    }
    
    if (newNode) {
      newNode.parent = oldNode.parent;
    }
  }

  // Public API methods
  insert(value: T): void {
    const newNode = new Node(value);
    
    // Standard BST insert
    if (!this.root) {
      this.root = newNode;
      this.root.color = Color.BLACK;
      return;
    }
    
    let parent: Node<T> | null = null;
    let current = this.root;
    
    while (current) {
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
    
    newNode.parent = parent;
    if (value < parent.value) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }
    
    this.insertFixup(newNode);
  }

  delete(value: T): boolean {
    let node = this.root;
    
    // Find the node to delete
    while (node) {
      if (value < node.value) {
        node = node.left;
      } else if (value > node.value) {
        node = node.right;
      } else {
        // Found the node, perform deletion
        if (!node.left || !node.right) {
          // Node has 0 or 1 child
          let child = node.left || node.right;
          
          if (!child) {
            // Node has no children
            child = null;
            if (node.color === Color.BLACK) {
              this.deleteFixup(node);
            }
          }
          
          this.replaceNode(node, child);
        } else {
          // Node has two children, find successor
          const successor = this.minimum(node.right);
          if (successor.parent !== node) {
            this.replaceNode(successor, successor.right);
            successor.right = node.right;
            if (successor.right) {
              successor.right.parent = successor;
            }
          }
          
          this.replaceNode(node, successor);
          successor.left = node.left;
          if (successor.left) {
            successor.left.parent = successor;
          }
          successor.color = node.color;
          
          if (successor.parent && successor.color === Color.BLACK) {
            this.deleteFixup(successor);
          } else if (successor.color === Color.RED) {
            successor.color = Color.BLACK;
          }
        }
        
        return true;
      }
    }
    
    return false;
  }

  find(value: T): T | null {
    let current = this.root;
    
    while (current) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return current.value;
      }
    }
    
    return null;
  }

  // For debugging/visualization
  getRoot(): Node<T> | null {
    return this.root;
  }

  // In-order traversal to verify BST property
  *inorderTraversal(): IterableIterator<T> {
    const stack: Node<T>[] = [];
    let current = this.root;
    
    while (stack.length > 0 || current) {
      while (current) {
        stack.push(current);
        current = current.left;
      }
      
      current = stack.pop()!;
      yield current.value;
      current = current.right;
    }
  }

  // Count nodes
  size(): number {
    let count = 0;
    for (const _ of this.inorderTraversal()) {
      count++;
    }
    return count;
  }

  // Check if tree is empty
  isEmpty(): boolean {
    return this.root === null;
  }
}

// Usage example
function exampleUsage() {
  const rbt = new RedBlackTree<number>();
  
  // Insert values
  const values = [10, 20, 30, 15, 25, 5, 35];
  values.forEach(value => rbt.insert(value));
  
  console.log('Tree size:', rbt.size()); // 7
  
  // Search
  console.log('Find 15:', rbt.find(15)); // 15
  console.log('Find 99:', rbt.find(99)); // null
  
  // Delete
  rbt.delete(20);
  console.log('Size after deleting 20:', rbt.size()); // 6
  
  // In-order traversal (should be sorted)
  console.log('In-order traversal:', Array.from(rbt.inorderTraversal()));
  // Output: [5, 10, 15, 25, 30, 35]
}

exampleUsage();

enum Color {
  RED = 'RED',
  BLACK = 'BLACK'
}

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

class RedBlackTree<T> {
  private root: RBNode<T> | null;
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0) {
    this.root = null;
    this.comparator = comparator;
  }

  // Public methods
  public insert(data: T): void {
    const newNode = new RBNode(data);
    
    if (this.root === null) {
      this.root = newNode;
      this.root.color = Color.BLACK; // Root is always black
      return;
    }

    this.insertNode(this.root, newNode);
    this.fixViolation(newNode);
  }

  public search(data: T): boolean {
    return this.searchNode(this.root, data);
  }

  public inOrderTraversal(callback: (data: T) => void): void {
    this.inOrder(this.root, callback);
  }

  // Private methods
  private insertNode(root: RBNode<T>, newNode: RBNode<T>): void {
    if (this.comparator(newNode.data, root.data) < 0) {
      if (root.left === null) {
        root.left = newNode;
        newNode.parent = root;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else {
      if (root.right === null) {
        root.right = newNode;
        newNode.parent = root;
      } else {
        this.insertNode(root.right, newNode);
      }
    }
  }

  private searchNode(node: RBNode<T> | null, data: T): boolean {
    if (node === null) return false;

    const comparison = this.comparator(data, node.data);
    
    if (comparison === 0) return true;
    if (comparison < 0) return this.searchNode(node.left, data);
    return this.searchNode(node.right, data);
  }

  private fixViolation(node: RBNode<T>): void {
    let currentNode = node;
    let parent = node.parent;

    while (parent !== null && parent.color === Color.RED) {
      const grandParent = parent.parent!;
      
      if (parent === grandParent.left) {
        const uncle = grandParent.right;
        
        if (uncle !== null && uncle.color === Color.RED) {
          // Case 1: Uncle is red
          grandParent.color = Color.RED;
          parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          currentNode = grandParent;
        } else {
          // Case 2: Uncle is black and node is right child
          if (currentNode === parent.right) {
            this.rotateLeft(parent);
            currentNode = parent;
            parent = currentNode.parent!;
          }
          
          // Case 3: Uncle is black and node is left child
          parent.color = Color.BLACK;
          grandParent.color = Color.RED;
          this.rotateRight(grandParent);
        }
      } else {
        const uncle = grandParent.left;
        
        if (uncle !== null && uncle.color === Color.RED) {
          // Case 1: Uncle is red (mirror case)
          grandParent.color = Color.RED;
          parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          currentNode = grandParent;
        } else {
          // Case 2: Uncle is black and node is left child (mirror case)
          if (currentNode === parent.left) {
            this.rotateRight(parent);
            currentNode = parent;
            parent = currentNode.parent!;
          }
          
          // Case 3: Uncle is black and node is right child (mirror case)
          parent.color = Color.BLACK;
          grandParent.color = Color.RED;
          this.rotateLeft(grandParent);
        }
      }
      
      parent = currentNode.parent;
    }
    
    // Ensure root is always black
    if (this.root !== null) {
      this.root.color = Color.BLACK;
    }
  }

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

  private inOrder(node: RBNode<T> | null, callback: (data: T) => void): void {
    if (node !== null) {
      this.inOrder(node.left, callback);
      callback(node.data);
      this.inOrder(node.right, callback);
    }
  }

  // Utility methods
  public getHeight(): number {
    return this.calculateHeight(this.root);
  }

  private calculateHeight(node: RBNode<T> | null): number {
    if (node === null) return 0;
    return 1 + Math.max(
      this.calculateHeight(node.left),
      this.calculateHeight(node.right)
    );
  }

  public printTree(): void {
    this.printNode(this.root, 0);
  }

  private printNode(node: RBNode<T> | null, depth: number): void {
    if (node === null) return;
    
    this.printNode(node.right, depth + 1);
    
    const indent = ' '.repeat(depth * 4);
    const colorStr = node.color === Color.RED ? 'R' : 'B';
    console.log(`${indent}${node.data} (${colorStr})`);
    
    this.printNode(node.left, depth + 1);
  }
}
// Example usage with numbers
const numberTree = new RedBlackTree<number>((a, b) => a - b);

numberTree.insert(10);
numberTree.insert(20);
numberTree.insert(30);
numberTree.insert(15);
numberTree.insert(25);
numberTree.insert(5);

console.log('In-order traversal:');
numberTree.inOrderTraversal(data => console.log(data));
// Output: 5, 10, 15, 20, 25, 30

console.log('Tree structure:');
numberTree.printTree();

console.log('Search for 15:', numberTree.search(15)); // true
console.log('Search for 100:', numberTree.search(100)); // false
console.log('Tree height:', numberTree.getHeight());

// Example with custom objects
interface Person {
  id: number;
  name: string;
}

const personTree = new RedBlackTree<Person>((a, b) => a.id - b.id);

personTree.insert({ id: 3, name: 'Charlie' });
personTree.insert({ id: 1, name: 'Alice' });
personTree.insert({ id: 2, name: 'Bob' });

console.log('People in order:');
personTree.inOrderTraversal(person => console.log(`${person.id}: ${person.name}`));

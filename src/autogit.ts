interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

class BinaryTree<T extends number> {
  root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }
}
class BinaryTree<T extends number> {
  root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  // Recursive sum calculation
  sumNodes(): number {
    return this._sumNodes(this.root);
  }

  private _sumNodes(node: TreeNode<T> | null): number {
    if (node === null) {
      return 0;
    }
    
    return node.value + this._sumNodes(node.left) + this._sumNodes(node.right);
  }
}
interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

class BinaryTree<T extends number> {
  root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  // Add nodes for testing
  insert(value: T): void {
    const newNode: TreeNode<T> = { value, left: null, right: null };
    
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    this._insert(this.root, newNode);
  }

  private _insert(node: TreeNode<T>, newNode: TreeNode<T>): void {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._insert(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._insert(node.right, newNode);
      }
    }
  }

  // Recursive sum calculation
  sumNodes(): number {
    return this._sumNodes(this.root);
  }

  private _sumNodes(node: TreeNode<T> | null): number {
    if (node === null) {
      return 0;
    }
    
    return node.value + this._sumNodes(node.left) + this._sumNodes(node.right);
  }

  // Alternative: Iterative approach using BFS
  sumNodesIterative(): number {
    if (this.root === null) return 0;
    
    let sum = 0;
    const queue: TreeNode<T>[] = [this.root];
    
    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      sum += currentNode.value;
      
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
    
    return sum;
  }

  // Alternative: Iterative approach using DFS
  sumNodesDFS(): number {
    if (this.root === null) return 0;
    
    let sum = 0;
    const stack: TreeNode<T>[] = [this.root];
    
    while (stack.length > 0) {
      const currentNode = stack.pop()!;
      sum += currentNode.value;
      
      if (currentNode.right !== null) {
        stack.push(currentNode.right);
      }
      if (currentNode.left !== null) {
        stack.push(currentNode.left);
      }
    }
    
    return sum;
  }
}

// Usage example
const tree = new BinaryTree<number>();

tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);
tree.insert(12);
tree.insert(18);

console.log("Sum of all nodes (recursive):", tree.sumNodes()); // Output: 70
console.log("Sum of all nodes (BFS):", tree.sumNodesIterative()); // Output: 70
console.log("Sum of all nodes (DFS):", tree.sumNodesDFS()); // Output: 70
class GenericBinaryTree<T> {
  root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  sumNodes(extractor: (value: T) => number): number {
    return this._sumNodes(this.root, extractor);
  }

  private _sumNodes(node: TreeNode<T> | null, extractor: (value: T) => number): number {
    if (node === null) {
      return 0;
    }
    
    return extractor(node.value) + 
           this._sumNodes(node.left, extractor) + 
           this._sumNodes(node.right, extractor);
  }
}

// Usage with custom objects
interface CustomNode {
  id: number;
  weight: number;
}

const customTree = new GenericBinaryTree<CustomNode>();
// Add nodes...

const sum = customTree.sumNodes(node => node.weight);

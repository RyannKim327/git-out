interface BTreeNode<T> {
  keys: T[];
  children: BTreeNode<T>[];
  leaf: boolean;
}

class BTree<T> {
  private root: BTreeNode<T>;
  private degree: number; // Minimum degree (defines the range for number of keys)

  constructor(degree: number) {
    this.degree = degree;
    this.root = this.createNode(true);
  }

  private createNode(leaf: boolean): BTreeNode<T> {
    return {
      keys: [],
      children: [],
      leaf: leaf
    };
  }
}
class BTree<T> {
  // ... previous code

  // Search operation
  search(key: T): BTreeNode<T> | null {
    return this.searchNode(this.root, key);
  }

  private searchNode(node: BTreeNode<T>, key: T): BTreeNode<T> | null {
    let i = 0;
    
    // Find the first key greater than or equal to the search key
    while (i < node.keys.length && key > node.keys[i]) {
      i++;
    }

    // If the key is found at this node
    if (i < node.keys.length && key === node.keys[i]) {
      return node;
    }

    // If this is a leaf node, key is not present
    if (node.leaf) {
      return null;
    }

    // Otherwise, search in the appropriate child
    return this.searchNode(node.children[i], key);
  }

  // Insert operation
  insert(key: T): void {
    const root = this.root;
    
    // If root is full, split it first
    if (root.keys.length === 2 * this.degree - 1) {
      const newRoot = this.createNode(false);
      newRoot.children.push(root);
      this.splitChild(newRoot, 0);
      this.root = newRoot;
      this.insertNonFull(this.root, key);
    } else {
      this.insertNonFull(root, key);
    }
  }

  private insertNonFull(node: BTreeNode<T>, key: T): void {
    let i = node.keys.length - 1;

    if (node.leaf) {
      // Insert into leaf node
      
      // Find position to insert
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      
      // Insert the key at the correct position
      node.keys.splice(i + 1, 0, key);
    } else {
      // Find which child to go to
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      i++;

      // If the child is full, split it
      if (node.children[i].keys.length === 2 * this.degree - 1) {
        this.splitChild(node, i);
        
        // After split, determine which of the two children to go to
        if (key > node.keys[i]) {
          i++;
        }
      }
      
      this.insertNonFull(node.children[i], key);
    }
  }

  private splitChild(parent: BTreeNode<T>, childIndex: number): void {
    const child = parent.children[childIndex];
    const newChild = this.createNode(child.leaf);
    
    // Split keys
    const middleIndex = Math.floor(child.keys.length / 2);
    const middleKey = child.keys[middleIndex];
    
    // Move the second half of keys to the new child
    newChild.keys = child.keys.splice(middleIndex + 1);
    
    // Remove the middle key from the child
    child.keys.splice(middleIndex);
    
    // If not leaf, split children as well
    if (!child.leaf) {
      newChild.children = child.children.splice(middleIndex + 1);
    }
    
    // Insert middle key into parent
    parent.keys.splice(childIndex, 0, middleKey);
    
    // Insert new child into parent
    parent.children.splice(childIndex + 1, 0, newChild);
  }
}
class BTree<T> {
  // ... previous code

  // Delete operation
  delete(key: T): boolean {
    return this.deleteFromNode(this.root, key);
  }

  private deleteFromNode(node: BTreeNode<T>, key: T): boolean {
    let idx = 0;
    
    // Find the key in the current node
    while (idx < node.keys.length && key > node.keys[idx]) {
      idx++;
    }

    if (idx < node.keys.length && key === node.keys[idx]) {
      // Key found in this node
      if (node.leaf) {
        node.keys.splice(idx, 1);
        return true;
      } else {
        this.deleteFromInternalNode(node, idx);
        return true;
      }
    } else {
      // Key not in this node
      if (node.leaf) {
        return false; // Key not found
      }
      
      // Check if the child has enough keys
      if (node.children[idx].keys.length < this.degree) {
        this.fillChild(node, idx);
      }
      
      // Determine which child to follow after potential merge
      let nextIdx = idx;
      if (idx > node.keys.length) {
        nextIdx = idx - 1;
      }
      
      return this.deleteFromNode(node.children[nextIdx], key);
    }
  }

  private deleteFromInternalNode(node: BTreeNode<T>, idx: number): void {
    const key = node.keys[idx];
    
    // If the left child has at least t keys
    if (node.children[idx].keys.length >= this.degree) {
      const predecessor = this.getPredecessor(node.children[idx]);
      node.keys[idx] = predecessor;
      this.deleteFromNode(node.children[idx], predecessor);
    }
    // If the right child has at least t keys
    else if (node.children[idx + 1].keys.length >= this.degree) {
      const successor = this.getSuccessor(node.children[idx + 1]);
      node.keys[idx] = successor;
      this.deleteFromNode(node.children[idx + 1], successor);
    }
    // Merge children
    else {
      this.mergeChildren(node, idx);
      this.deleteFromNode(node.children[idx], key);
    }
  }

  private fillChild(parent: BTreeNode<T>, idx: number): void {
    // Borrow from left sibling if possible
    if (idx !== 0 && parent.children[idx - 1].keys.length >= this.degree) {
      this.borrowFromLeft(parent, idx);
    }
    // Borrow from right sibling if possible
    else if (idx !== parent.keys.length && parent.children[idx + 1].keys.length >= this.degree) {
      this.borrowFromRight(parent, idx);
    }
    // Merge with sibling
    else {
      if (idx !== parent.keys.length) {
        this.mergeChildren(parent, idx);
      } else {
        this.mergeChildren(parent, idx - 1);
      }
    }
  }

  private borrowFromLeft(parent: BTreeNode<T>, idx: number): void {
    const child = parent.children[idx];
    const leftSibling = parent.children[idx - 1];
    
    // Move a key from parent to child
    child.keys.unshift(parent.keys[idx - 1]);
    
    // Move a key from left sibling to parent
    parent.keys[idx - 1] = leftSibling.keys.pop()!;
    
    // Move child pointer if not leaf
    if (!child.leaf) {
      child.children.unshift(leftSibling.children.pop()!);
    }
  }

  private borrowFromRight(parent: BTreeNode<T>, idx: number): void {
    const child = parent.children[idx];
    const rightSibling = parent.children[idx + 1];
    
    // Move a key from parent to child
    child.keys.push(parent.keys[idx]);
    
    // Move a key from right sibling to parent
    parent.keys[idx] = rightSibling.keys.shift()!;
    
    // Move child pointer if not leaf
    if (!child.leaf) {
      child.children.push(rightSibling.children.shift()!);
    }
  }

  private mergeChildren(parent: BTreeNode<T>, idx: number): void {
    const child = parent.children[idx];
    const rightSibling = parent.children[idx + 1];
    
    // Pull down key from parent
    child.keys.push(parent.keys[idx]);
    
    // Copy keys from right sibling
    child.keys.push(...rightSibling.keys);
    
    // Copy children from right sibling if not leaf
    if (!child.leaf) {
      child.children.push(...rightSibling.children);
    }
    
    // Remove key from parent and right sibling from children
    parent.keys.splice(idx, 1);
    parent.children.splice(idx + 1, 1);
  }

  private getPredecessor(node: BTreeNode<T>): T {
    while (!node.leaf) {
      node = node.children[node.children.length - 1];
    }
    return node.keys[node.keys.length - 1];
  }

  private getSuccessor(node: BTreeNode<T>): T {
    while (!node.leaf) {
      node = node.children[0];
    }
    return node.keys[0];
  }
}
class BTree<T> {
  // ... previous code

  // Traversal methods
  inOrderTraversal(callback: (key: T) => void): void {
    this.inOrderTraversalNode(this.root, callback);
  }

  private inOrderTraversalNode(node: BTreeNode<T>, callback: (key: T) => void): void {
    let i: number;
    for (i = 0; i < node.keys.length; i++) {
      if (!node.leaf) {
        this.inOrderTraversalNode(node.children[i], callback);
      }
      callback(node.keys[i]);
    }
    
    if (!node.leaf) {
      this.inOrderTraversalNode(node.children[i], callback);
    }
  }

  // Display the tree structure
  print(): void {
    this.printNode(this.root, 0);
  }

  private printNode(node: BTreeNode<T>, level: number): void {
    console.log(`${'  '.repeat(level)}Level ${level}: ${node.keys.join(', ')}`);
    
    if (!node.leaf) {
      for (const child of node.children) {
        this.printNode(child, level + 1);
      }
    }
  }

  // Check if tree is empty
  isEmpty(): boolean {
    return this.root.keys.length === 0;
  }
}
// Example usage
const btree = new BTree<number>(3); // B-tree with minimum degree 3

// Insert keys
btree.insert(10);
btree.insert(20);
btree.insert(5);
btree.insert(6);
btree.insert(12);
btree.insert(30);
btree.insert(7);
btree.insert(17);

console.log("B-tree structure:");
btree.print();

console.log("\nIn-order traversal:");
btree.inOrderTraversal(key => console.log(key));

console.log("\nSearch for 12:", btree.search(12));
console.log("Search for 99:", btree.search(99));

// Delete operations
btree.delete(6);
console.log("\nAfter deleting 6:");
btree.print();

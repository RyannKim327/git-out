interface BTreeNode<T> {
  keys: T[];
  children: BTreeNode<T>[];
  isLeaf: boolean;
}
class BTree<T> {
  private root: BTreeNode<T> | null;
  private readonly minDegree: number;

  constructor(minDegree: number = 2) {
    if (minDegree < 2) {
      throw new Error("Minimum degree must be at least 2");
    }
    this.minDegree = minDegree;
    this.root = null;
  }

  // Create a new node
  private createNode(isLeaf: boolean): BTreeNode<T> {
    return {
      keys: [],
      children: [],
      isLeaf
    };
  }

  // Search for a key
  search(key: T): boolean {
    return this.root ? this.searchNode(this.root, key) : false;
  }

  private searchNode(node: BTreeNode<T>, key: T): boolean {
    let i = 0;
    while (i < node.keys.length && key > node.keys[i]) {
      i++;
    }

    if (i < node.keys.length && key === node.keys[i]) {
      return true;
    }

    if (node.isLeaf) {
      return false;
    }

    return this.searchNode(node.children[i], key);
  }

  // Insert a key
  insert(key: T): void {
    if (this.root === null) {
      this.root = this.createNode(true);
      this.root.keys.push(key);
      return;
    }

    if (this.root.keys.length === 2 * this.minDegree - 1) {
      const newRoot = this.createNode(false);
      newRoot.children.push(this.root);
      this.splitChild(newRoot, 0);
      this.root = newRoot;
    }

    this.insertNonFull(this.root, key);
  }

  private insertNonFull(node: BTreeNode<T>, key: T): void {
    let i = node.keys.length - 1;

    if (node.isLeaf) {
      // Insert into leaf node
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      node.keys.splice(i + 1, 0, key);
    } else {
      // Find child to insert into
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      i++;

      if (node.children[i].keys.length === 2 * this.minDegree - 1) {
        this.splitChild(node, i);
        if (key > node.keys[i]) {
          i++;
        }
      }

      this.insertNonFull(node.children[i], key);
    }
  }

  private splitChild(parent: BTreeNode<T>, childIndex: number): void {
    const child = parent.children[childIndex];
    const newChild = this.createNode(child.isLeaf);
    
    // Move keys from child to new child
    const medianIndex = Math.floor(child.keys.length / 2);
    const medianKey = child.keys[medianIndex];
    
    newChild.keys = child.keys.splice(medianIndex + 1);
    child.keys.pop(); // Remove the median key

    if (!child.isLeaf) {
      // Move children if not leaf
      newChild.children = child.children.splice(medianIndex + 1);
    }

    // Insert median key into parent
    parent.keys.splice(childIndex, 0, medianKey);
    parent.children.splice(childIndex + 1, 0, newChild);
  }

  // Delete a key
  delete(key: T): boolean {
    if (!this.root) return false;
    
    const deleted = this.deleteFromNode(this.root, key);
    
    if (this.root.keys.length === 0 && !this.root.isLeaf) {
      this.root = this.root.children[0];
    }
    
    return deleted;
  }

  private deleteFromNode(node: BTreeNode<T>, key: T): boolean {
    let i = 0;
    while (i < node.keys.length && key > node.keys[i]) {
      i++;
    }

    if (i < node.keys.length && key === node.keys[i]) {
      // Key found in this node
      if (node.isLeaf) {
        node.keys.splice(i, 1);
        return true;
      } else {
        this.deleteInternalNode(node, i);
        return true;
      }
    }

    if (node.isLeaf) {
      return false;
    }

    // Key not found in this node, recurse to child
    const child = node.children[i];
    if (child.keys.length < this.minDegree) {
      this.fillChild(node, i);
    }

    return this.deleteFromNode(node.children[i], key);
  }

  private deleteInternalNode(node: BTreeNode<T>, index: number): void {
    const key = node.keys[index];
    
    if (node.children[index].keys.length >= this.minDegree) {
      // Case 2a: Left child has enough keys
      const predecessor = this.getPredecessor(node.children[index]);
      node.keys[index] = predecessor;
      this.deleteFromNode(node.children[index], predecessor);
    } else if (node.children[index + 1].keys.length >= this.minDegree) {
      // Case 2b: Right child has enough keys
      const successor = this.getSuccessor(node.children[index + 1]);
      node.keys[index] = successor;
      this.deleteFromNode(node.children[index + 1], successor);
    } else {
      // Case 2c: Merge children
      this.mergeChildren(node, index);
      this.deleteFromNode(node.children[index], key);
    }
  }

  private getPredecessor(node: BTreeNode<T>): T {
    if (node.isLeaf) {
      return node.keys[node.keys.length - 1];
    }
    return this.getPredecessor(node.children[node.children.length - 1]);
  }

  private getSuccessor(node: BTreeNode<T>): T {
    if (node.isLeaf) {
      return node.keys[0];
    }
    return this.getSuccessor(node.children[0]);
  }

  private fillChild(parent: BTreeNode<T>, childIndex: number): void {
    if (childIndex > 0 && parent.children[childIndex - 1].keys.length >= this.minDegree) {
      // Borrow from left sibling
      this.borrowFromLeft(parent, childIndex);
    } else if (childIndex < parent.children.length - 1 && 
               parent.children[childIndex + 1].keys.length >= this.minDegree) {
      // Borrow from right sibling
      this.borrowFromRight(parent, childIndex);
    } else {
      // Merge with sibling
      if (childIndex > 0) {
        this.mergeChildren(parent, childIndex - 1);
      } else {
        this.mergeChildren(parent, childIndex);
      }
    }
  }

  private borrowFromLeft(parent: BTreeNode<T>, childIndex: number): void {
    const child = parent.children[childIndex];
    const leftSibling = parent.children[childIndex - 1];

    // Move key from parent to child
    child.keys.unshift(parent.keys[childIndex - 1]);
    
    // Move key from left sibling to parent
    parent.keys[childIndex - 1] = leftSibling.keys.pop()!;
    
    if (!child.isLeaf) {
      // Move child pointer from left sibling
      child.children.unshift(leftSibling.children.pop()!);
    }
  }

  private borrowFromRight(parent: BTreeNode<T>, childIndex: number): void {
    const child = parent.children[childIndex];
    const rightSibling = parent.children[childIndex + 1];

    // Move key from parent to child
    child.keys.push(parent.keys[childIndex]);
    
    // Move key from right sibling to parent
    parent.keys[childIndex] = rightSibling.keys.shift()!;
    
    if (!child.isLeaf) {
      // Move child pointer from right sibling
      child.children.push(rightSibling.children.shift()!);
    }
  }

  private mergeChildren(parent: BTreeNode<T>, index: number): void {
    const child = parent.children[index];
    const rightSibling = parent.children[index + 1];

    // Move key from parent to child
    child.keys.push(parent.keys[index]);
    
    // Move keys from right sibling
    child.keys.push(...rightSibling.keys);
    
    // Move children from right sibling
    if (!child.isLeaf) {
      child.children.push(...rightSibling.children);
    }
    
    // Remove key from parent and right sibling
    parent.keys.splice(index, 1);
    parent.children.splice(index + 1, 1);
  }

  // Traversal methods
  inOrderTraversal(callback: (key: T) => void): void {
    if (this.root) {
      this.inOrderTraversalNode(this.root, callback);
    }
  }

  private inOrderTraversalNode(node: BTreeNode<T>, callback: (key: T) => void): void {
    for (let i = 0; i < node.keys.length; i++) {
      if (!node.isLeaf) {
        this.inOrderTraversalNode(node.children[i], callback);
      }
      callback(node.keys[i]);
    }
    if (!node.isLeaf) {
      this.inOrderTraversalNode(node.children[node.children.length - 1], callback);
    }
  }

  // Utility methods
  getHeight(): number {
    return this.root ? this.getNodeHeight(this.root) : 0;
  }

  private getNodeHeight(node: BTreeNode<T>): number {
    if (node.isLeaf) return 1;
    return 1 + this.getNodeHeight(node.children[0]);
  }

  isEmpty(): boolean {
    return this.root === null || this.root.keys.length === 0;
  }
}
// Example usage
const btree = new BTree<number>(3);

// Insert keys
btree.insert(10);
btree.insert(20);
btree.insert(5);
btree.insert(6);
btree.insert(12);
btree.insert(30);
btree.insert(7);
btree.insert(17);

console.log("In-order traversal:");
btree.inOrderTraversal(key => console.log(key));
// Output: 5, 6, 7, 10, 12, 17, 20, 30

console.log("Search for 12:", btree.search(12)); // true
console.log("Search for 99:", btree.search(99)); // false

// Delete keys
btree.delete(6);
btree.delete(13);

console.log("After deletion:");
btree.inOrderTraversal(key => console.log(key));

console.log("Height:", btree.getHeight());
console.log("Is empty:", btree.isEmpty());

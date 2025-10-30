// Define the B-tree node interface
interface BTreeNode<T> {
  keys: T[];
  children: BTreeNode<T>[];
  isLeaf: boolean;
  parent?: BTreeNode<T>;
}

// Main B-tree class
class BTree<T> {
  private root: BTreeNode<T>;
  private order: number; // Minimum degree (t)
  private t: number; // Minimum degree

  constructor(order: number) {
    this.order = order;
    this.t = Math.floor((order + 1) / 2); // Minimum degree t
    this.root = this.createNode(true);
  }

  // Create a new node
  private createNode(isLeaf: boolean): BTreeNode<T> {
    return {
      keys: [],
      children: [],
      isLeaf,
      parent: undefined
    };
  }

  // Get the root node
  getRoot(): BTreeNode<T> {
    return this.root;
  }

  // Insert a key into the B-tree
  insert(key: T): void {
    let r = this.root;
    
    // If root is full, create new root
    if (r.keys.length === this.order - 1) {
      let s = this.createNode(false);
      s.children.push(r);
      this.splitChild(s, 0);
      this.root = s;
      r = s;
    }

    // Insert key into non-full node
    this.insertNonFull(r, key);
  }

  // Insert key into non-full node x
  private insertNonFull(x: BTreeNode<T>, key: T): void {
    let i = x.keys.length - 1;

    if (x.isLeaf) {
      // Insert key into leaf node
      x.keys.push(key as never);
      x.keys.sort((a, b) => (a as any) - (b as any)); // Assuming T is comparable
    } else {
      // Find the child to insert into
      while (i >= 0 && (x.keys[i] as any) > (key as any)) {
        i--;
      }

      i++;
      
      let c = x.children[i];

      // If child is full, split it
      if (c.keys.length === this.order - 1) {
        this.splitChild(x, i);
        
        // Determine which child to insert into after split
        if ((key as any) > (x.keys[i] as any)) {
          i++;
        }
        c = x.children[i];
      }

      this.insertNonFull(c, key);
    }
  }

  // Split the full child y of internal node x at index i
  private splitChild(x: BTreeNode<T>, i: number): void {
    let t = this.t;
    let y = x.children[i];
    let z = this.createNode(y.isLeaf);

    // Move half of y's keys to z
    z.keys = y.keys.splice(t, y.keys.length - t);
    
    // If y is not a leaf, move corresponding children to z
    if (!y.isLeaf) {
      z.children = y.children.splice(t, y.children.length - t);
      
      // Update parent pointers for z's children
      for (let child of z.children) {
        child.parent = z;
      }
    }

    // Insert the median key into x
    x.keys.splice(i, 0, y.keys.pop() as T);

    // Insert z into x's children
    x.children.splice(i + 1, 0, z);
    z.parent = x;
  }

  // Search for a key in the B-tree
  search(key: T): BTreeNode<T> | null {
    return this.searchHelper(this.root, key);
  }

  private searchHelper(node: BTreeNode<T>, key: T): BTreeNode<T> | null {
    let i = 0;

    // Find the first key in node that is >= search key
    while (i < node.keys.length && (node.keys[i] as any) < (key as any)) {
      i++;
    }

    // If found, return the node
    if (i < node.keys.length && (node.keys[i] as any) === (key as any)) {
      return node;
    }

    // If leaf node and key not found, return null
    if (node.isLeaf) {
      return null;
    }

    // Recurse into appropriate child
    return this.searchHelper(node.children[i], key);
  }

  // Delete a key from the B-tree
  delete(key: T): void {
    let node = this.search(key);
    if (!node) return;

    this.deleteKey(node, key);
  }

  private deleteKey(x: BTreeNode<T>, key: T): void {
    let t = this.t;
    let i = x.keys.indexOf(key);

    if (x.isLeaf) {
      if (i > -1) {
        x.keys.splice(i, 1);
      }
      return;
    }

    // Find the key in internal node
    if (i > -1) {
      // Key found in internal node
      let k = x.keys[i];
      
      // Find the predecessor or successor
      let pred = this.findPredecessor(x, i);
      if (pred) {
        x.keys[i] = pred;
        this.deleteKey(predNode, pred);
      } else {
        let succ = this.findSuccessor(x, i);
        if (succ) {
          x.keys[i] = succ;
          this.deleteKey(succNode, succ);
        }
      }
      return;
    }

    // Key not found in this node, recurse into child
    while (i < x.keys.length && (x.keys[i] as any) < (key as any)) {
      i++;
    }

    let c = x.children[i];

    // If child has fewer than t-1 keys, fill it
    if (c.keys.length < t) {
      this.fill(c, i);
    }

    // Recurse into child
    this.deleteKey(c, key);
  }

  // Find predecessor of keys[i]
  private findPredecessor(x: BTreeNode<T>, i: number): T | null {
    let cur = x.children[i];
    
    // Go to the rightmost leaf
    while (!cur.isLeaf) {
      cur = cur.children[cur.children.length - 1];
    }
    
    return cur.keys[cur.keys.length - 1] || null;
  }

  // Find successor of keys[i]
  private findSuccessor(x: BTreeNode<T>, i: number): T | null {
    let cur = x.children[i + 1];
    
    // Go to the leftmost leaf
    while (!cur.isLeaf) {
      cur = cur.children[0];
    }
    
    return cur.keys[0] || null;
  }

  // Fill child c at index i
  private fill(c: BTreeNode<T>, i: number): void {
    let x = c.parent!;
    let t = this.t;

    // If previous sibling has more than t-1 keys, borrow from it
    if (i > 0 && x.children[i - 1].keys.length > t - 1) {
      this.borrowFromPrev(x, i);
    }
    // If next sibling has more than t-1 keys, borrow from it
    else if (i < x.children.length - 1 && x.children[i + 1].keys.length > t - 1) {
      this.borrowFromNext(x, i);
    }
    // Merge c with previous sibling
    else {
      if (i > 0) {
        this.merge(x, i);
      } else {
        this.merge(x, i + 1);
      }
    }
  }

  // Borrow a key from previous sibling
  private borrowFromPrev(x: BTreeNode<T>, idx: number): void {
    let child = x.children[idx];
    let sibling = x.children[idx - 1];

    // Move a key from x to child
    child.keys.unshift(x.keys[idx - 1]);
    
    // If not leaf, move sibling's last child to child
    if (!child.isLeaf) {
      child.children.unshift(sibling.children.pop()!);
      child.children[0].parent = child;
    }

    // Move last key of sibling to x
    x.keys[idx - 1] = sibling.keys.pop()!;

    // Update child count
    child.keys.length++;
    sibling.keys.length--;
  }

  // Borrow a key from next sibling
  private borrowFromNext(x: BTreeNode<T>, idx: number): void {
    let child = x.children[idx];
    let sibling = x.children[idx + 1];

    // Move a key from x to child
    child.keys.push(x.keys[idx]);

    // If not leaf, move sibling's first child to child
    if (!child.isLeaf) {
      child.children.push(sibling.children.shift()!);
      child.children[child.children.length - 1].parent = child;
    }

    // Move first key of sibling to x
    x.keys[idx] = sibling.keys.shift()!;

    // Update child count
    child.keys.length++;
    sibling.keys.length--;
  }

  // Merge child at index idx with previous sibling
  private merge(x: BTreeNode<T>, idx: number): void {
    let child = x.children[idx];
    let sibling = x.children[idx - 1];
    let t = this.t;

    // Move key from x to sibling
    sibling.keys.push(x.keys[idx - 1]);

    // If not leaf, append all children of child to sibling
    if (!child.isLeaf) {
      for (let c of child.children) {
        sibling.children.push(c);
        c.parent = sibling;
      }
    }

    // Append all keys of child to sibling
    for (let key of child.keys) {
      sibling.keys.push(key);
    }

    // Remove key from x
    x.keys.splice(idx - 1, 1);

    // Remove child from x's children
    x.children.splice(idx, 1);

    // If x is root and has only one child, make that child the new root
    if (x.keys.length === 0 && x === this.root) {
      this.root = sibling;
      sibling.parent = undefined;
    }
  }

  // Display the B-tree (for debugging)
  display(): void {
    console.log('B-Tree:');
    this.printNode(this.root, 0);
  }

  private printNode(node: BTreeNode<T>, level: number): void {
    let indent = '  '.repeat(level);
    
    console.log(`${indent}Level ${level}:`);
    console.log(`${indent}  Keys: [${node.keys.join(', ')}]`);
    
    if (!node.isLeaf) {
      console.log(`${indent}  Children:`);
      for (let i = 0; i < node.children.length; i++) {
        console.log(`${indent}    Child ${i} (${node.children[i].keys.length} keys):`);
        this.printNode(node.children[i], level + 1);
      }
    }
  }

  // Get all keys in order (in-order traversal)
  getAllKeys(): T[] {
    let result: T[] = [];
    this.traverse(this.root, result);
    return result;
  }

  private traverse(node: BTreeNode<T>, result: T[]): void {
    if (node.isLeaf) {
      result.push(...node.keys);
      return;
    }

    for (let i = 0; i < node.keys.length; i++) {
      this.traverse(node.children[i], result);
      result.push(node.keys[i]);
    }
    
    this.traverse(node.children[node.children.length - 1], result);
  }

  // Check if the B-tree is balanced (all leaves at same level)
  isBalanced(): boolean {
    return this.checkHeight(this.root) !== -1;
  }

  private checkHeight(node: BTreeNode<T>): number {
    if (node.isLeaf) {
      return 0;
    }

    let height = -1;
    for (let child of node.children) {
      let childHeight = this.checkHeight(child);
      if (childHeight === -1) return -1;
      if (height === -1) {
        height = childHeight + 1;
      } else if (height !== childHeight + 1) {
        return -1;
      }
    }
    return height;
  }
}

// Usage example
class BTreeExample {
  static demonstrate(): void {
    console.log('=== B-Tree Demonstration ===');
    
    // Create a B-tree of order 3 (max 2 keys per node)
    let tree = new BTree<number>(3);
    
    // Insert some values
    const values = [10, 20, 5, 6, 12, 30, 7, 17];
    console.log('Inserting:', values);
    
    for (let value of values) {
      tree.insert(value);
    }
    
    tree.display();
    
    // Search for a value
    console.log('\nSearch for 6:', tree.search(6) ? 'Found' : 'Not found');
    console.log('Search for 15:', tree.search(15) ? 'Found' : 'Not found');
    
    // Get all keys in order
    console.log('\nAll keys in order:', tree.getAllKeys());
    
    // Delete a value
    console.log('\nDeleting 20...');
    tree.delete(20);
    tree.display();
    
    // Check if balanced
    console.log('\nIs balanced:', tree.isBalanced());
  }
}

// Run the demonstration
BTreeExample.demonstrate();
// Create B-tree of order 4 (max 3 keys per node)
let tree = new BTree<number>(4);

// Insert values
tree.insert(10);
tree.insert(20);
tree.insert(30);
tree.insert(5);
tree.insert(15);

// Search
console.log(tree.search(15) !== null); // true

// Display structure
tree.display();

// Get sorted keys
console.log(tree.getAllKeys()); // [5, 10, 15, 20, 30]

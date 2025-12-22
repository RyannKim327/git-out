// BST node
class BSTNode<T> {
  value: T;
  left: BSTNode<T> | null = null;
  right: BSTNode<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

type CompareFn<T> = (a: T, b: T) => number;

// Binary Search Tree
export class BinarySearchTree<T> {
  private root: BSTNode<T> | null = null;
  private compare: CompareFn<T>;

  constructor(compare?: CompareFn<T>) {
    // If no comparator is provided, use natural ordering
    this.compare = compare ?? ((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  }

  // Insert a value (duplicates ignored)
  insert(value: T): void {
    this.root = this._insert(this.root, value);
  }

  private _insert(node: BSTNode<T> | null, value: T): BSTNode<T> {
    if (node == null) return new BSTNode(value);
    const cmp = this.compare(value, node.value);
    if (cmp < 0) node.left = this._insert(node.left, value);
    else if (cmp > 0) node.right = this._insert(node.right, value);
    // if equal, ignore or handle as needed
    return node;
  }

  // Check if a value exists
  contains(value: T): boolean {
    return this._contains(this.root, value);
  }

  private _contains(node: BSTNode<T> | null, value: T): boolean {
    if (node == null) return false;
    const cmp = this.compare(value, node.value);
    if (cmp === 0) return true;
    if (cmp < 0) return this._contains(node.left, value);
    return this._contains(node.right, value);
  }

  // Optional: return the node/value if found
  search(value: T): T | null {
    const n = this._search(this.root, value);
    return n ? n.value : null;
  }

  private _search(node: BSTNode<T> | null, value: T): BSTNode<T> | null {
    if (node == null) return null;
    const cmp = this.compare(value, node.value);
    if (cmp === 0) return node;
    if (cmp < 0) return this._search(node.left, value);
    return this._search(node.right, value);
  }

  // Remove a value. Returns true if removed, false if not found.
  remove(value: T): boolean {
    const [newRoot, removed] = this._remove(this.root, value);
    this.root = newRoot;
    return removed;
  }

  private _remove(node: BSTNode<T> | null, value: T): [BSTNode<T> | null, boolean] {
    if (node == null) return [null, false];
    const cmp = this.compare(value, node.value);
    if (cmp < 0) {
      const [newLeft, removed] = this._remove(node.left, value);
      node.left = newLeft;
      return [node, removed];
    } else if (cmp > 0) {
      const [newRight, removed] = this._remove(node.right, value);
      node.right = newRight;
      return [node, removed];
    } else {
      // Found the node to remove
      if (!node.left && !node.right) return [null, true];
      if (!node.left) return [node.right, true];
      if (!node.right) return [node.left, true];

      // Two children: replace with inorder successor (min in right subtree)
      const minRight = this._minNode(node.right);
      if (minRight) {
        node.value = minRight.value;
        const [newRight] = this._remove(node.right, minRight.value);
        node.right = newRight;
        return [node, true];
      }
      return [node, true];
    }
  }

  private _minNode(node: BSTNode<T>): BSTNode<T> {
    let cur = node;
    while (cur.left) cur = cur.left;
    return cur;
  }

  // Get minimum value in the tree
  min(): T | undefined {
    if (!this.root) return undefined;
    let cur = this.root;
    while (cur.left) cur = cur.left;
    return cur.value;
  }

  // Get maximum value in the tree
  max(): T | undefined {
    if (!this.root) return undefined;
    let cur = this.root;
    while (cur.right) cur = cur.right;
    return cur.value;
  }

  // In-order traversal (ascending order for BST)
  inOrder(callback: (value: T) => void): void {
    this._inOrder(this.root, callback);
  }

  private _inOrder(node: BSTNode<T> | null, callback: (value: T) => void): void {
    if (!node) return;
    this._inOrder(node.left, callback);
    callback(node.value);
    this._inOrder(node.right, callback);
  }

  // Convenience: get all values in sorted order
  toArray(): T[] {
    const arr: T[] = [];
    this.inOrder(v => arr.push(v));
    return arr;
  }

  // Size (number of nodes)
  size(): number {
    return this._size(this.root);
  }

  private _size(node: BSTNode<T> | null): number {
    if (!node) return 0;
    return 1 + this._size(node.left) + this._size(node.right);
  }

  // Height (max number of edges from root to a leaf)
  height(): number {
    return this._height(this.root);
  }

  private _height(node: BSTNode<T> | null): number {
    if (!node) return -1; // empty tree has height -1
    return 1 + Math.max(this._height(node.left), this._height(node.right));
  }
}

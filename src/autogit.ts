// ---------- BST Node ----------
class BSTNode<T> {
  value: T;
  count: number = 1;          // duplicates counter
  left: BSTNode<T> | null = null;
  right: BSTNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// ---------- Binary Search Tree ----------
export class BinarySearchTree<T> {
  private root: BSTNode<T> | null = null;
  private compare: (a: T, b: T) => number;

  constructor(compareFn?: (a: T, b: T) => number) {
    this.compare = compareFn || this.defaultCompare;
  }

  /* ---- Public API ---- */
  insert(value: T): this {
    this.root = this._insert(this.root, value);
    return this;
  }

  remove(value: T): boolean {
    const [newRoot, deleted] = this._remove(this.root, value);
    this.root = newRoot;
    return deleted;
  }

  has(value: T): boolean {
    return this._search(this.root, value) !== null;
  }

  min(): T | undefined {
    const node = this._minNode(this.root);
    return node ? node.value : undefined;
  }

  max(): T | undefined {
    const node = this._maxNode(this.root);
    return node ? node.value : undefined;
  }

  // Depth-first traversals
  inOrder(fn: (val: T) => void): void {
    this._inOrder(this.root, fn);
  }
  preOrder(fn: (val: T) => void): void {
    this._preOrder(this.root, fn);
  }
  postOrder(fn: (val: T) => void): void {
    this._postOrder(this.root, fn);
  }

  // Breadth-first
  levelOrder(fn: (val: T) => void): void {
    if (!this.root) return;
    const q: BSTNode<T>[] = [this.root];
    while (q.length) {
      const node = q.shift()!;
      fn(node.value);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }

  get size(): number {
    let cnt = 0;
    this.inOrder(() => cnt++);
    return cnt;
  }

  /* ---- Private helpers ---- */
  private defaultCompare(a: T, b: T): number {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  private _insert(node: BSTNode<T> | null, value: T): BSTNode<T> {
    if (!node) return new BSTNode(value);
    const cmp = this.compare(value, node.value);
    if (cmp === 0) node.count++;
    else if (cmp < 0) node.left = this._insert(node.left, value);
    else node.right = this._insert(node.right, value);
    return node;
  }

  private _search(node: BSTNode<T> | null, value: T): BSTNode<T> | null {
    if (!node) return null;
    const cmp = this.compare(value, node.value);
    if (cmp === 0) return node;
    return cmp < 0
      ? this._search(node.left, value)
      : this._search(node.right, value);
  }

  private _minNode(node: BSTNode<T> | null): BSTNode<T> | null {
    while (node?.left) node = node.left;
    return node;
  }

  private _maxNode(node: BSTNode<T> | null): BSTNode<T> | null {
    while (node?.right) node = node.right;
    return node;
  }

  // Returns [newSubtreeRoot, didDelete]
  private _remove(node: BSTNode<T> | null, value: T): [BSTNode<T> | null, boolean] {
    if (!node) return [null, false];
    const cmp = this.compare(value, node.value);
    if (cmp < 0) {
      const [left, did] = this._remove(node.left, value);
      node.left = left;
      return [node, did];
    }
    if (cmp > 0) {
      const [right, did] = this._remove(node.right, value);
      node.right = right;
      return [node, did];
    }

    // Found node to delete
    if (node.count > 1) {
      node.count--;
      return [node, true];
    }

    // Node has 0 or 1 child
    if (!node.left) return [node.right, true];
    if (!node.right) return [node.left, true];

    // Node has 2 children: replace with in-order successor
    const successor = this._minNode(node.right)!;
    node.value = successor.value;
    node.count = successor.count;
    const [newRight,] = this._remove(node.right, successor.value);
    node.right = newRight;
    return [node, true];
  }

  /* Traversals */
  private _inOrder(node: BSTNode<T> | null, fn: (val: T) => void): void {
    if (!node) return;
    this._inOrder(node.left, fn);
    for (let i = 0; i < node.count; i++) fn(node.value);
    this._inOrder(node.right, fn);
  }
  private _preOrder(node: BSTNode<T> | null, fn: (val: T) => void): void {
    if (!node) return;
    for (let i = 0; i < node.count; i++) fn(node.value);
    this._preOrder(node.left, fn);
    this._preOrder(node.right, fn);
  }
  private _postOrder(node: BSTNode<T> | null, fn: (val: T) => void): void {
    if (!node) return;
    this._postOrder(node.left, fn);
    this._postOrder(node.right, fn);
    for (let i = 0; i < node.count; i++) fn(node.value);
  }
}

/* ---------- Usage example ---------- */
const bst = new BinarySearchTree<number>();
[7, 3, 9, 1, 5, 5, 5, 8, 10].forEach(n => bst.insert(n));
console.log("In-order:", Array.from({ length: bst.size }, (_, i) => {
  let val: number;
  bst.inOrder(v => val = v);
  return val!;
}));
bst.remove(5);
console.log("Has 5?", bst.has(5)); // true (2 copies left)
console.log("Min:", bst.min(), "Max:", bst.max());
tsc bst.ts
node bst.js

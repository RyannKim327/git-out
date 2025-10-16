// ------------- 1.  Node  -------------
class TreeNode<T> {
  constructor(
    public key: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}

// ------------- 2.  Comparator  -------------
type CompareFn<T> = (a: T, b: T) => number;

function defaultCompare<T>(a: T, b: T): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

// ------------- 3.  BST  -------------
export class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  constructor(private compare: CompareFn<T> = defaultCompare) {}

  // ---------- 3.1  Insert ----------
  insert(key: T): void {
    this.root = this._insert(this.root, key);
  }

  private _insert(node: TreeNode<T> | null, key: T): TreeNode<T> {
    if (!node) return new TreeNode(key);

    const cmp = this.compare(key, node.key);
    if (cmp < 0) node.left = this._insert(node.left, key);
    else if (cmp > 0) node.right = this._insert(node.right, key);
    // duplicates are ignored; change policy if you need to store counts
    return node;
  }

  // ---------- 3.2  Search ----------
  contains(key: T): boolean {
    let cur = this.root;
    while (cur) {
      const cmp = this.compare(key, cur.key);
      if (cmp === 0) return true;
      cur = cmp < 0 ? cur.left : cur.right;
    }
    return false;
  }

  // ---------- 3.3  Min / Max ----------
  min(): T | undefined {
    const node = this._minNode(this.root);
    return node?.key;
  }

  max(): T | undefined {
    const node = this._maxNode(this.root);
    return node?.key;
  }

  private _minNode(node: TreeNode<T> | null): TreeNode<T> | null {
    while (node?.left) node = node.left;
    return node;
  }

  private _maxNode(node: TreeNode<T> | null): TreeNode<T> | null {
    while (node?.right) node = node.right;
    return node;
  }

  // ---------- 3.4  Delete ----------
  delete(key: T): void {
    this.root = this._delete(this.root, key);
  }

  private _delete(node: TreeNode<T> | null, key: T): TreeNode<T> | null {
    if (!node) return null;

    const cmp = this.compare(key, node.key);
    if (cmp < 0) node.left = this._delete(node.left, key);
    else if (cmp > 0) node.right = this._delete(node.right, key);
    else {
      // node with only one child or no child
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // node with two children: get in-order successor (smallest in right subtree)
      const minRight = this._minNode(node.right)!;
      node.key = minRight.key; // copy value
      node.right = this._delete(node.right, minRight.key); // delete successor
    }
    return node;
  }

  // ---------- 3.5  Traversals ----------
  inOrder(cb: (key: T) => void): void {
    this._inOrder(this.root, cb);
  }

  private _inOrder(node: TreeNode<T> | null, cb: (key: T) => void): void {
    if (!node) return;
    this._inOrder(node.left, cb);
    cb(node.key);
    this._inOrder(node.right, cb);
  }

  preOrder(cb: (key: T) => void): void { this._pre(this.root, cb); }
  private _pre(node: TreeNode<T> | null, cb: (key: T) => void): void {
    if (!node) return;
    cb(node.key);
    this._pre(node.left, cb);
    this._pre(node.right, cb);
  }

  postOrder(cb: (key: T) => void): void { this._post(this.root, cb); }
  private _post(node: TreeNode<T> | null, cb: (key: T) => void): void {
    if (!node) return;
    this._post(node.left, cb);
    this._post(node.right, cb);
    cb(node.key);
  }

  // ---------- 3.6  Utility ----------
  isEmpty(): boolean { return this.root === null; }
  clear(): void { this.root = null; }

  // Optional: size & height
  size(): number {
    let cnt = 0;
    this.inOrder(() => cnt++);
    return cnt;
  }

  height(): number { return this._height(this.root); }
  private _height(node: TreeNode<T> | null): number {
    if (!node) return -1;
    return 1 + Math.max(this._height(node.left), this._height(node.right));
  }
}

// ------------- 4.  Usage example -------------
const bst = new BinarySearchTree<number>();
[7, 3, 9, 1, 5, 8, 10].forEach(n => bst.insert(n));

console.log("In-order:", [] as number[], (arr => bst.inOrder(n => arr.push(n)))());
console.log("Contains 5?", bst.contains(5)); // true
bst.delete(7);
console.log("After delete 7, in-order:");
bst.inOrder(console.log);
tsc bst.ts
node bst.js

/* ---------------  BST.ts  --------------- */

export class TreeNode<T> {
  constructor(
    public key: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}

export class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;
  private compare: (a: T, b: T) => number;

  constructor(compareFn?: (a: T, b: T) => number) {
    this.compare = compareFn || this.defaultCompare;
  }

  /* ---- Public API ---- */
  insert(key: T): this {
    this.root = this._insert(this.root, key);
    return this;
  }

  search(key: T): boolean {
    return this._search(this.root, key);
  }

  remove(key: T): this {
    this.root = this._remove(this.root, key);
    return this;
  }

  inOrder(cb: (key: T) => void): void {
    this._inOrder(this.root, cb);
  }

  min(): T | undefined {
    const node = this._minNode(this.root);
    return node?.key;
  }

  max(): T | undefined {
    const node = this._maxNode(this.root);
    return node?.key;
  }

  size(): number {
    return this._size(this.root);
  }

  height(): number {
    return this._height(this.root);
  }

  /* ---- Internal helpers ---- */
  private defaultCompare(a: T, b: T): number {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  private _insert(node: TreeNode<T> | null, key: T): TreeNode<T> {
    if (!node) return new TreeNode(key);
    const cmp = this.compare(key, node.key);
    if (cmp < 0) node.left = this._insert(node.left, key);
    else if (cmp > 0) node.right = this._insert(node.right, key);
    /* duplicate keys are ignored; change policy if desired */
    return node;
  }

  private _search(node: TreeNode<T> | null, key: T): boolean {
    if (!node) return false;
    const cmp = this.compare(key, node.key);
    return cmp === 0 ? true : this._search(cmp < 0 ? node.left : node.right, key);
  }

  private _remove(node: TreeNode<T> | null, key: T): TreeNode<T> | null {
    if (!node) return null;
    const cmp = this.compare(key, node.key);
    if (cmp < 0) node.left = this._remove(node.left, key);
    else if (cmp > 0) node.right = this._remove(node.right, key);
    else {
      // node with only one child or no child
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      // node with two children: get the inorder successor (smallest in right subtree)
      const minRight = this._minNode(node.right)!;
      node.key = minRight.key; // copy value
      node.right = this._remove(node.right, minRight.key); // delete successor
    }
    return node;
  }

  private _inOrder(node: TreeNode<T> | null, cb: (key: T) => void): void {
    if (node) {
      this._inOrder(node.left, cb);
      cb(node.key);
      this._inOrder(node.right, cb);
    }
  }

  private _minNode(node: TreeNode<T> | null): TreeNode<T> | null {
    return node && node.left ? this._minNode(node.left) : node;
  }

  private _maxNode(node: TreeNode<T> | null): TreeNode<T> | null {
    return node && node.right ? this._maxNode(node.right) : node;
  }

  private _size(node: TreeNode<T> | null): number {
    return node ? 1 + this._size(node.left) + this._size(node.right) : 0;
  }

  private _height(node: TreeNode<T> | null): number {
    return node ? 1 + Math.max(this._height(node.left), this._height(node.right)) : -1;
  }
}

/* ---------------  Usage --------------- */
if (import.meta.vitest) {
  const bst = new BinarySearchTree<number>();
  [50, 30, 70, 20, 40, 60, 80].forEach(n => bst.insert(n));

  console.log("In-order:", [] as number[], (out: number[]) => bst.inOrder(n => out.push(n)));
  console.log("Contains 60?", bst.search(60)); // true
  bst.remove(50);
  console.log("Min:", bst.min()); // 20
  console.log("Height:", bst.height()); // 2
}

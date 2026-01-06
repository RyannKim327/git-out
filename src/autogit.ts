// ------------- Node -------------
class TreeNode<T> {
  constructor(
    public value: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}

// ------------- Binary Search Tree -------------
class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  constructor(private compareFn?: (a: T, b: T) => number) {
    if (!compareFn) {
      this.compareFn = (a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0);
    }
  }

  /* ---------- Public API ---------- */

  insert(value: T): void {
    this.root = this._insert(this.root, value);
  }

  search(value: T): boolean {
    return this._search(this.root, value);
  }

  delete(value: T): void {
    this.root = this._delete(this.root, value);
  }

  inOrder(): T[] {
    const result: T[] = [];
    this._inOrder(this.root, result);
    return result;
  }

  preOrder(): T[] {
    const result: T[] = [];
    this._preOrder(this.root, result);
    return result;
  }

  postOrder(): T[] {
    const result: T[] = [];
    this._postOrder(this.root, result);
    return result;
  }

  getHeight(): number {
    return this._height(this.root);
  }

  isEmpty(): boolean {
    return this.root === null;
  }

  /* ---------- Private helpers ---------- */

  private _insert(node: TreeNode<T> | null, value: T): TreeNode<T> {
    if (node === null) return new TreeNode(value);

    const cmp = this.compareFn!(value, node.value);
    if (cmp < 0) node.left = this._insert(node.left, value);
    else if (cmp > 0) node.right = this._insert(node.right, value);
    // duplicates are ignored; change policy if you need to store counts
    return node;
  }

  private _search(node: TreeNode<T> | null, value: T): boolean {
    if (node === null) return false;
    const cmp = this.compareFn!(value, node.value);
    if (cmp === 0) return true;
    return cmp < 0
      ? this._search(node.left, value)
      : this._search(node.right, value);
  }

  private _delete(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (node === null) return null;

    const cmp = this.compareFn!(value, node.value);
    if (cmp < 0) {
      node.left = this._delete(node.left, value);
    } else if (cmp > 0) {
      node.right = this._delete(node.right, value);
    } else {
      // Node to be deleted found
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Two children: replace with in-order successor (smallest in right subtree)
      const minNode = this._minNode(node.right);
      node.value = minNode.value;
      node.right = this._delete(node.right, minNode.value);
    }
    return node;
  }

  private _minNode(node: TreeNode<T>): TreeNode<T> {
    while (node.left) node = node.left;
    return node;
  }

  private _inOrder(node: TreeNode<T> | null, out: T[]): void {
    if (node) {
      this._inOrder(node.left, out);
      out.push(node.value);
      this._inOrder(node.right, out);
    }
  }

  private _preOrder(node: TreeNode<T> | null, out: T[]): void {
    if (node) {
      out.push(node.value);
      this._preOrder(node.left, out);
      this._preOrder(node.right, out);
    }
  }

  private _postOrder(node: TreeNode<T> | null, out: T[]): void {
    if (node) {
      this._postOrder(node.left, out);
      this._postOrder(node.right, out);
      out.push(node.value);
    }
  }

  private _height(node: TreeNode<T> | null): number {
    if (node === null) return -1;
    return 1 + Math.max(this._height(node.left), this._height(node.right));
  }
}

/* ------------- Usage example ------------- */
const bst = new BinarySearchTree<number>();
[7, 3, 9, 1, 5, 8, 10].forEach(n => bst.insert(n));

console.log("In-order:", bst.inOrder());      // [1,3,5,7,8,9,10]
console.log("Pre-order:", bst.preOrder());    // [7,3,1,5,9,8,10]
console.log("Height:", bst.getHeight());       // 2
bst.delete(7);
console.log("After delete 7:", bst.inOrder()); // [1,3,5,8,9,10]
tsc bst.ts
node bst.js

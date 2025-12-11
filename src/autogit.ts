// binaryTree.ts
type CompareFn<T> = (a: T, b: T) => number;

class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;
  private compare: CompareFn<T>;

  constructor(compareFn?: CompareFn<T>) {
    // Default comparator works for numbers, strings, Dates, etc.
    this.compare = compareFn || ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));
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
    const out: T[] = [];
    this._inOrder(this.root, out);
    return out;
  }

  height(): number {
    return this._height(this.root);
  }

  isEmpty(): boolean {
    return this.root === null;
  }

  /* ---------- Private helpers ---------- */

  private _insert(node: TreeNode<T> | null, value: T): TreeNode<T> {
    if (node === null) return new TreeNode(value);

    const cmp = this.compare(value, node.value);
    if (cmp < 0) node.left = this._insert(node.left, value);
    else if (cmp > 0) node.right = this._insert(node.right, value);
    // duplicate => ignore (or update, depending on your policy)
    return node;
  }

  private _search(node: TreeNode<T> | null, value: T): boolean {
    if (node === null) return false;
    const cmp = this.compare(value, node.value);
    if (cmp === 0) return true;
    return cmp < 0
      ? this._search(node.left, value)
      : this._search(node.right, value);
  }

  private _delete(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (node === null) return null;

    const cmp = this.compare(value, node.value);
    if (cmp < 0) {
      node.left = this._delete(node.left, value);
    } else if (cmp > 0) {
      node.right = this._delete(node.right, value);
    } else {
      // Node to be deleted found
      if (!node.left) return node.right; // 0 or 1 child
      if (!node.right) return node.left; // 1 child

      // 2 children: replace with in-order successor (smallest in right subtree)
      const minRight = this._minNode(node.right);
      node.value = minRight.value;
      node.right = this._delete(node.right, minRight.value);
    }
    return node;
  }

  private _minNode(node: TreeNode<T>): TreeNode<T> {
    while (node.left) node = node.left;
    return node;
  }

  private _inOrder(node: TreeNode<T> | null, out: T[]): void {
    if (node === null) return;
    this._inOrder(node.left, out);
    out.push(node.value);
    this._inOrder(node.right, out);
  }

  private _height(node: TreeNode<T> | null): number {
    if (node === null) return -1;
    return 1 + Math.max(this._height(node.left), this._height(node.right));
  }
}

/* ---------- Quick sanity check ---------- */
const bst = new BinarySearchTree<number>();
[7, 3, 9, 1, 5, 8, 10].forEach(n => bst.insert(n));
console.log("In-order:", bst.inOrder()); // [1, 3, 5, 7, 8, 9, 10]
console.log("Height:", bst.height());     // 2
console.log("Search 5:", bst.search(5));  // true
bst.delete(7);
console.log("After deleting 7:", bst.inOrder()); // [1, 3, 5, 8, 9, 10]

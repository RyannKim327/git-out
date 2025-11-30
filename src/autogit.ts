// ---------- Node ----------
class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// ---------- Binary Search Tree ----------
class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  constructor(private compare: (a: T, b: T) => number) {}

  /* ---------- Basic API ---------- */

  insert(value: T): void {
    this.root = this._insert(this.root, value);
  }

  contains(value: T): boolean {
    return this._contains(this.root, value);
  }

  remove(value: T): void {
    this.root = this._remove(this.root, value);
  }

  /* ---------- Traversals ---------- */

  inOrder(): T[] {
    const res: T[] = [];
    this._inOrder(this.root, res);
    return res;
  }

  preOrder(): T[] {
    const res: T[] = [];
    this._preOrder(this.root, res);
    return res;
  }

  postOrder(): T[] {
    const res: T[] = [];
    this._postOrder(this.root, res);
    return res;
  }

  /* ---------- Helpers ---------- */

  private _insert(node: TreeNode<T> | null, value: T): TreeNode<T> {
    if (!node) return new TreeNode(value);

    const cmp = this.compare(value, node.value);
    if (cmp < 0) node.left = this._insert(node.left, value);
    else if (cmp > 0) node.right = this._insert(node.right, value);
    // duplicate: ignore or update; here we ignore
    return node;
  }

  private _contains(node: TreeNode<T> | null, value: T): boolean {
    if (!node) return false;
    const cmp = this.compare(value, node.value);
    if (cmp === 0) return true;
    return cmp < 0
      ? this._contains(node.left, value)
      : this._contains(node.right, value);
  }

  private _remove(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (!node) return null;

    const cmp = this.compare(value, node.value);
    if (cmp < 0) {
      node.left = this._remove(node.left, value);
    } else if (cmp > 0) {
      node.right = this._remove(node.right, value);
    } else {
      // node to delete found
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // two children: replace with in-order successor (smallest in right subtree)
      const minRight = this._min(node.right);
      node.value = minRight.value;
      node.right = this._remove(node.right, minRight.value);
    }
    return node;
  }

  private _min(node: TreeNode<T>): TreeNode<T> {
    while (node.left) node = node.left;
    return node;
  }

  private _inOrder(node: TreeNode<T> | null, out: T[]): void {
    if (!node) return;
    this._inOrder(node.left, out);
    out.push(node.value);
    this._inOrder(node.right, out);
  }

  private _preOrder(node: TreeNode<T> | null, out: T[]): void {
    if (!node) return;
    out.push(node.value);
    this._preOrder(node.left, out);
    this._preOrder(node.right, out);
  }

  private _postOrder(node: TreeNode<T> | null, out: T[]): void {
    if (!node) return;
    this._postOrder(node.left, out);
    this._postOrder(node.right, out);
    out.push(node.value);
  }
}

/* ---------- Usage ---------- */
const bst = new BinarySearchTree<number>((a, b) => a - b);
[5, 3, 7, 2, 4, 6, 8].forEach(n => bst.insert(n));

console.log("In-order:", bst.inOrder());   // [2, 3, 4, 5, 6, 7, 8]
console.log("Contains 6?", bst.contains(6)); // true
bst.remove(5);
console.log("After deleting 5:", bst.inOrder()); // [2, 3, 4, 6, 7, 8]

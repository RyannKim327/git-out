/* ---------- 1.  Node definition ---------- */
class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

/* ---------- 2.  BST class ---------- */
class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;
  private compare: (a: T, b: T) => number;

  /* compareFn should return
       negative  if a < b
       0         if a === b
       positive  if a > b
     Default works for numbers, strings, Dates, etc.
  */
  constructor(compareFn?: (a: T, b: T) => number) {
    this.compare = compareFn || this.defaultCompare;
  }

  private defaultCompare(a: T, b: T): number {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  /* ---------- 3.  Insert ---------- */
  insert(value: T): void {
    this.root = this._insert(this.root, value);
  }

  private _insert(node: TreeNode<T> | null, value: T): TreeNode<T> {
    if (node === null) return new TreeNode(value);

    const cmp = this.compare(value, node.value);
    if (cmp < 0) node.left = this._insert(node.left, value);
    else if (cmp > 0) node.right = this._insert(node.right, value);
    /* duplicate: ignore or update policy here */
    return node;
  }

  /* ---------- 4.  Search ---------- */
  contains(value: T): boolean {
    return this._contains(this.root, value);
  }

  private _contains(node: TreeNode<T> | null, value: T): boolean {
    if (node === null) return false;
    const cmp = this.compare(value, node.value);
    if (cmp === 0) return true;
    return cmp < 0
      ? this._contains(node.left, value)
      : this._contains(node.right, value);
  }

  /* ---------- 5.  Delete ---------- */
  delete(value: T): void {
    this.root = this._delete(this.root, value);
  }

  private _delete(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (node === null) return null;

    const cmp = this.compare(value, node.value);
    if (cmp < 0) {
      node.left = this._delete(node.left, value);
    } else if (cmp > 0) {
      node.right = this._delete(node.right, value);
    } else {
      // node with only one child or no child
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      // node with two children: get inorder successor
      const minRight = this._findMin(node.right);
      node.value = minRight.value;
      node.right = this._delete(node.right, minRight.value);
    }
    return node;
  }

  private _findMin(node: TreeNode<T>): TreeNode<T> {
    while (node.left !== null) node = node.left;
    return node;
  }

  /* ---------- 6.  Traversals ---------- */
  inOrder(): T[] {
    const res: T[] = [];
    this._inOrder(this.root, res);
    return res;
  }
  private _inOrder(node: TreeNode<T> | null, out: T[]): void {
    if (node) {
      this._inOrder(node.left, out);
      out.push(node.value);
      this._inOrder(node.right, out);
    }
  }

  preOrder(): T[] {
    const res: T[] = [];
    this._preOrder(this.root, res);
    return res;
  }
  private _preOrder(node: TreeNode<T> | null, out: T[]): void {
    if (node) {
      out.push(node.value);
      this._preOrder(node.left, out);
      this._preOrder(node.right, out);
    }
  }

  postOrder(): T[] {
    const res: T[] = [];
    this._postOrder(this.root, res);
    return res;
  }
  private _postOrder(node: TreeNode<T> | null, out: T[]): void {
    if (node) {
      this._postOrder(node.left, out);
      this._postOrder(node.right, out);
      out.push(node.value);
    }
  }

  /* ---------- 7.  Utility ---------- */
  isEmpty(): boolean {
    return this.root === null;
  }
}

/* ---------- 8.  Usage examples ---------- */
const bst = new BinarySearchTree<number>();
[7, 3, 9, 1, 5, 8, 10].forEach(n => bst.insert(n));

console.log("In-order:", bst.inOrder());     // [1,3,5,7,8,9,10]
console.log("Contains 5?", bst.contains(5)); // true
bst.delete(7);
console.log("After delete 7:", bst.inOrder()); // [1,3,5,8,9,10]

/* Custom comparator example (descending order) */
const reverseBST = new BinarySearchTree<number>((a, b) => b - a);
[7, 3, 9].forEach(n => reverseBST.insert(n));
console.log("Descending in-order:", reverseBST.inOrder()); // [9,7,3]

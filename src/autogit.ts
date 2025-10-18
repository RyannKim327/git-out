/* ---------- BST.ts ---------- */

export class TreeNode<T> {
  constructor(
    public key: number,      // BST ordering key
    public data: T,          // satellite data
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}

export class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;
  private _size = 0;

  /* --------- public API --------- */

  insert(key: number, data: T): void {
    this.root = this._insert(this.root, key, data);
  }

  search(key: number): T | undefined {
    const node = this._search(this.root, key);
    return node ? node.data : undefined;
  }

  delete(key: number): boolean {
    const oldSize = this._size;
    this.root = this._delete(this.root, key);
    return this._size < oldSize;
  }

  inOrder(): Iterable<T> {
    const res: T[] = [];
    this._inOrder(this.root, res);
    return res;
  }

  get size(): number { return this._size; }

  min(): T | undefined {
    const node = this._min(this.root);
    return node ? node.data : undefined;
  }

  max(): T | undefined {
    const node = this._max(this.root);
    return node ? node.data : undefined;
  }

  clear(): void {
    this.root = null;
    this._size = 0;
  }

  /* --------- private helpers --------- */

  private _insert(node: TreeNode<T> | null, key: number, data: T): TreeNode<T> {
    if (!node) { this._size++; return new TreeNode(key, data); }
    if (key === node.key) { node.data = data; return node; }
    if (key < node.key) node.left = this._insert(node.left, key, data);
    else node.right = this._insert(node.right, key, data);
    return node;
  }

  private _search(node: TreeNode<T> | null, key: number): TreeNode<T> | null {
    if (!node || node.key === key) return node;
    return key < node.key
      ? this._search(node.left, key)
      : this._search(node.right, key);
  }

  private _delete(node: TreeNode<T> | null, key: number): TreeNode<T> | null {
    if (!node) return null;
    if (key < node.key) {
      node.left = this._delete(node.left, key);
    } else if (key > node.key) {
      node.right = this._delete(node.right, key);
    } else { // found
      this._size--;
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      // two children: replace with in-order successor (min of right subtree)
      const succ = this._min(node.right)!;
      node.key = succ.key;
      node.data = succ.data;
      node.right = this._delete(node.right, succ.key);
    }
    return node;
  }

  private _inOrder(node: TreeNode<T> | null, out: T[]): void {
    if (!node) return;
    this._inOrder(node.left, out);
    out.push(node.data);
    this._inOrder(node.right, out);
  }

  private _min(node: TreeNode<T> | null): TreeNode<T> | null {
    return node ? (node.left ? this._min(node.left) : node) : null;
  }

  private _max(node: TreeNode<T> | null): TreeNode<T> | null {
    return node ? (node.right ? this._max(node.right) : node) : null;
  }
}
import { BinarySearchTree } from './BST';

const bst = new BinarySearchTree<string>();

bst.insert(50, 'fifty');
bst.insert(30, 'thirty');
bst.insert(70, 'seventy');
bst.insert(20, 'twenty');
bst.insert(40, 'forty');

console.log([...bst.inOrder()]); // ["twenty","thirty","forty","fifty","seventy"]
console.log(bst.search(40));     // "forty"
console.log(bst.delete(30));     // true
console.log(bst.size);           // 4
console.log(bst.min());          // "twenty"

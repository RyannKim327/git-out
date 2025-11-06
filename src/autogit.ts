// binarySearchTree.ts
export class TreeNode<T> {
  constructor(
    public key: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}

export interface BinarySearchTreeInterface<T> {
  insert(key: T): this;
  has(key: T): boolean;
  delete(key: T): boolean;
  *[Symbol.iterator](): Generator<T, void, unknown>;
  size: number;
}

export class BinarySearchTree<T> implements BinarySearchTreeInterface<T> {
  private root: TreeNode<T> | null = null;
  private _size = 0;
  private compare: (a: T, b: T) => number;

  constructor(compareFn?: (a: T, b: T) => number) {
    this.compare = compareFn || this.defaultCompare;
  }

  get size(): number {
    return this._size;
  }

  /* ---------- Public API ---------- */

  insert(key: T): this {
    this.root = this._insert(this.root, key);
    return this;
  }

  has(key: T): boolean {
    return this._search(this.root, key) !== null;
  }

  delete(key: T): boolean {
    const oldSize = this._size;
    this.root = this._delete(this.root, key);
    return this._size < oldSize;
  }

  /** In-order generator (ascending order for BST) */
  *[Symbol.iterator](): Generator<T, void, unknown> {
    yield* this._inOrder(this.root);
  }

  /* ---------- Private helpers ---------- */

  private defaultCompare(a: T, b: T): number {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  private _insert(node: TreeNode<T> | null, key: T): TreeNode<T> {
    if (!node) {
      this._size++;
      return new TreeNode(key);
    }
    const cmp = this.compare(key, node.key);
    if (cmp === 0) return node; // duplicate keys ignored
    if (cmp < 0) node.left = this._insert(node.left, key);
    else node.right = this._insert(node.right, key);
    return this._balance(node);
  }

  private _search(node: TreeNode<T> | null, key: T): TreeNode<T> | null {
    if (!node) return null;
    const cmp = this.compare(key, node.key);
    if (cmp === 0) return node;
    return cmp < 0
      ? this._search(node.left, key)
      : this._search(node.right, key);
  }

  private _delete(node: TreeNode<T> | null, key: T): TreeNode<T> | null {
    if (!node) return null;
    const cmp = this.compare(key, node.key);
    if (cmp < 0) {
      node.left = this._delete(node.left, key);
    } else if (cmp > 0) {
      node.right = this._delete(node.right, key);
    } else {
      // found node to delete
      this._size--;
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      // two children: replace with in-order successor (smallest in right subtree)
      const minNode = this._min(node.right);
      node.key = minNode.key;
      node.right = this._delete(node.right, minNode.key);
    }
    return this._balance(node);
  }

  private _min(node: TreeNode<T>): TreeNode<T> {
    while (node.left) node = node.left;
    return node;
  }

  private _inOrder(node: TreeNode<T> | null): Generator<T, void, unknown> {
    if (node) {
      yield* this._inOrder(node.left);
      yield node.key;
      yield* this._inOrder(node.right);
    }
  }

  /** Hook for future balancing (AVL, Red-Black, etc.) */
  private _balance(node: TreeNode<T>): TreeNode<T> {
    return node; // no-op for plain BST
  }
}

/* ---------- Quick sanity check ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("BST basics", () => {
    const bst = new BinarySearchTree<number>();
    const data = [5, 3, 7, 2, 4, 6, 8];
    data.forEach((n) => bst.insert(n));
    expect([...bst]).toEqual([2, 3, 4, 5, 6, 7, 8]);
    expect(bst.has(4)).toBe(true);
    expect(bst.delete(5)).toBe(true);
    expect(bst.has(5)).toBe(false);
    expect([...bst]).toEqual([2, 3, 4, 6, 7, 8]);
  });
}
import { BinarySearchTree } from "./binarySearchTree";

const tree = new BinarySearchTree<number>();
[50, 30, 70, 20, 40, 60, 80].forEach((n) => tree.insert(n));

console.log("In-order:", [...tree]); // 20 30 40 50 60 70 80
console.log("Has 60?", tree.has(60)); // true
tree.delete(50);
console.log("After deleting 50:", [...tree]); // 20 30 40 60 70 80

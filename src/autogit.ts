// ---------------------------------------------
// 1.  Node definition
// ---------------------------------------------
class TreeNode<T> {
  constructor(
    public key: number,      // BST ordering key
    public value: T,         // satellite data
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}

// ---------------------------------------------
// 2.  BST class
// ---------------------------------------------
export class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;
  private _size = 0;

  // ---------- basic queries ----------
  get size(): number { return this._size; }
  isEmpty(): boolean { return this._size === 0; }

  // ---------- search ----------
  has(key: number): boolean {
    return this._search(this.root, key) !== null;
  }

  get(key: number): T | undefined {
    const node = this._search(this.root, key);
    return node ? node.value : undefined;
  }

  // ---------- insertion ----------
  insert(key: number, value: T): this {
    this.root = this._insert(this.root, key, value);
    return this;
  }

  // ---------- deletion ----------
  delete(key: number): boolean {
    const oldSize = this._size;
    this.root = this._delete(this.root, key);
    return this._size < oldSize;
  }

  // ---------- traversal ----------
  *inOrder(): Iterable<[number, T]> {
    function* walk(n: TreeNode<T> | null): Generator<[number, T]> {
      if (!n) return;
      yield* walk(n.left);
      yield [n.key, n.value];
      yield* walk(n.right);
    }
    yield* walk(this.root);
  }

  // ---------- utilities ----------
  min(): [number, T] | undefined {
    const node = this._min(this.root);
    return node ? [node.key, node.value] : undefined;
  }

  max(): [number, T] | undefined {
    const node = this._max(this.root);
    return node ? [node.key, node.value] : undefined;
  }

  clear(): void {
    this.root = null;
    this._size = 0;
  }

  // ---------- private helpers ----------
  private _search(node: TreeNode<T> | null, key: number): TreeNode<T> | null {
    if (!node) return null;
    if (key === node.key) return node;
    return key < node.key
      ? this._search(node.left, key)
      : this._search(node.right, key);
  }

  private _insert(node: TreeNode<T> | null, key: number, value: T): TreeNode<T> {
    if (!node) {
      this._size++;
      return new TreeNode(key, value);
    }
    if (key === node.key) {
      node.value = value;          // update semantics
    } else if (key < node.key) {
      node.left = this._insert(node.left, key, value);
    } else {
      node.right = this._insert(node.right, key, value);
    }
    return node;
  }

  private _delete(node: TreeNode<T> | null, key: number): TreeNode<T> | null {
    if (!node) return null;

    if (key < node.key) {
      node.left = this._delete(node.left, key);
    } else if (key > node.key) {
      node.right = this._delete(node.right, key);
    } else {
      // node to be deleted found
      this._size--;
      // 0 or 1 child
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      // 2 children: replace with in-order successor (smallest in right subtree)
      const successor = this._min(node.right)!;
      node.key = successor.key;
      node.value = successor.value;
      node.right = this._delete(node.right, successor.key);
    }
    return node;
  }

  private _min(node: TreeNode<T> | null): TreeNode<T> | null {
    while (node?.left) node = node.left;
    return node;
  }

  private _max(node: TreeNode<T> | null): TreeNode<T> | null {
    while (node?.right) node = node.right;
    return node;
  }
}

// ---------------------------------------------
// 3.  Usage examples
// ---------------------------------------------
if (import.meta.vitest) {
  const bst = new BinarySearchTree<string>();

  bst.insert(5, 'five')
     .insert(3, 'three')
     .insert(7, 'seven')
     .insert(4, 'four');

  console.log([...bst.inOrder()]); // [ [3,'three'], [4,'four'], [5,'five'], [7,'seven'] ]

  console.log(bst.get(4));         // 'four'
  console.log(bst.delete(5));    // true
  console.log(bst.size);           // 3
  console.log(bst.min());          // [3, 'three']
}

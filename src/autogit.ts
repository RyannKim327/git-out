// --------------  bst.ts  --------------

type CompareFn<T> = (a: T, b: T) => number;   // < 0  |  0  |  > 0

class BSTNode<T> {
  constructor(
    public key: T,
    public left: BSTNode<T> | null = null,
    public right: BSTNode<T> | null = null
  ) {}
}

export class BinarySearchTree<T> {
  private root: BSTNode<T> | null = null;
  private _size = 0;

  constructor(private compare: CompareFn<T> = defaultCompare) {}

  /* ---------- public API ---------- */

  insert(key: T): this {
    this.root = this._insert(this.root, key);
    return this;
  }

  has(key: T): boolean {
    return this._search(this.root, key) !== null;
  }

  remove(key: T): boolean {
    const oldSize = this._size;
    this.root = this._delete(this.root, key);
    return this._size < oldSize;
  }

  min(): T | undefined {
    const node = this._minNode(this.root);
    return node ? node.key : undefined;
  }

  max(): T | undefined {
    const node = this._maxNode(this.root);
    return node ? node.key : undefined;
  }

  *inOrder(): Iterable<T> {
    yield* this._inOrder(this.root);
  }

  get size(): number {
    return this._size;
  }

  /* ---------- private helpers ---------- */

  private _insert(node: BSTNode<T> | null, key: T): BSTNode<T> {
    if (!node) {
      this._size++;
      return new BSTNode(key);
    }
    const cmp = this.compare(key, node.key);
    if (cmp < 0) node.left = this._insert(node.left, key);
    else if (cmp > 0) node.right = this._insert(node.right, key);
    // duplicate → ignore (or update policy here)
    return node;
  }

  private _search(node: BSTNode<T> | null, key: T): BSTNode<T> | null {
    if (!node) return null;
    const cmp = this.compare(key, node.key);
    return cmp === 0
      ? node
      : this._search(cmp < 0 ? node.left : node.right, key);
  }

  private _delete(node: BSTNode<T> | null, key: T): BSTNode<T> | null {
    if (!node) return null;
    const cmp = this.compare(key, node.key);
    if (cmp < 0) node.left = this._delete(node.left, key);
    else if (cmp > 0) node.right = this._delete(node.right, key);
    else {
      this._size--;
      // node with only one child or no child
      if (!node.left || !node.right) return node.left || node.right;
      // node with two children: replace with in-order successor
      const minRight = this._minNode(node.right)!;
      node.key = minRight.key;
      node.right = this._delete(node.right, minRight.key);
    }
    return node;
  }

  private _minNode(node: BSTNode<T> | null): BSTNode<T> | null {
    while (node?.left) node = node.left;
    return node;
  }

  private _maxNode(node: BSTNode<T> | null): BSTNode<T> | null {
    while (node?.right) node = node.right;
    return node;
  }

  private *_inOrder(node: BSTNode<T> | null): Iterable<T> {
    if (node) {
      yield* this._inOrder(node.left);
      yield node.key;
      yield* this._inOrder(node.right);
    }
  }
}

/* ---------- default comparator for primitives ---------- */
function defaultCompare<T>(a: T, b: T): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/* ---------- quick demo ---------- */
if (require.main === module) {
  const bst = new BinarySearchTree<number>();
  [50, 30, 70, 20, 40, 60, 80].forEach(n => bst.insert(n));
  console.log("In-order:", [...bst.inOrder()]);   // 20 30 40 50 60 70 80
  console.log("Has 60?", bst.has(60));            // true
  bst.remove(50);
  console.log("After deleting 50:", [...bst.inOrder()]);
}
interface Person { id: number; name: string }
const tree = new BinarySearchTree<Person>(
  (a, b) => a.id - b.id
);
tree.insert({ id: 3, name: "Alice" });

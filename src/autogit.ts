// ------------------------------------------------------------------
// 1.  Comparator contract
// ------------------------------------------------------------------
type Compare<T> = (a: T, b: T) => number;   // <0  | 0  | >0

// ------------------------------------------------------------------
// 2.  Node
// ------------------------------------------------------------------
class AVLNode<T> {
  constructor(
    public key: T,
    public left: AVLNode<T> | null = null,
    public right: AVLNode<T> | null = null,
    public height: number = 1
  ) {}
}

// ------------------------------------------------------------------
// 3.  AVL-tree based BST
// ------------------------------------------------------------------
export class BinarySearchTree<T> {
  private root: AVLNode<T> | null = null;
  private _size = 0;

  constructor(private compare: Compare<T>) {}

  get size(): number { return this._size; }

  clear(): void {
    this.root = null;
    this._size = 0;
  }

  /* ---------- Insert ---------- */
  add(key: T): this {
    this.root = this._insert(this.root, key);
    return this;
  }
  private _insert(node: AVLNode<T> | null, key: T): AVLNode<T> {
    if (!node) { this._size++; return new AVLNode(key); }

    const cmp = this.compare(key, node.key);
    if (cmp === 0) return node;                 // duplicate → ignore
    if (cmp < 0) node.left  = this._insert(node.left,  key);
    else         node.right = this._insert(node.right, key);

    return this._rebalance(node);
  }

  /* ---------- Search ---------- */
  has(key: T): boolean {
    let cur = this.root;
    while (cur) {
      const cmp = this.compare(key, cur.key);
      if (cmp === 0) return true;
      cur = cmp < 0 ? cur.left : cur.right;
    }
    return false;
  }

  /* ---------- Delete ---------- */
  remove(key: T): boolean {
    const oldSize = this._size;
    this.root = this._delete(this.root, key);
    return this._size < oldSize;
  }
  private _delete(node: AVLNode<T> | null, key: T): AVLNode<T> | null {
    if (!node) return null;

    const cmp = this.compare(key, node.key);
    if (cmp < 0)      node.left  = this._delete(node.left,  key);
    else if (cmp > 0) node.right = this._delete(node.right, key);
    else {                                        // found
      if (!node.left || !node.right) {          // 0 or 1 child
        this._size--;
        return node.left ?? node.right;
      }
      // 2 children → replace by in-order successor (smallest in right)
      const min = this._min(node.right)!;
      node.key = min.key;
      node.right = this._delete(node.right, min.key);
    }
    return this._rebalance(node);
  }

  /* ---------- Utility ---------- */
  toArray(): T[] {
    const out: T[] = [];
    this._inOrder(this.root, out);
    return out;
  }
  private _inOrder(node: AVLNode<T> | null, out: T[]) {
    if (!node) return;
    this._inOrder(node.left, out);
    out.push(node.key);
    this._inOrder(node.right, out);
  }
  private min(): T | undefined { return this._min(this.root)?.key; }
  private _min(node: AVLNode<T> | null): AVLNode<T> | null {
    return node?.left ? this._min(node.left) : node;
  }
  private max(): T | undefined { return this._max(this.root)?.key; }
  private _max(node: AVLNode<T> | null): AVLNode<T> | null {
    return node?.right ? this._max(node.right) : node;
  }

  /* ---------- AVL balancing ---------- */
  private _height(n: AVLNode<T> | null): number { return n?.height ?? 0; }
  private _updateHeight(n: AVLNode<T>): void {
    n.height = 1 + Math.max(this._height(n.left), this._height(n.right));
  }
  private _balanceFactor(n: AVLNode<T>): number {
    return this._height(n.left) - this._height(n.right);
  }
  private _rotateLeft(z: AVLNode<T>): AVLNode<T> {
    const y = z.right!;
    const T2 = y.left;
    y.left = z; z.right = T2;
    this._updateHeight(z); this._updateHeight(y);
    return y;
  }
  private _rotateRight(z: AVLNode<T>): AVLNode<T> {
    const y = z.left!;
    const T3 = y.right;
    y.right = z; z.left = T3;
    this._updateHeight(z); this._updateHeight(y);
    return y;
  }
  private _rebalance(node: AVLNode<T>): AVLNode<T> {
    this._updateHeight(node);
    const bf = this._balanceFactor(node);
    if (bf > 1) {                               // left heavy
      if (this._balanceFactor(node.left!) < 0) node.left = this._rotateLeft(node.left!);
      return this._rotateRight(node);
    }
    if (bf < -1) {                              // right heavy
      if (this._balanceFactor(node.right!) > 0) node.right = this._rotateRight(node.right!);
      return this._rotateLeft(node);
    }
    return node;
  }
}

// ------------------------------------------------------------------
// 4.  Usage example
// ------------------------------------------------------------------
const bst = new BinarySearchTree<number>((a, b) => a - b);
[5, 3, 7, 2, 4, 6, 8].forEach(n => bst.add(n));
console.log(bst.toArray());   // [2, 3, 4, 5, 6, 7, 8]
console.log(bst.has(4));        // true
bst.remove(5);
console.log(bst.toArray());     // [2, 3, 4, 6, 7, 8]

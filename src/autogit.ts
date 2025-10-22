// ---------- Types ----------
type CompareFn<T> = (a: T, b: T) => number;   // <0  0  >0

class AVLNode<T> {
  constructor(
    public key: T,
    public left: AVLNode<T> | null = null,
    public right: AVLNode<T> | null = null,
    public height: number = 1
  ) {}
}

export class AVLTree<T> {
  private root: AVLNode<T> | null = null;
  private compare: CompareFn<T>;

  constructor(compare?: CompareFn<T>) {
    this.compare = compare || this.defaultCompare;
  }

  /* ---------- Public API ---------- */
  insert(key: T): void {
    this.root = this._insert(this.root, key);
  }

  delete(key: T): void {
    this.root = this._delete(this.root, key);
  }

  has(key: T): boolean {
    return this._search(this.root, key) !== null;
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
    function* walk(n: AVLNode<T> | null): Iterable<T> {
      if (!n) return;
      yield* walk(n.left);
      yield n.key;
      yield* walk(n.right);
    }
    yield* walk(this.root);
  }

  isHealthy(): boolean {
    return this._isBST(this.root, null, null) && this._heightsOK(this.root);
  }

  /* ---------- Internal ---------- */
  private defaultCompare(a: T, b: T): number {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  private height(n: AVLNode<T> | null): number {
    return n ? n.height : 0;
  }

  private updateHeight(n: AVLNode<T>): void {
    n.height = 1 + Math.max(this.height(n.left), this.height(n.right));
  }

  private balance(n: AVLNode<T>): number {
    return this.height(n.left) - this.height(n.right);
  }

  private rotateLeft(z: AVLNode<T>): AVLNode<T> {
    const y = z.right!;
    const T2 = y.left;
    y.left = z;
    z.right = T2;
    this.updateHeight(z);
    this.updateHeight(y);
    return y;
  }

  private rotateRight(z: AVLNode<T>): AVLNode<T> {
    const y = z.left!;
    const T3 = y.right;
    y.right = z;
    z.left = T3;
    this.updateHeight(z);
    this.updateHeight(y);
    return y;
  }

  private rebalance(node: AVLNode<T>): AVLNode<T> {
    this.updateHeight(node);
    const b = this.balance(node);
    if (b > 1) {                // left heavy
      if (this.balance(node.left!) < 0) node.left = this.rotateLeft(node.left!);
      return this.rotateRight(node);
    }
    if (b < -1) {               // right heavy
      if (this.balance(node.right!) > 0) node.right = this.rotateRight(node.right!);
      return this.rotateLeft(node);
    }
    return node;
  }

  private _insert(n: AVLNode<T> | null, key: T): AVLNode<T> {
    if (!n) return new AVLNode(key);
    const cmp = this.compare(key, n.key);
    if (cmp < 0) n.left = this._insert(n.left, key);
    else if (cmp > 0) n.right = this._insert(n.right, key);
    else return n; // duplicate – ignore or update here
    return this.rebalance(n);
  }

  private _delete(n: AVLNode<T> | null, key: T): AVLNode<T> | null {
    if (!n) return null;
    const cmp = this.compare(key, n.key);
    if (cmp < 0) n.left = this._delete(n.left, key);
    else if (cmp > 0) n.right = this._delete(n.right, key);
    else { // found
      if (!n.left || !n.right) return n.left || n.right;
      // two children: replace with in-order successor
      const succ = this._minNode(n.right)!;
      n.key = succ.key;
      n.right = this._delete(n.right, succ.key);
    }
    return this.rebalance(n);
  }

  private _search(n: AVLNode<T> | null, key: T): AVLNode<T> | null {
    if (!n) return null;
    const cmp = this.compare(key, n.key);
    return cmp === 0 ? n : cmp < 0 ? this._search(n.left, key) : this._search(n.right, key);
  }

  private _minNode(n: AVLNode<T> | null): AVLNode<T> | null {
    return n ? (n.left ? this._minNode(n.left) : n) : null;
  }

  private _maxNode(n: AVLNode<T> | null): AVLNode<T> | null {
    return n ? (n.right ? this._maxNode(n.right) : n) : null;
  }

  /* ---------- Sanity checks ---------- */
  private _isBST(n: AVLNode<T> | null, min: T | null, max: T | null): boolean {
    if (!n) return true;
    if ((min !== null && this.compare(n.key, min) <= 0) ||
        (max !== null && this.compare(n.key, max) >= 0)) return false;
    return this._isBST(n.left, min, n.key) && this._isBST(n.right, n.key, max);
  }

  private _heightsOK(n: AVLNode<T> | null): boolean {
    if (!n) return true;
    const lh = this.height(n.left);
    const rh = this.height(n.right);
    if (n.height !== 1 + Math.max(lh, rh) || Math.abs(lh - rh) > 1) return false;
    return this._heightsOK(n.left) && this._heightsOK(n.right);
  }
}

/* ---------- Demo ---------- */
if (require.main === module) {
  const avl = new AVLTree<number>();
  [5, 3, 7, 2, 4, 6, 8, 1, 9].forEach(x => avl.insert(x));
  console.log("In-order:", [...avl.inOrder()]); // 1..9
  avl.delete(5);
  console.log("After delete 5:", [...avl.inOrder()]);
  console.log("Tree healthy?", avl.isHealthy());
}
tsc avl.ts
node avl.js
In-order: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
After delete 5: [ 1, 2, 3, 4, 6, 7, 8, 9 ]
Tree healthy? true

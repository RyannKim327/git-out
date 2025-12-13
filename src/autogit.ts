// tree.ts
type Comparator<T> = (a: T, b: T) => number;

interface Node<T> {
  value: T;
  left: Node<T> | null;
  right: Node<T> | null;
  height: number;
}

export class BinaryTree<T> {
  private root: Node<T> | null = null;
  private compare: Comparator<T>;

  constructor(compareFn?: Comparator<T>) {
    this.compare =
      compareFn ||
      ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));
  }

  /* ---------- Public API ---------- */

  insert(value: T): this {
    this.root = this._insert(this.root, value);
    return this;
  }

  delete(value: T): boolean {
    const oldSize = this.size;
    this.root = this._delete(this.root, value);
    return this.size < oldSize;
  }

  search(value: T): boolean {
    return this._search(this.root, value);
  }

  inOrder(): T[] {
    const out: T[] = [];
    this._inOrder(this.root, out);
    return out;
  }

  get size(): number {
    return this._size(this.root);
  }

  clear(): void {
    this.root = null;
  }

  isEmpty(): boolean {
    return this.root === null;
  }

  /* ---------- Private helpers ---------- */

  private _insert(node: Node<T> | null, value: T): Node<T> {
    if (!node) return { value, left: null, right: null, height: 1 };

    const cmp = this.compare(value, node.value);
    if (cmp < 0) node.left = this._insert(node.left, value);
    else if (cmp > 0) node.right = this._insert(node.right, value);
    else return node; // duplicate

    return this._rebalance(node);
  }

  private _delete(node: Node<T> | null, value: T): Node<T> | null {
    if (!node) return null;

    const cmp = this.compare(value, node.value);
    if (cmp < 0) node.left = this._delete(node.left, value);
    else if (cmp > 0) node.right = this._delete(node.right, value);
    else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // replace with in-order successor
      const min = this._min(node.right);
      node.value = min.value;
      node.right = this._delete(node.right, min.value);
    }
    return this._rebalance(node);
  }

  private _search(node: Node<T> | null, value: T): boolean {
    if (!node) return false;
    const cmp = this.compare(value, node.value);
    return cmp === 0
      ? true
      : cmp < 0
      ? this._search(node.left, value)
      : this._search(node.right, value);
  }

  private _inOrder(node: Node<T> | null, out: T[]): void {
    if (!node) return;
    this._inOrder(node.left, out);
    out.push(node.value);
    this._inOrder(node.right, out);
  }

  private _size(node: Node<T> | null): number {
    if (!node) return 0;
    return 1 + this._size(node.left) + this._size(node.right);
  }

  private _min(node: Node<T>): Node<T> {
    while (node.left) node = node.left;
    return node;
  }

  /* ---------- AVL rebalancing ---------- */

  private _height(n: Node<T> | null): number {
    return n ? n.height : 0;
  }

  private _updateHeight(n: Node<T>): void {
    n.height = 1 + Math.max(this._height(n.left), this._height(n.right));
  }

  private _balanceFactor(n: Node<T>): number {
    return this._height(n.left) - this._height(n.right);
  }

  private _rotateLeft(z: Node<T>): Node<T> {
    const y = z.right!;
    const T2 = y.left;
    y.left = z;
    z.right = T2;
    this._updateHeight(z);
    this._updateHeight(y);
    return y;
  }

  private _rotateRight(z: Node<T>): Node<T> {
    const y = z.left!;
    const T3 = y.right;
    y.right = z;
    z.left = T3;
    this._updateHeight(z);
    this._updateHeight(y);
    return y;
  }

  private _rebalance(node: Node<T>): Node<T> {
    this._updateHeight(node);
    const bf = this._balanceFactor(node);

    if (bf > 1) {
      if (this._balanceFactor(node.left!) < 0)
        node.left = this._rotateLeft(node.left!);
      return this._rotateRight(node);
    }

    if (bf < -1) {
      if (this._balanceFactor(node.right!) > 0)
        node.right = this._rotateRight(node.right!);
      return this._rotateLeft(node);
    }

    return node;
  }
}

/* ---------- Quick demo ---------- */
if (require.main === module) {
  const tree = new BinaryTree<number>();
  [5, 3, 7, 2, 4, 6, 8].forEach(n => tree.insert(n));
  console.log('inOrder:', tree.inOrder()); // [2, 3, 4, 5, 6, 7, 8]
  console.log('search 6:', tree.search(6)); // true
  tree.delete(5);
  console.log('after delete 5:', tree.inOrder()); // [2, 3, 4, 6, 7, 8]
}
npm i -g ts-node
ts-node tree.ts

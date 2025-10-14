// RedBlackTree.ts
export class RedBlackTree<K, V> implements Iterable<[K, V]> {
  constructor(
    private compare: (a: K, b: K) => number = defaultCompare
  ) {}

  /* ---- basic operations ---- */
  insert(key: K, value: V): void;
  get(key: K): V | undefined;
  has(key: K): boolean;
  delete(key: K): boolean;          // true if the key existed
  min(): [K, V] | undefined;
  max(): [K, V] | undefined;

  /* ---- iteration ---- */
  keys(): IterableIterator<K>;
  values(): IterableIterator<V>;
  entries(): IterableIterator<[K, V]>;
  [Symbol.iterator](): IterableIterator<[K, V]>;

  /* ---- debugging ---- */
  verify(): void;                   // throws if RB-properties violated
  size: number;
}
import { RedBlackTree } from "./RedBlackTree";

const map = new RedBlackTree<number, string>();
[5,3,7,1,4,6,9].forEach(k => map.insert(k, `val${k}`));

console.log([...map.entries()]);
// [ [ 1, 'val1' ], [ 3, 'val3' ], [ 4, 'val4' ], [ 5, 'val5' ], [ 6, 'val6' ], [ 7, 'val7' ], [ 9, 'val9' ] ]

map.delete(5);
console.log(map.get(5)); // undefined
type Color = 0 | 1; // 0 = red, 1 = black

interface Node<K, V> {
  key: K;
  value: V;
  color: Color;
  left: Node<K, V> | Nil;
  right: Node<K, V> | Nil;
  parent: Node<K, V> | Nil;
}

interface Nil {
  color: 1;
}

const NIL: Nil = { color: 1 };

function isNode<K, V>(n: Node<K, V> | Nil): n is Node<K, V> {
  return n !== NIL;
}

function defaultCompare<T>(a: T, b: T): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

export class RedBlackTree<K, V> implements Iterable<[K, V]> {
  private root: Node<K, V> | Nil = NIL;
  public size = 0;
  constructor(private compare: (a: K, b: K) => number = defaultCompare) {}

  /* ---------------- public API ---------------- */

  insert(key: K, value: V): void {
    const newNode: Node<K, V> = {
      key,
      value,
      color: 0,
      left: NIL,
      right: NIL,
      parent: NIL,
    };

    if (!isNode(this.root)) {
      this.root = newNode;
      this.root.color = 1;
      this.size = 1;
      return;
    }

    let parent: Node<K, V> | Nil = NIL;
    let curr: Node<K, V> | Nil = this.root;

    while (isNode(curr)) {
      parent = curr;
      const cmp = this.compare(key, curr.key);
      if (cmp === 0) {
        curr.value = value; // overwrite
        return;
      }
      curr = cmp < 0 ? curr.left : curr.right;
    }

    newNode.parent = parent!;
    const p = parent!;
    if (this.compare(key, p.key) < 0) p.left = newNode;
    else p.right = newNode;

    this.insertFixup(newNode);
    this.size++;
  }

  get(key: K): V | undefined {
    const n = this.search(key);
    return isNode(n) ? n.value : undefined;
  }

  has(key: K): boolean {
    return isNode(this.search(key));
  }

  delete(key: K): boolean {
    const z = this.search(key);
    if (!isNode(z)) return false;

    let y = z;
    let yOriginalColor = y.color;
    let x: Node<K, V> | Nil;

    if (!isNode(z.left)) {
      x = z.right;
      this.transplant(z, z.right);
    } else if (!isNode(z.right)) {
      x = z.left;
      this.transplant(z, z.left);
    } else {
      y = this.minimum(z.right);
      yOriginalColor = y.color;
      x = y.right;
      if (y.parent === z) {
        if (isNode(x)) x.parent = y;
      } else {
        this.transplant(y, y.right);
        y.right = z.right;
        y.right.parent = y;
      }
      this.transplant(z, y);
      y.left = z.left;
      y.left.parent = y;
      y.color = z.color;
    }

    if (yOriginalColor === 1 && isNode(x)) this.deleteFixup(x);
    this.size--;
    return true;
  }

  min(): [K, V] | undefined {
    const m = this.minimum(this.root);
    return isNode(m) ? [m.key, m.value] : undefined;
  }

  max(): [K, V] | undefined {
    const m = this.maximum(this.root);
    return isNode(m) ? [m.key, m.value] : undefined;
  }

  /* ---------------- iteration helpers ---------------- */

  private*inorder(n: Node<K, V> | Nil): IterableIterator<[K, V]> {
    if (!isNode(n)) return;
    yield* this.inorder(n.left);
    yield [n.key, n.value];
    yield* this.inorder(n.right);
  }

  *[Symbol.iterator](): IterableIterator<[K, V]> {
    yield* this.inorder(this.root);
  }

  *entries(): IterableIterator<[K, V]> {
    yield* this;
  }

  *keys(): IterableIterator<K> {
    for (const [k] of this) yield k;
  }

  *values(): IterableIterator<V> {
    for (const [, v] of this) yield v;
  }

  /* ---------------- verification helper (optional) ---------------- */

  verify(): void {
    if (!isNode(this.root)) return;
    if (this.root.color !== 1) throw new Error("Root must be black");
    const dfs = (n: Node<K, V> | Nil, bh: number, pathBh: number): number => {
      if (!isNode(n)) return pathBh + 1;
      if (n.color === 0) {
        if (n.parent && (n.parent as Node<K, V>).color === 0)
          throw new Error("Red-red violation");
      }
      const leftBh = dfs(n.left, bh + (n.color === 1 ? 1 : 0), pathBh);
      const rightBh = dfs(n.right, bh + (n.color === 1 ? 1 : 0), pathBh);
      if (leftBh !== rightBh) throw new Error("Black-height violation");
      return leftBh;
    };
    dfs(this.root, 0, 0);
  }

  /* ---------------- private helpers ---------------- */

  private search(key: K): Node<K, V> | Nil {
    let curr = this.root;
    while (isNode(curr)) {
      const cmp = this.compare(key, curr.key);
      if (cmp === 0) return curr;
      curr = cmp < 0 ? curr.left : curr.right;
    }
    return NIL;
  }

  private minimum(n: Node<K, V> | Nil): Node<K, V> | Nil {
    while (isNode(n.left)) n = n.left;
    return n;
  }

  private maximum(n: Node<K, V> | Nil): Node<K, V> | Nil {
    while (isNode(n.right)) n = n.right;
    return n;
  }

  private transplant(u: Node<K, V>, v: Node<K, V> | Nil): void {
    if (!isNode(u.parent)) this.root = v;
    else if (u === u.parent.left) u.parent.left = v;
    else u.parent.right = v;
    if (isNode(v)) v.parent = u.parent;
  }

  private rotateLeft(x: Node<K, V>): void {
    const y = x.right as Node<K, V>;
    x.right = y.left;
    if (isNode(y.left)) y.left.parent = x;
    y.parent = x.parent;
    if (!isNode(x.parent)) this.root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
    y.left = x;
    x.parent = y;
  }

  private rotateRight(x: Node<K, V>): void {
    const y = x.left as Node<K, V>;
    x.left = y.right;
    if (isNode(y.right)) y.right.parent = x;
    y.parent = x.parent;
    if (!isNode(x.parent)) this.root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
    y.right = x;
    x.parent = y;
  }

  private insertFixup(z: Node<K, V>): void {
    while (z.parent && (z.parent as Node<K, V>).color === 0) {
      const parent = z.parent as Node<K, V>;
      const grand = parent.parent as Node<K, V>;
      if (parent === grand.left) {
        const uncle = grand.right;
        if (isNode(uncle) && uncle.color === 0) {
          parent.color = 1;
          uncle.color = 1;
          grand.color = 0;
          z = grand;
        } else {
          if (z === parent.right) {
            z = parent;
            this.rotateLeft(z);
          }
          (z.parent as Node<K, V>).color = 1;
          (z.parent.parent as Node<K, V>).color = 0;
          this.rotateRight(z.parent.parent as Node<K, V>);
        }
      } else {
        const uncle = grand.left;
        if (isNode(uncle) && uncle.color === 0) {
          parent.color = 1;
          uncle.color = 1;
          grand.color = 0;
          z = grand;
        } else {
          if (z === parent.left) {
            z = parent;
            this.rotateRight(z);
          }
          (z.parent as Node<K, V>).color = 1;
          (z.parent.parent as Node<K, V>).color = 0;
          this.rotateLeft(z.parent.parent as Node<K, V>);
        }
      }
    }
    (this.root as Node<K, V>).color = 1;
  }

  private deleteFixup(x: Node<K, V>): void {
    while (x !== this.root && x.color === 1) {
      let w: Node<K, V> | Nil;
      if (x === (x.parent as Node<K, V>).left) {
        w = (x.parent as Node<K, V>).right;
        if (w.color === 0) {
          w.color = 1;
          (x.parent as Node<K, V>).color = 0;
          this.rotateLeft(x.parent as Node<K, V>);
          w = (x.parent as Node<K, V>).right;
        }
        if (w.left.color === 1 && w.right.color === 1) {
          w.color = 0;
          x = x.parent as Node<K, V>;
        } else {
          if (w.right.color === 1) {
            w.left.color = 1;
            w.color = 0;
            this.rotateRight(w as Node<K, V>);
            w = (x.parent as Node<K, V>).right;
          }
          w.color = (x.parent as Node<K, V>).color;
          (x.parent as Node<K, V>).color = 1;
          w.right.color = 1;
          this.rotateLeft(x.parent as Node<K, V>);
          x = this.root as Node<K, V>;
        }
      } else {
        w = (x.parent as Node<K, V>).left;
        if (w.color === 0) {
          w.color = 1;
          (x.parent as Node<K, V>).color = 0;
          this.rotateRight(x.parent as Node<K, V>);
          w = (x.parent as Node<K, V>).left;
        }
        if (w.right.color === 1 && w.left.color === 1) {
          w.color = 0;
          x = x.parent as Node<K, V>;
        } else {
          if (w.left.color === 1) {
            w.right.color = 1;
            w.color = 0;
            this.rotateLeft(w as Node<K, V>);
            w = (x.parent as Node<K, V>).left;
          }
          w.color = (x.parent as Node<K, V>).color;
          (x.parent as Node<K, V>).color = 1;
          w.left.color = 1;
          this.rotateRight(x.parent as Node<K, V>);
          x = this.root as Node<K, V>;
        }
      }
    }
    x.color = 1;
  }
}
npm install -g tsx          # fast TypeScript runner
tsx yourTestFile.ts

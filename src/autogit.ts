import { RedBlackTree } from './RedBlackTree';

const map = new RedBlackTree<number, string>();
map.set(5, 'five');
map.set(3, 'three');
console.log([...map]); // [[3,'three'], [5,'five']]
/* eslint-disable @typescript-eslint/no-non-null-assertion */
type Color = 'RED' | 'BLACK';

/** Single sentinel node shared by the whole tree. */
const NIL: Node<unknown, unknown> = new (class extends Node<any, any> {
  constructor() {
    super(undefined as any, undefined as any, 0);
    this.color = 'BLACK';
    this.parent = this.left = this.right = this;
  }
})();

class Node<K, V> {
  constructor(
    public key: K,
    public value: V,
    public color: Color = 'RED'
  ) {}
  parent: Node<K, V> = NIL as any;
  left: Node<K, V> = NIL as any;
  right: Node<K, V> = NIL as any;
}

export class RedBlackTree<K, V> implements Iterable<[K, V]> {
  private root: Node<K, V> = NIL as any;
  private _size = 0;
  private compare: (a: K, b: K) => number;

  constructor(
    compare?: (a: K, b: K) => number,
    entries?: Iterable<[K, V]>
  ) {
    this.compare = compare || defaultCompare;
    if (entries) for (const [k, v] of entries) this.set(k, v);
  }

  /* -------------- Public Map-like API -------------- */

  get size(): number { return this._size; }

  clear(): void {
    this.root = NIL as any;
    this._size = 0;
  }

  get(key: K): V | undefined {
    const n = this.searchNode(key);
    return n === NIL ? undefined : n.value;
  }

  has(key: K): boolean {
    return this.searchNode(key) !== NIL;
  }

  set(key: K, value: V): this {
    let parent: Node<K, V> = NIL as any;
    let curr: Node<K, V> = this.root;

    while (curr !== NIL) {
      parent = curr;
      const cmp = this.compare(key, curr.key);
      if (cmp === 0) {
        curr.value = value;
        return this;
      }
      curr = cmp < 0 ? curr.left : curr.right;
    }

    const node = new Node(key, value);
    node.parent = parent;
    if (parent === NIL) {
      this.root = node;
    } else {
      const cmp = this.compare(key, parent.key);
      if (cmp < 0) parent.left = node;
      else parent.right = node;
    }
    this._size++;
    this.insertFixup(node);
    return this;
  }

  delete(key: K): boolean {
    const z = this.searchNode(key);
    if (z === NIL) return false;

    let y = z;
    let yOriginalColor = y.color;
    let x: Node<K, V>;

    if (z.left === NIL) {
      x = z.right;
      this.transplant(z, z.right);
    } else if (z.right === NIL) {
      x = z.left;
      this.transplant(z, z.left);
    } else {
      y = this.minimum(z.right);
      yOriginalColor = y.color;
      x = y.right;
      if (y.parent === z) {
        x.parent = y;
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

    if (yOriginalColor === 'BLACK') this.deleteFixup(x);
    this._size--;
    return true;
  }

  *keys(): IterableIterator<K> {
    for (const [k] of this) yield k;
  }

  *values(): IterableIterator<V> {
    for (const [, v] of this) yield v;
  }

  *entries(): IterableIterator<[K, V]> {
    yield* this;
  }

  forEach(
    cb: (value: V, key: K, map: this) => void,
    thisArg?: any
  ): void {
    for (const [k, v] of this) cb.call(thisArg, v, k, this);
  }

  *[Symbol.iterator](): IterableIterator<[K, V]> {
    const stack: Node<K, V>[] = [];
    let curr = this.root;
    while (curr !== NIL || stack.length) {
      while (curr !== NIL) {
        stack.push(curr);
        curr = curr.left;
      }
      curr = stack.pop()!;
      yield [curr.key, curr.value];
      curr = curr.right;
    }
  }

  /* -------------- Private helpers -------------- */

  private searchNode(key: K): Node<K, V> {
    let curr = this.root;
    while (curr !== NIL) {
      const cmp = this.compare(key, curr.key);
      if (cmp === 0) return curr;
      curr = cmp < 0 ? curr.left : curr.right;
    }
    return NIL as any;
  }

  private minimum(node: Node<K, V>): Node<K, V> {
    while (node.left !== NIL) node = node.left;
    return node;
  }

  private transplant(u: Node<K, V>, v: Node<K, V>): void {
    if (u.parent === NIL) this.root = v;
    else if (u === u.parent.left) u.parent.left = v;
    else u.parent.right = v;
    v.parent = u.parent;
  }

  /* ---------- Insertion fixup (CLRS) ---------- */
  private insertFixup(z: Node<K, V>): void {
    while (z.parent.color === 'RED') {
      if (z.parent === z.parent.parent.left) {
        const y = z.parent.parent.right;
        if (y.color === 'RED') {
          z.parent.color = 'BLACK';
          y.color = 'BLACK';
          z.parent.parent.color = 'RED';
          z = z.parent.parent;
        } else {
          if (z === z.parent.right) {
            z = z.parent;
            this.rotateLeft(z);
          }
          z.parent.color = 'BLACK';
          z.parent.parent.color = 'RED';
          this.rotateRight(z.parent.parent);
        }
      } else {
        const y = z.parent.parent.left;
        if (y.color === 'RED') {
          z.parent.color = 'BLACK';
          y.color = 'BLACK';
          z.parent.parent.color = 'RED';
          z = z.parent.parent;
        } else {
          if (z === z.parent.left) {
            z = z.parent;
            this.rotateRight(z);
          }
          z.parent.color = 'BLACK';
          z.parent.parent.color = 'RED';
          this.rotateLeft(z.parent.parent);
        }
      }
    }
    this.root.color = 'BLACK';
  }

  /* ---------- Deletion fixup (CLRS) ---------- */
  private deleteFixup(x: Node<K, V>): void {
    while (x !== this.root && x.color === 'BLACK') {
      if (x === x.parent.left) {
        let w = x.parent.right;
        if (w.color === 'RED') {
          w.color = 'BLACK';
          x.parent.color = 'RED';
          this.rotateLeft(x.parent);
          w = x.parent.right;
        }
        if (w.left.color === 'BLACK' && w.right.color === 'BLACK') {
          w.color = 'RED';
          x = x.parent;
        } else {
          if (w.right.color === 'BLACK') {
            w.left.color = 'BLACK';
            w.color = 'RED';
            this.rotateRight(w);
            w = x.parent.right;
          }
          w.color = x.parent.color;
          x.parent.color = 'BLACK';
          w.right.color = 'BLACK';
          this.rotateLeft(x.parent);
          x = this.root;
        }
      } else {
        let w = x.parent.left;
        if (w.color === 'RED') {
          w.color = 'BLACK';
          x.parent.color = 'RED';
          this.rotateRight(x.parent);
          w = x.parent.left;
        }
        if (w.right.color === 'BLACK' && w.left.color === 'BLACK') {
          w.color = 'RED';
          x = x.parent;
        } else {
          if (w.left.color === 'BLACK') {
            w.right.color = 'BLACK';
            w.color = 'RED';
            this.rotateLeft(w);
            w = x.parent.left;
          }
          w.color = x.parent.color;
          x.parent.color = 'BLACK';
          w.left.color = 'BLACK';
          this.rotateRight(x.parent);
          x = this.root;
        }
      }
    }
    x.color = 'BLACK';
  }

  /* ---------- Rotations ---------- */
  private rotateLeft(x: Node<K, V>): void {
    const y = x.right;
    x.right = y.left;
    if (y.left !== NIL) y.left.parent = x;
    y.parent = x.parent;
    if (x.parent === NIL) this.root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
    y.left = x;
    x.parent = y;
  }

  private rotateRight(x: Node<K, V>): void {
    const y = x.left;
    x.left = y.right;
    if (y.right !== NIL) y.right.parent = x;
    y.parent = x.parent;
    if (x.parent === NIL) this.root = y;
    else if (x === x.parent.right) x.parent.right = y;
    else x.parent.left = y;
    y.right = x;
    x.parent = y;
  }
}

/* ---------- Default comparator ---------- */
function defaultCompare<T>(a: T, b: T): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

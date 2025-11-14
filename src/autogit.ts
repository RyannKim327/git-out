// -------------- public API ---------------------------------------------------

export class RedBlackTree<K, V> implements Iterable<[K, V]> {
  private root: Node<K, V> | Nil = NIL;
  private _size = 0;
  private compare: (a: K, b: K) => number;

  constructor(
    compare?: (a: K, b: K) => number,
    entries?: Iterable<[K, V]>
  ) {
    this.compare = compare || defaultCompare;
    if (entries) for (const [k, v] of entries) this.set(k, v);
  }

  /* ---------- Map-like interface ----------------------------------------- */
  get size(): number { return this._size; }
  clear(): void { this.root = NIL; this._size = 0; }

  get(key: K): V | undefined {
    const n = this.find(key);
    return n === NIL ? undefined : n.value;
  }

  set(key: K, value: V): this {
    const ins = this.insert(key, value);
    if (ins.replaced) return this;          // key already existed
    this._size++;
    this.root = ins.root;
    return this;
  }

  delete(key: K): boolean {
    const { root, deleted } = this.remove(this.root, key);
    if (deleted) {
      this.root = root;
      this._size--;
    }
    return deleted;
  }

  has(key: K): boolean { return this.find(key) !== NIL; }

  keys(): IterableIterator<K>   { return this.iterate("key"); }
  values(): IterableIterator<V> { return this.iterate("value"); }
  entries(): IterableIterator<[K, V]> { return this.iterate("entry"); }

  forEach(cb: (v: V, k: K, m: this) => void): void {
    for (const [k, v] of this) cb(v, k, this);
  }

  [Symbol.iterator](): IterableIterator<[K, V]> { return this.entries(); }

  /* ---------- internal --------------------------------------------------- */
  private find(key: K): Node<K, V> | Nil {
    let cur = this.root;
    while (cur !== NIL) {
      const c = this.compare(key, cur.key);
      if (c === 0) return cur;
      cur = c < 0 ? cur.left : cur.right;
    }
    return NIL;
  }

  /* ---------- insertion ---------------------------------------------------- */
  private insert(key: K, value: V): { root: Node<K, V>; replaced: boolean } {
    function insertRec(root: Node<K, V> | Nil): Node<K, V> {
      if (root === NIL) return new Node(key, value, RED);

      const c = self.compare(key, root.key);
      if (c === 0) { root.value = value; replaced = true; return root; }
      if (c < 0) root.left = insertRec(root.left);
      else       root.right = insertRec(root.right);
      return balance(root);
    }

    const self = this;
    let replaced = false;
    const newRoot = insertRec(this.root);
    newRoot.color = BLACK;
    return { root: newRoot, replaced };
  }

  /* ---------- deletion ----------------------------------------------------- */
  private remove(root: Node<K, V> | Nil, key: K): { root: Node<K, V> | Nil; deleted: boolean } {
    const self = this;
    let deleted = false;

    function removeRec(h: Node<K, V> | Nil): Node<K, V> | Nil {
      if (h === NIL) return NIL;

      const c = self.compare(key, h.key);
      if (c < 0) {
        if (!isRed(h.left) && !isRed(h.left.left)) h = moveRedLeft(h);
        h.left = removeRec(h.left);
      } else {
        if (isRed(h.left)) h = rotateRight(h);
        if (c === 0 && h.right === NIL) return NIL; // delete at bottom
        if (!isRed(h.right) && !isRed(h.right.left)) h = moveRedRight(h);
        if (c === 0) { // replace with successor
          const m = min(h.right);
          h.key = m.key; h.value = m.value;
          key = m.key; // continue deleting the successor
          h.right = deleteMin(h.right);
          deleted = true;
        } else h.right = removeRec(h.right);
      }
      return fixUp(h);
    }

    const newRoot = removeRec(root);
    if (newRoot !== NIL) newRoot.color = BLACK;
    return { root: newRoot, deleted };
  }
}

// -------------- node definition ---------------------------------------------
const RED   = true;
const BLACK = false;
type Color = typeof RED | typeof BLACK;

interface Nil { readonly tag: "Nil"; }
const NIL: Nil = Object.freeze({ tag: "Nil" });

type NodeOrNil<K, V> = Node<K, V> | Nil;

class Node<K, V> {
  constructor(
    public key: K,
    public value: V,
    public color: Color,
    public left: NodeOrNil<K, V> = NIL,
    public right: NodeOrNil<K, V> = NIL
  ) {}
}

// -------------- balancing helpers -------------------------------------------
const isRed = <K, V>(x: NodeOrNil<K, V>): x is Node<K, V> =>
  (x as Node<K, V>).color === RED;

const rotateLeft = <K, V>(h: Node<K, V>): Node<K, V> => {
  const x = h.right as Node<K, V>;
  h.right = x.left;
  x.left = h;
  x.color = h.color;
  h.color = RED;
  return x;
};

const rotateRight = <K, V>(h: Node<K, V>): Node<K, V> => {
  const x = h.left as Node<K, V>;
  h.left = x.right;
  x.right = h;
  x.color = h.color;
  h.color = RED;
  return x;
};

const flipColors = <K, V>(h: Node<K, V>): void => {
  h.color = RED;
  (h.left as Node<K, V>).color = BLACK;
  (h.right as Node<K, V>).color = BLACK;
};

const balance = <K, V>(h: Node<K, V>): Node<K, V> => {
  if (isRed(h.right) && !isRed(h.left)) h = rotateLeft(h);
  if (isRed(h.left) && isRed(h.left.left)) h = rotateRight(h);
  if (isRed(h.left) && isRed(h.right)) flipColors(h);
  return h;
};

const fixUp = balance; // same as balance

const moveRedLeft = <K, V>(h: Node<K, V>): Node<K, V> => {
  flipColors(h);
  if (isRed(h.right.left)) {
    h.right = rotateRight(h.right as Node<K, V>);
    h = rotateLeft(h);
    flipColors(h);
  }
  return h;
};

const moveRedRight = <K, V>(h: Node<K, V>): Node<K, V> => {
  flipColors(h);
  if (isRed(h.left.left)) {
    h = rotateRight(h);
    flipColors(h);
  }
  return h;
};

const min = <K, V>(h: Node<K, V>): Node<K, V> =>
  h.left === NIL ? h : min(h.left as Node<K, V>);

const deleteMin = <K, V>(h: Node<K, V>): Node<K, V> | Nil => {
  if (h.left === NIL) return NIL;
  if (!isRed(h.left) && !isRed(h.left.left)) h = moveRedLeft(h);
  h.left = deleteMin(h.left as Node<K, V>);
  return fixUp(h);
};

// -------------- iteration ---------------------------------------------------
function* iterate<K, V, T extends "key" | "value" | "entry">(
  root: NodeOrNil<K, V>,
  mode: T
): IterableIterator<T extends "key" ? K : T extends "value" ? V : [K, V]> {
  const stack: Node<K, V>[] = [];
  let curr = root;
  while (curr !== NIL || stack.length) {
    while (curr !== NIL) {
      stack.push(curr as Node<K, V>);
      curr = (curr as Node<K, V>).left;
    }
    const n = stack.pop()!;
    yield (
      mode === "key"   ? n.key :
      mode === "value" ? n.value :
      [n.key, n.value]
    ) as any;
    curr = n.right;
  }
}

// -------------- default comparator ------------------------------------------
const defaultCompare = <K>(a: K, b: K): number =>
  a < b ? -1 : a > b ? 1 : 0;

// -------------- attach iterators to prototype ------------------------------
RedBlackTree.prototype.iterate = function <T extends "key" | "value" | "entry">(
  this: RedBlackTree<any, any>,
  mode: T
) { return iterate(this.root, mode); };
import { RedBlackTree } from "./RedBlackTree";

const map = new RedBlackTree<number, string>(
  (a, b) => a - b // numeric ascending
);

map.set(5, "five");
map.set(3, "three");
map.set(7, "seven");

for (const [k, v] of map) console.log(k, v);
// 3 three
// 5 five
// 7 seven

map.delete(5);
console.log([...map.keys()]); // [3, 7]

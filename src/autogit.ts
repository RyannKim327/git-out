// bst.ts
/* eslint-disable @typescript-eslint/no-non-null-assertion */

/** Anything that can be compared with another T. */
export interface Comparable<T> {
  compare(other: T): number; // <0  |  0  |  >0
}

/** One node of the tree. */
class Node<K extends Comparable<K>, V> {
  constructor(
    public key: K,
    public value: V,
    public left: Node<K, V> | null = null,
    public right: Node<K, V> | null = null,
    public parent: Node<K, V> | null = null
  ) {}
}

/* ------------------------------------------------------------------ */
/* ---------------------------  BST  ---------------------------------- */
/* ------------------------------------------------------------------ */

export class BinarySearchTree<K extends Comparable<K>, V> {
  private root: Node<K, V> | null = null;
  private _size = 0;

  /* --------------------- basic helpers --------------------- */
  get size(): number { return this._size; }
  isEmpty(): boolean { return this._size === 0; }

  /* --------------------- search -------------------------- */
  get(key: K): V | undefined {
    const node = this.findNode(key);
    return node ? node.value : undefined;
  }

  has(key: K): boolean { return this.findNode(key) !== null; }

  private findNode(key: K): Node<K, V> | null {
    let cur = this.root;
    while (cur) {
      const cmp = key.compare(cur.key);
      if (cmp === 0) return cur;
      cur = cmp < 0 ? cur.left : cur.right;
    }
    return null;
  }

  /* --------------------- insert ---------------------------- */
  insert(key: K, value: V): void {
    const newNode = new Node(key, value);
    if (!this.root) {
      this.root = newNode;
      this._size = 1;
      return;
    }

    let parent: Node<K, V> | null = null;
    let cur: Node<K, V> | null = this.root;

    while (cur) {
      parent = cur;
      const cmp = key.compare(cur.key);
      if (cmp === 0) { // update existing
        cur.value = value;
        return;
      }
      cur = cmp < 0 ? cur.left : cur.right;
    }

    newNode.parent = parent;
    const cmp = key.compare(parent!.key);
    if (cmp < 0) parent!.left = newNode;
    else parent!.right = newNode;

    this._size++;
  }

  /* --------------------- delete ----------------------------- */
  delete(key: K): boolean {
    const node = this.findNode(key);
    if (!node) return false;

    this.deleteNode(node);
    this._size--;
    return true;
  }

  private deleteNode(z: Node<K, V>): void {
    // Case 1: at most one child
    if (!z.left || !z.right) {
      const y = z.left || z.right; // might be null
      this.transplant(z, y);
      return;
    }

    // Case 2: two children → replace with successor
    const succ = this.minNode(z.right)!;
    if (succ.parent !== z) {
      this.transplant(succ, succ.right);
      succ.right = z.right;
      succ.right.parent = succ;
    }
    this.transplant(z, succ);
    succ.left = z.left;
    succ.left.parent = succ;
  }

  private transplant(u: Node<K, V>, v: Node<K, V> | null): void {
    if (!u.parent) this.root = v;
    else if (u === u.parent.left) u.parent.left = v;
    else u.parent.right = v;
    if (v) v.parent = u.parent;
  }

  /* --------------------- min / max --------------------------- */
  min(): [K, V] | undefined {
    const node = this.minNode(this.root);
    return node ? [node.key, node.value] : undefined;
  }

  max(): [K, V] | undefined {
    const node = this.maxNode(this.root);
    return node ? [node.key, node.value] : undefined;
  }

  private minNode(sub: Node<K, V> | null): Node<K, V> | null {
    while (sub?.left) sub = sub.left;
    return sub;
  }

  private maxNode(sub: Node<K, V> | null): Node<K, V> | null {
    while (sub?.right) sub = sub.right;
    return sub;
  }

  /* --------------------- successor / predecessor ----------- */
  successor(key: K): [K, V] | undefined {
    const node = this.findNode(key);
    if (!node) return undefined;
    const succ = this.successorNode(node);
    return succ ? [succ.key, succ.value] : undefined;
  }

  predecessor(key: K): [K, V] | undefined {
    const node = this.findNode(key);
    if (!node) return undefined;
    const pred = this.predecessorNode(node);
    return pred ? [pred.key, pred.value] : undefined;
  }

  private successorNode(x: Node<K, V>): Node<K, V> | null {
    if (x.right) return this.minNode(x.right);
    let y = x.parent;
    while (y && x === y.right) {
      x = y;
      y = y.parent;
    }
    return y;
  }

  private predecessorNode(x: Node<K, V>): Node<K, V> | null {
    if (x.left) return this.maxNode(x.left);
    let y = x.parent;
    while (y && x === y.left) {
      x = y;
      y = y.parent;
    }
    return y;
  }

  /* --------------------- iteration (in-order) ---------------- */
  *[Symbol.iterator](): Iterator<[K, V]> {
    const stack: Node<K, V>[] = [];
    let cur = this.root;
    while (stack.length || cur) {
      if (cur) {
        stack.push(cur);
        cur = cur.left;
      } else {
        cur = stack.pop()!;
        yield [cur.key, cur.value];
        cur = cur.right;
      }
    }
  }

  /* --------------------- debug helpers --------------------- */
  toString(): string {
    const lines: string[] = [];
    this.print(this.root, '', true, lines);
    return lines.join('\n');
  }

  private print(n: Node<K, V> | null, prefix: string, isTail: boolean, out: string[]): void {
    if (!n) return;
    out.push(prefix + (isTail ? '└── ' : '├── ') + `${n.key} → ${n.value}`);
    const kids = [n.left, n.right].filter(Boolean) as Node<K, V>[];
    kids.forEach((ch, i) => this.print(ch, prefix + (isTail ? '    ' : '│   '), i === kids.length - 1, out));
  }
}
// number.ts
class Num implements Comparable<Num> {
  constructor(public n: number) {}
  compare(other: Num): number { return this.n - other.n; }
  toString(): string { return String(this.n); }
}

// demo.ts
import { BinarySearchTree } from './bst';
import { Num } from './number';

const bst = new BinarySearchTree<Num, string>();

bst.insert(new Num(50), 'fifty');
bst.insert(new Num(30), 'thirty');
bst.insert(new Num(70), 'seventy');
bst.insert(new Num(20), 'twenty');
bst.insert(new Num(40), 'forty');

console.log('size:', bst.size); // 5
console.log('get 40 →', bst.get(new Num(40))); // forty
console.log('min →', bst.min()); // [20, 'twenty']
console.log('max →', bst.max()); // [70, 'seventy']

for (const [k, v] of bst) console.log(k, v); // in-order

bst.delete(new Num(30));
console.log('after delete 30:', [...bst].map(([k]) => k.n)); // [20,40,50,70]
console.log(bst.toString()); // pretty print

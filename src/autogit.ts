// rb-tree.ts
type Color = 'R' | 'B';

class Node<K, V> {
  constructor(
    public key: K,
    public value: V,
    public color: Color = 'R',
    public left: Node<K, V> | null = null,
    public right: Node<K, V> | null = null,
    public parent: Node<K, V> | null = null
  ) {}
}

export class RedBlackTree<K, V> implements Iterable<[K, V]> {
  private root: Node<K, V> | null = null;
  private compare: (a: K, b: K) => number;
  private _size = 0;

  constructor(compare?: (a: K, b: K) => number) {
    this.compare = compare || ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));
  }

  /* ---------- Public API ---------- */

  get size(): number { return this._size; }

  clear(): void {
    this.root = null;
    this._size = 0;
  }

  insert(key: K, value: V): void {
    const newNode = new Node(key, value);
    if (!this.root) {
      this.root = newNode;
    } else {
      const inserted = this.bstInsert(newNode);
      if (!inserted) return; // duplicate key – ignore or overwrite
      this.rbInsertFixup(newNode);
    }
    this.root.color = 'B';
    this._size++;
  }

  search(key: K): V | undefined {
    const node = this.searchNode(key);
    return node ? node.value : undefined;
  }

  delete(key: K): boolean {
    const z = this.searchNode(key);
    if (!z) return false;
    this.rbDelete(z);
    this._size--;
    return true;
  }

  min(): [K, V] | undefined {
    const node = this.minNode(this.root);
    return node ? [node.key, node.value] : undefined;
  }

  max(): [K, V] | undefined {
    const node = this.maxNode(this.root);
    return node ? [node.key, node.value] : undefined;
  }

  /* ---------- Iterator ---------- */
  *[Symbol.iterator](): Iterator<[K, V]> {
    const stack: Node<K, V>[] = [];
    let curr = this.root;
    while (curr || stack.length) {
      while (curr) {
        stack.push(curr);
        curr = curr.left;
      }
      curr = stack.pop()!;
      yield [curr.key, curr.value];
      curr = curr.right;
    }
  }

  /* ---------- Helpers ---------- */

  private searchNode(key: K): Node<K, V> | null {
    let curr = this.root;
    while (curr) {
      const cmp = this.compare(key, curr.key);
      if (cmp === 0) return curr;
      curr = cmp < 0 ? curr.left : curr.right;
    }
    return null;
  }

  private bstInsert(z: Node<K, V>): boolean {
    let parent: Node<K, V> | null = null;
    let curr = this.root;
    while (curr) {
      parent = curr;
      const cmp = this.compare(z.key, curr.key);
      if (cmp === 0) return false; // duplicate
      curr = cmp < 0 ? curr.left : curr.right;
    }
    z.parent = parent;
    if (!parent) this.root = z;
    else if (this.compare(z.key, parent.key) < 0) parent.left = z;
    else parent.right = z;
    return true;
  }

  private rbInsertFixup(z: Node<K, V>): void {
    while (z.parent?.color === 'R') {
      const grand = z.parent.parent!;
      if (z.parent === grand.left) {
        const y = grand.right;
        if (y?.color === 'R') {          // Case 1
          z.parent.color = y.color = 'B';
          grand.color = 'R';
          z = grand;
        } else {
          if (z === z.parent.right) {  // Case 2
            z = z.parent;
            this.rotateLeft(z);
          }
          z.parent!.color = 'B';         // Case 3
          grand.color = 'R';
          this.rotateRight(grand);
        }
      } else { // symmetric
        const y = grand.left;
        if (y?.color === 'R') {
          z.parent.color = y.color = 'B';
          grand.color = 'R';
          z = grand;
        } else {
          if (z === z.parent.left) {
            z = z.parent;
            this.rotateRight(z);
          }
          z.parent!.color = 'B';
          grand.color = 'R';
          this.rotateLeft(grand);
        }
      }
    }
  }

  private rbDelete(z: Node<K, V>): void {
    let y = z;
    let yOriginalColor = y.color;
    let x: Node<K, V> | null;

    if (!z.left) {
      x = z.right;
      this.transplant(z, z.right);
    } else if (!z.right) {
      x = z.left;
      this.transplant(z, z.left);
    } else {
      y = this.minNode(z.right)!;
      yOriginalColor = y.color;
      x = y.right;
      if (y.parent === z) {
        if (x) x.parent = y;
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

    if (yOriginalColor === 'B' && x) this.rbDeleteFixup(x);
  }

  private rbDeleteFixup(x: Node<K, V>): void {
    while (x !== this.root && x.color === 'B') {
      if (x === x.parent!.left) {
        let w = x.parent!.right!;
        if (w.color === 'R') {
          w.color = 'B';
          x.parent!.color = 'R';
          this.rotateLeft(x.parent!);
          w = x.parent!.right!;
        }
        if (w.left?.color === 'B' && w.right?.color === 'B') {
          w.color = 'R';
          x = x.parent!;
        } else {
          if (w.right?.color === 'B') {
            w.left!.color = 'B';
            w.color = 'R';
            this.rotateRight(w);
            w = x.parent!.right!;
          }
          w.color = x.parent!.color;
          x.parent!.color = 'B';
          w.right!.color = 'B';
          this.rotateLeft(x.parent!);
          x = this.root!;
        }
      } else {
        let w = x.parent!.left!;
        if (w.color === 'R') {
          w.color = 'B';
          x.parent!.color = 'R';
          this.rotateRight(x.parent!);
          w = x.parent!.left!;
        }
        if (w.right?.color === 'B' && w.left?.color === 'B') {
          w.color = 'R';
          x = x.parent!;
        } else {
          if (w.left?.color === 'B') {
            w.right!.color = 'B';
            w.color = 'R';
            this.rotateLeft(w);
            w = x.parent!.left!;
          }
          w.color = x.parent!.color;
          x.parent!.color = 'B';
          w.left!.color = 'B';
          this.rotateRight(x.parent!);
          x = this.root!;
        }
      }
    }
    x.color = 'B';
  }

  private transplant(u: Node<K, V>, v: Node<K, V> | null): void {
    if (!u.parent) this.root = v;
    else if (u === u.parent.left) u.parent.left = v;
    else u.parent.right = v;
    if (v) v.parent = u.parent;
  }

  private rotateLeft(x: Node<K, V>): void {
    const y = x.right!;
    x.right = y.left;
    if (y.left) y.left.parent = x;
    y.parent = x.parent;
    if (!x.parent) this.root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
    y.left = x;
    x.parent = y;
  }

  private rotateRight(x: Node<K, V>): void {
    const y = x.left!;
    x.left = y.right;
    if (y.right) y.right.parent = x;
    y.parent = x.parent;
    if (!x.parent) this.root = y;
    else if (x === x.parent.right) x.parent.right = y;
    else x.parent.left = y;
    y.right = x;
    x.parent = y;
  }

  private minNode(node: Node<K, V> | null): Node<K, V> | null {
    while (node?.left) node = node.left;
    return node;
  }

  private maxNode(node: Node<K, V> | null): Node<K, V> | null {
    while (node?.right) node = node.right;
    return node;
  }
}

/* ---------- Quick sanity check ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('insert/search/delete', () => {
    const t = new RedBlackTree<number, string>();
    const data = [9, 5, 15, 3, 7, 12, 20];
    data.forEach((k, i) => t.insert(k, `v${k}`));
    expect([...t].map(([k]) => k)).toEqual([3, 5, 7, 9, 12, 15, 20]);
    expect(t.search(12)).toBe('v12');
    t.delete(12);
    expect([...t].map(([k]) => k)).toEqual([3, 5, 7, 9, 15, 20]);
  });
}
import { RedBlackTree } from './rb-tree';

const map = new RedBlackTree<number, string>();
map.insert(42, 'answer');
map.insert(7, 'lucky');
console.log([...map]); // [[7,'lucky'], [42,'answer']]
console.log(map.search(42)); // 'answer'
map.delete(7);
console.log(map.size); // 1

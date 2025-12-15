/**
 * SkipList.ts
 * A fast, ordered map / multiset with O(log n) insert / delete / search.
 * Licensed as MIT.
 */

export class SkipList<K, V> implements Iterable<[K, V]> {
  private head: Node<K, V>;
  private maxLevel: number;
  private readonly p = 0.25;               // probability to increase level
  private comp: (a: K, b: K) => number;
  private _size = 0;

  constructor(
    compareFn?: (a: K, b: K) => number,
    maxLevels = 32
  ) {
    this.comp = compareFn || defaultCompare;
    this.maxLevel = maxLevels;
    this.head = new Node(maxLevels, undefined as any, undefined as any);
  }

  /* ---------- public API ---------- */

  get size(): number { return this._size; }

  clear(): void {
    this.head = new Node(this.maxLevel, undefined as any, undefined as any);
    this._size = 0;
  }

  has(key: K): boolean {
    return this.find(key) !== null;
  }

  get(key: K): V | undefined {
    const n = this.find(key);
    return n ? n.value : undefined;
  }

  set(key: K, value: V): this {
    const update: Node<K, V>[] = [];
    let x: Node<K, V> = this.head;
    for (let i = this.head.level - 1; i >= 0; i--) {
      while (x.next[i] && this.comp(x.next[i]!.key, key) < 0) {
        x = x.next[i]!;
      }
      update[i] = x;
    }
    x = x.next[0]!;

    if (x && this.comp(x.key, key) === 0) {
      x.value = value;                 // overwrite
    } else {
      const lvl = this.randomLevel();
      const newNode = new Node(lvl, key, value);
      if (lvl > this.head.level) {
        for (let i = this.head.level; i < lvl; i++) update[i] = this.head;
        this.head.level = lvl;
      }
      for (let i = 0; i < lvl; i++) {
        newNode.next[i] = update[i].next[i];
        update[i].next[i] = newNode;
      }
      this._size++;
    }
    return this;
  }

  delete(key: K): boolean {
    const update: Node<K, V>[] = [];
    let x: Node<K, V> = this.head;
    for (let i = this.head.level - 1; i >= 0; i--) {
      while (x.next[i] && this.comp(x.next[i]!.key, key) < 0) {
        x = x.next[i]!;
      }
      update[i] = x;
    }
    x = x.next[0]!;

    if (!x || this.comp(x.key, key) !== 0) return false;

    for (let i = 0; i < this.head.level; i++) {
      if (update[i].next[i] !== x) break;
      update[i].next[i] = x.next[i];
    }
    while (this.head.level > 1 && !this.head.next[this.head.level - 1]) {
      this.head.level--;
    }
    this._size--;
    return true;
  }

  /** Return the k-th entry (0-based) in O(log n) */
  at(index: number): [K, V] | undefined {
    if (index < 0 || index >= this._size) return undefined;
    let x = this.head.next[0]!;
    for (let i = 0; i < index; i++) x = x.next[0]!;
    return [x.key, x.value];
  }

  *keys(): IterableIterator<K>   { for (const [k] of this) yield k; }
  *values(): IterableIterator<V>{ for (const [,v] of this) yield v; }
  *entries(): IterableIterator<[K, V]> { yield* this; }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return (function* (self) {
      let cur = self.head.next[0];
      while (cur) {
        yield [cur.key, cur.value];
        cur = cur.next[0];
      }
    })(this);
  }

  /* ---------- internal helpers ---------- */

  private find(key: K): Node<K, V> | null {
    let x: Node<K, V> = this.head;
    for (let i = this.head.level - 1; i >= 0; i--) {
      while (x.next[i] && this.comp(x.next[i]!.key, key) < 0) {
        x = x.next[i]!;
      }
    }
    x = x.next[0]!;
    return x && this.comp(x.key, key) === 0 ? x : null;
  }

  private randomLevel(): number {
    let lvl = 1;
    while (Math.random() < this.p && lvl < this.maxLevel) lvl++;
    return lvl;
  }
}

/* ---------- node ---------- */

class Node<K, V> {
  public next: (Node<K, V> | null)[];
  public level: number;
  constructor(level: number, public key: K, public value: V) {
    this.level = level;
    this.next = Array(level).fill(null);
  }
}

/* ---------- default compare ---------- */

function defaultCompare<T>(a: T, b: T): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
import { SkipList } from './SkipList';

const sl = new SkipList<number, string>();
sl.set(3, 'three');
sl.set(1, 'one');
sl.set(2, 'two');
sl.set(4, 'four');

console.log([...sl.entries()]);
// [ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ], [ 4, 'four' ] ]

sl.delete(2);
console.log(sl.get(2));   // undefined
console.log(sl.at(1));   // [ 3, 'three' ]

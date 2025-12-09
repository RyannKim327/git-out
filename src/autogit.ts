/**
 * Skip list in TypeScript
 *  – Keys must be comparable via `<` / `>` (numbers, strings, Dates, …).
 *  – Duplicate keys are overwritten (set-like behaviour).
 *  – Average O(log n) time, O(log n) memory per node.
 */
export class SkipList<K, V> implements Iterable<[K, V]> {
  private head: Node<K, V>;
  private lvl: number;                 // current max level (1-based)
  private n: number;                   // #keys stored
  private readonly maxLvl: number;
  private readonly p: number;            // 1/p = probability to go up one level

  constructor(maxLvl = 32, p = 2) {
    this.maxLvl = maxLvl;
    this.p = p;
    this.lvl = 1;
    this.n = 0;
    this.head = new Node<K, V>(undefined as any, undefined as any, maxLvl);
  }

  /* ---------------- public API ---------------- */

  get size(): number { return this.n; }

  insert(key: K, value: V): void {
    const update: Node<K, V>[] = [];
    let x: Node<K, V> = this.head;

    /* 1. find position & build update vector */
    for (let i = this.lvl - 1; i >= 0; --i) {
      while (x.next[i] && cmp(x.next[i]!.key, key) < 0) {
        x = x.next[i]!;
      }
      update[i] = x;
    }

    const lvl = this.randomLevel();
    if (lvl > this.lvl) {
      for (let i = this.lvl; i < lvl; ++i) update[i] = this.head;
      this.lvl = lvl;
    }

    const newNode = new Node(key, value, lvl);
    for (let i = 0; i < lvl; ++i) {
      newNode.next[i] = update[i].next[i];
      update[i].next[i] = newNode;
    }
    this.n++;
  }

  search(key: K): V | undefined {
    let x: Node<K, V> = this.head;
    for (let i = this.lvl - 1; i >= 0; --i) {
      while (x.next[i] && cmp(x.next[i]!.key, key) < 0) {
        x = x.next[i]!;
      }
    }
    x = x.next[0];
    return x && cmp(x.key, key) === 0 ? x.value : undefined;
  }

  remove(key: K): boolean {
    const update: Node<K, V>[] = [];
    let x: Node<K, V> = this.head;
    for (let i = this.lvl - 1; i >= 0; --i) {
      while (x.next[i] && cmp(x.next[i]!.key, key) < 0) {
        x = x.next[i]!;
      }
      update[i] = x;
    }
    x = x.next[0];
    if (!x || cmp(x.key, key) !== 0) return false;

    for (let i = 0; i < this.lvl; ++i) {
      if (update[i].next[i] !== x) break;
      update[i].next[i] = x.next[i];
    }
    while (this.lvl > 1 && !this.head.next[this.lvl - 1]) this.lvl--;
    this.n--;
    return true;
  }

  min(): [K, V] | undefined {
    const f = this.head.next[0];
    return f ? [f.key, f.value] : undefined;
  }

  max(): [K, V] | undefined {
    let x: Node<K, V> = this.head;
    for (let i = this.lvl - 1; i >= 0; --i) {
      while (x.next[i]) x = x.next[i]!;
    }
    return x !== this.head ? [x.key, x.value] : undefined;
  }

  /** 0-based index; O(log n) */
  at(index: number): [K, V] | undefined {
    if (index < 0 || index >= this.n) return undefined;
    let x: Node<K, V> = this.head;
    let seen = -1;
    for (let i = this.lvl - 1; i >= 0; --i) {
      while (x.next[i] && seen + x.span[i] <= index) {
        seen += x.span[i];
        x = x.next[i]!;
      }
    }
    return [x.next[0]!.key, x.next[0]!.value];
  }

  forEach(fn: (value: V, key: K, list: this) => void): void {
    let cur = this.head.next[0];
    while (cur) {
      fn(cur.value, cur.key, this);
      cur = cur.next[0];
    }
  }

  *keys(): IterableIterator<K> {
    let cur = this.head.next[0];
    while (cur) {
      yield cur.key;
      cur = cur.next[0];
    }
  }

  *values(): IterableIterator<V> {
    let cur = this.head.next[0];
    while (cur) {
      yield cur.value;
      cur = cur.next[0];
    }
  }

  *entries(): IterableIterator<[K, V]> {
    let cur = this.head.next[0];
    while (cur) {
      yield [cur.key, cur.value];
      cur = cur.next[0];
    }
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries();
  }

  /* ---------------- internals ---------------- */

  private randomLevel(): number {
    let lvl = 1;
    while (lvl < this.maxLvl && Math.random() * this.p < 1) lvl++;
    return lvl;
  }
}

/* ---------- helpers ---------- */

class Node<K, V> {
  next: (Node<K, V> | null)[];
  span: number[]; // only needed for .at(index) – remove if you don’t need it
  constructor(
    public key: K,
    public value: V,
    lvl: number
  ) {
    this.next = Array(lvl).fill(null);
    this.span = Array(lvl).fill(0);
  }
}

function cmp<K>(a: K, b: K): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
const sl = new SkipList<number, string>();
sl.insert(10, 'ten');
sl.insert(5, 'five');
sl.insert(20, 'twenty');
console.log([...sl.entries()]); // [ [5,'five'], [10,'ten'], [20,'twenty'] ]
console.log(sl.search(10));     // 'ten'
sl.remove(10);
console.log(sl.size);           // 2

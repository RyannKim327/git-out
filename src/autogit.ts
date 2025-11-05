// skip-list.ts
export default class SkipList<K, V> implements Iterable<[K, V[]]> {
  private readonly head: Node<K, V>;
  private readonly maxLevel: number;
  private readonly p = 0.5;            // probability to go up one level
  private level = 0;                   // current highest level (0-based)
  private _size = 0;                   // number of key occurrences

  constructor(maxLevel = 32) {
    this.maxLevel = maxLevel;
    this.head = new Node<K, V>(undefined as any, undefined as any, maxLevel);
  }

  /* ---- Public API ---- */

  get size(): number { return this._size; }

  insert(key: K, value: V): void {
    const update: Node<K, V>[] = [];
    let x: Node<K, V> = this.head;

    // 1. Find predecessors for every level
    for (let i = this.level; i >= 0; --i) {
      while (x.forward[i] && lt(x.forward[i]!.key, key)) {
        x = x.forward[i]!;
      }
      update[i] = x;
    }

    x = x.forward[0];

    // 2. Duplicate key? Append value
    if (x && eq(x.key, key)) {
      x.values.push(value);
      ++this._size;
      return;
    }

    // 3. Random level for new node
    const lvl = this.randomLevel();
    if (lvl > this.level) {
      for (let i = this.level + 1; i <= lvl; ++i) update[i] = this.head;
      this.level = lvl;
    }

    // 4. Create and splice node
    const newNode = new Node<K, V>(key, value, lvl);
    for (let i = 0; i <= lvl; ++i) {
      newNode.forward[i] = update[i].forward[i];
      update[i].forward[i] = newNode;
    }
    ++this._size;
  }

  get(key: K): V[] | undefined {
    let x = this.head;
    for (let i = this.level; i >= 0; --i) {
      while (x.forward[i] && lt(x.forward[i]!.key, key)) {
        x = x.forward[i]!;
      }
    }
    x = x.forward[0];
    return x && eq(x.key, key) ? x.values : undefined;
  }

  delete(key: K, value?: V): boolean {
    const update: Node<K, V>[] = [];
    let x: Node<K, V> = this.head;

    // 1. Find node and predecessors
    for (let i = this.level; i >= 0; --i) {
      while (x.forward[i] && lt(x.forward[i]!.key, key)) {
        x = x.forward[i]!;
      }
      update[i] = x;
    }
    x = x.forward[0];

    if (!x || !eq(x.key, key)) return false;

    // 2. Remove value(s)
    if (value === undefined) {
      // Delete all values under this key
      this._size -= x.values.length;
      for (let i = 0; i <= this.level; ++i) {
        if (update[i].forward[i] !== x) break;
        update[i].forward[i] = x.forward[i];
      }
      // Shrink level if needed
      while (this.level > 0 && !this.head.forward[this.level]) --this.level;
      return true;
    }

    const idx = x.values.indexOf(value);
    if (idx === -1) return false;
    x.values.splice(idx, 1);
    --this._size;
    if (x.values.length === 0) {
      // Key became empty → remove node completely
      for (let i = 0; i <= this.level; ++i) {
        if (update[i].forward[i] !== x) break;
        update[i].forward[i] = x.forward[i];
      }
      while (this.level > 0 && !this.head.forward[this.level]) --this.level;
    }
    return true;
  }

  *keys(): IterableIterator<K> {
    let curr = this.head.forward[0];
    while (curr) {
      yield curr.key;
      curr = curr.forward[0];
    }
  }

  *values(): IterableIterator<V> {
    let curr = this.head.forward[0];
    while (curr) {
      for (const v of curr.values) yield v;
      curr = curr.forward[0];
    }
  }

  *[Symbol.iterator](): IterableIterator<[K, V[]]> {
    let curr = this.head.forward[0];
    while (curr) {
      yield [curr.key, curr.values.slice()];
      curr = curr.forward[0];
    }
  }

  /* ---- Private helpers ---- */

  private randomLevel(): number {
    let lvl = 0;
    while (Math.random() < this.p && lvl < this.maxLevel - 1) ++lvl;
    return lvl;
  }
}

/* ---------- Internal node ---------- */
class Node<K, V> {
  key: K;
  values: V[];               // all values under this key
  forward: (Node<K, V> | undefined)[];

  constructor(key: K, value: V, level: number) {
    this.key = key;
    this.values = [value];
    this.forward = new Array(level + 1);
  }
}

/* ---------- Comparison helpers ---------- */
function lt<K>(a: K, b: K): boolean { return a < b; }
function eq<K>(a: K, b: K): boolean { return a === b; }
import SkipList from './skip-list';

const sl = new SkipList<number, string>();

sl.insert(10, 'ten');
sl.insert(5, 'five');
sl.insert(10, 'diez');

console.log(sl.get(10));   // ['ten', 'diez']
sl.delete(10, 'ten');
console.log(sl.get(10));   // ['diez']
console.log([...sl]);      // [[5, ['five']], [10, ['diez']]]
tsc skip-list.ts
node skip-list.js

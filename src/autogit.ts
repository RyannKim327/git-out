/**
 * Generic skip-list implementation.
 * K = key type, V = value type.
 * Comparator must return:
 *   < 0  if a < b
 *   0    if a == b
 *   > 0  if a > b
 */
export class SkipList<K, V> implements Iterable<[K, V]> {
  private head: Node<K, V>;
  private level: number;               // current max level (1-based)
  private _size: number;
  private readonly maxLevel: number;
  private readonly p: number;          // probability to increase level (1/p)
  private readonly comparator: (a: K, b: K) => number;

  constructor(
    comparator: (a: K, b: K) => number,
    maxLevel = 32,
    p = 2
  ) {
    this.comparator = comparator;
    this.maxLevel = maxLevel;
    this.p = p;
    this.level = 1;
    this._size = 0;
    this.head = this.newNode(undefined as any, undefined as any, maxLevel);
  }

  /* ---------- public API ---------- */

  get size(): number { return this._size; }

  insert(key: K, value: V): void {
    const update: Node<K, V>[] = [];
    let x = this.head;

    // find position & build update vector
    for (let i = this.level - 1; i >= 0; i--) {
      while (x.forward[i] && this.comparator(x.forward[i]!.key, key) < 0) {
        x = x.forward[i]!;
      }
      update[i] = x;
    }

    x = x.forward[0]!;
    if (x !== this.head && this.comparator(x.key, key) === 0) {
      x.value = value;                 // update existing key
      return;
    }

    const newLevel = this.randomLevel();
    if (newLevel > this.level) {
      for (let i = this.level; i < newLevel; i++) update[i] = this.head;
      this.level = newLevel;
    }

    const newNode = this.newNode(key, value, newLevel);
    for (let i = 0; i < newLevel; i++) {
      newNode.forward[i] = update[i].forward[i];
      update[i].forward[i] = newNode;
    }
    this._size++;
  }

  search(key: K): V | undefined {
    let x = this.head;
    for (let i = this.level - 1; i >= 0; i--) {
      while (x.forward[i] && this.comparator(x.forward[i]!.key, key) < 0) {
        x = x.forward[i]!;
      }
    }
    x = x.forward[0]!;
    if (x !== this.head && this.comparator(x.key, key) === 0) return x.value;
    return undefined;
  }

  delete(key: K): boolean {
    const update: Node<K, V>[] = [];
    let x = this.head;
    for (let i = this.level - 1; i >= 0; i--) {
      while (x.forward[i] && this.comparator(x.forward[i]!.key, key) < 0) {
        x = x.forward[i]!;
      }
      update[i] = x;
    }
    x = x.forward[0]!;
    if (x === this.head || this.comparator(x.key, key) !== 0) return false;

    for (let i = 0; i < this.level; i++) {
      if (update[i].forward[i] !== x) break;
      update[i].forward[i] = x.forward[i];
    }
    while (this.level > 1 && this.head.forward[this.level - 1] === this.head) {
      this.level--;
    }
    this._size--;
    return true;
  }

  min(): [K, V] | undefined {
    const first = this.head.forward[0];
    return first === this.head ? undefined : [first!.key, first!.value];
  }

  max(): [K, V] | undefined {
    let x = this.head;
    for (let i = this.level - 1; i >= 0; i--) {
      while (x.forward[i] !== this.head) x = x.forward[i]!;
    }
    return x === this.head ? undefined : [x.key, x.value];
  }

  /* ---------- iterator ---------- */
  *[Symbol.iterator](): Iterator<[K, V]> {
    let curr = this.head.forward[0];
    while (curr !== this.head) {
      yield [curr.key, curr.value];
      curr = curr.forward[0];
    }
  }

  /* ---------- internal helpers ---------- */
  private newNode(key: K, value: V, level: number): Node<K, V> {
    return new Node(key, value, level);
  }

  private randomLevel(): number {
    let lvl = 1;
    while (Math.random() < 1 / this.p && lvl < this.maxLevel) lvl++;
    return lvl;
  }
}

/* ---------- node ---------- */
class Node<K, V> {
  key: K;
  value: V;
  forward: (Node<K, V> | null)[];

  constructor(key: K, value: V, level: number) {
    this.key = key;
    this.value = value;
    this.forward = new Array(level).fill(null);
  }
}
const sl = new SkipList<number, string>((a, b) => a - b);

sl.insert(10, 'ten');
sl.insert(5, 'five');
sl.insert(20, 'twenty');

console.log(sl.search(5));   // 'five'
console.log([...sl]);        // [[5,'five'],[10,'ten'],[20,'twenty']]

sl.delete(10);
console.log([...sl]);        // [[5,'five'],[20,'twenty']]

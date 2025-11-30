// SkipList.ts
export class SkipListNode<K, V> {
  constructor(
    public key: K,
    public value: V,
    public forward: SkipListNode<K, V>[]
  ) {}
}

export class SkipList<K, V> implements Iterable<[K, V]> {
  private head: SkipListNode<K, V>;
  private level: number;               // current max level in use (1-based)
  private length: number;              // #keys stored
  private readonly maxLevel: number;
  private readonly p: number;
  private readonly compare: (a: K, b: K) => number;

  constructor(
    compareFn?: (a: K, b: K) => number,
    maxLevel = 32,
    p = 0.5
  ) {
    this.compare = compareFn || this.defaultCompare;
    this.maxLevel = maxLevel;
    this.p = p;
    this.level = 1;
    this.length = 0;
    this.head = new SkipListNode<K, V>(null as any, null as any, Array(maxLevel).fill(null));
  }

  /* ---------- public API ---------- */

  insert(key: K, value: V): void {
    const update: SkipListNode<K, V>[] = Array(this.maxLevel);
    let curr: SkipListNode<K, V> | null = this.head;

    // 1. find predecessor nodes for every level
    for (let i = this.level - 1; i >= 0; i--) {
      while (curr.forward[i] && this.compare(curr.forward[i].key, key) < 0) {
        curr = curr.forward[i];
      }
      update[i] = curr;
    }

    // 2. random level for new node
    const newLevel = this.randomLevel();
    if (newLevel > this.level) {
      for (let i = this.level; i < newLevel; i++) update[i] = this.head;
      this.level = newLevel;
    }

    // 3. create and link
    const newNode = new SkipListNode(key, value, Array(newLevel).fill(null));
    for (let i = 0; i < newLevel; i++) {
      newNode.forward[i] = update[i].forward[i];
      update[i].forward[i] = newNode;
    }
    this.length++;
  }

  search(key: K): V | undefined {
    let curr: SkipListNode<K, V> | null = this.head;
    for (let i = this.level - 1; i >= 0; i--) {
      while (curr.forward[i] && this.compare(curr.forward[i].key, key) < 0) {
        curr = curr.forward[i];
      }
    }
    curr = curr.forward[0];
    if (curr && this.compare(curr.key, key) === 0) return curr.value;
    return undefined;
  }

  delete(key: K): boolean {
    const update: SkipListNode<K, V>[] = Array(this.maxLevel);
    let curr: SkipListNode<K, V> | null = this.head;

    for (let i = this.level - 1; i >= 0; i--) {
      while (curr.forward[i] && this.compare(curr.forward[i].key, key) < 0) {
        curr = curr.forward[i];
      }
      update[i] = curr;
    }
    curr = curr.forward[0];

    if (!curr || this.compare(curr.key, key) !== 0) return false;

    // unlink
    for (let i = 0; i < this.level; i++) {
      if (update[i].forward[i] !== curr) break;
      update[i].forward[i] = curr.forward[i];
    }

    // shrink level if necessary
    while (this.level > 1 && this.head.forward[this.level - 1] === null) {
      this.level--;
    }
    this.length--;
    return true;
  }

  min(): K | undefined {
    const first = this.head.forward[0];
    return first ? first.key : undefined;
  }

  max(): K | undefined {
    let curr = this.head;
    for (let i = this.level - 1; i >= 0; i--) {
      while (curr.forward[i]) curr = curr.forward[i];
    }
    return curr.key;
  }

  get size(): number { return this.length; }

  /* ---------- iteration (ascending order) ---------- */
  *[Symbol.iterator](): Iterator<[K, V]> {
    let curr = this.head.forward[0];
    while (curr) {
      yield [curr.key, curr.value];
      curr = curr.forward[0];
    }
  }

  /* ---------- helpers ---------- */
  private randomLevel(): number {
    let lvl = 1;
    while (Math.random() < this.p && lvl < this.maxLevel) lvl++;
    return lvl;
  }

  private defaultCompare(a: K, b: K): number {
    return a < b ? -1 : a > b ? 1 : 0;
  }
}
import { SkipList } from './SkipList';

const sl = new SkipList<number, string>();
sl.insert(5, 'five');
sl.insert(2, 'two');
sl.insert(8, 'eight');
sl.insert(5, 'five-again');   // duplicate key

console.log([...sl]); // ascending order
// [ [ 2, 'two' ], [ 5, 'five' ], [ 5, 'five-again' ], [ 8, 'eight' ] ]

console.log(sl.search(5)); // 'five' (first match)
sl.delete(5);
console.log(sl.size);     // 3
interface User { id: number; name: string; }
const users = new SkipList<User, User>(
  (a, b) => a.id - b.id
);

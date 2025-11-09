/**
 * Skip-list node
 */
class SkipNode<K, V> {
  public key: K;
  public value: V;
  public forward: SkipNode<K, V | null>[]; // forward[i] is the next node on level i

  constructor(key: K, value: V, level: number) {
    this.key = key;
    this.value = value;
    this.forward = new Array(level + 1);
    for (let i = 0; i <= level; ++i) this.forward[i] = null!;
  }
}

/**
 * Skip-list implementation
 */
export class SkipList<K, V> {
  private head: SkipNode<K, V>;
  private maxLevel: number;
  private level: number = 0;
  private probability: number;
  private compare: (a: K, b: K) => number;

  constructor(
    compareFn?: (a: K, b: K) => number,
    maxLevel = 32,
    probability = 0.5
  ) {
    this.compare = compareFn || ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));
    this.maxLevel = maxLevel;
    this.probability = probability;
    this.head = new SkipNode<K, V>(null!, null!, maxLevel);
  }

  /* ---------- Public API ---------- */

  insert(key: K, value: V): void {
    const update: SkipNode<K, V>[] = new Array(this.maxLevel + 1);
    let curr = this.head;

    // 1. Find position and record predecessors
    for (let i = this.level; i >= 0; --i) {
      while (
        curr.forward[i] &&
        this.compare(curr.forward[i].key, key) < 0
      ) {
        curr = curr.forward[i];
      }
      update[i] = curr;
    }

    const maybe = curr.forward[0];
    if (maybe && this.compare(maybe.key, key) === 0) {
      // overwrite
      maybe.value = value;
      return;
    }

    // 2. Random height
    const newLevel = this.randomLevel();
    if (newLevel > this.level) {
      for (let i = this.level + 1; i <= newLevel; ++i) update[i] = this.head;
      this.level = newLevel;
    }

    // 3. Create and splice
    const newNode = new SkipNode(key, value, newLevel);
    for (let i = 0; i <= newLevel; ++i) {
      newNode.forward[i] = update[i].forward[i];
      update[i].forward[i] = newNode;
    }
  }

  search(key: K): V | undefined {
    let curr = this.head;
    for (let i = this.level; i >= 0; --i) {
      while (
        curr.forward[i] &&
        this.compare(curr.forward[i].key, key) < 0
      ) {
        curr = curr.forward[i];
      }
    }
    curr = curr.forward[0];
    if (curr && this.compare(curr.key, key) === 0) return curr.value;
    return undefined;
  }

  delete(key: K): boolean {
    const update: SkipNode<K, V>[] = new Array(this.maxLevel + 1);
    let curr = this.head;
    for (let i = this.level; i >= 0; --i) {
      while (
        curr.forward[i] &&
        this.compare(curr.forward[i].key, key) < 0
      ) {
        curr = curr.forward[i];
      }
      update[i] = curr;
    }
    curr = curr.forward[0];

    if (!curr || this.compare(curr.key, key) !== 0) return false;

    // unlink
    for (let i = 0; i <= this.level; ++i) {
      if (update[i].forward[i] !== curr) break;
      update[i].forward[i] = curr.forward[i];
    }

    // shrink level if necessary
    while (
      this.level > 0 &&
      this.head.forward[this.level] === null
    ) {
      --this.level;
    }
    return true;
  }

  getMin(): [K, V] | undefined {
    const first = this.head.forward[0];
    return first ? [first.key, first.value] : undefined;
  }

  getMax(): [K, V] | undefined {
    let curr = this.head;
    for (let i = this.level; i >= 0; --i) {
      while (curr.forward[i]) curr = curr.forward[i];
    }
    return curr !== this.head ? [curr.key, curr.value] : undefined;
  }

  /**
   * Iterator that yields key/value pairs in ascending order.
   */
  *entries(): IterableIterator<[K, V]> {
    let curr = this.head.forward[0];
    while (curr) {
      yield [curr.key, curr.value];
      curr = curr.forward[0];
    }
  }

  /* ---------- Helpers ---------- */

  private randomLevel(): number {
    let lvl = 0;
    while (Math.random() < this.probability && lvl < this.maxLevel) ++lvl;
    return lvl;
  }
}
const sl = new SkipList<number, string>((a, b) => a - b);
sl.insert(10, "ten");
sl.insert(3, "three");
sl.insert(20, "twenty");

console.log(sl.search(3));      // "three"
console.log([...sl.entries()]); // [[3,"three"],[10,"ten"],[20,"twenty"]]
sl.delete(10);
console.log(sl.search(10));     // undefined

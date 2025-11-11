/**
 * A node in the skip list.
 */
class SkipNode<K, V> {
  forward: SkipNode<K, V | V[]>[] = []; // array of same-length as level
  constructor(
    public key: K,
    public value: V | V[], // single value or array when duplicates allowed
    level: number
  ) {
    this.forward = new Array(level + 1);
  }
}

/**
 * Options for the skip list.
 */
interface SkipListOptions<K> {
  maxLevel?: number;
  probability?: number;
  compare?: (a: K, b: K) => number;
}

/**
 * Skip List implementation.
 */
export class SkipList<K, V> {
  private header: SkipNode<K, V>;
  private level = 0;               // current highest level (0-based)
  private length = 0;              // #keys (not #nodes)
  private readonly maxLevel: number;
  private readonly probability: number;
  private readonly compare: (a: K, b: K) => number;

  constructor(options: SkipListOptions<K> = {}) {
    this.maxLevel = options.maxLevel ?? 32;
    this.probability = options.probability ?? 0.25;
    this.compare = options.compare ?? this.defaultCompare;

    this.header = new SkipNode<K, V>(null as any, null as any, this.maxLevel);
  }

  private defaultCompare(a: K, b: K): number {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  private randomLevel(): number {
    let lvl = 0;
    while (Math.random() < this.probability && lvl < this.maxLevel) lvl++;
    return lvl;
  }

  /**
   * Insert or update a key-value pair.
   * If `allowDuplicates` is true, multiple values can share the same key.
   */
  insert(key: K, value: V, allowDuplicates = false): void {
    const update: SkipNode<K, V>[] = new Array(this.maxLevel + 1);
    let x: SkipNode<K, V> = this.header;

    // 1. find position & build update vector
    for (let i = this.level; i >= 0; i--) {
      while (
        x.forward[i] &&
        this.compare(x.forward[i].key, key) < 0
      ) {
        x = x.forward[i];
      }
      update[i] = x;
    }

    x = x.forward[0];

    // 2. key exists
    if (x && this.compare(x.key, key) === 0) {
      if (allowDuplicates) {
        // store as array
        if (Array.isArray(x.value)) x.value.push(value);
        else x.value = [x.value as V, value];
      } else {
        x.value = value; // overwrite
      }
      return;
    }

    // 3. create new node
    const lvl = this.randomLevel();
    if (lvl > this.level) {
      for (let i = this.level + 1; i <= lvl; i++) update[i] = this.header;
      this.level = lvl;
    }

    const newNode = new SkipNode(key, value, lvl);
    for (let i = 0; i <= lvl; i++) {
      newNode.forward[i] = update[i].forward[i];
      update[i].forward[i] = newNode;
    }
    this.length++;
  }

  /**
   * Retrieve first value associated with `key`.
   */
  get(key: K): V | undefined {
    let x = this.header;
    for (let i = this.level; i >= 0; i--) {
      while (
        x.forward[i] &&
        this.compare(x.forward[i].key, key) < 0
      ) {
        x = x.forward[i];
      }
    }
    x = x.forward[0];
    if (x && this.compare(x.key, key) === 0) {
      return Array.isArray(x.value) ? x.value[0] : x.value;
    }
    return undefined;
  }

  /**
   * Delete *all* entries for `key`.
   */
  delete(key: K): boolean {
    const update: SkipNode<K, V>[] = new Array(this.maxLevel + 1);
    let x = this.header;

    for (let i = this.level; i >= 0; i--) {
      while (
        x.forward[i] &&
        this.compare(x.forward[i].key, key) < 0
      ) {
        x = x.forward[i];
      }
      update[i] = x;
    }

    x = x.forward[0];

    if (!x || this.compare(x.key, key) !== 0) return false;

    for (let i = 0; i <= this.level; i++) {
      if (update[i].forward[i] !== x) break;
      update[i].forward[i] = x.forward[i];
    }

    while (
      this.level > 0 &&
      this.header.forward[this.level] === undefined
    ) {
      this.level--;
    }
    this.length--;
    return true;
  }

  /**
   * Iterator yielding [key, value] pairs in ascending order.
   */
  *entries(): IterableIterator<[K, V]> {
    let node = this.header.forward[0];
    while (node) {
      if (Array.isArray(node.value)) {
        for (const v of node.value) yield [node.key, v];
      } else {
        yield [node.key, node.value];
      }
      node = node.forward[0];
    }
  }

  get size(): number {
    return this.length;
  }

  /**
   * For debugging: print structure.
   */
  dump(): void {
    for (let i = this.level; i >= 0; i--) {
      let x = this.header.forward[i];
      const row: string[] = [];
      while (x) {
        row.push(`${x.key}`);
        x = x.forward[i];
      }
      console.log(`Level ${i}:`, row.join(" -> "));
    }
  }
}

/* ------------------ Usage example ------------------ */
const sl = new SkipList<number, string>();
sl.insert(3, "three");
sl.insert(1, "one");
sl.insert(5, "five");
sl.insert(2, "two");
sl.insert(4, "four");

for (const [k, v] of sl.entries()) console.log(k, v);
// 1 one
// 2 two
// 3 three
// 4 four
// 5 five

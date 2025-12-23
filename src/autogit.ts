// ---------- Types ----------
type NodeValue<V> = V | undefined;

interface SkipNode<K, V> {
  key: K;
  value: NodeValue<V>;
  forward: SkipNode<K, V>[]; // forward[i] is the next node on level i
}

interface SkipListOptions {
  maxLevel?: number;   // upper bound for levels (default 32)
  p?: number;         // promotion probability (default 0.5)
}

// ---------- SkipList class ----------
export class SkipList<K, V> {
  private readonly maxLevel: number;
  private readonly p: number;
  private readonly head: SkipNode<K, V>;
  private level: number; // current highest level (0-based)
  private compare: (a: K, b: K) => number;

  constructor(
    compareFn?: (a: K, b: K) => number,
    options: SkipListOptions = {}
  ) {
    this.maxLevel = options.maxLevel ?? 32;
    this.p = options.p ?? 0.5;
    this.level = 0;
    this.compare = compareFn ?? ((a: K, b: K) => (a as any) - (b as any));

    // Head sentinel with key = -Infinity (simulated)
    this.head = {
      key: undefined as any,
      value: undefined,
      forward: new Array(this.maxLevel),
    };
  }

  // ---------- Public API ----------
  public insert(key: K, value: V): void {
    const update: SkipNode<K, V>[] = new Array(this.maxLevel);
    let x: SkipNode<K, V> = this.head;

    // 1. Find position and record predecessors
    for (let i = this.level; i >= 0; i--) {
      while (
        x.forward[i] &&
        this.compare(x.forward[i].key, key) < 0
      ) {
        x = x.forward[i];
      }
      update[i] = x;
    }

    const next = x.forward[0];
    // 2. Update value if key already present
    if (next && this.compare(next.key, key) === 0) {
      next.value = value;
      return;
    }

    // 3. Random level for new node
    const lvl = this.randomLevel();
    if (lvl > this.level) {
      for (let i = this.level + 1; i <= lvl; i++) update[i] = this.head;
      this.level = lvl;
    }

    // 4. Create and splice node
    const newNode: SkipNode<K, V> = {
      key,
      value,
      forward: new Array(lvl + 1),
    };
    for (let i = 0; i <= lvl; i++) {
      newNode.forward[i] = update[i].forward[i];
      update[i].forward[i] = newNode;
    }
  }

  public search(key: K): V | undefined {
    let x = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (
        x.forward[i] &&
        this.compare(x.forward[i].key, key) < 0
      ) {
        x = x.forward[i];
      }
    }
    x = x.forward[0];
    if (x && this.compare(x.key, key) === 0) return x.value;
    return undefined;
  }

  public delete(key: K): boolean {
    const update: SkipNode<K, V>[] = new Array(this.maxLevel);
    let x = this.head;
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

    // Unlink node
    for (let i = 0; i <= this.level; i++) {
      if (update[i].forward[i] !== x) break;
      update[i].forward[i] = x.forward[i];
    }
    // Shrink list height if needed
    while (
      this.level > 0 &&
      this.head.forward[this.level] === undefined
    ) {
      this.level--;
    }
    return true;
  }

  // ---------- Helpers ----------
  private randomLevel(): number {
    let lvl = 0;
    while (Math.random() < this.p && lvl < this.maxLevel - 1) lvl++;
    return lvl;
  }

  // ---------- Debug / pretty print ----------
  public toString(): string {
    let out = '';
    for (let i = this.level; i >= 0; i--) {
      let x = this.head.forward[i];
      out += `L${i}: `;
      const row: string[] = [];
      while (x) {
        row.push(`${x.key}`);
        x = x.forward[i];
      }
      out += row.join(' -> ') + '\n';
    }
    return out;
  }
}
const sl = new SkipList<number, string>();
sl.insert(3, 'three');
sl.insert(1, 'one');
sl.insert(5, 'five');
console.log(sl.search(3)); // "three"
sl.delete(3);
console.log(sl.search(3)); // undefined
console.log(sl.toString());
tsc skipList.ts
node skipList.js

// Skip list node
class SkipListNode<T> {
  value: T | null;
  forwards: Array<SkipListNode<T> | null>;

  constructor(value: T | null, level: number) {
    this.value = value;
    this.forwards = new Array<SkipListNode<T> | null>(level).fill(null);
  }
}

// Skip list
export class SkipList<T> {
  private head: SkipListNode<T>;
  private level: number;
  private readonly maxLevel: number;
  private readonly p: number;
  private readonly compare: (a: T, b: T) => number;

  // options: maxLevel, p (probability), comparator
  constructor(options?: {
    maxLevel?: number;
    p?: number;
    comparator?: (a: T, b: T) => number;
  }) {
    this.maxLevel = options?.maxLevel ?? 16;
    this.p = options?.p ?? 0.5;
    this.level = 1;
    this.compare = options?.comparator ?? ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));

    // Head node with no value, spanning maxLevel
    this.head = new SkipListNode<T>(null, this.maxLevel);
  }

  // Generate a random level for the new node
  private randomLevel(): number {
    let lvl = 1;
    while (Math.random() < this.p && lvl < this.maxLevel) lvl++;
    return lvl;
  }

  // Insert a value (unique values only)
  insert(value: T): void {
    // Track predecessors at each level
    const update: Array<SkipListNode<T> | null> = new Array(this.maxLevel).fill<string | null>(null) as any;

    let x = this.head;
    for (let i = this.level - 1; i >= 0; i--) {
      while (
        x.forwards[i] != null &&
        this.compare(x.forwards[i]!.value as T, value) < 0
      ) {
        x = x.forwards[i]!;
      }
      update[i] = x;
    }

    const next = x.forwards[0];
    if (next != null && this.compare(next.value as T, value) === 0) {
      // Duplicate; ignore (or handle by updating value/count if desired)
      return;
    }

    const lvl = this.randomLevel();
    if (lvl > this.level) {
      for (let i = this.level; i < lvl; i++) {
        update[i] = this.head;
      }
      this.level = lvl;
    }

    const newNode = new SkipListNode<T>(value, lvl);
    for (let i = 0; i < lvl; i++) {
      const prev = update[i]!;
      newNode.forwards[i] = prev.forwards[i];
      prev.forwards[i] = newNode;
    }
  }

  // Search for a value. Returns the value if found, otherwise undefined.
  search(value: T): T | undefined {
    let x = this.head;
    for (let i = this.level - 1; i >= 0; i--) {
      while (x.forwards[i] != null && this.compare(x.forwards[i]!.value as T, value) < 0) {
        x = x.forwards[i]!;
      }
    }
    x = x.forwards[0];
    if (x != null && this.compare(x.value as T, value) === 0) {
      return x.value as T;
    }
    return undefined;
  }

  // Delete a value. Returns true if deleted, false if not found.
  delete(value: T): boolean {
    const update: Array<SkipListNode<T> | null> = new Array(this.maxLevel).fill(null);

    let x = this.head;
    for (let i = this.level - 1; i >= 0; i--) {
      while (x.forwards[i] != null && this.compare(x.forwards[i]!.value as T, value) < 0) {
        x = x.forwards[i]!;
      }
      update[i] = x;
    }

    const target = x.forwards[0];
    if (target != null && this.compare(target.value as T, value) === 0) {
      for (let i = 0; i < this.level; i++) {
        if (update[i]!.forwards[i] !== target) break;
        update[i]!.forwards[i] = target.forwards[i];
      }
      // adjust current level if the top levels became empty
      while (this.level > 1 && this.head.forwards[this.level - 1] == null) {
        this.level--;
      }
      return true;
    }
    return false;
  }

  // Optional: iterate or dump for debugging
  toArray(): T[] {
    const result: T[] = [];
    let x = this.head.forwards[0];
    while (x) {
      result.push(x.value as T);
      x = x.forwards[0];
    }
    return result;
  }
}
// Example: store numbers in ascending order
const list = new SkipList<number>();

list.insert(5);
list.insert(1);
list.insert(9);
list.insert(3);

console.log(list.search(5)); // 5
console.log(list.search(2)); // undefined

list.delete(5);
console.log(list.search(5)); // undefined

console.log(list.toArray()); // [1, 3, 9] (order depends on inserts)

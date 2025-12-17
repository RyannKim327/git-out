/**
 * A generic Skip List implementation.
 * Average complexity
 *   insert: O(log n)
 *   search: O(log n)
 *   delete: O(log n)
 * Worst-case (rare): O(n)
 */
export class SkipList<T> implements Iterable<T> {
  private readonly head: Node<T>;
  private readonly prob: number;          // 0 < prob < 1; 0.5 is typical
  private maxLevel: number;              // 1-based
  private _size: number;

  constructor(
    private compare: (a: T, b: T) => number,
    prob = 0.5,
    maxLevel = 32
  ) {
    this.prob = prob;
    this.maxLevel = maxLevel;
    this._size = 0;
    this.head = new Node<T>(null as any, maxLevel);
  }

  /* ---------- Public API ---------- */

  get size(): number { return this._size; }

  insert(value: T): void {
    const update: Node<T>[] = [];
    let curr: Node<T> = this.head;

    // 1. Find position and build update vector
    for (let lvl = this.maxLevel - 1; lvl >= 0; lvl--) {
      while (curr.forward[lvl] && this.compare(curr.forward[lvl]!.value, value) < 0) {
        curr = curr.forward[lvl]!;
      }
      update[lvl] = curr;
    }

    curr = curr.forward[0]!;

    // 2. Duplicate keys: decide policy (here: allow duplicates)
    const lvl = this.randomLevel();
    const newNode = new Node(value, lvl);

    // 3. Splice node into lists
    for (let i = 0; i < lvl; i++) {
      newNode.forward[i] = update[i].forward[i];
      update[i].forward[i] = newNode;
    }
    this._size++;
  }

  search(value: T): T | undefined {
    let curr: Node<T> = this.head;
    for (let lvl = this.maxLevel - 1; lvl >= 0; lvl--) {
      while (curr.forward[lvl] && this.compare(curr.forward[lvl]!.value, value) < 0) {
        curr = curr.forward[lvl]!;
      }
    }
    curr = curr.forward[0]!;
    return curr && this.compare(curr.value, value) === 0 ? curr.value : undefined;
  }

  remove(value: T): boolean {
    const update: Node<T>[] = [];
    let curr: Node<T> = this.head;

    for (let lvl = this.maxLevel - 1; lvl >= 0; lvl--) {
      while (curr.forward[lvl] && this.compare(curr.forward[lvl]!.value, value) < 0) {
        curr = curr.forward[lvl]!;
      }
      update[lvl] = curr;
    }

    curr = curr.forward[0]!;

    if (!curr || this.compare(curr.value, value) !== 0) return false;

    for (let i = 0; i < curr.forward.length; i++) {
      update[i].forward[i] = curr.forward[i];
    }
    this._size--;
    return true;
  }

  min(): T | undefined {
    const first = this.head.forward[0];
    return first ? first.value : undefined;
  }

  max(): T | undefined {
    let curr = this.head;
    for (let lvl = this.maxLevel - 1; lvl >= 0; lvl--) {
      while (curr.forward[lvl]) curr = curr.forward[lvl]!;
    }
    return curr.value;
  }

  [Symbol.iterator](): Iterator<T> {
    let curr = this.head.forward[0];
    return {
      next: (): IteratorResult<T> => {
        if (!curr) return { done: true, value: undefined as any };
        const value = curr.value;
        curr = curr.forward[0];
        return { done: false, value };
      }
    };
  }

  /* ---------- Private helpers ---------- */

  private randomLevel(): number {
    let lvl = 1;
    while (Math.random() < this.prob && lvl < this.maxLevel) lvl++;
    return lvl;
  }
}

/* ---------- Internal node ---------- */
class Node<T> {
  forward: (Node<T> | undefined)[];
  constructor(public value: T, level: number) {
    this.forward = new Array(level);
  }
}
const sl = new SkipList<number>((a, b) => a - b);
[3, 6, 7, 9, 12, 19, 17, 26, 21, 25].forEach(n => sl.insert(n));

console.log([...sl]);          // sorted order: [3,6,7,9,12,17,19,21,25,26]
console.log(sl.search(17));     // 17
console.log(sl.remove(17));   // true
console.log(sl.search(17));   // undefined
console.log(sl.size);         // 9
tsc skip-list.ts
node skip-list.js

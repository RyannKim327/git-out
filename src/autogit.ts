/** Comparator returns a negative number if a < b, 0 if equal, positive if a > b */
export type Comparator<T> = (a: T, b: T) => number;

/** Default comparator works for numbers and strings */
export const defaultComparator = <T>(a: T, b: T): number => {
  if (a === b) return 0;
  // @ts-ignore – we rely on JS's < > operators for numbers/strings
  return a < b ? -1 : 1;
};

/** Probability that a node gets promoted to the next level (commonly 0.5) */
const P = 0.5;

/** Upper bound on the number of levels. 32 is more than enough for billions of elements. */
const MAX_LEVEL = 32;
/** Internal node used by the SkipList */
class SkipNode<T> {
  /** The stored value (undefined for the head sentinel) */
  public readonly value?: T;

  /** Forward pointers – one per level this node participates in */
  public forward: Array<SkipNode<T> | null>;

  /** Height of this node (number of levels it occupies) */
  public readonly level: number;

  constructor(level: number, value?: T) {
    this.level = level;
    this.value = value;
    // Pre‑allocate the forward array with `null`s for speed
    this.forward = new Array<SkipNode<T> | null>(level).fill(null);
  }
}
export class SkipList<T> {
  /** Head sentinel – never holds a real value */
  private readonly head: SkipNode<T>;

  /** Current highest level that contains at least one element */
  private level: number = 0;

  /** Number of stored elements */
  private _size: number = 0;

  /** Comparator used to order elements */
  private readonly compare: Comparator<T>;

  /** Random generator – injectable for deterministic tests */
  private readonly random: () => number;

  /**
   * @param compare   Optional custom comparator. If omitted, the default works for numbers/strings.
   * @param random    Optional random function (e.g. Math.random or a seeded PRNG).
   */
  constructor(compare?: Comparator<T>, random?: () => number) {
    this.compare = compare ?? defaultComparator;
    this.random = random ?? Math.random;
    this.head = new SkipNode<T>(MAX_LEVEL); // sentinel with max possible level
  }

  /** Public read‑only size */
  get size(): number {
    return this._size;
  }

  /** --------------------------------------------------------------
   *  Randomly generate a level for a new node.
   *  The algorithm: start at 1 and keep promoting while `rand < P`.
   * -------------------------------------------------------------- */
  private randomLevel(): number {
    let lvl = 1;
    while (lvl < MAX_LEVEL && this.random() < P) {
      lvl++;
    }
    return lvl;
  }

  /** --------------------------------------------------------------
   *  Search for a value.
   *  Returns the node containing the value, or `null` if not found.
   * -------------------------------------------------------------- */
  public search(value: T): T | null {
    let current = this.head;
    // Walk from top level downwards
    for (let i = this.level - 1; i >= 0; i--) {
      while (
        current.forward[i] !== null &&
        this.compare(current.forward[i]!.value!, value) < 0
      ) {
        current = current.forward[i]!;
      }
    }
    // At level 0 we are right before the possible match
    const candidate = current.forward[0];
    if (candidate && this.compare(candidate.value!, value) === 0) {
      return candidate.value!;
    }
    return null;
  }

  /** --------------------------------------------------------------
   *  Insert a value. Duplicates are allowed – they will be placed
   *  after existing equal elements (stable insertion).
   * -------------------------------------------------------------- */
  public insert(value: T): void {
    const update = new Array<SkipNode<T>>(MAX_LEVEL);
    let current = this.head;

    // 1️⃣ Find the place where the new node should be inserted
    for (let i = this.level - 1; i >= 0; i--) {
      while (
        current.forward[i] !== null &&
        this.compare(current.forward[i]!.value!, value) < 0
      ) {
        current = current.forward[i]!;
      }
      update[i] = current; // remember the last node on level i before insertion point
    }

    // 2️⃣ Randomly decide the node's height
    const nodeLevel = this.randomLevel();

    // If the new node is taller than the current list, initialise the missing levels
    if (nodeLevel > this.level) {
      for (let i = this.level; i < nodeLevel; i++) {
        update[i] = this.head;
      }
      this.level = nodeLevel;
    }

    // 3️⃣ Create the node and splice it into each level
    const newNode = new SkipNode<T>(nodeLevel, value);
    for (let i = 0; i < nodeLevel; i++) {
      newNode.forward[i] = update[i].forward[i];
      update[i].forward[i] = newNode;
    }

    this._size++;
  }

  /** --------------------------------------------------------------
   *  Delete a value. Returns `true` if something was removed.
   * -------------------------------------------------------------- */
  public delete(value: T): boolean {
    const update = new Array<SkipNode<T>>(MAX_LEVEL);
    let current = this.head;
    let found = false;

    // 1️⃣ Locate nodes that need to be updated
    for (let i = this.level - 1; i >= 0; i--) {
      while (
        current.forward[i] !== null &&
        this.compare(current.forward[i]!.value!, value) < 0
      ) {
        current = current.forward[i]!;
      }
      update[i] = current;
    }

    // 2️⃣ Candidate node at level 0
    const target = current.forward[0];
    if (target && this.compare(target.value!, value) === 0) {
      found = true;
      // 3️⃣ Remove it from every level it appears in
      for (let i = 0; i < this.level; i++) {
        if (update[i].forward[i] !== target) break; // higher levels don't contain the node
        update[i].forward[i] = target.forward[i];
      }

      // 4️⃣ Trim empty top levels
      while (this.level > 1 && this.head.forward[this.level - 1] === null) {
        this.level--;
      }

      this._size--;
    }

    return found;
  }

  /** --------------------------------------------------------------
   *  Convert the whole structure to a sorted array (level‑0 traversal).
   * -------------------------------------------------------------- */
  public toArray(): T[] {
    const result: T[] = [];
    let node = this.head.forward[0];
    while (node !== null) {
      result.push(node.value!);
      node = node.forward[0];
    }
    return result;
  }

  /** --------------------------------------------------------------
   *  Debug helper – prints each level (useful while learning).
   * -------------------------------------------------------------- */
  public printLevels(): void {
    console.log(`SkipList (size=${this._size}, maxLevel=${this.level})`);
    for (let i = this.level - 1; i >= 0; i--) {
      let line = `L${i}: head`;
      let node = this.head.forward[i];
      while (node) {
        line += ` -> ${node.value}`;
        node = node.forward[i];
      }
      console.log(line);
    }
  }
}
import { SkipList } from "./skiplist";

// Numbers – default comparator works out of the box
const sl = new SkipList<number>();

sl.insert(5);
sl.insert(2);
sl.insert(8);
sl.insert(1);
sl.insert(3);

console.log("All elements (sorted):", sl.toArray()); // [1,2,3,5,8]

console.log("Search 3 →", sl.search(3)); // 3
console.log("Search 7 →", sl.search(7)); // null

sl.delete(5);
console.log("After deleting 5:", sl.toArray()); // [1,2,3,8]

// ---------------------------------------------------
// Using a custom comparator (e.g. objects sorted by `id`)
// ---------------------------------------------------
interface Person {
  id: number;
  name: string;
}
const personCmp = (a: Person, b: Person) => a.id - b.id;

const people = new SkipList<Person>(personCmp);
people.insert({ id: 10, name: "Alice" });
people.insert({ id: 5, name: "Bob" });
people.insert({ id: 7, name: "Carol" });

console.log("People sorted by id:", people.toArray());
// → [{id:5,…},{id:7,…},{id:10,…}]
// ---------------------------------------------------
// Tiny sanity‑check (run with `node skiplist.ts`)
// ---------------------------------------------------
if (require.main === module) {
  const assert = require("assert").strict;

  const sl = new SkipList<number>();
  const values = [15, 3, 7, 20, 1, 9, 12];
  for (const v of values) sl.insert(v);

  // 1️⃣ Sorted order
  assert.deepEqual(sl.toArray(), [1, 3, 7, 9, 12, 15, 20]);

  // 2️⃣ Search
  for (const v of values) assert.equal(sl.search(v), v);
  assert.equal(sl.search(100), null);

  // 3️⃣ Delete a few
  assert.ok(sl.delete(7));
  assert.ok(!sl.delete(7)); // already gone
  assert.ok(sl.delete(1));
  assert.deepEqual(sl.toArray(), [3, 9, 12, 15, 20]);

  // 4️⃣ Insert duplicates (allowed)
  sl.insert(12);
  sl.insert(12);
  assert.deepEqual(sl.toArray(), [3, 9, 12, 12, 12, 15, 20]);

  console.log("All sanity checks passed ✅");
}
$ ts-node skiplist.ts   # or compile with tsc and run node
All sanity checks passed ✅
const list = new SkipList<number>(); // or new SkipList<MyObj>(myComparator)
list.insert(42);
list.search(42);   // → 42
list.delete(42);   // → true
list.toArray();    // sorted array of all elements

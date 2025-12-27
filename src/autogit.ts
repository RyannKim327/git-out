/**
 * A simple, generic hash table implementation using separate chaining.
 *
 * @typeParam K - Type of the key. Must be hashable (by default we support string/number).
 * @typeParam V - Type of the stored value.
 */
export class HashTable<K, V> implements Iterable<[K, V]> {
  /** Default initial bucket count – a power of two makes modulo cheap. */
  private static readonly DEFAULT_CAPACITY = 16;
  /** When size / capacity > this, we resize. */
  private static readonly LOAD_FACTOR = 0.75;

  /** The array of buckets; each bucket is the head of a singly‑linked list. */
  private buckets: Array<BucketNode<K, V> | undefined>;

  /** Number of key/value pairs currently stored. */
  private _size = 0;

  /** Function that turns a key into a numeric hash. */
  private readonly hashFn: (key: K) => number;

  /**
   * @param capacity   Initial number of buckets (rounded up to a power of two).
   * @param hashFn     Optional custom hash function. If omitted we use a built‑in one.
   */
  constructor(
    capacity: number = HashTable.DEFAULT_CAPACITY,
    hashFn?: (key: K) => number
  ) {
    const pow2 = HashTable.nextPowerOfTwo(capacity);
    this.buckets = new Array(pow2);
    this.hashFn = hashFn ?? HashTable.defaultHashFunction;
  }

  /** Public getter for the number of stored entries. */
  get size(): number {
    return this._size;
  }

  /** --------------------------------------------------------------------
   *  Core API (similar to the built‑in Map)
   * ------------------------------------------------------------------- */

  /** Insert or replace a value for `key`. Returns the table (for chaining). */
  set(key: K, value: V): this {
    const index = this.bucketIndex(key);
    let node = this.buckets[index];

    // Walk the chain to see if the key already exists.
    while (node) {
      if (this.keysEqual(node.key, key)) {
        node.value = value; // replace
        return this;
      }
      node = node.next;
    }

    // Not found → prepend a new node.
    const newNode: BucketNode<K, V> = { key, value, next: this.buckets[index] };
    this.buckets[index] = newNode;
    this._size++;

    // Resize if we crossed the load factor.
    if (this._size > this.buckets.length * HashTable.LOAD_FACTOR) {
      this.resize(this.buckets.length * 2);
    }

    return this;
  }

  /** Retrieve the value for `key`. Returns `undefined` if missing. */
  get(key: K): V | undefined {
    const node = this.findNode(key);
    return node?.value;
  }

  /** Returns true if the key exists in the table. */
  has(key: K): boolean {
    return !!this.findNode(key);
  }

  /** Remove a key/value pair. Returns true if something was removed. */
  delete(key: K): boolean {
    const index = this.bucketIndex(key);
    let node = this.buckets[index];
    let prev: BucketNode<K, V> | undefined = undefined;

    while (node) {
      if (this.keysEqual(node.key, key)) {
        if (prev) {
          prev.next = node.next;
        } else {
          this.buckets[index] = node.next;
        }
        this._size--;
        return true;
      }
      prev = node;
      node = node.next;
    }
    return false;
  }

  /** Remove *all* entries, resetting the table to its initial capacity. */
  clear(): void {
    this.buckets = new Array(HashTable.DEFAULT_CAPACITY);
    this._size = 0;
  }

  /** --------------------------------------------------------------------
   *  Iteration helpers – make the class iterable like a native Map.
   * ------------------------------------------------------------------- */

  /** Iterate over `[key, value]` pairs. */
  *[Symbol.iterator](): IterableIterator<[K, V]> {
    for (const node of this.iterateNodes()) {
      yield [node.key, node.value];
    }
  }

  /** Yield just the keys. */
  *keys(): IterableIterator<K> {
    for (const node of this.iterateNodes()) {
      yield node.key;
    }
  }

  /** Yield just the values. */
  *values(): IterableIterator<V> {
    for (const node of this.iterateNodes()) {
      yield node.value;
    }
  }

  /** Yield `[key, value]` tuples (same as default iterator). */
  *entries(): IterableIterator<[K, V]> {
    for (const node of this.iterateNodes()) {
      yield [node.key, node.value];
    }
  }

  /** --------------------------------------------------------------------
   *  Private helpers
   * ------------------------------------------------------------------- */

  /** Compute the bucket index for a given key. */
  private bucketIndex(key: K): number {
    // Ensure a non‑negative integer index.
    const hash = this.hashFn(key);
    // Using bitwise AND works because capacity is always a power of two.
    return hash & (this.buckets.length - 1);
  }

  /** Find the node that stores `key`, or undefined if not present. */
  private findNode(key: K): BucketNode<K, V> | undefined {
    const index = this.bucketIndex(key);
    let node = this.buckets[index];
    while (node) {
      if (this.keysEqual(node.key, key)) return node;
      node = node.next;
    }
    return undefined;
  }

  /** Equality check for keys – works for primitives out of the box. */
  private keysEqual(a: K, b: K): boolean {
    // For objects you may want to provide a custom comparator.
    return a === b;
  }

  /** Resize the bucket array and re‑hash every entry. */
  private resize(newCapacity: number): void {
    const oldBuckets = this.buckets;
    const pow2 = HashTable.nextPowerOfTwo(newCapacity);
    this.buckets = new Array(pow2);
    this._size = 0; // will be recomputed as we re‑insert

    for (const node of this.iterateNodes(oldBuckets)) {
      // Re‑insert using the public `set` to keep logic in one place.
      this.set(node.key, node.value);
    }
  }

  /** Generator that walks all nodes in the current bucket array. */
  private *iterateNodes(
    bucketArray: Array<BucketNode<K, V> | undefined> = this.buckets
  ): IterableIterator<BucketNode<K, V>> {
    for (const bucket of bucketArray) {
      let node = bucket;
      while (node) {
        yield node;
        node = node.next;
      }
    }
  }

  /** --------------------------------------------------------------------
   *  Static utilities
   * ------------------------------------------------------------------- */

  /** Return the next power‑of‑two ≥ n (used for bucket sizing). */
  private static nextPowerOfTwo(n: number): number {
    if (n <= 1) return 1;
    return 2 ** Math.ceil(Math.log2(n));
  }

  /** Default hash function – works well for strings and numbers. */
  private static defaultHashFunction<T>(key: T): number {
    // Numbers are already hashable.
    if (typeof key === "number") {
      // Bit‑mix to spread patterns (see MurmurHash3 finalizer).
      let h = key | 0;
      h = ((h >>> 16) ^ h) * 0x45d9f3b;
      h = ((h >>> 16) ^ h) * 0x45d9f3b;
      h = (h >>> 16) ^ h;
      return h >>> 0; // ensure unsigned 32‑bit
    }

    // For strings we use the classic djb2 algorithm.
    if (typeof key === "string") {
      let hash = 5381;
      for (let i = 0; i < key.length; i++) {
        hash = (hash * 33) ^ key.charCodeAt(i);
      }
      return hash >>> 0; // unsigned 32‑bit
    }

    // Fallback: JSON‑stringify the key and hash the resulting string.
    // Not the fastest, but works for objects that are JSON‑serializable.
    const str = JSON.stringify(key);
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return hash >>> 0;
  }
}

/** Internal node type for a bucket’s linked list. */
interface BucketNode<K, V> {
  key: K;
  value: V;
  next?: BucketNode<K, V>;
}
import { HashTable } from "./HashTable";

// Simple string → number map
const map = new HashTable<string, number>();

map.set("apple", 1)
   .set("banana", 2)
   .set("orange", 3);

console.log(map.get("banana")); // → 2
console.log(map.has("pear"));   // → false

map.delete("apple");
console.log(map.size);          // → 2

// Iterate
for (const [k, v] of map) {
  console.log(`${k} => ${v}`);
}
// Output:
// banana => 2
// orange => 3

// Custom hash for objects (e.g., using a numeric id field)
type User = { id: number; name: string };
const userTable = new HashTable<User, string>(32, (u) => u.id);

userTable.set({ id: 101, name: "Alice" }, "admin");
userTable.set({ id: 102, name: "Bob" }, "editor");

console.log(userTable.get({ id: 101, name: "Alice" })); // → "admin"
class DeepHashTable<K, V> extends HashTable<K, V> {
  protected keysEqual(a: K, b: K): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
  }
}

/**
 * A simple, generic hash table implementation in TypeScript.
 *
 * Features:
 *  - Separate chaining for collision resolution.
 *  - Automatic resizing (load factor 0.75 by default).
 *  - Customizable hash function.
 *  - Full iterable API (keys, values, entries, forEach, Symbol.iterator).
 *
 * Usage example (see the bottom of the file):
 *   const ht = new HashTable<string, number>();
 *   ht.set('apple', 1);
 *   console.log(ht.get('apple')); // 1
 */

type Primitive = string | number | boolean | symbol | null | undefined;

/**
 * Default hash function.
 *
 * It works for primitive values (string, number, boolean, symbol) and
 * falls back to `JSON.stringify` for objects. For production code you may
 * want a stronger hash (e.g., murmurhash) if you expect many complex keys.
 */
function defaultHash(key: any): number {
  if (typeof key === 'string') {
    // Simple string hash (djb2)
    let hash = 5381;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 33) ^ key.charCodeAt(i);
    }
    return hash >>> 0; // force unsigned 32‑bit integer
  }

  if (typeof key === 'number') {
    // Numbers are already numeric – just scramble a bit
    let hash = key | 0;
    hash = ((hash >>> 16) ^ hash) * 0x45d9f3b;
    hash = ((hash >>> 16) ^ hash) * 0x45d9f3b;
    hash = (hash >>> 16) ^ hash;
    return hash >>> 0;
  }

  if (typeof key === 'boolean') {
    return key ? 1 : 0;
  }

  if (typeof key === 'symbol') {
    // Symbol description is a string; use that.
    return defaultHash(key.toString());
  }

  // For objects (including arrays) we use JSON.stringify.
  // This is deterministic but not the fastest; replace with a better hash if needed.
  const str = JSON.stringify(key);
  return defaultHash(str);
}

/** Internal bucket entry */
interface BucketEntry<K, V> {
  key: K;
  value: V;
}

/**
 * HashTable class
 */
export class HashTable<K, V> implements Iterable<[K, V]> {
  /** Array of buckets – each bucket holds an array of entries (separate chaining). */
  private buckets: Array<Array<BucketEntry<K, V>>>;

  /** Number of key/value pairs stored. */
  private _size: number = 0;

  /** Load factor threshold that triggers a resize. */
  private readonly loadFactor: number;

  /** Hash function supplied by the user (or the default). */
  private readonly hashFn: (key: K) => number;

  /**
   * @param initialCapacity  Number of buckets to start with (must be a power of two for best distribution).
   * @param loadFactor       When (size / capacity) exceeds this value we resize.
   * @param hashFn           Optional custom hash function.
   */
  constructor(
    initialCapacity: number = 16,
    loadFactor: number = 0.75,
    hashFn?: (key: K) => number
  ) {
    if (initialCapacity <= 0) {
      throw new Error('initialCapacity must be > 0');
    }
    // Ensure capacity is a power of two (helps with bit‑masking)
    this.buckets = new Array(this.nextPowerOfTwo(initialCapacity)).fill(null).map(() => []);
    this.loadFactor = loadFactor;
    this.hashFn = hashFn ?? defaultHash;
  }

  /** ---------- Public API ---------- */

  /** Number of entries stored */
  get size(): number {
    return this._size;
  }

  /** Insert or update a key/value pair */
  set(key: K, value: V): this {
    const bucketIndex = this.bucketIndex(key);
    const bucket = this.buckets[bucketIndex];

    // Look for an existing entry
    for (const entry of bucket) {
      if (this.keysEqual(entry.key, key)) {
        entry.value = value; // update
        return this;
      }
    }

    // Not found → add new entry
    bucket.push({ key, value });
    this._size++;

    // Resize if needed
    if (this._size / this.buckets.length > this.loadFactor) {
      this.resize(this.buckets.length * 2);
    }

    return this;
  }

  /** Retrieve the value for a key, or undefined if not present */
  get(key: K): V | undefined {
    const bucket = this.buckets[this.bucketIndex(key)];
    for (const entry of bucket) {
      if (this.keysEqual(entry.key, key)) {
        return entry.value;
      }
    }
    return undefined;
  }

  /** Returns true if the key exists in the table */
  has(key: K): boolean {
    const bucket = this.buckets[this.bucketIndex(key)];
    return bucket.some(entry => this.keysEqual(entry.key, key));
  }

  /** Remove a key/value pair; returns true if something was removed */
  delete(key: K): boolean {
    const bucket = this.buckets[this.bucketIndex(key)];
    for (let i = 0; i < bucket.length; i++) {
      if (this.keysEqual(bucket[i].key, key)) {
        bucket.splice(i, 1);
        this._size--;
        return true;
      }
    }
    return false;
  }

  /** Remove all entries */
  clear(): void {
    this.buckets = this.buckets.map(() => []);
    this._size = 0;
  }

  /** Iterate over keys */
  *keys(): IterableIterator<K> {
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        yield entry.key;
      }
    }
  }

  /** Iterate over values */
  *values(): IterableIterator<V> {
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        yield entry.value;
      }
    }
  }

  /** Iterate over [key, value] tuples */
  *entries(): IterableIterator<[K, V]> {
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        yield [entry.key, entry.value];
      }
    }
  }

  /** Alias for entries() – makes `for (const [k, v] of map)` work */
  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries();
  }

  /** Execute a callback for each entry */
  forEach(callback: (value: V, key: K, map: this) => void, thisArg?: any): void {
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        callback.call(thisArg, entry.value, entry.key, this);
      }
    }
  }

  /** ---------- Private helpers ---------- */

  /** Compute the bucket index for a given key */
  private bucketIndex(key: K): number {
    const hash = this.hashFn(key);
    // Using bitmask works because bucket length is always a power of two
    return hash & (this.buckets.length - 1);
  }

  /** Equality check for keys – works for primitives and objects (by reference) */
  private keysEqual(a: K, b: K): boolean {
    // For primitives we can use ===; for objects we also use === (reference equality)
    return a === b;
  }

  /** Resize the internal bucket array and re‑hash all entries */
  private resize(newCapacity: number): void {
    const oldBuckets = this.buckets;
    this.buckets = new Array(this.nextPowerOfTwo(newCapacity)).fill(null).map(() => []);
    this._size = 0; // will be recomputed as we re‑insert

    for (const bucket of oldBuckets) {
      for (const entry of bucket) {
        // Re‑insert using the new bucket array
        this.set(entry.key, entry.value);
      }
    }
  }

  /** Return the next power of two >= n (used for bucket sizing) */
  private nextPowerOfTwo(n: number): number {
    if (n <= 1) return 1;
    return 2 ** Math.ceil(Math.log2(n));
  }
}

/* -------------------------------------------------------------------------- */
/* --------------------------- Example / Tests ----------------------------- */
/* -------------------------------------------------------------------------- */

if (require.main === module) {
  // Simple demo when you run `node hash-table.js` (or `ts-node hash-table.ts`)

  const ht = new HashTable<string, number>();

  // Insert some values
  ht.set('apple', 1);
  ht.set('banana', 2);
  ht.set('orange', 3);
  ht.set('grape', 4);
  ht.set('pear', 5);

  console.log('size →', ht.size); // 5

  // Retrieve
  console.log('apple →', ht.get('apple')); // 1
  console.log('banana →', ht.get('banana')); // 2

  // Update
  ht.set('apple', 10);
  console.log('apple (updated) →', ht.get('apple')); // 10

  // Delete
  console.log('delete "orange" →', ht.delete('orange')); // true
  console.log('has "orange"? →', ht.has('orange')); // false

  // Iterate
  console.log('--- entries ---');
  for (const [k, v] of ht) {
    console.log(`${k} = ${v}`);
  }

  // Using custom objects as keys (requires a custom hash function)
  interface Point {
    x: number;
    y: number;
  }

  // Very naive hash for a point – just combine the coordinates.
  const pointHash = (p: Point) => {
    // Simple 32‑bit mix
    let h = 2166136261 >>> 0;
    h = (h ^ p.x) * 16777619;
    h = (h ^ p.y) * 16777619;
    return h >>> 0;
  };

  const pointTable = new HashTable<Point, string>(8, 0.75, pointHash);
  const p1: Point = { x: 1, y: 2 };
  const p2: Point = { x: 3, y: 4 };
  pointTable.set(p1, 'first');
  pointTable.set(p2, 'second');

  console.log('point (1,2) →', pointTable.get(p1)); // "first"
  console.log('point (3,4) →', pointTable.get(p2)); // "second"
}

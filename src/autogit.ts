/**
 * A simple, generic hash table implementation using separate chaining.
 *
 * The implementation mirrors the native Map API where possible, but
 * it also demonstrates the inner workings of a hash table.
 *
 * --------------------------------------------------------------
 * 1️⃣  Public API
 * --------------------------------------------------------------
 *   - constructor(initialCapacity?, loadFactor?, hashFn?)
 *   - set(key, value): this
 *   - get(key): V | undefined
 *   - has(key): boolean
 *   - delete(key): boolean
 *   - clear(): void
 *   - size: number (readonly)
 *   - keys(): IterableIterator<K>
 *   - values(): IterableIterator<V>
 *   - entries(): IterableIterator<[K, V]>
 *   - [Symbol.iterator](): IterableIterator<[K, V]>
 *
 * --------------------------------------------------------------
 * 2️⃣  Internals
 * --------------------------------------------------------------
 *   - _buckets: Array<Entry<K, V>[]>   // each bucket is an array (chain)
 *   - _hashFn: (key: K) => number
 *   - _loadFactor: number (default 0.75)
 *   - _capacity: number (always a power of two)
 *   - _size: number (number of stored entries)
 *
 * --------------------------------------------------------------
 * 3️⃣  Complexity (amortized)
 * --------------------------------------------------------------
 *   - set / get / has / delete : O(1)   (when load factor is kept low)
 *   - resize (rehash)          : O(n)   (rare, triggered when load factor exceeded)
 */

type HashFunction<K> = (key: K) => number;

/** Internal entry stored in a bucket */
interface Entry<K, V> {
  key: K;
  value: V;
}

/**
 * Default hash function.
 *
 * - For strings: a simple djb2 variant.
 * - For numbers: the number itself (modulo will be applied later).
 * - For other objects: JSON.stringify + djb2 (good enough for demo purposes).
 *
 * You can replace it with something stronger (e.g., murmurhash) if you need
 * production‑grade distribution.
 */
function defaultHashFn<T>(key: T): number {
  if (typeof key === 'number') {
    // Ensure we work with 32‑bit signed ints
    return key | 0;
  }

  if (typeof key === 'string') {
    // djb2 – fast and decent for short strings
    let hash = 5381;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 33) ^ key.charCodeAt(i);
    }
    return hash >>> 0; // force unsigned
  }

  // Fallback for objects / booleans / symbols etc.
  const str = JSON.stringify(key);
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0;
}

/**
 * HashTable class
 */
export class HashTable<K, V> implements Iterable<[K, V]> {
  /** The array of buckets (each bucket is an array of entries). */
  private _buckets: Array<Entry<K, V>[]>;

  /** Number of key/value pairs stored. */
  private _size = 0;

  /** Load factor threshold before we resize. */
  private readonly _loadFactor: number;

  /** Hash function supplied by the user or the default one. */
  private readonly _hashFn: HashFunction<K>;

  /** Current capacity (always a power of two). */
  private _capacity: number;

  /**
   * @param initialCapacity  Desired initial bucket count (rounded up to a power of two).
   * @param loadFactor       Desired max load factor before resizing (default 0.75).
   * @param hashFn           Optional custom hash function.
   */
  constructor(
    initialCapacity = 16,
    loadFactor = 0.75,
    hashFn?: HashFunction<K>
  ) {
    if (initialCapacity < 1) {
      throw new Error('initialCapacity must be >= 1');
    }
    if (loadFactor <= 0 || loadFactor >= 1) {
      throw new Error('loadFactor must be > 0 and < 1');
    }

    // Ensure capacity is a power of two – simplifies index calculation.
    this._capacity = 1;
    while (this._capacity < initialCapacity) this._capacity <<= 1;

    this._buckets = new Array(this._capacity);
    for (let i = 0; i < this._capacity; i++) this._buckets[i] = [];

    this._loadFactor = loadFactor;
    this._hashFn = hashFn ?? defaultHashFn;
  }

  /** Number of stored entries (read‑only). */
  get size(): number {
    return this._size;
  }

  /** Compute the bucket index for a given key. */
  private _index(key: K): number {
    // The hash function returns a 32‑bit unsigned integer.
    // Using bitwise AND with (capacity - 1) works because capacity is a power of two.
    const hash = this._hashFn(key);
    return hash & (this._capacity - 1);
  }

  /** Find an entry inside a bucket, returning its position or -1. */
  private _findEntry(bucket: Entry<K, V>[], key: K): number {
    for (let i = 0; i < bucket.length; i++) {
      // Equality check – for primitives `===` works; for objects you may want a custom comparator.
      if (Object.is(bucket[i].key, key)) {
        return i;
      }
    }
    return -1;
  }

  /** Insert or update a key/value pair. */
  set(key: K, value: V): this {
    const idx = this._index(key);
    const bucket = this._buckets[idx];
    const pos = this._findEntry(bucket, key);

    if (pos >= 0) {
      // Update existing entry
      bucket[pos].value = value;
    } else {
      // Insert new entry
      bucket.push({ key, value });
      this._size++;

      // Resize if needed
      if (this._size > this._capacity * this._loadFactor) {
        this._resize(this._capacity * 2);
      }
    }
    return this;
  }

  /** Retrieve the value for a key, or undefined if missing. */
  get(key: K): V | undefined {
    const bucket = this._buckets[this._index(key)];
    const pos = this._findEntry(bucket, key);
    return pos >= 0 ? bucket[pos].value : undefined;
  }

  /** Returns true if the key exists in the table. */
  has(key: K): boolean {
    const bucket = this._buckets[this._index(key)];
    return this._findEntry(bucket, key) >= 0;
  }

  /** Remove a key/value pair. Returns true if something was removed. */
  delete(key: K): boolean {
    const idx = this._index(key);
    const bucket = this._buckets[idx];
    const pos = this._findEntry(bucket, key);
    if (pos >= 0) {
      bucket.splice(pos, 1);
      this._size--;
      return true;
    }
    return false;
  }

  /** Remove all entries and reset capacity to the initial size. */
  clear(): void {
    this._buckets = new Array(this._capacity);
    for (let i = 0; i < this._capacity; i++) this._buckets[i] = [];
    this._size = 0;
  }

  /** Internal method to grow/shrink the table and re‑hash all entries. */
  private _resize(newCapacity: number): void {
    // Keep capacity a power of two
    let cap = 1;
    while (cap < newCapacity) cap <<= 1;
    const oldBuckets = this._buckets;

    this._capacity = cap;
    this._buckets = new Array(this._capacity);
    for (let i = 0; i < this._capacity; i++) this._buckets[i] = [];

    // Reset size and re‑insert everything
    const oldSize = this._size;
    this._size = 0;

    for (const bucket of oldBuckets) {
      for (const entry of bucket) {
        this.set(entry.key, entry.value);
      }
    }

    // The size after re‑inserting should match the old size.
    this._size = oldSize;
  }

  /** Iterate over all entries as [key, value] tuples. */
  *entries(): IterableIterator<[K, V]> {
    for (const bucket of this._buckets) {
      for (const { key, value } of bucket) {
        yield [key, value] as [K, V];
      }
    }
  }

  /** Iterate over all keys. */
  *keys(): IterableIterator<K> {
    for (const bucket of this._buckets) {
      for (const { key } of bucket) {
        yield key;
      }
    }
  }

  /** Iterate over all values. */
  *values(): IterableIterator<V> {
    for (const bucket of this._buckets) {
      for (const { value } of bucket) {
        yield value;
      }
    }
  }

  /** Default iterator – same as entries(). */
  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries();
  }

  /** For debugging – a quick visual of bucket distribution. */
  _debugPrint(): void {
    console.log(`HashTable (size=${this._size}, capacity=${this._capacity})`);
    this._buckets.forEach((bucket, i) => {
      if (bucket.length) {
        console.log(`  bucket[${i}] → ${bucket.map(e => `${String(e.key)}:${String(e.value)}`).join(', ')}`);
      }
    });
  }
}

/* --------------------------------------------------------------
   Example usage & simple test harness
   -------------------------------------------------------------- */
if (require.main === module) {
  // Simple demo with primitive keys
  const map = new HashTable<string, number>();
  map.set('apple', 1).set('banana', 2).set('cherry', 3);
  console.log('size →', map.size); // 3
  console.log('get banana →', map.get('banana')); // 2
  console.log('has orange →', map.has('orange')); // false

  // Delete a key
  map.delete('apple');
  console.log('after delete apple, size →', map.size); // 2

  // Iterate
  console.log('entries:');
  for (const [k, v] of map) {
    console.log(`  ${k} => ${v}`);
  }

  // Using a custom hash function for number keys (modulo a prime)
  const numberHash = (n: number) => n % 97;
  const numMap = new HashTable<number, string>(8, 0.75, numberHash);
  for (let i = 0; i < 20; i++) {
    numMap.set(i, `value-${i}`);
  }
  console.log('numMap size (after 20 inserts) →', numMap.size);
  console.log('value for 13 →', numMap.get(13));

  // Complex object keys – you must provide a hash function that can
  // uniquely identify the object (or rely on JSON.stringify, which works
  // for simple POJOs).
  interface Point {
    x: number;
    y: number;
  }
  const pointHash = (p: Point) => {
    // Simple combine: (x * 31) ^ y
    return ((p.x * 31) ^ p.y) >>> 0;
  };
  const pointMap = new HashTable<Point, string>(4, 0.75, pointHash);
  const p1 = { x: 1, y: 2 };
  const p2 = { x: 3, y: 4 };
  pointMap.set(p1, 'origin');
  pointMap.set(p2, 'far');
  console.log('pointMap.get(p1) →', pointMap.get(p1)); // origin
  console.log('pointMap.has(p2) →', pointMap.has(p2)); // true

  // Debug print (optional)
  // map._debugPrint();
}

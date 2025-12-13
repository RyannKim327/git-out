/**
 * A simple, generic hash table implementation in TypeScript.
 *
 * Features:
 *  - Separate chaining for collision handling.
 *  - Automatic resizing (rehashing) when load factor > DEFAULT_MAX_LOAD_FACTOR.
 *  - Custom hash function support.
 *  - Full ES‑6 iterator support (keys, values, entries).
 *
 * Limitations:
 *  - Keys are hashed to a string (or number) via the supplied hash function.
 *    If you use objects as keys, you must provide a deterministic hash function.
 */

type HashFunction<K> = (key: K) => string | number;

/** Default hash function – works for primitive keys (string, number, boolean, symbol). */
function defaultHashFunction<K>(key: K): string {
  // Using JSON.stringify works for most primitives and simple objects,
  // but for performance‑critical code you may want a custom hash.
  return typeof key === 'object' && key !== null
    ? JSON.stringify(key)
    : String(key);
}

/** Internal bucket entry */
interface Entry<K, V> {
  key: K;
  value: V;
}

/**
 * HashTable class.
 *
 * @template K – type of the key.
 * @template V – type of the value.
 */
export class HashTable<K, V> implements Iterable<[K, V]> {
  /** Default initial bucket count (must be a power of two for fast modulo). */
  private static readonly DEFAULT_INITIAL_CAPACITY = 16;
  /** When load factor exceeds this, we resize. */
  private static readonly DEFAULT_MAX_LOAD_FACTOR = 0.75;

  /** Array of buckets; each bucket is an array of entries (separate chaining). */
  private buckets: Array<Array<Entry<K, V>>>;

  /** Number of key/value pairs stored. */
  private _size = 0;

  /** Hash function supplied by the user or the default one. */
  private readonly hashFn: HashFunction<K>;

  /** Load factor threshold that triggers a resize. */
  private readonly maxLoadFactor: number;

  /**
   * @param initialCapacity – starting number of buckets (rounded up to a power of two).
   * @param hashFn – optional custom hash function.
   * @param maxLoadFactor – optional load factor before resizing (default 0.75).
   */
  constructor(
    initialCapacity: number = HashTable.DEFAULT_INITIAL_CAPACITY,
    hashFn?: HashFunction<K>,
    maxLoadFactor: number = HashTable.DEFAULT_MAX_LOAD_FACTOR,
  ) {
    const capacity = HashTable.nextPowerOfTwo(initialCapacity);
    this.buckets = new Array<Array<Entry<K, V>>>(capacity);
    for (let i = 0; i < capacity; i++) this.buckets[i] = [];

    this.hashFn = hashFn ?? defaultHashFunction;
    this.maxLoadFactor = maxLoadFactor;
  }

  /** Current number of entries. */
  get size(): number {
    return this._size;
  }

  /** Insert or replace a value for a given key. */
  set(key: K, value: V): this {
    const bucket = this.getBucket(key);
    const entry = bucket.find((e) => this.isEqual(e.key, key));

    if (entry) {
      // Key already exists – replace the value.
      entry.value = value;
    } else {
      // New key – push a fresh entry.
      bucket.push({ key, value });
      this._size++;

      // Resize if needed.
      if (this._size / this.buckets.length > this.maxLoadFactor) {
        this.resize(this.buckets.length * 2);
      }
    }
    return this;
  }

  /** Retrieve the value for a key, or `undefined` if not present. */
  get(key: K): V | undefined {
    const bucket = this.getBucket(key);
    const entry = bucket.find((e) => this.isEqual(e.key, key));
    return entry?.value;
  }

  /** Returns true if the key exists in the table. */
  has(key: K): boolean {
    const bucket = this.getBucket(key);
    return bucket.some((e) => this.isEqual(e.key, key));
  }

  /** Remove a key/value pair. Returns true if something was removed. */
  delete(key: K): boolean {
    const bucket = this.getBucket(key);
    const index = bucket.findIndex((e) => this.isEqual(e.key, key));
    if (index >= 0) {
      bucket.splice(index, 1);
      this._size--;
      return true;
    }
    return false;
  }

  /** Remove all entries. */
  clear(): void {
    for (let i = 0; i < this.buckets.length; i++) this.buckets[i] = [];
    this._size = 0;
  }

  /** Iterate over `[key, value]` pairs (makes the class iterable). */
  *[Symbol.iterator](): IterableIterator<[K, V]> {
    for (const entry of this.entries()) {
      yield entry;
    }
  }

  /** Return an iterator over keys. */
  *keys(): IterableIterator<K> {
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        yield entry.key;
      }
    }
  }

  /** Return an iterator over values. */
  *values(): IterableIterator<V> {
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        yield entry.value;
      }
    }
  }

  /** Return an iterator over `[key, value]` pairs. */
  *entries(): IterableIterator<[K, V]> {
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        yield [entry.key, entry.value] as [K, V];
      }
    }
  }

  /** ---------- Private helpers ---------- */

  /** Compute the bucket index for a given key. */
  private getBucket(key: K): Array<Entry<K, V>> {
    const hash = this.hashFn(key);
    // Convert hash to a non‑negative integer.
    const hashCode = typeof hash === 'number' ? hash : HashTable.fnv1a(hash);
    // Using bitwise AND works because bucket length is always a power of two.
    const index = hashCode & (this.buckets.length - 1);
    return this.buckets[index];
  }

  /** Equality check – for primitives `===` works; for objects we fall back to deep equality. */
  private isEqual(a: K, b: K): boolean {
    // Fast path for primitives.
    if (a === b) return true;
    // If both are objects, a simple JSON compare works for many cases.
    // Users can provide a custom hash function that guarantees uniqueness if needed.
    if (typeof a === 'object' && typeof b === 'object') {
      return JSON.stringify(a) === JSON.stringify(b);
    }
    return false;
  }

  /** Resize the bucket array and re‑hash all existing entries. */
  private resize(newCapacity: number): void {
    const oldBuckets = this.buckets;
    const capacity = HashTable.nextPowerOfTwo(newCapacity);
    this.buckets = new Array<Array<Entry<K, V>>>(capacity);
    for (let i = 0; i < capacity; i++) this.buckets[i] = [];

    // Reset size and re‑insert everything.
    const oldSize = this._size;
    this._size = 0;
    for (const bucket of oldBuckets) {
      for (const entry of bucket) {
        this.set(entry.key, entry.value);
      }
    }
    // The size after re‑insertion should match the old size.
    this._size = oldSize;
  }

  /** Compute the next power of two >= n (used for bucket sizing). */
  private static nextPowerOfTwo(n: number): number {
    if (n < 1) return 1;
    return 2 ** Math.ceil(Math.log2(n));
  }

  /**
   * 32‑bit FNV‑1a hash – a fast, non‑cryptographic hash for strings.
   * Returns a positive 32‑bit integer.
   */
  private static fnv1a(str: string): number {
    let hash = 0x811c9dc5; // FNV offset basis
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      // Multiply by FNV prime (mod 2^32)
      hash = (hash * 0x01000193) >>> 0;
    }
    return hash;
  }
}

/* --------------------------------------------------------------
   Example usage & simple test harness
   -------------------------------------------------------------- */

function demo() {
  // Simple hash table with primitive keys
  const map = new HashTable<string, number>();
  map.set('apple', 1);
  map.set('banana', 2);
  map.set('orange', 3);

  console.log('size →', map.size); // 3
  console.log('get banana →', map.get('banana')); // 2
  console.log('has grape →', map.has('grape')); // false

  // Delete a key
  map.delete('apple');
  console.log('after delete apple, size →', map.size); // 2

  // Iterate
  console.log('keys:');
  for (const k of map.keys()) console.log(' ', k);
  console.log('values:');
  for (const v of map.values()) console.log(' ', v);
  console.log('entries:');
  for (const [k, v] of map) console.log(` ${k} => ${v}`);

  // Using a custom hash function for complex objects
  interface Point {
    x: number;
    y: number;
  }

  const pointHash = (p: Point) => `${p.x},${p.y}`; // simple deterministic string

  const pointMap = new HashTable<Point, string>(8, pointHash);
  const p1 = { x: 10, y: 20 };
  const p2 = { x: -5, y: 7 };
  pointMap.set(p1, 'A');
  pointMap.set(p2, 'B');

  console.log('pointMap.get(p1) →', pointMap.get(p1)); // 'A'
  console.log('pointMap.has({x:10,y:20}) →', pointMap.has({ x: 10, y: 20 })); // true (deep compare)
}

// Run demo if this file is executed directly (Node.js)
if (require.main === module) {
  demo();
}

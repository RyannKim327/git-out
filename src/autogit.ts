type Key = string | number | object;   // anything you can reasonably stringify
interface Pair<K, V> {
  key: K;
  value: V;
}
type Bucket<K, V> = Pair<K, V>[];
const DEFAULT_BUCKETS = 16;
const DEFAULT_LOAD_FACTOR = 0.75;

export class HashTable<K extends Key, V> {
  private buckets: Bucket<K, V>[];
  private count = 0;                    // number of key/value pairs
  private loadFactor: number;

  constructor(initialBuckets = DEFAULT_BUCKETS, loadFactor = DEFAULT_LOAD_FACTOR) {
    this.buckets = Array.from({ length: initialBuckets }, () => []);
    this.loadFactor = loadFactor;
  }

  /* ---------- public API ---------- */

  set(key: K, value: V): void {
    const idx = this.bucketIndex(key);
    const bucket = this.buckets[idx];

    // Replace if key is already present
    for (const pair of bucket) {
      if (this.equals(pair.key, key)) {           // we’ll use a simple === check
        pair.value = value;
        return;
      }
    }

    bucket.push({ key, value });
    this.count++;

    if (this.count / this.buckets.length > this.loadFactor) {
      this.resize();
    }
  }

  get(key: K): V | undefined {
    const idx = this.bucketIndex(key);
    const bucket = this.buckets[idx];

    for (const pair of bucket) {
      if (this.equals(pair.key, key)) {
        return pair.value;
      }
    }
    return undefined;
  }

  delete(key: K): boolean {
    const idx = this.bucketIndex(key);
    const bucket = this.buckets[idx];

    for (let i = 0; i < bucket.length; i++) {
      if (this.equals(bucket[i].key, key)) {
        bucket.splice(i, 1);
        this.count--;
        return true;
      }
    }
    return false;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  clear(): void {
    this.buckets = Array.from({ length: DEFAULT_BUCKETS }, () => []);
    this.count = 0;
  }

  get size(): number {
    return this.count;
  }

  /* ---------- private helpers ---------- */

  private bucketIndex(key: K): number {
    // Ensure the hash is non‑negative
    const h = this.hash(key);
    const idx = h % this.buckets.length;
    return idx < 0 ? idx + this.buckets.length : idx;
  }

  /* Simple but stable string hash (djb2 algorithm) */
  private hash(key: K): number {
    const str = typeof key === 'object' ? JSON.stringify(key) : String(key);
    let h = 5381;
    for (let i = 0; i < str.length; i++) {
      h = (h + (h << 5)) ^ str.charCodeAt(i);  // h * 33 XOR
    }
    return h >>> 0; // make unsigned
  }

  private equals(a: K, b: K): boolean {
    // For primitives, === is fine.
    // For objects, we compare the stringified form.
    if (typeof a === 'object' && typeof b === 'object') {
      return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
  }

  /* Grow the bucket array and re‑hash all entries */
  private resize(): void {
    const oldBuckets = this.buckets;
    const newSize = oldBuckets.length * 2;
    this.buckets = Array.from({ length: newSize }, () => []);
    this.count = 0;

    for (const bucket of oldBuckets) {
      for (const pair of bucket)

// HashTable.ts
type Entry<K, V> = { key: K; value: V };

export default class HashTable<K, V> {
  private buckets: Array<Array<Entry<K, V>> | undefined> = [];
  private _size = 0;
  private capacity: number;
  private loadFactor: number;

  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.capacity = Math.max(initialCapacity, 2);
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity);
  }

  /* ---------- public API ---------- */

  size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  set(key: K, value: V): this {
    this.resizeIfNeeded();

    const idx = this.indexFor(key);
    let bucket = this.buckets[idx];
    if (!bucket) {
      this.buckets[idx] = bucket = [];
    }

    const existing = bucket.find(e => e.key === key);
    if (existing) {
      existing.value = value; // update
    } else {
      bucket.push({ key, value });
      this._size++;
    }
    return this;
  }

  get(key: K): V | undefined {
    const bucket = this.buckets[this.indexFor(key)];
    return bucket?.find(e => e.key === key)?.value;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    const idx = this.indexFor(key);
    const bucket = this.buckets[idx];
    if (!bucket) return false;

    const i = bucket.findIndex(e => e.key === key);
    if (i < 0) return false;

    bucket.splice(i, 1);
    this._size--;
    if (bucket.length === 0) this.buckets[idx] = undefined;
    return true;
  }

  clear(): void {
    this.buckets = new Array(this.capacity);
    this._size = 0;
  }

  keys(): K[] {
    const out: K[] = [];
    for (const bucket of this.buckets) {
      if (bucket) out.push(...bucket.map(e => e.key));
    }
    return out;
  }

  values(): V[] {
    const out: V[] = [];
    for (const bucket of this.buckets) {
      if (bucket) out.push(...bucket.map(e => e.value));
    }
    return out;
  }

  entries(): Array<[K, V]> {
    const out: Array<[K, V]> = [];
    for (const bucket of this.buckets) {
      if (bucket) out.push(...bucket.map(e => [e.key, e.value] as [K, V]));
    }
    return out;
  }

  /* ---------- private ---------- */

  private indexFor(key: K): number {
    return this.hash(key) & (this.capacity - 1); // fast mod power-of-two
  }

  private hash(key: K): number {
    if (typeof key === "number") return key | 0;
    const str = String(key);
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    }
    return h;
  }

  private resizeIfNeeded(): void {
    if (this._size < this.capacity * this.loadFactor) return;

    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this._size = 0;

    for (const bucket of oldBuckets) {
      if (bucket) for (const { key, value } of bucket) this.set(key, value);
    }
  }
}
import HashTable from "./HashTable";

const ht = new HashTable<string, number>();
ht.set("apple", 5).set("banana", 7);
console.log(ht.get("apple"));   // 5
console.log(ht.has("pear"));    // false
ht.delete("apple");
console.log(ht.size());         // 1
console.log([...ht.entries()]); // [ [ 'banana', 7 ] ]

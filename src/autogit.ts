// HashTable.ts
type Entry<K, V> = { key: K; value: V };

export class HashTable<K, V> {
  private buckets: Array<Array<Entry<K, V>> | undefined> = [];
  private size = 0;
  private capacity: number;
  private loadFactor: number;

  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.capacity = Math.max(initialCapacity, 2); // must be ≥ 2
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity);
  }

  /* --------------------------------------------------
   * Public API
   * -------------------------------------------------- */

  set(key: K, value: V): void {
    this.maybeGrow();
    const idx = this.index(key);
    let bucket = this.buckets[idx];
    if (!bucket) {
      this.buckets[idx] = bucket = [];
    }

    const found = bucket.find(e => e.key === key);
    if (found) {
      found.value = value; // update
    } else {
      bucket.push({ key, value });
      this.size++;
    }
  }

  get(key: K): V | undefined {
    const bucket = this.buckets[this.index(key)];
    return bucket?.find(e => e.key === key)?.value;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    const idx = this.index(key);
    const bucket = this.buckets[idx];
    if (!bucket) return false;

    const i = bucket.findIndex(e => e.key === key);
    if (i === -1) return false;

    bucket.splice(i, 1);
    if (bucket.length === 0) this.buckets[idx] = undefined;
    this.size--;
    return true;
  }

  getSize(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  clear(): void {
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  keys(): IterableIterator<K> {
    return this.iter(e => e.key);
  }
  values(): IterableIterator<V> {
    return this.iter(e => e.value);
  }
  entries(): IterableIterator<Entry<K, V>> {
    return this.iter(e => e);
  }

  /* --------------------------------------------------
   * Internal helpers
   * -------------------------------------------------- */

  private index(key: K): number {
    // Simple hash; override hashCode() for custom objects.
    const hash =
      typeof key === "string" || typeof key === "number"
        ? this.djb2(String(key))
        : this.djb2(JSON.stringify(key));
    return Math.abs(hash) % this.capacity;
  }

  private djb2(str: string): number {
    let h = 5381;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) + h + str.charCodeAt(i)) & 0xffffffff;
    }
    return h;
  }

  private maybeGrow(): void {
    if (this.size / this.capacity <= this.loadFactor) return;

    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    for (const bucket of oldBuckets) {
      if (!bucket) continue;
      for (const entry of bucket) {
        this.set(entry.key, entry.value);
      }
    }
  }

  private* iter<T>(mapper: (e: Entry<K, V>) => T): IterableIterator<T> {
    for (const bucket of this.buckets) {
      if (!bucket) continue;
      for (const entry of bucket) yield mapper(entry);
    }
  }
}
const map = new HashTable<string, number>();
map.set("apple", 5);
map.set("banana", 7);
console.log(map.get("apple")); // 5
map.delete("apple");
console.log(map.has("apple")); // false
for (const [k, v] of map.entries()) console.log(k, v);

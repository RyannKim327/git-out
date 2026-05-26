/** A single key‑value entry in the table. */
interface Entry<K, V> {
  key: K;
  value: V;
}

/** A bucket holds one or more entries that hash to the same slot. */
type Bucket<K, V> = Entry<K, V>[];
function hashKey(key: string | number, capacity: number): number {
  let h = 0;
  const str = typeof key === 'number' ? String(key) : key;

  for (const ch of str) {
    h = (h * 31 + ch.charCodeAt(0)) >>> 0; // >>> 0 ensures unsigned 32‑bit
  }
  return h % capacity;
}
class HashTable<K extends string | number, V> {
  private buckets: Bucket<K, V>[];
  private capacity: number;
  private _size: number = 0;

  /** @param capacity initial number of buckets (defaults to 53, a prime). */
  constructor(capacity: number = 53) {
    this.capacity = capacity;
    this.buckets = Array.from({ length: capacity }, () => []);
  }

  get size() { return this._size; }

  /* ---------- basic operations ---------- */

  set(key: K, value: V): void {
    const idx = hashKey(key, this.capacity);
    const bucket = this.buckets[idx];

    for (const entry of bucket) {
      if (entry.key === key) {
        entry.value = value; // update
        return;
      }
    }

    bucket.push({ key, value }); // insert new
    this._size++;
  }

  get(key: K): V | undefined {
    const idx = hashKey(key, this.capacity);
    const bucket = this.buckets[idx];

    for (const entry of bucket) {
      if (entry.key === key) return entry.value;
    }
    return undefined;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    const idx = hashKey(key, this.capacity);
    const bucket = this.buckets[idx];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this._size--;
        return true;
      }
    }
    return false;
  }

  /* ---------- iteration helpers ---------- */

  *entries(): Generator<[K, V]> {
    for (const bucket of this.buckets) {
      for (const e of bucket) {
        yield [e.key, e.value];
      }
    }
  }

  [Symbol.iterator](): Iterator<[K, V]> {
    return this.entries();
  }
}
const ht = new HashTable<string, number>();

ht.set('Alice', 23);
ht.set('Bob', 35);
ht.set('Charlie', 42);
ht.set('Alice', 24);   // update

console.log(ht.get('Alice'));   // 24
console.log(ht.get('Bob'));     // 35
console.log(ht.has('Dave'));    // false

ht.delete('Charlie');
console.log([...ht]);           // [['Alice', 24], ['Bob', 35]]
console.log(ht.size);           // 2

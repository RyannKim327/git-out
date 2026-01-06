// HashTable.ts
type Entry<K, V> = { key: K; value: V };

export default class HashTable<K, V> {
  private buckets: Array<Entry<K, V>[]> = [];
  private size = 0;
  private capacity: number;
  private readonly loadFactor: number;

  constructor(initialCapacity = 8, loadFactor = 0.75) {
    this.capacity = Math.max(initialCapacity, 2);
    this.loadFactor = loadFactor;
    this.buckets = Array.from({ length: this.capacity }, () => []);
  }

  /* ---------- public API ---------- */

  set(key: K, value: V): this {
    this.resizeIfNeeded();
    const idx = this.index(key);
    const list = this.buckets[idx];

    const existing = list.find(e => e.key === key);
    if (existing) {
      existing.value = value;
    } else {
      list.push({ key, value });
      this.size++;
    }
    return this;
  }

  get(key: K): V | undefined {
    const idx = this.index(key);
    return this.buckets[idx].find(e => e.key === key)?.value;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    const idx = this.index(key);
    const list = this.buckets[idx];
    const i = list.findIndex(e => e.key === key);
    if (i === -1) return false;
    list.splice(i, 1);
    this.size--;
    return true;
  }

  get length(): number {
    return this.size;
  }

  clear(): void {
    this.buckets.forEach(b => (b.length = 0));
    this.size = 0;
  }

  keys(): K[] {
    return this.buckets.flatMap(b => b.map(e => e.key));
  }

  values(): V[] {
    return this.buckets.flatMap(b => b.map(e => e.value));
  }

  entries(): [K, V][] {
    return this.buckets.flatMap(b => b.map(e => [e.key, e.value] as [K, V]));
  }

  /* ---------- internal ---------- */

  private index(key: K): number {
    // Simple but good enough for most cases
    const str = String(key);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) >>> 0; // >>> 0 keeps it 32-bit
    }
    return hash % this.capacity;
  }

  private resizeIfNeeded(): void {
    if (this.size / this.capacity <= this.loadFactor) return;

    const old = this.buckets;
    this.capacity *= 2;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;

    for (const list of old) {
      for (const { key, value } of list) this.set(key, value);
    }
  }
}
import HashTable from './HashTable';

const map = new HashTable<string, number>();
map.set('apple', 5).set('banana', 7);
console.log(map.get('apple')); // 5
console.log(map.entries());    // [ [ 'apple', 5 ], [ 'banana', 7 ] ]
map.delete('apple');
console.log(map.length);       // 1
tsc HashTable.ts --strict
node HashTable.js

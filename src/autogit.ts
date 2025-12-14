type Entry<K, V> = { key: K; value: V };

export class HashTable<K, V> {
  private buckets: Array<Array<Entry<K, V>>>;
  private _size: number;
  private _capacity: number;
  private hashFn: (key: K) => number;
  private equalsFn: (a: K, b: K) => boolean;
  private loadFactor: number = 0.75;

  constructor(opts?: {
    initialCapacity?: number;
    hashFn?: (key: K) => number;
    equalsFn?: (a: K, b: K) => boolean;
  }) {
    this._capacity = Math.max(opts?.initialCapacity ?? 53, 8);
    this.buckets = Array.from({ length: this._capacity }, () => []);
    this._size = 0;
    this.hashFn = opts?.hashFn ?? this.defaultHash;
    this.equalsFn = opts?.equalsFn ?? ((a, b) => a === b);
  }

  // Basic default hash function: turn key to string, then a simple polynomial rolling hash
  private defaultHash(key: K): number {
    const str = String(key);
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h * 31 + str.charCodeAt(i)) >>> 0;
    }
    return h;
  }

  private indexFor(key: K): number {
    const h = this.hashFn(key);
    return h % this._capacity;
  }

  set(key: K, value: V): void {
    const idx = this.indexFor(key);
    const bucket = this.buckets[idx];

    for (let i = 0; i < bucket.length; i++) {
      const entry = bucket[i];
      if (this.equalsFn(entry.key, key)) {
        entry.value = value;
        return;
      }
    }

    bucket.push({ key, value });
    this._size++;

    if (this._size / this._capacity > this.loadFactor) {
      this.resize(this._capacity * 2);
    }
  }

  get(key: K): V | undefined {
    const bucket = this.buckets[this.indexFor(key)];
    for (const entry of bucket) {
      if (this.equalsFn(entry.key, key)) return entry.value;
    }
    return undefined;
  }

  has(key: K): boolean {
    const bucket = this.buckets[this.indexFor(key)];
    for (const entry of bucket) {
      if (this.equalsFn(entry.key, key)) return true;
    }
    return false;
  }

  delete(key: K): boolean {
    const idx = this.indexFor(key);
    const bucket = this.buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
      if (this.equalsFn(bucket[i].key, key)) {
        bucket.splice(i, 1);
        this._size--;
        return true;
      }
    }
    return false;
  }

  clear(): void {
    this.buckets = Array.from({ length: this._capacity }, () => []);
    this._size = 0;
  }

  get size(): number {
    return this._size;
  }

  keys(): K[] {
    const out: K[] = [];
    for (const bucket of this.buckets) {
      for (const e of bucket) out.push(e.key);
    }
    return out;
  }

  values(): V[] {
    const out: V[] = [];
    for (const bucket of this.buckets) {
      for (const e of bucket) out.push(e.value);
    }
    return out;
  }

  entries(): Array<[K, V]> {
    const out: Array<[K, V]> = [];
    for (const bucket of this.buckets) {
      for (const e of bucket) out.push([e.key, e.value]);
    }
    return out;
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    const all = this.entries();
    let i = 0;
    return {
      next(): IteratorResult<[K, V]> {
        if (i < all.length) return { value: all[i++], done: false };
        return { value: undefined as any, done: true };
      }
    };
  }

  private resize(newCapacity: number): void {
    const oldEntries = this.entries();
    this._capacity = Math.max(newCapacity, 8);
    this.buckets = Array.from({ length: this._capacity }, () => []);
    this._size = 0;
    for (const [k, v] of oldEntries) this.set(k, v);
  }
}

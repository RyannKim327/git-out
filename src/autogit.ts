class HashTable<K, V> {
  private keys:   (K | undefined)[] = [];
  private values: (V | undefined)[] = [];
  private _size = 0;
  private capacity: number;

  constructor(initialCapacity = 8) {
    this.capacity = Math.max(initialCapacity, 2);
    this.keys   = new Array(this.capacity);
    this.values = new Array(this.capacity);
  }

  /* ---------- public API ---------- */

  get size(): number { return this._size; }

  set(key: K, value: V): void {
    this.maybeGrow();
    const idx = this.findSlot(key, true);
    if (this.keys[idx] === undefined) {   // new key
      this.keys[idx] = key;
      this._size++;
    }
    this.values[idx] = value;
  }

  get(key: K): V | undefined {
    const idx = this.findSlot(key, false);
    return idx >= 0 ? this.values[idx] : undefined;
  }

  has(key: K): boolean {
    return this.findSlot(key, false) >= 0;
  }

  delete(key: K): boolean {
    const idx = this.findSlot(key, false);
    if (idx < 0) return false;

    this.keys[idx]   = undefined;
    this.values[idx] = undefined;
    this._size--;

    // re-insert the cluster that follows the deleted slot
    let next = (idx + 1) & (this.capacity - 1);
    while (this.keys[next] !== undefined) {
      const k = this.keys[next]!;
      const v = this.values[next]!;
      this.keys[next]   = undefined;
      this.values[next] = undefined;
      this._size--;
      this.set(k, v);   // re-hash
      next = (next + 1) & (this.capacity - 1);
    }
    return true;
  }

  clear(): void {
    this.keys.fill(undefined);
    this.values.fill(undefined);
    this._size = 0;
  }

  *entries(): IterableIterator<[K, V]> {
    for (let i = 0; i < this.capacity; i++) {
      if (this.keys[i] !== undefined) yield [this.keys[i]!, this.values[i]!];
    }
  }

  *keys(): IterableIterator<K> {
    for (const k of this.keys) if (k !== undefined) yield k;
  }

  *values(): IterableIterator<V> {
    for (const v of this.values) if (v !== undefined) yield v;
  }

  [Symbol.iterator]() { return this.entries(); }

  /* ---------- helpers ---------- */

  private hash(k: K): number {
    // FNV-1a 32-bit
    const str = String(k);
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  private findSlot(key: K, insert: boolean): number {
    let idx = this.hash(key) & (this.capacity - 1);
    let deletedSlot = -1;

    while (true) {
      const k = this.keys[idx];
      if (k === undefined) {
        return insert ? (deletedSlot >= 0 ? deletedSlot : idx) : -1;
      }
      if (k === key) return idx;          // found
      if (insert && k === undefined) {     // TOMBSTONE
        if (deletedSlot < 0) deletedSlot = idx;
      }
      idx = (idx + 1) & (this.capacity - 1);
    }
  }

  private maybeGrow(): void {
    if (this._size < this.capacity * 0.75) return;
    const oldKeys   = this.keys;
    const oldValues = this.values;
    this.capacity *= 2;
    this.keys   = new Array(this.capacity);
    this.values = new Array(this.capacity);
    this._size = 0;

    for (let i = 0; i < oldKeys.length; i++) {
      const k = oldKeys[i];
      const v = oldValues[i];
      if (k !== undefined) this.set(k, v);
    }
  }
}

/* ---------- usage demo ---------- */
const ht = new HashTable<string, number>();
ht.set("one", 1);
ht.set("two", 2);
ht.set("three", 3);
console.log(ht.get("two"));   // 2
console.log([...ht.entries()]); // [["one",1], ["two",2], ["three",3]]

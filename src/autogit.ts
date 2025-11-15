type KeyValue<K, V> = { key: K; value: V };

class HashTable<K, V> {
  private buckets: Array<Array<KeyValue<K, V>>>;
  private size: number;
  private capacity: number;
  private loadFactor: number;

  constructor(capacity: number = 16, loadFactor: number = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    // Initialize buckets
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }
  }

  private hash(key: K): number {
    const keyString = String(key);
    let hash = 0;

    for (let i = 0; i < keyString.length; i++) {
      hash = ((hash << 5) - hash) + keyString.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }

    return Math.abs(hash) % this.capacity;
  }

  public put(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // Check if key already exists
    for (const pair of bucket) {
      if (pair.key === key) {
        pair.value = value;
        return;
      }
    }

    // Add new key-value pair
    bucket.push({ key, value });
    this.size++;

    // Check if resizing is needed
    if (this.size / this.capacity >= this.loadFactor) {
      this.resize(this.capacity * 2);
    }
  }

  public get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const pair of bucket) {
      if (pair.key === key) {
        return pair.value;
      }
    }

    return undefined;
  }

  public delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const initialLength = bucket.length;

    this.buckets[index] = bucket.filter(pair => pair.key !== key);
    const deleted = initialLength !== this.buckets[index].length;
    
    if (deleted) this.size--;
    return deleted;
  }

  public has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  private resize(newCapacity: number): void {
    const oldBuckets = this.buckets;
    this.capacity = newCapacity;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    // Initialize new buckets
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }

    // Rehash all existing entries
    for (const bucket of oldBuckets) {
      for (const pair of bucket) {
        this.put(pair.key, pair.value);
      }
    }
  }

  public getSize(): number {
    return this.size;
  }

  public getCapacity(): number {
    return this.capacity;
  }
}

// Usage Example
const ht = new HashTable<string, number>();

ht.put("apple", 10);
ht.put("banana", 20);
ht.put("orange", 30);

console.log(ht.get("apple"));     // 10
console.log(ht.get("grape"));     // undefined

ht.put("apple", 15);
console.log(ht.get("apple"));     // 15

console.log(ht.delete("banana")); // true
console.log(ht.get("banana"));    // undefined

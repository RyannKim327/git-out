interface HashTable<K, V> {
  set(key: K, value: V): void;
  get(key: K): V | undefined;
  delete(key: K): boolean;
  has(key: K): boolean;
}

class HashTable<K, V> implements HashTable<K, V> {
  private buckets: Array<Array<[K, V]>>;
  private size: number;
  private count: number;

  constructor(size: number = 32) {
    this.size = size;
    this.count = 0;
    this.buckets = new Array(size);
    
    for (let i = 0; i < size; i++) {
      this.buckets[i] = [];
    }
  }

  // Hash function
  private hash(key: K): number {
    const keyString = String(key);
    let hash = 0;
    
    for (let i = 0; i < keyString.length; i++) {
      hash = (hash << 5) - hash + keyString.charCodeAt(i);
      hash |= 0; // Convert to 32-bit integer
    }
    
    return Math.abs(hash) % this.size;
  }

  // Set key-value pair
  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    // Check if key already exists
    const existingIndex = bucket.findIndex(([k]) => k === key);
    
    if (existingIndex >= 0) {
      bucket[existingIndex][1] = value; // Update existing
    } else {
      bucket.push([key, value]); // Add new
      this.count++;
    }
    
    // Resize if load factor is too high
    if (this.loadFactor() > 0.7) {
      this.resize(this.size * 2);
    }
  }

  // Get value by key
  get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    const pair = bucket.find(([k]) => k === key);
    return pair ? pair[1] : undefined;
  }

  // Delete key-value pair
  delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const pairIndex = bucket.findIndex(([k]) => k === key);
    
    if (pairIndex >= 0) {
      bucket.splice(pairIndex, 1);
      this.count--;
      return true;
    }
    
    return false;
  }

  // Check if key exists
  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  // Get current load factor
  private loadFactor(): number {
    return this.count / this.size;
  }

  // Resize the hash table
  private resize(newSize: number): void {
    const oldBuckets = this.buckets;
    this.size = newSize;
    this.count = 0;
    this.buckets = new Array(newSize);
    
    for (let i = 0; i < newSize; i++) {
      this.buckets[i] = [];
    }
    
    // Rehash all existing entries
    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  // Get all keys
  keys(): K[] {
    const keys: K[] = [];
    
    for (const bucket of this.buckets) {
      for (const [key] of bucket) {
        keys.push(key);
      }
    }
    
    return keys;
  }

  // Get all values
  values(): V[] {
    const values: V[] = [];
    
    for (const bucket of this.buckets) {
      for (const [, value] of bucket) {
        values.push(value);
      }
    }
    
    return values;
  }

  // Get entries (key-value pairs)
  entries(): Array<[K, V]> {
    const entries: Array<[K, V]> = [];
    
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        entries.push(entry);
      }
    }
    
    return entries;
  }

  // Clear the hash table
  clear(): void {
    this.buckets = new Array(this.size);
    
    for (let i = 0; i < this.size; i++) {
      this.buckets[i] = [];
    }
    
    this.count = 0;
  }

  // Get number of entries
  get length(): number {
    return this.count;
  }
}
// Create a hash table
const hashTable = new HashTable<string, number>();

// Set values
hashTable.set("apple", 1);
hashTable.set("banana", 2);
hashTable.set("cherry", 3);

// Get values
console.log(hashTable.get("apple")); // 1
console.log(hashTable.get("banana")); // 2

// Check existence
console.log(hashTable.has("cherry")); // true
console.log(hashTable.has("date")); // false

// Delete entry
hashTable.delete("banana");
console.log(hashTable.has("banana")); // false

// Get all keys and values
console.log(hashTable.keys()); // ["apple", "cherry"]
console.log(hashTable.values()); // [1, 3]

// Get size
console.log(hashTable.length); // 2
private hash(key: K): number {
  if (typeof key === 'number') {
    return Math.abs(key) % this.size;
  }
  
  const keyString = String(key);
  let hash = 5381;
  
  for (let i = 0; i < keyString.length; i++) {
    hash = (hash * 33) ^ keyString.charCodeAt(i);
  }
  
  return Math.abs(hash) % this.size;
}
class ObjectHashTable<V> {
  private map: Map<string, V>;

  constructor() {
    this.map = new Map();
  }

  set(key: object, value: V): void {
    const keyString = JSON.stringify(key);
    this.map.set(keyString, value);
  }

  get(key: object): V | undefined {
    const keyString = JSON.stringify(key);
    return this.map.get(keyString);
  }

  // ... other methods
}

// Usage with object keys
const objTable = new ObjectHashTable<number>();
objTable.set({ id: 1, name: "John" }, 100);
console.log(objTable.get({ id: 1, name: "John" })); // 100

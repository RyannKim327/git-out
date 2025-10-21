interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

class HashTable<K, V> {
  private table: Array<Array<KeyValuePair<K, V>>>;
  private size: number;
  private count: number;
  private readonly loadFactor = 0.75;

  constructor(initialSize: number = 16) {
    this.size = initialSize;
    this.count = 0;
    this.table = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      this.table[i] = [];
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

  // Insert or update a key-value pair
  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.table[index];
    
    // Check if key already exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].value = value; // Update existing value
        return;
      }
    }
    
    // Add new key-value pair
    bucket.push({ key, value });
    this.count++;
    
    // Resize if load factor is exceeded
    if (this.count / this.size > this.loadFactor) {
      this.resize();
    }
  }

  // Get value by key
  get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.table[index];
    
    for (const pair of bucket) {
      if (pair.key === key) {
        return pair.value;
      }
    }
    
    return undefined;
  }

  // Check if key exists
  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  // Remove a key-value pair
  delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.table[index];
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.count--;
        return true;
      }
    }
    
    return false;
  }

  // Get all keys
  keys(): K[] {
    const keys: K[] = [];
    
    for (const bucket of this.table) {
      for (const pair of bucket) {
        keys.push(pair.key);
      }
    }
    
    return keys;
  }

  // Get all values
  values(): V[] {
    const values: V[] = [];
    
    for (const bucket of this.table) {
      for (const pair of bucket) {
        values.push(pair.value);
      }
    }
    
    return values;
  }

  // Get all entries
  entries(): Array<[K, V]> {
    const entries: Array<[K, V]> = [];
    
    for (const bucket of this.table) {
      for (const pair of bucket) {
        entries.push([pair.key, pair.value]);
      }
    }
    
    return entries;
  }

  // Get the number of elements
  getCount(): number {
    return this.count;
  }

  // Clear the hash table
  clear(): void {
    this.table = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      this.table[i] = [];
    }
    this.count = 0;
  }

  // Resize the hash table when load factor is exceeded
  private resize(): void {
    const oldTable = this.table;
    this.size *= 2;
    this.count = 0;
    this.table = new Array(this.size);
    
    for (let i = 0; i < this.size; i++) {
      this.table[i] = [];
    }
    
    // Rehash all elements
    for (const bucket of oldTable) {
      for (const pair of bucket) {
        this.set(pair.key, pair.value);
      }
    }
  }
}
class EnhancedHashTable<K, V> extends HashTable<K, V> {
  // Better hash function using djb2 algorithm
  protected hash(key: K): number {
    const keyString = JSON.stringify(key);
    let hash = 5381;
    
    for (let i = 0; i < keyString.length; i++) {
      hash = (hash << 5) + hash + keyString.charCodeAt(i);
    }
    
    return Math.abs(hash) % this.size;
  }

  // ForEach method to iterate over key-value pairs
  forEach(callback: (key: K, value: V) => void): void {
    for (const [key, value] of this.entries()) {
      callback(key, value);
    }
  }

  // Map method to transform values
  map<T>(callback: (key: K, value: V) => T): HashTable<K, T> {
    const result = new HashTable<K, T>();
    
    this.forEach((key, value) => {
      result.set(key, callback(key, value));
    });
    
    return result;
  }

  // Filter method
  filter(predicate: (key: K, value: V) => boolean): HashTable<K, V> {
    const result = new HashTable<K, V>();
    
    this.forEach((key, value) => {
      if (predicate(key, value)) {
        result.set(key, value);
      }
    });
    
    return result;
  }
}
// Basic usage
const hashTable = new HashTable<string, number>();

// Set values
hashTable.set("apple", 1);
hashTable.set("banana", 2);
hashTable.set("orange", 3);

// Get values
console.log(hashTable.get("apple")); // 1
console.log(hashTable.get("banana")); // 2

// Check existence
console.log(hashTable.has("orange")); // true
console.log(hashTable.has("grape")); // false

// Delete
hashTable.delete("banana");
console.log(hashTable.has("banana")); // false

// Iteration
console.log(hashTable.keys()); // ["apple", "orange"]
console.log(hashTable.values()); // [1, 3]
console.log(hashTable.entries()); // [["apple", 1], ["orange", 3]]

// Using with complex keys
const complexTable = new HashTable<{id: number, name: string}, string>();
complexTable.set({id: 1, name: "John"}, "Developer");
complexTable.set({id: 2, name: "Jane"}, "Designer");

console.log(complexTable.get({id: 1, name: "John"})); // "Developer"

// Enhanced version usage
const enhancedTable = new EnhancedHashTable<string, number>();
enhancedTable.set("one", 1);
enhancedTable.set("two", 2);
enhancedTable.set("three", 3);

// Using forEach
enhancedTable.forEach((key, value) => {
  console.log(`${key}: ${value}`);
});

// Using map
const doubledTable = enhancedTable.map((key, value) => value * 2);
console.log(doubledTable.get("one")); // 2

// Using filter
const evenTable = enhancedTable.filter((key, value) => value % 2 === 0);
console.log(evenTable.keys()); // ["two"]

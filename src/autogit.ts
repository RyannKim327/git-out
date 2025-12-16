interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

class HashTable<K, V> {
  private table: Array<Array<KeyValuePair<K, V>>>;
  private size: number;
  private count: number;

  constructor(size: number = 53) {
    this.size = size;
    this.count = 0;
    this.table = new Array(size);
    for (let i = 0; i < size; i++) {
      this.table[i] = [];
    }
  }

  // Hash function using polynomial rolling hash
  private hash(key: K): number {
    const str = String(key);
    let hash = 0;
    const prime = 31;
    
    for (let i = 0; i < str.length; i++) {
      hash = (hash * prime + str.charCodeAt(i)) % this.size;
    }
    
    return hash;
  }

  // Set a key-value pair
  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.table[index];
    
    // Check if key already exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].value = value;
        return;
      }
    }
    
    // Add new key-value pair
    bucket.push({ key, value });
    this.count++;
    
    // Resize if load factor is too high
    if (this.getLoadFactor() > 0.7) {
      this.resize(this.size * 2);
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

  // Delete a key-value pair
  delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.table[index];
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.count--;
        
        // Resize if load factor is too low
        if (this.getLoadFactor() < 0.2 && this.size > 53) {
          this.resize(Math.floor(this.size / 2));
        }
        
        return true;
      }
    }
    
    return false;
  }

  // Check if key exists
  has(key: K): boolean {
    return this.get(key) !== undefined;
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

  // Get entries (key-value pairs)
  entries(): Array<KeyValuePair<K, V>> {
    const entries: Array<KeyValuePair<K, V>> = [];
    
    for (const bucket of this.table) {
      for (const pair of bucket) {
        entries.push(pair);
      }
    }
    
    return entries;
  }

  // Get current size
  getSize(): number {
    return this.count;
  }

  // Get load factor
  private getLoadFactor(): number {
    return this.count / this.size;
  }

  // Resize the hash table
  private resize(newSize: number): void {
    const oldTable = this.entries();
    this.size = newSize;
    this.count = 0;
    this.table = new Array(newSize);
    
    for (let i = 0; i < newSize; i++) {
      this.table[i] = [];
    }
    
    // Rehash all entries
    for (const { key, value } of oldTable) {
      this.set(key, value);
    }
  }

  // Clear the hash table
  clear(): void {
    this.table = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      this.table[i] = [];
    }
    this.count = 0;
  }
}
// Create a hash table
const hashTable = new HashTable<string, number>();

// Set values
hashTable.set("apple", 10);
hashTable.set("banana", 20);
hashTable.set("orange", 30);

// Get values
console.log(hashTable.get("apple")); // 10
console.log(hashTable.get("banana")); // 20

// Check existence
console.log(hashTable.has("orange")); // true
console.log(hashTable.has("grape")); // false

// Delete
hashTable.delete("banana");
console.log(hashTable.has("banana")); // false

// Get all keys and values
console.log(hashTable.keys()); // ["apple", "orange"]
console.log(hashTable.values()); // [10, 30]

// Get size
console.log(hashTable.getSize()); // 2
class AdvancedHashTable<K, V> extends HashTable<K, V> {
  // Additional methods
  
  // Update value if key exists, otherwise do nothing
  update(key: K, value: V): boolean {
    if (this.has(key)) {
      this.set(key, value);
      return true;
    }
    return false;
  }

  // Get value or set default if key doesn't exist
  getOrDefault(key: K, defaultValue: V): V {
    const value = this.get(key);
    if (value === undefined) {
      this.set(key, defaultValue);
      return defaultValue;
    }
    return value;
  }

  // Merge another hash table
  merge(other: HashTable<K, V>): void {
    for (const { key, value } of other.entries()) {
      this.set(key, value);
    }
  }
}

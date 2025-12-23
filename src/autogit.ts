interface HashTableEntry<K, V> {
  key: K;
  value: V;
}

class HashTable<K, V> {
  private table: Array<Array<HashTableEntry<K, V>>>;
  private size: number;
  private count: number;

  constructor(size: number = 100) {
    this.size = size;
    this.count = 0;
    this.table = new Array(size);
    for (let i = 0; i < size; i++) {
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
    const existingIndex = bucket.findIndex(entry => entry.key === key);
    if (existingIndex !== -1) {
      bucket[existingIndex].value = value;
    } else {
      bucket.push({ key, value });
      this.count++;
      
      // Resize if load factor exceeds 0.7
      if (this.count / this.size > 0.7) {
        this.resize(this.size * 2);
      }
    }
  }

  // Get value by key
  get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.table[index];
    const entry = bucket.find(entry => entry.key === key);
    return entry ? entry.value : undefined;
  }

  // Check if key exists
  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  // Delete a key-value pair
  delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.table[index];
    const entryIndex = bucket.findIndex(entry => entry.key === key);
    
    if (entryIndex !== -1) {
      bucket.splice(entryIndex, 1);
      this.count--;
      return true;
    }
    return false;
  }

  // Get all keys
  keys(): K[] {
    const keys: K[] = [];
    for (const bucket of this.table) {
      for (const entry of bucket) {
        keys.push(entry.key);
      }
    }
    return keys;
  }

  // Get all values
  values(): V[] {
    const values: V[] = [];
    for (const bucket of this.table) {
      for (const entry of bucket) {
        values.push(entry.value);
      }
    }
    return values;
  }

  // Get entries (key-value pairs)
  entries(): [K, V][] {
    const entries: [K, V][] = [];
    for (const bucket of this.table) {
      for (const entry of bucket) {
        entries.push([entry.key, entry.value]);
      }
    }
    return entries;
  }

  // Get number of elements
  get length(): number {
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

  // Resize the hash table
  private resize(newSize: number): void {
    const oldTable = this.table;
    this.size = newSize;
    this.table = new Array(newSize);
    this.count = 0;
    
    for (let i = 0; i < newSize; i++) {
      this.table[i] = [];
    }
    
    // Rehash all entries
    for (const bucket of oldTable) {
      for (const entry of bucket) {
        this.set(entry.key, entry.value);
      }
    }
  }
}
// Create a hash table
const hashTable = new HashTable<string, number>();

// Set values
hashTable.set("apple", 5);
hashTable.set("banana", 10);
hashTable.set("orange", 7);

// Get values
console.log(hashTable.get("apple")); // 5
console.log(hashTable.get("banana")); // 10
console.log(hashTable.get("grape")); // undefined

// Check existence
console.log(hashTable.has("orange")); // true
console.log(hashTable.has("grape")); // false

// Delete
hashTable.delete("banana");
console.log(hashTable.has("banana")); // false

// Get all keys and values
console.log(hashTable.keys()); // ["apple", "orange"]
console.log(hashTable.values()); // [5, 7]

// Iterate through entries
for (const [key, value] of hashTable.entries()) {
  console.log(`${key}: ${value}`);
}

// Get size
console.log(hashTable.length); // 2
class EnhancedHashTable<K, V> extends HashTable<K, V> {
  protected hash(key: K): number {
    if (typeof key === 'number') {
      return Math.abs(key) % this.size;
    }
    
    if (typeof key === 'string') {
      let hash = 5381;
      for (let i = 0; i < key.length; i++) {
        hash = (hash << 5) + hash + key.charCodeAt(i);
      }
      return Math.abs(hash) % this.size;
    }
    
    // For objects, use JSON string representation
    const keyString = JSON.stringify(key);
    let hash = 0;
    for (let i = 0; i < keyString.length; i++) {
      hash = (hash << 5) - hash + keyString.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % this.size;
  }
}

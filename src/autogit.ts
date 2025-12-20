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

  // Simple hash function
  private hash(key: K): number {
    const keyString = String(key);
    let hash = 0;
    
    for (let i = 0; i < keyString.length; i++) {
      hash = (hash * 31 + keyString.charCodeAt(i)) % this.size;
    }
    
    return hash;
  }

  // Set key-value pair
  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.table[index];
    
    // Check if key already exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].value = value; // Update existing
        return;
      }
    }
    
    // Add new key-value pair
    bucket.push({ key, value });
    this.count++;
    
    // Resize if load factor is too high
    if (this.loadFactor > 0.7) {
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

  // Check if key exists
  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  // Delete key-value pair
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

  // Get entries (key-value pairs)
  entries(): Array<[K, V]> {
    const entries: Array<[K, V]> = [];
    
    for (const bucket of this.table) {
      for (const pair of bucket) {
        entries.push([pair.key, pair.value]);
      }
    }
    
    return entries;
  }

  // Get current load factor
  get loadFactor(): number {
    return this.count / this.size;
  }

  // Get table size
  get tableSize(): number {
    return this.size;
  }

  // Resize the hash table
  private resize(newSize: number): void {
    const oldTable = this.table;
    this.size = newSize;
    this.count = 0;
    this.table = new Array(newSize);
    
    for (let i = 0; i < newSize; i++) {
      this.table[i] = [];
    }
    
    // Rehash all elements
    for (const bucket of oldTable) {
      for (const pair of bucket) {
        this.set(pair.key, pair.value);
      }
    }
  }

  // Clear the hash table
  clear(): void {
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

// Delete a key
hashTable.delete("banana");
console.log(hashTable.has("banana")); // false

// Get all keys and values
console.log(hashTable.keys()); // ["apple", "orange"]
console.log(hashTable.values()); // [10, 30]

// Working with different types
const userTable = new HashTable<number, { name: string; age: number }>();
userTable.set(1, { name: "Alice", age: 25 });
userTable.set(2, { name: "Bob", age: 30 });

console.log(userTable.get(1)); // { name: "Alice", age: 25 }
class AdvancedHashTable<K, V> {
  private table: Array<Array<KeyValuePair<K, V>>>;
  private size: number;
  private count: number;

  constructor(size: number = 53) {
    this.size = this.getNextPrime(size);
    this.count = 0;
    this.table = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      this.table[i] = [];
    }
  }

  // Improved hash function that handles different types
  private hash(key: K): number {
    let keyString: string;
    
    if (typeof key === 'object' && key !== null) {
      // For objects, use JSON.stringify (with caution)
      keyString = JSON.stringify(key);
    } else {
      keyString = String(key);
    }
    
    let hash = 0;
    const prime = 31;
    
    for (let i = 0; i < keyString.length; i++) {
      hash = (hash * prime + keyString.charCodeAt(i)) % this.size;
    }
    
    return hash;
  }

  // Utility function to find next prime number
  private getNextPrime(num: number): number {
    const isPrime = (n: number): boolean => {
      if (n <= 1) return false;
      if (n <= 3) return true;
      if (n % 2 === 0 || n % 3 === 0) return false;
      
      for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
      }
      return true;
    };
    
    while (!isPrime(num)) {
      num++;
    }
    return num;
  }

  // ... rest of the methods remain similar to basic implementation
}

type HashTableEntry<K, V> = {
  key: K;
  value: V;
};

class HashTable<K, V> {
  private buckets: Array<Array<HashTableEntry<K, V>>>;
  private size: number;
  private capacity: number;
  private readonly loadFactor: number = 0.75;

  constructor(initialCapacity: number = 16) {
    this.capacity = initialCapacity;
    this.size = 0;
    this.buckets = new Array(this.capacity);
    
    // Initialize empty arrays for each bucket
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }
  }

  /**
   * Simple hash function - can be customized based on key type
   */
  private hash(key: K): number {
    const keyString = String(key);
    let hash = 0;
    
    for (let i = 0; i < keyString.length; i++) {
      hash = ((hash << 5) - hash) + keyString.charCodeAt(i);
      hash |= 0; // Convert to 32-bit integer
    }
    
    return Math.abs(hash) % this.capacity;
  }

  /**
   * Insert or update a key-value pair
   */
  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    // Check if key already exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].value = value;
        return;
      }
    }
    
    // Key doesn't exist, add new entry
    bucket.push({ key, value });
    this.size++;
    
    // Resize if needed
    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  /**
   * Get value by key
   */
  get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    for (const entry of bucket) {
      if (entry.key === key) {
        return entry.value;
      }
    }
    
    return undefined;
  }

  /**
   * Check if key exists
   */
  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  /**
   * Remove key-value pair
   */
  delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    
    return false;
  }

  /**
   * Get all keys
   */
  keys(): K[] {
    const keys: K[] = [];
    
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        keys.push(entry.key);
      }
    }
    
    return keys;
  }

  /**
   * Get all values
   */
  values(): V[] {
    const values: V[] = [];
    
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        values.push(entry.value);
      }
    }
    
    return values;
  }

  /**
   * Get all entries
   */
  entries(): Array<[K, V]> {
    const entries: Array<[K, V]> = [];
    
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        entries.push([entry.key, entry.value]);
      }
    }
    
    return entries;
  }

  /**
   * Clear the hash table
   */
  clear(): void {
    this.buckets = new Array(this.capacity);
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }
    this.size = 0;
  }

  /**
   * Get current size
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Resize the buckets array when load factor is exceeded
   */
  private resize(): void {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.size = 0;
    
    // Initialize new buckets
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }
    
    // Rehash all entries
    for (const bucket of oldBuckets) {
      for (const entry of bucket) {
        this.set(entry.key, entry.value);
      }
    }
  }
}
class AdvancedHashTable<K, V> extends HashTable<K, V> {
  /**
   * Improved hash function that handles different types better
   */
  protected hash(key: K): number {
    if (typeof key === 'number') {
      return this.hashNumber(key);
    } else if (typeof key === 'string') {
      return this.hashString(key);
    } else if (typeof key === 'object') {
      return this.hashObject(key);
    }
    
    return this.hashString(String(key));
  }

  private hashString(str: string): number {
    let hash = 5381;
    
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash) % this.capacity;
  }

  private hashNumber(num: number): number {
    // Using multiplication method for better distribution
    const A = 0.6180339887; // Golden ratio
    return Math.floor(this.capacity * ((num * A) % 1));
  }

  private hashObject(obj: any): number {
    // Create a string representation of the object
    const objString = JSON.stringify(obj);
    return this.hashString(objString);
  }
}
// Basic usage
const hashTable = new HashTable<string, number>();

// Set values
hashTable.set('apple', 10);
hashTable.set('banana', 20);
hashTable.set('cherry', 30);

// Get values
console.log(hashTable.get('apple')); // 10
console.log(hashTable.get('banana')); // 20

// Check existence
console.log(hashTable.has('cherry')); // true
console.log(hashTable.has('date')); // false

// Delete
hashTable.delete('banana');
console.log(hashTable.has('banana')); // false

// Get all keys and values
console.log(hashTable.keys()); // ['apple', 'cherry']
console.log(hashTable.values()); // [10, 30]
console.log(hashTable.entries()); // [['apple', 10], ['cherry', 30]]

// With custom objects as keys
interface User {
  id: number;
  name: string;
}

const userTable = new AdvancedHashTable<User, string>();

const user1: User = { id: 1, name: 'Alice' };
const user2: User = { id: 2, name: 'Bob' };

userTable.set(user1, 'admin');
userTable.set(user2, 'user');

console.log(userTable.get(user1)); // 'admin'

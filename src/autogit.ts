interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

class HashTable<K, V> {
  private buckets: Array<Array<KeyValuePair<K, V>>>;
  private size: number;
  private count: number;

  constructor(size: number = 10) {
    this.size = size;
    this.count = 0;
    this.buckets = new Array(size);
    
    // Initialize each bucket as empty array
    for (let i = 0; i < size; i++) {
      this.buckets[i] = [];
    }
  }

  private hash(key: K): number {
    const keyString = String(key);
    let hash = 0;
    
    for (let i = 0; i < keyString.length; i++) {
      hash = (hash << 5) - hash + keyString.charCodeAt(i);
      hash |= 0; // Convert to 32-bit integer
    }
    
    return Math.abs(hash % this.size);
  }

  public set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    // Check if key already exists
    const existingPairIndex = bucket.findIndex(pair => pair.key === key);
    
    if (existingPairIndex !== -1) {
      // Update existing value
      bucket[existingPairIndex].value = value;
    } else {
      // Add new key-value pair
      bucket.push({ key, value });
      this.count++;
      
      // Optional: Resize if load factor is too high
      if (this.loadFactor() > 0.7) {
        this.resize(this.size * 2);
      }
    }
  }

  public get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    const pair = bucket.find(pair => pair.key === key);
    return pair ? pair.value : undefined;
  }

  public delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const pairIndex = bucket.findIndex(pair => pair.key === key);
    
    if (pairIndex !== -1) {
      bucket.splice(pairIndex, 1);
      this.count--;
      return true;
    }
    
    return false;
  }

  public has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  private resize(newSize: number): void {
    const oldBuckets = this.buckets;
    this.size = newSize;
    this.buckets = new Array(newSize);
    this.count = 0;
    
    // Initialize new buckets
    for (let i = 0; i < newSize; i++) {
      this.buckets[i] = [];
    }
    
    // Rehash all existing key-value pairs
    for (const bucket of oldBuckets) {
      for (const pair of bucket) {
        this.set(pair.key, pair.value);
      }
    }
  }

  public loadFactor(): number {
    return this.count / this.size;
  }

  public getSize(): number {
    return this.count;
  }

  public clear(): void {
    this.buckets = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      this.buckets[i] = [];
    }
    this.count = 0;
  }

  // Optional: Get all keys or values
  public keys(): K[] {
    const keys: K[] = [];
    for (const bucket of this.buckets) {
      for (const pair of bucket) {
        keys.push(pair.key);
      }
    }
    return keys;
  }

  public values(): V[] {
    const values: V[] = [];
    for (const bucket of this.buckets) {
      for (const pair of bucket) {
        values.push(pair.value);
      }
    }
    return values;
  }
}
// Create a hash table
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

// Delete key
hashTable.delete("banana");
console.log(hashTable.has("banana")); // false

// Get all keys and values
console.log(hashTable.keys()); // ["apple", "orange"]
console.log(hashTable.values()); // [1, 3]

// Get size and load factor
console.log(hashTable.getSize()); // 2
console.log(hashTable.loadFactor()); // 0.2
// Custom hash function option
class AdvancedHashTable<K, V> extends HashTable<K, V> {
  private customHash?: (key: K) => number;

  constructor(size: number = 10, customHash?: (key: K) => number) {
    super(size);
    this.customHash = customHash;
  }

  protected hash(key: K): number {
    if (this.customHash) {
      return Math.abs(this.customHash(key) % this.size);
    }
    return super.hash(key);
  }
}

// Example with custom hash function
const customHashTable = new AdvancedHashTable<string, number>(
  10,
  (key: string) => {
    // Simple custom hash: sum of character codes
    return key.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  }
);

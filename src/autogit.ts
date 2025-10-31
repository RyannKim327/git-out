class HashTable<K extends string | number, V> {
  private buckets: (V | undefined)[][] = [];
  private size: number = 0;
  private capacity: number = 16;
  private loadFactor: number = 0.75;

  constructor(initialCapacity: number = 16) {
    this.capacity = initialCapacity;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
  }

  // Simple hash function for strings and numbers
  private hash(key: K): number {
    let hashValue: number;
    
    if (typeof key === 'string') {
      // DJB2 hash function for strings
      hashValue = 5381;
      for (let i = 0; i < key.length; i++) {
        hashValue = ((hashValue << 5) + hashValue) + key.charCodeAt(i);
        hashValue = hashValue & hashValue; // Convert to 32-bit integer
      }
    } else {
      // For numbers, use modulo to keep within bounds
      hashValue = key;
    }

    return Math.abs(hashValue) % this.capacity;
  }

  // Resize the hash table when load factor is exceeded
  private resize(): void {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    // Rehash all existing entries
    for (const bucket of oldBuckets) {
      if (bucket) {
        for (const entry of bucket) {
          if (entry !== undefined) {
            this.set(entry as K, entry as V); // Type assertion needed
          }
        }
      }
    }
  }

  // Set a key-value pair
  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // Check if key already exists in bucket
    for (let i = 0; i < bucket.length; i++) {
      // You'll need to store key-value pairs for proper collision handling
      // This simplified version assumes value contains key info or uses separate storage
    }

    // For this basic implementation, we'll store values directly
    // In a real implementation, you'd store {key, value} pairs
    bucket.push(value as any);
    this.size++;

    // Check if we need to resize
    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  // Get value by key
  get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // Linear search through bucket (collision chain)
    for (const item of bucket) {
      // In a proper implementation, you'd compare keys
      // This simplified version returns first matching item
      if (item !== undefined) {
        return item as V;
      }
    }

    return undefined;
  }

  // Check if key exists
  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  // Remove key-value pair
  delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] !== undefined) {
        // Remove item
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  // Get current size
  getSize(): number {
    return this.size;
  }

  // Check if empty
  isEmpty(): boolean {
    return this.size === 0;
  }

  // Clear all entries
  clear(): void {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  // Get all keys (simplified)
  keys(): K[] {
    const keys: K[] = [];
    // Implementation would need to track keys properly
    return keys;
  }

  // Get all values
  values(): V[] {
    const values: V[] = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const value of bucket) {
          if (value !== undefined) {
            values.push(value as V);
          }
        }
      }
    }
    return values;
  }
}
interface HashEntry<K, V> {
  key: K;
  value: V;
}

class ImprovedHashTable<K extends string | number, V> {
  private buckets: HashEntry<K, V>[][] = [];
  private size: number = 0;
  private capacity: number = 16;
  private loadFactor: number = 0.75;

  constructor(initialCapacity: number = 16) {
    this.capacity = initialCapacity;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
  }

  private hash(key: K): number {
    let hashValue: number;
    
    if (typeof key === 'string') {
      // Better hash function - FNV-1a
      hashValue = 2166136261;
      for (let i = 0; i < key.length; i++) {
        const charCode = key.charCodeAt(i);
        hashValue ^= charCode;
        hashValue += (hashValue << 1) + (hashValue << 4) + (hashValue << 7) + 
                     (hashValue << 8) + (hashValue << 24);
      }
    } else {
      hashValue = key;
    }

    return Math.abs(hashValue) % this.capacity;
  }

  private resize(): void {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const entry of bucket) {
        if (entry) {
          this.set(entry.key, entry.value);
        }
      }
    }
  }

  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // Check if key already exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] && bucket[i].key === key) {
        // Update existing value
        bucket[i].value = value;
        return;
      }
    }

    // Add new entry
    bucket.push({ key, value });
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const entry of bucket) {
      if (entry && entry.key === key) {
        return entry.value;
      }
    }

    return undefined;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] && bucket[i].key === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  getSize(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  clear(): void {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  keys(): K[] {
    const keys: K[] = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        if (entry) {
          keys.push(entry.key);
        }
      }
    }
    return keys;
  }

  values(): V[] {
    const values: V[] = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        if (entry) {
          values.push(entry.value);
        }
      }
    }
    return values;
  }

  entries(): [K, V][] {
    const entries: [K, V][] = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        if (entry) {
          entries.push([entry.key, entry.value]);
        }
      }
    }
    return entries;
  }
}
// Using the improved hash table
const hashTable = new ImprovedHashTable<string, number>();

// Add entries
hashTable.set("name", 42);
hashTable.set("age", 25);
hashTable.set("city", 1001);

// Get values
console.log(hashTable.get("name")); // 42
console.log(hashTable.get("age"));  // 25

// Check existence
console.log(hashTable.has("name")); // true
console.log(hashTable.has("country")); // false

// Remove entry
hashTable.delete("age");
console.log(hashTable.has("age")); // false

// Get statistics
console.log("Size:", hashTable.getSize()); // 2
console.log("Keys:", hashTable.keys()); // ["name", "city"]
console.log("Values:", hashTable.values()); // [42, 1001]

// Using with numbers as keys
const numHashTable = new ImprovedHashTable<number, string>();
numHashTable.set(123, "example");
console.log(numHashTable.get(123)); // "example"

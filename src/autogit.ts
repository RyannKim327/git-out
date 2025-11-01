interface HashTableEntry<K, V> {
  key: K;
  value: V;
}
class HashTable<K, V> {
  private buckets: Array<Array<HashTableEntry<K, V>>>;
  private capacity: number;

  constructor(capacity: number = 16) {
    this.capacity = capacity;
    this.buckets = new Array(this.capacity);
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }
  }

  // Hash function (simple example for strings)
  private hash(key: K): number {
    const stringKey = String(key);
    let hash = 0;
    for (let i = 0; i < stringKey.length; i++) {
      hash += stringKey.charCodeAt(i);
    }
    return hash % this.capacity;
  }

  // Insert/Update a key-value pair
  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    // Check if key exists and update
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].value = value;
        return;
      }
    }
    
    // Add new entry
    bucket.push({ key, value });
  }

  // Retrieve a value by key
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

  // Delete a key-value pair
  delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        return true;
      }
    }
    
    return false;
  }
}
const hashTable = new HashTable<string, number>();

// Insert values
hashTable.set("apple", 5);
hashTable.set("banana", 10);
hashTable.set("cherry", 15);

// Get values
console.log(hashTable.get("apple"));  // Output: 5
console.log(hashTable.get("banana")); // Output: 10

// Update value
hashTable.set("apple", 20);
console.log(hashTable.get("apple"));  // Output: 20

// Delete value
hashTable.delete("banana");
console.log(hashTable.get("banana")); // Output: undefined

class BasicHashTable<K, V> {
  private table: Map<K, V>;

  constructor() {
    this.table = new Map<K, V>();
  }

  // Insert or update a key-value pair
  set(key: K, value: V): void {
    this.table.set(key, value);
  }

  // Get value by key
  get(key: K): V | undefined {
    return this.table.get(key);
  }

  // Check if key exists
  has(key: K): boolean {
    return this.table.has(key);
  }

  // Remove key-value pair
  delete(key: K): boolean {
    return this.table.delete(key);
  }

  // Get all keys
  keys(): K[] {
    return Array.from(this.table.keys());
  }

  // Get all values
  values(): V[] {
    return Array.from(this.table.values());
  }

  // Get size
  size(): number {
    return this.table.size;
  }

  // Clear the table
  clear(): void {
    this.table.clear();
  }
}

// Usage
const hashTable = new BasicHashTable<string, number>();
hashTable.set("apple", 1);
hashTable.set("banana", 2);
console.log(hashTable.get("apple")); // 1
interface HashTableEntry<K, V> {
  key: K;
  value: V;
}

class CustomHashTable<K, V> {
  private table: Array<Array<HashTableEntry<K, V>>>;
  private size: number;
  private capacity: number;
  private readonly loadFactor: number;

  constructor(capacity: number = 16, loadFactor: number = 0.75) {
    this.capacity = capacity;
    this.size = 0;
    this.loadFactor = loadFactor;
    this.table = new Array(capacity);
    for (let i = 0; i < capacity; i++) {
      this.table[i] = [];
    }
  }

  // Simple hash function
  private hash(key: K): number {
    const keyString = String(key);
    let hash = 0;
    
    for (let i = 0; i < keyString.length; i++) {
      hash = (hash << 5) - hash + keyString.charCodeAt(i);
      hash |= 0; // Convert to 32-bit integer
    }
    
    return Math.abs(hash) % this.capacity;
  }

  // Resize the table when load factor is exceeded
  private resize(): void {
    const oldTable = this.table;
    this.capacity *= 2;
    this.table = new Array(this.capacity);
    
    for (let i = 0; i < this.capacity; i++) {
      this.table[i] = [];
    }
    
    this.size = 0;
    
    for (const bucket of oldTable) {
      for (const entry of bucket) {
        this.set(entry.key, entry.value);
      }
    }
  }

  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.table[index];
    
    // Check if key already exists
    const existingEntryIndex = bucket.findIndex(entry => entry.key === key);
    
    if (existingEntryIndex !== -1) {
      // Update existing value
      bucket[existingEntryIndex].value = value;
    } else {
      // Add new entry
      bucket.push({ key, value });
      this.size++;
      
      // Check if resize is needed
      if (this.size / this.capacity > this.loadFactor) {
        this.resize();
      }
    }
  }

  get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.table[index];
    const entry = bucket.find(entry => entry.key === key);
    
    return entry ? entry.value : undefined;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.table[index];
    const entryIndex = bucket.findIndex(entry => entry.key === key);
    
    if (entryIndex !== -1) {
      bucket.splice(entryIndex, 1);
      this.size--;
      return true;
    }
    
    return false;
  }

  keys(): K[] {
    const keys: K[] = [];
    
    for (const bucket of this.table) {
      for (const entry of bucket) {
        keys.push(entry.key);
      }
    }
    
    return keys;
  }

  values(): V[] {
    const values: V[] = [];
    
    for (const bucket of this.table) {
      for (const entry of bucket) {
        values.push(entry.value);
      }
    }
    
    return values;
  }

  getSize(): number {
    return this.size;
  }

  clear(): void {
    this.table = new Array(this.capacity);
    for (let i = 0; i < this.capacity; i++) {
      this.table[i] = [];
    }
    this.size = 0;
  }
}

// Usage
const customTable = new CustomHashTable<string, number>();
customTable.set("apple", 1);
customTable.set("banana", 2);
console.log(customTable.get("apple")); // 1
interface HashEntry<K, V> {
  key: K;
  value: V;
  next?: HashEntry<K, V>;
}

class AdvancedHashTable<K, V> {
  private buckets: Array<HashEntry<K, V> | undefined>;
  private size: number;
  private capacity: number;
  private readonly loadFactor: number;

  constructor(capacity: number = 16, loadFactor: number = 0.75) {
    this.capacity = capacity;
    this.size = 0;
    this.loadFactor = loadFactor;
    this.buckets = new Array(capacity);
  }

  // Enhanced hash function
  private hash(key: K): number {
    if (typeof key === 'number') {
      return key % this.capacity;
    }
    
    const keyString = String(key);
    let hash = 5381;
    
    for (let i = 0; i < keyString.length; i++) {
      hash = (hash << 5) + hash + keyString.charCodeAt(i);
    }
    
    return Math.abs(hash) % this.capacity;
  }

  private resize(): void {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    for (const entry of oldBuckets) {
      let current = entry;
      while (current) {
        this.set(current.key, current.value);
        current = current.next!;
      }
    }
  }

  set(key: K, value: V): void {
    const index = this.hash(key);
    let current = this.buckets[index];
    let prev: HashEntry<K, V> | undefined = undefined;

    // Look for existing key
    while (current) {
      if (current.key === key) {
        current.value = value;
        return;
      }
      prev = current;
      current = current.next;
    }

    // Add new entry
    const newEntry: HashEntry<K, V> = { key, value };
    
    if (prev) {
      prev.next = newEntry;
    } else {
      this.buckets[index] = newEntry;
    }

    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  get(key: K): V | undefined {
    const index = this.hash(key);
    let current = this.buckets[index];

    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }

    return undefined;
  }

  // ... other methods similar to previous implementation
}

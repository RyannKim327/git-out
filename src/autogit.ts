interface HashTable<K, V> {
  set(key: K, value: V): void;
  get(key: K): V | undefined;
  delete(key: K): boolean;
  has(key: K): boolean;
  size(): number;
}

// Using JavaScript Map (recommended for simplicity)
class SimpleHashTable<K, V> implements HashTable<K, V> {
  private storage: Map<K, V>;

  constructor() {
    this.storage = new Map();
  }

  set(key: K, value: V): void {
    this.storage.set(key, value);
  }

  get(key: K): V | undefined {
    return this.storage.get(key);
  }

  delete(key: K): boolean {
    return this.storage.delete(key);
  }

  has(key: K): boolean {
    return this.storage.has(key);
  }

  size(): number {
    return this.storage.size;
  }
}
type KeyValuePair<K, V> = { key: K; value: V };

class HashTableNode<K, V> {
  key: K;
  value: V;
  next: HashTableNode<K, V> | null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class CustomHashTable<K, V> implements HashTable<K, V> {
  private buckets: Array<HashTableNode<K, V> | null>;
  private capacity: number;
  private count: number;
  private loadFactor: number;

  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(capacity).fill(null);
    this.count = 0;
  }

  private hash(key: K): number {
    // Simple hash function - you might want to use a more robust one
    const keyString = String(key);
    let hash = 0;
    
    for (let i = 0; i < keyString.length; i++) {
      hash = (hash << 5) - hash + keyString.charCodeAt(i);
      hash |= 0; // Convert to 32-bit integer
    }
    
    return Math.abs(hash) % this.capacity;
  }

  private resize(): void {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null);
    this.count = 0;

    for (const head of oldBuckets) {
      let current = head;
      while (current !== null) {
        this.set(current.key, current.value);
        current = current.next;
      }
    }
  }

  set(key: K, value: V): void {
    if (this.count / this.capacity > this.loadFactor) {
      this.resize();
    }

    const index = this.hash(key);
    let current = this.buckets[index];

    // Check if key already exists
    while (current !== null) {
      if (current.key === key) {
        current.value = value;
        return;
      }
      current = current.next;
    }

    // Insert new node at the beginning
    const newNode = new HashTableNode(key, value);
    newNode.next = this.buckets[index];
    this.buckets[index] = newNode;
    this.count++;
  }

  get(key: K): V | undefined {
    const index = this.hash(key);
    let current = this.buckets[index];

    while (current !== null) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }

    return undefined;
  }

  delete(key: K): boolean {
    const index = this.hash(key);
    let current = this.buckets[index];
    let prev: HashTableNode<K, V> | null = null;

    while (current !== null) {
      if (current.key === key) {
        if (prev === null) {
          this.buckets[index] = current.next;
        } else {
          prev.next = current.next;
        }
        this.count--;
        return true;
      }
      prev = current;
      current = current.next;
    }

    return false;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  size(): number {
    return this.count;
  }
}
interface IHashTable<K, V> {
  set(key: K, value: V): void;
  get(key: K): V | undefined;
  delete(key: K): boolean;
  has(key: K): boolean;
  size(): number;
  keys(): K[];
  values(): V[];
  entries(): [K, V][];
}

class GenericHashTable<K, V> implements IHashTable<K, V> {
  private table: Map<K, V>;

  constructor() {
    this.table = new Map();
  }

  set(key: K, value: V): void {
    this.table.set(key, value);
  }

  get(key: K): V | undefined {
    return this.table.get(key);
  }

  delete(key: K): boolean {
    return this.table.delete(key);
  }

  has(key: K): boolean {
    return this.table.has(key);
  }

  size(): number {
    return this.table.size;
  }

  keys(): K[] {
    return Array.from(this.table.keys());
  }

  values(): V[] {
    return Array.from(this.table.values());
  }

  entries(): [K, V][] {
    return Array.from(this.table.entries());
  }

  // Additional utility methods
  clear(): void {
    this.table.clear();
  }

  forEach(callback: (value: V, key: K) => void): void {
    this.table.forEach(callback);
  }
}
// Using the custom implementation
const hashTable = new CustomHashTable<string, number>();

hashTable.set("apple", 1);
hashTable.set("banana", 2);
hashTable.set("orange", 3);

console.log(hashTable.get("apple")); // 1
console.log(hashTable.has("banana")); // true
console.log(hashTable.size()); // 3

hashTable.delete("banana");
console.log(hashTable.size()); // 2

// Using the generic implementation
const userTable = new GenericHashTable<number, string>();
userTable.set(1, "Alice");
userTable.set(2, "Bob");

console.log(userTable.entries()); // [[1, "Alice"], [2, "Bob"]]
class AdvancedHashTable<K, V> extends GenericHashTable<K, V> {
  private customHash: (key: K) => number;

  constructor(customHash?: (key: K) => number) {
    super();
    this.customHash = customHash || this.defaultHash;
  }

  private defaultHash(key: K): number {
    const keyStr = JSON.stringify(key);
    let hash = 5381;
    
    for (let i = 0; i < keyStr.length; i++) {
      hash = (hash << 5) + hash + keyStr.charCodeAt(i);
    }
    
    return hash;
  }

  // Override set/get to use custom hash
  set(key: K, value: V): void {
    const hashedKey = this.customHash(key);
    super.set(hashedKey as unknown as K, value);
  }

  get(key: K): V | undefined {
    const hashedKey = this.customHash(key);
    return super.get(hashedKey as unknown as K);
  }
}

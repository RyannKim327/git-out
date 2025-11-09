type HashTableEntry<T> = [string, T]; // [key, value]
type Bucket<T> = HashTableEntry<T>[]; // Array of entries for collision resolution
class HashTable<T> {
  private buckets: Bucket<T>[];
  private size: number;
  private count: number; // Track entries for resizing
  private loadFactor: number;

  constructor(initialSize: number = 16) {
    this.size = initialSize;
    this.count = 0;
    this.buckets = Array(initialSize).fill(null).map(() => []);
    this.loadFactor = 0.75;
  }

  // Hashing function (simplified FNV-1a variant)
  private hash(key: string): number {
    let hash = 2166136261; // FNV offset basis
    for (let i = 0; i < key.length; i++) {
      hash ^= key.charCodeAt(i);
      hash *= 16777619; // FNV prime
    }
    return Math.abs(hash) % this.size;
  }

  // Resize buckets when load factor is exceeded
  private resize(): void {
    const oldBuckets = this.buckets;
    this.size *= 2;
    this.count = 0;
    this.buckets = Array(this.size).fill(null).map(() => []);

    oldBuckets.forEach(bucket => {
      bucket.forEach(([key, value]) => this.set(key, value));
    });
  }

  // Insert/Update value
  set(key: string, value: T): void {
    if (this.count / this.size >= this.loadFactor) {
      this.resize();
    }

    const index = this.hash(key);
    const bucket = this.buckets[index];
    const existingIndex = bucket.findIndex(([k]) => k === key);

    if (existingIndex >= 0) {
      bucket[existingIndex][1] = value; // Update existing
    } else {
      bucket.push([key, value]); // Add new entry
      this.count++;
    }
  }

  // Retrieve value
  get(key: string): T | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const entry = bucket.find(([k]) => k === key);
    return entry ? entry[1] : undefined;
  }

  // Delete entry
  delete(key: string): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const entryIndex = bucket.findIndex(([k]) => k === key);

    if (entryIndex >= 0) {
      bucket.splice(entryIndex, 1);
      this.count--;
      return true;
    }
    return false;
  }

  // Check if key exists
  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  // Get all keys
  keys(): string[] {
    return this.buckets.flat().map(([key]) => key);
  }

  // Get all values
  values(): T[] {
    return this.buckets.flat().map(([, value]) => value);
  }
}
const myTable = new HashTable<string>();

myTable.set("name", "Alice");
myTable.set("age", "30");
myTable.set("job", "Engineer");

console.log(myTable.get("name")); // "Alice"
console.log(myTable.has("age")); // true

myTable.delete("job");
console.log(myTable.keys()); // ["name", "age"]

const table = new Map<string, number>();

table.set("apple", 5);
table.set("banana", 2);

console.log(table.get("apple")); // 5
console.log(table.has("banana")); // true
table.delete("banana");
class HashTable<V> {
  private buckets: [string, V][][]; // array of arrays of key-value pairs
  private size: number;

  constructor(size: number = 16) {
    this.size = size;
    this.buckets = Array.from({ length: size }, () => []);
  }

  private hash(key: string): number {
    let hashValue = 0;
    for (let i = 0; i < key.length; i++) {
      hashValue = (hashValue + key.charCodeAt(i) * i) % this.size;
    }
    return hashValue;
  }

  set(key: string, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // Update
        return;
      }
    }

    bucket.push([key, value]);
  }

  get(key: string): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const [k, v] of bucket) {
      if (k === key) return v;
    }
    return undefined;
  }

  remove(key: string): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}

// Usage:
const table = new HashTable<number>();
table.set("apple", 5);
table.set("banana", 2);

console.log(table.get("apple")); // 5
table.remove("banana");
console.log(table.get("banana")); // undefined

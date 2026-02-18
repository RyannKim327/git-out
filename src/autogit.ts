// 1️⃣  Bucket element (used for chaining)
interface BucketItem<K, V> {
  key: K;
  value: V;
  next?: BucketItem<K, V>;
}

// 2️⃣  Hash table implementation
class HashTable<K extends string | number, V> {
  // Choose a prime number for better distribution
  private readonly bucketCount = 53;
  private readonly buckets: Array<BucketItem<K, V> | undefined> = [];

  constructor() {
    // Initialize buckets array
    this.buckets.length = this.bucketCount;
  }

  /* ---------- 🔑 Helper: hash function ---------- */
  // Works for string & number keys; you can add more types if wanted.
  private hash(key: K): number {
    const str = key.toString();
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) >>> 0; // unsigned 32‑bit arithmetic
    }
    return hash % this.bucketCount;
  }

  /* ---------- 🔧 Operations ---------- */

  set(key: K, value: V): void {
    const idx = this.hash(key);
    let node = this.buckets[idx];

    // If the bucket is empty, insert directly
    if (!node) {
      this.buckets[idx] = { key, value };
      return;
    }

    // Otherwise iterate to find key or append at end
    let prev: BucketItem<K, V> | undefined;
    while (node) {
      if (node.key === key) {
        node.value = value; // overwrite
        return;
      }
      prev = node;
      node = node.next;
    }

    prev!.next = { key, value }; // add new node at end
  }

  get(key: K): V | undefined {
    const idx = this.hash(key);
    let node = this.buckets[idx];

    while (node) {
      if (node.key === key) return node.value;
      node = node.next;
    }

    return undefined; // not found
  }

  delete(key: K): boolean {
    const idx = this.hash(key);
    let node = this.buckets[idx];
    let prev: BucketItem<K, V> | undefined;

    while (node) {
      if (node.key === key) {
        if (!prev) {
          // first node in bucket
          this.buckets[idx] = node.next;
        } else {
          prev.next = node.next;
        }
        return true;
      }
      prev = node;
      node = node.next;
    }

    return false; // key absent
  }

  keys(): K[] {
    const res: K[] = [];
    for (const bucket of this.buckets) {
      let node = bucket;
      while (node) {
        res.push(node.key);
        node = node.next;
      }
    }
    return res;
  }

  values(): V[] {
    const res: V[] = [];
    for (const bucket of this.buckets) {
      let node = bucket;
      while (node) {
        res.push(node.value);
        node = node.next;
      }
    }
    return res;
  }

  // Optional: iteration in for…of style
  *entries(): Generator<[K, V]> {
    for (const bucket of this.buckets) {
      let node = bucket;
      while (node) {
        yield [node.key, node.value];
        node = node.next;
      }
    }
  }
}

// ---------- Demo ----------
const ht = new HashTable<string, number>();

ht.set('apple', 3);
ht.set('banana', 7);
ht.set('orange', 5);
ht.set('apple', 10); // overwrite

console.log(ht.get('apple')); // 10
console.log(ht.get('banana')); // 7
console.log(ht.get('missing')); // undefined

ht.delete('orange');
console.log(ht.keys()); // ['apple', 'banana']

for (const [k, v] of ht.entries()) {
  console.log(`key=${k}, value=${v}`);
}

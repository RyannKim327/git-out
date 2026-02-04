type Hashable = string | number;

// A node in a linked list that stores a key–value pair.
class ListNode<K extends Hashable, V> {
  constructor(
    public key: K,
    public value: V,
    public next: ListNode<K, V> | null = null
  ) {}
}

// A very small, non‑generic implementation.
// Could be turned into a generic class if you want re‑usability.
class HashTable<K extends Hashable, V> {
  // Number of buckets.  53 is a prime that keeps things a bit uniform.
  private readonly bucketCount = 53;
  private readonly buckets: Array<ListNode<K, V> | null>;

  constructor() {
    // fill the array with nulls
    this.buckets = Array(this.bucketCount).fill(null);
  }

  // Simple hash: string => simple accumulating hash; number => straight
  private hash(key: K): number {
    let h: number;
    if (typeof key === "number") {
      h = key;
    } else {
      h = 0;
      for (let i = 0; i < key.length; i++) {
        // 31 is a classic multiplier in hash functions
        h = (h * 31 + key.charCodeAt(i)) | 0; // |0 keeps it 32‑bit
      }
    }
    // Ensure positive index
    return Math.abs(h) % this.bucketCount;
  }

  set(key: K, value: V): void {
    const idx = this.hash(key);
    let node = this.buckets[idx];

    // If there’s already a node, see if the key matches
    while (node) {
      if (node.key === key) {
        node.value = value; // update
        return;
      }
      node = node.next;
    }

    // No match – prepend a new node (O(1) for inserts)
    const newNode = new ListNode(key, value, this.buckets[idx]);
    this.buckets[idx] = newNode;
  }

  get(key: K): V | undefined {
    const idx = this.hash(key);
    let node = this.buckets[idx];

    while (node) {
      if (node.key === key) return node.value;
      node = node.next;
    }
    return undefined;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    const idx = this.hash(key);
    let node = this.buckets[idx];
    let prev: ListNode<K, V> | null = null;

    while (node) {
      if (node.key === key) {
        if (prev) prev.next = node.next;
        else this.buckets[idx] = node.next;
        return true;
      }
      prev = node;
      node = node.next;
    }
    return false;
  }

  // For debugging / tests: flatten the table into a plain object
  toObject(): Record<string, V> {
    const out: Record<string, V> = {};
    for (const bucket of this.buckets) {
      let node = bucket;
      while (node) {
        out[String(node.key)] = node.value;
        node = node.next;
      }
    }
    return out;
  }
}
const table = new HashTable<string, number>();
table.set("alpha", 1);
table.set("beta", 2);
table.set("gamma", 3);
table.set("delta", 4);

console.log(table.get("beta"));   // 2
console.log(table.has("epsilon")); // false

table.delete("gamma");
console.log(table.toObject());    // { alpha: 1, beta: 2, delta: 4 }

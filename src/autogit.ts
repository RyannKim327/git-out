// A single node in a bucket's linked list
class Node<K, V> {
  constructor(
    public key: K,
    public value: V,
    public next: Node<K, V> | null = null
  ) {}
}

export class HashTable<K, V> {
  private buckets: Array<Node<K, V> | null>;
  private count = 0;

  constructor(private capacity = 31) {
    this.buckets = new Array<Node<K, V> | null>(capacity).fill(null);
  }

  // --- public API ----------------------------------------------------------

  size(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  set(key: K, value: V): void {
    const idx = this.indexFor(key);
    let node = this.buckets[idx];

    // Update existing key
    while (node) {
      if (node.key === key) {
        node.value = value;
        return;
      }
      node = node.next;
    }

    // Insert new key
    const head = this.buckets[idx];
    this.buckets[idx] = new Node(key, value, head);
    this.count++;

    // Optional: resize when load factor > 0.75
    if (this.count / this.capacity > 0.75) this.grow();
  }

  get(key: K): V | undefined {
    const idx = this.indexFor(key);
    let node = this.buckets[idx];
    while (node) {
      if (node.key === key) return node.value;
      node = node.next;
    }
    return undefined;
  }

  delete(key: K): boolean {
    const idx = this.indexFor(key);
    let node = this.buckets[idx];
    let prev: Node<K, V> | null = null;

    while (node) {
      if (node.key === key) {
        if (prev) prev.next = node.next;
        else this.buckets[idx] = node.next;
        this.count--;
        return true;
      }
      prev = node;
      node = node.next;
    }
    return false;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  keys(): K[] {
    const out: K[] = [];
    for (let i = 0; i < this.capacity; i++) {
      let node = this.buckets[i];
      while (node) {
        out.push(node.key);
        node = node.next;
      }
    }
    return out;
  }

  values(): V[] {
    const out: V[] = [];
    for (let i = 0; i < this.capacity; i++) {
      let node = this.buckets[i];
      while (node) {
        out.push(node.value);
        node = node.next;
      }
    }
    return out;
  }

  entries(): Array<[K, V]> {
    const out: Array<[K, V]> = [];
    for (let i = 0; i < this.capacity; i++) {
      let node = this.buckets[i];
      while (node) {
        out.push([node.key, node.value]);
        node = node.next;
      }
    }
    return out;
  }

  // --- helpers -------------------------------------------------------------

  private indexFor(key: K): number {
    // Simple hash for primitives; override for custom objects.
    const str = String(key);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash = hash | 0; // 32-bit int
    }
    return Math.abs(hash) % this.capacity;
  }

  private grow(): void {
    const oldEntries = this.entries();
    this.capacity *= 2;
    this.buckets = new Array<Node<K, V> | null>(this.capacity).fill(null);
    this.count = 0; // will be recalculated
    for (const [k, v] of oldEntries) this.set(k, v);
  }
}
const ht = new HashTable<string, number>();
ht.set("apple", 5);
ht.set("banana", 7);
console.log(ht.get("apple"));   // 5
ht.delete("apple");
console.log(ht.has("apple"));   // false
console.log(ht.entries());      // [ [ 'banana', 7 ] ]

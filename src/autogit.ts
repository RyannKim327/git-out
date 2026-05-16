// A simple hash table that stores key/value pairs.
// Collisions are resolved via separate chaining (linked lists).
export class SimpleHashTable<K, V> {
  private buckets: Array<LinkedListNode<K, V> | null>;
  private _size: number;
  private _count: number;
  private readonly loadFactorThreshold: number; // e.g. 0.75

  constructor(initSize = 16, loadFactor = 0.75) {
    this.buckets = new Array(initSize).fill(null);
    this._size = initSize;
    this._count = 0;
    this.loadFactorThreshold = loadFactor;
  }

  // Public API
  set(key: K, value: V): void { /* ... */ }
  get(key: K): V | undefined { /* ... */ }
  delete(key: K): boolean { /* ... */ }
  has(key: K): boolean { /* ... */ }
  clear(): void { /* ... */ }
  get size(): number { return this._count; }
  // Optionally:
  // values(), keys(), entries()
}
class LinkedListNode<K, V> {
  key: K;
  value: V;
  next: LinkedListNode<K, V> | null;

  constructor(key: K, value: V, next: LinkedListNode<K, V> | null = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}
private getHash(key: K): number {
  // Simple implementation: works for string & number keys.
  const strKey = typeof key === 'string' ? key : String(key);
  let hash = 5381; // djb2 seed
  for (let i = 0; i < strKey.length; i++) {
    hash = (hash * 33) ^ strKey.charCodeAt(i);
  }
  // Ensure positive index and wrap around bucket count.
  return Math.abs(hash) % this._size;
}
set(key: K, value: V): void {
  const index = this.getHash(key);

  let node = this.buckets[index];
  while (node) {
    if (this.equals(node.key, key)) {
      node.value = value;      // Update existing
      return;
    }
    node = node.next;
  }

  // Insert new node at front of chain
  const newNode = new LinkedListNode(key, value, this.buckets[index]);
  this.buckets[index] = newNode;
  this._count++;

  if (this._count / this._size > this.loadFactorThreshold) {
    this.resize();
  }
}

get(key: K): V | undefined {
  const index = this.getHash(key);
  let node = this.buckets[index];
  while (node) {
    if (this.equals(node.key, key)) {
      return node.value;
    }
    node = node.next;
  }
  return undefined;
}

delete(key: K): boolean {
  const index = this.getHash(key);
  let node = this.buckets[index];
  let prev: LinkedListNode<K, V> | null = null;

  while (node) {
    if (this.equals(node.key, key)) {
      if (prev) prev.next = node.next;
      else this.buckets[index] = node.next;
      this._count--;
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

clear(): void {
  this.buckets = new Array(this._size).fill(null);
  this._count = 0;
}
private equals(a: K, b: K): boolean {
  return a === b;
}
private resize(): void {
  const oldBuckets = this.buckets;
  this._size *= 2;                 // Classic, double the bucket count
  this.buckets = new Array(this._size).fill(null);
  this._count = 0;

  for (const bucket of oldBuckets) {
    let node = bucket;
    while (node) {
      this.set(node.key, node.value); // Re‑hash & insert
      node = node.next;
    }
  }
}
values(): V[] {
  const vals: V[] = [];
  for (const bucket of this.buckets) {
    let node = bucket;
    while (node) {
      vals.push(node.value);
      node = node.next;
    }
  }
  return vals;
}
*entries(): IterableIterator<[K, V]> {
  for (const bucket of this.buckets) {
    let node = bucket;
    while (node) {
      yield [node.key, node.value];
      node = node.next;
    }
  }
}
const ht = new SimpleHashTable<string, number>();

ht.set('apple', 3);
ht.set('banana', 



---

**Support Pollinations.AI:**

---

🌸 **Ad** 🌸
Powered by Pollinations.AI free text APIs. [Support our mission](https://pollinations.ai/redirect/kofi) to keep AI accessible for everyone.

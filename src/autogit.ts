type HashTableEntry<K, V> = { key: K; value: V };

class HashTable<K, V> {
    private buckets: Array<Array<HashTableEntry<K, V>>>;
    private count: number = 0;
    private loadFactor: number = 0.75;
    private initialCapacity: number = 16;

    constructor(
        initialCapacity: number = 16,
        loadFactor: number = 0.75
    ) {
        this.initialCapacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.buckets = new Array(initialCapacity);
        for (let i = 0; i < initialCapacity; i++) {
            this.buckets[i] = [];
        }
    }

    // Basic Operations
    public set(key: K, value: V): void {
        this.maybeResize();
        const index = this.getBucketIndex(key);
        const bucket = this.buckets[index];

        // Check for existing key
        for (const entry of bucket) {
            if (this.keysEqual(entry.key, key)) {
                entry.value = value; // Update existing
                return;
            }
        }

        // Add new entry
        bucket.push({ key, value });
        this.count++;
    }

    public get(key: K): V | undefined {
        const bucket = this.buckets[this.getBucketIndex(key)];
        for (const entry of bucket) {
            if (this.keysEqual(entry.key, key)) {
                return entry.value;
            }
        }
        return undefined;
    }

    public delete(key: K): boolean {
        const index = this.getBucketIndex(key);
        const bucket = this.buckets[index];
        const initialLength = bucket.length;

        // Filter out the entry to delete
        this.buckets[index] = bucket.filter(entry => !this.keysEqual(entry.key, key));
        
        if (this.buckets[index].length !== initialLength) {
            this.count--;
            return true;
        }
        return false;
    }

    // Utility Methods
    private hash(key: K): number {
        const keyString = String(key);
        let hash = 0;
        const prime = 31;

        for (let i = 0; i < keyString.length; i++) {
            hash = prime * hash + keyString.charCodeAt(i);
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash;
    }

    private getBucketIndex(key: K): number {
        let hashValue = this.hash(key);
        if (hashValue < 0) hashValue = -hashValue; // Ensure non-negative
        return hashValue % this.buckets.length;
    }

    private keysEqual(key1: K, key2: K): boolean {
        // Use SameValueZero algorithm (similar to === but handles NaN)
        return key1 === key2 || (key1 !== key1 && key2 !== key2);
    }

    // Resize Management
    private maybeResize(): void {
        if (this.count / this.buckets.length > this.loadFactor) {
            this.resize(this.buckets.length * 2);
        }
    }

    private resize(newCapacity: number): void {
        const oldBuckets = this.buckets;
        this.buckets = new Array(newCapacity);
        this.count = 0;

        for (let i = 0; i < newCapacity; i++) {
            this.buckets[i] = [];
        }

        for (const bucket of oldBuckets) {
            for (const entry of bucket) {
                this.set(entry.key, entry.value);
            }
        }
    }

    // Additional Helpers
    public size(): number {
        return this.count;
    }

    public contains(key: K): boolean {
        return this.get(key) !== undefined;
    }

    public getCapacity(): number {
        return this.buckets.length;
    }
}
const hashTable = new HashTable<string, number>();

// Set values
hashTable.set("apple", 10);
hashTable.set("banana", 5);
hashTable.set("orange", 8);

// Get values
console.log(hashTable.get("apple"));    // 10
console.log(hashTable.get("grape"));    // undefined

// Update value
hashTable.set("apple", 15);
console.log(hashTable.get("apple"));    // 15

// Delete value
hashTable.delete("banana");
console.log(hashTable.get("banana"));   // undefined

// Check size
console.log(hashTable.size());          // 2
interface CustomKey {
    id: number;
    name: string;
}

// Create hash table with custom key handling
const objTable = new HashTable<CustomKey, string>(
    16,
    0.75,
    {
        hash: (key) => key.id, // Simple ID-based hash
        keysEqual: (a, b) => a.id === b.id && a.name === b.name
    }
);

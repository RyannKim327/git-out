type HashTableEntry<K, V> = { key: K; value: V };

class HashTable<K extends string | number, V> {
    private buckets: Array<HashTableEntry<K, V>[]>;
    private initialCapacity: number;
    private _size = 0;
    private loadFactor = 0.7;

    constructor(capacity: number = 128) {
        this.initialCapacity = capacity;
        this.buckets = new Array(capacity).fill(null).map(() => []);
    }

    /**
     * Basic hash function - converts key to index
     */
    private hash(key: K): number {
        const keyString = String(key);
        let hash = 0;
        
        for (let i = 0; i < keyString.length; i++) {
            hash = ((hash << 5) - hash) + keyString.charCodeAt(i);
            hash |= 0; // Convert to 32-bit integer
        }
        
        return Math.abs(hash % this.buckets.length);
    }

    /**
     * Insert or update a key-value pair
     */
    set(key: K, value: V): void {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        const existingIndex = bucket.findIndex(entry => entry.key === key);

        if (existingIndex >= 0) {
            // Update existing entry
            bucket[existingIndex].value = value;
        } else {
            // Add new entry
            bucket.push({ key, value });
            this._size++;
        }

        // Resize if needed
        if (this.size / this.buckets.length > this.loadFactor) {
            this.resize();
        }
    }

    /**
     * Get value by key, returns undefined if not found
     */
    get(key: K): V | undefined {
        const index = this.hash(key);
        const entry = this.buckets[index].find(entry => entry.key === key);
        return entry?.value;
    }

    /**
     * Delete entry by key, returns true if successful
     */
    delete(key: K): boolean {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        const initialLength = bucket.length;
        
        this.buckets[index] = bucket.filter(entry => entry.key !== key);
        const wasDeleted = initialLength !== this.buckets[index].length;
        
        if (wasDeleted) this._size--;
        return wasDeleted;
    }

    /**
     * Double capacity and rehash all entries
     */
    private resize(): void {
        const oldBuckets = this.buckets;
        const newCapacity = this.buckets.length * 2;
        
        this.buckets = new Array(newCapacity).fill(null).map(() => []);
        this._size = 0; // Reset size, will be recalculated during rehashing
        
        for (const bucket of oldBuckets) {
            for (const { key, value } of bucket) {
                this.set(key, value);
            }
        }
    }

    get size(): number {
        return this._size;
    }

    /**
     * Get all key-value pairs
     */
    entries(): [K, V][] {
        return this.buckets
            .flatMap(bucket => bucket)
            .map(entry => [entry.key, entry.value]);
    }

    /**
     * Get all keys
     */
    keys(): K[] {
        return this.buckets.flatMap(bucket => bucket.map(entry => entry.key));
    }

    /**
     * Get all values
     */
    values(): V[] {
        return this.buckets.flatMap(bucket => bucket.map(entry => entry.value));
    }
}
const phoneBook = new HashTable<string, number>();

phoneBook.set("Alice", 1234567890);
phoneBook.set("Bob", 9876543210);

console.log(phoneBook.get("Alice"));  // 1234567890
console.log(phoneBook.size);         // 2

phoneBook.delete("Bob");
console.log(phoneBook.get("Bob"));    // undefined

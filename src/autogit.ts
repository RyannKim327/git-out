type KeyValuePair<K, V> = {
    key: K;
    value: V;
};
class HashTable<K, V> {
    // The main array of buckets. Each bucket will be an array of KeyValuePair.
    private buckets: Array<Array<KeyValuePair<K, V>>>;
    // Current number of key-value pairs stored in the hash table.
    private _size: number;
    // The current capacity (number of buckets) of the hash table.
    private capacity: number;
    // When the load factor exceeds this, the table will resize.
    private loadFactorThreshold: number;
    // Factor by which to grow the capacity during resizing.
    private growthFactor: number;

    /**
     * Creates a new HashTable instance.
     * @param initialCapacity The initial number of buckets for the hash table. Must be at least 1.
     * @param loadFactorThreshold The ratio of items to buckets before resizing occurs (default: 0.75).
     * @param growthFactor The factor by which the capacity grows during resizing (default: 2).
     */
    constructor(
        initialCapacity: number = 16, // Default to 16 buckets
        loadFactorThreshold: number = 0.75,
        growthFactor: number = 2
    ) {
        if (initialCapacity < 1) {
            throw new Error("Initial capacity must be at least 1.");
        }
        if (loadFactorThreshold <= 0) {
            throw new Error("Load factor threshold must be greater than 0.");
        }
        if (growthFactor <= 1) {
            throw new Error("Growth factor must be greater than 1.");
        }

        this.capacity = initialCapacity;
        // Initialize buckets with empty arrays for separate chaining
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this._size = 0;
        this.loadFactorThreshold = loadFactorThreshold;
        this.growthFactor = growthFactor;
    }

    /**
     * Returns the number of key-value pairs in the hash table.
     */
    get size(): number {
        return this._size;
    }

    /**
     * Calculates a hash code for a given key and maps it to a bucket index.
     * This is a simple hash function suitable for strings and numbers.
     * For complex objects, you'd need a more robust approach or require keys to be hashable.
     * @param key The key to hash.
     * @returns The index of the bucket for the given key.
     */
    private hash(key: K): number {
        // Convert the key to a string for consistent hashing.
        // For numbers, toString() works fine. For objects, it's Object.prototype.toString()
        // unless you've overridden it, which might not produce unique strings.
        const keyString = String(key);
        let hash = 0;
        for (let i = 0; i < keyString.length; i++) {
            const char = keyString.charCodeAt(i);
            hash = (hash << 5) - hash + char; // A common polynomial rolling hash variant
            hash |= 0; // Convert to 32bit integer (ensures consistent range)
        }
        // Use Math.abs to handle potential negative hash values and modulo by capacity
        // to get an index within the bounds of the buckets array.
        return Math.abs(hash) % this.capacity;
    }

    /**
     * Inserts a key-value pair into the hash table, or updates the value if the key already exists.
     * @param key The key to insert or update.
     * @param value The value associated with the key.
     * @returns The HashTable instance, allowing for method chaining.
     */
    set(key: K, value: V): this {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        // Check if the key already exists in the bucket (collision resolution part)
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket[i].value = value; // Update existing value
                return this; // Key found and updated, no need to add new item
            }
        }

        // Key not found, add a new key-value pair to the bucket
        bucket.push({ key, value });
        this._size++;

        // Check load factor and resize if necessary
        if (this._size / this.capacity > this.loadFactorThreshold) {
            this.resize();
        }

        return this;
    }

    /**
     * Retrieves the value associated with the given key.
     * @param key The key to look up.
     * @returns The value associated with the key, or `undefined` if the key is not found.
     */
    get(key: K): V | undefined {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (const pair of bucket) {
            if (pair.key === key) {
                return pair.value;
            }
        }
        return undefined; // Key not found
    }

    /**
     * Checks if the hash table contains the given key.
     * @param key The key to check for.
     * @returns `true` if the key exists, `false` otherwise.
     */
    has(key: K): boolean {
        return this.get(key) !== undefined;
    }

    /**
     * Removes a key-value pair from the hash table.
     * @param key The key of the pair to remove.
     * @returns `true` if the key was found and deleted, `false` otherwise.
     */
    delete(key: K): boolean {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket.splice(i, 1); // Remove the item from the bucket
                this._size--;
                return true;
            }
        }
        return false; // Key not found
    }

    /**
     * Returns an array of all keys currently in the hash table.
     * @returns An array of keys.
     */
    keys(): K[] {
        const allKeys: K[] = [];
        for (const bucket of this.buckets) {
            for (const pair of bucket) {
                allKeys.push(pair.key);
            }
        }
        return allKeys;
    }

    /**
     * Returns an array of all values currently in the hash table.
     * @returns An array of values.
     */
    values(): V[] {
        const allValues: V[] = [];
        for (const bucket of this.buckets) {
            for (const pair of bucket) {
                allValues.push(pair.value);
            }
        }
        return allValues;
    }

    /**
     * Returns an array of all key-value pairs currently in the hash table.
     * @returns An array of KeyValuePair objects.
     */
    entries(): Array<KeyValuePair<K, V>> {
        const allEntries: Array<KeyValuePair<K, V>> = [];
        for (const bucket of this.buckets) {
            for (const pair of bucket) {
                allEntries.push({ key: pair.key, value: pair.value });
            }
        }
        return allEntries;
    }

    /**
     * Clears all key-value pairs from the hash table, resetting its size and capacity.
     */
    clear(): void {
        this.capacity = 16; // Reset to initial capacity (or keep previous capacity)
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this._size = 0;
    }

    /**
     * Increases the capacity of the hash table and re-hashes all existing key-value pairs
     * into the new, larger set of buckets.
     */
    private resize(): void {
        const oldBuckets = this.buckets; // Store reference to old buckets
        this.capacity *= this.growthFactor; // Double the capacity
        this.buckets = new Array(this.capacity).fill(null).map(() => []); // Create new, empty buckets
        this._size = 0; // Reset size, it will be recalculated by set() calls

        // Re-hash and insert all existing key-value pairs into the new buckets
        for (const bucket of oldBuckets) {
            for (const { key, value } of bucket) {
                this.set(key, value);
            }
        }
    }
}
// Create a new hash table for string keys and number values
const myHashTable = new HashTable<string, number>();

console.log("Initial size:", myHashTable.size); // 0

// Set some values
myHashTable.set("apple", 10).set("banana", 20).set("cherry", 30);
myHashTable.set("date", 40);

console.log("Size after sets:", myHashTable.size); // 4

// Get values
console.log("Value of 'apple':", myHashTable.get("apple"));     // 10
console.log("Value of 'grape':", myHashTable.get("grape"));     // undefined

// Update a value
myHashTable.set("apple", 15);
console.log("Updated value of 'apple':", myHashTable.get("apple")); // 15
console.log("Size after update:", myHashTable.size);            // Still 4

// Check for existence
console.log("Has 'banana'?", myHashTable.has("banana"));       // true
console.log("Has 'fig'?", myHashTable.has("fig"));             // false

// Delete a value
console.log("Deleting 'cherry':", myHashTable.delete("cherry")); // true
console.log("Value of 'cherry' after delete:", myHashTable.get("cherry")); // undefined
console.log("Size after delete:", myHashTable.size);             // 3

// Try to delete a non-existent key
console.log("Deleting 'grape':", myHashTable.delete("grape"));   // false

console.log("All keys:", myHashTable.keys());     // ['apple', 'banana', 'date']
console.log("All values:", myHashTable.values());   // [15, 20, 40]
console.log("All entries:", myHashTable.entries()); // [{ key: 'apple', value: 15 }, { key: 'banana', value: 20 }, { key: 'date', value: 40 }]

// --- Demonstration of resizing (will happen automatically) ---
const smallHashTable = new HashTable<number, string>(3, 0.5); // Small capacity, low threshold
console.log("\nSmall Hash Table - Initial Capacity:", smallHashTable.capacity);

smallHashTable.set(1, "one"); // size=1, cap=3, load=0.33
console.log(`Set 1: size=${smallHashTable.size}, capacity=${smallHashTable.capacity}, get(1)=${smallHashTable.get(1)}`);
smallHashTable.set(2, "two"); // size=2, cap=3, load=0.66 -> should trigger resize
console.log(`Set 2: size=${smallHashTable.size}, capacity=${smallHashTable.capacity}, get(2)=${smallHashTable.get(2)}`); // Capacity should have doubled (e.g., 6)
console.log(`Get 1 after resize: ${smallHashTable.get(1)}`); // Should still work
smallHashTable.set(3, "three"); // size=3, cap=6, load=0.5
console.log(`Set 3: size=${smallHashTable.size}, capacity=${smallHashTable.capacity}, get(3)=${smallHashTable.get(3)}`);

console.log("Keys in small table:", smallHashTable.keys());
smallHashTable.clear();
console.log("Size after clear:", smallHashTable.size); // 0

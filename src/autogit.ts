interface HashTable<K, V> {
    [key: string]: V;
}

class BasicHashTable<K extends string, V> {
    private table: HashTable<K, V> = {};

    set(key: K, value: V): void {
        this.table[key] = value;
    }

    get(key: K): V | undefined {
        return this.table[key];
    }

    delete(key: K): boolean {
        if (this.has(key)) {
            delete this.table[key];
            return true;
        }
        return false;
    }

    has(key: K): boolean {
        return key in this.table;
    }

    keys(): K[] {
        return Object.keys(this.table) as K[];
    }

    values(): V[] {
        return Object.values(this.table);
    }

    clear(): void {
        this.table = {};
    }

    size(): number {
        return Object.keys(this.table).length;
    }
}

// Usage
const table = new BasicHashTable<string, number>();
table.set("apple", 1);
table.set("banana", 2);
console.log(table.get("apple")); // 1
interface KeyValuePair<K, V> {
    key: K;
    value: V;
}

class HashTable<K, V> {
    private table: Array<Array<KeyValuePair<K, V>>>;
    private size: number;
    private count: number = 0;
    private readonly loadFactor: number = 0.75;

    constructor(size: number = 16) {
        this.size = size;
        this.table = new Array(size);
        for (let i = 0; i < size; i++) {
            this.table[i] = [];
        }
    }

    private hash(key: K): number {
        const keyString = String(key);
        let hash = 0;
        
        for (let i = 0; i < keyString.length; i++) {
            hash = ((hash << 5) - hash) + keyString.charCodeAt(i);
            hash |= 0; // Convert to 32-bit integer
        }
        
        return Math.abs(hash) % this.size;
    }

    private resize(): void {
        const oldTable = this.table;
        this.size *= 2;
        this.table = new Array(this.size);
        this.count = 0;

        for (let i = 0; i < this.size; i++) {
            this.table[i] = [];
        }

        for (const bucket of oldTable) {
            for (const item of bucket) {
                this.set(item.key, item.value);
            }
        }
    }

    set(key: K, value: V): void {
        if (this.count / this.size > this.loadFactor) {
            this.resize();
        }

        const index = this.hash(key);
        const bucket = this.table[index];

        // Check if key already exists
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket[i].value = value;
                return;
            }
        }

        // Add new key-value pair
        bucket.push({ key, value });
        this.count++;
    }

    get(key: K): V | undefined {
        const index = this.hash(key);
        const bucket = this.table[index];

        for (const item of bucket) {
            if (item.key === key) {
                return item.value;
            }
        }

        return undefined;
    }

    delete(key: K): boolean {
        const index = this.hash(key);
        const bucket = this.table[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket.splice(i, 1);
                this.count--;
                return true;
            }
        }

        return false;
    }

    has(key: K): boolean {
        return this.get(key) !== undefined;
    }

    keys(): K[] {
        const keys: K[] = [];
        for (const bucket of this.table) {
            for (const item of bucket) {
                keys.push(item.key);
            }
        }
        return keys;
    }

    values(): V[] {
        const values: V[] = [];
        for (const bucket of this.table) {
            for (const item of bucket) {
                values.push(item.value);
            }
        }
        return values;
    }

    entries(): Array<[K, V]> {
        const entries: Array<[K, V]> = [];
        for (const bucket of this.table) {
            for (const item of bucket) {
                entries.push([item.key, item.value]);
            }
        }
        return entries;
    }

    clear(): void {
        this.table = new Array(this.size);
        for (let i = 0; i < this.size; i++) {
            this.table[i] = [];
        }
        this.count = 0;
    }

    getSize(): number {
        return this.count;
    }

    getCapacity(): number {
        return this.size;
    }
}

// Usage
const hashTable = new HashTable<string, number>();
hashTable.set("name", "John");
hashTable.set("age", 30);
hashTable.set("city", "New York");

console.log(hashTable.get("name")); // "John"
console.log(hashTable.has("age")); // true
console.log(hashTable.keys()); // ["name", "age", "city"]
class GenericHashTable<K, V> {
    private buckets: Array<Array<{ key: K; value: V }>>;
    private capacity: number;
    private length: number = 0;

    constructor(capacity: number = 16) {
        this.capacity = capacity;
        this.buckets = new Array(capacity);
        for (let i = 0; i < capacity; i++) {
            this.buckets[i] = [];
        }
    }

    private hash(key: K): number {
        const keyStr = JSON.stringify(key);
        let hash = 5381;
        
        for (let i = 0; i < keyStr.length; i++) {
            hash = (hash * 33) ^ keyStr.charCodeAt(i);
        }
        
        return Math.abs(hash) % this.capacity;
    }

    set(key: K, value: V): void {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        // Check for existing key
        for (const item of bucket) {
            if (this.keysEqual(item.key, key)) {
                item.value = value;
                return;
            }
        }

        // Add new entry
        bucket.push({ key, value });
        this.length++;

        // Resize if needed
        if (this.length / this.capacity > 0.7) {
            this.resize();
        }
    }

    get(key: K): V | undefined {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (const item of bucket) {
            if (this.keysEqual(item.key, key)) {
                return item.value;
            }
        }

        return undefined;
    }

    private keysEqual(key1: K, key2: K): boolean {
        if (typeof key1 === 'object' && typeof key2 === 'object') {
            return JSON.stringify(key1) === JSON.stringify(key2);
        }
        return key1 === key2;
    }

    private resize(): void {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity);
        this.length = 0;

        for (let i = 0; i < this.capacity; i++) {
            this.buckets[i] = [];
        }

        for (const bucket of oldBuckets) {
            for (const item of bucket) {
                this.set(item.key, item.value);
            }
        }
    }

    // Other methods similar to previous implementation...
}

// Usage with complex keys
interface User {
    id: number;
    name: string;
}

const userTable = new GenericHashTable<User, string>();
const user1 = { id: 1, name: "Alice" };
userTable.set(user1, "Admin");
console.log(userTable.get(user1)); // "Admin"
// Using built-in Map
const map = new Map<string, number>();
map.set("apple", 1);
map.set("banana", 2);

console.log(map.get("apple")); // 1
console.log(map.has("banana")); // true

// Iterating
for (const [key, value] of map) {
    console.log(`${key}: ${value}`);
}

// Size
console.log(map.size); // 2

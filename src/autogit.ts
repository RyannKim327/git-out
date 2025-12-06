/**
 * Represents a single node in the skip list.
 * @template K The type of the key.
 * @template V The type of the value.
 */
class SkipListNode<K, V> {
    key: K;
    value: V;
    // An array of pointers to the next node at each level.
    // next[0] is the pointer for level 0, next[1] for level 1, etc.
    next: (SkipListNode<K, V> | null)[];

    constructor(key: K, value: V, level: number) {
        this.key = key;
        this.value = value;
        // Initialize next pointers for all levels this node participates in.
        // The actual level is `level`, so we need `level + 1` slots (0-indexed).
        this.next = new Array(level + 1).fill(null);
    }
}
/**
 * A type for the comparator function.
 * It should return:
 * - a negative number if a < b
 * - 0 if a === b
 * - a positive number if a > b
 */
type Comparator<K> = (a: K, b: K) => number;

/**
 * Implements a Skip List data structure.
 * @template K The type of the key (must be comparable).
 * @template V The type of the value.
 */
class SkipList<K, V> {
    private head: SkipListNode<K, V>;
    private maxLevel: number; // Current maximum level in the skip list (0-indexed)
    private readonly maxPossibleLevel: number; // Hard cap on max level (e.g., 32 or logN)
    private readonly probability: number; // Probability factor for random level generation (e.g., 0.5)
    private size: number; // Number of elements in the skip list
    private readonly compare: Comparator<K>; // Comparator function for keys

    /**
     * Creates a new SkipList instance.
     * @param compare A comparator function for keys. Defaults to a basic comparison for numbers/strings.
     * @param maxPossibleLevel The maximum possible level the skip list can reach. Defaults to 16.
     * @param probability The probability of increasing a node's level during insertion. Defaults to 0.5.
     */
    constructor(
        compare?: Comparator<K>,
        maxPossibleLevel: number = 16, // A reasonable default for many use cases
        probability: number = 0.5
    ) {
        this.compare = compare || this.defaultComparator;
        this.maxPossibleLevel = maxPossibleLevel;
        this.probability = probability;
        this.size = 0;
        this.maxLevel = 0; // Starts at level 0

        // The head node has no actual key/value and points to the start of each level.
        // It should have `maxPossibleLevel + 1` next pointers (for levels 0 to maxPossibleLevel).
        this.head = new SkipListNode<K, V>(undefined as any, undefined as any, maxPossibleLevel);
    }

    /**
     * Default comparator for numbers and strings.
     * @param a The first key.
     * @param b The second key.
     * @returns A negative number if a < b, 0 if a === b, a positive number if a > b.
     */
    private defaultComparator(a: K, b: K): number {
        if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        }
        if (typeof a === 'string' && typeof b === 'string') {
            return a.localeCompare(b);
        }
        // Fallback for non-standard types or if specific comparison is needed
        // For complex objects, `compare` must be provided in the constructor.
        throw new Error("Cannot compare keys. Please provide a custom comparator function for your key type.");
    }

    /**
     * Generates a random level for a new node based on the configured probability.
     * The level will be between 0 and `this.maxPossibleLevel`.
     * @returns The randomly determined level for a new node.
     */
    private randomLevel(): number {
        let level = 0;
        while (Math.random() < this.probability && level < this.maxPossibleLevel) {
            level++;
        }
        return level;
    }

    /**
     * Finds the nodes that would precede the target key at each level.
     * This is a crucial helper for `insert`, `delete`, and `get`.
     * @param key The key to search for.
     * @returns An array where `update[i]` is the node that comes before the target key at level `i`.
     */
    private findUpdatePointers(key: K): (SkipListNode<K, V> | null)[] {
        // `update` will store the path taken from `head` to the insertion point.
        // `update[i]` will be the node *before* the target key at level `i`.
        const update: (SkipListNode<K, V> | null)[] = new Array(this.maxPossibleLevel + 1).fill(null);
        let current: SkipListNode<K, V> | null = this.head;

        // Start from the highest current level down to level 0
        for (let i = this.maxLevel; i >= 0; i--) {
            while (current && current.next[i] && this.compare(current.next[i]!.key, key) < 0) {
                current = current.next[i];
            }
            // `current` is the node just before where `key` would be at level `i`
            update[i] = current;
        }
        return update;
    }

    /**
     * Inserts a key-value pair into the skip list.
     * If the key already exists, its value is updated.
     * @param key The key to insert.
     * @param value The value associated with the key.
     */
    insert(key: K, value: V): void {
        const update = this.findUpdatePointers(key);

        // Check if the key already exists (at level 0)
        let existingNode = update[0]?.next[0];
        if (existingNode && this.compare(existingNode.key, key) === 0) {
            existingNode.value = value; // Update value if key exists
            return;
        }

        // Determine a random level for the new node
        const newLevel = this.randomLevel();

        // If the new level is higher than the current max level,
        // we need to extend the `update` path for those new higher levels to the head.
        if (newLevel > this.maxLevel) {
            for (let i = this.maxLevel + 1; i <= newLevel; i++) {
                update[i] = this.head; // New higher levels start from the head
            }
            this.maxLevel = newLevel;
        }

        // Create the new node
        const newNode = new SkipListNode(key, value, newLevel);

        // Link the new node into the skip list at all its levels
        for (let i = 0; i <= newLevel; i++) {
            if (update[i]) { // update[i] might be null if newLevel is higher than maxPossibleLevel, though capped
                newNode.next[i] = update[i]!.next[i];
                update[i]!.next[i] = newNode;
            }
        }
        this.size++;
    }

    /**
     * Retrieves the value associated with a given key.
     * @param key The key to search for.
     * @returns The value associated with the key, or `undefined` if the key is not found.
     */
    get(key: K): V | undefined {
        let current: SkipListNode<K, V> | null = this.head;

        // Traverse from the highest current level down to level 0
        for (let i = this.maxLevel; i >= 0; i--) {
            while (current && current.next[i] && this.compare(current.next[i]!.key, key) < 0) {
                current = current.next[i];
            }
        }

        // `current` is now the node before the potential target at level 0.
        // Move to the next node at level 0.
        current = current?.next[0] || null;

        // If the node exists and its key matches, return its value.
        if (current && this.compare(current.key, key) === 0) {
            return current.value;
        }

        return undefined; // Key not found
    }

    /**
     * Checks if the skip list contains a given key.
     * @param key The key to check for.
     * @returns `true` if the key exists, `false` otherwise.
     */
    has(key: K): boolean {
        return this.get(key) !== undefined;
    }

    /**
     * Deletes a key-value pair from the skip list.
     * @param key The key to delete.
     * @returns `true` if the key was found and deleted, `false` otherwise.
     */
    delete(key: K): boolean {
        const update = this.findUpdatePointers(key);

        // Check if the node to delete actually exists at level 0
        const nodeToDelete = update[0]?.next[0];
        if (!nodeToDelete || this.compare(nodeToDelete.key, key) !== 0) {
            return false; // Key not found
        }

        // Unlink the node at all levels it participates in
        for (let i = 0; i <= this.maxLevel; i++) {
            // Only unlink if the next node at this level is the one we're deleting
            if (update[i]?.next[i] === nodeToDelete) {
                update[i]!.next[i] = nodeToDelete.next[i];
            }
        }

        this.size--;

        // Adjust maxLevel if higher levels are now empty
        while (this.maxLevel > 0 && this.head.next[this.maxLevel] === null) {
            this.maxLevel--;
        }

        return true;
    }

    /**
     * Returns the number of elements in the skip list.
     */
    getSize(): number {
        return this.size;
    }

    /**
     * Checks if the skip list is empty.
     */
    isEmpty(): boolean {
        return this.size === 0;
    }

    /**
     * Returns the key-value pair of the smallest element in the skip list.
     * @returns An object with `key` and `value`, or `undefined` if the list is empty.
     */
    min(): { key: K, value: V } | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        const minNode = this.head.next[0]!; // Smallest element is always the first on level 0
        return { key: minNode.key, value: minNode.value };
    }

    /**
     * Returns the key-value pair of the largest element in the skip list.
     * @returns An object with `key` and `value`, or `undefined` if the list is empty.
     */
    max(): { key: K, value: V } | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        let current: SkipListNode<K, V> | null = this.head;
        // Traverse to the last node on level 0
        while (current && current.next[0]) {
            current = current.next[0];
        }
        // `current` is now the last node (not null)
        if (current === this.head) { // Special case if only head exists
             return undefined;
        }
        return { key: current!.key, value: current!.value };
    }


    /**
     * Clears all elements from the skip list.
     */
    clear(): void {
        this.head.next.fill(null);
        this.maxLevel = 0;
        this.size = 0;
    }

    /**
     * Allows iteration over the skip list elements in ascending key order.
     */
    *[Symbol.iterator](): Iterator<{ key: K, value: V }> {
        let current = this.head.next[0];
        while (current) {
            yield { key: current.key, value: current.value };
            current = current.next[0];
        }
    }

    /**
     * Returns an array of all key-value pairs in ascending key order.
     */
    toArray(): { key: K, value: V }[] {
        return Array.from(this);
    }
}
// --- Example 1: SkipList with default numeric keys ---
console.log("--- Numeric SkipList ---");
const skipListNum = new SkipList<number, string>();

skipListNum.insert(10, "ten");
skipListNum.insert(5, "five");
skipListNum.insert(20, "twenty");
skipListNum.insert(7, "seven");
skipListNum.insert(15, "fifteen");
skipListNum.insert(5, "new five value"); // Update existing key

console.log("Size:", skipListNum.getSize()); // Expected: 5

console.log("Elements:");
for (const { key, value } of skipListNum) {
    console.log(`Key: ${key}, Value: ${value}`);
}
// Expected output (order might vary slightly in printed elements due to random levels, but final iteration is sorted):
// Key: 5, Value: new five value
// Key: 7, Value: seven
// Key: 10, Value: ten
// Key: 15, Value: fifteen
// Key: 20, Value: twenty


console.log("Get 10:", skipListNum.get(10)); // Expected: ten
console.log("Get 100:", skipListNum.get(100)); // Expected: undefined
console.log("Has 7:", skipListNum.has(7)); // Expected: true

console.log("Min:", skipListNum.min()); // Expected: { key: 5, value: 'new five value' }
console.log("Max:", skipListNum.max()); // Expected: { key: 20, value: 'twenty' }

skipListNum.delete(10);
console.log("Deleted 10. Get 10:", skipListNum.get(10)); // Expected: undefined
console.log("Size after deletion:", skipListNum.getSize()); // Expected: 4

console.log("Elements after deletion:");
for (const { key, value } of skipListNum) {
    console.log(`Key: ${key}, Value: ${value}`);
}

skipListNum.delete(50); // Deleting non-existent key
console.log("Deleted 50 (non-existent):", skipListNum.delete(50)); // Expected: false
console.log("Size:", skipListNum.getSize()); // Expected: 4

skipListNum.clear();
console.log("Cleared list. Size:", skipListNum.getSize()); // Expected: 0
console.log("Is empty:", skipListNum.isEmpty()); // Expected: true
console.log("Min (empty):", skipListNum.min()); // Expected: undefined


// --- Example 2: SkipList with custom string keys ---
console.log("\n--- String SkipList with custom comparator ---");
interface Item {
    id: string;
    description: string;
}

// Custom comparator for strings (case-insensitive for example)
const stringComparator: Comparator<string> = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());

const skipListStr = new SkipList<string, Item>(stringComparator);

skipListStr.insert("banana", { id: "b1", description: "Yellow fruit" });
skipListStr.insert("apple", { id: "a1", description: "Red fruit" });
skipListStr.insert("orange", { id: "o1", description: "Citrus fruit" });
skipListStr.insert("Apple", { id: "a2", description: "Green fruit" }); // Key 'Apple' will update 'apple' due to comparator

console.log("Elements:");
for (const { key, value } of skipListStr) {
    console.log(`Key: ${key}, Value: ${value.description}`);
}
// Expected output:
// Key: apple, Value: Green fruit (updated by 'Apple')
// Key: banana, Value: Yellow fruit
// Key: orange, Value: Citrus fruit

console.log("Get 'Banana':", skipListStr.get("Banana")?.description); // Expected: Yellow fruit
console.log("Has 'cherry':", skipListStr.has("cherry")); // Expected: false


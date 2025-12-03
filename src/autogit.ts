/**
 * A generic comparator function type.
 * Returns:
 * -1 if a < b
 *  0 if a === b
 *  1 if a > b
 */
type Comparator<T> = (a: T, b: T) => number;

/**
 * Represents a node in the SkipList.
 * Each node has a key, an optional value, and an array of 'next' pointers.
 * The length of the 'next' array determines the node's level.
 */
class SkipListNode<T> {
    key: T | null; // Null for the head sentinel node
    value?: any; // Optional value, useful for a SkipList acting as a Map
    next: (SkipListNode<T> | null)[]; // Array of next pointers for each level

    constructor(key: T | null, level: number, value?: any) {
        this.key = key;
        this.value = value;
        // Initialize 'next' array with nulls up to the node's level
        this.next = new Array(level).fill(null);
    }
}

/**
 * Implements a SkipList data structure.
 * Supports O(log n) average time complexity for insert, find, and delete operations.
 */
class SkipList<T> {
    private head: SkipListNode<T>; // Sentinel head node
    private maxLevel: number; // Maximum possible level for any node
    private currentLevel: number; // The highest level currently used in the skip list (0-indexed)
    private p: number; // Probability factor for increasing a node's level
    public size: number; // Number of elements in the skip list
    private comparator: Comparator<T>; // Function to compare keys

    /**
     * Creates a new SkipList.
     * @param maxLevel The maximum number of levels a node can have (default: 16).
     * @param p The probability of a node's level increasing (default: 0.5).
     * @param comparator An optional custom comparator function for keys.
     */
    constructor(maxLevel: number = 16, p: number = 0.5, comparator?: Comparator<T>) {
        this.maxLevel = maxLevel;
        this.p = p;
        this.currentLevel = 0; // Starts at level 0 (base linked list)
        this.size = 0;

        // The head node has null key and its 'next' array size is maxLevel,
        // as it conceptually exists on all levels up to maxLevel.
        this.head = new SkipListNode<T>(null, maxLevel);

        // Default comparator for primitive types (numbers, strings)
        this.comparator = comparator || ((a, b) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });
    }

    /**
     * Generates a random level for a new node based on the probability `p`.
     * The level is 1-indexed (e.g., level 1 means it's in the base list).
     */
    private _randomLevel(): number {
        let level = 1; // Start at level 1 (base list)
        // Keep increasing level with probability 'p' until maxLevel or condition fails
        while (Math.random() < this.p && level < this.maxLevel) {
            level++;
        }
        return level;
    }

    /**
     * Inserts a key into the skip list.
     * If a node with the same key already exists, this operation does nothing
     * (or could optionally update the value if implementing a map).
     * @param key The key to insert.
     * @param value Optional value associated with the key.
     */
    insert(key: T, value?: any): void {
        const update: (SkipListNode<T> | null)[] = new Array(this.maxLevel).fill(null);
        let current: SkipListNode<T> = this.head; // Start from the head node

        // Traverse down from the highest current level to level 0
        // Find the insertion point at each level and store the preceding node in 'update'
        for (let i = this.currentLevel; i >= 0; i--) {
            while (current.next[i] && this.comparator(current.next[i]!.key!, key) < 0) {
                current = current.next[i]!;
            }
            update[i] = current; // Store the node before the insertion point at this level
        }

        // After the loop, current.next[0] is either null or the node with a key >= `key`.
        // Check if the key already exists at level 0.
        current = current.next[0];
        if (current && this.comparator(current.key!, key) === 0) {
            // Key already exists, decide how to handle (e.g., update value for a map)
            // For a set-like SkipList, we just return.
            if (value !== undefined) {
                current.value = value; // Update value if provided
            }
            return;
        }

        // Key does not exist, so insert new node
        const newLevel = this._randomLevel(); // Determine random level for the new node

        // If the new node's level is higher than the current highest level of the skip list,
        // update the 'update' array for those new levels to point to the head node.
        if (newLevel > this.currentLevel + 1) { // newLevel is 1-indexed, currentLevel is 0-indexed index
            for (let i = this.currentLevel + 1; i < newLevel; i++) {
                update[i] = this.head;
            }
            this.currentLevel = newLevel - 1; // Update the skip list's highest active level
        }

        const newNode = new SkipListNode(key, newLevel, value);

        // Link the new node into the list at all its determined levels
        for (let i = 0; i < newLevel; i++) {
            newNode.next[i] = update[i]!.next[i];
            update[i]!.next[i] = newNode;
        }

        this.size++;
    }

    /**
     * Finds a node with the given key in the skip list.
     * @param key The key to search for.
     * @returns The SkipListNode if found, otherwise null.
     */
    find(key: T): SkipListNode<T> | null {
        let current: SkipListNode<T> = this.head;

        // Traverse down from the highest current level to level 0
        // At each level, move forward as long as the next node's key is less than the search key
        for (let i = this.currentLevel; i >= 0; i--) {
            while (current.next[i] && this.comparator(current.next[i]!.key!, key) < 0) {
                current = current.next[i]!;
            }
        }

        // After the loop, current.next[0] is the potential node or null.
        current = current.next[0];
        if (current && this.comparator(current.key!, key) === 0) {
            return current; // Found the node
        }
        return null; // Key not found
    }

    /**
     * Deletes a node with the given key from the skip list.
     * @param key The key of the node to delete.
     * @returns True if the node was found and deleted, false otherwise.
     */
    delete(key: T): boolean {
        const update: (SkipListNode<T> | null)[] = new Array(this.maxLevel).fill(null);
        let current: SkipListNode<T> = this.head;

        // Traverse down from the highest current level to level 0
        // Find the node(s) preceding the target node at each level and store in 'update'
        for (let i = this.currentLevel; i >= 0; i--) {
            while (current.next[i] && this.comparator(current.next[i]!.key!, key) < 0) {
                current = current.next[i]!;
            }
            update[i] = current;
        }

        // The node to potentially delete is the one after update[0] at level 0
        const nodeToDelete: SkipListNode<T> | null = update[0]!.next[0];

        if (nodeToDelete && this.comparator(nodeToDelete.key!, key) === 0) {
            // Found the node to delete
            // For each level the nodeToDelete exists on, update pointers to skip it
            for (let i = 0; i < nodeToDelete.next.length; i++) {
                if (update[i]!.next[i] === nodeToDelete) {
                    update[i]!.next[i] = nodeToDelete.next[i];
                }
            }

            // Decrease currentLevel if the highest level of the skip list becomes empty
            while (this.currentLevel > 0 && this.head.next[this.currentLevel] === null) {
                this.currentLevel--;
            }

            this.size--;
            return true; // Node deleted successfully
        }
        return false; // Key not found
    }

    /**
     * Checks if the skip list is empty.
     * @returns True if the skip list contains no elements, false otherwise.
     */
    isEmpty(): boolean {
        return this.size === 0;
    }

    /**
     * Returns the size of the skip list.
     * @returns The number of elements in the skip list.
     */
    getSize(): number {
        return this.size;
    }

    /**
     * Prints the skip list for debugging purposes.
     * Shows elements at each active level.
     */
    print(): void {
        console.log("--- SkipList State ---");
        console.log(`Size: ${this.size}, Current Highest Level: ${this.currentLevel + 1}`);
        for (let i = this.currentLevel; i >= 0; i--) {
            let s = `Level ${i + 1}: H -> `;
            let current = this.head.next[i];
            while (current) {
                s += `${current.key}${current.value !== undefined ? `(${current.value})` : ''} -> `;
                current = current.next[i];
            }
            s += "null";
            console.log(s);
        }
        console.log("----------------------");
    }

    /**
     * Returns an array of all keys in sorted order (from level 0).
     */
    toArray(): T[] {
        const result: T[] = [];
        let current = this.head.next[0];
        while (current) {
            if (current.key !== null) {
                result.push(current.key);
            }
            current = current.next[0];
        }
        return result;
    }
}

// 1. SkipList with default (number) comparator
console.log("--- Working with numbers ---");
const numberSkipList = new SkipList<number>();

numberSkipList.insert(10);
numberSkipList.insert(20);
numberSkipList.insert(5);
numberSkipList.insert(15);
numberSkipList.insert(25);
numberSkipList.insert(7);
numberSkipList.insert(12);

numberSkipList.print();
console.log("Array representation:", numberSkipList.toArray()); // Expected: [5, 7, 10, 12, 15, 20, 25]

console.log("\nFinding 15:", numberSkipList.find(15)?.key); // Expected: 15
console.log("Finding 99:", numberSkipList.find(99));     // Expected: null

console.log("\nDeleting 10:", numberSkipList.delete(10));   // Expected: true
console.log("Deleting 30:", numberSkipList.delete(30));   // Expected: false

numberSkipList.print();
console.log("Array representation:", numberSkipList.toArray()); // Expected: [5, 7, 12, 15, 20, 25]

console.log("Size:", numberSkipList.getSize());            // Expected: 6
console.log("Is empty:", numberSkipList.isEmpty());        // Expected: false


// 2. SkipList with custom objects and a custom comparator (e.g., comparing by ID)
console.log("\n--- Working with custom objects ---");

interface User {
    id: number;
    name: string;
    email: string;
}

const userComparator: Comparator<User> = (a, b) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
};

const userSkipList = new SkipList<User>(10, 0.5, userComparator);

const user1: User = { id: 101, name: "Alice", email: "alice@example.com" };
const user2: User = { id: 205, name: "Bob", email: "bob@example.com" };
const user3: User = { id: 50, name: "Charlie", email: "charlie@example.com" };
const user4: User = { id: 150, name: "David", email: "david@example.com" };

userSkipList.insert(user1, user1.email); // You can store the whole object as value if you want
userSkipList.insert(user2, user2.email);
userSkipList.insert(user3, user3.email);
userSkipList.insert(user4, user4.email);

userSkipList.print(); // Note: print will show the 'id' because key is User, but you can customize print to show name etc.

console.log("\nFinding user with ID 150:", userSkipList.find({ id: 150, name: "", email: "" })?.key?.name); // Expected: David
console.log("Finding user with ID 999:", userSkipList.find({ id: 999, name: "", email: "" }));           // Expected: null

console.log("\nDeleting user with ID 205:", userSkipList.delete({ id: 205, name: "", email: "" }));       // Expected: true
console.log("Deleting user with ID 777:", userSkipList.delete({ id: 777, name: "", email: "" }));       // Expected: false

userSkipList.print();
const userKeysArray = userSkipList.toArray().map(user => user.id);
console.log("Array of user IDs:", userKeysArray); // Expected: [50, 101, 150]

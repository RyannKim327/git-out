/**
 * Represents a single node in the Skip List.
 * Each node stores a value and an array of 'next' pointers.
 * The length of the 'next' array determines the node's level.
 */
class SkipListNode<T> {
    value: T;
    // An array of pointers to the next node at each level.
    // next[0] is the base list, next[1] is the next level, and so on.
    next: (SkipListNode<T> | null)[];

    /**
     * Creates a new SkipListNode.
     * @param value The value to store in the node.
     * @param level The number of levels this node will participate in (0-indexed, so level+1 pointers).
     */
    constructor(value: T, level: number) {
        this.value = value;
        // Initialize next pointers to null for the given number of levels.
        // A node at 'level' L means it has L+1 pointers (from 0 to L).
        this.next = new Array(level + 1).fill(null);
    }
}

/**
 * Implements a Skip List data structure.
 * Supports generic types for values, requiring a comparison function.
 */
class SkipList<T> {
    private head: SkipListNode<T>; // Sentinel head node
    private maxLevel: number;      // Current highest level in the list
    private p: number;             // Probability factor for determining node levels (e.g., 0.5)
    private _maxPossibleLevel: number; // Maximum possible levels for the entire skip list
    private compare: (a: T, b: T) => number; // Comparison function
    private _size: number;         // Number of elements in the skip list

    /**
     * Creates a new SkipList instance.
     * @param compareFunction An optional function to compare two values of type T.
     *                        Returns < 0 if a < b, 0 if a == b, > 0 if a > b.
     *                        Defaults to standard comparison for primitive types.
     * @param p The probability factor for determining new node levels (default: 0.5).
     * @param maxPossibleLevel The absolute maximum number of levels the skip list can grow to (default: 16).
     */
    constructor(
        compareFunction?: (a: T, b: T) => number,
        p: number = 0.5,
        maxPossibleLevel: number = 16
    ) {
        this.compare = compareFunction || this.defaultCompare;
        this.p = p;
        this._maxPossibleLevel = maxPossibleLevel;
        this.maxLevel = 0; // Initially, only level 0 exists
        this._size = 0;

        // Initialize the head node. It doesn't store a real value, acts as a sentinel.
        // Its 'next' array is pre-allocated for the maximum possible levels.
        this.head = new SkipListNode<T>(null as any, maxPossibleLevel); // Use 'null as any' for a dummy value
        this.head.next.fill(null); // Ensure all head pointers are null initially
    }

    /**
     * Default comparison function for primitive types.
     * @param a First value.
     * @param b Second value.
     * @returns -1 if a < b, 0 if a == b, 1 if a > b.
     */
    private defaultCompare(a: T, b: T): number {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    /**
     * Generates a random level for a new node based on the probability `p`.
     * The level is capped by `_maxPossibleLevel`.
     * @returns The randomly determined level (0-indexed).
     */
    private getRandomLevel(): number {
        let level = 0;
        // Keep increasing the level as long as a random number is less than p
        // and we haven't hit the maximum possible level.
        while (Math.random() < this.p && level < this._maxPossibleLevel) {
            level++;
        }
        return level;
    }

    /**
     * Inserts a new value into the skip list.
     * If a duplicate value exists, it will not be inserted (or you could modify to update/allow duplicates).
     * @param value The value to insert.
     */
    insert(value: T): void {
        // `update` array stores the nodes that need their next pointers updated at each level.
        // Specifically, `update[i]` will be the node *before* the insertion point at level `i`.
        const update: (SkipListNode<T> | null)[] = new Array(this._maxPossibleLevel + 1);
        let current: SkipListNode<T> = this.head;

        // Step 1: Traverse the skip list from the highest current level down to level 0
        // to find the insertion point for the new value at each level.
        for (let i = this.maxLevel; i >= 0; i--) {
            // Move right as long as the next node exists and its value is less than the new value.
            while (current.next[i] && this.compare(current.next[i]!.value, value) < 0) {
                current = current.next[i]!;
            }
            // Store the current node as the predecessor for this level.
            update[i] = current;
        }

        // Move to the level 0 next pointer, this is the node after `current` at level 0.
        // It's a candidate for a duplicate or the actual insertion point.
        current = current.next[0];

        // Step 2: Check for duplicates. If the value already exists, do nothing (or update it).
        if (current && this.compare(current.value, value) === 0) {
            // For this implementation, we simply return if a duplicate is found.
            // You could modify this to update the existing value or allow multiple identical values.
            return;
        }

        // Step 3: Determine the random level for the new node.
        const newLevel = this.getRandomLevel();

        // Step 4: If the new node's level is greater than the current `maxLevel` of the skip list,
        // extend the `head` node's pointers and update the `update` array for these new levels.
        if (newLevel > this.maxLevel) {
            // For levels higher than the current maxLevel, the head node is the predecessor.
            for (let i = this.maxLevel + 1; i <= newLevel; i++) {
                update[i] = this.head;
            }
            this.maxLevel = newLevel; // Update the skip list's maxLevel
        }

        // Step 5: Create the new node.
        const newNode = new SkipListNode<T>(value, newLevel);

        // Step 6: Splice the new node into the skip list at all its determined levels.
        for (let i = 0; i <= newLevel; i++) {
            // The new node's next[i] pointer points to what its predecessor (update[i]) was pointing to.
            newNode.next[i] = update[i]!.next[i];
            // The predecessor's (update[i]) next[i] pointer now points to the new node.
            update[i]!.next[i] = newNode;
        }

        this._size++; // Increment the size of the skip list
    }

    /**
     * Searches for a value in the skip list.
     * @param value The value to search for.
     * @returns The SkipListNode containing the value, or null if not found.
     */
    search(value: T): SkipListNode<T> | null {
        let current: SkipListNode<T> = this.head;

        // Traverse from the highest level down to level 0.
        for (let i = this.maxLevel; i >= 0; i--) {
            // Move right as long as the next node exists and its value is less than the target.
            while (current.next[i] && this.compare(current.next[i]!.value, value) < 0) {
                current = current.next[i]!;
            }
        }

        // After the loop, `current` is the node just before the potential target at level 0.
        // Move to the actual node at level 0.
        current = current.next[0];

        // Check if the found node is indeed the target value.
        if (current && this.compare(current.value, value) === 0) {
            return current; // Value found
        }
        return null; // Value not found
    }

    /**
     * Deletes a value from the skip list.
     * @param value The value to delete.
     * @returns True if the value was found and deleted, false otherwise.
     */
    delete(value: T): boolean {
        // `update` array stores the nodes that point to the node being deleted at each level.
        const update: (SkipListNode<T> | null)[] = new Array(this._maxPossibleLevel + 1);
        let current: SkipListNode<T> = this.head;

        // Step 1: Traverse to find the node to delete and store its predecessors.
        for (let i = this.maxLevel; i >= 0; i--) {
            while (current.next[i] && this.compare(current.next[i]!.value, value) < 0) {
                current = current.next[i]!;
            }
            update[i] = current; // Store the node *before* the potential deletion target
        }

        // Move to the level 0 next pointer, this is the candidate node for deletion.
        current = current.next[0];

        // Step 2: If the node is found, unlink it from all levels it participates in.
        if (current && this.compare(current.value, value) === 0) {
            for (let i = 0; i <= this.maxLevel; i++) {
                // Only unlink if the predecessor at this level actually points to the current node.
                if (update[i]!.next[i] === current) {
                    update[i]!.next[i] = current.next[i];
                }
            }

            // Step 3: Adjust `maxLevel` if the highest levels become empty.
            while (this.maxLevel > 0 && this.head.next[this.maxLevel] === null) {
                this.maxLevel--;
            }
            this._size--;
            return true; // Node deleted successfully
        }
        return false; // Node not found
    }

    /**
     * Returns the number of elements in the skip list.
     */
    get size(): number {
        return this._size;
    }

    /**
     * Checks if the skip list is empty.
     */
    isEmpty(): boolean {
        return this._size === 0;
    }

    /**
     * Executes a callback function for each value in the skip list, in ascending order.
     * @param callback The function to execute for each value.
     */
    forEach(callback: (value: T) => void): void {
        let current = this.head.next[0]; // Start at the first actual node at level 0
        while (current !== null) {
            callback(current.value);
            current = current.next[0];
        }
    }

    /**
     * Converts the skip list to an array of its values in ascending order.
     * @returns An array containing all values.
     */
    toArray(): T[] {
        const arr: T[] = [];
        this.forEach(value => arr.push(value));
        return arr;
    }

    /**
     * (For debugging/visualization) Prints the structure of the skip list.
     */
    print(): void {
        console.log("Skip List Structure (size: " + this._size + ", maxLevel: " + this.maxLevel + "):");
        for (let i = this.maxLevel; i >= 0; i--) {
            let current: SkipListNode<T> | null = this.head.next[i];
            let levelStr = `Level ${i}: Head -> `;
            while (current !== null) {
                levelStr += `${current.value} -> `;
                current = current.next[i];
            }
            levelStr += "null";
            console.log(levelStr);
        }
    }
}
// Example with numbers (uses default comparison)
const numSkipList = new SkipList<number>();

console.log("--- Inserting numbers ---");
numSkipList.insert(10);
numSkipList.insert(20);
numSkipList.insert(5);
numSkipList.insert(15);
numSkipList.insert(25);
numSkipList.insert(15); // Duplicate, won't be inserted

numSkipList.print(); // Visualize the list
console.log("Size:", numSkipList.size); // Expected: 5

console.log("\n--- Searching for numbers ---");
console.log("Search for 15:", numSkipList.search(15)?.value); // Expected: 15
console.log("Search for 30:", numSkipList.search(30));       // Expected: null

console.log("\n--- Deleting numbers ---");
console.log("Delete 15:", numSkipList.delete(15)); // Expected: true
console.log("Delete 30:", numSkipList.delete(30)); // Expected: false
numSkipList.print();
console.log("Size:", numSkipList.size); // Expected: 4

console.log("\n--- Iterating through numbers ---");
numSkipList.forEach(val => console.log("Value:", val)); // Should be 5, 10, 20, 25

console.log("\n--- Converting to array ---");
console.log(numSkipList.toArray()); // Expected: [5, 10, 20, 25]

// Example with custom objects (requires custom comparison)
interface User {
    id: number;
    name: string;
}

const userCompare = (a: User, b: User): number => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
};

const userSkipList = new SkipList<User>(userCompare);

console.log("\n--- Inserting users ---");
userSkipList.insert({ id: 101, name: "Alice" });
userSkipList.insert({ id: 105, name: "Charlie" });
userSkipList.insert({ id: 103, name: "Bob" });

userSkipList.print(); // Visualize the user list
console.log("User Skip List Size:", userSkipList.size); // Expected: 3

console.log("\n--- Searching for users ---");
console.log("Search for user 103:", userSkipList.search({ id: 103, name: "" })?.value);
console.log("Search for user 102:", userSkipList.search({ id: 102, name: "" }));

console.log("\n--- Deleting users ---");
console.log("Delete user 103:", userSkipList.delete({ id: 103, name: "" })); // Expected: true
userSkipList.print();
console.log("User Skip List Size:", userSkipList.size); // Expected: 2


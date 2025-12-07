/**
 * Represents a node in the SkipList.
 * Each node can participate in multiple levels, storing a pointer for each level.
 */
class SkipListNode<T> {
    value: T;
    // An array of pointers to the next node at each level.
    // next[0] is the pointer for the base level.
    next: (SkipListNode<T> | null)[];

    constructor(value: T, level: number) {
        this.value = value;
        // Initialize next pointers for levels 0 to `level` (inclusive).
        // A node at 'level' means it has pointers up to that index.
        this.next = new Array(level + 1).fill(null);
    }
}
/**
 * Default comparator function for numbers.
 * Returns:
 *   -1 if a < b
 *    0 if a === b
 *    1 if a > b
 *
 * Handles 'undefined' specifically for the head node's value,
 * ensuring it's always considered "less than" any defined value.
 */
const defaultComparator = (a: any, b: any): number => {
    if (a === b) return 0;
    // Head node's value is 'undefined', it should always be considered less than any actual value.
    if (a === undefined) return -1;
    if (b === undefined) return 1;
    return a < b ? -1 : 1;
};

/**
 * Implements a Skip List data structure.
 * Supports O(log n) average-case time complexity for search, insertion, and deletion.
 */
class SkipList<T> {
    // The head node. Its value is undefined, serving as a sentinel.
    // Its 'next' pointers are the entry points to each level of the list.
    private head: SkipListNode<T | undefined>;
    // The highest level currently used by any node in the skip list.
    // Starts at -1 to indicate an empty list.
    private _currentMaxLevel: number;
    // The absolute maximum level a node can reach. Determines the max height of the list.
    private readonly MAX_POSSIBLE_LEVEL: number;
    // The probability `p` used to determine a node's level. (Typically 0.5)
    private readonly PROBABILITY: number;
    // A function to compare two values of type T.
    private readonly comparator: (a: T, b: T) => number;

    /**
     * Creates a new SkipList.
     * @param maxPossibleLevel The maximum number of levels this skip list can have (default: 16).
     * @param probability The probability of a node being promoted to the next level (default: 0.5).
     * @param comparator An optional custom comparator function for type T.
     *                   It should return -1 if a < b, 0 if a === b, and 1 if a > b.
     */
    constructor(
        maxPossibleLevel: number = 16,
        probability: number = 0.5,
        comparator?: (a: T, b: T) => number
    ) {
        if (maxPossibleLevel < 1) {
            throw new Error("MAX_POSSIBLE_LEVEL must be at least 1.");
        }
        if (probability <= 0 || probability >= 1) {
            throw new Error("Probability must be between 0 and 1 (exclusive).");
        }

        this.MAX_POSSIBLE_LEVEL = maxPossibleLevel;
        this.PROBABILITY = probability;
        this.comparator = comparator || defaultComparator;

        // Initialize head node with undefined value and next pointers for all possible levels.
        this.head = new SkipListNode<T | undefined>(undefined, this.MAX_POSSIBLE_LEVEL);
        this._currentMaxLevel = -1; // Initially, no actual levels are active.
    }

    /**
     * Randomly determines the level for a new node.
     * The level starts at 0 and increases with probability `PROBABILITY` up to `MAX_POSSIBLE_LEVEL`.
     * @returns The determined level (index) for the new node.
     */
    private getRandomLevel(): number {
        let level = 0;
        // Continue promoting the node to a higher level as long as random number is less than probability
        // and we haven't exceeded the maximum possible level.
        while (Math.random() < this.PROBABILITY && level < this.MAX_POSSIBLE_LEVEL) {
            level++;
        }
        return level;
    }

    /**
     * Internal helper to traverse the skip list and find the 'update' path.
     * The update path consists of the last node visited at each level before
     * either finding a node greater than or equal to `value`, or reaching the end of the level.
     * This path is crucial for insertion and deletion.
     * @param value The value to search for (or where to insert/delete).
     * @returns An array of nodes, where `update[i]` is the node just before the target position at level `i`.
     */
    private findUpdatePath(value: T): (SkipListNode<T | undefined> | null)[] {
        // 'update' array will store the last node visited on each level.
        // Its size is MAX_POSSIBLE_LEVEL + 1 because we can potentially have levels 0 to MAX_POSSIBLE_LEVEL.
        const update: (SkipListNode<T | undefined> | null)[] = new Array(this.MAX_POSSIBLE_LEVEL + 1).fill(null);
        let current: SkipListNode<T | undefined> | null = this.head;

        // Traverse from the highest active level down to level 0.
        for (let i = this._currentMaxLevel; i >= 0; i--) {
            // Move right along the current level as long as the next node's value is less than the target.
            while (current!.next[i] !== null && this.comparator(current!.next[i]!.value as T, value) < 0) {
                current = current!.next[i];
            }
            // Store the current node (the one just before the potential insertion/deletion point) for this level.
            update[i] = current;
        }
        return update;
    }

    /**
     * Inserts a value into the skip list.
     * @param value The value to insert.
     * @returns `true` if the value was inserted, `false` if it already exists.
     */
    insert(value: T): boolean {
        const update = this.findUpdatePath(value);

        // Check if the value already exists at the base level (level 0).
        let nodeAtLevel0 = update[0]!.next[0];
        if (nodeAtLevel0 !== null && this.comparator(nodeAtLevel0.value as T, value) === 0) {
            return false; // Value already exists, no duplicates allowed.
        }

        // Determine the random level for the new node.
        const newLevel = this.getRandomLevel();

        // If the new node's level is higher than the current maximum level of the skip list,
        // we need to update `_currentMaxLevel` and extend the `update` path for these new levels.
        if (newLevel > this._currentMaxLevel) {
            // For all levels between the old max and new max, the head node is the predecessor.
            for (let i = this._currentMaxLevel + 1; i <= newLevel; i++) {
                update[i] = this.head;
            }
            this._currentMaxLevel = newLevel; // Update the skip list's overall max level.
        }

        // Create the new node. It will have pointers up to 'newLevel' (inclusive).
        const newNode = new SkipListNode(value, newLevel);

        // Splice the new node into the list at each relevant level.
        for (let i = 0; i <= newLevel; i++) {
            newNode.next[i] = update[i]!.next[i]; // New node points to what update[i] was pointing to.
            update[i]!.next[i] = newNode;          // update[i] now points to the new node.
        }

        return true;
    }

    /**
     * Searches for a value in the skip list.
     * @param value The value to search for.
     * @returns The value if found, otherwise `null`.
     */
    search(value: T): T | null {
        const update = this.findUpdatePath(value);

        // After `findUpdatePath`, `update[0].next[0]` will point to the node
        // that potentially holds the target value (or the next greater value).
        let node = update[0]!.next[0];

        if (node !== null && this.comparator(node.value as T, value) === 0) {
            return node.value as T; // Value found.
        }
        return null; // Value not found.
    }

    /**
     * Deletes a value from the skip list.
     * @param value The value to delete.
     * @returns `true` if the value was deleted, `false` if it was not found.
     */
    delete(value: T): boolean {
        const update = this.findUpdatePath(value);

        // Get the node that potentially needs to be deleted.
        let nodeToDelete = update[0]!.next[0];

        // If node not found or its value doesn't match, return false.
        if (nodeToDelete === null || this.comparator(nodeToDelete.value as T, value) !== 0) {
            return false;
        }

        // Remove the node from all levels it participates in.
        for (let i = 0; i <= this._currentMaxLevel; i++) {
            // If the `update` path at this level points to `nodeToDelete`, bypass it.
            if (update[i]!.next[i] === nodeToDelete) {
                update[i]!.next[i] = nodeToDelete.next[i];
            }
        }

        // After deletion, check if the highest levels have become empty.
        // If so, reduce `_currentMaxLevel` to keep it accurate.
        while (this._currentMaxLevel > 0 && this.head.next[this._currentMaxLevel] === null) {
            this._currentMaxLevel--;
        }

        return true;
    }

    /**
     * Checks if the skip list is empty.
     * @returns `true` if the skip list contains no elements, `false` otherwise.
     */
    isEmpty(): boolean {
        return this.head.next[0] === null;
    }

    /**
     * Returns the number of elements in the skip list.
     * (Note: This operation is O(n), not O(log n)).
     * @returns The total number of elements.
     */
    size(): number {
        let count = 0;
        let current = this.head.next[0];
        while (current !== null) {
            count++;
            current = current.next[0];
        }
        return count;
    }

    /**
     * Converts the skip list to a sorted array (based on level 0).
     * Useful for debugging or iteration.
     * @returns An array containing all elements in sorted order.
     */
    toArray(): T[] {
        const result: T[] = [];
        let current: SkipListNode<T | undefined> | null = this.head.next[0];
        while (current !== null) {
            result.push(current.value as T);
            current = current.next[0];
        }
        return result;
    }
}
// Create a SkipList for numbers
const skipList = new SkipList<number>();

console.log("Is empty:", skipList.isEmpty()); // true

// Insert values
skipList.insert(10);
skipList.insert(20);
skipList.insert(5);
skipList.insert(15);
skipList.insert(25);
skipList.insert(10); // Duplicate, should return false

console.log("Inserted values:", skipList.toArray()); // [5, 10, 15, 20, 25]
console.log("Size:", skipList.size()); // 5
console.log("Is empty:", skipList.isEmpty()); // false

// Search for values
console.log("Search 15:", skipList.search(15)); // 15
console.log("Search 0:", skipList.search(0));   // null
console.log("Search 25:", skipList.search(25)); // 25

// Delete values
console.log("Delete 15:", skipList.delete(15)); // true
console.log("Search 15 (after delete):", skipList.search(15)); // null
console.log("Deleted 15, current values:", skipList.toArray()); // [5, 10, 20, 25]

console.log("Delete 100:", skipList.delete(100)); // false (not found)
console.log("Size:", skipList.size()); // 4

// Delete remaining elements
skipList.delete(5);
skipList.delete(10);
skipList.delete(20);
skipList.delete(25);

console.log("All elements deleted, current values:", skipList.toArray()); // []
console.log("Is empty:", skipList.isEmpty()); // true
interface Person {
    name: string;
    age: number;
}

// Custom comparator for Person objects, sorting by name
const personComparator = (p1: Person, p2: Person): number => {
    if (p1.name < p2.name) return -1;
    if (p1.name > p2.name) return 1;
    return 0;
};

const personSkipList = new SkipList<Person>(8, 0.5, personComparator);

personSkipList.insert({ name: "Alice", age: 30 });
personSkipList.insert({ name: "Bob", age: 25 });
personSkipList.insert({ name: "Charlie", age: 35 });
personSkipList.insert({ name: "Alice", age: 28 }); // Will be treated as duplicate by name

console.log("\nPerson SkipList:", personSkipList.toArray());
// Output will be sorted by name: [ { name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }, { name: 'Charlie', age: 35 } ]

console.log("Search Bob:", personSkipList.search({ name: "Bob", age: 99 })); // Will return { name: 'Bob', age: 25 }

personSkipList.delete({ name: "Alice", age: 0 }); // Deletes the Alice node by name
console.log("After deleting Alice:", personSkipList.toArray());

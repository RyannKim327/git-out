/**
 * Represents a node in the Skip List.
 * @template T The type of the value stored in the node.
 */
class SkipListNode<T> {
    value: T;
    // An array of pointers, where next[i] points to the next node at level i.
    next: (SkipListNode<T> | null)[];

    /**
     * Creates an instance of SkipListNode.
     * @param value The value to store in the node.
     * @param level The maximum level this node participates in (0-indexed).
     */
    constructor(value: T, level: number) {
        this.value = value;
        // Initialize next array with nulls for all levels up to 'level'.
        this.next = new Array(level + 1).fill(null);
    }
}
/**
 * Implements a Skip List data structure.
 * @template T The type of the values stored in the skip list.
 *             Requires T to be comparable using < and === operators.
 */
class SkipList<T> {
    private MAX_LEVEL: number;
    private P: number; // Probability factor for random level generation (e.g., 0.5)

    private head: SkipListNode<T>;
    private level: number; // Current maximum level of any node in the list (excluding head's capacity)
    private size: number; // Number of elements in the skip list

    /**
     * Creates an instance of SkipList.
     * @param maxLevel The maximum possible level any node can reach. A common value is 16 or 32.
     *                 The higher the maxLevel, the more memory, but potentially better performance for very large lists.
     * @param p The probability factor (between 0 and 1) for increasing a node's level. Default is 0.5.
     */
    constructor(maxLevel: number = 16, p: number = 0.5) {
        this.MAX_LEVEL = maxLevel;
        this.P = p;

        // The head node is a sentinel node. Its value is null, and it has MAX_LEVEL pointers.
        // It's effectively the start of all levels.
        this.head = new SkipListNode(null as any, this.MAX_LEVEL); // Use 'as any' as null might not be of type T
        this.level = 0; // The highest level currently occupied by any node
        this.size = 0;
    }

    /**
     * Generates a random level for a new node.
     * The level starts at 0 and increments as long as a random number is less than P
     * and the level is less than MAX_LEVEL.
     * @returns The randomly determined level for a new node.
     */
    private randomLevel(): number {
        let lvl = 0;
        while (Math.random() < this.P && lvl < this.MAX_LEVEL) {
            lvl++;
        }
        return lvl;
    }

    /**
     * Searches for a value in the skip list.
     * @param value The value to search for.
     * @returns The SkipListNode if found, otherwise undefined.
     */
    search(value: T): SkipListNode<T> | undefined {
        let current: SkipListNode<T> | null = this.head;

        // Start from the highest current level and go down
        for (let i = this.level; i >= 0; i--) {
            // Move forward at the current level as long as the next node exists
            // and its value is less than the target value.
            while (current.next[i] && current.next[i]!.value < value) {
                current = current.next[i];
            }
        }

        // After traversing all levels, current.next[0] should be the node
        // that either contains the value or is the first node greater than value.
        current = current.next[0];

        // Check if the current node exists and holds the target value.
        if (current && current.value === value) {
            return current;
        }
        return undefined;
    }

    /**
     * Inserts a value into the skip list.
     * @param value The value to insert.
     * @returns True if the value was inserted, false if it already exists.
     */
    add(value: T): boolean {
        // If the value already exists, do not insert duplicates.
        if (this.search(value)) {
            return false;
        }

        // update[i] will store the node whose next[i] pointer should be updated.
        // It points to the node *before* where the new node should be inserted at level i.
        const update: (SkipListNode<T> | null)[] = new Array(this.MAX_LEVEL + 1).fill(null);
        let current: SkipListNode<T> | null = this.head;

        // Traverse the skip list from the highest level down to find insertion points.
        for (let i = this.level; i >= 0; i--) {
            while (current.next[i] && current.next[i]!.value < value) {
                current = current.next[i];
            }
            // Store the predecessor node at this level.
            update[i] = current;
        }

        // Determine a random level for the new node.
        const newLevel = this.randomLevel();

        // If the new node's level is higher than the current maximum level of the list,
        // we need to update the update array for these new higher levels
        // to point to the head node.
        if (newLevel > this.level) {
            for (let i = this.level + 1; i <= newLevel; i++) {
                update[i] = this.head;
            }
            this.level = newLevel; // Update the list's overall highest level
        }

        // Create the new node.
        const newNode = new SkipListNode(value, newLevel);

        // Link the new node into the skip list at all its levels.
        for (let i = 0; i <= newLevel; i++) {
            newNode.next[i] = update[i]!.next[i]; // New node points to old next
            update[i]!.next[i] = newNode;         // Old previous node points to new node
        }

        this.size++;
        return true;
    }

    /**
     * Deletes a value from the skip list.
     * @param value The value to delete.
     * @returns True if the value was deleted, false if it was not found.
     */
    delete(value: T): boolean {
        // update[i] will store the node whose next[i] pointer should be updated
        // if the node containing 'value' is found at level i.
        const update: (SkipListNode<T> | null)[] = new Array(this.MAX_LEVEL + 1).fill(null);
        let current: SkipListNode<T> | null = this.head;

        // Traverse the skip list to find the node to delete and store its predecessors.
        for (let i = this.level; i >= 0; i--) {
            while (current.next[i] && current.next[i]!.value < value) {
                current = current.next[i];
            }
            update[i] = current;
        }

        // Move to the actual node at level 0 that might contain the value.
        current = current.next[0];

        // If the value is not found, return false.
        if (!current || current.value !== value) {
            return false;
        }

        // Unlink the node from all levels it participates in.
        for (let i = 0; i <= this.level; i++) {
            // Only update if 'current' is indeed the node pointed to by update[i].next[i]
            if (update[i]!.next[i] === current) {
                update[i]!.next[i] = current.next[i];
            }
        }

        // After deletion, we might need to reduce the list's overall maximum level
        // if the deleted node was the only one at the highest level(s).
        while (this.level > 0 && this.head.next[this.level] === null) {
            this.level--;
        }

        this.size--;
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
     * Prints the skip list level by level for visualization.
     * (For debugging purposes)
     */
    print(): void {
        console.log("--- Skip List ---");
        for (let i = this.level; i >= 0; i--) {
            let current: SkipListNode<T> | null = this.head.next[i];
            let levelString = `Level ${i}: Head -> `;
            while (current) {
                levelString += `${current.value} -> `;
                current = current.next[i];
            }
            levelString += "NULL";
            console.log(levelString);
        }
        console.log("-----------------");
    }
}
// Example usage:
const skipList = new SkipList<number>(4, 0.5); // Max 4 levels, 0.5 probability

console.log("Adding elements:");
skipList.add(3);
skipList.add(6);
skipList.add(7);
skipList.add(9);
skipList.add(12);
skipList.add(1);
skipList.add(19);
skipList.add(17);
skipList.print(); // Visualize the skip list

console.log("\nSearching for 7:", skipList.search(7)?.value); // Should find 7
console.log("Searching for 10:", skipList.search(10)); // Should be undefined

console.log("\nDeleting 6:");
skipList.delete(6);
skipList.print();

console.log("\nSearching for 6:", skipList.search(6)); // Should be undefined now

console.log("\nDeleting 1:");
skipList.delete(1);
skipList.print();

console.log("\nAdding 2 and 5:");
skipList.add(2);
skipList.add(5);
skipList.print();

console.log("\nCurrent size:", skipList.getSize()); // Should be 8

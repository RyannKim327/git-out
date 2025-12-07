class SkipListNode<T> {
    value: T;
    score: number; // Used for ordering
    forward: (SkipListNode<T> | null)[];

    constructor(value: T, score: number, level: number) {
        this.value = value;
        this.score = score;
        this.forward = new Array(level).fill(null);
    }
}

class SkipList<T> {
    private head: SkipListNode<T>;
    private maxLevel: number;
    private currentMaxLevel: number;
    private probability: number;
    private static DEFAULT_MAX_LEVEL = 16;
    private static DEFAULT_PROBABILITY = 0.5;

    constructor(
        maxLevel: number = SkipList.DEFAULT_MAX_LEVEL,
        probability: number = SkipList.DEFAULT_PROBABILITY
    ) {
        this.maxLevel = maxLevel;
        this.probability = probability;
        this.currentMaxLevel = 1;
        this.head = new SkipListNode<T>(null as any, -Infinity, maxLevel);
    }

    /**
     * Randomly determines the level for a new node
     */
    private randomLevel(): number {
        let level = 1;
        while (Math.random() < this.probability && level < this.maxLevel) {
            level++;
        }
        return level;
    }

    /**
     * Inserts a new value with associated score into the skip list
     */
    insert(value: T, score: number): void {
        const update: (SkipListNode<T> | null)[] = new Array(this.maxLevel).fill(null);
        let current = this.head;

        // Find insertion points for each level
        for (let i = this.currentMaxLevel - 1; i >= 0; i--) {
            while (current.forward[i] && current.forward[i]!.score < score) {
                current = current.forward[i]!;
            }
            update[i] = current;
        }

        const newLevel = this.randomLevel();
        const newNode = new SkipListNode<T>(value, score, newLevel);

        // Update maximum level if needed
        if (newLevel > this.currentMaxLevel) {
            for (let i = this.currentMaxLevel; i < newLevel; i++) {
                update[i] = this.head;
            }
            this.currentMaxLevel = newLevel;
        }

        // Update forward pointers at each level
        for (let i = 0; i < newLevel; i++) {
            newNode.forward[i] = update[i]!.forward[i];
            update[i]!.forward[i] = newNode;
        }
    }

    /**
     * Searches for a node with the given score
     */
    search(score: number): T | null {
        let current = this.head;

        // Traverse from top level down to level 0
        for (let i = this.currentMaxLevel - 1; i >= 0; i--) {
            while (current.forward[i] && current.forward[i]!.score < score) {
                current = current.forward[i]!;
            }
        }

        current = current.forward[0]!;
        return current?.score === score ? current.value : null;
    }

    /**
     * Deletes a node with the given score
     */
    delete(score: number): boolean {
        const update: (SkipListNode<T> | null)[] = new Array(this.maxLevel).fill(null);
        let current = this.head;

        // Find nodes that point to the target
        for (let i = this.currentMaxLevel - 1; i >= 0; i--) {
            while (current.forward[i] && current.forward[i]!.score < score) {
                current = current.forward[i]!;
            }
            update[i] = current;
        }

        current = current.forward[0]!;
        if (current?.score !== score) return false;

        // Update forward pointers in all levels
        for (let i = 0; i < this.currentMaxLevel; i++) {
            if (update[i]?.forward[i] !== current) break;
            update[i]!.forward[i] = current.forward[i];
        }

        // Update current maximum level if needed
        while (this.currentMaxLevel > 1 && this.head.forward[this.currentMaxLevel - 1] === null) {
            this.currentMaxLevel--;
        }

        return true;
    }

    /**
     * Returns all elements in order (useful for debugging/display)
     */
    toOrderedArray(): T[] {
        const result: T[] = [];
        let current = this.head.forward[0];
        while (current) {
            result.push(current.value);
            current = current.forward[0];
        }
        return result;
    }
}
const skipList = new SkipList<string>();

// Insert elements with ordering scores
skipList.insert("Alice", 85);
skipList.insert("Bob", 72);
skipList.insert("Charlie", 93);
skipList.insert("Diana", 88);

// Search for values
console.log(skipList.search(85)); // "Alice"
console.log(skipList.search(72)); // "Bob"

// Delete elements
skipList.delete(72);
console.log(skipList.search(72)); // null

// Get ordered list
console.log(skipList.toOrderedArray());
// ["Bob" (72), "Diana" (88), "Alice" (85), "Charlie" (93)]
// Wait - actually after deleting 72, the order would be:
// ["Diana" (88), "Alice" (85), "Charlie" (93)] - correct order based on scores (72 is deleted)

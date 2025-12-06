class SkipListNode {
    value: number;
    forward: (SkipListNode | null)[];

    constructor(value: number, level: number) {
        this.value = value;
        this.forward = new Array(level + 1).fill(null);
    }
}

class SkipList {
    private head: SkipListNode;
    private maxLevel: number;
    private currentMaxLevel: number;
    private probability: number;
    private size: number;

    constructor(maxLevel: number = 16, probability: number = 0.5) {
        this.maxLevel = maxLevel;
        this.probability = probability;
        this.currentMaxLevel = 1;
        this.head = new SkipListNode(-Infinity, this.maxLevel);
        this.size = 0;
    }

    /** Randomly determine node height using geometric distribution */
    private randomLevel(): number {
        let level = 1;
        while (Math.random() < this.probability && level < this.maxLevel) {
            level++;
        }
        return level;
    }

    /** Search for a value in the skip list */
    search(value: number): boolean {
        let current = this.head;
        for (let i = this.currentMaxLevel - 1; i >= 0; i--) {
            while (current.forward[i] && current.forward[i]!.value < value) {
                current = current.forward[i]!;
            }
        }
        current = current.forward[0]!;
        return current !== null && current.value === value;
    }

    /** Insert a new value into the skip list */
    insert(value: number): void {
        const update: SkipListNode[] = new Array(this.maxLevel).fill(this.head);
        let current = this.head;

        // Find insertion points at each level
        for (let i = this.currentMaxLevel - 1; i >= 0; i--) {
            while (current.forward[i] && current.forward[i]!.value < value) {
                current = current.forward[i]!;
            }
            update[i] = current;
        }

        // Check if value already exists
        current = current.forward[0]!;
        if (current?.value === value) {
            return; // Value already exists (duplicates not allowed)
        }

        // Determine level of new node
        const newLevel = this.randomLevel();
        
        // Update max level if needed
        if (newLevel > this.currentMaxLevel) {
            for (let i = this.currentMaxLevel; i < newLevel; i++) {
                update[i] = this.head;
            }
            this.currentMaxLevel = newLevel;
        }

        // Create new node and update links
        const newNode = new SkipListNode(value, newLevel);
        for (let i = 0; i < newLevel; i++) {
            newNode.forward[i] = update[i].forward[i];
            update[i].forward[i] = newNode;
        }

        this.size++;
    }

    /** Delete a value from the skip list */
    delete(value: number): boolean {
        const update: (SkipListNode | null)[] = new Array(this.maxLevel).fill(null);
        let current = this.head;

        // Find deletion points at each level
        for (let i = this.currentMaxLevel - 1; i >= 0; i--) {
            while (current.forward[i] && current.forward[i]!.value < value) {
                current = current.forward[i]!;
            }
            update[i] = current;
        }

        current = current.forward[0]!;
        if (current?.value !== value) {
            return false; // Value not found
        }

        // Update all links that point to node
        for (let i = 0; i < this.currentMaxLevel; i++) {
            if (update[i]?.forward[i] !== current) break;
            update[i].forward[i] = current.forward[i];
        }

        // Reduce max level if needed
        while (this.currentMaxLevel > 1 && this.head.forward[this.currentMaxLevel - 1] === null) {
            this.currentMaxLevel--;
        }

        this.size--;
        return true;
    }

    /** Display the skip list structure (for debugging) */
    display(): void {
        console.log(`Skip List (size: ${this.size}, maxLevel: ${this.currentMaxLevel})`);
        for (let i = this.currentMaxLevel - 1; i >= 0; i--) {
            let node = this.head.forward[i];
            const items: string[] = [];
            while (node !== null) {
                items.push(`${node.value}`);
                node = node.forward[i];
            }
            console.log(`Level ${i}: ${items.join(' -> ') || 'Empty'}`);
        }
    }
}
const skipList = new SkipList();

// Insert values
skipList.insert(3);
skipList.insert(6);
skipList.insert(7);
skipList.insert(9);
skipList.insert(12);

// Display structure
skipList.display();
// Output might show:
// Level 1: 3 -> 9
// Level 0: 3 -> 6 -> 7 -> 9 -> 12

// Check for existence
console.log(skipList.search(6)); // true
console.log(skipList.search(8)); // false

// Delete value
skipList.delete(7);
console.log(skipList.search(7)); // false

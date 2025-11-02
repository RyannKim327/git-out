class SkipListNode<T> {
    value: T | null;       // null for the head sentinel
    forwards: Array<SkipListNode<T> | null>;

    constructor(value: T | null, level: number) {
        this.value = value;
        this.forwards = new Array(level).fill(null);
    }
}

class SkipList<T> {
    private readonly MAX_LEVEL: number;
    private readonly P: number;
    private level: number; // Current max level in the list
    private head: SkipListNode<T>;
    private compare: (a: T, b: T) => number;

    constructor(maxLevel: number = 16, p: number = 0.5, compareFn?: (a: T, b: T) => number) {
        this.MAX_LEVEL = maxLevel;
        this.P = p;
        this.level = 0;
        this.head = new SkipListNode<T>(null, this.MAX_LEVEL);
        this.compare = compareFn ?? ((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    }

    private randomLevel(): number {
        let lvl = 1;
        while (Math.random() < this.P && lvl < this.MAX_LEVEL) {
            lvl++;
        }
        return lvl;
    }

    search(value: T): T | null {
        let current = this.head;
        for (let i = this.level - 1; i >= 0; i--) {
            while (current.forwards[i] && this.compare(current.forwards[i]!.value!, value) < 0) {
                current = current.forwards[i]!;
            }
        }
        current = current.forwards[0]!;
        if (current && this.compare(current.value!, value) === 0) {
            return current.value!;
        }
        return null;
    }

    insert(value: T): void {
        let update = new Array<SkipListNode<T>>(this.MAX_LEVEL);
        let current = this.head;

        // Step 1: Find the path
        for (let i = this.level - 1; i >= 0; i--) {
            while (current.forwards[i] && this.compare(current.forwards[i]!.value!, value) < 0) {
                current = current.forwards[i]!;
            }
            update[i] = current;
        }

        current = current.forwards[0]!;
        if (current && this.compare(current.value!, value) === 0) {
            return; // Value already exists; no duplicates
        }

        // Step 2: Choose random level for new node
        let newLevel = this.randomLevel();
        if (newLevel > this.level) {
            for (let i = this.level; i < newLevel; i++) {
                update[i] = this.head;
            }
            this.level = newLevel;
        }

        // Step 3: Insert new node
        let newNode = new SkipListNode<T>(value, newLevel);
        for (let i = 0; i < newLevel; i++) {
            newNode.forwards[i] = update[i].forwards[i];
            update[i].forwards[i] = newNode;
        }
    }

    delete(value: T): boolean {
        let update = new Array<SkipListNode<T>>(this.MAX_LEVEL);
        let current = this.head;

        for (let i = this.level - 1; i >= 0; i--) {
            while (current.forwards[i] && this.compare(current.forwards[i]!.value!, value) < 0) {
                current = current.forwards[i]!;
            }
            update[i] = current;
        }

        current = current.forwards[0]!;

        if (!current || this.compare(current.value!, value) !== 0) {
            return false; // Not found
        }

        for (let i = 0; i < this.level; i++) {
            if (update[i].forwards[i] !== current) {
                break;
            }
            update[i].forwards[i] = current.forwards[i];
        }

        // Adjust current level of list if needed
        while (this.level > 0 && !this.head.forwards[this.level - 1]) {
            this.level--;
        }

        return true;
    }

    print(): void {
        for (let i = this.level - 1; i >= 0; i--) {
            let line = `Level ${i}: `;
            let current = this.head.forwards[i];
            while (current) {
                line += current.value + " ";
                current = current.forwards[i];
            }
            console.log(line);
        }
    }
}

// Example usage:
const sl = new SkipList<number>();
sl.insert(3);
sl.insert(6);
sl.insert(7);
sl.insert(9);
sl.insert(12);
sl.insert(19);
sl.insert(17);
sl.insert(26);
sl.insert(21);
sl.insert(25);

sl.print();

console.log("Search 19:", sl.search(19));
console.log("Delete 19:", sl.delete(19));
sl.print();

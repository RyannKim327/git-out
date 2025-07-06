class SkipListNode<T> {
    value: T;
    forward: Array<SkipListNode<T> | null>;

    constructor(value: T, level: number) {
        this.value = value;
        this.forward = new Array(level + 1).fill(null); // levels start from 0
    }
}

class SkipList<T> {
    private maxLevel: number;
    private probability: number;
    private header: SkipListNode<T>;
    private level: number;

    constructor(maxLevel: number = 16, probability: number = 0.5) {
        this.maxLevel = maxLevel; // maximum level for nodes
        this.probability = probability; // probability factor for level increase
        this.header = new SkipListNode<T>(null as any, this.maxLevel);
        this.level = 0; // current max level of the skip list
    }

    private randomLevel(): number {
        let lvl = 0;
        while (Math.random() < this.probability && lvl < this.maxLevel) {
            lvl++;
        }
        return lvl;
    }

    public search(target: T): T | null {
        let current = this.header;

        for (let i = this.level; i >= 0; i--) {
            while (
                current.forward[i] !== null &&
                current.forward[i]!.value < target
            ) {
                current = current.forward[i]!;
            }
        }

        current = current.forward[0]!;

        if (current !== null && current.value === target) {
            return current.value;
        } else {
            return null;
        }
    }

    public insert(value: T): void {
        const update: Array<SkipListNode<T> | null> = new Array(this.maxLevel + 1).fill(null);
        let current = this.header;

        // Find the position to insert
        for (let i = this.level; i >= 0; i--) {
            while (
                current.forward[i] !== null &&
                current.forward[i]!.value < value
            ) {
                current = current.forward[i]!;
            }
            update[i] = current;
        }

        current = current.forward[0]!;

        // Only insert if value not already present
        if (current === null || current.value !== value) {
            const nodeLevel = this.randomLevel();

            if (nodeLevel > this.level) {
                for (let i = this.level + 1; i <= nodeLevel; i++) {
                    update[i] = this.header;
                }
                this.level = nodeLevel;
            }

            const newNode = new SkipListNode<T>(value, nodeLevel);
            for (let i = 0; i <= nodeLevel; i++) {
                newNode.forward[i] = update[i]!.forward[i];
                update[i]!.forward[i] = newNode;
            }
        }
    }

    public delete(value: T): boolean {
        const update: Array<SkipListNode<T> | null> = new Array(this.maxLevel + 1).fill(null);
        let current = this.header;
        let found = false;

        // Find node to delete
        for (let i = this.level; i >= 0; i--) {
            while (
                current.forward[i] !== null &&
                current.forward[i]!.value < value
            ) {
                current = current.forward[i]!;
            }
            update[i] = current;
        }

        current = current.forward[0]!;

        if (current !== null && current.value === value) {
            found = true;

            // Remove references to the node
            for (let i = 0; i <= this.level; i++) {
                if (update[i]!.forward[i] !== current) {
                    break;
                }
                update[i]!.forward[i] = current.forward[i];
            }

            // Adjust the level of the skip list
            while (this.level > 0 && this.header.forward[this.level] === null) {
                this.level--;
            }
        }

        return found;
    }

    // Optional: print the skip list levels
    public print(): void {
        for (let i = this.level; i >= 0; i--) {
            let node = this.header.forward[i];
            const levelNodes: Array<string> = [];
            while (node !== null) {
                levelNodes.push(`${node.value}`);
                node = node.forward[i];
            }
            console.log(`Level ${i}: ${levelNodes.join(' -> ')}`);
        }
    }
}
const skipList = new SkipList<number>();

skipList.insert(10);
skipList.insert(20);
skipList.insert(30);

console.log('Search 20:', skipList.search(20)); // Output: 20
console.log('Search 40:', skipList.search(40)); // Output: null

skipList.print();

skipList.delete(20);
console.log('After deleting 20:');
skipList.print();

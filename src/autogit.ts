class SkipListNode<T> {
    value: T;
    next: SkipListNode<T> | null = null;
    down: SkipListNode<T> | null = null;
    distance: number = 1; // Number of nodes skipped at this level

    constructor(value: T) {
        this.value = value;
    }
}

class SkipList<T> {
    private head: SkipListNode<T>;
    private levels: number = 1;
    private probability: number = 0.5;
    private size: number = 0;

    constructor() {
        this.head = new SkipListNode<T>(null as T);
    }

    // Search for a value
    search(value: T): boolean {
        let current: SkipListNode<T> | null = this.head;

        while (current !== null) {
            while (current.next !== null && current.next.value <= value) {
                current = current.next;
            }

            if (current.value === value) {
                return true;
            }

            current = current.down;
        }

        return false;
    }

    // Insert a value
    insert(value: T): void {
        const nodesToUpdate: SkipListNode<T>[] = [];
        let current: SkipListNode<T> | null = this.head;

        // Find the insertion point and collect nodes that might need updates
        while (current !== null) {
            while (current.next !== null && current.next.value < value) {
                current = current.next;
            }
            nodesToUpdate.push(current);
            current = current.down;
        }

        // Insert at bottom level
        let bottomNode: SkipListNode<T> | null = null;
        let shouldPromote: boolean = true;
        let level: number = 0;

        while (shouldPromote && level < nodesToUpdate.length) {
            const node = nodesToUpdate[nodesToUpdate.length - 1 - level];
            
            // Create new node
            const newNode = new SkipListNode<T>(value);
            newNode.next = node.next;
            node.next = newNode;

            // Link down pointer if exists
            if (bottomNode !== null) {
                newNode.down = bottomNode;
            }

            bottomNode = newNode;
            shouldPromote = Math.random() < this.probability;
            level++;
        }

        // Add new level if needed
        if (shouldPromote) {
            this.addNewLevel(value, bottomNode);
        }

        this.size++;
        this.updateDistances();
    }

    // Remove a value
    remove(value: T): boolean {
        let removed: boolean = false;
        let current: SkipListNode<T> | null = this.head;

        while (current !== null) {
            while (current.next !== null && current.next.value < value) {
                current = current.next;
            }

            if (current.next !== null && current.next.value === value) {
                current.next = current.next.next;
                removed = true;
            }

            current = current.down;
        }

        if (removed) {
            this.size--;
            this.cleanupEmptyLevels();
            this.updateDistances();
        }

        return removed;
    }

    // Add a new level
    private addNewLevel(value: T, downNode: SkipListNode<T> | null): void {
        const newHead = new SkipListNode<T>(null as T);
        const newNode = new SkipListNode<T>(value);
        
        newHead.next = newNode;
        newHead.down = this.head;
        newNode.down = downNode;
        
        this.head = newHead;
        this.levels++;
    }

    // Update distances for efficient indexing
    private updateDistances(): void {
        let currentLevelHead: SkipListNode<T> | null = this.head;
        
        while (currentLevelHead !== null) {
            let current: SkipListNode<T> | null = currentLevelHead;
            let distance: number = 0;
            
            while (current !== null) {
                if (current.down !== null) {
                    // Calculate distance to next node at lower level
                    let temp: SkipListNode<T> | null = current;
                    let downDistance: number = 0;
                    
                    while (temp !== null && temp !== current.down) {
                        temp = temp.next;
                        downDistance++;
                    }
                    
                    current.distance = downDistance;
                } else {
                    current.distance = 1;
                }
                
                current = current.next;
            }
            
            currentLevelHead = currentLevelHead.down;
        }
    }

    // Remove empty levels
    private cleanupEmptyLevels(): void {
        while (this.head.down !== null && this.head.next === null) {
            this.head = this.head.down;
            this.levels--;
        }
    }

    // Get element by index (optional)
    getByIndex(index: number): T | null {
        if (index < 0 || index >= this.size) return null;

        let current: SkipListNode<T> | null = this.head;
        let currentIndex: number = -1;

        while (current !== null) {
            while (current.next !== null && currentIndex + current.distance <= index) {
                currentIndex += current.distance;
                current = current.next;
            }

            if (currentIndex === index && current.value !== null) {
                return current.value;
            }

            current = current.down;
        }

        return null;
    }

    // Get size
    getSize(): number {
        return this.size;
    }

    // Get levels
    getLevels(): number {
        return this.levels;
    }

    // Print for debugging
    print(): void {
        let levelHead: SkipListNode<T> | null = this.head;
        let levelNum: number = this.levels;

        while (levelHead !== null) {
            let current: SkipListNode<T> | null = levelHead.next;
            let output: string = `Level ${levelNum}: `;
            
            while (current !== null) {
                output += `${current.value} `;
                current = current.next;
            }
            
            console.log(output);
            levelHead = levelHead.down;
            levelNum--;
        }
    }
}
// Create and use the skip list
const skipList = new SkipList<number>();

// Insert values
skipList.insert(10);
skipList.insert(20);
skipList.insert(5);
skipList.insert(15);
skipList.insert(25);

// Search
console.log("Contains 15:", skipList.search(15)); // true
console.log("Contains 30:", skipList.search(30)); // false

// Remove
console.log("Removed 15:", skipList.remove(15)); // true

// Get by index
console.log("Element at index 2:", skipList.getByIndex(2)); // 20

// Print structure
skipList.print();

// Get statistics
console.log("Size:", skipList.getSize());
console.log("Levels:", skipList.getLevels());
class EnhancedSkipList<T> {
    private head: SkipListNode<T>;
    private levels: number = 1;
    private probability: number = 0.5;
    private size: number = 0;
    private compare: (a: T, b: T) => number;

    constructor(compareFn?: (a: T, b: T) => number) {
        this.head = new SkipListNode<T>(null as T);
        this.compare = compareFn || ((a, b) => {
            if (a === b) return 0;
            return a < b ? -1 : 1;
        });
    }

    private compareValues(a: T, b: T): number {
        if (a === null && b === null) return 0;
        if (a === null) return -1;
        if (b === null) return 1;
        return this.compare(a, b);
    }

    // Modified search with comparator
    search(value: T): boolean {
        let current: SkipListNode<T> | null = this.head;

        while (current !== null) {
            while (current.next !== null && 
                   this.compareValues(current.next.value, value) <= 0) {
                current = current.next;
            }

            if (this.compareValues(current.value, value) === 0) {
                return true;
            }

            current = current.down;
        }

        return false;
    }

    // Similar modifications needed for insert and remove methods
    // ... (implementation would follow similar pattern)
}

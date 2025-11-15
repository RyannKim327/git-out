class SkipListNode<T> {
    value: T;
    next: SkipListNode<T> | null;
    down: SkipListNode<T> | null;
    level: number;

    constructor(value: T, level: number) {
        this.value = value;
        this.next = null;
        this.down = null;
        this.level = level;
    }
}

class SkipList<T> {
    private head: SkipListNode<T>;
    private maxLevel: number;
    private probability: number;
    private size: number;

    constructor(maxLevel: number = 16, probability: number = 0.5) {
        this.maxLevel = maxLevel;
        this.probability = probability;
        this.size = 0;
        
        // Create head node with negative infinity as value
        this.head = new SkipListNode<T>(null as T, maxLevel);
        
        // Initialize the head's next pointers
        let current: SkipListNode<T> = this.head;
        for (let i = maxLevel - 1; i >= 0; i--) {
            current.down = new SkipListNode<T>(null as T, i);
            current = current.down;
        }
    }

    // Randomly determine the level for a new node
    private randomLevel(): number {
        let level = 1;
        while (Math.random() < this.probability && level < this.maxLevel) {
            level++;
        }
        return level;
    }

    // Insert a value into the skip list
    insert(value: T): void {
        const newLevel = this.randomLevel();
        const newNode = new SkipListNode<T>(value, newLevel);
        
        let current = this.head;
        const update: SkipListNode<T>[] = new Array(this.maxLevel);
        
        // Traverse from top level to bottom
        for (let i = this.maxLevel - 1; i >= 0; i--) {
            while (current.next && current.next.value < value) {
                current = current.next;
            }
            if (i < newLevel) {
                update[i] = current;
            }
            if (current.down) {
                current = current.down;
            }
        }
        
        // Insert the new node at each appropriate level
        for (let i = 0; i < newLevel; i++) {
            if (update[i]) {
                newNode.next = update[i].next;
                update[i].next = newNode;
                
                // Create a copy for lower levels if needed
                if (i > 0) {
                    const lowerNode = new SkipListNode<T>(value, i);
                    newNode.down = lowerNode;
                    newNode = lowerNode;
                }
            }
        }
        
        this.size++;
    }

    // Search for a value in the skip list
    search(value: T): boolean {
        let current = this.head;
        
        for (let i = this.maxLevel - 1; i >= 0; i--) {
            while (current.next && current.next.value < value) {
                current = current.next;
            }
            
            if (current.next && current.next.value === value) {
                return true;
            }
            
            if (current.down) {
                current = current.down;
            }
        }
        
        return false;
    }

    // Delete a value from the skip list
    delete(value: T): boolean {
        let current = this.head;
        let found = false;
        const update: SkipListNode<T>[] = new Array(this.maxLevel);
        
        // Find the node and track update points
        for (let i = this.maxLevel - 1; i >= 0; i--) {
            while (current.next && current.next.value < value) {
                current = current.next;
            }
            
            update[i] = current;
            
            if (current.down) {
                current = current.down;
            }
        }
        
        // Remove the node from all levels
        for (let i = 0; i < this.maxLevel; i++) {
            if (update[i].next && update[i].next.value === value) {
                update[i].next = update[i].next.next;
                found = true;
            }
        }
        
        if (found) {
            this.size--;
        }
        
        return found;
    }

    // Get the number of elements in the skip list
    getSize(): number {
        return this.size;
    }

    // Convert skip list to array for debugging/visualization
    toArray(): T[] {
        const result: T[] = [];
        let current = this.head;
        
        // Go to the bottom level
        while (current.down) {
            current = current.down;
        }
        
        // Traverse the bottom level
        while (current.next) {
            result.push(current.next.value);
            current = current.next;
        }
        
        return result;
    }

    // Print the skip list for visualization
    print(): void {
        let currentLevel = this.maxLevel - 1;
        let current = this.head;
        
        while (currentLevel >= 0) {
            let output = `Level ${currentLevel}: `;
            let node: SkipListNode<T> | null = current;
            
            while (node) {
                output += node.value !== null ? `${node.value} -> ` : "HEAD -> ";
                node = node.next;
            }
            
            console.log(output + "NULL");
            
            if (current.down) {
                current = current.down;
                currentLevel--;
            } else {
                break;
            }
        }
    }
}
// Create a skip list for numbers
const skipList = new SkipList<number>();

// Insert values
skipList.insert(10);
skipList.insert(20);
skipList.insert(5);
skipList.insert(15);
skipList.insert(25);

// Search for values
console.log("Contains 15:", skipList.search(15)); // true
console.log("Contains 30:", skipList.search(30)); // false

// Delete a value
console.log("Deleted 15:", skipList.delete(15)); // true

// Get all values
console.log("All values:", skipList.toArray()); // [5, 10, 20, 25]

// Print structure
skipList.print();

// Create a skip list for strings
const stringSkipList = new SkipList<string>();
stringSkipList.insert("apple");
stringSkipList.insert("banana");
stringSkipList.insert("cherry");
console.log("Contains 'banana':", stringSkipList.search("banana"));
interface Comparator<T> {
    (a: T, b: T): number;
}

class EnhancedSkipList<T> {
    private head: SkipListNode<T>;
    private maxLevel: number;
    private probability: number;
    private size: number;
    private compare: Comparator<T>;

    constructor(
        comparator?: Comparator<T>,
        maxLevel: number = 16,
        probability: number = 0.5
    ) {
        this.maxLevel = maxLevel;
        this.probability = probability;
        this.size = 0;
        this.compare = comparator || this.defaultComparator;
        
        this.head = new SkipListNode<T>(null as T, maxLevel);
        
        let current: SkipListNode<T> = this.head;
        for (let i = maxLevel - 1; i >= 0; i--) {
            current.down = new SkipListNode<T>(null as T, i);
            current = current.down;
        }
    }

    private defaultComparator(a: T, b: T): number {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    private randomLevel(): number {
        let level = 1;
        while (Math.random() < this.probability && level < this.maxLevel) {
            level++;
        }
        return level;
    }

    insert(value: T): void {
        const newLevel = this.randomLevel();
        const newNode = new SkipListNode<T>(value, newLevel);
        
        let current = this.head;
        const update: SkipListNode<T>[] = new Array(this.maxLevel);
        
        for (let i = this.maxLevel - 1; i >= 0; i--) {
            while (
                current.next &&
                this.compare(current.next.value, value) < 0
            ) {
                current = current.next;
            }
            if (i < newLevel) {
                update[i] = current;
            }
            if (current.down) {
                current = current.down;
            }
        }
        
        for (let i = 0; i < newLevel; i++) {
            if (update[i]) {
                newNode.next = update[i].next;
                update[i].next = newNode;
                
                if (i > 0) {
                    const lowerNode = new SkipListNode<T>(value, i);
                    newNode.down = lowerNode;
                    newNode = lowerNode;
                }
            }
        }
        
        this.size++;
    }

    // Other methods would need to be updated to use the comparator
    // Implement search, delete, etc. similarly to the basic version
}

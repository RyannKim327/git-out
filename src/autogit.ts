class Node {
    value: number;
    forward: Node[];

    constructor(value: number, level: number) {
        this.value = value;
        this.forward = new Array(level + 1).fill(null);
    }
}

class SkipList {
    private head: Node;
    private maxLevel: number;
    private p: number; // Probability for level generation
    private currentLevel: number;

    constructor(maxLevel: number, p: number) {
        this.maxLevel = maxLevel;
        this.p = p;
        this.currentLevel = 0;
        this.head = new Node(-Infinity, maxLevel); // Negative infinity as head
    }

    // Generate a random level for the new node
    private randomLevel(): number {
        let level = 0;
        while (Math.random() < this.p && level < this.maxLevel) {
            level++;
        }
        return level;
    }

    // Insert a new value into the skip list
    insert(value: number): void {
        const update = new Array(this.maxLevel + 1).fill(null);
        let currentNode: Node = this.head;

        // Find the position to insert the new value
        for (let i = this.currentLevel; i >= 0; i--) {
            while (currentNode.forward[i] !== null && currentNode.forward[i].value < value) {
                currentNode = currentNode.forward[i];
            }
            update[i] = currentNode;
        }

        currentNode = currentNode.forward[0];

        // If the value already exists, do not insert it
        if (currentNode !== null && currentNode.value === value) {
            return;
        }

        // Generate a random level for the new node
        const newLevel = this.randomLevel();
        if (newLevel > this.currentLevel) {
            for (let i = this.currentLevel + 1; i <= newLevel; i++) {
                update[i] = this.head;
            }
            this.currentLevel = newLevel;
        }

        // Create the new node
        const newNode = new Node(value, newLevel);

        // Insert the new node
        for (let i = 0; i <= newLevel; i++) {
            newNode.forward[i] = update[i].forward[i];
            update[i].forward[i] = newNode;
        }
    }

    // Search for a value in the skip list
    search(value: number): boolean {
        let currentNode: Node = this.head;

        for (let i = this.currentLevel; i >= 0; i--) {
            while (currentNode.forward[i] !== null && currentNode.forward[i].value < value) {
                currentNode = currentNode.forward[i];
            }
        }

        currentNode = currentNode.forward[0];

        return currentNode !== null && currentNode.value === value;
    }

    // Delete a value from the skip list
    delete(value: number): boolean {
        const update = new Array(this.maxLevel + 1).fill(null);
        let currentNode: Node = this.head;

        // Find the node to delete
        for (let i = this.currentLevel; i >= 0; i--) {
            while (currentNode.forward[i] !== null && currentNode.forward[i].value < value) {
                currentNode = currentNode.forward[i];
            }
            update[i] = currentNode;
        }

        currentNode = currentNode.forward[0];

        // If the node is not found, return false
        if (currentNode === null || currentNode.value !== value) {
            return false;
        }

        // Delete the node
        for (let i = 0; i <= this.currentLevel; i++) {
            if (update[i].forward[i] !== currentNode) break;
            update[i].forward[i] = currentNode.forward[i];
        }

        // Remove levels if necessary
        while (this.currentLevel > 0 && this.head.forward[this.currentLevel] === null) {
            this.currentLevel--;
        }

        return true;
    }

    // Utility function to print the skip list
    printList(): void {
        for (let i = this.currentLevel; i >= 0; i--) {
            let currentNode: Node = this.head.forward[i];
            let levelNodes: number[] = [];
            while (currentNode !== null) {
                levelNodes.push(currentNode.value);
                currentNode = currentNode.forward[i];
            }
            console.log(`Level ${i}: ${levelNodes.join(' -> ')}`);
        }
    }
}

// Example usage
const skipList = new SkipList(3, 0.5);
skipList.insert(3);
skipList.insert(6);
skipList.insert(7);
skipList.insert(9);
skipList.insert(12);
skipList.insert(19);
skipList.insert(17);
skipList.insert(26);
skipList.insert(21);
skipList.insert(25);

console.log("Skip List after inserts:");
skipList.printList();

console.log("Searching for 19:", skipList.search(19));
console.log("Deleting 19:", skipList.delete(19));
console.log("Searching for 19 after deletion:", skipList.search(19));

console.log("Skip List after deletion:");
skipList.printList();

// node.ts
class Node<T> {
    value: T;
    next: Node<T> | null; // Reference to the next node, or null if it's the last node

    constructor(value: T) {
        this.value = value;
        this.next = null; // A new node initially points to nothing
    }
}
// linked-list.ts
import { Node } from './node'; // Assuming Node is in a separate file, or just define it above

class LinkedList<T> {
    head: Node<T> | null;
    tail: Node<T> | null;
    length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /**
     * Adds a new node to the end of the list.
     * Time Complexity: O(1)
     */
    append(value: T): void {
        const newNode = new Node(value);
        if (!this.head) { // If the list is empty
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode; // Current tail points to the new node
            this.tail = newNode;       // New node becomes the tail
        }
        this.length++;
    }

    /**
     * Adds a new node to the beginning of the list.
     * Time Complexity: O(1)
     */
    prepend(value: T): void {
        const newNode = new Node(value);
        if (!this.head) { // If the list is empty
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head; // New node points to the current head
            this.head = newNode;       // New node becomes the head
        }
        this.length++;
    }

    /**
     * Inserts a new node at a specific index.
     * Time Complexity: O(n) in worst case (middle insertion), O(1) in best case (head/tail insertion)
     */
    insertAt(value: T, index: number): boolean {
        if (index < 0 || index > this.length) {
            console.error("Index out of bounds.");
            return false;
        }
        if (index === 0) {
            this.prepend(value);
            return true;
        }
        if (index === this.length) {
            this.append(value);
            return true;
        }

        const newNode = new Node(value);
        let currentNode = this.head;
        for (let i = 0; i < index - 1; i++) {
            currentNode = currentNode!.next; // Traverse to the node *before* the insertion point
        }
        newNode.next = currentNode!.next; // New node points to what current node was pointing to
        currentNode!.next = newNode;     // Current node points to the new node
        this.length++;
        return true;
    }

    /**
     * Removes and returns the node at a specific index.
     * Time Complexity: O(n) in worst case, O(1) for removing head
     */
    removeAt(index: number): T | null {
        if (index < 0 || index >= this.length || !this.head) {
            console.error("Index out of bounds or list is empty.");
            return null;
        }

        let removedValue: T;

        if (index === 0) { // Remove head
            removedValue = this.head.value;
            this.head = this.head.next;
            if (!this.head) { // If list became empty
                this.tail = null;
            }
        } else {
            let currentNode = this.head;
            for (let i = 0; i < index - 1; i++) {
                currentNode = currentNode!.next!; // Move to node *before* the one to remove
            }
            const nodeToRemove = currentNode!.next!;
            removedValue = nodeToRemove.value;
            currentNode!.next = nodeToRemove.next; // Skip the nodeToRemove

            if (!currentNode.next) { // If the removed node was the tail
                this.tail = currentNode;
            }
        }
        this.length--;
        return removedValue;
    }

    /**
     * Gets the value of the node at a specific index.
     * Time Complexity: O(n)
     */
    get(index: number): T | null {
        if (index < 0 || index >= this.length || !this.head) {
            return null;
        }
        let currentNode = this.head;
        for (let i = 0; i < index; i++) {
            currentNode = currentNode!.next;
        }
        return currentNode!.value;
    }

    /**
     * Finds the first index of a given value.
     * Time Complexity: O(n)
     */
    indexOf(value: T): number {
        if (!this.head) {
            return -1;
        }
        let currentNode = this.head;
        let index = 0;
        while (currentNode) {
            if (currentNode.value === value) {
                return index;
            }
            currentNode = currentNode.next!;
            index++;
        }
        return -1;
    }

    /**
     * Checks if the list is empty.
     * Time Complexity: O(1)
     */
    isEmpty(): boolean {
        return this.length === 0;
    }

    /**
     * Returns the current size (number of nodes) of the list.
     * Time Complexity: O(1)
     */
    size(): number {
        return this.length;
    }

    /**
     * Converts the linked list to an array for easy visualization/debugging.
     * Time Complexity: O(n)
     */
    toArray(): T[] {
        const arr: T[] = [];
        let currentNode = this.head;
        while (currentNode) {
            arr.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return arr;
    }

    /**
     * Prints the linked list elements to the console.
     * Time Complexity: O(n)
     */
    print(): void {
        console.log(this.toArray().join(" -> "));
    }
}
// main.ts (or index.ts)
// Assume Node and LinkedList are defined above or imported from their respective files.

// --- Example with Numbers ---
console.log("--- Number List ---");
const numberList = new LinkedList<number>();
console.log("Is empty:", numberList.isEmpty()); // true

numberList.append(10);
numberList.append(20);
numberList.prepend(5);
numberList.print(); // 5 -> 10 -> 20
console.log("Size:", numberList.size()); // 3

numberList.insertAt(15, 2);
numberList.print(); // 5 -> 10 -> 15 -> 20
console.log("Value at index 2:", numberList.get(2)); // 15
console.log("Index of 20:", numberList.indexOf(20)); // 3
console.log("Index of 25 (not found):", numberList.indexOf(25)); // -1

numberList.removeAt(1); // Remove 10
numberList.print(); // 5 -> 15 -> 20
console.log("Removed value at index 0:", numberList.removeAt(0)); // 5
numberList.print(); // 15 -> 20

console.log("Value at index 1 after removal:", numberList.get(1)); // 20
console.log("Size:", numberList.size()); // 2
numberList.removeAt(1); // Remove 20
numberList.removeAt(0); // Remove 15
numberList.print(); // (empty)
console.log("Is empty:", numberList.isEmpty()); // true
console.log("Size:", numberList.size()); // 0


// --- Example with Strings ---
console.log("\n--- String List ---");
const stringList = new LinkedList<string>();
stringList.append("Apple");
stringList.append("Banana");
stringList.prepend("Orange");
stringList.insertAt("Grape", 1);
stringList.print(); // Orange -> Grape -> Apple -> Banana
console.log("Size:", stringList.size()); // 4
console.log("Value at index 2:", stringList.get(2)); // Apple
console.log("Removed:", stringList.removeAt(1)); // Grape
stringList.print(); // Orange -> Apple -> Banana


// --- Example with Objects ---
console.log("\n--- Object List ---");
interface Car {
    make: string;
    model: string;
    year: number;
}

const carList = new LinkedList<Car>();
carList.append({ make: "Toyota", model: "Camry", year: 2020 });
carList.append({ make: "Honda", model: "Civic", year: 2021 });
carList.prepend({ make: "Ford", model: "F-150", year: 2019 });
carList.print();
// Output:
// [ { make: 'Ford', model: 'F-150', year: 2019 },
//   { make: 'Toyota', model: 'Camry', year: 2020 },
//   { make: 'Honda', model: 'Civic', year: 2021 } ]
console.log("First car:", carList.get(0)); // { make: "Ford", model: "F-150", year: 2019 }
console.log("Removed car:", carList.removeAt(1));
carList.print();
// Output:
// [ { make: 'Ford', model: 'F-150', year: 2019 },
//   { make: 'Honda', model: 'Civic', year: 2021 } ]

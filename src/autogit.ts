// node.ts
class Node<T> {
    public value: T;
    public next: Node<T> | null; // Reference to the next node, or null if it's the last node

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}
// linked-list.ts
import { Node } from './node'; // Assuming node.ts is in the same directory

class LinkedList<T> {
    private head: Node<T> | null; // Reference to the first node
    private tail: Node<T> | null; // Reference to the last node (for O(1) append)
    private count: number;        // Number of elements in the list

    constructor() {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    /**
     * Adds an element to the end of the list.
     * @param value The value to add.
     */
    public append(value: T): void {
        const newNode = new Node(value);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode; // ! is a non-null assertion operator
            this.tail = newNode;
        }
        this.count++;
    }

    /**
     * Adds an element to the beginning of the list.
     * @param value The value to add.
     */
    public prepend(value: T): void {
        const newNode = new Node(value);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.count++;
    }

    /**
     * Inserts an element at a specific index.
     * @param value The value to insert.
     * @param index The index at which to insert the value.
     * @returns True if insertion was successful, false otherwise.
     */
    public insertAt(value: T, index: number): boolean {
        if (index < 0 || index > this.count) {
            console.error(`Index out of bounds. Current size: ${this.count}, provided index: ${index}`);
            return false;
        }

        if (index === 0) {
            this.prepend(value);
        } else if (index === this.count) {
            this.append(value);
        } else {
            const newNode = new Node(value);
            let current = this.head;
            let previous: Node<T> | null = null;
            let currentIndex = 0;

            while (currentIndex < index) {
                previous = current;
                current = current!.next;
                currentIndex++;
            }

            newNode.next = current;
            previous!.next = newNode;
            this.count++;
        }
        return true;
    }

    /**
     * Retrieves the value at a specific index.
     * @param index The index of the element to retrieve.
     * @returns The value at the specified index, or undefined if index is out of bounds.
     */
    public get(index: number): T | undefined {
        if (index < 0 || index >= this.count) {
            console.error(`Index out of bounds. Current size: ${this.count}, provided index: ${index}`);
            return undefined;
        }

        let current = this.head;
        let currentIndex = 0;

        while (currentIndex < index) {
            current = current!.next;
            currentIndex++;
        }
        return current!.value;
    }

    /**
     * Removes an element at a specific index.
     * @param index The index of the element to remove.
     * @returns The value of the removed element, or undefined if index is out of bounds.
     */
    public removeAt(index: number): T | undefined {
        if (index < 0 || index >= this.count) {
            console.error(`Index out of bounds. Current size: ${this.count}, provided index: ${index}`);
            return undefined;
        }

        let removedValue: T;

        if (index === 0) {
            removedValue = this.head!.value;
            this.head = this.head!.next;
            if (this.head === null) { // If list becomes empty
                this.tail = null;
            }
        } else {
            let current = this.head;
            let previous: Node<T> | null = null;
            let currentIndex = 0;

            while (currentIndex < index) {
                previous = current;
                current = current!.next;
                currentIndex++;
            }

            removedValue = current!.value;
            previous!.next = current!.next;

            if (current === this.tail) { // If the removed node was the tail
                this.tail = previous;
            }
        }
        this.count--;
        return removedValue;
    }

    /**
     * Removes the first occurrence of a specific value from the list.
     * @param value The value to remove.
     * @returns The removed value, or undefined if not found.
     */
    public remove(value: T): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        // If head is the node to be removed
        if (this.head!.value === value) {
            return this.removeAt(0);
        }

        let current = this.head;
        let previous: Node<T> | null = null;

        while (current !== null && current.value !== value) {
            previous = current;
            current = current.next;
        }

        if (current === null) { // Value not found
            return undefined;
        }

        // Value found, remove it
        previous!.next = current.next;

        if (current === this.tail) { // If the removed node was the tail
            this.tail = previous;
        }

        this.count--;
        return current.value;
    }

    /**
     * Finds the index of the first occurrence of a specific value.
     * @param value The value to search for.
     * @returns The index of the value, or -1 if not found.
     */
    public find(value: T): number {
        let current = this.head;
        let currentIndex = 0;

        while (current !== null) {
            if (current.value === value) {
                return currentIndex;
            }
            current = current.next;
            currentIndex++;
        }
        return -1;
    }

    /**
     * Checks if the list is empty.
     * @returns True if the list is empty, false otherwise.
     */
    public isEmpty(): boolean {
        return this.count === 0;
    }

    /**
     * Returns the number of elements in the list.
     * @returns The size of the list.
     */
    public size(): number {
        return this.count;
    }

    /**
     * Clears all elements from the list.
     */
    public clear(): void {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    /**
     * Converts the linked list to an array for easy inspection.
     * @returns An array containing all values in the list.
     */
    public toArray(): T[] {
        const arr: T[] = [];
        let current = this.head;
        while (current !== null) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }

    /**
     * Makes the LinkedList iterable, so it can be used with `for...of` loops.
     * This is a special method that allows you to iterate over the values directly.
     */
    public *[Symbol.iterator](): Iterator<T> {
        let current = this.head;
        while (current) {
            yield current.value;
            current = current.next;
        }
    }
}
// main.ts
import { LinkedList } from './linked-list';

// --- Example with numbers ---
console.log('--- Number List ---');
const numberList = new LinkedList<number>();

console.log('Is empty?', numberList.isEmpty()); // true
numberList.append(10);
numberList.append(20);
numberList.prepend(5); // List: 5 -> 10 -> 20
numberList.insertAt(15, 2); // List: 5 -> 10 -> 15 -> 20
numberList.append(25); // List: 5 -> 10 -> 15 -> 20 -> 25

console.log('List after operations:', numberList.toArray()); // [5, 10, 15, 20, 25]
console.log('Size:', numberList.size()); // 5
console.log('Is empty?', numberList.isEmpty()); // false

console.log('Get at index 2:', numberList.get(2)); // 15
console.log('Find 20:', numberList.find(20)); // 3
console.log('Find 100 (not found):', numberList.find(100)); // -1

console.log('Remove at index 0 (5):', numberList.removeAt(0)); // 5
console.log('List:', numberList.toArray()); // [10, 15, 20, 25]

console.log('Remove value 20:', numberList.remove(20)); // 20
console.log('List:', numberList.toArray()); // [10, 15, 25]

console.log('Remove value 25 (tail):', numberList.remove(25)); // 25
console.log('List:', numberList.toArray()); // [10, 15]
console.log('Size:', numberList.size()); // 2

// Iterating with for...of
console.log('Iterating list:');
for (const item of numberList) {
    console.log(item); // 10, 15
}

numberList.clear();
console.log('List after clear:', numberList.toArray()); // []
console.log('Size after clear:', numberList.size()); // 0

// --- Example with strings ---
console.log('\n--- String List ---');
const stringList = new LinkedList<string>();
stringList.append('Apple');
stringList.append('Banana');
stringList.prepend('Orange'); // Orange -> Apple -> Banana
stringList.insertAt('Grape', 2); // Orange -> Apple -> Grape -> Banana

console.log('String list:', stringList.toArray()); // ["Orange", "Apple", "Grape", "Banana"]
console.log('Removed "Apple":', stringList.remove('Apple')); // Apple
console.log('String list:', stringList.toArray()); // ["Orange", "Grape", "Banana"]

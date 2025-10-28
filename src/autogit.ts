/**
 * Represents a single node in the linked list.
 * @template T The type of the value stored in the node.
 */
class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    /**
     * Creates a new ListNode.
     * @param value The value to store in the node.
     * @param next The next node in the sequence, or null if it's the last node.
     */
    constructor(value: T, next: ListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}
/**
 * Implements a singly linked list data structure.
 * @template T The type of elements stored in the list.
 */
class LinkedList<T> {
    private head: ListNode<T> | null;
    private tail: ListNode<T> | null;
    private _size: number;

    /**
     * Creates an empty LinkedList.
     */
    constructor() {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }

    /**
     * Returns the number of elements in the list.
     */
    get size(): number {
        return this._size;
    }

    /**
     * Checks if the list is empty.
     * @returns True if the list is empty, false otherwise.
     */
    isEmpty(): boolean {
        return this.head === null;
    }

    /**
     * Adds an element to the end of the list. O(1) operation.
     * @param value The value to add.
     * @returns The LinkedList instance (for chaining).
     */
    append(value: T): LinkedList<T> {
        const newNode = new ListNode(value);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            // TypeScript knows tail won't be null here due to isEmpty() check
            this.tail!.next = newNode;
            this.tail = newNode;
        }
        this._size++;
        return this;
    }

    /**
     * Adds an element to the beginning of the list. O(1) operation.
     * @param value The value to add.
     * @returns The LinkedList instance (for chaining).
     */
    prepend(value: T): LinkedList<T> {
        const newNode = new ListNode(value, this.head);
        this.head = newNode;
        if (this.isEmpty()) { // This means the list was empty before prepending
            this.tail = newNode;
        }
        this._size++;
        return this;
    }

    /**
     * Inserts an element at a specific index in the list. O(n) operation.
     * @param value The value to insert.
     * @param index The index at which to insert the element.
     * @returns The LinkedList instance (for chaining).
     * @throws Error if the index is out of bounds.
     */
    insertAt(value: T, index: number): LinkedList<T> {
        if (index < 0 || index > this._size) {
            throw new Error("Index out of bounds");
        }
        if (index === 0) {
            return this.prepend(value);
        }
        if (index === this._size) {
            return this.append(value);
        }

        const newNode = new ListNode(value);
        let currentNode = this.head;
        let previousNode: ListNode<T> | null = null;
        let currentIndex = 0;

        while (currentNode !== null && currentIndex < index) {
            previousNode = currentNode;
            currentNode = currentNode.next;
            currentIndex++;
        }

        // At this point, previousNode should be the node *before* the insertion point
        // and currentNode is the node *at* the insertion point.
        if (previousNode) {
            newNode.next = currentNode;
            previousNode.next = newNode;
            this._size++;
        }
        return this;
    }

    /**
     * Removes the first occurrence of a specific value from the list. O(n) operation.
     * @param value The value to remove.
     * @returns True if the value was found and removed, false otherwise.
     */
    remove(value: T): boolean {
        if (this.isEmpty()) {
            return false;
        }

        // Case 1: Value is at the head
        if (this.head!.value === value) {
            this.head = this.head!.next;
            if (this.head === null) { // List became empty
                this.tail = null;
            }
            this._size--;
            return true;
        }

        // Case 2: Value is elsewhere in the list
        let currentNode = this.head!.next;
        let previousNode = this.head;

        while (currentNode !== null && currentNode.value !== value) {
            previousNode = currentNode;
            currentNode = currentNode.next;
        }

        if (currentNode !== null) { // Found the value
            previousNode!.next = currentNode.next;
            if (currentNode === this.tail) { // Removed the tail
                this.tail = previousNode;
            }
            this._size--;
            return true;
        }

        return false; // Value not found
    }

    /**
     * Removes the element at a specific index from the list. O(n) operation.
     * @param index The index of the element to remove.
     * @returns The value of the removed element, or null if the index is out of bounds.
     */
    removeAt(index: number): T | null {
        if (index < 0 || index >= this._size || this.isEmpty()) {
            return null;
        }

        let removedValue: T | null = null;

        if (index === 0) {
            removedValue = this.head!.value;
            this.head = this.head!.next;
            if (this.head === null) {
                this.tail = null;
            }
        } else {
            let currentNode = this.head;
            let previousNode: ListNode<T> | null = null;
            let currentIndex = 0;

            while (currentNode !== null && currentIndex < index) {
                previousNode = currentNode;
                currentNode = currentNode.next;
                currentIndex++;
            }

            if (currentNode) {
                removedValue = currentNode.value;
                previousNode!.next = currentNode.next;
                if (currentNode === this.tail) {
                    this.tail = previousNode;
                }
            }
        }
        this._size--;
        return removedValue;
    }

    /**
     * Finds and returns the value of the node at a specific index. O(n) operation.
     * @param index The index of the element to retrieve.
     * @returns The value at the specified index, or null if the index is out of bounds.
     */
    get(index: number): T | null {
        if (index < 0 || index >= this._size || this.isEmpty()) {
            return null;
        }

        let currentNode = this.head;
        let currentIndex = 0;

        while (currentNode !== null && currentIndex < index) {
            currentNode = currentNode.next;
            currentIndex++;
        }

        return currentNode ? currentNode.value : null;
    }

    /**
     * Finds and returns the first node containing a specific value. O(n) operation.
     * @param value The value to search for.
     * @returns The value of the node if found, otherwise null.
     */
    find(value: T): T | null {
        if (this.isEmpty()) {
            return null;
        }

        let currentNode = this.head;
        while (currentNode !== null) {
            if (currentNode.value === value) {
                return currentNode.value;
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    /**
     * Returns the value of the first element in the list. O(1) operation.
     * @returns The value of the head node, or null if the list is empty.
     */
    peekHead(): T | null {
        return this.head ? this.head.value : null;
    }

    /**
     * Returns the value of the last element in the list. O(1) operation.
     * @returns The value of the tail node, or null if the list is empty.
     */
    peekTail(): T | null {
        return this.tail ? this.tail.value : null;
    }

    /**
     * Converts the linked list to an array. O(n) operation.
     * @returns An array containing all elements in the list, in order.
     */
    toArray(): T[] {
        const elements: T[] = [];
        let currentNode = this.head;
        while (currentNode !== null) {
            elements.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return elements;
    }

    /**
     * Provides a string representation of the linked list.
     * @returns A string like "value1 -> value2 -> ... -> null".
     */
    toString(): string {
        return this.toArray().map(value => String(value)).join(' -> ') + (this.isEmpty() ? 'null' : ' -> null');
    }

    /**
     * Makes the LinkedList iterable, allowing use with `for...of` loops.
     */
    *[Symbol.iterator](): IterableIterator<T> {
        let currentNode = this.head;
        while (currentNode !== null) {
            yield currentNode.value;
            currentNode = currentNode.next;
        }
    }
}
// Create a new linked list for numbers
const numberList = new LinkedList<number>();

console.log("Is empty:", numberList.isEmpty()); // true
console.log("Size:", numberList.size);       // 0

numberList.append(10);
numberList.append(20);
numberList.prepend(5); // List: 5 -> 10 -> 20 -> null

console.log("List after append/prepend:", numberList.toString()); // 5 -> 10 -> 20 -> null
console.log("Size:", numberList.size);                         // 3
console.log("Head:", numberList.peekHead());                     // 5
console.log("Tail:", numberList.peekTail());                     // 20

numberList.insertAt(15, 2); // List: 5 -> 10 -> 15 -> 20 -> null
console.log("List after insertAt(15, 2):", numberList.toString()); // 5 -> 10 -> 15 -> 20 -> null
console.log("Size:", numberList.size);                             // 4

console.log("Get value at index 2:", numberList.get(2)); // 15
console.log("Find value 10:", numberList.find(10));     // 10
console.log("Find value 100:", numberList.find(100));    // null

numberList.remove(10); // List: 5 -> 15 -> 20 -> null
console.log("List after remove(10):", numberList.toString()); // 5 -> 15 -> 20 -> null
console.log("Size:", numberList.size);                       // 3

numberList.removeAt(0); // Removes 5. List: 15 -> 20 -> null
console.log("List after removeAt(0):", numberList.toString()); // 15 -> 20 -> null
console.log("Size:", numberList.size);                         // 2
console.log("Head:", numberList.peekHead());                   // 15

numberList.append(30); // List: 15 -> 20 -> 30 -> null
console.log("List after append(30):", numberList.toString()); // 15 -> 20 -> 30 -> null
console.log("Tail:", numberList.peekTail());                   // 30

const removedVal = numberList.removeAt(1); // Removes 20. List: 15 -> 30 -> null
console.log("Removed value at index 1:", removedVal);          // 20
console.log("List after removeAt(1):", numberList.toString()); // 15 -> 30 -> null
console.log("Size:", numberList.size);                         // 2

console.log("List to Array:", numberList.toArray()); // [15, 30]

// Using for...of loop due to Symbol.iterator implementation
console.log("Iterating through list:");
for (const item of numberList) {
    console.log(item);
}
// Expected output:
// 15
// 30


// Example with strings
const stringList = new LinkedList<string>();
stringList.append("apple").append("banana").prepend("grape");
console.log("String List:", stringList.toString()); // grape -> apple -> banana -> null
stringList.remove("apple");
console.log("String List after removing 'apple':", stringList.toString()); // grape -> banana -> null

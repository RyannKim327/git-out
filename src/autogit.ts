// Node class for single linked list
class ListNode<T> {
    public value: T;
    public next: ListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

// Singly Linked List class
class LinkedList<T> {
    private head: ListNode<T> | null;
    private tail: ListNode<T> | null;
    private length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // Add to the end of the list
    append(value: T): void {
        const newNode = new ListNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }

        this.length++;
    }

    // Add to the beginning of the list
    prepend(value: T): void {
        const newNode = new ListNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }

        this.length++;
    }

    // Insert at specific position
    insertAt(value: T, position: number): boolean {
        if (position < 0 || position > this.length) {
            return false;
        }

        if (position === 0) {
            this.prepend(value);
            return true;
        }

        if (position === this.length) {
            this.append(value);
            return true;
        }

        const newNode = new ListNode(value);
        let current = this.head;
        let previous: ListNode<T> | null = null;
        let index = 0;

        while (index < position) {
            previous = current;
            current = current!.next;
            index++;
        }

        newNode.next = current;
        previous!.next = newNode;
        this.length++;

        return true;
    }

    // Remove from specific position
    removeAt(position: number): T | null {
        if (position < 0 || position >= this.length || !this.head) {
            return null;
        }

        if (position === 0) {
            const value = this.head.value;
            this.head = this.head.next;
            
            if (!this.head) {
                this.tail = null;
            }
            
            this.length--;
            return value;
        }

        let current = this.head;
        let previous: ListNode<T> | null = null;
        let index = 0;

        while (index < position) {
            previous = current;
            current = current.next!;
            index++;
        }

        previous!.next = current.next;

        if (position === this.length - 1) {
            this.tail = previous;
        }

        this.length--;
        return current.value;
    }

    // Remove by value
    remove(value: T): boolean {
        if (!this.head) return false;

        if (this.head.value === value) {
            this.head = this.head.next;
            this.length--;
            
            if (!this.head) {
                this.tail = null;
            }
            
            return true;
        }

        let current = this.head;
        let previous: ListNode<T> | null = null;

        while (current && current.value !== value) {
            previous = current;
            current = current.next!;
        }

        if (!current) return false;

        previous!.next = current.next;

        if (current === this.tail) {
            this.tail = previous;
        }

        this.length--;
        return true;
    }

    // Find element
    find(value: T): ListNode<T> | null {
        let current = this.head;

        while (current) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }

        return null;
    }

    // Get element at position
    getAt(position: number): T | null {
        if (position < 0 || position >= this.length) {
            return null;
        }

        let current = this.head;
        let index = 0;

        while (index < position) {
            current = current!.next;
            index++;
        }

        return current!.value;
    }

    // Check if list is empty
    isEmpty(): boolean {
        return this.length === 0;
    }

    // Get size
    size(): number {
        return this.length;
    }

    // Convert to array
    toArray(): T[] {
        const result: T[] = [];
        let current = this.head;

        while (current) {
            result.push(current.value);
            current = current.next;
        }

        return result;
    }

    // Print the list
    print(): void {
        let current = this.head;
        const values: string[] = [];

        while (current) {
            values.push(String(current.value));
            current = current.next;
        }

        console.log(values.join(' -> ') + ' -> null');
    }

    // Clear the list
    clear(): void {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
}
// Node class for doubly linked list
class DoublyListNode<T> {
    public value: T;
    public next: DoublyListNode<T> | null;
    public prev: DoublyListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList<T> {
    private head: DoublyListNode<T> | null;
    private tail: DoublyListNode<T> | null;
    private length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value: T): void {
        const newNode = new DoublyListNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail!.next = newNode;
            this.tail = newNode;
        }

        this.length++;
    }

    prepend(value: T): void {
        const newNode = new DoublyListNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }

        this.length++;
    }

    // Other methods are similar but need to handle both next and prev pointers
}
// Example usage
const list = new LinkedList<number>();

// Adding elements
list.append(1);
list.append(2);
list.append(3);
list.prepend(0);

console.log('List:', list.toArray()); // [0, 1, 2, 3]

// Insert and remove
list.insertAt(1.5, 2);
console.log('After insert:', list.toArray()); // [0, 1, 1.5, 2, 3]

list.removeAt(2);
console.log('After remove:', list.toArray()); // [0, 1, 2, 3]

// Find elements
const found = list.find(2);
console.log('Found:', found?.value); // 2

// Get size
console.log('Size:', list.size()); // 4

// Print the list
list.print(); // 0 -> 1 -> 2 -> 3 -> null
interface ILinkedList<T> {
    append(value: T): void;
    prepend(value: T): void;
    insertAt(value: T, position: number): boolean;
    removeAt(position: number): T | null;
    remove(value: T): boolean;
    find(value: T): ListNode<T> | null;
    getAt(position: number): T | null;
    isEmpty(): boolean;
    size(): number;
    toArray(): T[];
    clear(): void;
}

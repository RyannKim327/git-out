// Node class
class ListNode<T> {
    data: T;
    next: ListNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}

// Linked List class
class LinkedList<T> {
    head: ListNode<T> | null;
    private size: number;

    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Add node at the beginning
    prepend(data: T): void {
        const newNode = new ListNode(data);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }

    // Add node at the end
    append(data: T): void {
        const newNode = new ListNode(data);
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    // Insert at specific position
    insertAt(data: T, position: number): void {
        if (position < 0 || position > this.size) {
            throw new Error("Invalid position");
        }

        if (position === 0) {
            this.prepend(data);
            return;
        }

        const newNode = new ListNode(data);
        let current = this.head;
        let previous: ListNode<T> | null = null;
        let index = 0;

        while (index < position) {
            previous = current;
            current = current!.next;
            index++;
        }

        newNode.next = current;
        if (previous) {
            previous.next = newNode;
        }
        this.size++;
    }

    // Remove node by value
    remove(data: T): boolean {
        if (!this.head) return false;

        if (this.head.data === data) {
            this.head = this.head.next;
            this.size--;
            return true;
        }

        let current = this.head;
        let previous: ListNode<T> | null = null;

        while (current && current.data !== data) {
            previous = current;
            current = current.next;
        }

        if (!current) return false;

        if (previous) {
            previous.next = current.next;
        }
        this.size--;
        return true;
    }

    // Remove at position
    removeAt(position: number): T | null {
        if (position < 0 || position >= this.size) {
            throw new Error("Invalid position");
        }

        if (position === 0) {
            const data = this.head!.data;
            this.head = this.head!.next;
            this.size--;
            return data;
        }

        let current = this.head;
        let previous: ListNode<T> | null = null;
        let index = 0;

        while (index < position) {
            previous = current;
            current = current!.next;
            index++;
        }

        const data = current!.data;
        if (previous) {
            previous.next = current!.next;
        }
        this.size--;
        return data;
    }

    // Get element at position
    getAt(position: number): T | null {
        if (position < 0 || position >= this.size) {
            return null;
        }

        let current = this.head;
        let index = 0;

        while (index < position) {
            current = current!.next;
            index++;
        }

        return current!.data;
    }

    // Check if list contains value
    contains(data: T): boolean {
        let current = this.head;

        while (current) {
            if (current.data === data) {
                return true;
            }
            current = current.next;
        }

        return false;
    }

    // Get list size
    getSize(): number {
        return this.size;
    }

    // Convert to array
    toArray(): T[] {
        const array: T[] = [];
        let current = this.head;

        while (current) {
            array.push(current.data);
            current = current.next;
        }

        return array;
    }

    // Clear the list
    clear(): void {
        this.head = null;
        this.size = 0;
    }

    // Print the list
    print(): void {
        let current = this.head;
        let output = "";

        while (current) {
            output += current.data + " -> ";
            current = current.next;
        }

        console.log(output + "null");
    }
}
// Create a linked list
const list = new LinkedList<number>();

// Add elements
list.append(1);
list.append(2);
list.append(3);
list.prepend(0);

list.print(); // 0 -> 1 -> 2 -> 3 -> null

// Access elements
console.log(list.getAt(2)); // 2
console.log(list.contains(3)); // true

// Remove elements
list.remove(2);
list.removeAt(0);

list.print(); // 1 -> 3 -> null

// Convert to array
console.log(list.toArray()); // [1, 3]
console.log("Size:", list.getSize()); // 2
class DoublyListNode<T> {
    data: T;
    next: DoublyListNode<T> | null;
    prev: DoublyListNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList<T> {
    head: DoublyListNode<T> | null;
    tail: DoublyListNode<T> | null;
    private size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    append(data: T): void {
        const newNode = new DoublyListNode(data);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail!.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }

    // Other methods would be implemented similarly
}
interface ILinkedList<T> {
    prepend(data: T): void;
    append(data: T): void;
    insertAt(data: T, position: number): void;
    remove(data: T): boolean;
    removeAt(position: number): T | null;
    getAt(position: number): T | null;
    contains(data: T): boolean;
    getSize(): number;
    toArray(): T[];
    clear(): void;
}

// Your LinkedList class can implement this interface
class LinkedList<T> implements ILinkedList<T> {
    // ... implementation
}

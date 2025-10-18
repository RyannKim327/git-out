class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList<T> {
    private head: ListNode<T> | null;
    private tail: ListNode<T> | null;
    private size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
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
        
        this.size++;
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
        
        this.size++;
    }

    // Insert at specific index
    insertAt(index: number, value: T): void {
        if (index < 0 || index > this.size) {
            throw new Error("Index out of bounds");
        }

        if (index === 0) {
            this.prepend(value);
            return;
        }

        if (index === this.size) {
            this.append(value);
            return;
        }

        const newNode = new ListNode(value);
        let current = this.head;
        let previous: ListNode<T> | null = null;
        let count = 0;

        while (count < index) {
            previous = current;
            current = current!.next;
            count++;
        }

        newNode.next = current;
        previous!.next = newNode;
        this.size++;
    }

    // Remove from end
    removeLast(): T | null {
        if (!this.head) return null;

        if (this.size === 1) {
            const value = this.head.value;
            this.head = null;
            this.tail = null;
            this.size = 0;
            return value;
        }

        let current = this.head;
        while (current!.next !== this.tail) {
            current = current!.next;
        }

        const value = this.tail!.value;
        current!.next = null;
        this.tail = current;
        this.size--;
        return value;
    }

    // Remove from beginning
    removeFirst(): T | null {
        if (!this.head) return null;

        const value = this.head.value;
        this.head = this.head.next;
        
        if (!this.head) {
            this.tail = null;
        }
        
        this.size--;
        return value;
    }

    // Remove at specific index
    removeAt(index: number): T | null {
        if (index < 0 || index >= this.size) {
            throw new Error("Index out of bounds");
        }

        if (index === 0) return this.removeFirst();
        if (index === this.size - 1) return this.removeLast();

        let current = this.head;
        let previous: ListNode<T> | null = null;
        let count = 0;

        while (count < index) {
            previous = current;
            current = current!.next;
            count++;
        }

        const value = current!.value;
        previous!.next = current!.next;
        this.size--;
        return value;
    }

    // Get element at index
    getAt(index: number): T | null {
        if (index < 0 || index >= this.size) return null;

        let current = this.head;
        let count = 0;

        while (count < index) {
            current = current!.next;
            count++;
        }

        return current!.value;
    }

    // Check if list contains value
    contains(value: T): boolean {
        let current = this.head;
        
        while (current) {
            if (current.value === value) return true;
            current = current.next;
        }
        
        return false;
    }

    // Get size
    getSize(): number {
        return this.size;
    }

    // Convert to array
    toArray(): T[] {
        const array: T[] = [];
        let current = this.head;
        
        while (current) {
            array.push(current.value);
            current = current.next;
        }
        
        return array;
    }

    // Clear the list
    clear(): void {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Print the list (for debugging)
    print(): void {
        let current = this.head;
        let output = "";
        
        while (current) {
            output += current.value + " -> ";
            current = current.next;
        }
        
        console.log(output + "null");
    }
}
// Create a new linked list
const list = new LinkedList<number>();

// Add elements
list.append(1);
list.append(2);
list.append(3);
list.prepend(0);

console.log(list.toArray()); // [0, 1, 2, 3]

// Insert at specific position
list.insertAt(2, 1.5);
console.log(list.toArray()); // [0, 1, 1.5, 2, 3]

// Remove elements
list.removeLast();
console.log(list.toArray()); // [0, 1, 1.5, 2]

list.removeFirst();
console.log(list.toArray()); // [1, 1.5, 2]

// Get element
console.log(list.getAt(1)); // 1.5

// Check if contains
console.log(list.contains(1.5)); // true
console.log(list.contains(5)); // false

// Get size
console.log(list.getSize()); // 3
class DoublyListNode<T> {
    value: T;
    next: DoublyListNode<T> | null;
    prev: DoublyListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList<T> {
    private head: DoublyListNode<T> | null;
    private tail: DoublyListNode<T> | null;
    private size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Similar methods as above, but with prev pointer handling
    // Implementation would be similar but with additional prev pointer updates
}

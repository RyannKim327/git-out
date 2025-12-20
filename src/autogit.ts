class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T, next: ListNode<T> | null = null) {
        this.value = value;
        this.next = next;
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
    insertAt(value: T, index: number): void {
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
        let currentIndex = 0;

        while (currentIndex < index) {
            previous = current;
            current = current!.next;
            currentIndex++;
        }

        previous!.next = newNode;
        newNode.next = current;
        this.size++;
    }

    // Remove by value
    remove(value: T): boolean {
        if (!this.head) return false;

        if (this.head.value === value) {
            this.head = this.head.next;
            if (!this.head) this.tail = null;
            this.size--;
            return true;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.value === value) {
                current.next = current.next.next;
                if (!current.next) this.tail = current;
                this.size--;
                return true;
            }
            current = current.next;
        }

        return false;
    }

    // Remove at specific index
    removeAt(index: number): T | null {
        if (index < 0 || index >= this.size || !this.head) {
            return null;
        }

        if (index === 0) {
            const value = this.head.value;
            this.head = this.head.next;
            if (!this.head) this.tail = null;
            this.size--;
            return value;
        }

        let current = this.head;
        let previous: ListNode<T> | null = null;
        let currentIndex = 0;

        while (currentIndex < index) {
            previous = current;
            current = current.next!;
            currentIndex++;
        }

        previous!.next = current.next;
        if (!current.next) this.tail = previous;
        this.size--;

        return current.value;
    }

    // Find element by value
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

    // Get element at index
    getAt(index: number): T | null {
        if (index < 0 || index >= this.size || !this.head) {
            return null;
        }

        let current = this.head;
        let currentIndex = 0;

        while (currentIndex < index) {
            current = current.next!;
            currentIndex++;
        }

        return current.value;
    }

    // Check if list contains value
    contains(value: T): boolean {
        return this.find(value) !== null;
    }

    // Get size of the list
    getSize(): number {
        return this.size;
    }

    // Check if list is empty
    isEmpty(): boolean {
        return this.size === 0;
    }

    // Clear the list
    clear(): void {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Convert list to array
    toArray(): T[] {
        const result: T[] = [];
        let current = this.head;
        
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        
        return result;
    }

    // Print the list (for debugging)
    print(): void {
        let current = this.head;
        let output = "";
        
        while (current) {
            output += `${current.value} -> `;
            current = current.next;
        }
        
        output += "null";
        console.log(output);
    }

    // Iterator for for...of loops
    [Symbol.iterator](): Iterator<T> {
        let current = this.head;
        
        return {
            next(): IteratorResult<T> {
                if (current) {
                    const value = current.value;
                    current = current.next;
                    return { value, done: false };
                } else {
                    return { value: undefined as never, done: true };
                }
            }
        };
    }
}
// Create a linked list of numbers
const list = new LinkedList<number>();

// Add elements
list.append(1);
list.append(2);
list.append(3);
list.prepend(0);

list.print(); // Output: 0 -> 1 -> 2 -> 3 -> null

// Insert at specific position
list.insertAt(1.5, 2);
list.print(); // Output: 0 -> 1 -> 1.5 -> 2 -> 3 -> null

// Remove element
list.remove(1.5);
list.print(); // Output: 0 -> 1 -> 2 -> 3 -> null

// Get element at index
console.log(list.getAt(2)); // Output: 2

// Convert to array
console.log(list.toArray()); // Output: [0, 1, 2, 3]

// Use with for...of loop
for (const value of list) {
    console.log(value);
}
// Output: 0, 1, 2, 3
class DoublyListNode<T> {
    value: T;
    next: DoublyListNode<T> | null;
    prev: DoublyListNode<T> | null;

    constructor(value: T, next: DoublyListNode<T> | null = null, prev: DoublyListNode<T> | null = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

// You can extend the LinkedList class to implement a doubly linked list
// by adding prev pointers and modifying the methods accordingly

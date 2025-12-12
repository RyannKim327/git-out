interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

class LinkedListNode<T> implements ListNode<T> {
    value: T;
    next: LinkedListNode<T> | null;

    constructor(value: T, next: LinkedListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}
class LinkedList<T> {
    private head: LinkedListNode<T> | null;
    private tail: LinkedListNode<T> | null;
    private size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Add to the end of the list
    append(value: T): void {
        const newNode = new LinkedListNode(value);
        
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
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;
        
        if (!this.tail) {
            this.tail = newNode;
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

        const newNode = new LinkedListNode(value);
        let current = this.head;
        let previous: LinkedListNode<T> | null = null;
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

    // Remove from specific index
    removeAt(index: number): T | null {
        if (index < 0 || index >= this.size || !this.head) {
            return null;
        }

        if (index === 0) {
            const removedValue = this.head.value;
            this.head = this.head.next;
            if (!this.head) {
                this.tail = null;
            }
            this.size--;
            return removedValue;
        }

        let current = this.head;
        let previous: LinkedListNode<T> | null = null;
        let currentIndex = 0;

        while (currentIndex < index) {
            previous = current;
            current = current.next!;
            currentIndex++;
        }

        previous!.next = current.next;
        
        if (!current.next) {
            this.tail = previous;
        }
        
        this.size--;
        return current.value;
    }

    // Remove by value
    remove(value: T): boolean {
        if (!this.head) return false;

        if (this.head.value === value) {
            this.head = this.head.next;
            if (!this.head) {
                this.tail = null;
            }
            this.size--;
            return true;
        }

        let current = this.head;
        let previous: LinkedListNode<T> | null = null;

        while (current && current.value !== value) {
            previous = current;
            current = current.next!;
        }

        if (!current) return false;

        previous!.next = current.next;
        
        if (!current.next) {
            this.tail = previous;
        }
        
        this.size--;
        return true;
    }

    // Get value at index
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

    // Find index of value
    indexOf(value: T): number {
        let current = this.head;
        let index = 0;

        while (current) {
            if (current.value === value) {
                return index;
            }
            current = current.next;
            index++;
        }

        return -1;
    }

    // Check if list contains value
    contains(value: T): boolean {
        return this.indexOf(value) !== -1;
    }

    // Get list size
    getSize(): number {
        return this.size;
    }

    // Check if list is empty
    isEmpty(): boolean {
        return this.size === 0;
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

    // Clear the list
    clear(): void {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Print the list (for debugging)
    print(): void {
        let current = this.head;
        const values: string[] = [];
        
        while (current) {
            values.push(String(current.value));
            current = current.next;
        }
        
        console.log(values.join(" -> "));
    }

    // Iterator implementation
    [Symbol.iterator](): Iterator<T> {
        let current = this.head;
        
        return {
            next(): IteratorResult<T> {
                if (!current) {
                    return { done: true, value: undefined };
                }
                
                const value = current.value;
                current = current.next;
                return { done: false, value };
            }
        };
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
list.insertAt(1.5, 2);
console.log(list.toArray()); // [0, 1, 1.5, 2, 3]

// Remove elements
list.remove(1.5);
console.log(list.toArray()); // [0, 1, 2, 3]

// Get element at index
console.log(list.getAt(2)); // 2

// Check size
console.log(list.getSize()); // 4

// Iterate using for...of
for (const value of list) {
    console.log(value);
}

// String list example
const stringList = new LinkedList<string>();
stringList.append("Hello");
stringList.append("World");
console.log(stringList.toArray()); // ["Hello", "World"]

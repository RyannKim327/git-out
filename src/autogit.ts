class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    private head: ListNode<T> | null = null;
    private tail: ListNode<T> | null = null;
    private size: number = 0;

    // Add to the end
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

    // Add to the beginning
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

    // Insert at specific position
    insertAt(value: T, position: number): void {
        if (position < 0 || position > this.size) {
            throw new Error("Invalid position");
        }

        if (position === 0) {
            this.prepend(value);
            return;
        }

        if (position === this.size) {
            this.append(value);
            return;
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

        previous!.next = newNode;
        newNode.next = current;
        this.size++;
    }

    // Remove by value
    remove(value: T): boolean {
        if (!this.head) return false;

        // If head needs to be removed
        if (this.head.value === value) {
            this.head = this.head.next;
            if (!this.head) {
                this.tail = null;
            }
            this.size--;
            return true;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.value === value) {
                current.next = current.next.next;
                if (!current.next) {
                    this.tail = current;
                }
                this.size--;
                return true;
            }
            current = current.next;
        }

        return false;
    }

    // Remove at position
    removeAt(position: number): T | null {
        if (position < 0 || position >= this.size || !this.head) {
            return null;
        }

        if (position === 0) {
            const value = this.head.value;
            this.head = this.head.next;
            if (!this.head) {
                this.tail = null;
            }
            this.size--;
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
        if (!current.next) {
            this.tail = previous;
        }
        this.size--;
        return current.value;
    }

    // Search for value
    contains(value: T): boolean {
        let current = this.head;
        
        while (current) {
            if (current.value === value) {
                return true;
            }
            current = current.next;
        }
        
        return false;
    }

    // Get value at position
    getAt(position: number): T | null {
        if (position < 0 || position >= this.size || !this.head) {
            return null;
        }

        let current = this.head;
        let index = 0;

        while (index < position) {
            current = current.next!;
            index++;
        }

        return current.value;
    }

    // Get size
    getSize(): number {
        return this.size;
    }

    // Check if empty
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
}
class DoublyListNode<T> {
    constructor(
        public value: T,
        public next: DoublyListNode<T> | null = null,
        public prev: DoublyListNode<T> | null = null
    ) {}
}

class DoublyLinkedList<T> {
    private head: DoublyListNode<T> | null = null;
    private tail: DoublyListNode<T> | null = null;
    private size: number = 0;

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
        
        this.size++;
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
        
        this.size++;
    }

    remove(value: T): boolean {
        if (!this.head) return false;

        let current = this.head;
        
        while (current) {
            if (current.value === value) {
                if (current.prev) {
                    current.prev.next = current.next;
                } else {
                    this.head = current.next;
                }
                
                if (current.next) {
                    current.next.prev = current.prev;
                } else {
                    this.tail = current.prev;
                }
                
                this.size--;
                return true;
            }
            current = current.next!;
        }
        
        return false;
    }
}
// Example usage
const list = new LinkedList<number>();

list.append(1);
list.append(2);
list.append(3);
list.prepend(0);

list.print(); // "0 -> 1 -> 2 -> 3"

console.log(list.contains(2)); // true
console.log(list.getSize()); // 4

list.insertAt(1.5, 2);
list.print(); // "0 -> 1 -> 1.5 -> 2 -> 3"

list.remove(1);
list.print(); // "0 -> 1.5 -> 2 -> 3"

console.log(list.toArray()); // [0, 1.5, 2, 3]
class LinkedList<T> implements Iterable<T> {
    // ... previous implementation ...

    *[Symbol.iterator](): Iterator<T> {
        let current = this.head;
        while (current) {
            yield current.value;
            current = current.next;
        }
    }

    // Using iterator
    forEach(callback: (value: T, index: number) => void): void {
        let current = this.head;
        let index = 0;
        
        while (current) {
            callback(current.value, index);
            current = current.next;
            index++;
        }
    }
}

// Usage with for...of
for (const value of list) {
    console.log(value);
}

// Usage with forEach
list.forEach((value, index) => {
    console.log(`Index ${index}: ${value}`);
});

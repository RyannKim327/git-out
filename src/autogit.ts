interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

class LinkedList<T> {
    private head: ListNode<T> | null;
    private tail: ListNode<T> | null;
    private length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // Append to end of list
    append(value: T): void {
        const newNode: ListNode<T> = { value, next: null };
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }
        
        this.length++;
    }

    // Prepend to beginning of list
    prepend(value: T): void {
        const newNode: ListNode<T> = { value, next: this.head };
        this.head = newNode;
        
        if (!this.tail) {
            this.tail = newNode;
        }
        
        this.length++;
    }

    // Insert at specific index
    insertAt(index: number, value: T): void {
        if (index < 0 || index > this.length) {
            throw new Error("Index out of bounds");
        }

        if (index === 0) {
            this.prepend(value);
            return;
        }

        if (index === this.length) {
            this.append(value);
            return;
        }

        const newNode: ListNode<T> = { value, next: null };
        const prevNode = this.getNodeAt(index - 1);
        newNode.next = prevNode!.next;
        prevNode!.next = newNode;
        
        this.length++;
    }

    // Get node at specific index
    private getNodeAt(index: number): ListNode<T> | null {
        if (index < 0 || index >= this.length) return null;
        
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current!.next;
        }
        return current;
    }

    // Get value at specific index
    getAt(index: number): T | undefined {
        const node = this.getNodeAt(index);
        return node ? node.value : undefined;
    }

    // Remove from end
    removeLast(): T | undefined {
        if (!this.head) return undefined;

        if (this.length === 1) {
            const value = this.head.value;
            this.head = null;
            this.tail = null;
            this.length = 0;
            return value;
        }

        const prevNode = this.getNodeAt(this.length - 2);
        const value = this.tail!.value;
        prevNode!.next = null;
        this.tail = prevNode;
        this.length--;
        
        return value;
    }

    // Remove from beginning
    removeFirst(): T | undefined {
        if (!this.head) return undefined;

        const value = this.head.value;
        this.head = this.head.next;
        
        if (!this.head) {
            this.tail = null;
        }
        
        this.length--;
        return value;
    }

    // Remove at specific index
    removeAt(index: number): T | undefined {
        if (index < 0 || index >= this.length) return undefined;

        if (index === 0) return this.removeFirst();
        if (index === this.length - 1) return this.removeLast();

        const prevNode = this.getNodeAt(index - 1);
        const nodeToRemove = prevNode!.next;
        prevNode!.next = nodeToRemove!.next;
        this.length--;
        
        return nodeToRemove!.value;
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

    // Get size of list
    size(): number {
        return this.length;
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
        this.length = 0;
    }

    // Iterate through list (forEach implementation)
    forEach(callback: (value: T, index: number) => void): void {
        let current = this.head;
        let index = 0;
        
        while (current) {
            callback(current.value, index);
            current = current.next;
            index++;
        }
    }

    // Find first occurrence that matches predicate
    find(predicate: (value: T) => boolean): T | undefined {
        let current = this.head;
        
        while (current) {
            if (predicate(current.value)) {
                return current.value;
            }
            current = current.next;
        }
        
        return undefined;
    }
}
// Create a new linked list
const list = new LinkedList<number>();

// Add elements
list.append(10);
list.append(20);
list.prepend(5);
list.insertAt(1, 15);

console.log(list.toArray()); // [5, 15, 10, 20]

// Access elements
console.log(list.getAt(2)); // 10

// Remove elements
list.removeAt(1);
console.log(list.toArray()); // [5, 10, 20]

list.removeFirst();
console.log(list.toArray()); // [10, 20]

// Check properties
console.log(list.contains(10)); // true
console.log(list.size()); // 2

// Iterate
list.forEach((value, index) => {
    console.log(`Index ${index}: ${value}`);
});

// Find element
const found = list.find(val => val > 15);
console.log(found); // 20
// Optional: Make it iterable
class LinkedList<T> implements Iterable<T> {
    // ... previous code
    
    *[Symbol.iterator](): Iterator<T> {
        let current = this.head;
        while (current) {
            yield current.value;
            current = current.next;
        }
    }
}

// Now you can use for...of loops
for (const value of list) {
    console.log(value);
}

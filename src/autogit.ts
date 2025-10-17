// Node class
class ListNode<T> {
    value: T;
    next: ListNode<T> | null;
    
    constructor(value: T, next: ListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

// LinkedList class
class LinkedList<T> {
    private head: ListNode<T> | null;
    private tail: ListNode<T> | null;
    private size: number;
    
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    // Add to the beginning
    prepend(value: T): void {
        const newNode = new ListNode(value, this.head);
        this.head = newNode;
        
        if (!this.tail) {
            this.tail = newNode;
        }
        
        this.size++;
    }
    
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
    
    // Insert at specific position
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
        
        let current = this.head;
        let previous: ListNode<T> | null = null;
        let currentIndex = 0;
        
        while (currentIndex < index) {
            previous = current;
            current = current!.next;
            currentIndex++;
        }
        
        const newNode = new ListNode(value, current);
        previous!.next = newNode;
        this.size++;
    }
    
    // Remove from beginning
    removeFirst(): T | null {
        if (!this.head) return null;
        
        const removedValue = this.head.value;
        this.head = this.head.next;
        
        if (!this.head) {
            this.tail = null;
        }
        
        this.size--;
        return removedValue;
    }
    
    // Remove from end
    removeLast(): T | null {
        if (!this.head) return null;
        
        if (this.size === 1) {
            return this.removeFirst();
        }
        
        let current = this.head;
        let previous: ListNode<T> | null = null;
        
        while (current.next) {
            previous = current;
            current = current.next;
        }
        
        const removedValue = current.value;
        previous!.next = null;
        this.tail = previous;
        this.size--;
        
        return removedValue;
    }
    
    // Remove at specific position
    removeAt(index: number): T | null {
        if (index < 0 || index >= this.size) {
            throw new Error("Index out of bounds");
        }
        
        if (index === 0) {
            return this.removeFirst();
        }
        
        if (index === this.size - 1) {
            return this.removeLast();
        }
        
        let current = this.head;
        let previous: ListNode<T> | null = null;
        let currentIndex = 0;
        
        while (currentIndex < index) {
            previous = current;
            current = current!.next;
            currentIndex++;
        }
        
        const removedValue = current!.value;
        previous!.next = current!.next;
        this.size--;
        
        return removedValue;
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
    
    // Get element at index
    getAt(index: number): ListNode<T> | null {
        if (index < 0 || index >= this.size) {
            return null;
        }
        
        let current = this.head;
        let currentIndex = 0;
        
        while (currentIndex < index) {
            current = current!.next;
            currentIndex++;
        }
        
        return current;
    }
    
    // Check if empty
    isEmpty(): boolean {
        return this.size === 0;
    }
    
    // Get size
    getSize(): number {
        return this.size;
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
        console.log(this.toArray().join(" -> "));
    }
}
// Create a linked list
const list = new LinkedList<number>();

// Add elements
list.append(1);
list.append(2);
list.append(3);
list.prepend(0);

console.log(list.toArray()); // [0, 1, 2, 3]

// Insert at position
list.insertAt(1.5, 2);
console.log(list.toArray()); // [0, 1, 1.5, 2, 3]

// Remove elements
list.removeFirst();
list.removeLast();
console.log(list.toArray()); // [1, 1.5, 2]

// Find element
const found = list.find(1.5);
console.log(found?.value); // 1.5

// Get size
console.log(list.getSize()); // 3
class LinkedList<T> implements Iterable<T> {
    // ... previous implementation
    
    // Make the list iterable
    *[Symbol.iterator](): Iterator<T> {
        let current = this.head;
        
        while (current) {
            yield current.value;
            current = current.next;
        }
    }
    
    // ForEach implementation
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

// Usage with iterator
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);

// Using iterator
for (const value of list) {
    console.log(value);
}

// Using forEach
list.forEach((value, index) => {
    console.log(`Index ${index}: ${value}`);
});

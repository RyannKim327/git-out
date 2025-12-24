interface ILinkedListNode<T> {
    value: T;
    next: ILinkedListNode<T> | null;
}

class LinkedListNode<T> implements ILinkedListNode<T> {
    constructor(
        public value: T,
        public next: LinkedListNode<T> | null = null
    ) {}
}
class LinkedList<T> {
    private head: LinkedListNode<T> | null = null;
    private tail: LinkedListNode<T> | null = null;
    private _size: number = 0;

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
        
        this._size++;
    }

    // Add to the beginning of the list
    prepend(value: T): void {
        const newNode = new LinkedListNode(value);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        
        this._size++;
    }

    // Insert at specific index
    insertAt(index: number, value: T): void {
        if (index < 0 || index > this._size) {
            throw new Error("Index out of bounds");
        }

        if (index === 0) {
            this.prepend(value);
            return;
        }

        if (index === this._size) {
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
        this._size++;
    }

    // Remove by value
    remove(value: T): boolean {
        if (!this.head) return false;

        if (this.head.value === value) {
            this.head = this.head.next;
            if (!this.head) {
                this.tail = null;
            }
            this._size--;
            return true;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.value === value) {
                current.next = current.next.next;
                if (!current.next) {
                    this.tail = current;
                }
                this._size--;
                return true;
            }
            current = current.next;
        }

        return false;
    }

    // Remove at specific index
    removeAt(index: number): T | null {
        if (index < 0 || index >= this._size || !this.head) {
            return null;
        }

        if (index === 0) {
            const removedValue = this.head.value;
            this.head = this.head.next;
            if (!this.head) {
                this.tail = null;
            }
            this._size--;
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
        this._size--;

        return current.value;
    }

    // Find element by value
    find(value: T): LinkedListNode<T> | null {
        let current = this.head;
        
        while (current) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }
        
        return null;
    }

    // Check if list contains value
    contains(value: T): boolean {
        return this.find(value) !== null;
    }

    // Get element at index
    getAt(index: number): T | null {
        if (index < 0 || index >= this._size || !this.head) {
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

    // Get size
    get size(): number {
        return this._size;
    }

    // Check if list is empty
    isEmpty(): boolean {
        return this._size === 0;
    }

    // Clear the list
    clear(): void {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }

    // Print the list (for debugging)
    print(): void {
        let current = this.head;
        const values: T[] = [];
        
        while (current) {
            values.push(current.value);
            current = current.next;
        }
        
        console.log(values.join(" -> "));
    }

    // Generator for iteration
    *[Symbol.iterator](): Generator<T> {
        let current = this.head;
        while (current) {
            yield current.value;
            current = current.next;
        }
    }
}
// Create a linked list of numbers
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
list.remove(1.5);
console.log(list.toArray()); // [0, 1, 2, 3]

// Find elements
console.log(list.find(2)); // LinkedListNode { value: 2, next: ... }

// Iterate using for...of
for (const value of list) {
    console.log(value); // 0, 1, 2, 3
}

// String list example
const stringList = new LinkedList<string>();
stringList.append("hello");
stringList.append("world");
console.log(stringList.toArray()); // ["hello", "world"]
interface ILinkedList<T> {
    append(value: T): void;
    prepend(value: T): void;
    insertAt(index: number, value: T): void;
    remove(value: T): boolean;
    removeAt(index: number): T | null;
    find(value: T): LinkedListNode<T> | null;
    contains(value: T): boolean;
    getAt(index: number): T | null;
    toArray(): T[];
    get size(): number;
    isEmpty(): boolean;
    clear(): void;
}

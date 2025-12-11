class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList<T> {
    head: ListNode<T> | null;
    tail: ListNode<T> | null;
    size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
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

    // Remove first occurrence of value
    remove(value: T): boolean {
        if (!this.head) return false;

        // If head needs to be removed
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

    // Find a node
    find(value: T): ListNode<T> | null {
        let current = this.head;
        while (current) {
            if (current.value === value) return current;
            current = current.next;
        }
        return null;
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
    getSize(): number {
        return this.size;
    }

    // Check if empty
    isEmpty(): boolean {
        return this.size === 0;
    }

    // Clear the list
    clear(): void {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
}
// Create and use the linked list
const list = new LinkedList<number>();

list.append(1);
list.append(2);
list.append(3);
list.prepend(0);

console.log(list.toArray()); // [0, 1, 2, 3]
console.log(list.getSize()); // 4

list.remove(2);
console.log(list.toArray()); // [0, 1, 3]

console.log(list.find(1)); // ListNode { value: 1, next: ListNode { value: 3, next: null } }
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
    head: DoublyListNode<T> | null;
    tail: DoublyListNode<T> | null;
    size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
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
            current = current.next;
        }
        
        return false;
    }

    // Other methods similar to singly linked list...
}
interface ILinkedList<T> {
    append(value: T): void;
    prepend(value: T): void;
    remove(value: T): boolean;
    find(value: T): ListNode<T> | null;
    toArray(): T[];
    getSize(): number;
    isEmpty(): boolean;
    clear(): void;
}

class GenericLinkedList<T> implements ILinkedList<T> {
    // Implementation same as the first example
    // ... (copy the LinkedList class implementation here)
}
class AdvancedLinkedList<T> extends LinkedList<T> {
    // Add iterator support
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

    // Reverse the list
    reverse(): void {
        let prev = null;
        let current = this.head;
        this.tail = this.head;
        
        while (current) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        
        this.head = prev;
    }

    // Get node at specific index
    getAt(index: number): ListNode<T> | null {
        if (index < 0 || index >= this.size) return null;
        
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current!.next;
        }
        
        return current;
    }
}

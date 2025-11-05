class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T, next: ListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList<T> {
    head: ListNode<T> | null = null;
}
class LinkedList<T> {
    // ... existing code
    
    getLength(): number {
        let count = 0;
        let current = this.head;
        
        while (current !== null) {
            count++;
            current = current.next;
        }
        
        return count;
    }
}
class LinkedList<T> {
    // ... existing code
    
    getLengthRecursive(node: ListNode<T> | null = this.head): number {
        if (node === null) {
            return 0;
        }
        return 1 + this.getLengthRecursive(node.next);
    }
}
class LinkedList<T> {
    head: ListNode<T> | null = null;

    // Add node to the end
    append(value: T): void {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        
        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }
        current.next = newNode;
    }

    // Iterative length
    getLength(): number {
        let count = 0;
        let current = this.head;
        
        while (current !== null) {
            count++;
            current = current.next;
        }
        
        return count;
    }

    // Recursive length
    getLengthRecursive(node: ListNode<T> | null = this.head): number {
        if (node === null) {
            return 0;
        }
        return 1 + this.getLengthRecursive(node.next);
    }
}

// Usage
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);

console.log("Iterative length:", list.getLength()); // Output: 3
console.log("Recursive length:", list.getLengthRecursive()); // Output: 3
class OptimizedLinkedList<T> {
    head: ListNode<T> | null = null;
    tail: ListNode<T> | null = null;
    private length: number = 0;

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

    getLength(): number {
        return this.length;
    }
}

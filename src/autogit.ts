class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    private head: ListNode<T> | null = null;

    // Add this method to your LinkedList class
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
    // ... other methods
    
    getLengthRecursive(): number {
        return this.getLengthHelper(this.head);
    }
    
    private getLengthHelper(node: ListNode<T> | null): number {
        if (node === null) {
            return 0;
        }
        return 1 + this.getLengthHelper(node.next);
    }
}
function getLinkedListLength<T>(head: ListNode<T> | null): number {
    let count = 0;
    let current = head;
    
    while (current !== null) {
        count++;
        current = current.next;
    }
    
    return count;
}
class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    private head: ListNode<T> | null = null;

    add(value: T): void {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
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
    getLengthRecursive(): number {
        return this.getLengthHelper(this.head);
    }
    
    private getLengthHelper(node: ListNode<T> | null): number {
        if (node === null) {
            return 0;
        }
        return 1 + this.getLengthHelper(node.next);
    }
}

// Usage example
const list = new LinkedList<number>();
list.add(1);
list.add(2);
list.add(3);
list.add(4);

console.log("Iterative length:", list.getLength()); // Output: 4
console.log("Recursive length:", list.getLengthRecursive()); // Output: 4

interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

function getLinkedListLength<T>(head: ListNode<T> | null): number {
    let length = 0;
    let current = head;
    
    while (current !== null) {
        length++;
        current = current.next;
    }
    
    return length;
}
function getLinkedListLengthRecursive<T>(node: ListNode<T> | null): number {
    if (node === null) {
        return 0;
    }
    return 1 + getLinkedListLengthRecursive(node.next);
}
class LinkedListNode<T> {
    constructor(
        public value: T,
        public next: LinkedListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    private head: LinkedListNode<T> | null = null;
    private _length: number = 0;
    
    // Add methods for adding/removing nodes...
    
    // Method to calculate length on demand
    getLength(): number {
        let count = 0;
        let current = this.head;
        
        while (current !== null) {
            count++;
            current = current.next;
        }
        
        return count;
    }
    
    // Or maintain length as a property (more efficient)
    get length(): number {
        return this._length;
    }
}
interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

// Create a sample linked list
const node3: ListNode<number> = { value: 3, next: null };
const node2: ListNode<number> = { value: 2, next: node3 };
const node1: ListNode<number> = { value: 1, next: node2 };

// Iterative approach
function getLengthIterative<T>(head: ListNode<T> | null): number {
    let length = 0;
    let current = head;
    
    while (current !== null) {
        length++;
        current = current.next;
    }
    
    return length;
}

// Recursive approach
function getLengthRecursive<T>(node: ListNode<T> | null): number {
    if (node === null) return 0;
    return 1 + getLengthRecursive(node.next);
}

// Usage
console.log(getLengthIterative(node1)); // Output: 3
console.log(getLengthRecursive(node1)); // Output: 3
console.log(getLengthIterative(null));  // Output: 0
// Test with empty list
console.log(getLengthIterative(null)); // Should return 0

// Test with single node
const singleNode: ListNode<number> = { value: 1, next: null };
console.log(getLengthIterative(singleNode)); // Should return 1

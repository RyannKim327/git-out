interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

function getLengthIterative<T>(head: ListNode<T> | null): number {
    let length = 0;
    let current = head;
    
    while (current !== null) {
        length++;
        current = current.next;
    }
    
    return length;
}
function getLengthRecursive<T>(head: ListNode<T> | null): number {
    if (head === null) {
        return 0;
    }
    return 1 + getLengthRecursive(head.next);
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
    
    // Add methods for adding/removing nodes
    
    get length(): number {
        return this.getLength();
    }
    
    // Iterative length calculation
    getLength(): number {
        let count = 0;
        let current = this.head;
        
        while (current !== null) {
            count++;
            current = current.next;
        }
        
        return count;
    }
    
    // Alternative: maintain length as a property
    getLengthFromProperty(): number {
        return this._length;
    }
}
interface ListNodeWithLength<T> {
    value: T;
    next: ListNodeWithLength<T> | null;
    length?: number; // Optional length property
}

function getLengthWithProperty(head: ListNodeWithLength<any> | null): number {
    if (!head) return 0;
    
    if (head.length !== undefined) {
        return head.length;
    }
    
    // Fallback to iterative if length property doesn't exist
    return getLengthIterative(head);
}
interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

// Create a sample linked list: 1 -> 2 -> 3 -> null
const node3: ListNode<number> = { value: 3, next: null };
const node2: ListNode<number> = { value: 2, next: node3 };
const node1: ListNode<number> = { value: 1, next: node2 };

// Using iterative approach
console.log(getLengthIterative(node1)); // Output: 3
console.log(getLengthIterative(null));  // Output: 0

// Using recursive approach
console.log(getLengthRecursive(node1)); // Output: 3
console.log(getLengthRecursive(null));  // Output: 0
// Most practical and efficient solution
function linkedListLength<T>(head: ListNode<T> | null): number {
    let length = 0;
    let current = head;
    
    while (current) {
        length++;
        current = current.next;
    }
    
    return length;
}

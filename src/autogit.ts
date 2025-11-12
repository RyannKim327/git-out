interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

function getLengthIterative(head: ListNode<any> | null): number {
    let length = 0;
    let current = head;
    
    while (current !== null) {
        length++;
        current = current.next;
    }
    
    return length;
}
function getLengthRecursive(head: ListNode<any> | null): number {
    if (head === null) {
        return 0;
    }
    return 1 + getLengthRecursive(head.next);
}
class LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null;
    
    constructor(value: T, next: LinkedListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList<T> {
    head: LinkedListNode<T> | null;
    
    constructor() {
        this.head = null;
    }
    
    getLength(): number {
        let length = 0;
        let current = this.head;
        
        while (current !== null) {
            length++;
            current = current.next;
        }
        
        return length;
    }
    
    // Alternative recursive implementation
    getLengthRecursive(node: LinkedListNode<T> | null = this.head): number {
        if (node === null) {
            return 0;
        }
        return 1 + this.getLengthRecursive(node.next);
    }
}
// Create a linked list: 1 -> 2 -> 3 -> null
const node1 = { value: 1, next: null };
const node2 = { value: 2, next: null };
const node3 = { value: 3, next: null };

node1.next = node2;
node2.next = node3;

// Test the functions
console.log(getLengthIterative(node1)); // Output: 3
console.log(getLengthRecursive(node1)); // Output: 3

// Using the LinkedList class
const list = new LinkedList<number>();
list.head = node1;
console.log(list.getLength()); // Output: 3
console.log(list.getLengthRecursive()); // Output: 3
// Empty list
console.log(getLengthIterative(null)); // Output: 0

// Single node list
const singleNode = { value: 1, next: null };
console.log(getLengthIterative(singleNode)); // Output: 1

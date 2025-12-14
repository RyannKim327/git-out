class ListNode<T> {
    value: T;
    next: ListNode<T> | null;
    
    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

function findLengthIterative<T>(head: ListNode<T> | null): number {
    let count = 0;
    let current = head;
    
    while (current !== null) {
        count++;
        current = current.next;
    }
    
    return count;
}
function findLengthRecursive<T>(head: ListNode<T> | null): number {
    if (head === null) {
        return 0;
    }
    
    return 1 + findLengthRecursive(head.next);
}
class LinkedList<T> {
    head: ListNode<T> | null;
    
    constructor() {
        this.head = null;
    }
    
    // Add this method to your LinkedList class
    getLength(): number {
        return this.findLength();
    }
    
    private findLength(): number {
        let count = 0;
        let current = this.head;
        
        while (current !== null) {
            count++;
            current = current.next;
        }
        
        return count;
    }
    
    // Optional: Recursive version as method
    getLengthRecursive(): number {
        return this.findLengthRecursiveHelper(this.head);
    }
    
    private findLengthRecursiveHelper(node: ListNode<T> | null): number {
        if (node === null) {
            return 0;
        }
        
        return 1 + this.findLengthRecursiveHelper(node.next);
    }
}
// Create a linked list: 1 -> 2 -> 3 -> 4
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);

node1.next = node2;
node2.next = node3;
node3.next = node4;

// Test the functions
console.log("Iterative length:", findLengthIterative(node1)); // Output: 4
console.log("Recursive length:", findLengthRecursive(node1)); // Output: 4

// Using class-based approach
const list = new LinkedList<number>();
list.head = node1;
console.log("Class-based length:", list.getLength()); // Output: 4

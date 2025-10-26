interface ListNode {
    value: number;
    next: ListNode | null;
}

function getLengthIterative(head: ListNode | null): number {
    let length = 0;
    let current = head;
    
    while (current !== null) {
        length++;
        current = current.next;
    }
    
    return length;
}
function getLengthRecursive(node: ListNode | null): number {
    if (node === null) {
        return 0;
    }
    return 1 + getLengthRecursive(node.next);
}
class ListNode {
    value: number;
    next: ListNode | null;

    constructor(value: number, next: ListNode | null = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    head: ListNode | null;

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

    // Recursive alternative
    getLengthRecursive(node: ListNode | null = this.head): number {
        if (node === null) {
            return 0;
        }
        return 1 + this.getLengthRecursive(node.next);
    }
}
// Create a sample linked list: 1 -> 2 -> 3 -> null
const node3 = { value: 3, next: null };
const node2 = { value: 2, next: node3 };
const node1 = { value: 1, next: node2 };

console.log(getLengthIterative(node1)); // Output: 3
console.log(getLengthRecursive(node1)); // Output: 3

// Using class-based approach
const list = new LinkedList();
list.head = node1;
console.log(list.getLength()); // Output: 3

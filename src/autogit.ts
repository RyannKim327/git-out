interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

function findNthFromEnd<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
    if (!head || n <= 0) return null;
    
    // First pass: get the length of the list
    let length = 0;
    let current: ListNode<T> | null = head;
    while (current) {
        length++;
        current = current.next;
    }
    
    // Check if n is valid
    if (n > length) return null;
    
    // Second pass: find (length - n)th node from beginning
    current = head;
    for (let i = 0; i < length - n; i++) {
        current = current!.next;
    }
    
    return current;
}
function findNthFromEndOptimized<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
    if (!head || n <= 0) return null;
    
    let fast: ListNode<T> | null = head;
    let slow: ListNode<T> | null = head;
    
    // Move fast pointer n nodes ahead
    for (let i = 0; i < n; i++) {
        if (!fast) return null; // n is larger than list length
        fast = fast.next;
    }
    
    // Move both pointers until fast reaches end
    while (fast) {
        slow = slow!.next;
        fast = fast.next;
    }
    
    return slow;
}
function findNthFromEndRecursive<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
    let result: ListNode<T> | null = null;
    let position = 0;
    
    function traverse(node: ListNode<T> | null): number {
        if (!node) return 0;
        
        const count = traverse(node.next) + 1;
        
        if (count === n) {
            result = node;
        }
        
        return count;
    }
    
    traverse(head);
    return result;
}
class LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null;
    
    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList<T> {
    head: LinkedListNode<T> | null;
    
    constructor() {
        this.head = null;
    }
    
    // Add node to the end
    append(value: T): void {
        const newNode = new LinkedListNode(value);
        
        if (!this.head) {
            this.head = newNode;
            return;
        }
        
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        
        current.next = newNode;
    }
    
    // Find nth node from end
    findNthFromEnd(n: number): LinkedListNode<T> | null {
        return findNthFromEndOptimized(this.head, n);
    }
}

// Usage example
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);

const result = list.findNthFromEnd(2); // Returns node with value 4
console.log(result?.value); // Output: 4

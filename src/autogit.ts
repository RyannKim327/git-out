class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T, next: ListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList<T> {
    head: ListNode<T> | null;
    
    constructor() {
        this.head = null;
    }
    
    // Add node to end of list
    append(value: T): void {
        const newNode = new ListNode(value);
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
}
function reverseIterative<T>(head: ListNode<T> | null): ListNode<T> | null {
    let prev: ListNode<T> | null = null;
    let current = head;
    let next: ListNode<T> | null = null;
    
    while (current !== null) {
        // Store next node
        next = current.next;
        
        // Reverse the link
        current.next = prev;
        
        // Move pointers forward
        prev = current;
        current = next;
    }
    
    return prev; // New head
}

// Usage:
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);

list.head = reverseIterative(list.head);
function reverseRecursive<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (head === null || head.next === null) {
        return head;
    }
    
    const newHead = reverseRecursive(head.next);
    head.next.next = head;
    head.next = null;
    
    return newHead;
}

// Usage:
list.head = reverseRecursive(list.head);
class LinkedList<T> {
    head: ListNode<T> | null;
    
    constructor() {
        this.head = null;
    }
    
    append(value: T): void {
        const newNode = new ListNode(value);
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
    
    // Reverse using iterative method
    reverse(): void {
        this.head = reverseIterative(this.head);
    }
    
    // Print the list
    print(): void {
        let current = this.head;
        const values: T[] = [];
        while (current) {
            values.push(current.value);
            current = current.next;
        }
        console.log(values.join(' → '));
    }
}

// Test the implementation
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
list.append(4);

console.log("Original list:");
list.print();

list.reverse();

console.log("Reversed list:");
list.print();
function reverseUsingStack<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null;
    
    const stack: ListNode<T>[] = [];
    let current = head;
    
    // Push all nodes to stack
    while (current) {
        stack.push(current);
        current = current.next;
    }
    
    // Set new head
    const newHead = stack.pop()!;
    current = newHead;
    
    // Pop nodes from stack and set next pointers
    while (stack.length > 0) {
        current.next = stack.pop()!;
        current = current.next;
    }
    
    // Set last node's next to null
    current.next = null;
    
    return newHead;
}

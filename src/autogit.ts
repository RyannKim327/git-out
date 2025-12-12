interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}
function reverseLinkedList<T>(head: ListNode<T> | null): ListNode<T> | null {
    let prev: ListNode<T> | null = null;
    let current: ListNode<T> | null = head;
    let next: ListNode<T> | null = null;
    
    while (current !== null) {
        // Store next node
        next = current.next;
        
        // Reverse the pointer
        current.next = prev;
        
        // Move pointers forward
        prev = current;
        current = next;
    }
    
    return prev;
}
function reverseLinkedListRecursive<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (head === null || head.next === null) {
        return head;
    }
    
    const reversedHead = reverseLinkedListRecursive(head.next);
    head.next.next = head;
    head.next = null;
    
    return reversedHead;
}
class LinkedListNode<T> {
    constructor(
        public value: T,
        public next: LinkedListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    private head: LinkedListNode<T> | null = null;
    
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
    
    // Reverse the linked list
    reverse(): void {
        this.head = this.reverseIterative(this.head);
    }
    
    private reverseIterative(head: LinkedListNode<T> | null): LinkedListNode<T> | null {
        let prev: LinkedListNode<T> | null = null;
        let current: LinkedListNode<T> | null = head;
        let next: LinkedListNode<T> | null = null;
        
        while (current !== null) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        
        return prev;
    }
    
    // Print the linked list
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

// Usage example
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
list.append(4);

console.log("Original list:");
list.print(); // 1 → 2 → 3 → 4

list.reverse();
console.log("Reversed list:");
list.print(); // 4 → 3 → 2 → 1
function reverseLinkedListStack<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null;
    
    const stack: ListNode<T>[] = [];
    let current: ListNode<T> | null = head;
    
    // Push all nodes to stack
    while (current) {
        stack.push(current);
        current = current.next;
    }
    
    // Set new head
    const newHead = stack.pop()!;
    current = newHead;
    
    // Pop nodes from stack and build reversed list
    while (stack.length > 0) {
        current.next = stack.pop()!;
        current = current.next;
    }
    
    current.next = null; // Important: set last node's next to null
    
    return newHead;
}

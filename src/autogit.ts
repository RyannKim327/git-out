class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T, next: ListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

function reverseLinkedList<T>(head: ListNode<T> | null): ListNode<T> | null {
    let prev: ListNode<T> | null = null;
    let current: ListNode<T> | null = head;
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
function reverseLinkedListRecursive<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (head === null || head.next === null) {
        return head;
    }
    
    const newHead = reverseLinkedListRecursive(head.next);
    head.next.next = head;
    head.next = null;
    
    return newHead;
}
function reverseLinkedListStack<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (head === null) return null;
    
    const stack: ListNode<T>[] = [];
    let current: ListNode<T> | null = head;
    
    // Push all nodes to stack
    while (current !== null) {
        stack.push(current);
        current = current.next;
    }
    
    // Set new head (last element)
    const newHead = stack.pop()!;
    current = newHead;
    
    // Pop from stack and build reversed list
    while (stack.length > 0) {
        const node = stack.pop()!;
        current.next = node;
        current = node;
    }
    
    // Set last node's next to null
    current.next = null;
    
    return newHead;
}
// LinkedList class implementation
class LinkedList<T> {
    head: ListNode<T> | null;

    constructor() {
        this.head = null;
    }

    add(value: T): void {
        const newNode = new ListNode(value);
        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    print(): void {
        let current = this.head;
        const values: T[] = [];
        while (current !== null) {
            values.push(current.value);
            current = current.next;
        }
        console.log(values.join(' → '));
    }

    reverse(): void {
        this.head = reverseLinkedList(this.head);
    }
}

// Usage example
const list = new LinkedList<number>();
list.add(1);
list.add(2);
list.add(3);
list.add(4);

console.log("Original list:");
list.print();

list.reverse();

console.log("Reversed list:");
list.print();
Original list:
1 → 2 → 3 → 4
Reversed list:
4 → 3 → 2 → 1

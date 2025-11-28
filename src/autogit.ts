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
    
    return prev;
}
function reverseLinkedListRecursive<T>(
    head: ListNode<T> | null,
    prev: ListNode<T> | null = null
): ListNode<T> | null {
    if (head === null) return prev;
    
    const next = head.next;
    head.next = prev;
    
    return reverseLinkedListRecursive(next, head);
}
class LinkedList<T> {
    head: ListNode<T> | null;

    constructor() {
        this.head = null;
    }

    // Add to front
    add(value: T): void {
        this.head = new ListNode(value, this.head);
    }

    // Reverse the list
    reverse(): void {
        this.head = reverseLinkedList(this.head);
    }

    // Print the list
    print(): void {
        let current = this.head;
        const values: T[] = [];
        
        while (current !== null) {
            values.push(current.value);
            current = current.next;
        }
        
        console.log(values.join(' → '));
    }
}

// Usage example
const list = new LinkedList<number>();
list.add(3);
list.add(2);
list.add(1);

console.log('Original list:');
list.print(); // 1 → 2 → 3

list.reverse();
console.log('Reversed list:');
list.print(); // 3 → 2 → 1
function reverseLinkedListStack<T>(head: ListNode<T> | null): ListNode<T> | null {
    const stack: ListNode<T>[] = [];
    let current = head;
    
    // Push all nodes to stack
    while (current !== null) {
        stack.push(current);
        current = current.next;
    }
    
    // Build reversed list from stack
    let newHead: ListNode<T> | null = null;
    while (stack.length > 0) {
        const node = stack.pop()!;
        if (newHead === null) {
            newHead = node;
            newHead.next = null;
        } else {
            node.next = newHead;
            newHead = node;
        }
    }
    
    return newHead;
}

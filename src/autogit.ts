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

    // Add node to the end
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

    // Utility method to print the list
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
class LinkedList<T> {
    // ... previous methods

    reverseIterative(): void {
        let prev: ListNode<T> | null = null;
        let current = this.head;
        let next: ListNode<T> | null = null;

        while (current !== null) {
            // Store next node
            next = current.next;
            
            // Reverse the current node's pointer
            current.next = prev;
            
            // Move pointers one position ahead
            prev = current;
            current = next;
        }
        
        this.head = prev;
    }
}
class LinkedList<T> {
    // ... previous methods

    reverseRecursive(node: ListNode<T> | null = this.head): ListNode<T> | null {
        if (node === null || node.next === null) {
            return node;
        }

        const reversedHead = this.reverseRecursive(node.next);
        node.next.next = node;
        node.next = null;
        
        return reversedHead;
    }

    // Wrapper method for recursive reversal
    reverseRecursively(): void {
        this.head = this.reverseRecursive(this.head);
    }
}
class LinkedList<T> {
    // ... previous methods

    reverseUsingStack(): void {
        if (!this.head) return;

        const stack: ListNode<T>[] = [];
        let current = this.head;

        // Push all nodes to stack
        while (current) {
            stack.push(current);
            current = current.next!;
        }

        // Pop nodes to reverse the list
        this.head = stack.pop()!;
        current = this.head;
        
        while (stack.length > 0) {
            current.next = stack.pop()!;
            current = current.next;
        }
        
        current.next = null; // Important: set last node's next to null
    }
}
// Create and test the linked list
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
list.append(4);

console.log("Original list:");
list.print();

// Test iterative reversal
list.reverseIterative();
console.log("After iterative reversal:");
list.print();

// Test recursive reversal
list.reverseRecursively();
console.log("After recursive reversal:");
list.print();

// Test stack reversal
list.reverseUsingStack();
console.log("After stack reversal:");
list.print();

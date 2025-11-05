class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    head: ListNode<T> | null = null;

    add(value: T): void {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }
}
class LinkedList<T> {
    // ... previous implementation

    reverseIterative(): void {
        let prev: ListNode<T> | null = null;
        let current = this.head;
        let next: ListNode<T> | null = null;

        while (current !== null) {
            // Store next node
            next = current.next;
            
            // Reverse the link
            current.next = prev;
            
            // Move pointers one step forward
            prev = current;
            current = next;
        }

        this.head = prev;
    }
}
class LinkedList<T> {
    // ... previous implementation

    reverseRecursive(): void {
        this.head = this._reverseRecursive(this.head);
    }

    private _reverseRecursive(node: ListNode<T> | null): ListNode<T> | null {
        if (!node || !node.next) {
            return node;
        }

        const newHead = this._reverseRecursive(node.next);
        node.next.next = node;
        node.next = null;
        
        return newHead;
    }
}
class LinkedList<T> {
    // ... previous implementation

    reverseUsingStack(): void {
        if (!this.head) return;

        const stack: ListNode<T>[] = [];
        let current: ListNode<T> | null = this.head;

        // Push all nodes to stack
        while (current) {
            stack.push(current);
            current = current.next;
        }

        // Pop from stack to rebuild reversed list
        this.head = stack.pop() || null;
        current = this.head;

        while (stack.length > 0) {
            const node = stack.pop()!;
            if (current) {
                current.next = node;
                current = current.next;
            }
        }

        if (current) {
            current.next = null;
        }
    }
}
class LinkedList<T> {
    head: ListNode<T> | null = null;

    add(value: T): void {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    // Iterative reversal (preferred for performance)
    reverse(): void {
        let prev: ListNode<T> | null = null;
        let current = this.head;

        while (current) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        this.head = prev;
    }

    // Print the list for debugging
    toString(): string {
        const values: T[] = [];
        let current = this.head;
        while (current) {
            values.push(current.value);
            current = current.next;
        }
        return values.join(' -> ');
    }

    // Create from array (helper method)
    static fromArray<T>(arr: T[]): LinkedList<T> {
        const list = new LinkedList<T>();
        for (const item of arr) {
            list.add(item);
        }
        return list;
    }
}
// Create and reverse a linked list
const list = LinkedList.fromArray([1, 2, 3, 4, 5]);
console.log('Original:', list.toString()); // 1 -> 2 -> 3 -> 4 -> 5

list.reverse();
console.log('Reversed:', list.toString()); // 5 -> 4 -> 3 -> 2 -> 1

// Or use iterative method directly
list.reverseIterative();
console.log('Reversed again:', list.toString()); // 1 -> 2 -> 3 -> 4 -> 5

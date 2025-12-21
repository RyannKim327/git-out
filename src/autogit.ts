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
    tail: ListNode<T> | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }
}
class LinkedList<T> {
    // ... previous code

    reverseIterative(): void {
        let prev: ListNode<T> | null = null;
        let current: ListNode<T> | null = this.head;
        let next: ListNode<T> | null = null;

        while (current !== null) {
            next = current.next;    // Store next node
            current.next = prev;    // Reverse current node's pointer
            prev = current;         // Move prev to current
            current = next;         // Move to next node
        }

        // Update head and tail
        this.tail = this.head;
        this.head = prev;
    }
}
class LinkedList<T> {
    // ... previous code

    reverseRecursive(): void {
        this.head = this._reverseRecursive(this.head);
        // Update tail (you might want to track tail separately)
    }

    private _reverseRecursive(node: ListNode<T> | null): ListNode<T> | null {
        if (node === null || node.next === null) {
            return node;
        }

        const reversedHead = this._reverseRecursive(node.next);
        node.next.next = node;
        node.next = null;

        return reversedHead;
    }
}
class LinkedList<T> {
    head: ListNode<T> | null;
    tail: ListNode<T> | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    // Add node to the end
    append(value: T): void {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }
    }

    // Iterative reverse
    reverse(): void {
        let prev: ListNode<T> | null = null;
        let current: ListNode<T> | null = this.head;
        let next: ListNode<T> | null = null;

        while (current !== null) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        this.tail = this.head;
        this.head = prev;
    }

    // Convert to array for easy visualization
    toArray(): T[] {
        const result: T[] = [];
        let current = this.head;
        
        while (current !== null) {
            result.push(current.value);
            current = current.next;
        }
        
        return result;
    }
}

// Usage example
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
list.append(4);

console.log("Original:", list.toArray()); // [1, 2, 3, 4]
list.reverse();
console.log("Reversed:", list.toArray()); // [4, 3, 2, 1]
reverseUsingStack(): void {
    const stack: ListNode<T>[] = [];
    let current = this.head;

    // Push all nodes to stack
    while (current !== null) {
        stack.push(current);
        current = current.next;
    }

    // Rebuild reversed list
    this.head = stack.pop() || null;
    current = this.head;
    
    while (stack.length > 0) {
        const node = stack.pop()!;
        current!.next = node;
        current = node;
    }
    
    this.tail = current;
    if (this.tail) {
        this.tail.next = null;
    }
}

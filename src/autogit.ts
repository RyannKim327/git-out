class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList<T> {
    head: Node<T> | null;

    constructor() {
        this.head = null;
    }

    // Helper method to add elements to the list (for demonstration)
    add(value: T): void {
        const newNode = new Node(value);
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

    // Helper method to print the list (for demonstration)
    print(): void {
        let current = this.head;
        const elements: T[] = [];
        while (current) {
            elements.push(current.value);
            current = current.next;
        }
        console.log(elements.join(' -> ') || 'Empty List');
    }
}
class LinkedList<T> {
    // ... (Node, head, add, print methods as above)

    reverseIterative(): void {
        let previous: Node<T> | null = null;
        let current: Node<T> | null = this.head;
        let nextTemp: Node<T> | null = null;

        while (current !== null) {
            nextTemp = current.next;    // 1. Store the next node
            current.next = previous;    // 2. Reverse current node's pointer
            previous = current;         // 3. Move previous one step forward
            current = nextTemp;         // 4. Move current one step forward
        }
        this.head = previous;           // 5. Update the head of the list
    }
}
const myListIterative = new LinkedList<number>();
myListIterative.add(1);
myListIterative.add(2);
myListIterative.add(3);
myListIterative.add(4);

console.log("Original list (Iterative):");
myListIterative.print(); // Output: 1 -> 2 -> 3 -> 4

myListIterative.reverseIterative();

console.log("Reversed list (Iterative):");
myListIterative.print(); // Output: 4 -> 3 -> 2 -> 1
class LinkedList<T> {
    // ... (Node, head, add, print methods as above)

    // Public method to initiate the recursive reversal
    reverseRecursive(): void {
        this.head = this._reverseRecursiveHelper(this.head);
    }

    // Private helper function that does the actual recursion
    private _reverseRecursiveHelper(node: Node<T> | null): Node<T> | null {
        // Base case: empty list or single node list
        if (node === null || node.next === null) {
            return node;
        }

        // Recursively reverse the rest of the list
        // `restReversedHead` will be the new head of the reversed sublist
        const restReversedHead = this._reverseRecursiveHelper(node.next);

        // Link the original second node back to the current node
        // (e.g., if list was 1 -> 2 -> 3, after recursive call, 3 -> 2.
        // `node` is 1, `node.next` is 2. We make 2 -> 1)
        node.next.next = node;

        // The current node becomes the new tail, so its next should be null
        node.next = null;

        // `restReversedHead` is the new head of the entire reversed list
        return restReversedHead;
    }
}
const myListRecursive = new LinkedList<number>();
myListRecursive.add(10);
myListRecursive.add(20);
myListRecursive.add(30);
myListRecursive.add(40);

console.log("\nOriginal list (Recursive):");
myListRecursive.print(); // Output: 10 -> 20 -> 30 -> 40

myListRecursive.reverseRecursive();

console.log("Reversed list (Recursive):");
myListRecursive.print(); // Output: 40 -> 30 -> 20 -> 10

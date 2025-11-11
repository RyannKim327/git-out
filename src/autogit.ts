// 1. Define the Node class
class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T, next: Node<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

// 2. Define a simple LinkedList class for demonstration
class LinkedList<T> {
    head: Node<T> | null;

    constructor() {
        this.head = null;
    }

    // Add a node to the end of the list
    append(value: T): void {
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

    // Traverse and print the list values
    traverse(): void {
        if (!this.head) {
            console.log("List is empty.");
            return;
        }

        let current: Node<T> | null = this.head;
        let result: T[] = [];
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        console.log(result.join(" -> "));
    }
}
class LinkedList<T> {
    head: Node<T> | null;

    constructor() {
        this.head = null;
    }

    // ... (append and traverse methods as above)

    reverseIterative(): void {
        if (!this.head || !this.head.next) {
            // No need to reverse for empty or single-node lists
            return;
        }

        let previous: Node<T> | null = null;
        let current: Node<T> | null = this.head;
        let nextTemp: Node<T> | null = null; // To store the next node temporarily

        while (current !== null) {
            // 1. Store the next node
            nextTemp = current.next;

            // 2. Reverse the current node's pointer
            current.next = previous;

            // 3. Move pointers one position ahead
            previous = current;
            current = nextTemp;
        }

        // After the loop, 'previous' will be the new head
        this.head = previous;
    }
}

// --- Demonstration ---
const myList = new LinkedList<number>();
myList.append(1);
myList.append(2);
myList.append(3);
myList.append(4);

console.log("Original List:");
myList.traverse(); // Output: 1 -> 2 -> 3 -> 4

myList.reverseIterative();

console.log("Reversed List (Iterative):");
myList.traverse(); // Output: 4 -> 3 -> 2 -> 1
class LinkedList<T> {
    head: Node<T> | null;

    constructor() {
        this.head = null;
    }

    // ... (append and traverse methods as above)

    reverseRecursive(): void {
        this.head = this._reverseRecursiveHelper(this.head);
    }

    private _reverseRecursiveHelper(node: Node<T> | null): Node<T> | null {
        // Base case: empty list or single node list
        if (node === null || node.next === null) {
            return node;
        }

        // Recursively reverse the rest of the list
        // newHead will be the new head of the reversed sublist (original tail)
        const newHead = this._reverseRecursiveHelper(node.next);

        // At this point:
        // node.next is the original second element.
        // After the recursive call, node.next's 'next' pointer is pointing to something beyond it.
        // We need to make node.next (original second element) point to node (original first element).
        node.next.next = node;

        // Set the original node's next to null, as it will be the new tail
        node.next = null;

        // The 'newHead' returned from the deepest call is the final head of the reversed list
        return newHead;
    }
}

// --- Demonstration ---
const myListRecursive = new LinkedList<string>();
myListRecursive.append("A");
myListRecursive.append("B");
myListRecursive.append("C");
myListRecursive.append("D");

console.log("Original List:");
myListRecursive.traverse(); // Output: A -> B -> C -> D

myListRecursive.reverseRecursive();

console.log("Reversed List (Recursive):");
myListRecursive.traverse(); // Output: D -> C -> B -> A

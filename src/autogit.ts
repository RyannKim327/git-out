// Define the Node structure
class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

// Define the LinkedList structure
class LinkedList<T> {
    head: Node<T> | null;
    tail: Node<T> | null; // Keeping track of tail can be useful, especially for append and for updating after reverse
    size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Helper method to add elements to the list (for testing)
    append(value: T): void {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }

    // Helper method to print the list (for testing)
    print(): void {
        const elements: T[] = [];
        let current = this.head;
        while (current) {
            elements.push(current.value);
            current = current.next;
        }
        console.log(elements.join(' -> '));
    }
}
class LinkedList<T> {
    // ... (previous code for Node, constructor, append, print)

    reverseIterative(): void {
        if (!this.head || !this.head.next) {
            // No need to reverse if list is empty or has only one node
            return;
        }

        let previous: Node<T> | null = null;
        let current: Node<T> | null = this.head;
        let nextTemp: Node<T> | null = null;

        // The original head will become the new tail
        this.tail = this.head;

        while (current !== null) {
            // 1. Store the next node
            nextTemp = current.next;

            // 2. Reverse current node's pointer
            current.next = previous;

            // 3. Move pointers one step ahead
            previous = current; // 'previous' becomes the current node
            current = nextTemp; // 'current' moves to the stored next node
        }

        // After the loop, 'previous' is the new head of the reversed list
        this.head = previous;
    }
}

// --- Demonstration ---
console.log("--- Iterative Reverse ---");
const list1 = new LinkedList<number>();
list1.append(1);
list1.append(2);
list1.append(3);
list1.append(4);
list1.print(); // Output: 1 -> 2 -> 3 -> 4

list1.reverseIterative();
list1.print(); // Output: 4 -> 3 -> 2 -> 1

const emptyList = new LinkedList<string>();
emptyList.reverseIterative();
emptyList.print(); // Output: (empty line)

const singleNodeList = new LinkedList<string>();
singleNodeList.append("A");
singleNodeList.print(); // Output: A
singleNodeList.reverseIterative();
singleNodeList.print(); // Output: A
class LinkedList<T> {
    // ... (previous code for Node, constructor, append, print)

    reverseRecursive(): void {
        if (!this.head || !this.head.next) {
            return; // Empty or single-node list
        }

        // The original head will become the new tail
        this.tail = this.head;

        // Call the recursive helper function
        this.head = this._reverseRecursiveHelper(this.head);
    }

    private _reverseRecursiveHelper(node: Node<T> | null): Node<T> | null {
        // Base case: If node is null or it's the last node
        if (node === null || node.next === null) {
            return node;
        }

        // Recursively reverse the rest of the list
        // 'rest' will be the new head of the reversed sub-list
        const newHeadOfRest = this._reverseRecursiveHelper(node.next);

        // This is the core reversal step:
        // The original 'node.next' (which is now the last node of the 'rest' sub-list)
        // should point back to the current 'node'.
        node.next.next = node;

        // The current 'node' is now the last node in the reversed sub-list,
        // so its 'next' should be null.
        node.next = null;

        // Return the new head of the fully reversed sub-list
        return newHeadOfRest;
    }
}

// --- Demonstration ---
console.log("\n--- Recursive Reverse ---");
const list2 = new LinkedList<number>();
list2.append(1);
list2.append(2);
list2.append(3);
list2.append(4);
list2.print(); // Output: 1 -> 2 -> 3 -> 4

list2.reverseRecursive();
list2.print(); // Output: 4 -> 3 -> 2 -> 1

const emptyList2 = new LinkedList<string>();
emptyList2.reverseRecursive();
emptyList2.print(); // Output: (empty line)

const singleNodeList2 = new LinkedList<string>();
singleNodeList2.append("X");
singleNodeList2.print(); // Output: X
singleNodeList2.reverseRecursive();
singleNodeList2.print(); // Output: X

// 1. Define the Node structure
class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null; // Initially, a new node doesn't point to anything
    }
}

// 2. Define the LinkedList structure
class LinkedList<T> {
    head: Node<T> | null;
    // Optional: Keep track of the tail for O(1) appends, but not strictly needed for length
    // tail: Node<T> | null; 
    // Optional: Maintain a size property for O(1) length lookups, but we're calculating it here
    // _size: number; 

    constructor() {
        this.head = null;
        // this.tail = null;
        // this._size = 0;
    }

    // A helper method to add elements for testing
    add(value: T): void {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            // this.tail = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
            // this.tail = newNode;
        }
        // this._size++;
    }
}
class LinkedList<T> {
    head: Node<T> | null;

    constructor() {
        this.head = null;
    }

    // ... (add method from above) ...

    getLengthIterative(): number {
        let count = 0;
        let current = this.head; // Start from the head of the list

        // Traverse the list as long as current is not null
        while (current !== null) {
            count++;           // Increment the counter for each node
            current = current.next; // Move to the next node
        }

        return count;
    }
}

// --- Example Usage ---
const listIterative = new LinkedList<number>();
console.log("Length of empty list (iterative):", listIterative.getLengthIterative()); // Output: 0

listIterative.add(10);
console.log("Length of list with 1 element (iterative):", listIterative.getLengthIterative()); // Output: 1

listIterative.add(20);
listIterative.add(30);
listIterative.add(40);
console.log("Length of list with 4 elements (iterative):", listIterative.getLengthIterative()); // Output: 4

const listIterativeStrings = new LinkedList<string>();
listIterativeStrings.add("apple");
listIterativeStrings.add("banana");
console.log("Length of string list (iterative):", listIterativeStrings.getLengthIterative()); // Output: 2
class LinkedList<T> {
    head: Node<T> | null;

    constructor() {
        this.head = null;
    }

    // ... (add method from above) ...

    getLengthRecursive(): number {
        // We'll use a helper function to do the actual recursion
        return this._recursiveLengthHelper(this.head);
    }

    private _recursiveLengthHelper(node: Node<T> | null): number {
        // Base Case: If the current node is null, we've reached the end of the list
        if (node === null) {
            return 0;
        }
        // Recursive Step: Add 1 (for the current node) to the length of the rest of the list
        return 1 + this._recursiveLengthHelper(node.next);
    }
}

// --- Example Usage ---
const listRecursive = new LinkedList<number>();
console.log("Length of empty list (recursive):", listRecursive.getLengthRecursive()); // Output: 0

listRecursive.add(100);
console.log("Length of list with 1 element (recursive):", listRecursive.getLengthRecursive()); // Output: 1

listRecursive.add(200);
listRecursive.add(300);
console.log("Length of list with 3 elements (recursive):", listRecursive.getLengthRecursive()); // Output: 3

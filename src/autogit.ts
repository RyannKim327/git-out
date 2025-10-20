// Define a Node for the linked list
class ListNode<T> {
    value: T;
    next: ListNode<T> | null; // 'next' can point to another ListNode or be null

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

// Define the LinkedList itself
class LinkedList<T> {
    head: ListNode<T> | null; // The head of the list can be a ListNode or null (if empty)
    private _length: number; // Optional: To store length for O(1) access

    constructor() {
        this.head = null;
        this._length = 0;
    }

    // --- Helper methods to build an example list ---
    append(value: T): void {
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
        this._length++; // Increment length when adding a node
    }

    // Optional: O(1) length access if maintained
    getLengthConstantTime(): number {
        return this._length;
    }
}
function getLengthIterative<T>(list: LinkedList<T>): number {
    let count = 0;
    let current = list.head; // Start from the head of the list

    // Traverse the list until 'current' becomes null (end of the list)
    while (current !== null) {
        count++;             // Increment count for each node visited
        current = current.next; // Move to the next node
    }

    return count;
}
function getLengthRecursive<T>(list: LinkedList<T>): number {
    // Helper function that performs the recursion on individual nodes
    function countNodes(node: ListNode<T> | null): number {
        // Base case: If the node is null, it means we've reached the end
        if (node === null) {
            return 0;
        }
        // Recursive step: 1 (for the current node) + count of the rest of the list
        return 1 + countNodes(node.next);
    }

    return countNodes(list.head); // Start the recursion from the head
}
// Create a new linked list
const myLinkedList = new LinkedList<number>();

console.log("--- Initial state ---");
console.log("Length of empty list (iterative):", getLengthIterative(myLinkedList)); // Expected: 0
console.log("Length of empty list (recursive):", getLengthRecursive(myLinkedList)); // Expected: 0
console.log("Length of empty list (constant time):", myLinkedList.getLengthConstantTime()); // Expected: 0

// Add some elements
myLinkedList.append(10);
myLinkedList.append(20);
myLinkedList.append(30);

console.log("\n--- After appending 3 elements ---");
console.log("Length of list (iterative):", getLengthIterative(myLinkedList)); // Expected: 3
console.log("Length of list (recursive):", getLengthRecursive(myLinkedList)); // Expected: 3
console.log("Length of list (constant time):", myLinkedList.getLengthConstantTime()); // Expected: 3

// Add more elements
myLinkedList.append(40);
myLinkedList.append(50);

console.log("\n--- After appending 2 more elements ---");
console.log("Length of list (iterative):", getLengthIterative(myLinkedList)); // Expected: 5
console.log("Length of list (recursive):", getLengthRecursive(myLinkedList)); // Expected: 5
console.log("Length of list (constant time):", myLinkedList.getLengthConstantTime()); // Expected: 5

// Create another list with strings
const stringList = new LinkedList<string>();
stringList.append("Apple");
stringList.append("Banana");

console.log("\n--- String List ---");
console.log("Length of string list (iterative):", getLengthIterative(stringList)); // Expected: 2
console.log("Length of string list (recursive):", getLengthRecursive(stringList)); // Expected: 2
class LinkedList<T> {
    // ... (head property)
    private _length: number; // Store the length here

    constructor() {
        // ...
        this._length = 0;
    }

    append(value: T): void {
        // ... (existing logic to add node)
        this._length++; // Increment length when adding a node
    }

    // You'd also need to decrement it in `remove` methods, etc.

    getLengthConstantTime(): number {
        return this._length;
    }
}

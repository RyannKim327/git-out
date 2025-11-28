// 1. Define a Node
class Node<T> {
    value: T;
    next: Node<T> | null; // Points to the next node or null if it's the last

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

// 2. (Optional) Define a LinkedList class for better management
class LinkedList<T> {
    head: Node<T> | null;
    tail: Node<T> | null; // Useful for efficient appending
    private _size: number; // Private property to store the size

    constructor() {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }

    // O(1) operation: Adding a node
    append(value: T): void {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode; // ! asserts that tail is not null
            this.tail = newNode;
        }
        this._size++; // Increment size when a node is added
    }

    // ... other methods like prepend, delete, etc., which would also update _size

    // Method 1: O(1) - Get length if it's maintained by the class
    get size(): number {
        return this._size;
    }

    // Method 2: O(n) - Traverse the list to count nodes
    get lengthViaTraversal(): number {
        let count = 0;
        let current = this.head;
        while (current !== null) {
            count++;
            current = current.next;
        }
        return count;
    }
}
const myList = new LinkedList<number>();
myList.append(10);
myList.append(20);
myList.append(30);

console.log("Method 1 (O(1) via _size):");
console.log("Length:", myList.size); // Output: Length: 3

myList.append(40);
console.log("Length after appending 40:", myList.size); // Output: Length after appending 40: 4
function getLengthByTraversal<T>(head: Node<T> | null): number {
    let count = 0;
    let current = head; // Start from the head
    while (current !== null) { // Loop until we reach the end of the list
        count++; // Increment the counter for each node
        current = current.next; // Move to the next node
    }
    return count;
}
// Inside LinkedList class:
get lengthViaTraversal(): number {
    let count = 0;
    let current = this.head;
    while (current !== null) {
        count++;
        current = current.next;
    }
    return count;
}
// Using the LinkedList class's traversal method:
const anotherList = new LinkedList<string>();
anotherList.append("apple");
anotherList.append("banana");

console.log("\nMethod 2 (O(n) via traversal):");
console.log("Length:", anotherList.lengthViaTraversal); // Output: Length: 2

// Example with a standalone function and just a head node:
const node1 = new Node("A");
const node2 = new Node("B");
const node3 = new Node("C");

node1.next = node2;
node2.next = node3;

console.log("Length of a list from a head node:", getLengthByTraversal(node1)); // Output: Length of a list from a head node: 3
console.log("Length of an empty list:", getLengthByTraversal(null)); // Output: Length of an empty list: 0
function getLengthRecursive<T>(node: Node<T> | null): number {
    // Base case: If the current node is null, we've reached the end, return 0.
    if (node === null) {
        return 0;
    }
    // Recursive step: Add 1 (for the current node) to the length of the rest of the list.
    return 1 + getLengthRecursive(node.next);
}
const listForRecursion = new LinkedList<number>();
listForRecursion.append(1);
listForRecursion.append(2);
listForRecursion.append(3);
listForRecursion.append(4);

console.log("\nMethod 3 (O(n) via recursion):");
console.log("Length (recursive):", getLengthRecursive(listForRecursion.head)); // Output: Length (recursive): 4

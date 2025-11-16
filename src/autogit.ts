// 1. Define the Node structure
class Node<T> {
    value: T;
    next: Node<T> | null; // next can be another Node or null if it's the last

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

// 2. Define the LinkedList structure
class LinkedList<T> {
    head: Node<T> | null;

    constructor() {
        this.head = null;
    }

    // Helper method to add elements for demonstration
    append(value: T): void {
        const newNode = new Node(value);
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

    // You would typically add other methods like prepend, delete, etc.
}
class LinkedList<T> {
    head: Node<T> | null;
    // ... (constructor and append method as above) ...

    getLengthIterative(): number {
        let count = 0;
        let current = this.head; // Start from the head of the list

        while (current !== null) { // While there are still nodes to visit
            count++;             // Increment the counter
            current = current.next; // Move to the next node
        }
        return count;
    }
}

// --- Usage Example ---
const myList1 = new LinkedList<number>();
console.log("Length of empty list:", myList1.getLengthIterative()); // Output: 0

myList1.append(10);
myList1.append(20);
myList1.append(30);
console.log("Length of list [10, 20, 30]:", myList1.getLengthIterative()); // Output: 3

myList1.append(40);
console.log("Length of list [10, 20, 30, 40]:", myList1.getLengthIterative()); // Output: 4
class LinkedList<T> {
    head: Node<T> | null;
    // ... (constructor and append method as above) ...

    private getLengthRecursiveHelper(node: Node<T> | null): number {
        if (node === null) {
            return 0; // Base case: an empty list (or end of list) has length 0
        }
        return 1 + this.getLengthRecursiveHelper(node.next); // 1 (current node) + length of the rest
    }

    getLengthRecursive(): number {
        return this.getLengthRecursiveHelper(this.head);
    }
}

// --- Usage Example ---
const myList2 = new LinkedList<string>();
console.log("Length of empty list (recursive):", myList2.getLengthRecursive()); // Output: 0

myList2.append("apple");
myList2.append("banana");
console.log("Length of list ['apple', 'banana'] (recursive):", myList2.getLengthRecursive()); // Output: 2
class LinkedList<T> {
    head: Node<T> | null;
    private _size: number; // Private property to store the current size

    constructor() {
        this.head = null;
        this._size = 0; // Initialize size
    }

    append(value: T): void {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this._size++; // Increment size when a node is added
    }

    // You would also need to update _size in other methods:
    prepend(value: T): void {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
        this._size++; // Increment size
    }

    delete(value: T): boolean {
        if (!this.head) {
            return false;
        }

        if (this.head.value === value) {
            this.head = this.head.next;
            this._size--; // Decrement size
            return true;
        }

        let current = this.head;
        while (current.next && current.next.value !== value) {
            current = current.next;
        }

        if (current.next) {
            current.next = current.next.next;
            this._size--; // Decrement size
            return true;
        }
        return false;
    }

    // O(1) operation to get the length
    getLength(): number {
        return this._size;
    }
}

// --- Usage Example ---
const myList3 = new LinkedList<string>();
console.log("\nLength of empty list (stored property):", myList3.getLength()); // Output: 0

myList3.append("Alpha");
console.log("Length after append 'Alpha':", myList3.getLength()); // Output: 1

myList3.append("Beta");
myList3.prepend("Gamma"); // Assuming you implement prepend
console.log("Length after append 'Beta' and prepend 'Gamma':", myList3.getLength()); // Output: 3

myList3.delete("Beta"); // Assuming you implement delete
console.log("Length after deleting 'Beta':", myList3.getLength()); // Output: 2

myList3.delete("Zeta"); // Not found
console.log("Length after trying to delete 'Zeta' (not found):", myList3.getLength()); // Output: 2

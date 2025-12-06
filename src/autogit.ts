class Node<T> {
    public next: Node<T> | null = null;
    constructor(public data: T) {}
}

class LinkedList<T> {
    private head: Node<T> | null = null;

    // Add a node to the list (optional - for testing)
    public append(data: T): void {
        const newNode = new Node(data);
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

    // Calculate length (core implementation)
    public length(): number {
        let count = 0;
        let current = this.head;
        while (current) {
            count++;
            current = current.next;
        }
        return count;
    }
}
// Create a linked list
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);

// Get the length
console.log(list.length()); // Output: 3

// Edge case: Empty list
const emptyList = new LinkedList<string>();
console.log(emptyList.length()); // Output: 0
// Add this to the LinkedList class
public recursiveLength(node: Node<T> | null = this.head): number {
    return node ? 1 + this.recursiveLength(node.next) : 0;
}
console.log(list.recursiveLength()); // 3

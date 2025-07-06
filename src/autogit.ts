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
    size: number;

    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Add a new node at the end of the list
    add(value: T): void {
        const newNode = new Node(value);
        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    // Remove a node by value
    remove(value: T): boolean {
        if (this.head === null) return false;

        if (this.head.value === value) {
            this.head = this.head.next;
            this.size--;
            return true;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.value === value) {
                current.next = current.next.next;
                this.size--;
                return true;
            }
            current = current.next;
        }
        return false;
    }

    // Display the list
    display(): void {
        let current = this.head;
        const elements: T[] = [];
        while (current) {
            elements.push(current.value);
            current = current.next;
        }
        console.log(elements.join(' -> '));
    }

    // Get the size of the list
    getSize(): number {
        return this.size;
    }
}
const list = new LinkedList<number>();
list.add(10);
list.add(20);
list.add(30);
list.display(); // Output: 10 -> 20 -> 30

list.remove(20);
list.display(); // Output: 10 -> 30

console.log(`Size of the list: ${list.getSize()}`); // Output: Size of the list: 2

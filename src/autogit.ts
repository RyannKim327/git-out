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
    size: number;

    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Add element to the end
    add(value: T): void {
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
        this.size++;
    }
}
function findMiddle<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null;

    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;

    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }

    return slow;
}
function findMiddleWithArray<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null;

    const nodes: ListNode<T>[] = [];
    let current: ListNode<T> | null = head;
    
    while (current) {
        nodes.push(current);
        current = current.next;
    }

    const middleIndex = Math.floor(nodes.length / 2);
    return nodes[middleIndex];
}
// Complete implementation with example
class LinkedList<T> {
    head: ListNode<T> | null;
    size: number;

    constructor() {
        this.head = null;
        this.size = 0;
    }

    add(value: T): void {
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
        this.size++;
    }

    findMiddle(): ListNode<T> | null {
        return findMiddle(this.head);
    }

    // Helper method to get middle value
    getMiddleValue(): T | null {
        const middleNode = this.findMiddle();
        return middleNode ? middleNode.value : null;
    }
}

// Usage example
const list = new LinkedList<number>();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);

console.log("Middle element:", list.getMiddleValue()); // Output: 3

list.add(6);
console.log("Middle element:", list.getMiddleValue()); // Output: 4 (if list has even number of elements, returns the second middle)
function findMiddleSafe<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null;
    if (!head.next) return head; // Single element list

    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;

    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }

    return slow;
}

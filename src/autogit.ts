class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T, next: ListNode<T> | null = null) {
        this.value = value;
        this.next = next;
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
function findMiddleWithCounter<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null;

    let count = 0;
    let current: ListNode<T> | null = head;
    
    // Count total nodes
    while (current) {
        count++;
        current = current.next;
    }

    // Find middle position
    const middlePos = Math.floor(count / 2);
    current = head;
    
    for (let i = 0; i < middlePos; i++) {
        current = current!.next;
    }

    return current;
}
class LinkedList<T> {
    head: ListNode<T> | null;

    constructor() {
        this.head = null;
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
    }

    findMiddle(): ListNode<T> | null {
        return findMiddle(this.head);
    }

    // Alternative implementation
    findMiddleWithCounter(): ListNode<T> | null {
        return findMiddleWithCounter(this.head);
    }
}

// Usage
const list = new LinkedList<number>();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);

const middle = list.findMiddle();
console.log(middle?.value); // Output: 3

const middleWithCounter = list.findMiddleWithCounter();
console.log(middleWithCounter?.value); // Output: 3
function findMiddleEnhanced<T>(head: ListNode<T> | null): ListNode<T> | null {
    // Empty list
    if (!head) return null;
    
    // Single node
    if (!head.next) return head;
    
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow!.next!;
        fast = fast.next.next!;
    }

    return slow;
}

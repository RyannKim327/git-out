// Define the linked list node
class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

function findMiddle<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null;
    
    let slow: ListNode<T> = head;
    let fast: ListNode<T> | null = head;
    
    while (fast && fast.next) {
        slow = slow.next!;
        fast = fast.next.next;
    }
    
    return slow;
}
function findMiddleByCount<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null;
    
    // First traversal: count nodes
    let count = 0;
    let current: ListNode<T> | null = head;
    while (current) {
        count++;
        current = current.next;
    }
    
    // Second traversal: find middle
    const middleIndex = Math.floor(count / 2);
    current = head;
    
    for (let i = 0; i < middleIndex; i++) {
        current = current!.next;
    }
    
    return current;
}
class LinkedList<T> {
    head: ListNode<T> | null = null;
    
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
    
    // Method 1: Two pointers (recommended)
    findMiddle(): T | null {
        const middleNode = findMiddle(this.head);
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

console.log("Middle element:", list.findMiddle()); // Output: 3

list.add(6);
console.log("Middle element:", list.findMiddle()); // Output: 4 (second middle in even-length list)
function findMiddleUsingArray<T>(head: ListNode<T> | null): ListNode<T> | null {
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

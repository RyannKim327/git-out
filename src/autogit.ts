class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
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
function findMiddleWithLength<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null;
    
    // First pass: count nodes
    let current: ListNode<T> | null = head;
    let length = 0;
    
    while (current) {
        length++;
        current = current.next;
    }
    
    // Second pass: find middle
    const middleIndex = Math.floor(length / 2);
    current = head;
    
    for (let i = 0; i < middleIndex; i++) {
        current = current!.next;
    }
    
    return current;
}
function findMiddleWithArray<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null;
    
    const nodes: ListNode<T>[] = [];
    let current: ListNode<T> | null = head;
    
    while (current) {
        nodes.push(current);
        current = current.next;
    }
    
    return nodes[Math.floor(nodes.length / 2)];
}
// Create a linked list: 1 -> 2 -> 3 -> 4 -> 5
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

// Find middle element
const middle = findMiddle(head);
console.log(middle?.value); // Output: 3

// For even number of nodes: 1 -> 2 -> 3 -> 4
const head2 = new ListNode(1);
head2.next = new ListNode(2);
head2.next.next = new ListNode(3);
head2.next.next.next = new ListNode(4);

const middle2 = findMiddle(head2);
console.log(middle2?.value); // Output: 3 (second middle when even)

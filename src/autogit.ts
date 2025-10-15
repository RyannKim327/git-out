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
function findMiddleWithCount<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null;
    
    let count = 0;
    let current: ListNode<T> | null = head;
    
    // Count total nodes
    while (current) {
        count++;
        current = current.next;
    }
    
    // Find middle position
    const middleIndex = Math.floor(count / 2);
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
// Create a linked list: 1 → 2 → 3 → 4 → 5
const node5 = new ListNode(5);
const node4 = new ListNode(4, node5);
const node3 = new ListNode(3, node4);
const node2 = new ListNode(2, node3);
const node1 = new ListNode(1, node2);

// Find middle element
const middle = findMiddle(node1);
console.log(middle?.value); // Output: 3

// For even number of nodes: 1 → 2 → 3 → 4
const node4b = new ListNode(4);
const node3b = new ListNode(3, node4b);
const node2b = new ListNode(2, node3b);
const node1b = new ListNode(1, node2b);

const middleEven = findMiddle(node1b);
console.log(middleEven?.value); // Output: 3 (second middle in even-length list)

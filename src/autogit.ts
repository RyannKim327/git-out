// Define the ListNode class
class ListNode<T> {
    data: T;
    next: ListNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}

// Function to find the middle element of the linked list
function findMiddle<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (head === null) return null;

    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}

// Example usage:
const node1 = new ListNode<number>(1);
const node2 = new ListNode<number>(2);
const node3 = new ListNode<number>(3);
const node4 = new ListNode<number>(4);
const node5 = new ListNode<number>(5);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

const middleNode = findMiddle(node1);
console.log(middleNode ? middleNode.data : null); // Output: 3

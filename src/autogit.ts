class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

function findMiddle<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (head === null) return null;

    let slow: ListNode<T> = head;
    let fast: ListNode<T> | null = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next!; // Safe due to loop conditions
        fast = fast.next.next;
    }

    return slow;
}
// Odd-length list: 1 -> 2 -> 3 -> 4 -> 5
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

const middle = findMiddle(head);
console.log(middle?.value); // Output: 3

// Even-length list (returns second middle): 1 -> 2 -> 3 -> 4
const head2 = new ListNode(1);
head2.next = new ListNode(2

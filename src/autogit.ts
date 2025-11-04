class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function findNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    if (!head || n <= 0) {
        return null;
    }

    let fast: ListNode | null = head;
    let slow: ListNode | null = head;

    // Move fast pointer n nodes ahead
    for (let i = 0; i < n; i++) {
        if (!fast) {
            // n is larger than list length
            return null;
        }
        fast = fast.next;
    }

    // Move both pointers until fast reaches the end
    while (fast !== null) {
        fast = fast.next;
        slow = slow!.next;
    }

    return slow;
}

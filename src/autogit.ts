class ListNode {
    value: number;
    next: ListNode | null;

    constructor(value: number) {
        this.value = value;
        this.next = null;
    }
}

function findNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    if (!head || n <= 0) return null;

    let fast: ListNode | null = head;
    let slow: ListNode | null = head;

    // Move fast n steps ahead
    for (let i = 0; i < n; i++) {
        if (!fast) return null; // n is greater than list length
        fast = fast.next;
    }

    // Move both until fast reaches the end
    while (fast) {
        slow = slow!.next;
        fast = fast.next;
    }

    return slow;
}

// Example usage:
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);

const result = findNthFromEnd(head, 2); // Should return node with value 3
console.log(result?.value); // Output: 3

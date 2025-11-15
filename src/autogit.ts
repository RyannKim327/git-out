class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val: number, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }
}
function getNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    let first: ListNode | null = head;
    let second: ListNode | null = head;

    // Move first pointer n steps ahead
    for (let i = 0; i < n; i++) {
        if (!first) return null; // n is larger than list length
        first = first.next;
    }

    // Move both pointers until first reaches the end
    while (first) {
        first = first.next;
        second = second!.next;
    }

    // second now points to the nth node from the end
    return second;
}
const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
const node = getNthFromEnd(head, 2); // Should give the node with val=3
console.log(node?.val); // Output: 3

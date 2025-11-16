class ListNode {
    value: any;
    next: ListNode | null;

    constructor(value: any) {
        this.value = value;
        this.next = null;
    }
}

function hasCycle(head: ListNode | null): boolean {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            return true;
        }
    }
    return false;
}

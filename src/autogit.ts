class ListNode {
    val: number;
    next: ListNode | null = null;

    constructor(val: number) {
        this.val = val;
    }
}

function isPalindrome(head: ListNode | null): boolean {
    if (!head || !head.next) return true;

    // Step 1: Find the middle
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next!;
        fast = fast.next.next;
    }

    // Step 2: Reverse the second half
    let prev: ListNode | null = null;
    let curr: ListNode | null = slow;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    // Step 3: Compare first and second half
    let left = head;
    let right = prev;
    let result = true;
    while (right) {
        if (left!.val !== right.val) {
            result = false;
            break;
        }
        left = left!.next;
        right = right.next;
    }

    // Step 4: (Optional) Restore the list
    // You can re-reverse the second half and reconnect if needed

    return result;
}
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(2);
head.next.next.next = new ListNode(1);

console.log(isPalindrome(head)); // true

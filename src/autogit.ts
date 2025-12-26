class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number) {
        this.val = val;
        this.next = null;
    }
}

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    if (!headA || !headB) return null;

    let lenA = getLength(headA);
    let lenB = getLength(headB);

    // Align the starts
    let ptrA = headA;
    let ptrB = headB;

    if (lenA > lenB) {
        ptrA = advanceBy(ptrA, lenA - lenB);
    } else {
        ptrB = advanceBy(ptrB, lenB - lenA);
    }

    // Traverse together
    while (ptrA && ptrB) {
        if (ptrA === ptrB) return ptrA;
        ptrA = ptrA.next;
        ptrB = ptrB.next;
    }

    return null;
}

function getLength(head: ListNode | null): number {
    let count = 0;
    while (head) {
        count++;
        head = head.next;
    }
    return count;
}

function advanceBy(head: ListNode | null, steps: number): ListNode | null {
    while (steps > 0 && head) {
        head = head.next;
        steps--;
    }
    return head;
}
// Create intersecting lists
const common = new ListNode(8);
common.next = new ListNode(10);

const headA = new ListNode(3);
headA.next = new ListNode(7);
headA.next.next = common;

const headB = new ListNode(99);
headB.next = new ListNode(1);
headB.next.next = common;

const intersection = getIntersectionNode(headA, headB);
console.log(intersection?.val); // Output: 8

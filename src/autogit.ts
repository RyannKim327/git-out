class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }
}
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    if (!headA || !headB) return null;

    let pA: ListNode | null = headA;
    let pB: ListNode | null = headB;

    // Switch heads when reaching the end
    while (pA !== pB) {
        pA = pA === null ? headB : pA.next;
        pB = pB === null ? headA : pB.next;
    }

    return pA; // Either the intersection node or null
}
// Create intersecting lists
const common = new ListNode(8, new ListNode(10));

const listA = new ListNode(3, new ListNode(7, common));
const listB = new ListNode(99, new ListNode(1, common));

const intersection = getIntersectionNode(listA, listB);
console.log(intersection?.val); // Output: 8

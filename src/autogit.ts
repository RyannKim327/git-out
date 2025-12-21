class ListNode {
    val: number;
    next: ListNode | null = null;

    constructor(val: number) {
        this.val = val;
    }
}

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    if (!headA || !headB) return null;

    let lenA = 0, lenB = 0;
    let currA = headA, currB = headB;

    // Get lengths
    while (currA) {
        lenA++;
        currA = currA.next;
    }
    while (currB) {
        lenB++;
        currB = currB.next;
    }

    currA = headA;
    currB = headB;

    // Align starting points
    if (lenA > lenB) {
        for (let i = 0; i < lenA - lenB; i++) {
            currA = currA!.next;
        }
    } else {
        for (let i = 0; i < lenB - lenA; i++) {
            currB = currB!.next;
        }
    }

    // Traverse together
    while (currA && currB) {
        if (currA === currB) return currA;
        currA = currA.next;
        currB = currB.next;
    }

    return null;
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

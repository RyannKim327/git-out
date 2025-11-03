class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T, next?: ListNode<T> | null) {
        this.value = value;
        this.next = next ?? null;
    }
}

function getIntersectionNode<T>(
    headA: ListNode<T> | null,
    headB: ListNode<T> | null
): ListNode<T> | null {
    if (!headA || !headB) return null;

    let ptrA: ListNode<T> | null = headA;
    let ptrB: ListNode<T> | null = headB;

    while (ptrA !== ptrB) {
        ptrA = ptrA ? ptrA.next : headB;
        ptrB = ptrB ? ptrB.next : headA;
    }

    return ptrA;
}
// List A: 1 -> 2 -> 3 -> 4
const a4 = new ListNode(4);
const a3 = new ListNode(3, a4);
const a2 = new ListNode(2, a3);
const a1 = new ListNode(1, a2);

// List B: 9 -> 3 -> 4 (intersects at a3)
const b1 = new ListNode(9, a3);

const intersection = getIntersectionNode(a1, b1); // Returns node with value 3

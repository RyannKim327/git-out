class ListNode {
    val: number;
    next: ListNode | null;
    
    constructor(val: number, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }
}
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    const visited = new Set<ListNode>();
    
    let currentA = headA;
    while (currentA !== null) {
        visited.add(currentA);
        currentA = currentA.next;
    }
    
    let currentB = headB;
    while (currentB !== null) {
        if (visited.has(currentB)) {
            return currentB;
        }
        currentB = currentB.next;
    }
    
    return null;
}
function getIntersectionNodeTwoPointers(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    if (!headA || !headB) return null;
    
    let pointerA: ListNode | null = headA;
    let pointerB: ListNode | null = headB;
    
    while (pointerA !== pointerB) {
        pointerA = pointerA === null ? headB : pointerA.next;
        pointerB = pointerB === null ? headA : pointerB.next;
    }
    
    return pointerA;
}
// Create test lists
const commonNode = new ListNode(8, new ListNode(10));
const listA = new ListNode(1, new ListNode(2, new ListNode(3, commonNode)));
const listB = new ListNode(4, new ListNode(5, commonNode));

// Find intersection
const intersection = getIntersectionNode(listA, listB);
console.log(intersection?.val); // Output: 8

// Alternative using two pointers
const intersection2 = getIntersectionNodeTwoPointers(listA, listB);
console.log(intersection2?.val); // Output: 8
function getIntersectionNodeWithLength(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    const getLength = (head: ListNode | null): number => {
        let length = 0;
        let current = head;
        while (current !== null) {
            length++;
            current = current.next;
        }
        return length;
    };

    const lenA = getLength(headA);
    const lenB = getLength(headB);

    let longer = lenA > lenB ? headA : headB;
    let shorter = lenA > lenB ? headB : headA;
    let diff = Math.abs(lenA - lenB);

    // Advance the longer list by the difference
    while (diff > 0 && longer !== null) {
        longer = longer.next;
        diff--;
    }

    // Find intersection
    while (longer !== null && shorter !== null) {
        if (longer === shorter) {
            return longer;
        }
        longer = longer.next;
        shorter = shorter.next;
    }

    return null;
}

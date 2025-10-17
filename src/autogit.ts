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
    
    let ptrA: ListNode | null = headA;
    let ptrB: ListNode | null = headB;
    
    while (ptrA !== ptrB) {
        ptrA = ptrA === null ? headB : ptrA.next;
        ptrB = ptrB === null ? headA : ptrB.next;
    }
    
    return ptrA;
}
// Create test lists
const commonNode = new ListNode(8, new ListNode(4, new ListNode(5)));
const listA = new ListNode(4, new ListNode(1, commonNode));
const listB = new ListNode(5, new ListNode(6, new ListNode(1, commonNode)));

// Find intersection
const intersection = getIntersectionNode(listA, listB);
console.log(intersection?.val); // Output: 8

const intersection2 = getIntersectionNodeTwoPointers(listA, listB);
console.log(intersection2?.val); // Output: 8

class ListNode {
    val: number;
    next: ListNode | null;
    
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    if (!headA || !headB) return null;
    
    // Create two pointers
    let pointerA: ListNode | null = headA;
    let pointerB: ListNode | null = headB;
    
    // Traverse both lists
    while (pointerA !== pointerB) {
        // Move pointers to next node
        pointerA = pointerA ? pointerA.next : headB;
        pointerB = pointerB ? pointerB.next : headA;
    }
    
    // Either both are null (no intersection) or both point to intersection node
    return pointerA;
}
function getIntersectionNodeWithLength(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    if (!headA || !headB) return null;
    
    // Get lengths of both lists
    const lengthA = getLength(headA);
    const lengthB = getLength(headB);
    
    // Align starting points
    let ptrA: ListNode | null = headA;
    let ptrB: ListNode | null = headB;
    
    // Move the longer list's pointer forward
    if (lengthA > lengthB) {
        ptrA = moveForward(headA, lengthA - lengthB);
    } else if (lengthB > lengthA) {
        ptrB = moveForward(headB, lengthB - lengthA);
    }
    
    // Find intersection
    while (ptrA && ptrB && ptrA !== ptrB) {
        ptrA = ptrA.next;
        ptrB = ptrB.next;
    }
    
    return ptrA; // Returns null if no intersection
}

function getLength(head: ListNode | null): number {
    let length = 0;
    let current = head;
    while (current) {
        length++;
        current = current.next;
    }
    return length;
}

function moveForward(head: ListNode | null, steps: number): ListNode | null {
    let current = head;
    for (let i = 0; i < steps && current; i++) {
        current = current.next;
    }
    return current;
}
// Create test lists
const commonNode = new ListNode(8, new ListNode(10));
const listA = new ListNode(1, new ListNode(3, new ListNode(5, commonNode)));
const listB = new ListNode(2, new ListNode(4, commonNode));

// Find intersection
const intersection = getIntersectionNode(listA, listB);
console.log(intersection?.val); // Output: 8

// Test case with no intersection
const listC = new ListNode(1, new ListNode(2));
const listD = new ListNode(3, new ListNode(4));
console.log(getIntersectionNode(listC, listD)); // Output: null

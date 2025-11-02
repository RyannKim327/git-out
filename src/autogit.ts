class ListNode<T> {
    val: T;
    next: ListNode<T> | null;

    constructor(val: T, next: ListNode<T> | null = null) {
        this.val = val;
        this.next = next;
    }
}
function getIntersectionNodeSet<T>(headA: ListNode<T> | null, headB: ListNode<T> | null): ListNode<T> | null {
    if (!headA || !headB) {
        return null;
    }

    const visitedNodes = new Set<ListNode<T>>();

    let currentA: ListNode<T> | null = headA;
    while (currentA) {
        visitedNodes.add(currentA);
        currentA = currentA.next;
    }

    let currentB: ListNode<T> | null = headB;
    while (currentB) {
        if (visitedNodes.has(currentB)) {
            return currentB; // Found the intersection
        }
        currentB = currentB.next;
    }

    return null; // No intersection found
}
function getIntersectionNodeTwoPointersLength<T>(headA: ListNode<T> | null, headB: ListNode<T> | null): ListNode<T> | null {
    if (!headA || !headB) {
        return null;
    }

    let lenA = 0;
    let current: ListNode<T> | null = headA;
    while (current) {
        lenA++;
        current = current.next;
    }

    let lenB = 0;
    current = headB;
    while (current) {
        lenB++;
        current = current.next;
    }

    let ptrA: ListNode<T> | null = headA;
    let ptrB: ListNode<T> | null = headB;

    // Advance the longer list's pointer by the difference in lengths
    if (lenA > lenB) {
        for (let i = 0; i < lenA - lenB; i++) {
            ptrA = ptrA!.next; // We know ptrA won't be null here
        }
    } else if (lenB > lenA) {
        for (let i = 0; i < lenB - lenA; i++) {
            ptrB = ptrB!.next; // We know ptrB won't be null here
        }
    }

    // Now, traverse both lists simultaneously until pointers meet
    while (ptrA && ptrB) {
        if (ptrA === ptrB) {
            return ptrA; // Found the intersection
        }
        ptrA = ptrA.next;
        ptrB = ptrB.next;
    }

    return null; // No intersection found
}
function getIntersectionNodeTwoPointersSwap<T>(headA: ListNode<T> | null, headB: ListNode<T> | null): ListNode<T> | null {
    if (!headA || !headB) {
        return null;
    }

    let pA: ListNode<T> | null = headA;
    let pB: ListNode<T> | null = headB;

    // Loop until they meet. If no intersection, they both become null
    // at the same time and the loop terminates.
    while (pA !== pB) {
        // Move pA to the next node. If it's null, redirect to headB.
        pA = pA === null ? headB : pA.next;
        // Move pB to the next node. If it's null, redirect to headA.
        pB = pB === null ? headA : pB.next;
    }

    // pA (or pB) is either the intersection node or null if no intersection
    return pA;
}
// Helper function to print a linked list (for debugging)
function printList<T>(head: ListNode<T> | null): string {
    let current = head;
    let result = "";
    while (current) {
        result += current.val + " -> ";
        current = current.next;
    }
    return result + "NULL";
}

// --- Example 1: Intersection exists ---
// List A: 4 -> 1 -> 8 -> 4 -> 5
// List B: 5 -> 6 -> 1 -> 8 -> 4 -> 5  (Intersection at node with value 8)

const commonNode5 = new ListNode(5);
const commonNode4 = new ListNode(4, commonNode5);
const commonNode8 = new ListNode(8, commonNode4);

const headA = new ListNode(4, new ListNode(1, commonNode8));
const headB = new ListNode(5, new ListNode(6, new ListNode(1, commonNode8))); // Pointing to commonNode8

console.log("List A:", printList(headA));
console.log("List B:", printList(headB));

let intersection1 = getIntersectionNodeTwoPointersSwap(headA, headB);
console.log("Intersection (Example 1):", intersection1 ? intersection1.val : "NULL"); // Expected: 8
console.log("---");


// --- Example 2: No intersection ---
// List A: 1 -> 2 -> 3
// List B: 4 -> 5 -> 6

const headA2 = new ListNode(1, new ListNode(2, new ListNode(3)));
const headB2 = new ListNode(4, new ListNode(5, new ListNode(6)));

console.log("List A:", printList(headA2));
console.log("List B:", printList(headB2));

let intersection2 = getIntersectionNodeTwoPointersSwap(headA2, headB2);
console.log("Intersection (Example 2):", intersection2 ? intersection2.val : "NULL"); // Expected: NULL
console.log("---");

// --- Example 3: Intersection at head of B, not A (but common part starts earlier) ---
// List A: 1 -> 2 -> 3
// List B: 0 -> 3 (same node as A's 3)
const commonNode3 = new ListNode(3);
const headA3 = new ListNode(1, new ListNode(2, commonNode3));
const headB3 = new ListNode(0, commonNode3);

console.log("List A:", printList(headA3));
console.log("List B:", printList(headB3));

let intersection3 = getIntersectionNodeTwoPointersSwap(headA3, headB3);
console.log("Intersection (Example 3):", intersection3 ? intersection3.val : "NULL"); // Expected: 3
console.log("---");

// --- Example 4: One list empty ---
let intersection4 = getIntersectionNodeTwoPointersSwap(null, headB3);
console.log("Intersection (Example 4 - one null):", intersection4 ? intersection4.val : "NULL"); // Expected: NULL
console.log("---");

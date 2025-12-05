class ListNode<T = number> {
    val: T;
    next: ListNode<T> | null;

    constructor(val?: T, next?: ListNode<T> | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}
function getIntersectionNode_HashSet<T>(headA: ListNode<T> | null, headB: ListNode<T> | null): ListNode<T> | null {
    if (!headA || !headB) {
        return null; // No intersection if one or both lists are empty
    }

    const visitedNodes = new Set<ListNode<T>>();

    // 1. Traverse list A and add all its nodes to the set
    let currentA: ListNode<T> | null = headA;
    while (currentA) {
        visitedNodes.add(currentA);
        currentA = currentA.next;
    }

    // 2. Traverse list B and check if any node is in the set
    let currentB: ListNode<T> | null = headB;
    while (currentB) {
        if (visitedNodes.has(currentB)) {
            return currentB; // Found the first common node
        }
        currentB = currentB.next;
    }

    return null; // No intersection found
}
function getIntersectionNode_LengthDifference<T>(headA: ListNode<T> | null, headB: ListNode<T> | null): ListNode<T> | null {
    if (!headA || !headB) {
        return null;
    }

    // 1. Calculate lengths
    let lenA = 0;
    let currentA = headA;
    while (currentA) {
        lenA++;
        currentA = currentA.next;
    }

    let lenB = 0;
    let currentB = headB;
    while (currentB) {
        lenB++;
        currentB = currentB.next;
    }

    // Reset pointers for the next phase
    currentA = headA;
    currentB = headB;

    // 2. Advance the pointer of the longer list by the difference
    if (lenA > lenB) {
        let diff = lenA - lenB;
        while (diff > 0) {
            currentA = currentA!.next; // '!' asserts non-null as we know it's long enough
            diff--;
        }
    } else if (lenB > lenA) {
        let diff = lenB - lenA;
        while (diff > 0) {
            currentB = currentB!.next; // '!' asserts non-null
            diff--;
        }
    }

    // 3. Traverse both lists simultaneously until they meet or reach null
    while (currentA && currentB && currentA !== currentB) {
        currentA = currentA.next;
        currentB = currentB.next;
    }

    // If currentA is null, they never met. Otherwise, currentA is the intersection node.
    return currentA;
}
function getIntersectionNode_TwoPointersCycle<T>(headA: ListNode<T> | null, headB: ListNode<T> | null): ListNode<T> | null {
    if (!headA || !headB) {
        return null;
    }

    let pA: ListNode<T> | null = headA;
    let pB: ListNode<T> | null = headB;

    // If a collision occurs, it will be the intersection node.
    // If no collision, both will become null simultaneously.
    while (pA !== pB) {
        // If pA reaches the end of list A, reset it to headB.
        // Otherwise, move to the next node in A.
        pA = pA ? pA.next : headB;

        // If pB reaches the end of list B, reset it to headA.
        // Otherwise, move to the next node in B.
        pB = pB ? pB.next : headA;
    }

    // pA (or pB, since they are equal) is either the intersection node or null.
    return pA;
}
// Helper to print a list
function printList<T>(head: ListNode<T> | null): void {
    let current = head;
    const values: T[] = [];
    while (current) {
        values.push(current.val);
        current = current.next;
    }
    console.log(values.join(" -> "));
}

// Create nodes for intersection
const commonNode1 = new ListNode(8);
const commonNode2 = new ListNode(4);
const commonNode3 = new ListNode(5);

commonNode1.next = commonNode2;
commonNode2.next = commonNode3;

// --- Example 1: Intersection exists ---
console.log("--- Example 1: Intersection exists ---");

// List A: 4 -> 1 -> 8 -> 4 -> 5
const headA1 = new ListNode(4, new ListNode(1, commonNode1)); // Points to commonNode1
printList(headA1); // 4 -> 1 -> 8 -> 4 -> 5

// List B: 5 -> 6 -> 1 -> 8 -> 4 -> 5
const headB1 = new ListNode(5, new ListNode(6, new ListNode(1, commonNode1))); // Points to commonNode1
printList(headB1); // 5 -> 6 -> 1 -> 8 -> 4 -> 5

let intersectionNode1_HashSet = getIntersectionNode_HashSet(headA1, headB1);
console.log("Intersection (HashSet):", intersectionNode1_HashSet ? intersectionNode1_HashSet.val : "null"); // Expected: 8

let intersectionNode1_LengthDiff = getIntersectionNode_LengthDifference(headA1, headB1);
console.log("Intersection (Length Difference):", intersectionNode1_LengthDiff ? intersectionNode1_LengthDiff.val : "null"); // Expected: 8

let intersectionNode1_TwoPointers = getIntersectionNode_TwoPointersCycle(headA1, headB1);
console.log("Intersection (Two Pointers Cycle):", intersectionNode1_TwoPointers ? intersectionNode1_TwoPointers.val : "null"); // Expected: 8


// --- Example 2: No Intersection ---
console.log("\n--- Example 2: No Intersection ---");
const headA2 = new ListNode(1, new ListNode(2, new ListNode(3)));
const headB2 = new ListNode(4, new ListNode(5, new ListNode(6)));
printList(headA2); // 1 -> 2 -> 3
printList(headB2); // 4 -> 5 -> 6

let intersectionNode2_HashSet = getIntersectionNode_HashSet(headA2, headB2);
console.log("Intersection (HashSet):", intersectionNode2_HashSet ? intersectionNode2_HashSet.val : "null"); // Expected: null

let intersectionNode2_LengthDiff = getIntersectionNode_LengthDifference(headA2, headB2);
console.log("Intersection (Length Difference):", intersectionNode2_LengthDiff ? intersectionNode2_LengthDiff.val : "null"); // Expected: null

let intersectionNode2_TwoPointers = getIntersectionNode_TwoPointersCycle(headA2, headB2);
console.log("Intersection (Two Pointers Cycle):", intersectionNode2_TwoPointers ? intersectionNode2_TwoPointers.val : "null"); // Expected: null


// --- Example 3: Intersection at head ---
console.log("\n--- Example 3: Intersection at head ---");
const headA3 = commonNode1; // List A starts directly at the common node
const headB3 = new ListNode(9, commonNode1); // List B intersects after one node
printList(headA3); // 8 -> 4 -> 5
printList(headB3); // 9 -> 8 -> 4 -> 5

let intersectionNode3_TwoPointers = getIntersectionNode_TwoPointersCycle(headA3, headB3);
console.log("Intersection (Two Pointers Cycle):", intersectionNode3_TwoPointers ? intersectionNode3_TwoPointers.val : "null"); // Expected: 8

// --- Example 4: One list is empty ---
console.log("\n--- Example 4: One list is empty ---");
const headA4 = null;
const headB4 = new ListNode(1);
console.log("Intersection (Two Pointers Cycle):", getIntersectionNode_TwoPointersCycle(headA4, headB4) ? "found" : "null"); // Expected: null

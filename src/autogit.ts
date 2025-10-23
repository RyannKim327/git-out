class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}
function getIntersectionNodeHashSet(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    if (!headA || !headB) {
        return null;
    }

    const visitedNodes = new Set<ListNode>();

    // Add all nodes from listA to the set
    let currentA: ListNode | null = headA;
    while (currentA) {
        visitedNodes.add(currentA);
        currentA = currentA.next;
    }

    // Iterate through listB and check if any node is in the set
    let currentB: ListNode | null = headB;
    while (currentB) {
        if (visitedNodes.has(currentB)) {
            return currentB; // Found the intersection
        }
        currentB = currentB.next;
    }

    return null; // No intersection
}
function getIntersectionNodeTwoPointers(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    if (!headA || !headB) {
        return null;
    }

    let pA: ListNode | null = headA;
    let pB: ListNode | null = headB;

    // While they are not the same node reference
    while (pA !== pB) {
        // Move pA to next. If it reaches end of List A, redirect to headB.
        pA = pA ? pA.next : headB;

        // Move pB to next. If it reaches end of List B, redirect to headA.
        pB = pB ? pB.next : headA;
    }

    // At this point, pA and pB are either:
    // 1. The intersection node
    // 2. null (if no intersection)
    return pA;
}
// Helper function to create a list from an array
function createList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Function to print a list
function printList(head: ListNode | null): string {
    let result: number[] = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result.join(" -> ");
}

// --- Test Case 1: Intersection exists ---
// List A: 4 -> 1 -> 8 -> 4 -> 5
// List B: 5 -> 6 -> 1 -> 8 -> 4 -> 5 (intersects at node 8)

// Create the common tail
const commonNode8 = new ListNode(8);
const commonNode4 = new ListNode(4);
const commonNode5 = new ListNode(5);
commonNode8.next = commonNode4;
commonNode4.next = commonNode5;

// Create list A
const headA1 = new ListNode(4);
const nodeA1 = new ListNode(1);
headA1.next = nodeA1;
nodeA1.next = commonNode8; // A connects to the common part

// Create list B
const headB1 = new ListNode(5);
const nodeB6 = new ListNode(6);
const nodeB1 = new ListNode(1);
headB1.next = nodeB6;
nodeB6.next = nodeB1;
nodeB1.next = commonNode8; // B connects to the common part

console.log("--- Test Case 1: Intersection exists ---");
console.log("List A:", printList(headA1));
console.log("List B:", printList(headB1));

const intersection1_hash = getIntersectionNodeHashSet(headA1, headB1);
console.log("Intersection (Hash Set):", intersection1_hash ? intersection1_hash.val : "No Intersection"); // Expected: 8

const intersection1_twoPointers = getIntersectionNodeTwoPointers(headA1, headB1);
console.log("Intersection (Two Pointers):", intersection1_twoPointers ? intersection1_twoPointers.val : "No Intersection"); // Expected: 8

console.log("---------------------------------------");

// --- Test Case 2: No Intersection ---
// List A: 1 -> 2 -> 3
// List B: 4 -> 5 -> 6
const headA2 = createList([1, 2, 3]);
const headB2 = createList([4, 5, 6]);

console.log("--- Test Case 2: No Intersection ---");
console.log("List A:", printList(headA2));
console.log("List B:", printList(headB2));

const intersection2_hash = getIntersectionNodeHashSet(headA2, headB2);
console.log("Intersection (Hash Set):", intersection2_hash ? intersection2_hash.val : "No Intersection"); // Expected: No Intersection

const intersection2_twoPointers = getIntersectionNodeTwoPointers(headA2, headB2);
console.log("Intersection (Two Pointers):", intersection2_twoPointers ? intersection2_twoPointers.val : "No Intersection"); // Expected: No Intersection

console.log("---------------------------------------");

// --- Test Case 3: Intersection at head of one list ---
// List A: 1 -> 2 -> 3
// List B: -> 2 -> 3 (B connects to A's second node)
const headA3 = new ListNode(1);
const nodeA3_2 = new ListNode(2);
const nodeA3_3 = new ListNode(3);
headA3.next = nodeA3_2;
nodeA3_2.next = nodeA3_3;

const headB3 = nodeA3_2; // List B starts at nodeA3_2

console.log("--- Test Case 3: Intersection at head ---");
console.log("List A:", printList(headA3));
console.log("List B:", printList(headB3));

const intersection3_hash = getIntersectionNodeHashSet(headA3, headB3);
console.log("Intersection (Hash Set):", intersection3_hash ? intersection3_hash.val : "No Intersection"); // Expected: 2

const intersection3_twoPointers = getIntersectionNodeTwoPointers(headA3, headB3);
console.log("Intersection (Two Pointers):", intersection3_twoPointers ? intersection3_twoPointers.val : "No Intersection"); // Expected: 2

console.log("---------------------------------------");

// --- Test Case 4: One list empty ---
const headA4 = createList([1, 2]);
const headB4 = null;

console.log("--- Test Case 4: One list empty ---");
console.log("List A:", printList(headA4));
console.log("List B:", printList(headB4));

const intersection4_hash = getIntersectionNodeHashSet(headA4, headB4);
console.log("Intersection (Hash Set):", intersection4_hash ? intersection4_hash.val : "No Intersection"); // Expected: No Intersection

const intersection4_twoPointers = getIntersectionNodeTwoPointers(headA4, headB4);
console.log("Intersection (Two Pointers):", intersection4_twoPointers ? intersection4_twoPointers.val : "No Intersection"); // Expected: No Intersection

console.log("---------------------------------------");

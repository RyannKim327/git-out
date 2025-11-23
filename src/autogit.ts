class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}
function getIntersectionNodeSet(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    if (!headA || !headB) {
        return null;
    }

    const visitedNodes = new Set<ListNode>();

    // 1. Add all nodes from list A to the set
    let currentA: ListNode | null = headA;
    while (currentA) {
        visitedNodes.add(currentA);
        currentA = currentA.next;
    }

    // 2. Iterate through list B and check for intersection
    let currentB: ListNode | null = headB;
    while (currentB) {
        if (visitedNodes.has(currentB)) {
            return currentB; // Found the first common node
        }
        currentB = currentB.next;
    }

    // No intersection found
    return null;
}
function getIntersectionNodeTwoPointers(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    if (!headA || !headB) {
        return null;
    }

    let pA: ListNode | null = headA;
    let pB: ListNode | null = headB;

    // Loop until they meet or both become null
    while (pA !== pB) {
        // If pA reaches the end of list A, redirect it to headB
        // Otherwise, move to the next node in list A
        pA = pA ? pA.next : headB;

        // If pB reaches the end of list B, redirect it to headA
        // Otherwise, move to the next node in list B
        pB = pB ? pB.next : headA;
    }

    // pA (or pB) is now either the intersection node or null (if no intersection)
    return pA;
}
// Helper function to create a linked list from an array
function createLinkedList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper function to print a linked list (for debugging)
function printList(head: ListNode | null): string {
    let result = "";
    let current = head;
    while (current) {
        result += current.val + " -> ";
        current = current.next;
    }
    return result + "null";
}


// --- Test Cases ---

// Case 1: Intersection exists
let commonNode = new ListNode(8, new ListNode(4, new ListNode(5)));
let listA_prefix = createLinkedList([4, 1]);
if (listA_prefix) {
    listA_prefix.next!.next = commonNode; // Link 1 -> 8
} else {
    listA_prefix = commonNode; // If listA_prefix was empty, commonNode is the head
}

let listB_prefix = createLinkedList([5, 6, 1]);
if (listB_prefix) {
    listB_prefix.next!.next!.next = commonNode; // Link 1 -> 8
} else {
    listB_prefix = commonNode; // If listB_prefix was empty, commonNode is the head
}


console.log("--- Test Case 1: Intersection Exists ---");
console.log("List A:", printList(listA_prefix)); // 4 -> 1 -> 8 -> 4 -> 5 -> null
console.log("List B:", printList(listB_prefix)); // 5 -> 6 -> 1 -> 8 -> 4 -> 5 -> null

let intersection1_set = getIntersectionNodeSet(listA_prefix, listB_prefix);
console.log("Intersection (Set Method):", intersection1_set ? intersection1_set.val : "null"); // Should be 8

let intersection1_twoPointers = getIntersectionNodeTwoPointers(listA_prefix, listB_prefix);
console.log("Intersection (Two Pointers Method):", intersection1_twoPointers ? intersection1_twoPointers.val : "null"); // Should be 8


// Case 2: No intersection
let listA_no_int = createLinkedList([1, 2, 3]);
let listB_no_int = createLinkedList([4, 5, 6]);

console.log("\n--- Test Case 2: No Intersection ---");
console.log("List A:", printList(listA_no_int));
console.log("List B:", printList(listB_no_int));

let intersection2_set = getIntersectionNodeSet(listA_no_int, listB_no_int);
console.log("Intersection (Set Method):", intersection2_set ? intersection2_set.val : "null"); // Should be null

let intersection2_twoPointers = getIntersectionNodeTwoPointers(listA_no_int, listB_no_int);
console.log("Intersection (Two Pointers Method):", intersection2_twoPointers ? intersection2_twoPointers.val : "null"); // Should be null


// Case 3: One list is null
let listA_one_null = createLinkedList([1, 2]);
let listB_one_null = null;

console.log("\n--- Test Case 3: One List Null ---");
console.log("List A:", printList(listA_one_null));
console.log("List B:", printList(listB_one_null));

let intersection3_set = getIntersectionNodeSet(listA_one_null, listB_one_null);
console.log("Intersection (Set Method):", intersection3_set ? intersection3_set.val : "null"); // Should be null

let intersection3_twoPointers = getIntersectionNodeTwoPointers(listA_one_null, listB_one_null);
console.log("Intersection (Two Pointers Method):", intersection3_twoPointers ? intersection3_twoPointers.val : "null"); // Should be null

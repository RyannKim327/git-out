class ListNode<T> {
    val: T;
    next: ListNode<T> | null;

    constructor(val: T, next: ListNode<T> | null = null) {
        this.val = val;
        this.next = next;
    }
}
function findNthFromEnd<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
    // Edge case 1: Empty list
    if (!head) {
        console.warn("The list is empty.");
        return null;
    }

    // Edge case 2: n must be a positive integer
    if (n <= 0) {
        console.warn("n must be a positive integer.");
        return null;
    }

    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;

    // Step 1: Move fast pointer n steps ahead
    for (let i = 0; i < n; i++) {
        // If fast becomes null here, it means n is greater than the list's length
        if (fast === null) {
            console.warn(`Error: n (${n}) is greater than the length of the list.`);
            return null;
        }
        fast = fast.next;
    }

    // Step 2: Move both pointers until fast reaches the end
    // When fast becomes null, slow will be at the nth node from the end
    while (fast !== null) {
        // We can safely use the non-null assertion operator `!` here for `slow`
        // because if `fast` is not null, `slow` cannot be null (they started together
        // and `slow` never moves beyond `fast`).
        slow = slow!.next;
        fast = fast.next;
    }

    // Step 3: slow is now at the nth node from the end
    return slow;
}
// Helper function to create a linked list from an array
function createLinkedList<T>(arr: T[]): ListNode<T> | null {
    if (arr.length === 0) {
        return null;
    }
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper function to print a linked list (for verification)
function printList<T>(head: ListNode<T> | null): string {
    let result = [];
    let current = head;
    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }
    return result.join(" -> ");
}

// Create a list: 1 -> 2 -> 3 -> 4 -> 5
const head = createLinkedList([1, 2, 3, 4, 5]);
console.log("Original List:", printList(head));

// Test Cases
console.log("\n--- Test Cases ---");

// Case 1: 2nd node from the end (should be 4)
const node2ndFromEnd = findNthFromEnd(head, 2);
console.log("2nd node from end:", node2ndFromEnd ? node2ndFromEnd.val : "Not Found"); // Output: 4

// Case 2: 1st node from the end (should be 5)
const node1stFromEnd = findNthFromEnd(head, 1);
console.log("1st node from end:", node1stFromEnd ? node1stFromEnd.val : "Not Found"); // Output: 5

// Case 3: 5th node from the end (should be 1)
const node5thFromEnd = findNthFromEnd(head, 5);
console.log("5th node from end:", node5thFromEnd ? node5thFromEnd.val : "Not Found"); // Output: 1

// Case 4: n is greater than list length (should return null and warn)
const node6thFromEnd = findNthFromEnd(head, 6);
console.log("6th node from end:", node6thFromEnd ? node6thFromEnd.val : "Not Found"); // Output: Not Found (with warning)

// Case 5: n is 0 or negative (should return null and warn)
const node0thFromEnd = findNthFromEnd(head, 0);
console.log("0th node from end:", node0thFromEnd ? node0thFromEnd.val : "Not Found"); // Output: Not Found (with warning)

// Case 6: Empty list
const emptyList = createLinkedList([]);
const nodeFromEmpty = findNthFromEnd(emptyList, 1);
console.log("Node from empty list:", nodeFromEmpty ? nodeFromEmpty.val : "Not Found"); // Output: Not Found (with warning)

// Case 7: Single node list
const singleNodeList = createLinkedList(['A']);
const node1stFromSingle = findNthFromEnd(singleNodeList, 1);
console.log("1st node from single list:", node1stFromSingle ? node1stFromSingle.val : "Not Found"); // Output: A

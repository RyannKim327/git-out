// Define the ListNode class
class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}
function findNthFromEndTwoPointers(head: ListNode | null, n: number): ListNode | null {
    if (!head || n <= 0) {
        // Handle empty list or invalid n
        return null;
    }

    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    // 1. Move fast pointer n steps ahead
    for (let i = 0; i < n; i++) {
        if (fast === null) {
            // n is greater than the number of nodes in the list
            return null;
        }
        fast = fast.next;
    }

    // 2. Move both pointers until fast reaches the end
    // When fast is null, slow will be at the nth node from the end
    while (fast !== null) {
        slow = slow!.next; // We can assert slow is not null here because fast is ahead or at the same position
        fast = fast.next;
    }

    return slow;
}
function findNthFromEndTwoPasses(head: ListNode | null, n: number): ListNode | null {
    if (!head || n <= 0) {
        // Handle empty list or invalid n
        return null;
    }

    // First pass: Calculate the length of the list
    let length = 0;
    let current: ListNode | null = head;
    while (current !== null) {
        length++;
        current = current.next;
    }

    // Validate n
    if (n > length) {
        return null; // n is greater than the list length
    }

    // Calculate the position from the beginning (0-indexed)
    const targetFromStart = length - n;

    // Second pass: Find the node
    current = head; // Reset current pointer to the head
    for (let i = 0; i < targetFromStart; i++) {
        current = current!.next; // current won't be null due to the length check above
    }

    return current;
}
// Helper function to create a linked list from an array
function createLinkedList(arr: number[]): ListNode | null {
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
function printLinkedList(head: ListNode | null): string {
    let result = [];
    let current = head;
    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }
    return result.join(" -> ");
}

// Create a sample linked list: 1 -> 2 -> 3 -> 4 -> 5
const head = createLinkedList([1, 2, 3, 4, 5]);
console.log("Original List:", printLinkedList(head));

console.log("\n--- Using Two-Pointer Approach ---");

// Test cases
let result = findNthFromEndTwoPointers(head, 1); // 1st from end should be 5
console.log("1st node from end (n=1):", result ? result.val : "Not found"); // Expected: 5

result = findNthFromEndTwoPointers(head, 2); // 2nd from end should be 4
console.log("2nd node from end (n=2):", result ? result.val : "Not found"); // Expected: 4

result = findNthFromEndTwoPointers(head, 5); // 5th from end should be 1 (the head)
console.log("5th node from end (n=5):", result ? result.val : "Not found"); // Expected: 1

result = findNthFromEndTwoPointers(head, 6); // n > length
console.log("6th node from end (n=6):", result ? result.val : "Not found"); // Expected: Not found

result = findNthFromEndTwoPointers(head, 0); // n <= 0
console.log("0th node from end (n=0):", result ? result.val : "Not found"); // Expected: Not found

const emptyList = createLinkedList([]);
result = findNthFromEndTwoPointers(emptyList, 1);
console.log("1st node from end (empty list):", result ? result.val : "Not found"); // Expected: Not found

const singleNodeList = createLinkedList([10]);
result = findNthFromEndTwoPointers(singleNodeList, 1);
console.log("1st node from end (single node list):", result ? result.val : "Not found"); // Expected: 10

console.log("\n--- Using Two-Pass Approach ---");

// Test cases
result = findNthFromEndTwoPasses(head, 1);
console.log("1st node from end (n=1):", result ? result.val : "Not found"); // Expected: 5

result = findNthFromEndTwoPasses(head, 2);
console.log("2nd node from end (n=2):", result ? result.val : "Not found"); // Expected: 4

result = findNthFromEndTwoPasses(head, 5);
console.log("5th node from end (n=5):", result ? result.val : "Not found"); // Expected: 1

result = findNthFromEndTwoPasses(head, 6);
console.log("6th node from end (n=6):", result ? result.val : "Not found"); // Expected: Not found

result = findNthFromEndTwoPasses(head, 0);
console.log("0th node from end (n=0):", result ? result.val : "Not found"); // Expected: Not found

result = findNthFromEndTwoPasses(emptyList, 1);
console.log("1st node from end (empty list):", result ? result.val : "Not found"); // Expected: Not found

result = findNthFromEndTwoPasses(singleNodeList, 1);
console.log("1st node from end (single node list):", result ? result.val : "Not found"); // Expected: 10

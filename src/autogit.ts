class ListNode<T> {
    val: T;
    next: ListNode<T> | null;

    constructor(val: T, next: ListNode<T> | null = null) {
        this.val = val;
        this.next = next;
    }
}
class ListNode<T> {
    val: T;
    next: ListNode<T> | null;

    constructor(val: T, next: ListNode<T> | null = null) {
        this.val = val;
        this.next = next;
    }
}

function findMiddleOfLinkedList<T>(head: ListNode<T> | null): ListNode<T> | null {
    // Edge case: empty list or list with one node
    if (!head) {
        return null;
    }

    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;

    // Move fast pointer two steps and slow pointer one step
    // When fast reaches the end, slow will be at the middle
    while (fast !== null && fast.next !== null) {
        slow = slow!.next; // 'slow!' asserts that slow is not null, which is guaranteed by loop condition and head check
        fast = fast.next.next;
    }

    return slow; // slow is now at the middle
}

// --- Example Usage ---

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

console.log("--- Odd Length List ---");
const oddList = createLinkedList([1, 2, 3, 4, 5]); // 1 -> 2 -> 3 -> 4 -> 5
const middleOdd = findMiddleOfLinkedList(oddList);
console.log("Original list: 1->2->3->4->5");
console.log("Middle element (val):", middleOdd ? middleOdd.val : "null"); // Expected: 3

console.log("\n--- Even Length List ---");
const evenList = createLinkedList([1, 2, 3, 4]); // 1 -> 2 -> 3 -> 4
const middleEven = findMiddleOfLinkedList(evenList);
console.log("Original list: 1->2->3->4");
console.log("Middle element (val):", middleEven ? middleEven.val : "null"); // Expected: 3 (second of two middles)

console.log("\n--- Single Element List ---");
const singleList = createLinkedList([10]); // 10
const middleSingle = findMiddleOfLinkedList(singleList);
console.log("Original list: 10");
console.log("Middle element (val):", middleSingle ? middleSingle.val : "null"); // Expected: 10

console.log("\n--- Empty List ---");
const emptyList = createLinkedList([]); // empty
const middleEmpty = findMiddleOfLinkedList(emptyList);
console.log("Original list: []");
console.log("Middle element (val):", middleEmpty ? middleEmpty.val : "null"); // Expected: null
function findFirstMiddleOfLinkedList<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) {
        return null;
    }

    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head.next; // Initialize fast one step ahead

    while (fast !== null && fast.next !== null) {
        slow = slow!.next;
        fast = fast.next.next;
    }
    return slow;
}

console.log("\n--- Even Length List (First Middle) ---");
const evenListFirst = createLinkedList([1, 2, 3, 4]); // 1 -> 2 -> 3 -> 4
const middleEvenFirst = findFirstMiddleOfLinkedList(evenListFirst);
console.log("Original list: 1->2->3->4");
console.log("First middle element (val):", middleEvenFirst ? middleEvenFirst.val : "null"); // Expected: 2

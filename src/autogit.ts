class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}
function findNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    // 1. Handle edge cases:
    //    - If the list is empty
    //    - If n is zero or negative (invalid input)
    if (head === null || n <= 0) {
        return null;
    }

    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    // 2. Move the 'fast' pointer 'n' steps ahead
    for (let i = 0; i < n; i++) {
        // If 'fast' becomes null during this process, it means 'n' is greater
        // than the total length of the list. In this case, the nth node from
        // the end doesn't exist.
        if (fast === null) {
            return null; // n is out of bounds
        }
        fast = fast.next;
    }

    // 3. Special case: If 'fast' is null after moving 'n' steps,
    //    it means 'n' was exactly the length of the list.
    //    In this scenario, the 'n'th node from the end is the 'head'.
    if (fast === null) {
        return head;
    }

    // 4. Move both 'slow' and 'fast' pointers until 'fast' reaches the end (becomes null).
    //    Since fast started 'n' steps ahead, when fast becomes null,
    //    slow will be at the nth node from the end.
    while (fast !== null) {
        slow = slow!.next; // We know slow won't be null here because fast is ahead of it
        fast = fast.next;
    }

    // 'slow' is now at the nth node from the end
    return slow;
}
// Helper to create a linked list from an array
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

// Test cases
let list1 = createLinkedList([1, 2, 3, 4, 5]);

console.log("List: 1 -> 2 -> 3 -> 4 -> 5");

// Test 1: 2nd node from the end (should be 4)
let result1 = findNthFromEnd(list1, 2);
console.log(`2nd node from end: ${result1 ? result1.val : 'null'}`); // Expected: 4

// Test 2: 1st node from the end (should be 5)
let result2 = findNthFromEnd(list1, 1);
console.log(`1st node from end: ${result2 ? result2.val : 'null'}`); // Expected: 5

// Test 3: 5th node from the end (should be 1)
let result3 = findNthFromEnd(list1, 5);
console.log(`5th node from end: ${result3 ? result3.val : 'null'}`); // Expected: 1

// Test 4: Node beyond list length (should be null)
let result4 = findNthFromEnd(list1, 6);
console.log(`6th node from end: ${result4 ? result4.val : 'null'}`); // Expected: null

// Test 5: Empty list (should be null)
let emptyList = createLinkedList([]);
let result5 = findNthFromEnd(emptyList, 1);
console.log(`Empty list, 1st node from end: ${result5 ? result5.val : 'null'}`); // Expected: null

// Test 6: Single node list (should be 1)
let singleNodeList = createLinkedList([10]);
let result6 = findNthFromEnd(singleNodeList, 1);
console.log(`Single node list, 1st node from end: ${result6 ? result6.val : 'null'}`); // Expected: 1

// Test 7: Invalid n (should be null)
let result7 = findNthFromEnd(list1, 0);
console.log(`Invalid n (0), node from end: ${result7 ? result7.val : 'null'}`); // Expected: null

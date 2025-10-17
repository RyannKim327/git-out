class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}
function isPalindrome(head: ListNode | null): boolean {
    // 1. Handle edge cases: empty list or single node list are palindromes
    if (head === null || head.next === null) {
        return true;
    }

    // 2. Find the middle of the linked list
    // 'slow' will point to the beginning of the second half
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    let firstHalfEnd: ListNode | null = head; // To mark the end of the first half

    while (fast && fast.next) {
        firstHalfEnd = slow; // Keep track of the node *before* slow advances
        slow = slow!.next; // 'slow' moves one step
        fast = fast.next.next; // 'fast' moves two steps
    }

    // 'slow' is now at the start of the second half (or the middle node if odd length)
    // 'firstHalfEnd' is the last node of the first half

    // If 'fast' is not null, it means the list has an odd number of nodes.
    // In this case, 'slow' is the middle node, and we want to start reversing from 'slow.next'.
    let secondHalfStart: ListNode | null;
    if (fast !== null) { // Odd number of nodes, e.g., 1->2->3->2->1, slow is 3, fast is 1(end)
        secondHalfStart = slow!.next; // The second half starts from 2
    } else { // Even number of nodes, e.g., 1->2->2->1, slow is first 2, fast is null
        secondHalfStart = slow; // The second half starts from the first 2
    }

    // Temporarily break the link between the first and second half
    // This makes the first half a standalone list
    if (firstHalfEnd) { // Ensure firstHalfEnd is not null (for list with >= 2 nodes)
        firstHalfEnd.next = null;
    }

    // 3. Reverse the second half of the list
    let reversedSecondHalf = reverseList(secondHalfStart);

    // 4. Compare the first half and the reversed second half
    let p1: ListNode | null = head;
    let p2: ListNode | null = reversedSecondHalf;

    let isPal = true; // Assume it's a palindrome until proven otherwise

    while (p1 !== null && p2 !== null) {
        if (p1.val !== p2.val) {
            isPal = false;
            break; // Mismatch found, not a palindrome
        }
        p1 = p1.next;
        p2 = p2.next;
    }

    // Optional: Restore the list to its original state (good practice if the list
    // needs to be used later in its original form).
    // This involves reversing the second half back and reconnecting it.
    // We won't implement restoration here for brevity, but it would look like:
    // let originalSecondHalf = reverseList(reversedSecondHalf);
    // if (firstHalfEnd) {
    //     firstHalfEnd.next = slow; // 'slow' was the original start of the second half before reversing
    // }
    // if (fast !== null && firstHalfEnd && slow) { // For odd lists, middle node
    //     firstHalfEnd.next = slow;
    //     slow.next = originalSecondHalf;
    // } else if (firstHalfEnd) { // For even lists
    //     firstHalfEnd.next = originalSecondHalf;
    // }


    return isPal;
}

// Helper function to reverse a linked list (iterative approach)
function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let current: ListNode | null = head;
    while (current !== null) {
        let nextTemp: ListNode | null = current.next; // Store next node
        current.next = prev; // Reverse current node's pointer
        prev = current; // Move prev to current node
        current = nextTemp; // Move current to next node
    }
    return prev; // 'prev' is the new head of the reversed list
}

// Helper to create a list from an array
function createLinkedList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Test cases
const list1 = createLinkedList([1, 2, 2, 1]);
console.log(`[1,2,2,1] is palindrome: ${isPalindrome(list1)}`); // Expected: true

const list2 = createLinkedList([1, 2, 3, 2, 1]);
console.log(`[1,2,3,2,1] is palindrome: ${isPalindrome(list2)}`); // Expected: true

const list3 = createLinkedList([1, 2]);
console.log(`[1,2] is palindrome: ${isPalindrome(list3)}`);     // Expected: false

const list4 = createLinkedList([1]);
console.log(`[1] is palindrome: ${isPalindrome(list4)}`);       // Expected: true

const list5 = createLinkedList([]);
console.log(`[] is palindrome: ${isPalindrome(list5)}`);        // Expected: true

const list6 = createLinkedList([1, 0, 0]);
console.log(`[1,0,0] is palindrome: ${isPalindrome(list6)}`);   // Expected: false

const list7 = createLinkedList([1, 0, 1]);
console.log(`[1,0,1] is palindrome: ${isPalindrome(list7)}`);   // Expected: true

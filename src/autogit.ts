class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}
function isPalindromeArrayApproach(head: ListNode | null): boolean {
    if (!head || !head.next) {
        return true; // An empty list or a single-node list is a palindrome
    }

    const values: number[] = [];
    let current: ListNode | null = head;
    while (current !== null) {
        values.push(current.val);
        current = current.next;
    }

    let left = 0;
    let right = values.length - 1;

    while (left < right) {
        if (values[left] !== values[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}
function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let current: ListNode | null = head;
    while (current !== null) {
        let nextTemp: ListNode | null = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }
    return prev;
}

function isPalindromeOptimal(head: ListNode | null): boolean {
    if (!head || !head.next) {
        return true; // An empty list or a single-node list is a palindrome
    }

    // Step 1: Find the middle of the linked list
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    let firstHalfEnd: ListNode | null = null; // To optionally restore the list later

    while (fast !== null && fast.next !== null) {
        firstHalfEnd = slow; // Keep track of the node before the second half
        slow = slow!.next;
        fast = fast.next.next;
    }

    // `slow` is now at the start of the second half
    // or the middle node for odd-length lists.

    let secondHalfStart: ListNode | null;
    if (fast !== null) { // Odd number of nodes, slow is exactly at the middle node
        secondHalfStart = slow!.next;
    } else { // Even number of nodes, slow is at the end of the first half
        secondHalfStart = slow;
    }

    // Step 2: Reverse the second half
    let reversedSecondHalf = reverseList(secondHalfStart);

    // Step 3: Compare the first half with the reversed second half
    let p1: ListNode | null = head;
    let p2: ListNode | null = reversedSecondHalf;
    let isPal = true;

    while (p2 !== null) { // We only need to iterate up to the length of the shorter (reversed) half
        if (p1!.val !== p2.val) {
            isPal = false;
            break;
        }
        p1 = p1!.next;
        p2 = p2.next;
    }

    // Optional Step 4: Restore the list (if needed)
    // if (firstHalfEnd) {
    //     firstHalfEnd.next = reverseList(reversedSecondHalf); // Re-reverse and reconnect
    // }

    return isPal;
}
function isPalindromeRecursive(head: ListNode | null): boolean {
    if (!head) {
        return true;
    }

    let leftPointer: ListNode | null = head; // This pointer will move forward from the head

    function check(currentNode: ListNode | null): boolean {
        // Base case: if we reached the end of the list, it's a palindrome so far
        if (currentNode === null) {
            return true;
        }

        // Recursively check the rest of the list
        let isSubListPalindrome = check(currentNode.next);

        // If the sublist wasn't a palindrome, no need to continue
        if (!isSubListPalindrome) {
            return false;
        }

        // Compare current node's value with the value pointed by leftPointer
        if (currentNode.val !== leftPointer!.val) {
            return false;
        }

        // Move leftPointer forward for the next comparison
        leftPointer = leftPointer!.next;

        return true;
    }

    return check(head);
}
// Helper to create a linked list from an array
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

// Test Cases
const testCases = [
    { arr: [1, 2, 3, 2, 1], expected: true },  // Odd length palindrome
    { arr: [1, 2, 2, 1], expected: true },     // Even length palindrome
    { arr: [1, 2, 3, 4, 5], expected: false }, // Not a palindrome
    { arr: [1, 2], expected: false },         // Short non-palindrome
    { arr: [1, 1], expected: true },          // Short palindrome
    { arr: [1], expected: true },             // Single node
    { arr: [], expected: true },              // Empty list
];

console.log("--- Using Array Approach ---");
testCases.forEach(({ arr, expected }) => {
    const head = createLinkedList(arr);
    const result = isPalindromeArrayApproach(head);
    console.log(`List: [${arr}] | Expected: ${expected} | Result: ${result} | ${result === expected ? 'PASS' : 'FAIL'}`);
});

console.log("\n--- Using Optimal Approach (O(1) Space) ---");
testCases.forEach(({ arr, expected }) => {
    const head = createLinkedList(arr);
    const result = isPalindromeOptimal(head);
    console.log(`List: [${arr}] | Expected: ${expected} | Result: ${result} | ${result === expected ? 'PASS' : 'FAIL'}`);
});

console.log("\n--- Using Recursive Approach ---");
testCases.forEach(({ arr, expected }) => {
    const head = createLinkedList(arr);
    const result = isPalindromeRecursive(head);
    console.log(`List: [${arr}] | Expected: ${expected} | Result: ${result} | ${result === expected ? 'PASS' : 'FAIL'}`);
});

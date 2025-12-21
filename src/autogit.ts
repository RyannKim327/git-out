class ListNode {
    val: number;
    next: ListNode | null;
    
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function isPalindrome(head: ListNode | null): boolean {
    if (!head || !head.next) return true;
    
    const stack: number[] = [];
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    
    // Push first half to stack using slow and fast pointers
    while (fast && fast.next) {
        stack.push(slow!.val);
        slow = slow!.next;
        fast = fast.next.next;
    }
    
    // If odd number of nodes, skip the middle one
    if (fast) {
        slow = slow!.next;
    }
    
    // Compare second half with stack
    while (slow) {
        if (stack.pop() !== slow.val) {
            return false;
        }
        slow = slow.next;
    }
    
    return true;
}
function isPalindromeReverse(head: ListNode | null): boolean {
    if (!head || !head.next) return true;
    
    // Find the middle
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }
    
    // Reverse the second half
    let prev: ListNode | null = null;
    let current: ListNode | null = slow;
    
    while (current) {
        const nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }
    
    // Compare first half and reversed second half
    let firstHalf: ListNode | null = head;
    let secondHalf: ListNode | null = prev;
    
    while (secondHalf) {
        if (firstHalf!.val !== secondHalf.val) {
            return false;
        }
        firstHalf = firstHalf!.next;
        secondHalf = secondHalf.next;
    }
    
    return true;
}
function isPalindromeRecursive(head: ListNode | null): boolean {
    let frontPointer: ListNode | null = head;
    
    function recursivelyCheck(currentNode: ListNode | null): boolean {
        if (currentNode !== null) {
            if (!recursivelyCheck(currentNode.next)) {
                return false;
            }
            if (currentNode.val !== frontPointer!.val) {
                return false;
            }
            frontPointer = frontPointer!.next;
        }
        return true;
    }
    
    return recursivelyCheck(head);
}
function isPalindromeArray(head: ListNode | null): boolean {
    const values: number[] = [];
    let current: ListNode | null = head;
    
    // Convert linked list to array
    while (current) {
        values.push(current.val);
        current = current.next;
    }
    
    // Check if array is palindrome
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
// Helper function to create linked list from array
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

// Test the functions
const testCases = [
    [1, 2, 3, 2, 1],    // Palindrome
    [1, 2, 2, 1],       // Palindrome
    [1, 2, 3],          // Not palindrome
    [1],                 // Single element (palindrome)
    []                   // Empty list (palindrome)
];

testCases.forEach((testCase, index) => {
    const list = createLinkedList(testCase);
    console.log(`Test ${index + 1}: [${testCase}]`);
    console.log(`Stack method: ${isPalindrome(list)}`);
    console.log(`Reverse method: ${isPalindromeReverse(createLinkedList(testCase))}`);
    console.log(`Array method: ${isPalindromeArray(createLinkedList(testCase))}`);
    console.log('---');
});

interface ListNode {
    val: number;
    next: ListNode | null;
}

function isPalindrome(head: ListNode | null): boolean {
    if (!head || !head.next) return true;
    
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    const stack: number[] = [];
    
    // Find middle using slow/fast pointers
    while (fast && fast.next) {
        stack.push(slow!.val);
        slow = slow!.next;
        fast = fast.next.next;
    }
    
    // Handle odd length case
    if (fast !== null) {
        slow = slow!.next;
    }
    
    // Compare remaining half with stack
    while (slow !== null) {
        if (stack.pop() !== slow.val) {
            return false;
        }
        slow = slow.next;
    }
    
    return true;
}
function isPalindromeReverse(head: ListNode | null): boolean {
    if (!head || !head.next) return true;
    
    // Find middle
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next!;
        fast = fast.next.next!;
    }
    
    // Reverse second half
    let prev: ListNode | null = null;
    let current: ListNode | null = slow;
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    // Compare first half with reversed second half
    let left = head;
    let right = prev;
    while (right !== null) {
        if (left.val !== right.val) {
            return false;
        }
        left = left.next!;
        right = right.next;
    }
    
    return true;
}
function isPalindromeRecursive(head: ListNode | null): boolean {
    let frontPointer = head;
    
    function recursivelyCheck(current: ListNode | null): boolean {
        if (current !== null) {
            if (!recursivelyCheck(current.next)) return false;
            if (current.val !== frontPointer!.val) return false;
            frontPointer = frontPointer!.next;
        }
        return true;
    }
    
    return recursivelyCheck(head);
}
class ListNode {
    val: number;
    next: ListNode | null;
    
    constructor(val: number, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }
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

// Test the function
const list1 = createLinkedList([1, 2, 3, 2, 1]);
const list2 = createLinkedList([1, 2, 3, 4, 5]);

console.log(isPalindrome(list1)); // true
console.log(isPalindrome(list2)); // false

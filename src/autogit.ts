class ListNode<T> {
    val: T;
    next: ListNode<T> | null;
    
    constructor(val: T, next: ListNode<T> | null = null) {
        this.val = val;
        this.next = next;
    }
}

function isPalindromeStack<T>(head: ListNode<T> | null): boolean {
    if (!head || !head.next) return true;
    
    const stack: T[] = [];
    let current: ListNode<T> | null = head;
    
    // Push all elements to stack
    while (current) {
        stack.push(current.val);
        current = current.next;
    }
    
    // Compare with stack pop
    current = head;
    while (current) {
        if (current.val !== stack.pop()) {
            return false;
        }
        current = current.next;
    }
    
    return true;
}
function isPalindromeReverse<T>(head: ListNode<T> | null): boolean {
    if (!head || !head.next) return true;
    
    // Find middle using slow-fast pointer
    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;
    
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }
    
    // Reverse second half
    let secondHalf: ListNode<T> | null = reverseList(slow);
    let firstHalf: ListNode<T> | null = head;
    
    // Compare both halves
    while (secondHalf) {
        if (firstHalf!.val !== secondHalf.val) {
            return false;
        }
        firstHalf = firstHalf!.next;
        secondHalf = secondHalf.next;
    }
    
    return true;
}

function reverseList<T>(head: ListNode<T> | null): ListNode<T> | null {
    let prev: ListNode<T> | null = null;
    let current: ListNode<T> | null = head;
    
    while (current) {
        const next: ListNode<T> | null = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}
function isPalindromeRecursive<T>(head: ListNode<T> | null): boolean {
    let frontPointer: ListNode<T> | null = head;
    
    function recursivelyCheck(current: ListNode<T> | null): boolean {
        if (current !== null) {
            if (!recursivelyCheck(current.next)) return false;
            if (current.val !== frontPointer!.val) return false;
            frontPointer = frontPointer!.next;
        }
        return true;
    }
    
    return recursivelyCheck(head);
}
// ListNode class
class ListNode<T> {
    val: T;
    next: ListNode<T> | null;
    
    constructor(val: T, next: ListNode<T> | null = null) {
        this.val = val;
        this.next = next;
    }
}

// Create linked list from array
function createLinkedList<T>(arr: T[]): ListNode<T> | null {
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
const palindromeList = createLinkedList([1, 2, 3, 2, 1]);
const nonPalindromeList = createLinkedList([1, 2, 3, 4, 5]);

console.log('Stack approach:');
console.log('Palindrome:', isPalindromeStack(palindromeList)); // true
console.log('Non-palindrome:', isPalindromeStack(nonPalindromeList)); // false

console.log('\nReverse approach:');
console.log('Palindrome:', isPalindromeReverse(palindromeList)); // true
console.log('Non-palindrome:', isPalindromeReverse(nonPalindromeList)); // false

console.log('\nRecursive approach:');
console.log('Palindrome:', isPalindromeRecursive(palindromeList)); // true
console.log('Non-palindrome:', isPalindromeRecursive(nonPalindromeList)); // false

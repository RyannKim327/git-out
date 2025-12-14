class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T, next: ListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}
function isPalindromeStack<T>(head: ListNode<T> | null): boolean {
    if (!head || !head.next) return true;
    
    const stack: T[] = [];
    let current: ListNode<T> | null = head;
    
    // Push all elements to stack
    while (current) {
        stack.push(current.value);
        current = current.next;
    }
    
    // Compare elements from start and end
    current = head;
    while (stack.length > 0) {
        if (current!.value !== stack.pop()) {
            return false;
        }
        current = current!.next;
    }
    
    return true;
}
function isPalindromeOptimized<T>(head: ListNode<T> | null): boolean {
    if (!head || !head.next) return true;
    
    // Find middle using slow and fast pointers
    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;
    
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }
    
    // Reverse second half
    let secondHalf = reverseLinkedList(slow);
    let firstHalf: ListNode<T> | null = head;
    
    // Compare both halves
    while (secondHalf) {
        if (firstHalf!.value !== secondHalf.value) {
            return false;
        }
        firstHalf = firstHalf!.next;
        secondHalf = secondHalf.next;
    }
    
    return true;
}

function reverseLinkedList<T>(head: ListNode<T> | null): ListNode<T> | null {
    let prev: ListNode<T> | null = null;
    let current: ListNode<T> | null = head;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}
function isPalindromeRecursive<T>(head: ListNode<T> | null): boolean {
    let frontPointer: ListNode<T> | null = head;
    
    function recursivelyCheck(currentNode: ListNode<T> | null): boolean {
        if (currentNode !== null) {
            if (!recursivelyCheck(currentNode.next)) {
                return false;
            }
            if (currentNode.value !== frontPointer!.value) {
                return false;
            }
            frontPointer = frontPointer!.next;
        }
        return true;
    }
    
    return recursivelyCheck(head);
}
// Helper function to create linked list from array
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
const testCases = [
    [1, 2, 3, 2, 1],      // Palindrome
    [1, 2, 3, 4, 5],      // Not palindrome
    [1, 2, 2, 1],         // Palindrome
    [1],                  // Single element
    []                    // Empty list
];

testCases.forEach((arr, index) => {
    const list = createLinkedList(arr);
    console.log(`Test ${index + 1}: [${arr}]`);
    console.log(`Stack method: ${isPalindromeStack(list)}`);
    console.log(`Optimized method: ${isPalindromeOptimized(list)}`);
    console.log(`Recursive method: ${isPalindromeRecursive(list)}`);
    console.log('---');
});
interface LinkedList<T> {
    head: ListNode<T> | null;
}

class LinkedList<T> implements LinkedList<T> {
    head: ListNode<T> | null;

    constructor(values: T[] = []) {
        this.head = createLinkedList(values);
    }

    isPalindrome(): boolean {
        return isPalindromeOptimized(this.head);
    }
}

// Usage
const list1 = new LinkedList([1, 2, 3, 2, 1]);
console.log(list1.isPalindrome()); // true

const list2 = new LinkedList([1, 2, 3, 4, 5]);
console.log(list2.isPalindrome()); // false

class ListNode {
    value: number;
    next: ListNode | null;

    constructor(value: number) {
        this.value = value;
        this.next = null;
    }
}
function isPalindrome(head: ListNode | null): boolean {
    if (!head) return true; // An empty list is a palindrome

    const stack: number[] = [];
    let current: ListNode | null = head;

    // Push all values onto the stack
    while (current) {
        stack.push(current.value);
        current = current.next;
    }

    current = head;

    // Compare the linked list values with those in the stack
    while (current) {
        if (current.value !== stack.pop()) {
            return false; // Not a palindrome
        }
        current = current.next;
    }

    return true; // Is a palindrome
}
function isPalindrome(head: ListNode | null): boolean {
    if (!head || !head.next) return true; // An empty or single-node list is a palindrome

    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    
    // Find the middle of the linked list
    while (fast && fast.next) {
        slow = slow!.next; // Move slow by one
        fast = fast.next.next; // Move fast by two
    }

    // Reverse the second half of the list
    let prev: ListNode | null = null;
    while (slow) {
        const nextNode = slow.next;
        slow.next = prev;
        prev = slow;
        slow = nextNode;
    }

    // Compare the first half and the reversed second half
    let left: ListNode | null = head;
    let right: ListNode | null = prev; // The head of the reversed second half

    while (right) {
        if (left!.value !== right.value) {
            return false; // Not a palindrome
        }
        left = left!.next;
        right = right.next;
    }

    return true; // Is a palindrome
}
// Helper function to create a linked list from an array
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
const list1 = createLinkedList([1, 2, 3, 2, 1]);
console.log(isPalindrome(list1)); // true

const list2 = createLinkedList([1, 2, 3, 4, 5]);
console.log(isPalindrome(list2)); // false

const list3 = createLinkedList([1, 2, 2, 1]);
console.log(isPalindrome(list3)); // true

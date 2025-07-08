class ListNode {
    value: number;
    next: ListNode | null;

    constructor(value: number) {
        this.value = value;
        this.next = null;
    }
}

function isPalindrome(head: ListNode | null): boolean {
    if (!head || !head.next) {
        return true; // An empty list or a single node is a palindrome
    }

    // Step 1: Find the middle of the linked list
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    
    while (fast && fast.next) {
        slow = slow!.next; // Move slow by 1
        fast = fast.next.next; // Move fast by 2
    }

    // Step 2: Reverse the second half of the linked list
    let prev: ListNode | null = null;
    let current: ListNode | null = slow;

    while (current) {
        const nextTemp = current.next; // Store next node
        current.next = prev; // Reverse the link
        prev = current; // Move prev to current
        current = nextTemp; // Move to next node
    }

    // Step 3: Compare the first half and the reversed second half
    let left: ListNode | null = head;
    let right: ListNode | null = prev; // This is the head of the reversed second half

    while (right) {
        if (left!.value !== right.value) {
            return false; // Not a palindrome
        }
        left = left!.next;
        right = right.next;
    }

    return true; // It is a palindrome
}

// Example usage:
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(2);
head.next.next.next = new ListNode(1);

console.log(isPalindrome(head)); // Output: true

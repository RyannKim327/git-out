// Definition for a singly-linked list node
class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T, next: ListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

// Function to reverse a linked list iteratively
function reverseLinkedList<T>(head: ListNode<T> | null): ListNode<T> | null {
    let prev: ListNode<T> | null = null;
    let current: ListNode<T> | null = head;
    
    while (current !== null) {
        // Save next node before overwriting current.next
        const nextTemp: ListNode<T> | null = current.next;
        
        // Reverse the pointer
        current.next = prev;
        
        // Move pointers forward
        prev = current;
        current = nextTemp;
    }
    
    // Prev is now pointing to the new head
    return prev;
}
// Create linked list: 1 -> 2 -> 3
const node3 = new ListNode(3);
const node2 = new ListNode(2, node3);
const node1 = new ListNode(1, node2);

// Reverse the list
const reversedHead = reverseLinkedList(node1);

// The list is now 3 -> 2 -> 1
function reverseLinkedListRecursive<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (head === null || head.next === null) {
        return head;
    }
    
    const reversed = reverseLinkedListRecursive(head.next);
    head.next.next = head;
    head.next = null;
    
    return reversed;
}

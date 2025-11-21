class ListNode<T> {
    constructor(
        public value: T, 
        public next: ListNode<T> | null = null
    ) {}
}
function reverseLinkedList<T>(head: ListNode<T> | null): ListNode<T> | null {
    let prev: ListNode<T> | null = null;
    let current = head;
    
    while (current !== null) {
        const next: ListNode<T> | null = current.next; // Store next node
        current.next = prev; // Reverse current node's pointer
        prev = current; // Move prev forward
        current = next; // Move current forward
    }
    
    return prev; // New head of reversed list
}
// Create a linked list: 1 → 2 → 3
const node3 = new ListNode(3);
const node2 = new ListNode(2, node3);
const node1 = new ListNode(1, node2);

// Reverse the list
const reversedHead = reverseLinkedList(node1);

// Verify reversed list: 3 → 2 → 1
console.log(reversedHead?.value); // 3
console.log(reversedHead?.next?.value); // 2
console.log(reversedHead?.next?.next?.value); // 1
function reverseLinkedListRecursive<T>(
    head: ListNode<T> | null
): ListNode<T> | null {
    if (!head || !head.next) return head;
    
    const rest = reverseLinkedListRecursive(head.next);
    head.next.next = head; // Reconnect next node back to current
    head.next = null; // Break original forward link
    return rest;
}

class ListNode {
    value: number;
    next: ListNode | null;

    constructor(value: number) {
        this.value = value;
        this.next = null;
    }
}
function reverseLinkedList(head: ListNode | null): ListNode | null {
    let previous: ListNode | null = null;
    let current: ListNode | null = head;

    while (current !== null) {
        const next: ListNode | null = current.next; // Store the next node
        current.next = previous; // Reverse the current node's pointer
        previous = current; // Move the previous pointer to the current node
        current = next; // Move to the next node
    }

    return previous; // New head of the reversed linked list
}
function reverseLinkedListRecursive(head: ListNode | null): ListNode | null {
    // Base case: if head is null or there is only one node
    if (head === null || head.next === null) {
        return head;
    }

    const newHead: ListNode | null = reverseLinkedListRecursive(head.next); // Recursively reverse the rest of the list
    head.next.next = head; // Reverse the link
    head.next = null; // Set the current node's next to null

    return newHead; // Return the new head of the reversed linked list
}
function printLinkedList(head: ListNode | null): void {
    let current: ListNode | null = head;
    while (current !== null) {
        process.stdout.write(current.value + " -> ");
        current = current.next;
    }
    console.log("null");
}

// Create a linked list: 1 -> 2 -> 3 -> 4 -> null
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);

console.log("Original List:");
printLinkedList(head);

// Reverse the linked list using iterative approach
const reversedHeadIterative = reverseLinkedList(head);
console.log("Reversed List (Iterative):");
printLinkedList(reversedHeadIterative);

// Reverse the linked list again using recursive approach
const reversedHeadRecursive = reverseLinkedListRecursive(reversedHeadIterative);
console.log("Reversed List (Recursive):");
printLinkedList(reversedHeadRecursive);

interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}
/**
 * Calculates the length of a singly linked list.
 *
 * @param head The head node of the linked list. Can be null for an empty list.
 * @returns The number of nodes in the linked list.
 */
function getLength<T>(head: ListNode<T> | null): number {
    let count = 0;
    let current = head; // Start from the head of the list

    // Traverse the list until we reach the end (current becomes null)
    while (current !== null) {
        count++;             // Increment the counter for each node
        current = current.next; // Move to the next node
    }

    return count;
}
// --- Example 1: A list with 3 nodes ---
const node3: ListNode<number> = { value: 30, next: null };
const node2: ListNode<number> = { value: 20, next: node3 };
const node1: ListNode<number> = { value: 10, next: node2 }; // This is our head

console.log("Length of list 10->20->30:", getLength(node1)); // Expected: 3

// --- Example 2: An empty list ---
const emptyListHead: ListNode<string> | null = null;
console.log("Length of empty list:", getLength(emptyListHead)); // Expected: 0

// --- Example 3: A list with a single node ---
const singleNodeHead: ListNode<boolean> = { value: true, next: null };
console.log("Length of single node list:", getLength(singleNodeHead)); // Expected: 1

// --- Example 4: A more complex list (e.g., strings) ---
const lastNode: ListNode<string> = { value: "Cherry", next: null };
const middleNode: ListNode<string> = { value: "Banana", next: lastNode };
const firstNode: ListNode<string> = { value: "Apple", next: middleNode };

console.log("Length of list Apple->Banana->Cherry:", getLength(firstNode)); // Expected: 3
/**
 * Recursively calculates the length of a singly linked list.
 *
 * @param node The current node being processed. Starts from the head.
 * @returns The number of nodes from the current node to the end of the list.
 */
function getLengthRecursive<T>(node: ListNode<T> | null): number {
    // Base case: If the node is null, we've reached the end of the list
    if (node === null) {
        return 0;
    }
    // Recursive step: Add 1 (for the current node) to the length of the rest of the list
    return 1 + getLengthRecursive(node.next);
}

// Example Usage:
const recursiveNode3: ListNode<number> = { value: 3, next: null };
const recursiveNode2: ListNode<number> = { value: 2, next: recursiveNode3 };
const recursiveNode1: ListNode<number> = { value: 1, next: recursiveNode2 };

console.log("\n--- Recursive Length Calculation ---");
console.log("Length of recursive list 1->2->3:", getLengthRecursive(recursiveNode1)); // Expected: 3
console.log("Length of empty list (recursive):", getLengthRecursive(null)); // Expected: 0

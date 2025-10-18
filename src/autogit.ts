// Define the Node structure for our Linked List
class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T, next: ListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}
function findMiddleTwoPass<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) {
        return null; // Empty list has no middle
    }

    let count = 0;
    let current: ListNode<T> | null = head;

    // First pass: Count the number of nodes
    while (current !== null) {
        count++;
        current = current.next;
    }

    // Calculate the index of the middle element
    // For even-length lists (e.g., 4 nodes), Math.floor(4/2) = 2, so it's the 3rd node (0-indexed).
    // This returns the second of the two middle elements for even-length lists.
    const middleIndex = Math.floor(count / 2);

    // Second pass: Traverse to the middle node
    current = head; // Reset current to the head
    for (let i = 0; i < middleIndex; i++) {
        current = current!.next; // current won't be null here due to previous count
    }

    return current;
}
function findMiddleTwoPointers<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) {
        return null; // Empty list has no middle
    }

    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;

    // Move fast by 2 steps and slow by 1 step.
    // When fast reaches the end, slow will be at the middle.
    // The condition `fast !== null && fast.next !== null` ensures
    // fast doesn't go null before checking fast.next.
    // This loop setup returns the second of the two middle elements for even-length lists.
    // E.g., 1 -> 2 -> 3 -> 4, returns 3.
    while (fast !== null && fast.next !== null) {
        slow = slow!.next; // slow moves one step
        fast = fast.next.next; // fast moves two steps
    }

    return slow; // slow is now at the middle element
}
// Helper function to convert an array to a linked list
function createLinkedList<T>(arr: T[]): ListNode<T> | null {
    if (arr.length === 0) {
        return null;
    }
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper function to print a linked list for verification
function printLinkedList<T>(head: ListNode<T> | null): string {
    let result: T[] = [];
    let current = head;
    while (current !== null) {
        result.push(current.value);
        current = current.next;
    }
    return result.join(" -> ");
}

console.log("--- Testing Two-Pass Approach ---");

// Test Cases
let list1 = createLinkedList([]); // Empty list
console.log(`List: ${printLinkedList(list1)}`);
console.log(`Middle: ${findMiddleTwoPass(list1)?.value}\n`); // Expected: undefined

let list2 = createLinkedList([1]); // Single node
console.log(`List: ${printLinkedList(list2)}`);
console.log(`Middle: ${findMiddleTwoPass(list2)?.value}\n`); // Expected: 1

let list3 = createLinkedList([1, 2, 3]); // Odd length
console.log(`List: ${printLinkedList(list3)}`);
console.log(`Middle: ${findMiddleTwoPass(list3)?.value}\n`); // Expected: 2

let list4 = createLinkedList([1, 2, 3, 4]); // Even length (returns second middle)
console.log(`List: ${printLinkedList(list4)}`);
console.log(`Middle: ${findMiddleTwoPass(list4)?.value}\n`); // Expected: 3

let list5 = createLinkedList([1, 2, 3, 4, 5]); // Odd length
console.log(`List: ${printLinkedList(list5)}`);
console.log(`Middle: ${findMiddleTwoPass(list5)?.value}\n`); // Expected: 3

console.log("--- Testing Two-Pointers Approach ---");

// Test Cases
let list6 = createLinkedList([]); // Empty list
console.log(`List: ${printLinkedList(list6)}`);
console.log(`Middle: ${findMiddleTwoPointers(list6)?.value}\n`); // Expected: undefined

let list7 = createLinkedList([1]); // Single node
console.log(`List: ${printLinkedList(list7)}`);
console.log(`Middle: ${findMiddleTwoPointers(list7)?.value}\n`); // Expected: 1

let list8 = createLinkedList([1, 2, 3]); // Odd length
console.log(`List: ${printLinkedList(list8)}`);
console.log(`Middle: ${findMiddleTwoPointers(list8)?.value}\n`); // Expected: 2

let list9 = createLinkedList([1, 2, 3, 4]); // Even length (returns second middle)
console.log(`List: ${printLinkedList(list9)}`);
console.log(`Middle: ${findMiddleTwoPointers(list9)?.value}\n`); // Expected: 3

let list10 = createLinkedList([1, 2, 3, 4, 5]); // Odd length
console.log(`List: ${printLinkedList(list10)}`);
console.log(`Middle: ${findMiddleTwoPointers(list10)?.value}\n`); // Expected: 3

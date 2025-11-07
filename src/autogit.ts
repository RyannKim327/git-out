// Define a generic ListNode class
class ListNode<T> {
    val: T;
    next: ListNode<T> | null;

    constructor(val: T, next: ListNode<T> | null = null) {
        this.val = val;
        this.next = next;
    }
}
function findMiddleTwoPointers<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) {
        return null; // Empty list
    }

    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;

    // While fast and fast.next are not null, continue moving pointers
    // This condition ensures fast.next.next is safe to access
    while (fast && fast.next) {
        slow = slow!.next; // slow moves one step
        fast = fast.next.next; // fast moves two steps
    }

    return slow; // slow is now at the middle node
}
function findMiddleCountAndRetraverse<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) {
        return null; // Empty list
    }

    let count = 0;
    let current: ListNode<T> | null = head;

    // First pass: count the number of nodes
    while (current) {
        count++;
        current = current.next;
    }

    // Calculate the middle index (0-indexed)
    // Math.floor ensures we get the correct index for both odd and even counts
    // For even counts, it gives the second of the two middle elements.
    const middleIndex = Math.floor(count / 2);

    // Second pass: traverse to the middle node
    current = head;
    for (let i = 0; i < middleIndex; i++) {
        current = current!.next; // current won't be null here because middleIndex is valid
    }

    return current;
}
function findMiddleWithArray<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) {
        return null; // Empty list
    }

    const nodes: ListNode<T>[] = [];
    let current: ListNode<T> | null = head;

    // Traverse the list and store all nodes in an array
    while (current) {
        nodes.push(current);
        current = current.next;
    }

    // Calculate the middle index
    const middleIndex = Math.floor(nodes.length / 2);

    return nodes[middleIndex];
}
// Helper function to create a linked list from an array
function createLinkedList<T>(values: T[]): ListNode<T> | null {
    if (values.length === 0) {
        return null;
    }
    let head = new ListNode(values[0]);
    let current = head;
    for (let i = 1; i < values.length; i++) {
        current.next = new ListNode(values[i]);
        current = current.next;
    }
    return head;
}

// Helper function to print a linked list (for verification)
function printLinkedList<T>(head: ListNode<T> | null): string {
    let result = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result.join(" -> ");
}

console.log("--- Test Cases ---");

// Test case 1: Empty list
let list1 = createLinkedList<number>([]);
console.log(`List: ${printLinkedList(list1)}`);
console.log(`Middle (Two Pointers): ${findMiddleTwoPointers(list1)?.val}`);
console.log(`Middle (Count & Retraverse): ${findMiddleCountAndRetraverse(list1)?.val}`);
console.log(`Middle (Array): ${findMiddleWithArray(list1)?.val}\n`);

// Test case 2: Single element
let list2 = createLinkedList<number>([1]);
console.log(`List: ${printLinkedList(list2)}`);
console.log(`Middle (Two Pointers): ${findMiddleTwoPointers(list2)?.val}`); // Expected: 1
console.log(`Middle (Count & Retraverse): ${findMiddleCountAndRetraverse(list2)?.val}`); // Expected: 1
console.log(`Middle (Array): ${findMiddleWithArray(list2)?.val}\n`);

// Test case 3: Odd number of elements
let list3 = createLinkedList<number>([1, 2, 3, 4, 5]);
console.log(`List: ${printLinkedList(list3)}`);
console.log(`Middle (Two Pointers): ${findMiddleTwoPointers(list3)?.val}`); // Expected: 3
console.log(`Middle (Count & Retraverse): ${findMiddleCountAndRetraverse(list3)?.val}`); // Expected: 3
console.log(`Middle (Array): ${findMiddleWithArray(list3)?.val}\n`);

// Test case 4: Even number of elements (standard behavior: second middle)
let list4 = createLinkedList<number>([1, 2, 3, 4]);
console.log(`List: ${printLinkedList(list4)}`);
console.log(`Middle (Two Pointers): ${findMiddleTwoPointers(list4)?.val}`); // Expected: 3
console.log(`Middle (Count & Retraverse): ${findMiddleCountAndRetraverse(list4)?.val}`); // Expected: 3
console.log(`Middle (Array): ${findMiddleWithArray(list4)?.val}\n`);

// Test case 5: Two elements
let list5 = createLinkedList<number>([10, 20]);
console.log(`List: ${printLinkedList(list5)}`);
console.log(`Middle (Two Pointers): ${findMiddleTwoPointers(list5)?.val}`); // Expected: 20
console.log(`Middle (Count & Retraverse): ${findMiddleCountAndRetraverse(list5)?.val}`); // Expected: 20
console.log(`Middle (Array): ${findMiddleWithArray(list5)?.val}\n`);

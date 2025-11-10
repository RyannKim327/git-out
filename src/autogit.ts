class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T, next: ListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}
function findMiddleElement<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) {
        return null; // Empty list
    }

    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;

    // The loop continues as long as fast and fast.next are valid
    // This ensures fast.next.next won't throw an error.
    while (fast !== null && fast.next !== null) {
        slow = slow!.next; // slow moves one step
        fast = fast.next.next; // fast moves two steps
    }

    return slow; // slow is now at the middle element
}

// --- Example Usage ---

// Helper to create a list from an array
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

// Test cases
let list1 = createLinkedList([1, 2, 3, 4, 5]); // Odd length
console.log("List: 1 -> 2 -> 3 -> 4 -> 5");
console.log("Middle element:", findMiddleElement(list1)?.value); // Expected: 3

let list2 = createLinkedList([1, 2, 3, 4]); // Even length
console.log("List: 1 -> 2 -> 3 -> 4");
console.log("Middle element:", findMiddleElement(list2)?.value); // Expected: 3 (second middle)

let list3 = createLinkedList([1]); // Single element
console.log("List: 1");
console.log("Middle element:", findMiddleElement(list3)?.value); // Expected: 1

let list4 = createLinkedList([]); // Empty list
console.log("List: (empty)");
console.log("Middle element:", findMiddleElement(list4)?.value); // Expected: undefined (null)

let list5 = createLinkedList([1, 2]); // Two elements
console.log("List: 1 -> 2");
console.log("Middle element:", findMiddleElement(list5)?.value); // Expected: 2
function findMiddleElementTwoPass<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) {
        return null; // Empty list
    }

    // Pass 1: Count the number of nodes
    let count = 0;
    let current: ListNode<T> | null = head;
    while (current !== null) {
        count++;
        current = current.next;
    }

    // Pass 2: Traverse to the middle
    let middleIndex = Math.floor(count / 2); // For 1,2,3,4,5 -> index 2 (value 3)
                                          // For 1,2,3,4   -> index 2 (value 3 - second middle)

    current = head;
    for (let i = 0; i < middleIndex; i++) {
        current = current!.next;
    }

    return current;
}

// Example usage (same as above, just swap function call)
console.log("\n--- Two-Pass Approach ---");
let list6 = createLinkedList([1, 2, 3, 4, 5]);
console.log("List: 1 -> 2 -> 3 -> 4 -> 5");
console.log("Middle element:", findMiddleElementTwoPass(list6)?.value); // Expected: 3

let list7 = createLinkedList([1, 2, 3, 4]);
console.log("List: 1 -> 2 -> 3 -> 4");
console.log("Middle element:", findMiddleElementTwoPass(list7)?.value); // Expected: 3
function findFirstMiddleElementEven<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) {
        return null;
    }

    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head.next; // Start fast one step ahead!

    while (fast !== null && fast.next !== null) {
        slow = slow!.next;
        fast = fast.next.next;
    }

    return slow; // Now for 1->2->3->4, slow stops at 2
}

// Test cases
console.log("\n--- First Middle Element for Even Lists ---");
let list8 = createLinkedList([1, 2, 3, 4, 5]); // Odd length (no change)
console.log("List: 1 -> 2 -> 3 -> 4 -> 5");
console.log("Middle element:", findFirstMiddleElementEven(list8)?.value); // Expected: 3

let list9 = createLinkedList([1, 2, 3, 4]); // Even length (now gets first middle)
console.log("List: 1 -> 2 -> 3 -> 4");
console.log("Middle element:", findFirstMiddleElementEven(list9)?.value); // Expected: 2

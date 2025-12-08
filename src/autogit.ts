class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}
function hasCycleSet<T>(head: ListNode<T> | null): boolean {
    if (!head) {
        return false;
    }

    const visitedNodes = new Set<ListNode<T>>();
    let current: ListNode<T> | null = head;

    while (current !== null) {
        if (visitedNodes.has(current)) {
            // We've seen this node before, so there's a cycle.
            return true;
        }
        visitedNodes.add(current);
        current = current.next;
    }

    // Reached the end of the list without encountering a cycle.
    return false;
}
function hasCycleFloyd<T>(head: ListNode<T> | null): boolean {
    // An empty list or a list with only one node cannot have a cycle.
    if (!head || !head.next) {
        return false;
    }

    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head; // Start both at head

    // Loop until fast pointer reaches the end of the list or slow catches fast
    while (fast !== null && fast.next !== null) {
        slow = slow!.next; // Move slow pointer by 1 step
        fast = fast.next.next; // Move fast pointer by 2 steps

        // If slow and fast pointers meet, there is a cycle
        if (slow === fast) {
            return true;
        }
    }

    // If fast pointer reached null, it means there's no cycle
    return false;
}
// Helper LinkedList class for easy testing
class LinkedList<T> {
    head: ListNode<T> | null;
    tail: ListNode<T> | null; // Keep track of the tail for easy cycle creation

    constructor() {
        this.head = null;
        this.tail = null;
    }

    add(value: T): ListNode<T> {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }
        return newNode; // Return the new node in case we want to create a cycle later
    }

    // Utility to create a cycle for testing
    createCycle(fromNode: ListNode<T>, toNode: ListNode<T>) {
        let current = fromNode;
        while (current.next !== null) {
            current = current.next;
        }
        current.next = toNode;
    }
}

// --- Test Cases ---

console.log("--- Testing hasCycleSet ---");

// Test 1: No cycle
const list1 = new LinkedList<number>();
list1.add(1);
list1.add(2);
list1.add(3);
list1.add(4);
console.log("List 1 (no cycle):", hasCycleSet(list1.head)); // Expected: false

// Test 2: Cycle
const list2 = new LinkedList<number>();
const node1 = list2.add(1);
const node2 = list2.add(2);
const node3 = list2.add(3);
const node4 = list2.add(4);
node4.next = node2; // Create a cycle: 4 -> 2
console.log("List 2 (cycle 4->2):", hasCycleSet(list2.head)); // Expected: true

// Test 3: Single node, no cycle
const list3 = new LinkedList<number>();
list3.add(100);
console.log("List 3 (single node, no cycle):", hasCycleSet(list3.head)); // Expected: false

// Test 4: Single node, with cycle (points to itself)
const list4 = new LinkedList<number>();
const node5 = list4.add(200);
node5.next = node5; // Cycle: 200 -> 200
console.log("List 4 (single node, self cycle):", hasCycleSet(list4.head)); // Expected: true

// Test 5: Empty list
const list5 = new LinkedList<number>();
console.log("List 5 (empty):", hasCycleSet(list5.head)); // Expected: false

// Test 6: Cycle at head
const list6 = new LinkedList<number>();
const nodeA = list6.add(1);
const nodeB = list6.add(2);
nodeB.next = nodeA; // Cycle: 2 -> 1
console.log("List 6 (cycle 2->1):", hasCycleSet(list6.head)); // Expected: true

console.log("\n--- Testing hasCycleFloyd ---");

// Test 1: No cycle
console.log("List 1 (no cycle):", hasCycleFloyd(list1.head)); // Expected: false

// Test 2: Cycle
console.log("List 2 (cycle 4->2):", hasCycleFloyd(list2.head)); // Expected: true

// Test 3: Single node, no cycle
console.log("List 3 (single node, no cycle):", hasCycleFloyd(list3.head)); // Expected: false

// Test 4: Single node, with cycle (points to itself)
console.log("List 4 (single node, self cycle):", hasCycleFloyd(list4.head)); // Expected: true

// Test 5: Empty list
console.log("List 5 (empty):", hasCycleFloyd(list5.head)); // Expected: false

// Test 6: Cycle at head
console.log("List 6 (cycle 2->1):", hasCycleFloyd(list6.head)); // Expected: true

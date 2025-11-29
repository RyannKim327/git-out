class ListNode {
    val: number
    next: ListNode | null

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}
function hasCycleHashSet(head: ListNode | null): boolean {
    if (!head) {
        return false; // An empty list cannot have a cycle
    }

    const seenNodes = new Set<ListNode>();
    let current: ListNode | null = head;

    while (current !== null) {
        if (seenNodes.has(current)) {
            return true; // Cycle detected! We've seen this node before.
        }
        seenNodes.add(current);
        current = current.next;
    }

    return false; // Reached the end of the list without finding a cycle
}
function hasCycleFloyd(head: ListNode | null): boolean {
    if (!head || !head.next) {
        // An empty list or a list with only one node cannot have a cycle.
        return false;
    }

    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    while (fast !== null && fast.next !== null) {
        slow = slow!.next;          // Slow pointer moves one step
        fast = fast.next.next;      // Fast pointer moves two steps

        if (slow === fast) {
            return true; // Pointers met, a cycle is detected!
        }
    }

    return false; // Fast pointer reached the end, no cycle
}
// --- Helper to create a linked list with an optional cycle ---
function createLinkedList(arr: number[], cyclePos: number = -1): ListNode | null {
    if (arr.length === 0) {
        return null;
    }

    let head: ListNode | null = null;
    let current: ListNode | null = null;
    let cycleNode: ListNode | null = null; // Node where the cycle should point to

    const nodes: ListNode[] = []; // To keep track of created nodes

    for (let i = 0; i < arr.length; i++) {
        const newNode = new ListNode(arr[i]);
        nodes.push(newNode);

        if (head === null) {
            head = newNode;
            current = newNode;
        } else {
            current!.next = newNode;
            current = newNode;
        }

        if (i === cyclePos) {
            cycleNode = newNode;
        }
    }

    // Create the cycle if cyclePos is valid
    if (cyclePos !== -1 && current !== null && cycleNode !== null) {
        current.next = cycleNode;
    }

    return head;
}

console.log("--- Test Cases (HashSet Method) ---");

// Test Case 1: No cycle
let list1 = createLinkedList([1, 2, 3, 4, 5]);
console.log("List 1 (no cycle):", hasCycleHashSet(list1)); // Expected: false

// Test Case 2: Cycle (5 -> 2)
let list2 = createLinkedList([1, 2, 3, 4, 5], 1); // Cycle points to node at index 1 (value 2)
console.log("List 2 (cycle 5->2):", hasCycleHashSet(list2)); // Expected: true

// Test Case 3: Single node, no cycle
let list3 = createLinkedList([1]);
console.log("List 3 (single node, no cycle):", hasCycleHashSet(list3)); // Expected: false

// Test Case 4: Single node, cycle (1 -> 1)
let list4 = createLinkedList([1], 0); // Cycle points to node at index 0 (value 1)
console.log("List 4 (single node, cycle 1->1):", hasCycleHashSet(list4)); // Expected: true

// Test Case 5: Empty list
let list5 = createLinkedList([]);
console.log("List 5 (empty):", hasCycleHashSet(list5)); // Expected: false

// Test Case 6: Two nodes, no cycle
let list6 = createLinkedList([1, 2]);
console.log("List 6 (two nodes, no cycle):", hasCycleHashSet(list6)); // Expected: false

// Test Case 7: Two nodes, cycle (2 -> 1)
let list7 = createLinkedList([1, 2], 0); // Cycle points to node at index 0 (value 1)
console.log("List 7 (two nodes, cycle 2->1):", hasCycleHashSet(list7)); // Expected: true


console.log("\n--- Test Cases (Floyd's Tortoise and Hare Method) ---");

// Re-using lists for Floyd's algorithm
console.log("List 1 (no cycle):", hasCycleFloyd(list1)); // Expected: false
console.log("List 2 (cycle 5->2):", hasCycleFloyd(list2)); // Expected: true
console.log("List 3 (single node, no cycle):", hasCycleFloyd(list3)); // Expected: false
console.log("List 4 (single node, cycle 1->1):", hasCycleFloyd(list4)); // Expected: true
console.log("List 5 (empty):", hasCycleFloyd(list5)); // Expected: false
console.log("List 6 (two nodes, no cycle):", hasCycleFloyd(list6)); // Expected: false
console.log("List 7 (two nodes, cycle 2->1):", hasCycleFloyd(list7)); // Expected: true

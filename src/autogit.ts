class ListNode {
    value: any;
    next: ListNode | null;

    constructor(value: any) {
        this.value = value;
        this.next = null;
    }
}

// A simple LinkedList class for demonstration/testing
class LinkedList {
    head: ListNode | null;

    constructor() {
        this.head = null;
    }

    append(value: any): ListNode {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
            return newNode;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
        return newNode;
    }

    // Helper to create a cycle for testing purposes
    // `pos` is the 0-indexed position where the tail should connect
    // If pos is -1 or invalid, no cycle is created.
    createCycle(pos: number): void {
        if (!this.head || pos < 0) return;

        let tail: ListNode | null = null;
        let cycleNode: ListNode | null = null;
        let current: ListNode | null = this.head;
        let count = 0;

        // Traverse to find the tail and the node at `pos`
        while (current.next) {
            if (count === pos) {
                cycleNode = current;
            }
            current = current.next;
            count++;
        }
        // `current` is now the tail node
        tail = current;

        // Create the cycle if a valid cycleNode was found
        if (cycleNode) {
            tail!.next = cycleNode;
        }
    }

    // Helper to print a limited number of nodes (to avoid infinite loops with cycles)
    print(limit: number = 10): void {
        let current = this.head;
        let count = 0;
        let result: any[] = [];
        while (current && count < limit) {
            result.push(current.value);
            current = current.next;
            count++;
        }
        console.log(result.join(' -> ') + (current ? ' -> ... (cycle or too long)' : ''));
    }
}
function hasCycleTortoiseHare(head: ListNode | null): boolean {
    // If the list is empty or has only one node, it cannot have a cycle.
    if (!head || !head.next) {
        return false;
    }

    let slow: ListNode | null = head;
    let fast: ListNode | null = head; // Both start at the head

    // Loop continues as long as fast and fast.next are not null.
    // This is because fast moves two steps, so we need to ensure fast.next is valid.
    while (fast !== null && fast.next !== null) {
        slow = slow!.next;      // Slow moves one step
        fast = fast.next.next;  // Fast moves two steps

        // If slow and fast pointers meet, a cycle is detected.
        if (slow === fast) {
            return true;
        }
    }

    // If fast reaches the end of the list (null), no cycle was found.
    return false;
}

// --- Test Cases for Tortoise and Hare ---

console.log("--- Tortoise and Hare Tests ---");

// Test 1: Empty list
let list1 = new LinkedList();
console.log("Empty list has cycle:", hasCycleTortoiseHare(list1.head)); // Expected: false

// Test 2: Single node
let list2 = new LinkedList();
list2.append(1);
console.log("Single node list has cycle:", hasCycleTortoiseHare(list2.head)); // Expected: false

// Test 3: No cycle
let list3 = new LinkedList();
list3.append(1);
list3.append(2);
list3.append(3);
list3.append(4);
console.log("List without cycle:", hasCycleTortoiseHare(list3.head)); // Expected: false
list3.print();

// Test 4: Cycle at the head (e.g., 1 -> 2 -> 3 -> 1)
let list4 = new LinkedList();
let node1_4 = list4.append(1);
list4.append(2);
list4.append(3);
list4.createCycle(0); // Connects tail to node at index 0 (node1_4)
console.log("List with cycle at head:", hasCycleTortoiseHare(list4.head)); // Expected: true
// list4.print(); // Would loop infinitely, don't uncomment unless you handle it

// Test 5: Cycle in the middle (e.g., 1 -> 2 -> 3 -> 4 -> 2)
let list5 = new LinkedList();
list5.append(1);
let node2_5 = list5.append(2); // Node at index 1
list5.append(3);
list5.append(4);
list5.createCycle(1); // Connects tail to node at index 1 (node2_5)
console.log("List with cycle in middle:", hasCycleTortoiseHare(list5.head)); // Expected: true

// Test 6: Cycle with two nodes (e.g., 1 -> 2 -> 1)
let list6 = new LinkedList();
list6.append(1);
list6.append(2);
list6.createCycle(0);
console.log("List with 2-node cycle:", hasCycleTortoiseHare(list6.head)); // Expected: true

// Test 7: Self-loop (e.g., 1 -> 1)
let list7 = new LinkedList();
list7.append(1);
list7.head!.next = list7.head; // Manually create a self-loop
console.log("List with self-loop:", hasCycleTortoiseHare(list7.head)); // Expected: true
function hasCycleUsingSet(head: ListNode | null): boolean {
    if (!head) {
        return false;
    }

    const visitedNodes = new Set<ListNode>();
    let current: ListNode | null = head;

    while (current !== null) {
        // If the current node is already in the set, we've found a cycle.
        if (visitedNodes.has(current)) {
            return true;
        }
        // Otherwise, add the current node to the set.
        visitedNodes.add(current);
        current = current.next;
    }

    // If we reach the end of the list, no cycle was found.
    return false;
}

// --- Test Cases for Hash Set ---

console.log("\n--- Hash Set Tests ---");

// Test 1: Empty list
let listA = new LinkedList();
console.log("Empty list has cycle (Set):", hasCycleUsingSet(listA.head)); // Expected: false

// Test 2: Single node
let listB = new LinkedList();
listB.append(1);
console.log("Single node list has cycle (Set):", hasCycleUsingSet(listB.head)); // Expected: false

// Test 3: No cycle
let listC = new LinkedList();
listC.append(1);
listC.append(2);
listC.append(3);
console.log("List without cycle (Set):", hasCycleUsingSet(listC.head)); // Expected: false

// Test 4: Cycle at the head
let listD = new LinkedList();
listD.append(1);
listD.append(2);
listD.createCycle(0);
console.log("List with cycle at head (Set):", hasCycleUsingSet(listD.head)); // Expected: true

// Test 5: Cycle in the middle
let listE = new LinkedList();
listE.append(1);
listE.append(2);
listE.append(3);
listE.createCycle(1);
console.log("List with cycle in middle (Set):", hasCycleUsingSet(listE.head)); // Expected: true

class ListNode {
    value: any;
    next: ListNode | null;

    constructor(value: any, next: ListNode | null = null) {
        this.value = value;
        this.next = next;
    }
}
function hasCycleHashSet(head: ListNode | null): boolean {
    if (!head) {
        return false; // An empty list cannot have a cycle
    }

    const visitedNodes = new Set<ListNode>();
    let current: ListNode | null = head;

    while (current !== null) {
        if (visitedNodes.has(current)) {
            return true; // Cycle detected: we've seen this node before
        }
        visitedNodes.add(current);
        current = current.next;
    }

    return false; // No cycle found, reached the end of the list
}
function hasCycleTortoiseHare(head: ListNode | null): boolean {
    if (!head || !head.next) {
        // An empty list or a list with a single node cannot have a cycle.
        // A list with one node can only point to null or itself for a cycle.
        // If it points to itself: head -> head, slow and fast start at head,
        // then slow moves to head, fast moves to head.next.next (which is head).
        // They meet. So this check is mostly for practical reasons or simpler base cases.
        return false;
    }

    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    while (fast !== null && fast.next !== null) {
        slow = slow!.next;          // Move slow by 1 step
        fast = fast.next.next;      // Move fast by 2 steps

        if (slow === fast) {
            return true; // Cycle detected: pointers have met
        }
    }

    return false; // No cycle found, fast pointer reached the end of the list
}
// --- Helper for Visualization ---
function printList(head: ListNode | null, maxNodes: number = 10) {
    let current = head;
    let count = 0;
    let result = [];
    const visited = new Set<ListNode>();

    while (current !== null && count < maxNodes) {
        if (visited.has(current)) {
            result.push(`... (cycle back to ${current.value})`);
            break;
        }
        visited.add(current);
        result.push(current.value);
        current = current.next;
        count++;
    }
    if (current !== null && count >= maxNodes) {
        result.push("... (list too long or cycle beyond limit)");
    }
    console.log(result.join(" -> "));
}


// --- Test Cases ---

// 1. Acyclic list
const list1 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
printList(list1); // 1 -> 2 -> 3 -> 4
console.log("hasCycleHashSet(list1):", hasCycleHashSet(list1));       // Expected: false
console.log("hasCycleTortoiseHare(list1):", hasCycleTortoiseHare(list1)); // Expected: false
console.log("---");

// 2. Cyclic list
const list2 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);

list2.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2; // Cycle: 4 points back to 2

printList(list2); // 1 -> 2 -> 3 -> 4 -> ... (cycle back to 2)
console.log("hasCycleHashSet(list2):", hasCycleHashSet(list2));       // Expected: true
console.log("hasCycleTortoiseHare(list2):", hasCycleTortoiseHare(list2)); // Expected: true
console.log("---");

// 3. Single node, no cycle
const list3 = new ListNode(10);
printList(list3); // 10
console.log("hasCycleHashSet(list3):", hasCycleHashSet(list3));       // Expected: false
console.log("hasCycleTortoiseHare(list3):", hasCycleTortoiseHare(list3)); // Expected: false
console.log("---");

// 4. Single node, self-cycle
const list4 = new ListNode(20);
list4.next = list4; // Cycle: 20 points back to itself
printList(list4); // 20 -> ... (cycle back to 20)
console.log("hasCycleHashSet(list4):", hasCycleHashSet(list4));       // Expected: true
console.log("hasCycleTortoiseHare(list4):", hasCycleTortoiseHare(list4)); // Expected: true
console.log("---");

// 5. Empty list
const list5 = null;
printList(list5); //
console.log("hasCycleHashSet(list5):", hasCycleHashSet(list5));       // Expected: false
console.log("hasCycleTortoiseHare(list5):", hasCycleTortoiseHare(list5)); // Expected: false
console.log("---");

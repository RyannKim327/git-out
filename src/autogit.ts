class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

function hasCycle<T>(head: ListNode<T> | null): boolean {
    if (!head) return false;

    let tortoise: ListNode<T> | null = head;
    let hare: ListNode<T> | null = head;

    while (hare !== null && hare.next !== null) {
        tortoise = tortoise!.next; // Tortoise moves by 1
        hare = hare.next.next;     // Hare moves by 2

        if (tortoise === hare) {
            return true; // Cycle detected
        }
    }

    return false; // No cycle found
}
// Create a linked list with a cycle
const node1 = new ListNode<number>(1);
const node2 = new ListNode<number>(2);
const node3 = new ListNode<number>(3);

node1.next = node2;
node2.next = node3;
node3.next = node2; // Creates a cycle: 3 → 2

console.log(hasCycle(node1)); // Output: true

// Create a linked list without a cycle
const nodeA = new ListNode<string>('A');
const nodeB = new ListNode<string>('B');
nodeA.next = nodeB;

console.log(hasCycle(nodeA)); // Output: false
console.log(hasCycle(null));  // Output: false (edge case)
function hasCycleViaSet<T>(head: ListNode<T> | null): boolean {
    const visited = new Set<ListNode<T>>();
    let current = head;

    while (current) {
        if (visited.has(current)) return true;
        visited.add(current);
        current = current.next;
    }

    return false;
}

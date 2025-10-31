class ListNode {
    val: number;
    next: ListNode | null;
    
    constructor(val?: number, next?: ListNode | null) {
        this.val = val ?? 0;
        this.next = next ?? null;
    }
}
function hasCycle(head: ListNode | null): boolean {
    if (!head || !head.next) return false;

    let slow: ListNode = head;
    let fast: ListNode | null = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next!;         // Tortoise moves 1 step
        fast = fast.next.next;     // Hare moves 2 steps

        if (slow === fast) {
            return true; // Cycle detected
        }
    }

    return false; // No cycle found
}
// Create nodes: 1 -> 2 -> 3 -> 4 -> cycles back to 2
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2; // Cycle here

console.log(hasCycle(node1)); // Output: true
// Create nodes: 1 -> 2 -> 3 -> 4
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);

node1.next = node2;
node2.next = node3;
node3.next = node4;

console.log(hasCycle(node1)); // Output: false
function hasCycleHash(head: ListNode | null): boolean {
    const visited = new Set<ListNode>();
    let current = head;
    
    while (current) {
        if (visited.has(current)) return true;
        visited.add(current);
        current = current.next;
    }
    return false;
}

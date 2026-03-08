class ListNode<T> {
    constructor(public val: T, public next: ListNode<T> | null = null) {}
}
function hasCycle<T>(head: ListNode<T> | null): boolean {
    if (!head) return false;

    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;

    while (fast !== null && fast.next !== null) {
        slow = slow!.next;           // move 1 step
        fast = fast.next.next;       // move 2 steps

        if (slow === fast) {         // same node → cycle
            return true;
        }
    }
    return false;                    // fast reached end → no cycle
}
function hasCycleWithSet<T>(head: ListNode<T> | null): boolean {
    const visited = new Set<ListNode<T>>();

    let current: ListNode<T> | null = head;
    while (current !== null) {
        if (visited.has(current)) return true; // already seen
        visited.add(current);
        current = current.next;
    }
    return false;
}
const a = new ListNode(1);
const b = new ListNode(2);
const c = new ListNode(3);
a.next = b;  // 1 → 2 → 3
b.next = c;
c.next = a;  // cycle back to 1

console.log(hasCycle(a));        // → true
console.log(hasCycleWithSet(a)); // → true

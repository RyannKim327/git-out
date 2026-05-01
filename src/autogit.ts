// A minimal Node interface for a singly–linked list
interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}

/**
 * Detects whether the list rooted at `head` contains a cycle.
 * @returns true if a cycle is found, otherwise false.
 */
function hasCycle<T>(head: ListNode<T> | null): boolean {
  // ∅ → no nodes → no cycle
  if (!head) return false;

  let slow: ListNode<T> | null = head;      // moves 1 step per loop
  let fast: ListNode<T> | null = head;      // moves 2 steps per loop

  while (fast && fast.next) {
    slow = slow!.next;          // safe–because slow starts at head
    fast = fast.next.next;      // fast may skip over a null
    if (slow === fast) return true;   // they met → cycle
  }

  return false;                 // fast reached the end → no cycle
}
// Building a list: 1 → 2 → 3 → 4 → 5 → (back to 3)
const node5: ListNode<number> = { value: 5, next: null };
const node4: ListNode<number> = { value: 4, next: node5 };
const node3: ListNode<number> = { value: 3, next: node4 };
const node2: ListNode<number> = { value: 2, next: node3 };
const node1: ListNode<number> = { value: 1, next: node2 };
node5.next = node3;   // close the loop

console.log(hasCycle(node1)); // → true

// Remove the loop to confirm the detector sees no cycle
node5.next = null;
console.log(hasCycle(node1)); // → false

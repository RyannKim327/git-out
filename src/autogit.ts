// A minimal singly‑linked‑list node for TS
interface ListNode<T = any> {
  value: T;
  next: ListNode<T> | null;
}

// Returns the nth node from the tail (1‑based, so n = 1 gives the last node)
// If n is larger than the length, returns null
function nthFromEnd<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
  if (n <= 0) return null;           // sanity guard

  let lead: ListNode<T> | null = head;
  let trail: ListNode<T> | null = head;

  // Move lead n steps ahead
  for (let i = 0; i < n; i++) {
    if (!lead) return null;          // n > length
    lead = lead.next;
  }

  // Advance both until lead reaches the end
  while (lead) {
    lead = lead.next;
    trail = trail!.next;             // trail is guaranteed non‑null here
  }

  return trail;
}
// build 1 → 2 → 3 → 4 → 5
let node5: ListNode = { value: 5, next: null };
let node4: ListNode = { value: 4, next: node5 };
let node3: ListNode = { value: 3, next: node4 };
let node2: ListNode = { value: 2, next: node3 };
let node1: ListNode = { value: 1, next: node2 };

console.log(nthFromEnd(node1, 1)) // → 5
console.log(nthFromEnd(node1, 3)) // → 3
console.log(nthFromEnd(node1, 5)) // → 1
console.log(nthFromEnd(node1, 6)) // → null

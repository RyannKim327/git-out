// Basic singly‑linked list node
type ListNode<T> = { value: T; next: ListNode<T> | null };

function nthFromEnd<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
  if (n <= 0) throw new Error("n must be a positive integer");

  let fast: ListNode<T> | null = head;
  let slow: ListNode<T> | null = head;

  // 1️⃣ Move fast n steps ahead
  for (let i = 0; i < n; i++) {
    if (!fast) return null; // fewer than n nodes
    fast = fast.next;
  }

  // 2️⃣ Move both pointers until fast is at the end
  while (fast) {
    fast = fast.next;
    slow = (slow as ListNode<T>).next; // fast guarantees slow != null here
  }

  return slow; // happy: nth from end
}
// build a list 1 -> 2 -> 3 -> 4 -> 5
const node5: ListNode<number> = { value: 5, next: null };
const node4: ListNode<number> = { value: 4, next: node5 };
const node3: ListNode<number> = { value: 3, next: node4 };
const node2: ListNode<number> = { value: 2, next: node3 };
const head: ListNode<number> = { value: 1, next: node2 };

const thirdFromEnd = nthFromEnd(head, 3);
console.log(thirdFromEnd?.value); // 3
function nthFromStart<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
  let current = head;
  let idx = 1;
  while (current && idx < n) {
    current = current.next;
    idx++;
  }
  return idx === n ? current : null;
}

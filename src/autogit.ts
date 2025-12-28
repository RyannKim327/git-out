// Node type for a singly linked list
interface ListNode<T> {
  value: T;
  next?: ListNode<T> | null;
}

// Returns the middle node (for odd length) or the second middle (for even length)
function findMiddleSecond<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (!head) return null;
  let slow: ListNode<T> = head;
  let fast: ListNode<T> | null = head;

  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next ?? null;
  }
  return slow;
}

// Returns the first middle for even length (e.g., 1-2-3-4 -> returns 2)
function findMiddleFirst<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (!head) return null;
  let slow: ListNode<T> = head;
  let fast: ListNode<T> | null = head;

  // Stop when fast.next or fast.next.next would be null
  while (fast?.next?.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }
  return slow;
}
// Helper to build a small list: 1 -> 2 -> 3 -> 4
const n4: ListNode<number> = { value: 4, next: null };
const n3: ListNode<number> = { value: 3, next: n4 };
const n2: ListNode<number> = { value: 2, next: n3 };
const n1: ListNode<number> = { value: 1, next: n2 };

console.log(findMiddleSecond(n1)?.value); // 3 (second middle for even length)
console.log(findMiddleFirst(n1)?.value);  // 2 (first middle for even length)

// Odd-length example: 1 -> 2 -> 3
const o3: ListNode<number> = { value: 3, next: null };
const o2: ListNode<number> = { value: 2, next: o3 };
const o1: ListNode<number> = { value: 1, next: o2 };

console.log(findMiddleSecond(o1)?.value); // 2
console.log(findMiddleFirst(o1)?.value);  // 2
function findMiddleTwoPass<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (!head) return null;
  // first pass: length
  let len = 0;
  for (let cur = head; cur; cur = cur.next ?? null) len++;

  // move to middle (second middle for even-length lists)
  let midIndex = Math.floor(len / 2);
  let cur = head;
  for (let i = 0; i < midIndex; i++) cur = cur!.next ?? null;
  return cur;
}

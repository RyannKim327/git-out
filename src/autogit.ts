interface ListNode<T = any> {
  val: T;
  next: ListNode<T> | null;
}
class ListNode<T = any> {
  constructor(public val: T, public next: ListNode<T> | null = null) {}
}
function nthFromEndNaive<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
  let size = 0;
  for (let cur = head; cur; cur = cur.next) size++;

  if (n > size) return null;          // not enough elements
  let target = size - n;              // 0‑based index from start
  let cur = head;
  for (let i = 0; i < target; i++) cur = cur!.next;

  return cur;
}
function nthFromEnd<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
  let fast = head;
  // Move fast n steps forward
  for (let i = 0; i < n; i++) {
    if (!fast) return null;   // n is larger than list length
    fast = fast.next;
  }

  let slow = head!;          // head is guaranteed non‑null now
  while (fast) {
    fast = fast.next!;
    slow = slow.next!;
  }

  return slow;
}
function buildList(nums: number[]) {
  let dummy = new ListNode(0);
  let cur = dummy;
  for (const v of nums) {
    cur.next = new ListNode(v);
    cur = cur.next;
  }
  return dummy.next;
}

const list = buildList([1, 2, 3, 4, 5]);

console.log(nthFromEnd(list, 1)!.val); // 5
console.log(nthFromEnd(list, 3)!.val); // 3
console.log(nthFromEnd(list, 5)!.val); // 1
console.log(nthFromEnd(list, 6));      // null

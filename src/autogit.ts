// 1. Basic list node definition
class ListNode<T> {
  constructor(public val: T, public next: ListNode<T> | null = null) {}
}

// 2. Utility: build a linked list from an array
function buildList<T>(values: T[]): ListNode<T> | null {
  if (values.length === 0) return null;

  const head = new ListNode(values[0]);
  let current = head;
  for (let i = 1; i < values.length; i++) {
    current.next = new ListNode(values[i]);
    current = current.next;
  }
  return head;
}

// 3. Find the middle node – fast/slow pointer
function getMiddle<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (!head) return null;          // empty list

  let slow = head;
  let fast = head;

  while (fast && fast.next) {      // stop when fast can't advance two steps
    slow = slow.next!;             // safe because previous check guarantees truthy
    fast = fast.next.next!;
  }

  return slow;                     // slow is at the middle
}

// Demo
const arr = [1, 2, 3, 4, 5];      // odd length → middle = 3
const oddHead = buildList(arr);
console.log(getMiddle(oddHead)?.val); // 3

const evenArr = [10, 20, 30, 40]; // even length → middle = 20 (first of the two)
const evenHead = buildList(evenArr);
console.log(getMiddle(evenHead)?.val); // 20
while (fast && fast.next && fast.next.next) {
  slow = slow.next!;
  fast = fast.next.next!;
}

/** Node definition for a singly linked list. */
interface ListNode<T> {
  value: T;
  next?: ListNode<T>;
}

/** Helper to build a list from an array (for demo testing). */
function buildList<T>(arr: T[]): ListNode<T> | undefined {
  let head: ListNode<T> | undefined;
  let tail: ListNode<T> | undefined;
  for (const val of arr) {
    const node: ListNode<T> = { value: val };
    if (!head) {
      head = node;
      tail = node;
    } else {
      tail!.next = node;
      tail = node;
    }
  }
  return head;
}

/**
 * Finds the **lower** middle of a singly linked list.
 * If the list is empty, returns undefined.
 */
function getMiddle<T>(head: ListNode<T> | undefined): ListNode<T> | undefined {
  if (!head) return undefined;

  let slow = head;
  let fast = head;

  // Advance fast by 2 and slow by 1.
  // When fast reaches the end, slow is at the middle.
  while (fast.next && fast.next.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  return slow;
}

/** Demo */
const list = buildList([10, 20, 30, 40, 50]);   // odd length
console.log(getMiddle(list)?.value); // → 30

const listEven = buildList([1, 2, 3, 4]);        // even length
console.log(getMiddle(listEven)?.value); // → 2  (lower middle)

// If you want the *upper* middle for even lists, just change the loop:
//   while (fast.next) { ... }
//   return slow.next!;   // after the loop, slow is just before the upper middle.

// -------------------------------------------
// Node definition
// -------------------------------------------
class ListNode<T> {
  constructor(public val: T, public next: ListNode<T> | null = null) {}
}

// -------------------------------------------
// Helper: build list from array
// -------------------------------------------
function arrayToLinkedList<T>(arr: T[]): ListNode<T> | null {
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// -------------------------------------------
// Helper: read list into array (for debugging)
// -------------------------------------------
function linkedListToArray<T>(head: ListNode<T> | null): T[] {
  const arr: T[] = [];
  let cur = head;
  while (cur) {
    arr.push(cur.val);
    cur = cur.next;
  }
  return arr;
}

// -------------------------------------------
// Main: find middle node
// -------------------------------------------
function findMiddle<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (!head) return null;          // empty list

  let slow = head;
  let fast = head;

  // Move fast two steps and slow one step until fast can't move further.
  while (fast.next && fast.next.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  // For even‑length lists, this returns the first of the two middle nodes.
  // If you prefer the second, replace `while (fast && fast.next)` and
  // adjust the loop accordingly.
  return slow;
}

// -------------------------------------------
// Demo
// -------------------------------------------
const list = arrayToLinkedList([1, 2, 3, 4, 5]);  // odd length
console.log(linkedListToArray(list));            // [1,2,3,4,5]
console.log(findMiddle(list)?.val);              // 3

const evenList = arrayToLinkedList([10, 20, 30, 40]);
console.log(linkedListToArray(evenList));         // [10,20,30,40]
console.log(findMiddle(evenList)?.val);           // 20 (first middle)
// if you want the second middle, tweak the loop condition to:
// while (fast && fast.next)
// then you'll get 30.

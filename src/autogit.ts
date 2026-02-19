export interface ListNode<T> {
  val: T;               // the payload
  next: ListNode<T> | null; // pointer to the next node
}
/**
 * Reverses a singly linked list.
 * @param head: the first node of the list (or null for an empty list)
 * @returns the new head of the reversed list
 */
export function reverseList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;   // will become the new head
  let curr: ListNode<T> | null = head;   // current node being processed

  while (curr) {
    const nextTemp = curr.next; // keep reference to the next node
    curr.next = prev;           // reverse the link
    prev = curr;                // move prev forward
    curr = nextTemp;            // move curr forward
  }

  // At this point, prev points to the new head
  return prev;
}
export function reverseListRec<T>(node: ListNode<T> | null): ListNode<T> | null {
  if (!node || !node.next) {
    return node; // new head (either the original head if list is 1 or 0 nodes)
  }

  const newHead = reverseListRec(node.next);   // recurse to the end
  node.next.next = node;   // make the next node point back to the current one
  node.next = null;        // sever original forward link
  return newHead;
}
// Helper to build a list [1, 2, 3]
function buildList(arr: number[]): ListNode<number> | null {
  let head: ListNode<number> | null = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    head = { val: arr[i], next: head };
  }
  return head;
}

// Helper to convert list back to array for easy viewing
function toArray<T>(head: ListNode<T> | null): T[] {
  const result: T[] = [];
  let cur = head;
  while (cur) {
    result.push(cur.val);
    cur = cur.next;
  }
  return result;
}

// Demo
const original = buildList([1, 2, 3, 4, 5]);
console.log('original:', toArray(original));

const reversed = reverseList(original);
console.log('reversed:', toArray(reversed));
original: [1, 2, 3, 4, 5]
reversed: [5, 4, 3, 2, 1]

// A minimal list node
export class ListNode<T> {
  constructor(
    public val: T,
    public next: ListNode<T> | null = null,
  ) {}
}
/**
 * Reverses a linked list.
 * @param head The original list head.
 * @returns New head of the reversed list.
 */
export function reverseListIterative<T>(
  head: ListNode<T> | null,
): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let current = head;

  while (current !== null) {
    const next = current.next;   // remember the next node
    current.next = prev;         // reverse the link
    prev = current;              // move `prev` one step forward
    current = next;              // advance to the next node
  }

  return prev; // new head
}
/**
 * Reverses a linked list recursively.
 * @param node Current node being processed.
 * @returns New head of the reversed list.
 */
export function reverseListRecursive<T>(
  node: ListNode<T> | null,
  newHead: ListNode<T> | null = null,
): ListNode<T> | null {
  if (node === null) return newHead;   // base case: original list exhausted

  const next = node.next;              // keep reference to the next node
  node.next = newHead;                 // attach current node before the “new head”
  return reverseListRecursive(next, node);
}
// Helper to build a list from an array
function buildList<T>(arr: T[]): ListNode<T> | null {
  let head: ListNode<T> | null = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    head = new ListNode(arr[i], head);
  }
  return head;
}

// Helper to turn a list back into an array (for easy checking)
function listToArray<T>(head: ListNode<T> | null): T[] {
  const result: T[] = [];
  for (let cur = head; cur; cur = cur.next) result.push(cur.val);
  return result;
}

// Example usage
const nums = [1, 2, 3, 4, 5];
const list = buildList(nums);

const reversedIter = reverseListIterative(list);
console.log(listToArray(reversedIter)); // [5,4,3,2,1]

const original = buildList(nums); // rebuild, since the list was mutated
const reversedRec = reverseListRecursive(original);
console.log(listToArray(reversedRec)); // [5,4,3,2,1]

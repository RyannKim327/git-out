// A generic node for a singly‑linked list
export class ListNode<T> {
  /** The value stored in the node */
  public value: T;

  /** Reference to the next node (null if this is the tail) */
  public next: ListNode<T> | null = null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}
/**
 * Returns the node that sits in the middle of the list.
 *
 * If the list has an even number of nodes, the function returns the **first**
 * of the two middle nodes (i.e. the node at index ⌊n/2⌋, 0‑based).
 *
 * @param head The first node of the list (or null for an empty list)
 * @returns The middle node, or null if the list is empty
 */
export function findMiddle<T>(head: ListNode<T> | null): ListNode<T> | null {
  // Edge case – empty list
  if (head === null) return null;

  // `slow` moves one step at a time, `fast` moves two steps.
  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;

  // Loop while there are still nodes for `fast` to jump over.
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;          // safe because we know `slow` is not null here
    fast = fast.next.next;      // advance two steps
  }

  // When the loop ends, `slow` points at the middle node.
  return slow;
}
while (fast !== null && fast.next !== null) {
  slow = slow!.next;
  fast = fast.next.next;
}
if (fast !== null) { // list length is odd → already at true middle
  // nothing to do
} else {
  // even length → move slow one step forward to get the second middle
  slow = slow!.next;
}
// ---------------------------------------------------------------
// Demo – building a list and printing its middle element
// ---------------------------------------------------------------
function buildListFromArray<T>(arr: T[]): ListNode<T> | null {
  if (arr.length === 0) return null;

  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Example 1: odd number of nodes
const oddList = buildListFromArray([10, 20, 30, 40, 50]); // 5 nodes
const oddMid = findMiddle(oddList);
console.log('Odd list middle value →', oddMid?.value); // 30

// Example 2: even number of nodes (first middle)
const evenList = buildListFromArray(['a', 'b', 'c', 'd']); // 4 nodes
const evenMid = findMiddle(evenList);
console.log('Even list middle (first) value →', evenMid?.value); // 'b'

// Example 3: empty list
const emptyMid = findMiddle<number>(null);
console.log('Empty list middle →', emptyMid); // null
Odd list middle value → 30
Even list middle (first) value → b
Empty list middle → null
// linked-list-middle.ts -------------------------------------------------
export class ListNode<T> {
  public value: T;
  public next: ListNode<T> | null = null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

/**
 * Finds the middle node of a singly‑linked list.
 *
 * Returns the first middle node when the list length is even.
 */
export function findMiddle<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (head === null) return null;

  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  return slow;
}

/* ---------- Helper for the demo (optional) ---------- */
export function buildListFromArray<T>(arr: T[]): ListNode<T> | null {
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let cur = head;
  for (let i = 1; i < arr.length; i++) {
    cur.next = new ListNode(arr[i]);
    cur = cur.next;
  }
  return head;
}

/* ---------- Demo ---------- */
if (require.main === module) {
  const odd = buildListFromArray([10, 20, 30, 40, 50]);
  console.log('Odd middle →', findMiddle(odd)?.value); // 30

  const even = buildListFromArray(['a', 'b', 'c', 'd']);
  console.log('Even middle (first) →', findMiddle(even)?.value); // b

  console.log('Empty list →', findMiddle<number>(null)); // null
}

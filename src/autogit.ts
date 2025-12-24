/** A node of a singly‑linked list */
class ListNode<T> {
  /** Payload */
  public value: T;
  /** Reference to the next node (null = end of list) */
  public next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

/** A tiny wrapper that makes list construction a bit nicer */
class LinkedList<T> {
  public head: ListNode<T> | null = null;
  public tail: ListNode<T> | null = null;
  public size: number = 0;   // optional, kept for convenience

  /** Append a new value to the tail of the list */
  push(value: T): void {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      (this.tail as ListNode<T>).next = node;
      this.tail = node;
    }
    this.size++;
  }

  /** Convert the list to a plain array (handy for debugging) */
  toArray(): T[] {
    const result: T[] = [];
    let cur = this.head;
    while (cur) {
      result.push(cur.value);
      cur = cur.next;
    }
    return result;
  }
}
/**
 * Returns the node that is the *first* middle of the list.
 *   - For odd length → the exact middle.
 *   - For even length → the node at index floor(length/2) (0‑based).
 *
 * @param head The first node of the list (or null for an empty list)
 * @returns The middle node, or null if the list is empty
 */
function middleNodeFirst<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (!head) return null;

  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;

  // fast moves two steps, slow moves one step
  while (fast && fast.next) {
    slow = slow!.next;          // safe because slow is never null here
    fast = fast.next.next;
  }

  return slow; // <-- points at the first middle
}
/**
 * Returns the *second* middle node.
 *   - Odd length → same as `middleNodeFirst`.
 *   - Even length → node at index length/2 (0‑based).
 */
function middleNodeSecond<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (!head) return null;

  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;

  // fast must be able to take *two* steps ahead; otherwise we stop one step earlier.
  while (fast && fast.next && fast.next.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  // If fast reached the last node (odd length) we still need to move slow one more step
  // to land on the second middle.
  if (fast && fast.next) {
    slow = slow!.next;
  }

  return slow;
}
/**
 * Returns an array with one or two middle nodes:
 *   - Odd length → [middle]
 *   - Even length → [firstMiddle, secondMiddle]
 */
function middleNodes<T>(head: ListNode<T> | null): ListNode<T>[] {
  if (!head) return [];

  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;
  let prevSlow: ListNode<T> | null = null; // tracks node just before slow

  while (fast && fast.next) {
    prevSlow = slow;
    slow = slow!.next;
    fast = fast.next.next;
  }

  // fast is null → even length, slow is the *second* middle,
  // prevSlow is the *first* middle.
  // fast is not null (it points to the last node) → odd length.
  return fast ? [slow!] : [prevSlow!, slow!];
}
function middleNodeTwoPass<T>(head: ListNode<T> | null): ListNode<T> | null {
  // 1️⃣ Count
  let count = 0;
  for (let cur = head; cur; cur = cur.next) count++;

  if (count === 0) return null;

  // 2️⃣ Find the middle (first middle)
  const target = Math.floor(count / 2);
  let cur = head;
  for (let i = 0; i < target; i++) cur = cur!.next!;
  return cur;
}
// ---------------------------------------------------------------
// Build a list: 1 → 2 → 3 → 4 → 5 → 6
// ---------------------------------------------------------------
const list = new LinkedList<number>();
[1, 2, 3, 4, 5, 6].forEach(v => list.push(v));

console.log('List:', list.toArray()); // [1,2,3,4,5,6]

// 1️⃣ First middle (index 2 → value 3)
const firstMid = middleNodeFirst(list.head);
console.log('First middle:', firstMid?.value); // 3

// 2️⃣ Second middle (index 3 → value 4)
const secondMid = middleNodeSecond(list.head);
console.log('Second middle:', secondMid?.value); // 4

// 3️⃣ Both middles
const both = middleNodes(list.head);
console.log('Both middles:', both.map(n => n.value)); // [3,4]

// 4️⃣ Two‑pass version (first middle)
const twoPassMid = middleNodeTwoPass(list.head);
console.log('Two‑pass middle:', twoPassMid?.value); // 3
List: [ 1, 2, 3, 4, 5, 6 ]
First middle: 3
Second middle: 4
Both middles: [ 3, 4 ]
Two‑pass middle: 3
const middle = (head: ListNode<any> | null) => {
  let slow = head, fast = head;
  while (fast && fast.next) { slow = slow!.next; fast = fast.next.next; }
  return slow;
};

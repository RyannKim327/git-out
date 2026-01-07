// A node of a singly‑linked list
class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}

// A minimal linked‑list wrapper (optional but convenient)
class LinkedList<T> {
  public head: ListNode<T> | null = null;

  /** Append a new value at the end of the list */
  append(value: T): void {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let cur = this.head;
    while (cur.next) cur = cur.next;
    cur.next = newNode;
  }

  /** Return an array with all values – handy for debugging / printing */
  toArray(): T[] {
    const result: T[] = [];
    let cur = this.head;
    while (cur) {
      result.push(cur.value);
      cur = cur.next;
    }
    return result;
  }

  /**
   * Find the middle node.
   *
   * If the list has an even number of elements, you can decide which
   * “middle” you want:
   *   - `preferFirst = true`  → returns the first of the two middle nodes
   *   - `preferFirst = false` → returns the second (the one a normal
   *                              slow‑pointer would land on)
   *
   * Returns `null` for an empty list.
   */
  middle(preferFirst = true): ListNode<T> | null {
    if (!this.head) return null;

    // `slow` moves one step, `fast` moves two steps.
    // When `fast` reaches the end, `slow` is at the middle.
    let slow: ListNode<T> = this.head;
    let fast: ListNode<T> | null = this.head;

    // The loop condition differs slightly depending on which middle we want.
    //   * preferFirst === true  → stop when fast.next?.next is null
    //   * preferFirst === false → stop when fast.next is null
    while (fast && fast.next) {
      // If we want the *second* middle in an even‑length list,
      // we let `slow` advance one extra step when `fast.next.next` is null.
      if (!preferFirst && fast.next.next === null) {
        // fast will become null after the next iteration,
        // but we still want `slow` to move one more step.
        slow = slow.next!;
        break;
      }

      slow = slow.next!;
      fast = fast.next.next;
    }

    return slow;
  }
}
// Create a list with values 1 … 7
const list = new LinkedList<number>();
[1, 2, 3, 4, 5, 6, 7].forEach(v => list.append(v));

console.log('List:', list.toArray()); // → [1,2,3,4,5,6,7]

// Odd length → middle is 4
const midOdd = list.middle(); // default prefers the first middle (irrelevant here)
console.log('Middle (odd):', midOdd?.value); // → 4

// Even length example
const evenList = new LinkedList<number>();
[10, 20, 30, 40, 50, 60].forEach(v => evenList.append(v));
console.log('Even list:', evenList.toArray()); // → [10,20,30,40,50,60]

// First middle (30)
console.log('First middle (even):', evenList.middle(true)?.value); // → 30

// Second middle (40)
console.log('Second middle (even):', evenList.middle(false)?.value); // → 40
List: [ 1, 2, 3, 4, 5, 6, 7 ]
Middle (odd): 4
Even list: [ 10, 20, 30, 40, 50, 60 ]
First middle (even): 30
Second middle (even): 40
function middleByCounting<T>(list: LinkedList<T>): ListNode<T> | null {
  // 1️⃣ Count
  let count = 0;
  for (let cur = list.head; cur; cur = cur.next) count++;

  if (count === 0) return null;

  // 2️⃣ Walk to the middle (floor(count/2))
  let steps = Math.floor(count / 2);
  let cur = list.head!;
  while (steps-- > 0) cur = cur.next!;
  return cur;
}
function findMiddle<T>(head: ListNode<T> | null, preferFirst = true): ListNode<T> | null {
  if (!head) return null;
  let slow = head;
  let fast: ListNode<T> | null = head;

  while (fast && fast.next) {
    if (!preferFirst && fast.next.next === null) {
      slow = slow.next!;
      break;
    }
    slow = slow.next!;
    fast = fast.next.next;
  }
  return slow;
}

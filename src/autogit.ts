// A generic singly‑linked list node
export class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}
export class LinkedList<T> {
  public head: ListNode<T> | null = null;

  // Append a new value to the tail (O(1) if you keep a tail reference)
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

  // -----------------------------------------------------------------
  // 1️⃣  Find middle using the two‑pointer technique
  // -----------------------------------------------------------------
  middleNode(): ListNode<T> | null {
    if (!this.head) return null; // empty list

    let slow: ListNode<T> | null = this.head;
    let fast: ListNode<T> | null = this.head;

    // Move fast two steps, slow one step
    while (fast && fast.next) {
      slow = slow!.next;          // safe because slow is never null here
      fast = fast.next.next;
    }

    // When the loop ends, `slow` is at the middle (second middle for even length)
    return slow;
  }

  // -----------------------------------------------------------------
  // 2️⃣  Alternative: count‑then‑traverse (useful if you already know length)
  // -----------------------------------------------------------------
  middleNodeByCount(): ListNode<T> | null {
    // First pass – count nodes
    let count = 0;
    for (let cur = this.head; cur; cur = cur.next) count++;

    if (count === 0) return null;

    // Second pass – stop at floor(count/2)
    const targetIdx = Math.floor(count / 2); // 0‑based index
    let cur = this.head;
    for (let i = 0; i < targetIdx; i++) {
      cur = cur!.next!;
    }
    return cur;
  }

  // -----------------------------------------------------------------
  // Utility: convert list to array (for quick debugging / printing)
  // -----------------------------------------------------------------
  toArray(): T[] {
    const arr: T[] = [];
    for (let cur = this.head; cur; cur = cur.next) arr.push(cur.value);
    return arr;
  }
}
// ---------------------------------------------------------------
// Example usage
// ---------------------------------------------------------------
function demo() {
  const list = new LinkedList<number>();
  // Build list: 1 → 2 → 3 → 4 → 5
  [1, 2, 3, 4, 5].forEach(v => list.append(v));

  console.log('List:', list.toArray()); // [1,2,3,4,5]

  const middle = list.middleNode();
  console.log('Middle (slow/fast):', middle?.value); // 3

  // Even‑length example
  list.append(6); // now 1→2→3→4→5→6
  console.log('List (even):', list.toArray()); // [1,2,3,4,5,6]

  const middleEven = list.middleNode();
  console.log('Middle of even list (second middle):', middleEven?.value); // 4

  // If you prefer the *first* middle for even length, just step back once:
  const firstMiddle = middleEven?.next ? middleEven!.next : middleEven;
  console.log('First middle (if you need it):', firstMiddle?.value); // 3
}
demo();
List: [ 1, 2, 3, 4, 5 ]
Middle (slow/fast): 3
List (even): [ 1, 2, 3, 4, 5, 6 ]
Middle of even list (second middle): 4
First middle (if you need it): 3
while (fast && fast.next && fast.next.next) {
  slow = slow!.next;
  fast = fast.next.next;
}
// ---------------------------------------------------------------
// Stand‑alone function that works on any ListNode<T> chain
// ---------------------------------------------------------------
export function findMiddle<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (!head) return null;

  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }
  return slow; // second middle for even length
}

// ---------------------------------------------------------------
// Quick test
// ---------------------------------------------------------------
function test() {
  const nodes = [10, 20, 30, 40, 50].map(v => new ListNode(v));
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
  const head = nodes[0];

  console.log('Middle value:', findMiddle(head)?.value); // 30
}
test();

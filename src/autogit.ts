// A generic singly‑linked list node
export class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}

// Optional helper class – not required for the algorithm itself
export class LinkedList<T> {
  public head: ListNode<T> | null = null;

  // Append a new value at the tail (O(1) if you keep a tail pointer)
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

  // Utility for debugging / testing
  toArray(): T[] {
    const arr: T[] = [];
    let cur = this.head;
    while (cur) {
      arr.push(cur.value);
      cur = cur.next;
    }
    return arr;
  }
}
/**
 * Returns true if the linked list starting at `head` is a palindrome.
 * Works for any value type that can be compared with `===`.
 *
 * @param head - The first node of the list (or null for an empty list)
 */
export function isPalindrome<T>(head: ListNode<T> | null): boolean {
  if (!head || !head.next) return true; // empty or single‑node list

  // ---------- 1. Find middle ----------
  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;

  // When the list length is odd, `slow` will land on the exact middle node.
  // When even, it will land on the first node of the second half.
  while (fast && fast.next) {
    slow = slow!.next;          // move 1 step
    fast = fast.next.next;      // move 2 steps
  }

  // At this point:
  // - `slow` is at the start of the second half (or the middle node for odd length)
  // - `fast` is null (even length) or the last node (odd length)

  // ---------- 2. Reverse the second half ----------
  // If the length is odd we skip the middle element because it doesn't affect palindrome property.
  const secondHalfStart = (fast ? slow!.next : slow)!; // `fast` non‑null → odd length
  const reversedSecondHalf = reverseList(secondHalfStart);

  // ---------- 3. Compare ----------
  let p1: ListNode<T> | null = head;
  let p2: ListNode<T> | null = reversedSecondHalf;
  let palindrome = true;

  while (p2) { // only need to iterate through the reversed half
    if (p1!.value !== p2.value) {
      palindrome = false;
      break;
    }
    p1 = p1!.next;
    p2 = p2.next;
  }

  // ---------- 4. Restore the list (optional) ----------
  // Re‑reverse to put the list back in its original order.
  // This is useful if the caller expects the list unchanged.
  const restoredSecondHalf = reverseList(reversedSecondHalf);
  if (fast) {
    // odd length → reconnect after the middle node
    slow!.next = restoredSecondHalf;
  } else {
    // even length → `slow` is the last node of the first half
    // (it currently points to the reversed part, so we reconnect it)
    // `slow` is the node just before the start of the reversed half.
    // In the even case `slow` is the node that should point to the restored half.
    // Because we used `secondHalfStart = slow` for even length,
    // we need to find the node before `secondHalfStart`.
    // The simplest way is to walk from head until we hit the node whose next is `reversedSecondHalf`.
    let prev = head;
    while (prev && prev.next !== reversedSecondHalf) prev = prev.next!;
    if (prev) prev.next = restoredSecondHalf;
  }

  return palindrome;
}

/**
 * Helper: reverses a singly‑linked list and returns the new head.
 * Runs in O(n) time and O(1) extra space.
 */
function reverseList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let cur = head;
  while (cur) {
    const nxt = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nxt;
  }
  return prev;
}
export function isPalindromeStack<T>(head: ListNode<T> | null): boolean {
  const stack: T[] = [];
  let cur = head;

  // Push all values onto the stack
  while (cur) {
    stack.push(cur.value);
    cur = cur.next;
  }

  // Iterate again, popping from the stack (which yields the list in reverse)
  cur = head;
  while (cur) {
    const top = stack.pop()!;
    if (cur.value !== top) return false;
    cur = cur.next;
  }
  return true;
}
function test() {
  const list1 = new LinkedList<number>();
  [1, 2, 3, 2, 1].forEach(v => list1.append(v));
  console.log('list1:', list1.toArray(), '=>', isPalindrome(list1.head)); // true

  const list2 = new LinkedList<string>();
  ['a', 'b', 'b', 'a'].forEach(v => list2.append(v));
  console.log('list2:', list2.toArray(), '=>', isPalindrome(list2.head)); // true

  const list3 = new LinkedList<number>();
  [1, 2, 3].forEach(v => list3.append(v));
  console.log('list3:', list3.toArray(), '=>', isPalindrome(list3.head)); // false

  // Using the stack version
  console.log('stack version list3 =>', isPalindromeStack(list3.head)); // false
}
test();
list1: [ 1, 2, 3, 2, 1 ] => true
list2: [ 'a', 'b', 'b', 'a' ] => true
list3: [ 1, 2, 3 ] => false
stack version list3 => false
export function isPalindromeCustom<T>(
  head: ListNode<T> | null,
  equals: (a: T, b: T) => boolean
): boolean {
  // Same algorithm, replace `!==` with `!equals(...)`
}
// palindrome-linkedlist.ts
export class ListNode<T> {
  constructor(public value: T, public next: ListNode<T> | null = null) {}
}

export class LinkedList<T> {
  public head: ListNode<T> | null = null;
  append(value: T): void {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = node;
      return;
    }
    let cur = this.head;
    while (cur.next) cur = cur.next;
    cur.next = node;
  }
  toArray(): T[] {
    const arr: T[] = [];
    let cur = this.head;
    while (cur) {
      arr.push(cur.value);
      cur = cur.next;
    }
    return arr;
  }
}

/* ---------- O(1) extra space version ---------- */
export function isPalindrome<T>(head: ListNode<T> | null): boolean {
  if (!head || !head.next) return true;

  // 1. Find middle
  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  // 2. Reverse second half
  const secondHalfStart = fast ? slow!.next : slow; // odd → skip middle
  const reversed = reverseList(secondHalfStart);

  // 3. Compare
  let p1: ListNode<T> | null = head;
  let p2: ListNode<T> | null = reversed;
  let ok = true;
  while (p2) {
    if (p1!.value !== p2.value) {
      ok = false;
      break;
    }
    p1 = p1!.next;
    p2 = p2.next;
  }

  // 4. Restore (optional)
  const restored = reverseList(reversed);
  if (fast) {
    // odd length
    slow!.next = restored;
  } else {
    // even length – reconnect the node before the reversed part
    let prev = head;
    while (prev && prev.next !== reversed) prev = prev.next!;
    if (prev) prev.next = restored;
  }

  return ok;
}

function reverseList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let cur = head;
  while (cur) {
    const nxt = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nxt;
  }
  return prev;
}

/* ---------- Stack version (O(n) space) ---------- */
export function isPalindromeStack<T>(head: ListNode<T> | null): boolean {
  const stack: T[] = [];
  let cur = head;
  while (cur) {
    stack.push(cur.value);
    cur = cur.next;
  }
  cur = head;
  while (cur) {
    if (cur.value !== stack.pop()!) return false;
    cur = cur.next;
  }
  return true;
}

/* ---------- Example usage ---------- */
if (require.main === module) {
  const list = new LinkedList<number>();
  [1, 2, 3, 2, 1].forEach(v => list.append(v));
  console.log('list:', list.toArray(), 'palindrome?', isPalindrome(list.head));
}

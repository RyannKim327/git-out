// A node of a singly linked list
class ListNode<T> {
  constructor(public val: T, public next: ListNode<T> | null = null) {}
}

// Helper to build a list from an array (optional)
function buildList<T>(values: T[]): ListNode<T> | null {
  if (values.length === 0) return null
  const head = new ListNode(values[0])
  let cur = head
  for (let i = 1; i < values.length; i++) {
    cur.next = new ListNode(values[i])
    cur = cur.next
  }
  return head
}
/**
 * Returns the middle ListNode of a singly linked list.
 * If the list has an even number of nodes, the *second* middle one is returned
 * (you can customize this if you prefer the first one).
 */
function getMiddle<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (!head) return null

  let slow: ListNode<T> | null = head
  let fast: ListNode<T> | null = head

  // Move fast twice as fast as slow
  while (fast && fast.next) {
    slow = slow!.next            // safe because slow ≠ null in loop
    fast = fast.next.next
  }

  return slow
}
const list = buildList([1, 2, 3, 4, 5])          // Odd‑length list
console.log(getMiddle(list)?.val)                // → 3

const list2 = buildList([10, 20, 30, 40])        // Even‑length list
console.log(getMiddle(list2)?.val)               // → 30  (second middle)
function getMiddleViaArray<T>(head: ListNode<T> | null): ListNode<T> | null {
  const values: ListNode<T>[] = []
  let cur = head
  while (cur) {
    values.push(cur)
    cur = cur.next
  }
  const midIndex = Math.floor(values.length / 2)
  return values[midIndex] ?? null
}

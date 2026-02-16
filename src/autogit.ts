// 1️⃣  Node definition
export interface ListNode<T> {
  val: T
  next: ListNode<T> | null
}

// 2️⃣  Utility: build list from array (for demo/testing)
export function fromArray<T>(arr: T[]): ListNode<T> | null {
  if (!arr.length) return null
  let head: ListNode<T> = { val: arr[0], next: null }
  let cur = head
  for (let i = 1; i < arr.length; i++) {
    cur.next = { val: arr[i], next: null }
    cur = cur.next
  }
  return head
}

// 3️⃣  Fast‑/slow‑pointer algorithm (one pass, O(1) extra memory)
export function nthFromEnd<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
  // Edge checks – return null if n is out of range
  if (n <= 0) return null

  let fast: ListNode<T> | null = head
  let slow: ListNode<T> | null = head

  // Move `fast` n steps ahead
  for (let i = 0; i < n; i++) {
    if (!fast) return null              // n > length
    fast = fast.next
  }

  // Move both until `fast` hits the end
  while (fast) {
    fast = fast.next
    slow = slow!.next
  }

  // `slow` is now the nth from the end
  return slow
}
const list = fromArray([10, 20, 30, 40, 50])
console.log(nthFromEnd(list, 1)?.val) // 50   (last)
console.log(nthFromEnd(list, 3)?.val) // 30   (3rd from the end)
console.log(nthFromEnd(list, 6))       // null  (n > length)

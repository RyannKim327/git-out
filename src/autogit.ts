// A minimal node that can hold any value
class ListNode<T> {
  constructor(public val: T, public next: ListNode<T> | null = null) {}
}

// A helper to build a list from an array (great for demos)
function arrayToList<T>(arr: T[]): ListNode<T> | null {
  let head: ListNode<T> | null = null
  for (let i = arr.length - 1; i >= 0; i--) {
    head = new ListNode(arr[i], head)
  }
  return head
}

// A helper to turn a list back into an array (great for quick checks)
function listToArray<T>(head: ListNode<T> | null): T[] {
  const out: T[] = []
  let cur = head
  while (cur) {
    out.push(cur.val)
    cur = cur.next
  }
  return out
}
function reverseList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null
  let curr = head

  while (curr) {
    const next = curr.next   // store the rest of the list
    curr.next = prev         // reverse the link
    prev = curr              // move prev forward
    curr = next              // continue
  }

  // At the end, prev is the new head
  return prev
}
function reverseListRecursive<T>(head: ListNode<T> | null): ListNode<T> | null {
  // Base case: 0 or 1 node
  if (!head || !head.next) {
    return head
  }

  // Recurse to the end of the list
  const newHead = reverseListRecursive(head.next)

  // After recursion returns, head is still at the original start
  // head.next still points forward; we need to put head at the end
  head.next.next = head   // point the next node back to head
  head.next = null        // cut off the original link

  return newHead
}
const example = arrayToList([1, 2, 3, 4, 5])
const reversedIterative = reverseList(example)
console.log(listToArray(reversedIterative)) // [5, 4, 3, 2, 1]

const example2 = arrayToList([10, 20, 30])
const reversedRecursive = reverseListRecursive(example2)
console.log(listToArray(reversedRecursive)) // [30, 20, 10]

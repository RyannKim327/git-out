// ---------- 1.  Node definition ----------
class ListNode<T> {
  constructor(
    public data: T,
    public next: ListNode<T> | null = null
  ) {}
}

// ---------- 2.  Core reversal ----------
function reverseLinkedList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let curr = head;

  while (curr) {
    const next = curr.next; // save pointer
    curr.next = prev;     // flip
    prev = curr;          // advance prev
    curr = next;          // advance curr
  }
  return prev; // new head
}

// ---------- 3.  Utility helpers ----------
function fromArray<T>(arr: T[]): ListNode<T> | null {
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let tail = head;
  for (let i = 1; i < arr.length; ++i) {
    tail.next = new ListNode(arr[i]);
    tail = tail.next;
  }
  return head;
}

function toArray<T>(head: ListNode<T> | null): T[] {
  const out: T[] = [];
  for (let node = head; node; node = node.next) out.push(node.data);
  return out;
}

// ---------- 4.  Quick test ----------
const list = fromArray([1, 2, 3, 4, 5]);
console.log("before:", toArray(list));               // [1,2,3,4,5]
const reversed = reverseLinkedList(list);
console.log("after: ", toArray(reversed));           // [5,4,3,2,1]

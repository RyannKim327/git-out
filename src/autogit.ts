ListA: a → b → c → d ──┐
                         │
ListB: x → y ───────────┘  (points to `c` above)
type ListNode<T> = { value: T; next: ListNode<T> | null };

function intersectionHash<T>(a: ListNode<T> | null, b: ListNode<T> | null): ListNode<T> | null {
  const seen = new Set<ListNode<T>>();

  for (let p = a; p; p = p.next) {
    seen.add(p);
  }

  for (let q = b; q; q = q.next) {
    if (seen.has(q)) return q;   // first shared node
  }
  return null;                    // no intersection
}
function intersectionTwoPointer<T>(headA: ListNode<T> | null, headB: ListNode<T> | null): ListNode<T> | null {
  if (!headA || !headB) return null;

  let p: ListNode<T> | null = headA;
  let q: ListNode<T> | null = headB;

  // After at most lengthA + lengthB steps, p and q will be either:
  //   • the intersection node, or
  //   • null (if the lists never meet)
  while (p !== q) {
    p = p ? p.next : headB;   // drop to the head of the other list when hitting the end
    q = q ? q.next : headA;
  }
  return p;   // either the intersection node or null
}
// Helpers
function makeLinkedList<T>(arr: T[]): ListNode<T> | null {
  let head: ListNode<T> | null = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    head = { value: arr[i], next: head };
  }
  return head;
}

function attachTail<T>(head: ListNode<T> | null, tail: ListNode<T> | null): ListNode<T> | null {
  if (!head) return tail;
  let p = head;
  while (p.next) p = p.next;
  p.next = tail;
  return head;
}

// Build example from the diagram
const shared = makeLinkedList([8, 9, 10]);          // nodes to share
const listA = attachTail(makeLinkedList([1, 2, 3]), shared);
const listB = attachTail(makeLinkedList([4, 5]), shared);

console.log(intersectionTwoPointer(listA, listB) === shared);   // true

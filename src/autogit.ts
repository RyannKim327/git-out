class ListNode<T> {
  value: T;
  next: ListNode<T> | null;
  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

function getIntersectionNode<T>(
  headA: ListNode<T> | null,
  headB: ListNode<T> | null
): ListNode<T> | null {
  if (!headA || !headB) return null;

  let pA: ListNode<T> | null = headA;
  let pB: ListNode<T> | null = headB;

  while (pA !== pB) {
    pA = pA ? pA.next : headB;
    pB = pB ? pB.next : headA;
  }

  return pA; // either the intersection node or null
}
// common tail: C1 -> C2
const common = new ListNode<number>(9, new ListNode<number>(12));

// A: 3 -> 7 -> C1 -> C2
const headA = new ListNode<number>(3, new ListNode<number>(7, common));

// B: 99 -> 1 -> C1 -> C2
const headB = new ListNode<number>(99, new ListNode<number>(1, common));

const intersection = getIntersectionNode(headA, headB);
console.log(intersection?.value); // 9
function getLength<T>(head: ListNode<T> | null): number {
  let len = 0;
  while (head) {
    len++;
    head = head.next;
  }
  return len;
}

function getIntersectionNodeByLength<T>(
  headA: ListNode<T> | null,
  headB: ListNode<T> | null
): ListNode<T> | null {
  const lenA = getLength(headA);
  const lenB = getLength(headB);

  let a = headA;
  let b = headB;

  let diff = Math.abs(lenA - lenB);
  if (lenA > lenB) {
    for (let i = 0; i < diff; i++) a = a!.next;
  } else {
    for (let i = 0; i < diff; i++) b = b!.next;
  }

  while (a && b && a !== b) {
    a = a.next;
    b = b.next;
  }

  return a;
}

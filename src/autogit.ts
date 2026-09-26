// A simple singly‑linked‑list node suitable for the intersection test
export interface ListNode<T> {
  val: T;
  next?: ListNode<T>;
}

/**
 * Returns the first node at which two singly‑linked lists intersect,
 * or undefined if they never intersect.
 */
export function getIntersectionNode<T>(
  headA: ListNode<T> | undefined,
  headB: ListNode<T> | undefined
): ListNode<T> | undefined {
  // Helper that walks a list and returns its length
  const getLength = (node?: ListNode<T>) => {
    let len = 0;
    while (node) {
      len++;
      node = node.next;
    }
    return len;
  };

  let lenA = getLength(headA);
  let lenB = getLength(headB);

  // Advance the longer list so both pointers are at the same distance
  // from the end of the list.
  let currA = headA;
  let currB = headB;
  while (lenA > lenB && currA) {
    currA = currA.next;
    lenA--;
  }
  while (lenB > lenA && currB) {
    currB = currB.next;
    lenB--;
  }

  // Move forward together until either we find the intersection
  // or both pointers hit the end (undefined).
  while (currA !== currB) {
    currA = currA?.next;
    currB = currB?.next;
  }

  return currA; // May be undefined if no intersection
}
// Build example lists that intersect:

//      A -> B -> C
//      ^          |
//      |          v
//      D <- E

const c: ListNode<number> = { val: 3 };
const b: ListNode<number> = { val: 2, next: c };
const a: ListNode<number> = { val: 1, next: b };

const e: ListNode<number> = { val: 5, next: a };
const d: ListNode<number> = { val: 4, next: e };

console.log(getIntersectionNode(a, d) === a);   // true
console.log(getIntersectionNode(b, d) === a);   // true
console.log(getIntersectionNode(c, d) === a);   // true

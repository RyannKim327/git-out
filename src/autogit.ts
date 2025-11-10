// 1.  Node definition
class ListNode<T> {
  constructor(
    public data: T,
    public next: ListNode<T> | null = null
  ) {}
}

// 2.  Reversal routine
function reverseLinkedList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let curr = head;

  while (curr) {
    const next = curr.next; // save pointer
    curr.next = prev;       // flip
    prev = curr;            // advance prev
    curr = next;            // advance curr
  }
  return prev;              // new head
}

// 3.  Quick sanity check
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('reverseLinkedList', () => {
    it('reverses 1→2→3→null to 3→2→1→null', () => {
      const n3 = new ListNode(3);
      const n2 = new ListNode(2, n3);
      const n1 = new ListNode(1, n2);

      const newHead = reverseLinkedList(n1);
      expect(newHead).toBe(n3);
      expect(n3.next).toBe(n2);
      expect(n2.next).toBe(n1);
      expect(n1.next).toBeNull();
    });

    it('handles empty list', () => {
      expect(reverseLinkedList(null)).toBeNull();
    });
  });
}
const head = new ListNode(10,
                new ListNode(20,
                  new ListNode(30)));

const reversed = reverseLinkedList(head); // 30→20→10

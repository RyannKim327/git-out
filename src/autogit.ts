// 1️⃣  A tiny node definition
interface ListNode<T> {
  val: T;
  next?: ListNode<T>;
}

// 2️⃣  Helper: walk a list and collect values (for demo)
const listToArray = <T>(head: ListNode<T> | undefined): T[] => {
  const arr: T[] = [];
  for (let cur = head; cur; cur = cur.next) arr.push(cur.val);
  return arr;
};

// 3️⃣  The trick: two pointers, fast and slow
function middle<T>(head: ListNode<T> | undefined): ListNode<T> | undefined {
  if (!head) return undefined; // empty list—no middle

  let fast = head;
  let slow = head;

  // advance fast every two steps, slow every one
  while (fast.next && fast.next.next) {
    fast = fast.next.next; // jump 2
    slow = slow.next as ListNode<T>; // jump 1
  }

  // If fast has a next (odd length), move slow one more
  if (fast.next) slow = slow.next as ListNode<T>;

  return slow;
}

// 4️⃣  Demo: build a list so we can see it in action
const nodes: ListNode<number>[] = [1, 2, 3, 4, 5].map(
  (v) => ({ val: v })
);
for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
const head = nodes[0];

console.log("Full list:", listToArray(head));         // 1,2,3,4,5
console.log("Middle node:", middle(head)?.val);        // 3

// Try an even‑length list
const even: ListNode<number>[] = [10, 20, 30, 40].map(
  (v) => ({ val: v })
);
for (let i = 0; i < even.length - 1; i++) even[i].next = even[i + 1];
console.log("Middle of even list:", middle(even)?.val); // 20 (or 30 if you prefer that half)
class LinkedList<T> {
  head?: ListNode<T>;

  // push to the tail
  push(val: T) {
    const node: ListNode<T> = { val };
    if (!this.head) {
      this.head = node;
    } else {
      let cur = this.head;
      while (cur.next) cur = cur.next;
      cur.next = node;
    }
  }

  // returns the middle node (or the first of two middles for even length)
  middle(): ListNode<T> | undefined {
    return middle(this.head);
  }

  toArray(): T[] {
    return listToArray(this.head);
  }
}

// Usage:
const ll = new LinkedList<number>();
[1, 2, 3, 4, 5].forEach(v => ll.push(v));
console.log(ll.toArray());       // [1,2,3,4,5]
console.log(ll.middle()?.val);   // 3

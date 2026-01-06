// Generic node
class ListNode<T> {
  constructor(
    public data: T,
    public next: ListNode<T> | null = null
  ) {}
}

// Optional wrapper so we can keep a reference to the new head
class LinkedList<T> {
  constructor(public head: ListNode<T> | null = null) {}

  // ----- core algorithm -----
  reverse(): void {
    let prev: ListNode<T> | null = null;
    let curr = this.head;

    while (curr) {
      const next = curr.next; // save pointer
      curr.next = prev;     // flip
      prev = curr;          // advance prev
      curr = next;          // advance curr
    }
    this.head = prev;       // prev is the new head
  }

  // helper: build from an array (for quick tests)
  static fromArray<T>(arr: T[]): LinkedList<T> {
    if (arr.length === 0) return new LinkedList<T>();
    const head = new ListNode(arr[0]);
    let tail = head;
    for (let i = 1; i < arr.length; i++) {
      tail.next = new ListNode(arr[i]);
      tail = tail.next;
    }
    return new LinkedList(head);
  }

  // helper: convert to array (for quick tests)
  toArray(): T[] {
    const out: T[] = [];
    let curr = this.head;
    while (curr) {
      out.push(curr.data);
      curr = curr.next;
    }
    return out;
  }
}
const list = LinkedList.fromArray([1, 2, 3, 4, 5]);
console.log("before:", list.toArray()); // [1,2,3,4,5]

list.reverse();
console.log("after :", list.toArray()); // [5,4,3,2,1]
function reverseRecursive<T>(
  node: ListNode<T> | null,
  prev: ListNode<T> | null = null
): ListNode<T> | null {
  if (!node) return prev;
  const next = node.next;
  node.next = prev;
  return reverseRecursive(next, node);
}

// usage
list.head = reverseRecursive(list.head);

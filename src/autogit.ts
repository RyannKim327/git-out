class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class LinkedList<T> {
  head: ListNode<T> | null = null;

  append(value: T): void {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  findMiddle(): T | null {
    if (!this.head) return null;

    let slow = this.head;
    let fast = this.head;

    while (fast && fast.next) {
      slow = slow.next!;
      fast = fast.next.next;
    }

    return slow.value;
  }
}
const list = new LinkedList<number>();
[1, 2, 3, 4, 5].forEach(num => list.append(num));

console.log("Middle element:", list.findMiddle()); // Output: 3

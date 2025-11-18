class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

function hasCycle<T>(head: ListNode<T> | null): boolean {
  if (!head) return false;

  let tortoise: ListNode<T> | null = head;
  let hare: ListNode<T> | null = head;

  while (hare !== null && hare.next !== null) {
    tortoise = tortoise!.next;       // Tortoise moves 1 step
    hare = hare.next.next;           // Hare moves 2 steps

    if (tortoise === hare) return true; // Cycle detected
  }

  return false; // No cycle found
}
// Create a linked list with a cycle: 1 -> 2 -> 3 -> 2 -> 3 -> ...
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
node1.next = node2;
node2.next = node3;
node3.next = node2; // Creates a cycle

console.log(hasCycle(node1)); // true

// Create a linked list without a cycle: 4 -> 5
const node4 = new ListNode(4);
node4.next = new ListNode(5);
console.log(hasCycle(node4)); // false

class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}
function hasCycle<T>(head: ListNode<T> | null): boolean {
  if (!head || !head.next) {
    return false; // No cycle if empty or single node points to null
  }

  let tortoise: ListNode<T> | null = head;
  let hare: ListNode<T> | null = head;

  while (hare !== null && hare.next !== null) {
    tortoise = tortoise!.next; // Tortoise moves 1 step
    hare = hare.next.next; // Hare moves 2 steps

    if (tortoise === hare) {
      return true; // Cycle detected
    }
  }

  return false; // Hare reached null (end of list)
}
// Test 1: No cycle
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
node1.next = node2;
node2.next = node3;
console.log(hasCycle(node1)); // false

// Test 2: Cycle present
node3.next = node1; // Creates a loop back to node1
console.log(hasCycle(node1)); // true

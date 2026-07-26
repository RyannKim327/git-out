// Node definition – feel free to replace this with your own class/struct
interface ListNode<T = unknown> {
  val: T;
  next: ListNode<T> | null;
}

function hasCycle<T>(head: ListNode<T> | null): boolean {
  // Two pointers that start at the head
  let slow: ListNode<T> | null = head;   // moves 1 step
  let fast: ListNode<T> | null = head;   // moves 2 steps

  while (fast && fast.next) {
    slow = slow!.next;          // advance one step
    fast = fast.next.next;      // advance two steps

    if (slow === fast) {        // they met → cycle detected
      return true;
    }
  }

  // fast ran out of nodes → no cycle
  return false;
}
function hasCycleWithSet<T>(head: ListNode<T> | null): boolean {
  const seen = new Set<ListNode<T>>();
  let current = head;

  while (current) {
    if (seen.has(current)) return true; // loop!
    seen.add(current);
    current = current.next;
  }
  return false;
}
function findCycleStart<T>(head: ListNode<T> | null): ListNode<T> | null {
  let slow = head, fast = head;

  // First, detect a cycle
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }

  // No cycle
  if (!fast || !fast.next) return null;

  // Move one pointer to the head; keep other where they met
  slow = head;
  while (slow !== fast) {
    slow = slow!.next;
    fast = fast!.next;
  }
  return slow; // the entry point of the cycle
}

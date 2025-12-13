/**
 * A singly‑linked list node.
 *
 * @template T – the type of the stored value.
 */
export interface ListNode<T = any> {
  /** The payload stored in the node. */
  value: T;
  /** Reference to the next node (or `null` if this is the tail). */
  next: ListNode<T> | null;
}
/**
 * Detects whether a singly‑linked list contains a cycle.
 *
 * This is the classic Floyd’s Tortoise‑and‑Hare algorithm:
 *   - `slow` moves one step at a time.
 *   - `fast` moves two steps at a time.
 * If a cycle exists, `slow` and `fast` will eventually meet.
 *
 * @param head - The first node of the list (or `null` for an empty list).
 * @returns `true` if a cycle is found, otherwise `false`.
 */
export function hasCycle<T>(head: ListNode<T> | null): boolean {
  // Empty list or a single node without a self‑loop cannot have a cycle.
  if (!head || !head.next) return false;

  let slow: ListNode<T> | null = head;          // moves 1 step
  let fast: ListNode<T> | null = head.next;    // moves 2 steps

  while (fast && fast.next) {
    if (slow === fast) {
      // The two pointers met → there is a loop.
      return true;
    }
    slow = slow!.next;               // safe because we checked `slow` above
    fast = fast.next.next;           // move two steps
  }

  // `fast` reached the end of the list → no loop.
  return false;
}
/**
 * Detects a cycle by remembering every node we have visited.
 *
 * @param head - The first node of the list (or `null`).
 * @returns `true` if a cycle is found, otherwise `false`.
 */
export function hasCycleWithSet<T>(head: ListNode<T> | null): boolean {
  const visited = new Set<ListNode<T>>();

  let current = head;
  while (current) {
    if (visited.has(current)) {
      // We have seen this node before → cycle.
      return true;
    }
    visited.add(current);
    current = current.next;
  }

  // Reached the tail (`null`) without repeats.
  return false;
}
// ---------------------------------------------------------------
// Helper to create a list from an array (no cycle)
function buildList<T>(values: T[]): ListNode<T> | null {
  if (values.length === 0) return null;
  const head: ListNode<T> = { value: values[0], next: null };
  let cur = head;
  for (let i = 1; i < values.length; i++) {
    cur.next = { value: values[i], next: null };
    cur = cur.next;
  }
  return head;
}

// ---------------------------------------------------------------
// Helper to create a list with a cycle.
// `cycleAt` is the index (0‑based) of the node that the last node should point to.
// Pass `null` for `cycleAt` to get an acyclic list.
function buildListWithCycle<T>(values: T[], cycleAt: number | null): ListNode<T> | null {
  const head = buildList(values);
  if (head === null) return null;
  if (cycleAt === null) return head;

  // Find the node at position `cycleAt`
  let target: ListNode<T> | null = head;
  for (let i = 0; i < cycleAt; i++) {
    if (!target?.next) throw new Error('cycleAt index out of bounds');
    target = target.next;
  }

  // Find the tail
  let tail = head;
  while (tail.next) tail = tail.next;

  // Create the loop
  tail.next = target;
  return head;
}

// ---------------------------------------------------------------
// Demo
function demo() {
  const acyclic = buildList([1, 2, 3, 4, 5]);
  const cyclic   = buildListWithCycle([10, 20, 30, 40], 1); // tail points back to node with value 20

  console.log('Acyclic list has cycle (Floyd):', hasCycle(acyclic)); // false
  console.log('Cyclic list has cycle (Floyd):',   hasCycle(cyclic));   // true

  console.log('Acyclic list has cycle (Set):',   hasCycleWithSet(acyclic)); // false
  console.log('Cyclic list has cycle (Set):',    hasCycleWithSet(cyclic));   // true
}

demo();
Acyclic list has cycle (Floyd): false
Cyclic list has cycle (Floyd): true
Acyclic list has cycle (Set): false
Cyclic list has cycle (Set): true
/**
 * Returns the node where the cycle begins, or `null` if there is no cycle.
 */
export function findCycleStart<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (!head) return null;

  // Phase 1 – detect meeting point
  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;
  let hasLoop = false;

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) {
      hasLoop = true;
      break;
    }
  }

  if (!hasLoop) return null; // no cycle

  // Phase 2 – find entry point
  let ptr1: ListNode<T> | null = head;
  let ptr2: ListNode<T> | null = slow; // meeting point

  while (ptr1 !== ptr2) {
    ptr1 = ptr1!.next;
    ptr2 = ptr2!.next;
  }
  return ptr1; // or ptr2 – both point to the start of the loop
}

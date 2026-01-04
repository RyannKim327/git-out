/**
 * A singly‑linked list node.
 *
 * The generic `T` lets you store any payload you like (number, string, object …).
 */
export interface ListNode<T = any> {
  /** The value stored in the node */
  value: T;
  /** Reference to the next node (or `null` if this is the tail) */
  next: ListNode<T> | null;
}
/**
 * Returns `true` if the linked list that starts at `head` contains a cycle.
 *
 * The algorithm moves two pointers:
 *   - `slow` advances one step each iteration.
 *   - `fast` advances two steps each iteration.
 *
 * If a cycle exists, the fast pointer will eventually “lap” the slow pointer.
 *
 * @param head The first node of the list (or `null` for an empty list)
 * @returns `true` if a cycle is found, otherwise `false`
 */
export function hasCycle<T>(head: ListNode<T> | null): boolean {
  // Empty list or a single node without a self‑loop cannot have a cycle.
  if (!head || !head.next) return false;

  let slow: ListNode<T> | null = head;          // moves 1 step
  let fast: ListNode<T> | null = head.next;    // moves 2 steps

  while (fast && fast.next) {
    if (slow === fast) {
      // The two pointers met → there is a cycle.
      return true;
    }
    slow = slow.next;               // 1 step
    fast = fast.next.next;          // 2 steps
  }

  // Fast reached the end of the list → no cycle.
  return false;
}
/**
 * Detect a cycle by remembering every node we have seen.
 *
 * @param head The first node of the list (or `null`)
 * @returns `true` if a node is visited twice → a cycle exists
 */
export function hasCycleWithSet<T>(head: ListNode<T> | null): boolean {
  const visited = new Set<ListNode<T>>();

  let current = head;
  while (current) {
    if (visited.has(current)) {
      return true; // we have seen this node before → cycle
    }
    visited.add(current);
    current = current.next;
  }
  return false; // reached the tail (null) without repeats
}
// Helper to create a linear list from an array of values.
function buildList<T>(values: T[]): ListNode<T> | null {
  if (values.length === 0) return null;
  const head: ListNode<T> = { value: values[0], next: null };
  let cur = head;
  for (let i = 1; i < values.length; ++i) {
    cur.next = { value: values[i], next: null };
    cur = cur.next;
  }
  return head;
}

// ------------------------------------------------------------------
// 1️⃣ A normal (acyclic) list
const acyclic = buildList([1, 2, 3, 4, 5]);
console.log('acyclic → hasCycle?', hasCycle(acyclic));          // false
console.log('acyclic → hasCycleWithSet?', hasCycleWithSet(acyclic)); // false

// ------------------------------------------------------------------
// 2️⃣ A list with a cycle: 1 → 2 → 3 → 4 → 5 → (back to 3)
const cyclic = buildList([1, 2, 3, 4, 5])!;
let tail = cyclic;
while (tail.next) tail = tail.next; // now `tail` points to node 5

// Find node with value 3 to create the loop.
let loopNode: ListNode<number> | null = cyclic;
while (loopNode && loopNode.value !== 3) loopNode = loopNode.next;
if (!loopNode) throw new Error('Loop node not found (should not happen)');

tail.next = loopNode; // create the cycle

console.log('cyclic → hasCycle?', hasCycle(cyclic));          // true
console.log('cyclic → hasCycleWithSet?', hasCycleWithSet(cyclic)); // true
acyclic → hasCycle? false
acyclic → hasCycleWithSet? false
cyclic → hasCycle? true
cyclic → hasCycleWithSet? true
/**
 * If a cycle exists, returns the node where the cycle begins.
 * If there is no cycle, returns `null`.
 */
export function findCycleStart<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (!head) return null;

  // Phase 1 – detect cycle (same as `hasCycle`)
  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;

  while (fast && fast.next) {
    slow = slow!.next!;
    fast = fast.next.next!;
    if (slow === fast) {
      // Phase 2 – locate start
      let ptr1: ListNode<T> | null = head;
      let ptr2: ListNode<T> | null = slow;
      while (ptr1 !== ptr2) {
        ptr1 = ptr1!.next!;
        ptr2 = ptr2!.next!;
      }
      return ptr1; // start of the loop
    }
  }
  return null; // no cycle
}

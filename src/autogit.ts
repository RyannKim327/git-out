// Define the Node structure
class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

// Function to detect cycle using Floyd's algorithm
function hasCycle<T>(head: ListNode<T> | null): boolean {
  if (!head || !head.next) {
    return false;
  }

  let slow = head;      // Tortoise - moves one step at a time
  let fast = head;      // Hare - moves two steps at a time

  while (fast && fast.next) {
    slow = slow.next;        // Move slow pointer one step
    fast = fast.next.next;   // Move fast pointer two steps

    // If they meet, there's a cycle
    if (slow === fast) {
      return true;
    }
  }

  // If fast reaches the end, no cycle
  return false;
}

// Alternative: Return the cycle entry point (optional)
function detectCycle<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (!head || !head.next) {
    return null;
  }

  let slow = head;
  let fast = head;

  // Phase 1: Find if there's a cycle
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    
    if (slow === fast) {
      // Phase 2: Find cycle entry point
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow; // Entry point of the cycle
    }
  }

  return null; // No cycle
}
// Helper function to create a linked list with optional cycle
function createListWithCycle(
  values: number[], 
  cycleStartIndex: number = -1
): ListNode<number> {
  if (values.length === 0) return null;

  const head = new ListNode(values[0]);
  let current = head;

  for (let i = 1; i < values.length; i++) {
    current.next = new ListNode(values[i]);
    current = current.next;
  }

  // Create cycle if specified
  if (cycleStartIndex >= 0 && cycleStartIndex < values.length) {
    current.next = values[cycleStartIndex] 
      ? head.next?.next // Point to the node at cycleStartIndex
      : head;
  }

  return head;
}

// Test cases
function testCycleDetection() {
  // Test 1: List without cycle
  const list1 = createListWithCycle([3, 2, 0, -4], -1);
  console.log('List without cycle:', hasCycle(list1)); // false

  // Test 2: List with cycle
  const list2 = createListWithCycle([1, 2], 0); // 1 -> 2 -> 1 (cycle)
  console.log('List with cycle:', hasCycle(list2)); // true

  // Test 3: Single node (no cycle)
  const singleNode = new ListNode(1);
  console.log('Single node:', hasCycle(singleNode)); // false

  // Test 4: Two nodes with cycle
  const list3 = createListWithCycle([1, 2], 1); // 1 -> 2 -> 2 (cycle at 2)
  console.log('Two nodes with cycle:', hasCycle(list3)); // true

  // Test cycle detection (find entry point)
  const cycleList = createListWithCycle([3, 2, 0, -4], 1); // 3 -> 2 -> 0 -> -4 -> 2
  const cycleEntry = detectCycle(cycleList);
  console.log('Cycle entry point value:', cycleEntry?.value); // 2
}

testCycleDetection();
function hasCycleHashSet<T>(head: ListNode<T> | null): boolean {
  const visited = new Set<ListNode<T>>();
  
  let current = head;
  
  while (current) {
    if (visited.has(current)) {
      return true; // Cycle detected
    }
    visited.add(current);
    current = current.next;
  }
  
  return false; // No cycle
}

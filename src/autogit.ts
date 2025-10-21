// Define the LinkedList Node
class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

function hasCycle(head: ListNode<any> | null): boolean {
  // Handle empty list or single node
  if (!head || !head.next) {
    return false;
  }

  let slow = head;  // Moves one step at a time
  let fast = head;  // Moves two steps at a time

  while (fast && fast.next) {
    slow = slow.next;        // Tortoise moves 1 step
    fast = fast.next.next;   // Hare moves 2 steps

    // If they meet, there's a cycle
    if (slow === fast) {
      return true;
    }
  }

  // Fast reaches end, no cycle
  return false;
}
// Helper function to create a cycle for testing
function createCycle(head: ListNode<number>, cyclePosition: number): void {
  if (cyclePosition < 0) return;
  
  let current = head;
  let cycleNode: ListNode<number> | null = null;
  
  // Find the node at cycle position
  for (let i = 0; i < cyclePosition; i++) {
    if (current) {
      current = current.next!;
    }
  }
  
  cycleNode = current;
  
  // Find the last node and point it to cycleNode
  while (current && current.next) {
    current = current.next;
  }
  
  if (current) {
    current.next = cycleNode;
  }
}

// Test cases
function testCycleDetection() {
  // Test 1: List with cycle
  const head1 = new ListNode(3);
  head1.next = new ListNode(7);
  head1.next!.next = new ListNode(8);
  head1.next!.next!.next = new ListNode(10);
  createCycle(head1, 0); // Create cycle at position 0
  
  console.log('Test 1 (has cycle):', hasCycle(head1)); // true

  // Test 2: List without cycle
  const head2 = new ListNode(1);
  head2.next = new ListNode(2);
  head2.next!.next = new ListNode(3);
  head2.next!.next!.next = null;
  
  console.log('Test 2 (no cycle):', hasCycle(head2)); // false

  // Test 3: Single node
  const head3 = new ListNode(1);
  console.log('Test 3 (single node):', hasCycle(head3)); // false

  // Test 4: Empty list
  console.log('Test 4 (empty list):', hasCycle(null)); // false

  // Test 5: Two nodes with cycle
  const head5 = new ListNode(1);
  head5.next = new ListNode(2);
  head5.next!.next = head5; // Direct cycle
  console.log('Test 5 (two nodes cycle):', hasCycle(head5)); // true
}

testCycleDetection();
function hasCycleWithSet(head: ListNode<any> | null): boolean {
  const visited = new Set<ListNode<any>>();
  
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

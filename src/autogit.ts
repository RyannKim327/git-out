class ListNode {
  val: number;
  next: ListNode | null;
  
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  const visited = new Set<ListNode>();
  
  // Traverse first list and store all nodes
  let currentA = headA;
  while (currentA !== null) {
    visited.add(currentA);
    currentA = currentA.next;
  }
  
  // Traverse second list and check for intersection
  let currentB = headB;
  while (currentB !== null) {
    if (visited.has(currentB)) {
      return currentB; // Intersection found
    }
    currentB = currentB.next;
  }
  
  return null; // No intersection
}
function getIntersectionNodeTwoPointers(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  if (!headA || !headB) return null;
  
  let ptrA: ListNode | null = headA;
  let ptrB: ListNode | null = headB;
  
  // When one pointer reaches end, switch to the other list
  while (ptrA !== ptrB) {
    ptrA = ptrA === null ? headB : ptrA.next;
    ptrB = ptrB === null ? headA : ptrB.next;
  }
  
  return ptrA; // Either intersection point or null
}
function getIntersectionNodeByLength(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  // Helper function to get length
  const getLength = (head: ListNode | null): number => {
    let length = 0;
    let current = head;
    while (current !== null) {
      length++;
      current = current.next;
    }
    return length;
  };
  
  const lengthA = getLength(headA);
  const lengthB = getLength(headB);
  
  let longer: ListNode | null = lengthA >= lengthB ? headA : headB;
  let shorter: ListNode | null = lengthA >= lengthB ? headB : headA;
  
  // Move longer pointer forward by the difference
  const diff = Math.abs(lengthA - lengthB);
  for (let i = 0; i < diff && longer !== null; i++) {
    longer = longer.next;
  }
  
  // Now traverse both lists together
  while (longer !== null && shorter !== null) {
    if (longer === shorter) {
      return longer;
    }
    longer = longer.next;
    shorter = shorter.next;
  }
  
  return null;
}
// Create test linked lists
function createLinkedList(values: number[]): ListNode | null {
  if (values.length === 0) return null;
  
  const head = new ListNode(values[0]);
  let current = head;
  
  for (let i = 1; i < values.length; i++) {
    current.next = new ListNode(values[i]);
    current = current.next;
  }
  
  return head;
}

// Helper to get tail node
function getTail(head: ListNode | null): ListNode | null {
  if (!head) return null;
  
  let current = head;
  while (current.next !== null) {
    current = current.next;
  }
  return current;
}

// Test the intersection detection
function testIntersection(): void {
  // Create independent lists
  const listA = createLinkedList([4, 1, 8, 4, 5]);
  const listB = createLinkedList([5, 6, 1]);
  
  // Manually create intersection at node with value 8
  if (listA && listB) {
    // Skip first two nodes in list A to get to node with value 8
    let intersectionNode = listA;
    for (let i = 0; i < 2 && intersectionNode; i++) {
      intersectionNode = intersectionNode.next!;
    }
    
    // Connect listB's tail to the intersection node
    getTail(listB)!.next = intersectionNode;
  }
  
  const intersection = getIntersectionNode(listA, listB);
  
  if (intersection) {
    console.log(`Intersection found at node with value: ${intersection.val}`);
  } else {
    console.log("No intersection found");
  }
}

// Run test
testIntersection();

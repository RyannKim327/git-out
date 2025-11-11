class ListNode {
  constructor(
    public val: number,
    public next: ListNode | null = null
  ) {}
}

function getIntersectionNodeHash(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  const visited = new Set<ListNode>();
  
  // Traverse first list and store all nodes in set
  let currentA = headA;
  while (currentA !== null) {
    visited.add(currentA);
    currentA = currentA.next;
  }
  
  // Traverse second list and check for intersection
  let currentB = headB;
  while (currentB !== null) {
    if (visited.has(currentB)) {
      return currentB;
    }
    currentB = currentB.next;
  }
  
  return null;
}
function getIntersectionNodeTwoPointers(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  if (!headA || !headB) return null;
  
  let pointerA: ListNode | null = headA;
  let pointerB: ListNode | null = headB;
  
  while (pointerA !== pointerB) {
    // Move both pointers forward
    pointerA = pointerA ? pointerA.next : headB;
    pointerB = pointerB ? pointerB.next : headA;
  }
  
  return pointerA;
}
function getIntersectionNodeLength(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  if (!headA || !headB) return null;
  
  // Get lengths of both lists
  const lengthA = getLength(headA);
  const lengthB = getLength(headB);
  
  let longer = lengthA >= lengthB ? headA : headB;
  let shorter = lengthA < lengthB ? headA : headB;
  const diff = Math.abs(lengthA - lengthB);
  
  // Move longer list pointer forward by difference
  for (let i = 0; i < diff; i++) {
    longer = longer!.next;
  }
  
  // Move both pointers until they meet
  while (longer !== shorter) {
    longer = longer!.next;
    shorter = shorter!.next;
  }
  
  return longer;
}

function getLength(head: ListNode | null): number {
  let length = 0;
  let current = head;
  while (current !== null) {
    length++;
    current = current.next;
  }
  return length;
}
// Linked List utility functions
class LinkedListUtil {
  static createList(values: number[]): ListNode | null {
    if (values.length === 0) return null;
    
    const head = new ListNode(values[0]);
    let current = head;
    
    for (let i = 1; i < values.length; i++) {
      current.next = new ListNode(values[i]);
      current = current.next;
    }
    
    return head;
  }
  
  static getTail(head: ListNode | null): ListNode | null {
    if (!head) return null;
    
    let current = head;
    while (current.next !== null) {
      current = current.next;
    }
    return current;
  }
  
  static getNodeAt(head: ListNode | null, index: number): ListNode | null {
    let current = head;
    for (let i = 0; i < index && current !== null; i++) {
      current = current.next;
    }
    return current;
  }
}

// Test function
function testIntersection(): void {
  // Create lists: listA = [1,2,3,4,5], listB = [9,8]
  const listA = LinkedListUtil.createList([1, 2, 3, 4, 5]);
  const listB = LinkedListUtil.createList([9, 8]);
  
  // Make intersection at node with value 3 (index 2 in listA)
  const intersectionNode = LinkedListUtil.getNodeAt(listA, 2); // Node with value 3
  const tailB = LinkedListUtil.getTail(listB);
  
  if (tailB && intersectionNode) {
    tailB.next = intersectionNode;
  }
  
  // Test all methods
  console.log('Testing intersection detection:');
  
  const result1 = getIntersectionNodeHash(listA, listB);
  console.log('Hash method:', result1?.val); // Should output 3
  
  const result2 = getIntersectionNodeTwoPointers(listA, listB);
  console.log('Two pointers method:', result2?.val); // Should output 3
  
  const result3 = getIntersectionNodeLength(listA, listB);
  console.log('Length method:', result3?.val); // Should output 3
  
  // Test with no intersection
  const listC = LinkedListUtil.createList([6, 7]);
  const result4 = getIntersectionNodeHash(listA, listC);
  console.log('No intersection:', result4); // Should output null
}

// Run tests
testIntersection();

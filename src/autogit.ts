class ListNode {
  val: number;
  next: ListNode | null;
  
  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function findMiddle(head: ListNode | null): ListNode | null {
  if (!head) return null;
  
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }
  
  return slow;
}

// Usage example
const list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
console.log(findMiddle(list)?.val); // Output: 3
function findMiddleWithCount(head: ListNode | null): ListNode | null {
  if (!head) return null;
  
  let count = 0;
  let current: ListNode | null = head;
  
  // Count total nodes
  while (current) {
    count++;
    current = current.next;
  }
  
  // Find middle position
  const middlePos = Math.floor(count / 2);
  
  // Traverse to middle
  current = head;
  for (let i = 0; i < middlePos; i++) {
    current = current!.next;
  }
  
  return current;
}
function findMiddleWithArray(head: ListNode | null): ListNode | null {
  if (!head) return null;
  
  const nodes: ListNode[] = [];
  let current: ListNode | null = head;
  
  while (current) {
    nodes.push(current);
    current = current.next;
  }
  
  return nodes[Math.floor(nodes.length / 2)];
}
class LinkedList {
  head: ListNode | null = null;
  
  add(val: number): void {
    const newNode = new ListNode(val);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }
  
  findMiddle(): ListNode | null {
    if (!this.head) return null;
    
    let slow = this.head;
    let fast = this.head;
    
    while (fast && fast.next) {
      slow = slow!.next!;
      fast = fast.next.next!;
    }
    
    return slow;
  }
}

// Test cases
const list1 = new LinkedList(); // Empty list
console.log(list1.findMiddle()); // null

const list2 = new LinkedList(); // Single element
list2.add(1);
console.log(list2.findMiddle()?.val); // 1

const list3 = new LinkedList(); // Even number of elements
list3.add(1);
list3.add(2);
list3.add(3);
list3.add(4);
console.log(list3.findMiddle()?.val); // 3 (second middle for even lists)

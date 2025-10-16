class ListNode {
  constructor(public val: number, public next: ListNode | null = null) {}
}

function findNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (!head || n <= 0) return null;
  
  let fast: ListNode | null = head;
  let slow: ListNode | null = head;
  
  // Move fast pointer n nodes ahead
  for (let i = 0; i < n; i++) {
    if (!fast) return null; // List has fewer than n nodes
    fast = fast.next;
  }
  
  // Move both pointers until fast reaches the end
  while (fast !== null) {
    slow = slow!.next;
    fast = fast.next;
  }
  
  return slow;
}
function findNthFromEndLength(head: ListNode | null, n: number): ListNode | null {
  if (!head || n <= 0) return null;
  
  // Calculate length of the list
  let length = 0;
  let current: ListNode | null = head;
  
  while (current !== null) {
    length++;
    current = current.next;
  }
  
  // Check if n is valid
  if (n > length) return null;
  
  // Find the (length - n + 1)th node from beginning
  const targetPos = length - n;
  current = head;
  
  for (let i = 0; i < targetPos; i++) {
    current = current!.next;
  }
  
  return current;
}
function findNthFromEndRecursive(head: ListNode | null, n: number): { node: ListNode | null, count: number } {
  if (!head) {
    return { node: null, count: 0 };
  }
  
  const result = findNthFromEndRecursive(head.next, n);
  
  if (result.count === n) {
    return { node: head, count: result.count + 1 };
  }
  
  return { node: result.node, count: result.count + 1 };
}

function nthFromEndRecursive(head: ListNode | null, n: number): ListNode | null {
  return findNthFromEndRecursive(head, n).node;
}
class ListNode {
  constructor(public val: number, public next: ListNode | null = null) {}
}

function createLinkedList(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;
  
  const head = new ListNode(arr[0]);
  let current = head;
  
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  
  return head;
}

function printLinkedList(head: ListNode | null): string {
  const result: number[] = [];
  let current = head;
  
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  
  return result.join(' -> ');
}

// Test the implementation
const list = createLinkedList([1, 2, 3, 4, 5, 6]);
console.log('List:', printLinkedList(list));

const secondFromEnd = findNthFromEnd(list, 2);
console.log('2nd from end:', secondFromEnd?.val); // Output: 5

const lastNode = findNthFromEnd(list, 1);
console.log('Last node:', lastNode?.val); // Output: 6

const firstNode = findNthFromEnd(list, 6);
console.log('First node:', firstNode?.val); // Output: 1

const invalidNode = findNthFromEnd(list, 10);
console.log('Invalid position:', invalidNode?.val); // Output: undefined
// Edge cases test
const emptyList = createLinkedList([]);
console.log('Empty list:', findNthFromEnd(emptyList, 1)); // null

const singleNodeList = createLinkedList([1]);
console.log('Single node 1st:', findNthFromEnd(singleNodeList, 1)?.val); // 1
console.log('Single node 2nd:', findNthFromEnd(singleNodeList, 2)); // null

console.log('Negative n:', findNthFromEnd(list, -1)); // null
console.log('Zero n:', findNthFromEnd(list, 0)); // null

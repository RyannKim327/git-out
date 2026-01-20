interface ListNode {
  val: number;          // or whatever type you prefer
  next: ListNode | null;
}

function isPalindromeIterative(head: ListNode | null): boolean {
  if (!head) return true;

  const stack: number[] = [];
  let cur: ListNode | null = head;

  // Push all values on the stack
  while (cur) {
    stack.push(cur.val);
    cur = cur.next;
  }

  // Compare while traversing again
  cur = head;
  while (cur) {
    if (cur.val !== stack.pop()) {
      return false;
    }
    cur = cur.next;
  }

  return true;
}
function isPalindromeOptimized(head: ListNode | null): boolean {
  if (!head || !head.next) return true;

  // 1. Find the middle (slow will point to middle)
  let slow = head;
  let fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  // 2. Reverse the second half
  let prev: ListNode | null = null;
  let curr = slow.next;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  // `prev` is now the head of the reversed second half

  // 3. Compare the two halves
  let first = head;
  let second = prev;
  let result = true;
  while (result && second) {        // second will be shorter or equal
    if (first.val !== second.val) result = false;
    first = first.next!;
    second = second.next!;
  }

  // 4. (Optional) Restore the list
  // Reverse the second half again to bring the list back to original
  curr = prev;
  prev = null;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  slow.next = prev;

  return result;
}
function buildList(arr: number[]): ListNode | null {
  let dummy: ListNode = { val: 0, next: null };
  let tail = dummy;
  for (const v of arr) {
    tail.next = { val: v, next: null };
    tail = tail.next;
  }
  return dummy.next;
}

const a = buildList([1, 2, 3, 2, 1]);
console.log(isPalindromeIterative(a));   // true
console.log(isPalindromeOptimized(a));   // true

const b = buildList([1, 2, 3, 4]);
console.log(isPalindromeIterative(b));   // false
console.log(isPalindromeOptimized(b));   // false

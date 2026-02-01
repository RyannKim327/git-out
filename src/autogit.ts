/**
 * A singly‑linked list node that holds a generic value.
 */
export class ListNode<T> {
  constructor(
    public val: T,
    public next: ListNode<T> | null = null
  ) {}
}
/**
 * Returns true iff the linked list is a palindrome.
 */
export function isPalindrome<T>(head: ListNode<T> | null): boolean {
  if (!head || !head.next) return true; // empty or single node

  /* ---------- 1️⃣ Find middle ---------- */
  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;

  while (fast.next && fast.next.next) {
    slow = slow!.next!;   // move one step
    fast = fast.next.next; // move two steps
  }

  /* ---------- 2️⃣ Reverse second half ---------- */
  let prev: ListNode<T> | null = null;
  let curr: ListNode<T> | null = slow;

  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  const secondHalfHead = prev; // start of reversed half

  /* ---------- 3️⃣ Compare halves ---------- */
  let p1: ListNode<T> | null = head;
  let p2: ListNode<T> | null = secondHalfHead;

  let isPal = true;
  while (isPal && p2) {           // p2 is half the length
    if (p1!.val !== p2!.val) {
      isPal = false;
      break;
    }
    p1 = p1!.next;
    p2 = p2!.next;
  }

  /* ---------- (Optional) 4️⃣ Restore list ---------- */
  // reverse again to keep original structure
  curr = secondHalfHead;
  prev = null;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  if (slow!.next) { // connect back
    slow!.next = prev;
  }

  return isPal;
}
function build<T>(arr: T[]): ListNode<T> | null {
  let dummy = new ListNode<T>(null as any);
  let cur = dummy;
  for (const v of arr) {
    cur.next = new ListNode<T>(v);
    cur = cur.next;
  }
  return dummy.next;
}

const tests = [
  { arr: [1, 2, 3, 2, 1], expected: true },
  { arr: [1, 2, 2, 1], expected: true },
  { arr: [1, 2, 3], expected: false },
  { arr: [], expected: true },
  { arr: [42], expected: true },
  { arr: [7, 8, 7, 9], expected: false }
];

for (const {arr, expected} of tests) {
  const h = build(arr);
  console.log(`isPalindrome(${JSON.stringify(arr)}) =>`, isPalindrome(h), 'expected', expected);
}
isPalindrome([1,2,3,2,1]) => true expected true
isPalindrome([1,2,2,1]) => true expected true
isPalindrome([1,2,3]) => false expected false
isPalindrome([]) => true expected true
isPalindrome([42]) => true expected true
isPalindrome([7,8,7,9]) => false expected false
function isPalindromeStack<T>(head: ListNode<T> | null): boolean {
  const vals: T[] = [];
  for (let cur = head; cur; cur = cur.next) vals.push(cur.val);

  let l = 0, r = vals.length - 1;
  while (l < r) {
    if (vals[l++] !== vals[r--]) return false;
  }
  return true;
}

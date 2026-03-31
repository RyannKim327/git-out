// ---------------  Node definition --------------------
export class ListNode<T> {
  constructor(
    public val: T,
    public next: ListNode<T> | null = null
  ) {}
}

// ---------------  Main logic --------------------
export function isPalindrome<T>(head: ListNode<T> | null): boolean {
  if (!head || !head.next) return true;  // empty or single element

  // 1️⃣ Find middle
  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;
  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  // 2️⃣ Reverse second half
  let prev: ListNode<T> | null = null;
  let curr: ListNode<T> | null = slow; // start at middle
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  // now `prev` points to head of reversed second half

  // 3️⃣ Compare halves
  let p1 = head;
  let p2 = prev;
  while (p2) {           // only need to loop over the shorter half
    if (p1!.val !== p2!.val) return false;
    p1 = p1!.next;
    p2 = p2!.next;
  }

  // 4️⃣ (Optional) Put list back together
  // Reverse again and re‑attach to original first half
  curr = prev;
  prev = null;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  // `prev` is the head of the original second half again

  return true;
}
export function isPalindromeFunctional<T>(head: ListNode<T> | null): boolean {
  const vals: T[] = [];
  for (let cur = head; cur; cur = cur.next) vals.push(cur.val);
  for (let i = 0, j = vals.length - 1; i < j; i++, j--) {
    if (vals[i] !== vals[j]) return false;
  }
  return true;
}
const build = (arr: number[]) => {
  let dummy = new ListNode(0);
  let curr = dummy;
  for (const x of arr) {
    curr.next = new ListNode(x);
    curr = curr.next;
  }
  return dummy.next;
};

console.log(isPalindrome(build([1,2,3,2,1]))); // true
console.log(isPalindrome(build([1,2,3,4,5]))); // false

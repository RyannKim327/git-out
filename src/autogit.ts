type Node<T> = { val: T; next: Node<T> | null };

function isPalindrome<T>(head: Node<T> | null): boolean {
  if (!head || !head.next) return true;

  // 1) Find middle (slow‑fast)
  let slow = head;
  let fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  // 2) Reverse the second half
  let second = reverse(slow.next!);
  slow.next = null;           // detach first half

  // 3) Compare halves
  let p1 = head;
  let p2 = second;
  while (p2) {
    if (p1!.val !== p2.val) return false;
    p1 = p1!.next;
    p2 = p2.next;
  }

  // 4) (optional) restore the list
  slow.next = reverse(second); // put it back

  return true;
}

function reverse<T>(head: Node<T>): Node<T> {
  let prev: Node<T> | null = null;
  let cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev!;
}
function isPalindromeWith<T>(
  head: Node<T> | null,
  equal: (a: T, b: T) => boolean
): boolean {
  if (!head || !head.next) return true;
  // … same first steps as before …
  while (p2) {
    if (!equal(p1!.val, p2.val)) return false;
    p1 = p1!.next;
    p2 = p2.next;
  }
  return true;
}
function isPalindromeStack<T>(head: Node<T> | null): boolean {
  const stack: T[] = [];
  for (let cur = head; cur; cur = cur.next) stack.push(cur.val);

  for (let cur = head; cur; cur = cur.next) {
    if (cur.val !== stack.pop()) return false;
  }
  return true;
}

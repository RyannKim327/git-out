interface ListNode<T> {
  val: T;
  next: ListNode<T> | null;
}
const head: ListNode<number> = { val: 1, next: null };
head.next = { val: 2, next: null };
head.next.next = { val: 3, next: null };      // 1 → 2 → 3
function middle<T>(head: ListNode<T> | null): ListNode<T> | null {
  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;

  while (fast !== null && fast.next !== null) {
    slow = slow?.next ?? null;   // advance by 1
    fast = fast.next.next;       // advance by 2
  }

  return slow; // could be null if the list was empty
}
if (fast !== null) {            // original list had even length
  slow = slow?.next ?? null;    // bump to the second middle
}
function toArray<T>(head: ListNode<T> | null): T[] {
  const arr: T[] = [];
  for (let cur = head; cur; cur = cur.next) arr.push(cur.val);
  return arr;
}

const list: ListNode<number> | null = {
  val: 10,
  next: { val: 20, next: { val: 30, next: null } },
};

console.log(middle(list)?.val); // prints 20

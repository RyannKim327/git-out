function isPalindrome(head: ListNode | null): boolean {
  if (!head || !head.next) return true;

  // 1️⃣ Find the middle (fast/slow trick)
  let slow = head, fast = head, prev: ListNode | null = null;
  while (fast && fast.next) {
    // 2️⃣ Reverse the first half while we’re at it
    let nxt = slow.next!;
    slow.next = prev;
    prev = slow;
    slow = nxt;

    fast = fast.next.next;
  }

  // 3️⃣ If odd number of nodes skip the middle one
  if (fast) slow = slow.next;

  // 4️⃣ Compare the two halves
  let p1 = prev, p2 = slow;
  while (p1 && p2) {
    if (p1.val !== p2.val) return false;
    p1 = p1.next!;
    p2 = p2.next!;
  }
  return true;
}
interface ListNode {
  val: number | string;      // whatever you want to store
  next?: ListNode | null;    // `next` is optional to support the “end” of the list
}
/**
 * Returns true if the singly linked list is a palindrome.
 *
 * @param head - The head node of the linked list (or null).
 */
function isPalindrome(head: ListNode | null): boolean {
  if (!head || !head.next) return true; // 0 or 1 node → palindrome

  let slow = head;
  let fast = head;
  let prev: ListNode | null = null; // will become the head of the reversed first half

  // Step 1 & 2: find middle, reverse first half
  while (fast && fast.next) {
    // Reverse the link for `slow`'s current node
    const nextNode = slow.next!;
    slow.next = prev;
    prev = slow;
    slow = nextNode;

    fast = fast.next.next;
  }

  // Step 3: if odd length, skip the middle node
  if (fast) {
    slow = slow.next!;
  }

  // Step 4: compare nodes from the two halves
  let firstHalf = prev;
  let secondHalf = slow;
  while (firstHalf && secondHalf) {
    if (firstHalf.val !== secondHalf.val) return false;
    firstHalf = firstHalf.next!;
    secondHalf = secondHalf.next!;
  }

  return true;
}
// Helper to create a list from an array
function fromArray(arr: (number | string)[]): ListNode | null {
  if (!arr.length) return null;
  const head: ListNode = { val: arr[0] };
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = { val: arr[i] };
    current = current.next;
  }
  return head;
}

console.log(isPalindrome(fromArray([1, 2, 3, 2, 1]))); // true
console.log(isPalindrome(fromArray([1, 2, 3, 4, 5]))); // false
function isPalindromeStack(head: ListNode | null): boolean {
  const stack: (number | string)[] = [];
  let fast = head;
  let slow = head;

  // Push first half onto stack
  while (fast && fast.next) {
    stack.push(slow!.val);
    slow = slow!.next!;
    fast = fast.next.next;
  }

  // Skip middle element for odd length
  if (fast) slow = slow!.next!;

  // Compare the rest with stack
  while (slow) {
    if (stack.pop() !== slow.val) return false;
    slow = slow.next;
  }
  return true;
}

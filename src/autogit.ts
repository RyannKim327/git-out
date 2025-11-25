// ---------- Types ----------
type Node<T> = {
  value: T;
  next: Node<T> | null;
};

type LinkedList<T> = {
  head: Node<T> | null;
};

// ---------- Reverse ----------
function reverseSingly<T>(list: LinkedList<T>): LinkedList<T> {
  let prev: Node<T> | null = null;
  let curr = list.head;

  while (curr) {
    const next = curr.next; // save next
    curr.next = prev;       // flip pointer
    prev = curr;            // advance prev
    curr = next;            // advance curr
  }

  list.head = prev;         // new head is the last node we processed
  return list;
}

// ---------- Usage ----------
const list: LinkedList<number> = {
  head: {
    value: 1,
    next: {
      value: 2,
      next: { value: 3, next: null }
    }
  }
};

reverseSingly(list);
console.log(JSON.stringify(list, null, 2));
// → {"head":{"value":3,"next":{"value":2,"next":{"value":1,"next":null}}}}
type DNode<T> = {
  value: T;
  next: DNode<T> | null;
  prev: DNode<T> | null;
};

type DLinkedList<T> = {
  head: DNode<T> | null;
  tail: DNode<T> | null;
};

function reverseDoubly<T>(list: DLinkedList<T>): DLinkedList<T> {
  let curr = list.head;

  // swap next/prev for every node
  while (curr) {
    [curr.next, curr.prev] = [curr.prev, curr.next];
    curr = curr.prev; // move to what was originally the next node
  }

  // swap head/tail
  [list.head, list.tail] = [list.tail, list.head];
  return list;
}
function reverseRecursive<T>(
  node: Node<T> | null,
  prev: Node<T> | null = null
): Node<T> | null {
  if (!node) return prev;
  const next = node.next;
  node.next = prev;
  return reverseRecursive(next, node);
}

// usage: list.head = reverseRecursive(list.head);

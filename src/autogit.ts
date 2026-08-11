// A node that holds a value and a reference to the next node.
// Feel free to add more fields (e.g., prev, data…) as needed.
export interface Node<T> {
  value: T;
  next?: Node<T>;
}
export function length<T>(head: Node<T> | undefined): number {
  let count = 0;
  let current = head;

  while (current) {
    count++;
    current = current.next;
  }

  return count;
}
export function lengthRecursive<T>(node: Node<T> | undefined): number {
  return node ? 1 + lengthRecursive(node.next) : 0;
}
class LinkedList<T> {
  private head?: Node<T>;

  // ... push, pop, etc.

  size(): number {
    return length(this.head);   // or lengthRecursive(this.head)
  }
}
const node3: Node<string> = { value: "c" };
const node2: Node<string> = { value: "b", next: node3 };
const node1: Node<string> = { value: "a", next: node2 };

console.log(length(node1));          // → 3
console.log(lengthRecursive(node1)); // → 3

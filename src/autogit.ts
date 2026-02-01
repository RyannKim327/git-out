// ────────────────────────
// Node definition
// ────────────────────────
class Node<T> {
  value: T;
  next: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// ────────────────────────
// LinkedList implementation
// ────────────────────────
class LinkedList<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;

  // Append new value to list
  push(value: T): void {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = this.tail = newNode;
      return;
    }
    this.tail!.next = newNode;  // non‑null assertion is safe here
    this.tail = newNode;
  }

  // ────── length (iterative)
  // Return number of nodes
  length(): number {
    let count = 0;
    let current = this.head;
    while (current !== null) {
      count++;
      current = current.next;
    }
    return count;
  }

  // ────── length (recursive helper)
  private _recursiveLength(node: Node<T> | null): number {
    if (!node) return 0;
    return 1 + this._recursiveLength(node.next);
  }

  // Public wrapper for the recursive version
  recursiveLength(): number {
    return this._recursiveLength(this.head);
  }
}

// ────────────────────────
// Demo
// ────────────────────────
const list = new LinkedList<number>();
list.push(1);
list.push(2);
list.push(3);

console.log('Iterative length:', list.length());          // 3
console.log('Recursive length:', list.recursiveLength()); // 3

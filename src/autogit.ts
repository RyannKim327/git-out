class Node<T> {
  constructor(
    public val: T,
    public next: Node<T> | null = null
  ) {}
}
export class LinkedQueue<T> {
  private head: Node<T> | null = null   // front––dequeue → head
  private tail: Node<T> | null = null   // back––enqueue → tail
  private _size = 0

  /** Add an element to the back */
  enqueue(item: T): void {
    const newNode = new Node(item)
    if (!this.tail) {
      // First element: both head & tail point to it
      this.head = this.tail = newNode
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
    ++this._size
  }

  /** Remove and return the front element */
  dequeue(): T {
    if (!this.head) throw new Error('Queue is empty')

    const value = this.head.val
    this.head = this.head.next
    // If the queue becomes empty, clear tail as well
    if (!this.head) this.tail = null
    --this._size
    return value
  }

  /** Peek at front without removing */
  peek(): T | null {
    return this.head?.val ?? null
  }

  /** Number of elements */
  size(): number { return this._size }

  /** Convenience */
  isEmpty(): boolean { return this._size === 0 }
}
const q = new LinkedQueue<number>()

q.enqueue(10)
q.enqueue(20)
q.enqueue(30)

console.log(q.peek()) // 10
console.log(q.dequeue()) // 10
console.log(q.dequeue()) // 20
console.log(q.size()) // 1
console.log(q.isEmpty()) // false

q.dequeue() // 30
console.log(q.isEmpty()) // true
import { expect } from 'chai'
const q = new LinkedQueue<string>()

expect(q.isEmpty()).to.be.true
q.enqueue('a')
q.enqueue('b')
expect(q.size()).to.equal(2)
expect(q.peek()).to.equal('a')
expect(q.dequeue()).to.equal('a')
expect(q.dequeue()).to.equal('b')
expect(() => q.dequeue()).to.throw('Queue is empty')
head ──► … ──► tail

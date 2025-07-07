class BinaryHeap<T> {
    private heap: T[] = [];
    private compare: (a: T, b: T) => number;

    constructor(compare: (a: T, b: T) => number) {
        this.compare = compare;
    }

    private parent(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    private leftChild(index: number): number {
        return index * 2 + 1;
    }

    private rightChild(index: number): number {
        return index * 2 + 2;
    }

    private hasParent(index: number): boolean {
        return this.parent(index) >= 0;
    }

    private hasLeftChild(index: number): boolean {
        return this.leftChild(index) < this.heap.length;
    }

    private hasRightChild(index: number): boolean {
        return this.rightChild(index) < this.heap.length;
    }

    private swap(index1: number, index2: number): void {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }

    private heapifyUp(): void {
        let index = this.heap.length - 1;
        while (this.hasParent(index) && this.compare(this.heap[index], this.heap[this.parent(index)]) < 0) {
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
    }

    private heapifyDown(): void {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.leftChild(index);
            if (this.hasRightChild(index) && this.compare(this.heap[this.rightChild(index)], this.heap[smallerChildIndex]) < 0) {
                smallerChildIndex = this.rightChild(index);
            }

            if (this.compare(this.heap[index], this.heap[smallerChildIndex]) <= 0) {
                break;
            }

            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }

    public insert(item: T): void {
        this.heap.push(item);
        this.heapifyUp();
    }

    public remove(): T | null {
        if (this.heap.length === 0) {
            return null;
        }
        const item = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();
        return item;
    }

    public peek(): T | null {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    public size(): number {
        return this.heap.length;
    }

    public isEmpty(): boolean {
        return this.heap.length === 0;
    }
}
class PriorityQueue<T> {
    private heap: BinaryHeap<T>;

    constructor() {
        this.heap = new BinaryHeap<T>((a, b) => {
            // Change this comparison for max-heap
            return (a as any) - (b as any); // Assuming T can be cast to number
        });
    }

    public enqueue(item: T): void {
        this.heap.insert(item);
    }

    public dequeue(): T | null {
        return this.heap.remove();
    }

    public peek(): T | null {
        return this.heap.peek();
    }

    public size(): number {
        return this.heap.size();
    }

    public isEmpty(): boolean {
        return this.heap.isEmpty();
    }
}
const pq = new PriorityQueue<number>();

pq.enqueue(5);
pq.enqueue(3);
pq.enqueue(8);
pq.enqueue(1);

console.log(pq.peek()); // Output: 1
console.log(pq.dequeue()); // Output: 1
console.log(pq.peek()); // Output: 3
console.log(pq.size()); // Output: 3

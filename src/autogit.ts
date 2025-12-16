interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

function getLinkedListLength<T>(head: ListNode<T> | null): number {
    let length = 0;
    let current = head;
    
    while (current !== null) {
        length++;
        current = current.next;
    }
    
    return length;
}
function getLinkedListLengthRecursive<T>(head: ListNode<T> | null): number {
    if (head === null) {
        return 0;
    }
    
    return 1 + getLinkedListLengthRecursive(head.next);
}
class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    private head: ListNode<T> | null = null;
    
    // Add methods to populate the list
    add(value: T): void {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
    }
    
    // Method 1: Iterative length
    getLengthIterative(): number {
        let length = 0;
        let current = this.head;
        
        while (current !== null) {
            length++;
            current = current.next;
        }
        
        return length;
    }
    
    // Method 2: Recursive length
    getLengthRecursive(): number {
        return this.calculateLength(this.head);
    }
    
    private calculateLength(node: ListNode<T> | null): number {
        if (node === null) {
            return 0;
        }
        return 1 + this.calculateLength(node.next);
    }
    
    // Method 3: Length as property (cached)
    private _length: number = 0;
    
    get length(): number {
        return this._length;
    }
    
    // Update length when adding/removing nodes
    addWithLengthTracking(value: T): void {
        this.add(value);
        this._length++;
    }
}

// Usage Example
const list = new LinkedList<number>();
list.addWithLengthTracking(1);
list.addWithLengthTracking(2);
list.addWithLengthTracking(3);
list.addWithLengthTracking(4);

console.log(list.getLengthIterative()); // 4
console.log(list.getLengthRecursive()); // 4
console.log(list.length); // 4 (cached)
function getLengthFunctional<T>(head: ListNode<T> | null): number {
    let length = 0;
    let current = head;
    
    const nodes: ListNode<T>[] = [];
    while (current !== null) {
        nodes.push(current);
        current = current.next;
    }
    
    return nodes.reduce((acc) => acc + 1, 0);
}

class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

function findMiddle<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null;
    
    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;
    
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }
    
    return slow;
}
function findMiddleArray<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null;
    
    const nodes: ListNode<T>[] = [];
    let current: ListNode<T> | null = head;
    
    while (current) {
        nodes.push(current);
        current = current.next;
    }
    
    const middleIndex = Math.floor(nodes.length / 2);
    return nodes[middleIndex];
}
function findMiddleCount<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null;
    
    // Count total nodes
    let count = 0;
    let current: ListNode<T> | null = head;
    while (current) {
        count++;
        current = current.next;
    }
    
    // Find middle node
    const middleIndex = Math.floor(count / 2);
    current = head;
    for (let i = 0; i < middleIndex; i++) {
        current = current!.next;
    }
    
    return current;
}
class LinkedList<T> {
    head: ListNode<T> | null = null;
    tail: ListNode<T> | null = null;
    
    append(value: T): void {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }
    }
    
    findMiddle(): ListNode<T> | null {
        return findMiddle(this.head);
    }
    
    toString(): string {
        const values: T[] = [];
        let current = this.head;
        while (current) {
            values.push(current.value);
            current = current.next;
        }
        return values.join(' -> ');
    }
}

// Usage example
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);

console.log('List:', list.toString());
const middle = list.findMiddle();
console.log('Middle element:', middle?.value); // Output: 3

const list2 = new LinkedList<string>();
list2.append('A');
list2.append('B');
list2.append('C');
list2.append('D');

console.log('List:', list2.toString());
const middle2 = list2.findMiddle();
console.log('Middle element:', middle2?.value); // Output: 'C' (for even length, returns second middle)
function findMiddleSafe<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null; // Empty list
    if (!head.next) return head; // Single node
    
    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;
    
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }
    
    return slow;
}

class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

function findNthFromEnd<T>(
    head: ListNode<T> | null, 
    n: number
): ListNode<T> | null {
    if (!head || n <= 0) return null;
    
    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;
    
    // Move fast pointer n nodes ahead
    for (let i = 0; i < n; i++) {
        if (!fast) return null; // List is shorter than n
        fast = fast.next;
    }
    
    // Move both pointers until fast reaches the end
    while (fast) {
        slow = slow!.next;
        fast = fast.next;
    }
    
    return slow;
}
function findNthFromEndTwoPass<T>(
    head: ListNode<T> | null, 
    n: number
): ListNode<T> | null {
    if (!head || n <= 0) return null;
    
    // First pass: count total nodes
    let length = 0;
    let current: ListNode<T> | null = head;
    
    while (current) {
        length++;
        current = current.next;
    }
    
    // Check if n is valid
    if (n > length) return null;
    
    // Second pass: find (length - n)th node from start
    const targetPos = length - n;
    current = head;
    
    for (let i = 0; i < targetPos; i++) {
        current = current!.next;
    }
    
    return current;
}
function findNthFromEndStack<T>(
    head: ListNode<T> | null, 
    n: number
): ListNode<T> | null {
    if (!head || n <= 0) return null;
    
    const stack: ListNode<T>[] = [];
    let current: ListNode<T> | null = head;
    
    // Push all nodes to stack
    while (current) {
        stack.push(current);
        current = current.next;
    }
    
    // Pop n nodes and return the nth one
    if (n > stack.length) return null;
    
    let result: ListNode<T> | null = null;
    for (let i = 0; i < n; i++) {
        result = stack.pop()!;
    }
    
    return result;
}
// Linked List implementation
class LinkedList<T> {
    private head: ListNode<T> | null = null;
    
    append(value: T): void {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }
    
    findNthFromEnd(n: number): ListNode<T> | null {
        return findNthFromEnd(this.head, n);
    }
    
    print(): void {
        let current = this.head;
        const values: T[] = [];
        while (current) {
            values.push(current.value);
            current = current.next;
        }
        console.log(values.join(' -> '));
    }
}

// Usage example
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);

list.print(); // 1 -> 2 -> 3 -> 4 -> 5

const secondFromEnd = list.findNthFromEnd(2);
console.log(`2nd from end: ${secondFromEnd?.value}`); // 4

const firstFromEnd = list.findNthFromEnd(1);
console.log(`1st from end: ${firstFromEnd?.value}`); // 5

const outOfRange = list.findNthFromEnd(10);
console.log(`10th from end: ${outOfRange?.value}`); // null

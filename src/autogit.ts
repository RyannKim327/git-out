class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

function nthFromEnd<T>(
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
function nthFromEndTwoPass<T>(
    head: ListNode<T> | null, 
    n: number
): ListNode<T> | null {
    if (!head || n <= 0) return null;
    
    // First pass: calculate length
    let length = 0;
    let current: ListNode<T> | null = head;
    
    while (current) {
        length++;
        current = current.next;
    }
    
    if (n > length) return null;
    
    // Second pass: find (length - n)th node from beginning
    let targetIndex = length - n;
    current = head;
    
    for (let i = 0; i < targetIndex; i++) {
        current = current!.next;
    }
    
    return current;
}
function nthFromEndArray<T>(
    head: ListNode<T> | null, 
    n: number
): ListNode<T> | null {
    if (!head || n <= 0) return null;
    
    const nodes: ListNode<T>[] = [];
    let current: ListNode<T> | null = head;
    
    // Store all nodes in array
    while (current) {
        nodes.push(current);
        current = current.next;
    }
    
    if (n > nodes.length) return null;
    
    return nodes[nodes.length - n];
}
// Linked List class for easier testing
class LinkedList<T> {
    head: ListNode<T> | null = null;
    
    add(value: T): void {
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
    
    nthFromEnd(n: number): ListNode<T> | null {
        return nthFromEnd(this.head, n);
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

// Test the implementation
const list = new LinkedList<number>();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);

list.print(); // 1 -> 2 -> 3 -> 4 -> 5

console.log('2nd from end:', list.nthFromEnd(2)?.value); // 4
console.log('1st from end:', list.nthFromEnd(1)?.value); // 5
console.log('5th from end:', list.nthFromEnd(5)?.value); // 1
console.log('6th from end:', list.nthFromEnd(6)?.value); // null

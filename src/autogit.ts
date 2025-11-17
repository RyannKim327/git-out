class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

function findNthFromEnd<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
    if (!head || n <= 0) return null;
    
    let first: ListNode<T> | null = head;
    let second: ListNode<T> | null = head;
    
    // Move first pointer n nodes ahead
    for (let i = 0; i < n; i++) {
        if (!first) return null; // List is shorter than n
        first = first.next;
    }
    
    // Move both pointers until first reaches the end
    while (first) {
        first = first.next;
        second = second!.next;
    }
    
    return second;
}
class LinkedListNode<T> {
    constructor(
        public value: T,
        public next: LinkedListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    private head: LinkedListNode<T> | null = null;
    
    add(value: T): void {
        const newNode = new LinkedListNode(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }
    
    findNthFromEnd(n: number): LinkedListNode<T> | null {
        if (!this.head || n <= 0) return null;
        
        let first: LinkedListNode<T> | null = this.head;
        let second: LinkedListNode<T> | null = this.head;
        
        // Move first pointer n nodes ahead
        for (let i = 0; i < n; i++) {
            if (!first) return null; // List is shorter than n
            first = first.next;
        }
        
        // Move both pointers until first reaches the end
        while (first) {
            first = first.next;
            second = second!.next;
        }
        
        return second;
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
function findNthFromEndArray<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
    if (!head || n <= 0) return null;
    
    const nodes: ListNode<T>[] = [];
    let current: ListNode<T> | null = head;
    
    // Store all nodes in array
    while (current) {
        nodes.push(current);
        current = current.next;
    }
    
    // Calculate position from start
    const position = nodes.length - n;
    
    if (position < 0 || position >= nodes.length) {
        return null;
    }
    
    return nodes[position];
}
function findNthFromEndTwoPass<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
    if (!head || n <= 0) return null;
    
    // First pass: get the length
    let length = 0;
    let current: ListNode<T> | null = head;
    while (current) {
        length++;
        current = current.next;
    }
    
    if (n > length) return null;
    
    // Second pass: get the (length - n)th node
    const targetPos = length - n;
    current = head;
    for (let i = 0; i < targetPos; i++) {
        current = current!.next;
    }
    
    return current;
}
// Create a linked list: 1 -> 2 -> 3 -> 4 -> 5
const list = new LinkedList<number>();
[1, 2, 3, 4, 5].forEach(num => list.add(num));

console.log("Linked List:");
list.print(); // 1 -> 2 -> 3 -> 4 -> 5

// Test finding nth from end
console.log("\nFinding nth from end:");
console.log(`2nd from end:`, list.findNthFromEnd(2)?.value); // 4
console.log(`1st from end:`, list.findNthFromEnd(1)?.value); // 5
console.log(`3rd from end:`, list.findNthFromEnd(3)?.value); // 3
console.log(`6th from end:`, list.findNthFromEnd(6)?.value); // null

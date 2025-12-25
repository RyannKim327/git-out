interface ListNode<T> {
    val: T;
    next: ListNode<T> | null;
}

function findNthFromEnd<T>(head: ListNode<T> | null, n: number): T | null {
    if (!head || n <= 0) return null;
    
    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;
    
    // Move fast pointer n steps ahead
    for (let i = 0; i < n; i++) {
        if (!fast) return null; // List shorter than n
        fast = fast.next;
    }
    
    // Move both pointers until fast reaches end
    while (fast) {
        slow = slow!.next;
        fast = fast.next;
    }
    
    return slow ? slow.val : null;
}
function findNthFromEndLength<T>(head: ListNode<T> | null, n: number): T | null {
    if (!head || n <= 0) return null;
    
    // Calculate length of linked list
    let length = 0;
    let current: ListNode<T> | null = head;
    while (current) {
        length++;
        current = current.next;
    }
    
    if (n > length) return null;
    
    // Find (length - n)th node from start
    let targetIndex = length - n;
    current = head;
    for (let i = 0; i < targetIndex; i++) {
        current = current!.next;
    }
    
    return current!.val;
}
function findNthFromEndArray<T>(head: ListNode<T> | null, n: number): T | null {
    if (!head || n <= 0) return null;
    
    const nodes: T[] = [];
    let current: ListNode<T> | null = head;
    
    // Store all values in array
    while (current) {
        nodes.push(current.val);
        current = current.next;
    }
    
    if (n > nodes.length) return null;
    
    return nodes[nodes.length - n];
}
class LinkedListNode<T> {
    constructor(
        public val: T,
        public next: LinkedListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    private head: LinkedListNode<T> | null = null;
    
    add(val: T): void {
        const newNode = new LinkedListNode(val);
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
    
    // Two pointers method implementation
    findNthFromEnd(n: number): T | null {
        if (!this.head || n <= 0) return null;
        
        let slow: LinkedListNode<T> | null = this.head;
        let fast: LinkedListNode<T> | null = this.head;
        
        // Move fast pointer n steps ahead
        for (let i = 0; i < n; i++) {
            if (!fast) return null;
            fast = fast.next;
        }
        
        // Move both pointers until fast reaches end
        while (fast) {
            slow = slow!.next;
            fast = fast.next;
        }
        
        return slow ? slow.val : null;
    }
    
    // Utility method to print the list
    print(): void {
        let current = this.head;
        const values: T[] = [];
        while (current) {
            values.push(current.val);
            current = current.next;
        }
        console.log(values.join(' → '));
    }
}

// Usage example
const list = new LinkedList<number>();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);

list.print(); // 1 → 2 → 3 → 4 → 5

console.log('2nd from end:', list.findNthFromEnd(2)); // 4
console.log('1st from end:', list.findNthFromEnd(1)); // 5
console.log('3rd from end:', list.findNthFromEnd(3)); // 3
console.log('6th from end:', list.findNthFromEnd(6)); // null
// Test cases for edge cases
const emptyList = new LinkedList<number>();
console.log('Empty list:', emptyList.findNthFromEnd(1)); // null

const singleNodeList = new LinkedList<number>();
singleNodeList.add(42);
console.log('Single node:', singleNodeList.findNthFromEnd(1)); // 42
console.log('Invalid n:', singleNodeList.findNthFromEnd(0)); // null
console.log('n too large:', singleNodeList.findNthFromEnd(2)); // null

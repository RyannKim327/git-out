interface ListNode<T> {
    data: T;
    next: ListNode<T> | null;
}

function findNthFromEndTwoPass<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
    if (!head || n <= 0) return null;
    
    // First pass: get length of list
    let length = 0;
    let current = head;
    
    while (current) {
        length++;
        current = current.next;
    }
    
    if (n > length) return null;
    
    // Second pass: find (length - n)th node from start
    let targetIndex = length - n;
    current = head;
    
    for (let i = 0; i < targetIndex; i++) {
        current = current!.next;
    }
    
    return current;
}
function findNthFromEndOnePass<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
    if (!head || n <= 0) return null;
    
    let fast = head;
    let slow = head;
    
    // Move fast pointer n nodes ahead
    for (let i = 0; i < n; i++) {
        if (!fast) return null; // List too short
        fast = fast.next!;
    }
    
    // Move both pointers until fast reaches end
    while (fast) {
        fast = fast.next!;
        slow = slow!.next!;
    }
    
    return slow;
}
function findNthFromEndRecursive<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
    let result: ListNode<T> | null = null;
    let count = 0;
    
    function traverse(node: ListNode<T> | null): number {
        if (!node) return 0;
        
        const indexFromEnd = traverse(node.next) + 1;
        
        if (indexFromEnd === n) {
            result = node;
        }
        
        return indexFromEnd;
    }
    
    traverse(head);
    return result;
}
class LinkedListNode<T> {
    data: T;
    next: LinkedListNode<T> | null;
    
    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList<T> {
    head: LinkedListNode<T> | null;
    
    constructor() {
        this.head = null;
    }
    
    // Add node to end
    append(data: T): void {
        const newNode = new LinkedListNode(data);
        
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
    
    // Find nth from end (two pointers approach)
    findNthFromEnd(n: number): LinkedListNode<T> | null {
        if (!this.head || n <= 0) return null;
        
        let fast: LinkedListNode<T> | null = this.head;
        let slow: LinkedListNode<T> | null = this.head;
        
        // Move fast pointer n nodes ahead
        for (let i = 0; i < n; i++) {
            if (!fast) return null;
            fast = fast.next;
        }
        
        // Move both pointers until fast reaches end
        while (fast) {
            fast = fast.next;
            slow = slow!.next;
        }
        
        return slow;
    }
    
    // Utility method to print list
    print(): void {
        let current = this.head;
        const values: T[] = [];
        
        while (current) {
            values.push(current.data);
            current = current.next;
        }
        
        console.log(values.join(' → '));
    }
}

// Usage Example
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);

console.log('List:');
list.print();

const nthNode = list.findNthFromEnd(2);
console.log('2nd from end:', nthNode?.data); // Output: 4

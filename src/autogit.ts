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
class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    private head: ListNode<T> | null = null;
    
    // Add elements to the list
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
    
    // Find middle element using two-pointer technique
    findMiddle(): T | null {
        if (!this.head) return null;
        
        let slow: ListNode<T> | null = this.head;
        let fast: ListNode<T> | null = this.head;
        
        while (fast && fast.next) {
            slow = slow!.next;
            fast = fast.next.next;
        }
        
        return slow!.value;
    }
    
    // Alternative: Find middle using length calculation
    findMiddleWithLength(): T | null {
        if (!this.head) return null;
        
        let length = 0;
        let current: ListNode<T> | null = this.head;
        
        // First pass: calculate length
        while (current) {
            length++;
            current = current.next;
        }
        
        // Second pass: find middle
        const middleIndex = Math.floor(length / 2);
        current = this.head;
        for (let i = 0; i < middleIndex; i++) {
            current = current!.next;
        }
        
        return current!.value;
    }
    
    // Print the list for debugging
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
interface LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null;
}

class MiddleFinder<T> {
    // Two-pointer approach (most efficient - O(n) time, O(1) space)
    static twoPointer<T>(head: LinkedListNode<T> | null): LinkedListNode<T> | null {
        if (!head) return null;
        
        let slow: LinkedListNode<T> | null = head;
        let fast: LinkedListNode<T> | null = head;
        
        while (fast && fast.next) {
            slow = slow!.next;
            fast = fast.next.next;
        }
        
        return slow;
    }
    
    // Array-based approach (simpler but uses O(n) space)
    static arrayApproach<T>(head: LinkedListNode<T> | null): LinkedListNode<T> | null {
        if (!head) return null;
        
        const nodes: LinkedListNode<T>[] = [];
        let current: LinkedListNode<T> | null = head;
        
        while (current) {
            nodes.push(current);
            current = current.next;
        }
        
        const middleIndex = Math.floor(nodes.length / 2);
        return nodes[middleIndex];
    }
    
    // Length-based approach
    static lengthBased<T>(head: LinkedListNode<T> | null): LinkedListNode<T> | null {
        if (!head) return null;
        
        let length = 0;
        let current: LinkedListNode<T> | null = head;
        
        // Calculate length
        while (current) {
            length++;
            current = current.next;
        }
        
        // Find middle
        const middleIndex = Math.floor(length / 2);
        current = head;
        for (let i = 0; i < middleIndex; i++) {
            current = current!.next;
        }
        
        return current;
    }
}
// Create a linked list: 1 -> 2 -> 3 -> 4 -> 5
const list = new LinkedList<number>();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);

console.log("List:");
list.print(); // 1 -> 2 -> 3 -> 4 -> 5

console.log("Middle element (two-pointer):", list.findMiddle()); // 3
console.log("Middle element (length-based):", list.findMiddleWithLength()); // 3

// Even number of elements
const evenList = new LinkedList<number>();
evenList.add(1);
evenList.add(2);
evenList.add(3);
evenList.add(4);

console.log("\nEven length list:");
evenList.print(); // 1 -> 2 -> 3 -> 4
console.log("Middle element:", evenList.findMiddle()); // 3 (second middle)
// Test edge cases
const emptyList = new LinkedList<number>();
console.log("Empty list middle:", emptyList.findMiddle()); // null

const singleElementList = new LinkedList<number>();
singleElementList.add(42);
console.log("Single element middle:", singleElementList.findMiddle()); // 42

const twoElementList = new LinkedList<number>();
twoElementList.add(10);
twoElementList.add(20);
console.log("Two elements middle:", twoElementList.findMiddle()); // 20

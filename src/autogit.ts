interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

function hasCycle<T>(head: ListNode<T> | null): boolean {
    if (!head || !head.next) return false;
    
    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head.next;
    
    while (slow !== fast) {
        if (!fast || !fast.next) return false;
        
        slow = slow!.next;
        fast = fast.next.next;
    }
    
    return true;
}
function hasCycleUsingSet<T>(head: ListNode<T> | null): boolean {
    const visited = new Set<ListNode<T>>();
    let current: ListNode<T> | null = head;
    
    while (current) {
        if (visited.has(current)) {
            return true;
        }
        visited.add(current);
        current = current.next;
    }
    
    return false;
}
function hasCycleWithMarking<T>(head: ListNode<T> | null): boolean {
    let current: ListNode<T> | null = head;
    
    while (current) {
        if ((current as any).visited) {
            return true;
        }
        (current as any).visited = true;
        current = current.next;
    }
    
    return false;
}
class LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null;
    
    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList<T> {
    head: LinkedListNode<T> | null;
    
    constructor() {
        this.head = null;
    }
    
    // Add methods to create cycles for testing
    createCycle(): void {
        if (!this.head || !this.head.next) return;
        
        let current: LinkedListNode<T> | null = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = this.head; // Create cycle
    }
    
    // Check for cycle using Floyd's algorithm
    hasCycle(): boolean {
        if (!this.head || !this.head.next) return false;
        
        let slow: LinkedListNode<T> | null = this.head;
        let fast: LinkedListNode<T> | null = this.head.next;
        
        while (slow !== fast) {
            if (!fast || !fast.next) return false;
            
            slow = slow!.next;
            fast = fast.next.next;
        }
        
        return true;
    }
}

// Usage example
const list = new LinkedList<number>();
list.head = new LinkedListNode(1);
list.head.next = new LinkedListNode(2);
list.head.next.next = new LinkedListNode(3);

console.log(list.hasCycle()); // false

list.createCycle(); // Create cycle
console.log(list.hasCycle()); // true

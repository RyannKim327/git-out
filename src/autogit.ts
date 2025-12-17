interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

function hasCycle<T>(head: ListNode<T> | null): boolean {
    if (!head || !head.next) return false;
    
    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;
    
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            return true;
        }
    }
    
    return false;
}
function hasCycleUsingSet<T>(head: ListNode<T> | null): boolean {
    const visited = new Set<ListNode<T>>();
    let current = head;
    
    while (current) {
        if (visited.has(current)) {
            return true;
        }
        visited.add(current);
        current = current.next;
    }
    
    return false;
}
class LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null;
    
    constructor(value: T, next: LinkedListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList<T> {
    head: LinkedListNode<T> | null;
    
    constructor() {
        this.head = null;
    }
    
    // Add node to the end
    append(value: T): void {
        const newNode = new LinkedListNode(value);
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
    
    // Create a cycle for testing
    createCycle(position: number): void {
        if (!this.head || position < 0) return;
        
        let cycleNode: LinkedListNode<T> | null = null;
        let current = this.head;
        let index = 0;
        
        while (current.next) {
            if (index === position) {
                cycleNode = current;
            }
            current = current.next;
            index++;
        }
        
        if (cycleNode) {
            current.next = cycleNode;
        }
    }
    
    // Check for cycle using Floyd's algorithm
    hasCycle(): boolean {
        if (!this.head || !this.head.next) return false;
        
        let slow: LinkedListNode<T> | null = this.head;
        let fast: LinkedListNode<T> | null = this.head;
        
        while (fast && fast.next) {
            slow = slow!.next;
            fast = fast.next.next;
            
            if (slow === fast) {
                return true;
            }
        }
        
        return false;
    }
    
    // Check for cycle using Set
    hasCycleUsingSet(): boolean {
        const visited = new Set<LinkedListNode<T>>();
        let current = this.head;
        
        while (current) {
            if (visited.has(current)) {
                return true;
            }
            visited.add(current);
            current = current.next;
        }
        
        return false;
    }
}

// Usage Example
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);

console.log("Has cycle:", list.hasCycle()); // false

// Create a cycle from last node to second node
list.createCycle(1);
console.log("Has cycle after creating cycle:", list.hasCycle()); // true
console.log("Has cycle (using Set):", list.hasCycleUsingSet()); // true

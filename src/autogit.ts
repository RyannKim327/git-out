interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

function hasCycle<T>(head: ListNode<T> | null): boolean {
    if (!head || !head.next) return false;
    
    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head.next;
    
    while (fast && fast.next) {
        if (slow === fast) return true;
        
        slow = slow!.next;
        fast = fast.next.next;
    }
    
    return false;
}
function hasCycleWithSet<T>(head: ListNode<T> | null): boolean {
    const visited = new Set<ListNode<T>>();
    let current = head;
    
    while (current) {
        if (visited.has(current)) return true;
        
        visited.add(current);
        current = current.next;
    }
    
    return false;
}
class ListNode<T> {
    value: T;
    next: ListNode<T> | null;
    
    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList<T> {
    head: ListNode<T> | null;
    
    constructor() {
        this.head = null;
    }
    
    // Add node to end
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
    
    // Create a cycle for testing
    createCycle(fromIndex: number, toIndex: number): void {
        if (!this.head) return;
        
        let current: ListNode<T> | null = this.head;
        let cycleStart: ListNode<T> | null = null;
        let cycleEnd: ListNode<T> | null = null;
        let index = 0;
        
        while (current) {
            if (index === fromIndex) cycleStart = current;
            if (index === toIndex) cycleEnd = current;
            
            current = current.next;
            index++;
        }
        
        if (cycleStart && cycleEnd) {
            cycleStart.next = cycleEnd;
        }
    }
    
    // Check for cycle using Floyd's algorithm
    hasCycle(): boolean {
        if (!this.head || !this.head.next) return false;
        
        let slow: ListNode<T> | null = this.head;
        let fast: ListNode<T> | null = this.head;
        
        while (fast && fast.next) {
            slow = slow!.next;
            fast = fast.next.next;
            
            if (slow === fast) return true;
        }
        
        return false;
    }
}

// Usage example
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);

console.log("Before cycle:", list.hasCycle()); // false

// Create cycle: node 4 points back to node 2
list.createCycle(3, 1); // index 3 (4th node) -> index 1 (2nd node)

console.log("After cycle:", list.hasCycle()); // true
interface ListNodeWithFlag<T> {
    value: T;
    next: ListNodeWithFlag<T> | null;
    visited?: boolean;
}

function hasCycleWithFlag<T>(head: ListNodeWithFlag<T> | null): boolean {
    let current = head;
    
    while (current) {
        if (current.visited) return true;
        
        current.visited = true;
        current = current.next;
    }
    
    return false;
}
function testCycleDetection(): void {
    // Create a list without cycle
    const list1 = new LinkedList<number>();
    list1.append(1);
    list1.append(2);
    list1.append(3);
    console.log("List 1 has cycle:", list1.hasCycle()); // false
    
    // Create a list with cycle
    const list2 = new LinkedList<number>();
    list2.append(1);
    list2.append(2);
    list2.append(3);
    list2.append(4);
    list2.append(5);
    list2.createCycle(4, 2); // last node points to 3rd node
    console.log("List 2 has cycle:", list2.hasCycle()); // true
    
    // Test with empty list
    const list3 = new LinkedList<number>();
    console.log("List 3 has cycle:", list3.hasCycle()); // false
}

testCycleDetection();

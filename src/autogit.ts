class ListNode<T> {
    val: T;
    next: ListNode<T> | null;
    
    constructor(val: T, next: ListNode<T> | null = null) {
        this.val = val;
        this.next = next;
    }
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
function hasCycleByMarking<T>(head: ListNode<T> | null): boolean {
    let current = head;
    
    while (current) {
        if ((current as any).visited) {
            return true;
        }
        (current as any).visited = true;
        current = current.next;
    }
    
    return false;
}
// ListNode class definition
class ListNode<T> {
    val: T;
    next: ListNode<T> | null;
    
    constructor(val: T, next: ListNode<T> | null = null) {
        this.val = val;
        this.next = next;
    }
}

// Floyd's algorithm implementation
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

// Test the implementation
function testCycleDetection(): void {
    // Create a list without cycle: 1 → 2 → 3 → 4 → null
    const node4 = new ListNode(4);
    const node3 = new ListNode(3, node4);
    const node2 = new ListNode(2, node3);
    const node1 = new ListNode(1, node2);
    
    console.log("List without cycle:", hasCycle(node1)); // false
    
    // Create a list with cycle: 1 → 2 → 3 → 4 → 2 (cycle)
    const cycleNode4 = new ListNode(4);
    const cycleNode3 = new ListNode(3, cycleNode4);
    const cycleNode2 = new ListNode(2, cycleNode3);
    const cycleNode1 = new ListNode(1, cycleNode2);
    cycleNode4.next = cycleNode2; // Create cycle
    
    console.log("List with cycle:", hasCycle(cycleNode1)); // true
    
    // Edge cases
    console.log("Empty list:", hasCycle(null)); // false
    console.log("Single node:", hasCycle(new ListNode(1))); // false
}

testCycleDetection();

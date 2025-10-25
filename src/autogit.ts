class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

function hasCycle<T>(head: ListNode<T> | null): boolean {
    if (!head || !head.next) {
        return false;
    }
    
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
function hasCycleWithSet<T>(head: ListNode<T> | null): boolean {
    if (!head) return false;
    
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
class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

function hasCycle<T>(head: ListNode<T> | null): boolean {
    if (!head || !head.next) {
        return false;
    }
    
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

// Helper function to create a cycle in the list
function createCycle<T>(head: ListNode<T>, pos: number): void {
    if (pos < 0) return;
    
    let cycleNode: ListNode<T> | null = null;
    let current: ListNode<T> | null = head;
    let index = 0;
    
    while (current && current.next) {
        if (index === pos) {
            cycleNode = current;
        }
        current = current.next;
        index++;
    }
    
    if (cycleNode && current) {
        current.next = cycleNode;
    }
}

// Test the implementation
function testCycleDetection(): void {
    // Create a list without cycle: 1 -> 2 -> 3 -> 4 -> 5
    const head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    head.next.next.next = new ListNode(4);
    head.next.next.next.next = new ListNode(5);
    
    console.log("List without cycle:", hasCycle(head)); // false
    
    // Create a cycle: 1 -> 2 -> 3 -> 4 -> 5 -> back to 3
    createCycle(head, 2);
    console.log("List with cycle:", hasCycle(head)); // true
    
    // Test empty list
    console.log("Empty list:", hasCycle(null)); // false
    
    // Single node without cycle
    const singleNode = new ListNode(1);
    console.log("Single node:", hasCycle(singleNode)); // false
    
    // Single node with cycle (pointing to itself)
    const selfLoopNode = new ListNode(1);
    selfLoopNode.next = selfLoopNode;
    console.log("Self-loop node:", hasCycle(selfLoopNode)); // true
}

testCycleDetection();
function detectCycleStart<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head || !head.next) {
        return null;
    }
    
    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;
    let hasCycle = false;
    
    // Detect if cycle exists
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            hasCycle = true;
            break;
        }
    }
    
    if (!hasCycle) {
        return null;
    }
    
    // Find the start of the cycle
    slow = head;
    while (slow !== fast) {
        slow = slow!.next;
        fast = fast!.next;
    }
    
    return slow;
}

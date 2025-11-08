class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T, next: ListNode<T> | null = null) {
        this.value = value;
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
function hasCycleUsingMarker<T>(head: ListNode<T> | null): boolean {
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
class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T, next: ListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

// Floyd's Algorithm Implementation
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

// Test Cases
function testCycleDetection() {
    // Create a list without cycle: 1 -> 2 -> 3 -> null
    const node1 = new ListNode(1);
    const node2 = new ListNode(2);
    const node3 = new ListNode(3);
    
    node1.next = node2;
    node2.next = node3;
    
    console.log("No cycle:", hasCycle(node1)); // false
    
    // Create a cycle: 1 -> 2 -> 3 -> 2 (cycle)
    node3.next = node2;
    
    console.log("With cycle:", hasCycle(node1)); // true
    
    // Single node without cycle
    const singleNode = new ListNode(1);
    console.log("Single node:", hasCycle(singleNode)); // false
    
    // Single node with cycle (pointing to itself)
    singleNode.next = singleNode;
    console.log("Self-cycle:", hasCycle(singleNode)); // true
}

testCycleDetection();

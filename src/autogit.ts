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
        if (current.visited) {
            return true;
        }
        current.visited = true;
        current = current.next;
    }
    
    return false;
}
class ListNode<T> {
    value: T;
    next: ListNode<T> | null;
    visited?: boolean; // For marking approach
    
    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

// Create test cases
function createLinkedListWithCycle(): ListNode<number> {
    const head = new ListNode(1);
    const node2 = new ListNode(2);
    const node3 = new ListNode(3);
    const node4 = new ListNode(4);
    
    head.next = node2;
    node2.next = node3;
    node3.next = node4;
    node4.next = node2; // Creates cycle: 4 -> 2
    
    return head;
}

function createLinkedListWithoutCycle(): ListNode<number> {
    const head = new ListNode(1);
    const node2 = new ListNode(2);
    const node3 = new ListNode(3);
    const node4 = new ListNode(4);
    
    head.next = node2;
    node2.next = node3;
    node3.next = node4;
    
    return head;
}

// Test the implementation
const cyclicList = createLinkedListWithCycle();
const nonCyclicList = createLinkedListWithoutCycle();

console.log('Has cycle (Floyd):', hasCycle(cyclicList)); // true
console.log('Has cycle (Floyd):', hasCycle(nonCyclicList)); // false
console.log('Has cycle (Set):', hasCycleUsingSet(cyclicList)); // true

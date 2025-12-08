class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
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
function hasCycleWithSet<T>(head: ListNode<T> | null): boolean {
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
function hasCycleWithMarking<T>(head: ListNode<T> | null): boolean {
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
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

function createLinkedListWithCycle<T>(values: T[], cycleStartIndex: number = -1): ListNode<T> | null {
    if (values.length === 0) return null;
    
    const nodes: ListNode<T>[] = [];
    const head = new ListNode(values[0]);
    nodes.push(head);
    
    let current = head;
    for (let i = 1; i < values.length; i++) {
        current.next = new ListNode(values[i]);
        current = current.next;
        nodes.push(current);
    }
    
    // Create cycle if specified
    if (cycleStartIndex >= 0 && cycleStartIndex < nodes.length) {
        current.next = nodes[cycleStartIndex];
    }
    
    return head;
}

// Test the implementation
function testCycleDetection() {
    // Test case 1: No cycle
    const list1 = createLinkedListWithCycle([1, 2, 3, 4, 5]);
    console.log('List 1 (no cycle):', hasCycle(list1)); // false
    
    // Test case 2: Cycle exists
    const list2 = createLinkedListWithCycle([1, 2, 3, 4, 5], 2);
    console.log('List 2 (cycle at index 2):', hasCycle(list2)); // true
    
    // Test case 3: Empty list
    const list3 = createLinkedListWithCycle([]);
    console.log('List 3 (empty):', hasCycle(list3)); // false
    
    // Test case 4: Single node with cycle to itself
    const list4 = createLinkedListWithCycle([1], 0);
    console.log('List 4 (self cycle):', hasCycle(list4)); // true
}

testCycleDetection();

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
class MarkableListNode<T> {
    public visited: boolean = false;
    
    constructor(
        public value: T,
        public next: MarkableListNode<T> | null = null
    ) {}
}

function hasCycleWithMarking<T>(head: MarkableListNode<T> | null): boolean {
    let current = head;
    
    while (current) {
        if (current.visited) {
            return true;
        }
        current.visited = true;
        current = current.next;
    }
    
    return false;
}
// Test the cycle detection
function testCycleDetection(): void {
    // Create a linked list without a cycle: 1 -> 2 -> 3 -> 4 -> null
    const node1 = new ListNode(1);
    const node2 = new ListNode(2);
    const node3 = new ListNode(3);
    const node4 = new ListNode(4);
    
    node1.next = node2;
    node2.next = node3;
    node3.next = node4;
    
    console.log('List without cycle:', hasCycle(node1)); // false
    
    // Create a cycle: 1 -> 2 -> 3 -> 4 -> 2 (cycle)
    node4.next = node2;
    
    console.log('List with cycle:', hasCycle(node1)); // true
    
    // Edge cases
    console.log('Empty list:', hasCycle(null)); // false
    console.log('Single node:', hasCycle(new ListNode(1))); // false
    console.log('Single node cycle:', (() => {
        const singleNode = new ListNode(1);
        singleNode.next = singleNode;
        return hasCycle(singleNode);
    })()); // true
}

testCycleDetection();
function detectCycle<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head || !head.next) return null;
    
    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;
    
    // Detect if cycle exists
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            // Cycle detected, find the start
            slow = head;
            while (slow !== fast) {
                slow = slow!.next;
                fast = fast!.next;
            }
            return slow;
        }
    }
    
    return null;
}

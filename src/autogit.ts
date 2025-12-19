interface ListNode {
    val: number;
    next: ListNode | null;
}

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    const visited = new Set<ListNode>();
    
    // Traverse first list and store all nodes
    let currentA = headA;
    while (currentA !== null) {
        visited.add(currentA);
        currentA = currentA.next;
    }
    
    // Traverse second list and check for intersection
    let currentB = headB;
    while (currentB !== null) {
        if (visited.has(currentB)) {
            return currentB;
        }
        currentB = currentB.next;
    }
    
    return null;
}
function getIntersectionNodeTwoPointers(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    if (!headA || !headB) return null;
    
    let pointerA: ListNode | null = headA;
    let pointerB: ListNode | null = headB;
    
    while (pointerA !== pointerB) {
        // Move pointers to next node
        pointerA = pointerA ? pointerA.next : headB;
        pointerB = pointerB ? pointerB.next : headA;
    }
    
    return pointerA; // Either intersection point or null if no intersection
}
function getIntersectionNodeWithLength(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    if (!headA || !headB) return null;
    
    // Calculate lengths of both lists
    const lengthA = getLength(headA);
    const lengthB = getLength(headB);
    
    let longer: ListNode | null = lengthA >= lengthB ? headA : headB;
    let shorter: ListNode | null = lengthA >= lengthB ? headB : headA;
    
    // Move longer pointer ahead by the difference
    let diff = Math.abs(lengthA - lengthB);
    while (diff > 0 && longer) {
        longer = longer.next;
        diff--;
    }
    
    // Move both pointers until they meet
    while (longer && shorter) {
        if (longer === shorter) {
            return longer;
        }
        longer = longer.next;
        shorter = shorter.next;
    }
    
    return null;
}

function getLength(head: ListNode | null): number {
    let length = 0;
    let current = head;
    while (current) {
        length++;
        current = current.next;
    }
    return length;
}
// ListNode class for easier testing
class ListNode {
    constructor(
        public val: number,
        public next: ListNode | null = null
    ) {}
}

// Test function
function testIntersection(): void {
    // Create lists: 
    // listA: 1 → 2 → 3 → 4
    // listB: 9 → 8 → 3 → 4 (intersection at node 3)
    
    const commonNode1 = new ListNode(3);
    const commonNode2 = new ListNode(4);
    commonNode1.next = commonNode2;
    
    const headA = new ListNode(1);
    headA.next = new ListNode(2);
    headA.next.next = commonNode1;
    
    const headB = new ListNode(9);
    headB.next = new ListNode(8);
    headB.next.next = commonNode1;
    
    const result = getIntersectionNodeTwoPointers(headA, headB);
    console.log('Intersection node value:', result?.val); // Output: 3
    console.log('Is it the same node?', result === commonNode1); // Output: true
}

testIntersection();

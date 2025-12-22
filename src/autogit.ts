class ListNode {
    val: number;
    next: ListNode | null;
    
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
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
    
    let ptrA: ListNode | null = headA;
    let ptrB: ListNode | null = headB;
    
    while (ptrA !== ptrB) {
        ptrA = ptrA === null ? headB : ptrA.next;
        ptrB = ptrB === null ? headA : ptrB.next;
    }
    
    return ptrA;
}
function getIntersectionNodeLength(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    const getLength = (head: ListNode | null): number => {
        let length = 0;
        let current = head;
        while (current !== null) {
            length++;
            current = current.next;
        }
        return length;
    };
    
    const lenA = getLength(headA);
    const lenB = getLength(headB);
    
    let longer: ListNode | null = lenA > lenB ? headA : headB;
    let shorter: ListNode | null = lenA > lenB ? headB : headA;
    const diff = Math.abs(lenA - lenB);
    
    // Move longer pointer ahead by difference
    for (let i = 0; i < diff && longer !== null; i++) {
        longer = longer.next;
    }
    
    // Move both pointers together
    while (longer !== null && shorter !== null) {
        if (longer === shorter) {
            return longer;
        }
        longer = longer.next;
        shorter = shorter.next;
    }
    
    return null;
}
// Create test case
function createIntersectingLists(): { headA: ListNode, headB: ListNode, intersection: ListNode } {
    // Common part (intersection)
    const commonNode1 = new ListNode(8);
    const commonNode2 = new ListNode(4);
    const commonNode3 = new ListNode(5);
    commonNode1.next = commonNode2;
    commonNode2.next = commonNode3;
    
    // List A: 4 → 1 → 8 → 4 → 5
    const nodeA1 = new ListNode(4);
    const nodeA2 = new ListNode(1);
    nodeA1.next = nodeA2;
    nodeA2.next = commonNode1;
    
    // List B: 5 → 6 → 1 → 8 → 4 → 5
    const nodeB1 = new ListNode(5);
    const nodeB2 = new ListNode(6);
    const nodeB3 = new ListNode(1);
    nodeB1.next = nodeB2;
    nodeB2.next = nodeB3;
    nodeB3.next = commonNode1;
    
    return {
        headA: nodeA1,
        headB: nodeB1,
        intersection: commonNode1
    };
}

// Test function
function testIntersection(): void {
    const { headA, headB, intersection } = createIntersectingLists();
    
    console.log("Testing intersection detection:");
    
    const result1 = getIntersectionNode(headA, headB);
    console.log("Hash Set Method:", result1?.val === 8 ? "✓ PASS" : "✗ FAIL");
    
    const result2 = getIntersectionNodeTwoPointers(headA, headB);
    console.log("Two Pointers Method:", result2?.val === 8 ? "✓ PASS" : "✗ FAIL");
    
    const result3 = getIntersectionNodeLength(headA, headB);
    console.log("Length Method:", result3?.val === 8 ? "✓ PASS" : "✗ FAIL");
    
    console.log("Expected intersection value: 8");
    console.log("Actual intersection values:", 
        result1?.val, result2?.val, result3?.val);
}

testIntersection();

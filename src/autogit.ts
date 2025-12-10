class ListNode {
    val: number;
    next: ListNode | null;
    
    constructor(val: number) {
        this.val = val;
        this.next = null;
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
            return currentB; // Intersection found
        }
        currentB = currentB.next;
    }
    
    return null; // No intersection
}
function getIntersectionNodeTwoPointers(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    if (headA === null || headB === null) return null;
    
    let pointerA: ListNode | null = headA;
    let pointerB: ListNode | null = headB;
    
    // When a pointer reaches the end of a list, redirect it to the head of the other list
    while (pointerA !== pointerB) {
        pointerA = pointerA === null ? headB : pointerA.next;
        pointerB = pointerB === null ? headA : pointerB.next;
    }
    
    return pointerA; // Either intersection point or null if no intersection
}
function getIntersectionNodeLength(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    if (headA === null || headB === null) return null;
    
    // Get lengths of both lists
    const lengthA = getListLength(headA);
    const lengthB = getListLength(headB);
    
    // Move the longer list pointer ahead by the difference
    let longer = lengthA >= lengthB ? headA : headB;
    let shorter = lengthA >= lengthB ? headB : headA;
    
    let diff = Math.abs(lengthA - lengthB);
    
    while (diff > 0) {
        longer = longer!.next;
        diff--;
    }
    
    // Now move both pointers together
    while (longer !== shorter) {
        longer = longer!.next;
        shorter = shorter!.next;
    }
    
    return longer;
}

function getListLength(head: ListNode | null): number {
    let length = 0;
    let current = head;
    
    while (current !== null) {
        length++;
        current = current.next;
    }
    
    return length;
}
// Helper function to create linked lists
function createLinkedList(values: number[]): ListNode | null {
    if (values.length === 0) return null;
    
    const head = new ListNode(values[0]);
    let current = head;
    
    for (let i = 1; i < values.length; i++) {
        current.next = new ListNode(values[i]);
        current = current.next;
    }
    
    return head;
}

// Example usage
function testIntersection(): void {
    // Create lists: 1→2→3→4→5 and 9→8→4→5 (intersecting at node with value 4)
    const common = createLinkedList([4, 5]);
    
    const listAHead = new ListNode(1);
    listAHead.next = new ListNode(2);
    listAHead.next.next = new ListNode(3);
    listAHead.next.next.next = common;
    
    const listBHead = new ListNode(9);
    listBHead.next = new ListNode(8);
    listBHead.next.next = common;
    
    const intersection = getIntersectionNodeTwoPointers(listAHead, listBHead);
    
    if (intersection) {
        console.log(`Intersection found at node with value: ${intersection.val}`);
    } else {
        console.log("No intersection found");
    }
}

testIntersection();

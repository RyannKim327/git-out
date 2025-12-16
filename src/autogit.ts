interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

function findIntersectionByReference<T>(
    headA: ListNode<T> | null,
    headB: ListNode<T> | null
): ListNode<T> | null {
    if (!headA || !headB) return null;
    
    const visited = new Set<ListNode<T>>();
    let current: ListNode<T> | null = headA;
    
    // Mark all nodes from first list
    while (current) {
        visited.add(current);
        current = current.next;
    }
    
    // Check second list for intersections
    current = headB;
    while (current) {
        if (visited.has(current)) {
            return current;
        }
        current = current.next;
    }
    
    return null;
}
function findIntersectionByValue<T>(
    headA: ListNode<T> | null,
    headB: ListNode<T> | null
): ListNode<T> | null {
    if (!headA || !headB) return null;
    
    const visited = new Set<T>();
    let current: ListNode<T> | null = headA;
    
    // Store values from first list
    while (current) {
        visited.add(current.value);
        current = current.next;
    }
    
    // Find first matching value in second list
    current = headB;
    while (current) {
        if (visited.has(current.value)) {
            return current;
        }
        current = current.next;
    }
    
    return null;
}
function getIntersectionNodeTwoPointer<T>(
    headA: ListNode<T> | null,
    headB: ListNode<T> | null
): ListNode<T> | null {
    if (!headA || !headB) return null;
    
    let ptrA: ListNode<T> | null = headA;
    let ptrB: ListNode<T> | null = headB;
    
    // When ptrA reaches end, redirect to headB
    // When ptrB reaches end, redirect to headA
    // They'll meet at intersection or both become null
    while (ptrA !== ptrB) {
        ptrA = ptrA ? ptrA.next : headB;
        ptrB = ptrB ? ptrB.next : headA;
    }
    
    return ptrA;
}
class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    public head: ListNode<T> | null = null;
    
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
    
    // Create intersection with another list
    createIntersection(targetList: LinkedList<T>, intersectionPoint: number): void {
        if (!this.head) return;
        
        let current = this.head;
        let count = 0;
        
        // Find the node where we want to create intersection
        while (current && count < intersectionPoint) {
            current = current.next;
            count++;
        }
        
        if (current) {
            // Make the target list's last node point to this node
            if (targetList.head) {
                let targetCurrent = targetList.head;
                while (targetCurrent.next) {
                    targetCurrent = targetCurrent.next;
                }
                targetCurrent.next = current;
            }
        }
    }
}

// Usage example
function demoIntersection(): void {
    // Create first list: 1 → 2 → 3 → 4 → 5
    const list1 = new LinkedList<number>();
    for (let i = 1; i <= 5; i++) {
        list1.append(i);
    }
    
    // Create second list: 6 → 7
    const list2 = new LinkedList<number>();
    list2.append(6);
    list2.append(7);
    
    // Create intersection: make list2 point to node with value 3 in list1
    list2.createIntersection(list1, 2); // Intersection at 3rd node (value 3)
    
    const intersection = getIntersectionNodeTwoPointer(list1.head, list2.head);
    
    if (intersection) {
        console.log(`Lists intersect at node with value: ${intersection.value}`);
    } else {
        console.log("Lists do not intersect");
    }
}

demoIntersection(); // Output: Lists intersect at node with value: 3

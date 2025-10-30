interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}
function findIntersectionHash<T>(
    headA: ListNode<T> | null, 
    headB: ListNode<T> | null
): ListNode<T> | null {
    const visited = new Set<ListNode<T>>();
    
    let currentA = headA;
    while (currentA !== null) {
        visited.add(currentA);
        currentA = currentA.next;
    }
    
    let currentB = headB;
    while (currentB !== null) {
        if (visited.has(currentB)) {
            return currentB;
        }
        currentB = currentB.next;
    }
    
    return null;
}
function findIntersectionTwoPointers<T>(
    headA: ListNode<T> | null, 
    headB: ListNode<T> | null
): ListNode<T> | null {
    if (!headA || !headB) return null;
    
    let pointerA: ListNode<T> | null = headA;
    let pointerB: ListNode<T> | null = headB;
    
    while (pointerA !== pointerB) {
        pointerA = pointerA === null ? headB : pointerA.next;
        pointerB = pointerB === null ? headA : pointerB.next;
    }
    
    return pointerA;
}
function findIntersectionLength<T>(
    headA: ListNode<T> | null, 
    headB: ListNode<T> | null
): ListNode<T> | null {
    if (!headA || !headB) return null;
    
    // Get lengths and tails
    let lengthA = 0, lengthB = 0;
    let tailA: ListNode<T> | null = null;
    let tailB: ListNode<T> | null = null;
    
    let currentA = headA;
    while (currentA !== null) {
        lengthA++;
        tailA = currentA;
        currentA = currentA.next;
    }
    
    let currentB = headB;
    while (currentB !== null) {
        lengthB++;
        tailB = currentB;
        currentB = currentB.next;
    }
    
    // If tails are different, no intersection
    if (tailA !== tailB) return null;
    
    // Advance longer list by difference
    let longer = lengthA > lengthB ? headA : headB;
    let shorter = lengthA > lengthB ? headB : headA;
    const diff = Math.abs(lengthA - lengthB);
    
    for (let i = 0; i < diff; i++) {
        longer = longer!.next;
    }
    
    // Find intersection point
    while (longer !== shorter) {
        longer = longer!.next;
        shorter = shorter!.next;
    }
    
    return longer;
}
class LinkedList<T> {
    head: ListNode<T> | null = null;
    tail: ListNode<T> | null = null;
    
    append(value: T): void {
        const newNode: ListNode<T> = { value, next: null };
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }
    }
    
    // Creates intersection with another list
    createIntersection(other: LinkedList<T>, intersectionPoint: number): void {
        let current = this.head;
        for (let i = 0; i < intersectionPoint && current; i++) {
            current = current.next;
        }
        other.tail!.next = current;
        other.tail = this.tail;
    }
}

// Test case
const list1 = new LinkedList<number>();
[1, 2, 3, 4, 5].forEach(n => list1.append(n));

const list2 = new LinkedList<number>();
[10, 11].forEach(n => list2.append(n));

// Create intersection at node with value 3
list1.createIntersection(list2, 2);

console.log("Intersection found:", findIntersectionTwoPointers(list1.head, list2.head)?.value);
// Output: Intersection found: 3

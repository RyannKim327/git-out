class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === null ? null : next;
    }
}

function getLinkedListLength(head: ListNode | null): number {
    let length = 0;
    let current = head;
    
    while (current !== null) {
        length++;
        current = current.next;
    }
    
    return length;
}

// Usage
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);

console.log(getLinkedListLength(head)); // Output: 3
function getLinkedListLengthRecursive(head: ListNode | null): number {
    if (head === null) {
        return 0;
    }
    
    return 1 + getLinkedListLengthRecursive(head.next);
}

// Usage
console.log(getLinkedListLengthRecursive(head)); // Output: 3
function getLinkedListLengthArray(head: ListNode | null): number {
    const values: number[] = [];
    let current = head;
    
    while (current !== null) {
        values.push(current.val);
        current = current.next;
    }
    
    return values.length;
}
class GenericListNode<T> {
    val: T;
    next: GenericListNode<T> | null;
    constructor(val?: T, next?: GenericListNode<T> | null) {
        this.val = val === undefined ? (null as T) : val;
        this.next = next === null ? null : next;
    }
}

function getGenericLinkedListLength<T>(head: GenericListNode<T> | null): number {
    let length = 0;
    let current = head;
    
    while (current !== null) {
        length++;
        current = current.next;
    }
    
    return length;
}

// Usage with strings
const stringHead = new GenericListNode("a");
stringHead.next = new GenericListNode("b");
console.log(getGenericLinkedListLength(stringHead)); // Output: 2
const getLinkedListLengthOneLiner = (head: ListNode | null): number => 
    head ? 1 + getLinkedListLengthOneLiner(head.next) : 0;
// Test cases
console.log(getLinkedListLength(null)); // 0 (empty list)
console.log(getLinkedListLength(new ListNode(1))); // 1 (single node)
console.log(getLinkedListLength(new ListNode(1, null))); // 1 (explicit null)

class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let current = head;
    while (current !== null) {
        const nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }
    return prev;
}

function isPalindrome(head: ListNode | null): boolean {
    if (head === null || head.next === null) return true;

    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    while (fast !== null && fast.next !== null) {
        slow = slow!.next;
        fast = fast.next.next;
    }

    if (fast !== null) {
        slow = slow!.next;
    }

    let reversedHead = reverseList(slow);
    let firstHalf = head;
    
    while (reversedHead !== null) {
        if (firstHalf!.val !== reversedHead.val) {
            return false;
        }
        firstHalf = firstHalf!.next;
        reversedHead = reversedHead.next;
    }
    return true;
}

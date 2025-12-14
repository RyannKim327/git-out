class ListNode {
    constructor(public val: number, public next: ListNode | null = null) {}
}

function isPalindromeArray(head: ListNode | null): boolean {
    if (!head) return true;
    
    const arr: number[] = [];
    let current: ListNode | null = head;
    
    // Convert linked list to array
    while (current) {
        arr.push(current.val);
        current = current.next;
    }
    
    // Check if array is palindrome
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        if (arr[left] !== arr[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}
function isPalindromeTwoPointers(head: ListNode | null): boolean {
    if (!head || !head.next) return true;
    
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    
    // Find middle of the list
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }
    
    // Reverse second half
    let prev: ListNode | null = null;
    let current: ListNode | null = slow;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    // Compare first half with reversed second half
    let firstHalf: ListNode | null = head;
    let secondHalf: ListNode | null = prev;
    
    while (secondHalf) {
        if (firstHalf!.val !== secondHalf.val) {
            return false;
        }
        firstHalf = firstHalf!.next;
        secondHalf = secondHalf.next;
    }
    
    return true;
}
function isPalindromeRecursive(head: ListNode | null): boolean {
    let frontPointer: ListNode | null = head;
    
    function recursivelyCheck(current: ListNode | null): boolean {
        if (current !== null) {
            if (!recursivelyCheck(current.next)) return false;
            if (current.val !== frontPointer!.val) return false;
            frontPointer = frontPointer!.next;
        }
        return true;
    }
    
    return recursivelyCheck(head);
}
class LinkedList {
    head: ListNode | null = null;
    
    add(val: number): void {
        const newNode = new ListNode(val);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }
    
    isPalindrome(): boolean {
        return isPalindromeTwoPointers(this.head);
    }
}

// Test cases
function testPalindrome(): void {
    // Test case 1: Palindrome list [1,2,3,2,1]
    const list1 = new LinkedList();
    [1, 2, 3, 2, 1].forEach(val => list1.add(val));
    console.log('List 1 is palindrome:', list1.isPalindrome()); // true
    
    // Test case 2: Non-palindrome list [1,2,3,4,5]
    const list2 = new LinkedList();
    [1, 2, 3, 4, 5].forEach(val => list2.add(val));
    console.log('List 2 is palindrome:', list2.isPalindrome()); // false
    
    // Test case 3: Single element [5]
    const list3 = new LinkedList();
    list3.add(5);
    console.log('List 3 is palindrome:', list3.isPalindrome()); // true
    
    // Test case 4: Empty list
    const list4 = new LinkedList();
    console.log('List 4 is palindrome:', list4.isPalindrome()); // true
    
    // Test case 5: Even length palindrome [1,2,2,1]
    const list5 = new LinkedList();
    [1, 2, 2, 1].forEach(val => list5.add(val));
    console.log('List 5 is palindrome:', list5.isPalindrome()); // true
}

testPalindrome();

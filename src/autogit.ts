class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    public head: ListNode<T> | null = null;

    add(value: T): void {
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

    // Method 1: Convert to array and use two pointers
    isPalindromeArray(): boolean {
        if (!this.head) return true;

        const values: T[] = [];
        let current: ListNode<T> | null = this.head;
        
        // Convert linked list to array
        while (current) {
            values.push(current.value);
            current = current.next;
        }

        // Use two pointers to check palindrome
        let left = 0;
        let right = values.length - 1;

        while (left < right) {
            if (values[left] !== values[right]) {
                return false;
            }
            left++;
            right--;
        }

        return true;
    }
}

// Example usage:
const list1 = new LinkedList<number>();
list1.add(1);
list1.add(2);
list1.add(2);
list1.add(1);
console.log(list1.isPalindromeArray()); // true

const list2 = new LinkedList<string>();
list2.add('a');
list2.add('b');
list2.add('c');
console.log(list2.isPalindromeArray()); // false
class LinkedList<T> {
    // ... (previous methods)

    // Method 2: Reverse second half and compare
    isPalindromeReverse(): boolean {
        if (!this.head || !this.head.next) return true;

        // Find the middle using slow and fast pointers
        let slow: ListNode<T> | null = this.head;
        let fast: ListNode<T> | null = this.head;

        while (fast && fast.next) {
            slow = slow!.next;
            fast = fast.next.next;
        }

        // Reverse the second half
        let secondHalf = this.reverseList(slow);
        let firstHalf: ListNode<T> | null = this.head;

        // Compare both halves
        let temp = secondHalf;
        while (secondHalf) {
            if (firstHalf!.value !== secondHalf.value) {
                // Restore the list (optional)
                this.reverseList(temp);
                return false;
            }
            firstHalf = firstHalf!.next;
            secondHalf = secondHalf.next;
        }

        // Restore the list (optional)
        this.reverseList(temp);
        return true;
    }

    private reverseList(head: ListNode<T> | null): ListNode<T> | null {
        let prev: ListNode<T> | null = null;
        let current: ListNode<T> | null = head;

        while (current) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        return prev;
    }
}
class LinkedList<T> {
    // ... (previous methods)

    // Method 3: Recursive approach
    isPalindromeRecursive(): boolean {
        let frontPointer: ListNode<T> | null = this.head;
        
        const recursivelyCheck = (currentNode: ListNode<T> | null): boolean => {
            if (currentNode !== null) {
                if (!recursivelyCheck(currentNode.next)) return false;
                if (currentNode.value !== frontPointer!.value) return false;
                frontPointer = frontPointer!.next;
            }
            return true;
        };

        return recursivelyCheck(this.head);
    }
}
class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    public head: ListNode<T> | null = null;

    add(value: T): void {
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

    toString(): string {
        const values: T[] = [];
        let current = this.head;
        while (current) {
            values.push(current.value);
            current = current.next;
        }
        return values.join(' -> ');
    }

    // Method 1: Array conversion (O(n) time, O(n) space)
    isPalindromeArray(): boolean {
        if (!this.head) return true;

        const values: T[] = [];
        let current: ListNode<T> | null = this.head;
        
        while (current) {
            values.push(current.value);
            current = current.next;
        }

        let left = 0;
        let right = values.length - 1;
        while (left < right) {
            if (values[left] !== values[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    // Method 2: Reverse second half (O(n) time, O(1) space)
    isPalindromeReverse(): boolean {
        if (!this.head || !this.head.next) return true;

        let slow: ListNode<T> | null = this.head;
        let fast: ListNode<T> | null = this.head;

        // Find middle
        while (fast && fast.next) {
            slow = slow!.next;
            fast = fast.next.next;
        }

        // Reverse second half
        let secondHalf = this.reverseList(slow);
        let firstHalf: ListNode<T> | null = this.head;
        let temp = secondHalf;

        // Compare halves
        while (secondHalf) {
            if (firstHalf!.value !== secondHalf.value) {
                this.reverseList(temp);
                return false;
            }
            firstHalf = firstHalf!.next;
            secondHalf = secondHalf.next;
        }

        this.reverseList(temp);
        return true;
    }

    private reverseList(head: ListNode<T> | null): ListNode<T> | null {
        let prev: ListNode<T> | null = null;
        let current: ListNode<T> | null = head;

        while (current) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return prev;
    }

    // Method 3: Recursive (O(n) time, O(n) space due to recursion stack)
    isPalindromeRecursive(): boolean {
        let frontPointer: ListNode<T> | null = this.head;
        
        const recursivelyCheck = (currentNode: ListNode<T> | null): boolean => {
            if (currentNode !== null) {
                if (!recursivelyCheck(currentNode.next)) return false;
                if (currentNode.value !== frontPointer!.value) return false;
                frontPointer = frontPointer!.next;
            }
            return true;
        };

        return recursivelyCheck(this.head);
    }
}

// Test all methods
function testPalindrome() {
    const testCases = [
        [1, 2, 3, 2, 1],    // true
        [1, 2, 2, 1],       // true
        [1, 2, 3],          // false
        [1],                 // true
        [],                  // true (empty list)
        ['a', 'b', 'a'],    // true
        ['a', 'b', 'c']     // false
    ];

    for (const testCase of testCases) {
        const list = new LinkedList<number | string>();
        testCase.forEach(val => list.add(val));
        
        console.log(`List: ${list.toString()}`);
        console.log(`Array method: ${list.isPalindromeArray()}`);
        console.log(`Reverse method: ${list.isPalindromeReverse()}`);
        console.log(`Recursive method: ${list.isPalindromeRecursive()}`);
        console.log('---');
    }
}

testPalindrome();

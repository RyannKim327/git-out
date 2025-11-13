class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}
class LinkedList<T> {
    head: ListNode<T> | null = null;

    // Add to end (append)
    append(value: T): void {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let curr = this.head;
        while (curr.next) {
            curr = curr.next;
        }
        curr.next = newNode;
    }

    // Add to beginning (prepend)
    prepend(value: T): void {
        const newNode = new ListNode(value);
        newNode.next = this.head;
        this.head = newNode;
    }

    // Remove by value (first occurrence)
    remove(value: T): void {
        if (!this.head) return;
        if (this.head.value === value) {
            this.head = this.head.next;
            return;
        }
        let curr = this.head;
        while (curr.next && curr.next.value !== value) {
            curr = curr.next;
        }
        if (curr.next) {
            curr.next = curr.next.next;
        }
    }

    // Find node by value
    find(value: T): ListNode<T> | null {
        let curr = this.head;
        while (curr) {
            if (curr.value === value) {
                return curr;
            }
            curr = curr.next;
        }
        return null;
    }

    // Convert to array for debugging or printing
    toArray(): T[] {
        const result: T[] = [];
        let curr = this.head;
        while (curr) {
            result.push(curr.value);
            curr = curr.next;
        }
        return result;
    }
}
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.prepend(0);
console.log(list.toArray()); // [0, 

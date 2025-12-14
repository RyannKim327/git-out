interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

class LinkedList<T> {
    head: ListNode<T> | null = null;
    
    constructor(values?: T[]) {
        if (values) {
            this.fromArray(values);
        }
    }
    
    // Add other methods like add(), remove(), etc.
}
class LinkedList<T> {
    // ... previous code
    
    getLength(): number {
        let count = 0;
        let current = this.head;
        
        while (current !== null) {
            count++;
            current = current.next;
        }
        
        return count;
    }
}
class LinkedList<T> {
    // ... previous code
    
    getLengthRecursive(): number {
        return this._getLengthRecursive(this.head);
    }
    
    private _getLengthRecursive(node: ListNode<T> | null): number {
        if (node === null) {
            return 0;
        }
        return 1 + this._getLengthRecursive(node.next);
    }
}
class LinkedList<T> {
    head: ListNode<T> | null = null;
    private _length: number = 0;
    
    add(value: T): void {
        const newNode: ListNode<T> = { value, next: null };
        
        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
        
        this._length++;
    }
    
    remove(value: T): boolean {
        // Implementation would also update this._length
        // ... 
    }
    
    getLength(): number {
        return this._length;
    }
}
interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

class LinkedList<T> {
    head: ListNode<T> | null = null;
    private _length: number = 0;
    
    constructor(values?: T[]) {
        if (values) {
            this.fromArray(values);
        }
    }
    
    add(value: T): void {
        const newNode: ListNode<T> = { value, next: null };
        
        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
        
        this._length++;
    }
    
    fromArray(values: T[]): void {
        values.forEach(value => this.add(value));
    }
    
    // Iterative approach
    getLengthIterative(): number {
        let count = 0;
        let current = this.head;
        
        while (current !== null) {
            count++;
            current = current.next;
        }
        
        return count;
    }
    
    // Recursive approach
    getLengthRecursive(): number {
        return this._getLengthRecursive(this.head);
    }
    
    private _getLengthRecursive(node: ListNode<T> | null): number {
        if (node === null) {
            return 0;
        }
        return 1 + this._getLengthRecursive(node.next);
    }
    
    // Cached length approach
    getLength(): number {
        return this._length;
    }
    
    // Utility method to display the list
    toString(): string {
        const values: T[] = [];
        let current = this.head;
        
        while (current !== null) {
            values.push(current.value);
            current = current.next;
        }
        
        return values.join(' -> ');
    }
}

// Usage Example
const list = new LinkedList<number>([1, 2, 3, 4, 5]);

console.log('List:', list.toString());
console.log('Iterative length:', list.getLengthIterative()); // 5
console.log('Recursive length:', list.getLengthRecursive()); // 5
console.log('Cached length:', list.getLength()); // 5

// Add more elements
list.add(6);
list.add(7);

console.log('Updated length:', list.getLength()); // 7

function fibonacciSearch(arr: number[], target: number): number {
    if (arr.length === 0) return -1;
    
    // Generate Fibonacci numbers up to or beyond array length
    let fibMMinus2 = 0;
    let fibMMinus1 = 1;
    let fibM = fibMMinus1 + fibMMinus2;
    
    // Find the smallest Fibonacci number greater than or equal to array length
    while (fibM < arr.length) {
        fibMMinus2 = fibMMinus1;
        fibMMinus1 = fibM;
        fibM = fibMMinus1 + fibMMinus2;
    }
    
    let offset = -1;
    
    while (fibM > 1) {
        // Check if fibMMinus2 is a valid index
        const i = Math.min(offset + fibMMinus2, arr.length - 1);
        
        if (arr[i] < target) {
            // Target is in the right subarray
            fibM = fibMMinus1;
            fibMMinus1 = fibMMinus2;
            fibMMinus2 = fibM - fibMMinus1;
            offset = i;
        } else if (arr[i] > target) {
            // Target is in the left subarray
            fibM = fibMMinus2;
            fibMMinus1 = fibMMinus1 - fibMMinus2;
            fibMMinus2 = fibM - fibMMinus1;
        } else {
            // Target found
            return i;
        }
    }
    
    // Compare the last element
    if (fibMMinus1 === 1 && arr[offset + 1] === target) {
        return offset + 1;
    }
    
    return -1; // Target not found
}

// Helper function to generate Fibonacci sequence (optional)
function generateFibonacciSequence(n: number): number[] {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const fibSequence: number[] = [0, 1];
    for (let i = 2; i < n; i++) {
        fibSequence.push(fibSequence[i - 1] + fibSequence[i - 2]);
    }
    return fibSequence;
}

// Example usage and testing
function demonstrateFibonacciSearch(): void {
    const sortedArray = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100];
    const targets = [10, 50, 90, 35, 105];
    
    console.log('Array:', sortedArray);
    console.log('Fibonacci sequence:', generateFibonacciSequence(10));
    
    targets.forEach(target => {
        const index = fibonacciSearch(sortedArray, target);
        if (index !== -1) {
            console.log(`Found ${target} at index ${index}`);
        } else {
            console.log(`${target} not found in the array`);
        }
    });
}

// Run the demonstration
demonstrateFibonacciSearch();
class FibonacciSearch {
    private fibSequence: number[] = [];
    
    constructor() {
        this.generateFibonacciSequence(20); // Pre-generate some Fibonacci numbers
    }
    
    private generateFibonacciSequence(n: number): void {
        this.fibSequence = [0, 1];
        for (let i = 2; i < n; i++) {
            this.fibSequence.push(this.fibSequence[i - 1] + this.fibSequence[i - 2]);
        }
    }
    
    search(arr: number[], target: number): number {
        if (arr.length === 0) return -1;
        
        let fibMMinus2 = 0;
        let fibMMinus1 = 1;
        let fibM = fibMMinus1 + fibMMinus2;
        
        // Find suitable Fibonacci number
        let fibIndex = 2;
        while (fibM < arr.length) {
            if (fibIndex >= this.fibSequence.length) {
                // Extend Fibonacci sequence if needed
                this.fibSequence.push(
                    this.fibSequence[this.fibSequence.length - 1] + 
                    this.fibSequence[this.fibSequence.length - 2]
                );
            }
            fibMMinus2 = this.fibSequence[fibIndex - 1];
            fibMMinus1 = this.fibSequence[fibIndex];
            fibM = fibMMinus1 + fibMMinus2;
            fibIndex++;
        }
        
        let offset = -1;
        
        while (fibM > 1) {
            const i = Math.min(offset + fibMMinus2, arr.length - 1);
            
            console.log(`Checking index ${i}, value: ${arr[i]}`);
            
            if (arr[i] < target) {
                offset = i;
                fibM = fibMMinus1;
                fibMMinus1 = fibMMinus2;
                fibMMinus2 = fibM - fibMMinus1;
            } else if (arr[i] > target) {
                fibM = fibMMinus2;
                fibMMinus1 = fibMMinus1 - fibMMinus2;
                fibMMinus2 = fibM - fibMMinus1;
            } else {
                return i;
            }
        }
        
        if (fibMMinus1 === 1 && offset + 1 < arr.length && arr[offset + 1] === target) {
            return offset + 1;
        }
        
        return -1;
    }
}

// Usage example
const fibSearch = new FibonacciSearch();
const testArray = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
const result = fibSearch.search(testArray, 13);
console.log(`Found at index: ${result}`);

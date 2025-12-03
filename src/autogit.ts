function shellSort(arr: number[]): number[] {
    const n = arr.length;
    let gap = Math.floor(n / 2);  // Start with large gap and reduce it

    // Continue until gap becomes 0
    while (gap > 0) {
        // Perform insertion sort for elements at gap intervals
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j = i;
            
            // Shift earlier gap-sorted elements until correct position is found
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            
            // Insert temp at correct position
            arr[j] = temp;
        }
        
        // Reduce gap size
        gap = Math.floor(gap / 2);
    }
    
    return arr;
}

// Example usage
const unsortedArray = [12, 34, 54, 2, 3];
console.log(shellSort(unsortedArray));  // Output: [2, 3, 12, 34, 54]
function genericShellSort<T>(arr: T[], compare: (a: T, b: T) => number): T[] {
    const n = arr.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j = i;
            
            while (j >= gap && compare(arr[j - gap], temp) > 0) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            
            arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
    
    return arr;
}

// Example usage with string array
const strings = ['banana', 'apple', 'cherry', 'date'];
console.log(genericShellSort(strings, (a, b) => a.localeCompare(b))); 
// Output: ['apple', 'banana', 'cherry', 'date']

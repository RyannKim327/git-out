function insertionSort(arr: number[]): void {
    // Iterate through the array starting from the second element
    for (let i = 1; i < arr.length; i++) {
        const current = arr[i];  // Current element to be inserted
        let j = i - 1;  // Start comparing with previous element
        
        // Shift elements greater than 'current' to the right
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];  // Shift element to the right
            j--;
        }
        
        // Insert 'current' at the correct position
        arr[j + 1] = current;
    }
}
const array = [5, 2, 4, 6, 1, 3];
insertionSort(array);
console.log(array);  // Output: [1, 2, 3, 4, 5, 6]
[5|2,4,6,1,3] → current=2 → [2,5|4,6,1,3]
[2,5|4,6,1,3] → current=4 → [2,4,5|6,1,3]
[2,4,5|6,1,3] → current=6 → [2,4,5,6|1,3]
[2,4,5,6|1,3] → current=1 → [1,2,4,5,6|3]
[1,2,4,5,6|3] → current=3 → [1,2,3,4,5,6]

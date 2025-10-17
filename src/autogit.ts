function insertionSort(arr: number[]): number[] {
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;

        // Shift elements of arr[0..i-1] that are greater than `current`
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
    }
    return arr;
}

// Example usage:
const nums = [5, 2, 9, 1, 5, 6];
console.log(insertionSort(nums)); // [1, 2, 5, 5, 6, 9]
function insertionSortGeneric<T>(arr: T[], compare: (a: T, b: T) => number): T[] {
    for (let i = 1; i < arr.length; i++) {
        const current = arr[i];
        let j = i - 1;

        while (j >= 0 && compare(arr[j], current) > 0) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
    }
    return arr;
}

// Example:
const words = ["banana", "apple", "cherry"];
console.log(insertionSortGeneric(words, (a, b) => a.localeCompare(b)));

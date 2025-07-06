function isSorted(arr: number[]): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

function shuffleArray(arr: number[]): number[] {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap arr[i] with the element at random index
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function bogosort(arr: number[]): number[] {
    while (!isSorted(arr)) {
        shuffleArray(arr);
    }
    return arr;
}

// Example usage
const arrayToSort = [3, 2, 5, 1, 4];
console.log("Original array:", arrayToSort);
const sortedArray = bogosort(arrayToSort);
console.log("Sorted array:", sortedArray);
Original array: [3, 2, 5, 1, 4]
Sorted array: [1, 2, 3, 4, 5]

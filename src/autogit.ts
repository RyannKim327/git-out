function isSorted(arr: number[]): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

function shuffle(arr: number[]): number[] {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
}

function bogosort(arr: number[]): number[] {
    while (!isSorted(arr)) {
        arr = shuffle(arr);
    }
    return arr;
}

// Example usage
const arr = [3, 2, 5, 1, 4];
console.log("Unsorted array:", arr);
const sortedArr = bogosort(arr);
console.log("Sorted array:", sortedArr);

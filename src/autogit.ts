function kthSmallestSort(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error("Invalid value of k");
    }
    const sortedArr = [...arr].sort((a, b) => a - b);
    return sortedArr[k - 1];
}
function kthSmallestQuickSelect(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error("Invalid value of k");
    }

    const quickSelect = (start: number, end: number): number => {
        const pivotIndex = partition(start, end);
        if (pivotIndex === k - 1) {
            return arr[pivotIndex];
        } else if (pivotIndex < k - 1) {
            return quickSelect(pivotIndex + 1, end);
        } else {
            return quickSelect(start, pivotIndex - 1);
        }
    };

    const partition = (start: number, end: number): number => {
        const pivot = arr[end];
        let i = start;
        for (let j = start; j < end; j++) {
            if (arr[j] <= pivot) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
            }
        }
        [arr[i], arr[end]] = [arr[end], arr[i]];
        return i;
    };

    return quickSelect(0, arr.length - 1);
}
const arr = [12, 3, 5, 7, 4, 19];
const k = 3;

console.log(kthSmallestSort(arr, k));      // Output: 5 (using sorting)
console.log(kthSmallestQuickSelect(arr, k)); // Output: 5 (using QuickSelect)

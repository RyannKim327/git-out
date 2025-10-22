function kthSmallestBySorting(arr: number[], k: number): number | null {
    if (k < 1 || k > arr.length) return null;
    // Clone to avoid modifying the original array
    const sorted = [...arr].sort((a, b) => a - b);
    return sorted[k - 1];
}
function kthSmallestQuickSelect(arr: number[], k: number): number | null {
    if (k < 1 || k > arr.length) return null;

    // Random pivot selection reduces worst-case performance issues
    const pivot = arr[Math.floor(Math.random() * arr.length)];

    // Partition into lower, same, and higher elements
    const lower: number[] = [];
    const same: number[] = [];
    const higher: number[] = [];

    for (const num of arr) {
        if (num < pivot) lower.push(num);
        else if (num === pivot) same.push(num);
        else higher.push(num);
    }

    // Recurse or return solution
    if (k <= lower.length) {
        return kthSmallestQuickSelect(lower, k);
    } else if (k <= lower.length + same.length) {
        return pivot;
    } else {
        return kthSmallestQuickSelect(
            higher,
            k - lower.length - same.length
        );
    }
}
const arr = [12, 3, 5, 7, 19];
const k = 3;

// Using Sorting
console.log(kthSmallestBySorting(arr, k)); // 7
// Using QuickSelect
console.log(kthSmallestQuickSelect(arr, k)); // 7

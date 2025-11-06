function mergeSortIterative<T>(arr: T[]): T[] {
    const n = arr.length;
    let temp = Array.from(arr); // working copy

    for (let size = 1; size < n; size *= 2) {
        for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
            const mid = Math.min(leftStart + size, n);
            const rightEnd = Math.min(leftStart + 2 * size, n);

            merge(arr, temp, leftStart, mid, rightEnd);
        }
        // swap role of arr and temp
        const swapped = arr;
        arr = temp;
        temp = swapped;
    }

    return arr;
}

function merge<T>(
    src: T[],
    dest: T[],
    leftStart: number,
    mid: number,
    rightEnd: number
) {
    let i = leftStart;
    let j = mid;
    let k = leftStart;

    while (i < mid && j < rightEnd) {
        if (src[i] <= src[j]) {
            dest[k++] = src[i++];
        } else {
            dest[k++] = src[j++];
        }
    }
    while (i < mid) {
        dest[k++] = src[i++];
    }
    while (j < rightEnd) {
        dest[k++] = src[j++];
    }
}

// Example:
const unsorted = [38, 27, 43, 3, 9, 82, 10];
const sorted = mergeSortIterative(unsorted);
console.log(sorted); // [3, 9, 10, 27, 38, 43, 82]

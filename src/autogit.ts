function mergeSort<T>(array: T[]): T[] {
    if (array.length <= 1) {
        return array; // Base case
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

function merge<T>(left: T[], right: T[]): T[] {
    const result: T[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    // Add leftovers
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Example usage:
const numbers = [38, 27, 43, 3, 9, 82, 10];
const sorted = mergeSort(numbers);
console.log(sorted); // [3, 9, 10, 27, 38, 43, 82]

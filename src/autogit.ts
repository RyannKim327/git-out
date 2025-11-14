function findMax(arr: number[]): number | undefined {
    if (arr.length === 0) return undefined; // Handle empty array
    return Math.max(...arr);
}

// Usage
const max = findMax([1, 5, 3, 2]); // Returns 5
console.log(findMax([])); // Returns undefined
function findMax(arr: number[]): number | undefined {
    return arr.reduce((max, current) => 
        max === undefined ? current : Math.max(max, current), 
    undefined as number | undefined);
}

// Usage
console.log(findMax([4, 8, 2])); // 8
console.log(findMax([])); // undefined
function findMax(arr: number[]): number | undefined {
    if (arr.length === 0) return undefined;
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

// Usage
console.log(findMax([-3, 7, 0])); // 7

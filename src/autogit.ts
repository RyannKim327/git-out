function secondLargest(arr: number[]): number | undefined {
    if (arr.length < 2) return undefined;
    // Remove duplicates for a "true" second largest, else skip this line
    const uniqueArr = Array.from(new Set(arr));
    uniqueArr.sort((a, b) => b - a); // Sort descending
    return uniqueArr[1];
}
function secondLargest(arr: number[]): number | undefined {
    let first = -Infinity;
    let second = -Infinity;

    for (const num of arr) {
        if (num > first) {
            second = first;
            first = num;
        } else if (num > second && num < first) {
            second = num;
        }
    }

    // Handles arrays with fewer than 2 unique values
    return second > -Infinity ? second : undefined;
}

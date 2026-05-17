function maxInArray(values: number[]): number | undefined {
    if (values.length === 0) return undefined; // no elements

    let max = values[0];
    for (const v of values) {
        if (v > max) max = v;
    }
    return max;
}
const max = Math.max(...arr);
const max = arr.reduce((a, b) => (a > b ? a : b), -Infinity);
const testArr = [3, 41, 12, 9, 34, 88, 57];

console.log(maxInArray(testArr)); // 88
console.log(Math.max(...testArr)); // 88

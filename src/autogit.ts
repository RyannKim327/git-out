function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) {
        return NaN; // Mean is undefined for an empty list
    }

    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum / numbers.length;
}

// --- Usage Examples ---
const list1 = [1, 2, 3, 4, 5];
console.log(`Mean of [${list1}] is:`, calculateMean(list1)); // Output: 3

const list2 = [10, 20, 30];
console.log(`Mean of [${list2}] is:`, calculateMean(list2)); // Output: 20

const list3 = [7];
console.log(`Mean of [${list3}] is:`, calculateMean(list3)); // Output: 7

const list4 = [-1, 0, 1];
console.log(`Mean of [${list4}] is:`, calculateMean(list4)); // Output: 0

const emptyList: number[] = [];
console.log(`Mean of [${emptyList}] is:`, calculateMean(emptyList)); // Output: NaN
function calculateMeanLoop(numbers: number[]): number {
    if (numbers.length === 0) {
        return NaN; // Mean is undefined for an empty list
    }

    let sum = 0;
    for (const num of numbers) {
        sum += num;
    }

    return sum / numbers.length;
}

// --- Usage Examples ---
const listA = [10, 15, 20, 25];
console.log(`Mean of [${listA}] (loop) is:`, calculateMeanLoop(listA)); // Output: 17.5

const listB: number[] = [];
console.log(`Mean of [${listB}] (loop) is:`, calculateMeanLoop(listB)); // Output: NaN

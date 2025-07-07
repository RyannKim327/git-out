function findCommonElements(arr1: number[], arr2: number[]): number[] {
    return arr1.filter(value => arr2.includes(value));
}

const array1 = [1, 2, 3, 4, 5];
const array2 = [4, 5, 6, 7, 8];

const commonElements = findCommonElements(array1, array2);
console.log(commonElements); // Output: [4, 5]
function findCommonElementsUsingSet(arr1: number[], arr2: number[]): number[] {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    const commonElements = [...set1].filter(value => set2.has(value));
    return commonElements;
}

const commonElementsSet = findCommonElementsUsingSet(array1, array2);
console.log(commonElementsSet); // Output: [4, 5]

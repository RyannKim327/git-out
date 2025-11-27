function findCommonElements<T>(array1: T[], array2: T[]): T[] {
    return array1.filter(item => array2.includes(item));
}

// Example usage:
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const common = findCommonElements(arr1, arr2); // Result: [3, 4]
function findCommonElements<T>(array1: T[], array2: T[]): T[] {
    const set2 = new Set(array2);
    return array1.filter(item => set2.has(item));
}

// Example usage:
const commonEfficient = findCommonElements(arr1, arr2); // [3, 4]

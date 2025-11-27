function findMax(arr: number[]): number | undefined {
    if (arr.length === 0) return undefined;
    return Math.max(...arr);
}

// Usage
const numbers = [5, 3, 9, 1, 4];
console.log(findMax(numbers)); // 9
console.log(findMax([]));      // undefined
function findMax(arr: number[]): number | undefined {
    return arr.reduce((a, b) => Math.max(a, b), -Infinity) ?? undefined;
    // Or: return arr.length ? arr.reduce((a, b) => a > b ? a : b) : undefined;
}

// Usage
console.log(findMax([5, 3, 9])); // 9
console.log(findMax([]));       // undefined
function findMax(arr: number[]): number | undefined {
    if (arr.length === 0) return undefined;
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}
function findMaxByKey<T>(arr: T[], keySelector: (item: T) => number): T | undefined {
    if (arr.length === 0) return undefined;
    let maxItem = arr[0];
    for (const item of arr) {
        if (keySelector(item) > keySelector(maxItem)) {
            maxItem = item;
        }
    }
    return maxItem;
}

// Usage
interface Product {
    name: string;
    price: number;
}
const products: Product[] = [
    { name: "Laptop", price: 999 },
    { name: "Phone", price: 699 },
];
console.log(findMaxByKey(products, p => p.price)); // { name: "Laptop", ... }

const numbers: number[] = [1, 5, 3, 9, 2];
const maxValue = Math.max(...numbers);
console.log(maxValue); // 9
const numbers: number[] = [1, 5, 3, 9, 2];
const maxValue = Math.max.apply(null, numbers);
console.log(maxValue); // 9
const numbers: number[] = [1, 5, 3, 9, 2];
const maxValue = numbers.reduce((max, current) => Math.max(max, current));
console.log(maxValue); // 9

// Or more explicitly:
const maxValue2 = numbers.reduce((max, current) => {
    return current > max ? current : max;
}, numbers[0]);
const numbers: number[] = [];
const maxValue = numbers.length > 0 ? Math.max(...numbers) : null;
console.log(maxValue); // null

// Or with a default value:
const maxValue2 = numbers.length > 0 ? Math.max(...numbers) : -Infinity;
interface Product {
    id: number;
    price: number;
}

const products: Product[] = [
    { id: 1, price: 100 },
    { id: 2, price: 250 },
    { id: 3, price: 150 }
];

// Find maximum price
const maxPrice = Math.max(...products.map(p => p.price));
console.log(maxPrice); // 250

// Or using reduce to get the entire object with max value
const productWithMaxPrice = products.reduce((max, product) => 
    product.price > max.price ? product : max
);
console.log(productWithMaxPrice); // { id: 2, price: 250 }
function findMax<T>(array: T[], getValue?: (item: T) => number): T | null {
    if (array.length === 0) return null;
    
    if (getValue) {
        return array.reduce((max, current) => 
            getValue(current) > getValue(max) ? current : max
        );
    }
    
    return array.reduce((max, current) => 
        (current as any) > (max as any) ? current : max
    );
}

// Usage examples:
const numbers = [1, 5, 3, 9, 2];
console.log(findMax(numbers)); // 9

const products = [{ price: 100 }, { price: 250 }, { price: 150 }];
console.log(findMax(products, p => p.price)); // { price: 250 }
function findMaxFast(array: number[]): number | null {
    if (array.length === 0) return null;
    
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }
    return max;
}

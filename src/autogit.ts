function removeDuplicates<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
}

// Example usage:
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = removeDuplicates(numbers);
console.log(uniqueNumbers); // Output: [1, 2, 3, 4, 5]
function removeDuplicates<T>(arr: T[]): T[] {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
}

// Example usage:
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = removeDuplicates(numbers);
console.log(uniqueNumbers); // Output: [1, 2, 3, 4, 5]
function removeDuplicates<T>(arr: T[]): T[] {
    return arr.reduce((accumulator: T[], current: T) => {
        if (!accumulator.includes(current)) {
            accumulator.push(current);
        }
        return accumulator;
    }, []);
}

// Example usage:
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = removeDuplicates(numbers);
console.log(uniqueNumbers); // Output: [1, 2, 3, 4, 5]
function removeDuplicates<T>(arr: T[]): T[] {
    const seen: { [key: string]: boolean } = {};
    return arr.filter((item) => {
        if (seen[item as any]) {
            return false; // Duplicate found
        }
        seen[item as any] = true; // Mark as seen
        return true; // Keep the item
    });
}

// Example usage:
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = removeDuplicates(numbers);
console.log(uniqueNumbers); // Output: [1, 2, 3, 4, 5]

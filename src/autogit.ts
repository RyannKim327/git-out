function getStringLength(str: string): number {
    let count = 0;
    for (let i = 0; str[i] !== undefined; i++) {
        count++;
    }
    return count;
}

// Usage
const myString = "Hello, TypeScript!";
console.log(getStringLength(myString)); // Output: 18
function getStringLengthWhile(str: string): number {
    let count = 0;
    while (str[count] !== undefined) {
        count++;
    }
    return count;
}

// Usage
const text = "Programming";
console.log(getStringLengthWhile(text)); // Output: 11
function getStringLengthArray(str: string): number {
    let count = 0;
    const arr = Array.from(str);
    for (const char of arr) {
        count++;
    }
    return count;
}

// Or more simply:
function getStringLengthSpread(str: string): number {
    return [...str].reduce(count => count + 1, 0);
}

// Usage
const example = "TypeScript";
console.log(getStringLengthArray(example)); // Output: 10
console.log(getStringLengthSpread(example)); // Output: 10
function getStringLengthRecursive(str: string, index: number = 0): number {
    if (str[index] === undefined) {
        return index;
    }
    return getStringLengthRecursive(str, index + 1);
}

// Usage
const recursiveTest = "Recursion";
console.log(getStringLengthRecursive(recursiveTest)); // Output: 9
function getStringLengthIterator(str: string): number {
    let count = 0;
    const iterator = str[Symbol.iterator]();
    let result = iterator.next();
    
    while (!result.done) {
        count++;
        result = iterator.next();
    }
    return count;
}

// Usage
const iteratorTest = "Iterator";
console.log(getStringLengthIterator(iteratorTest)); // Output: 8
function findStringLength(input: unknown): number {
    // Type guard to ensure input is a string
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }
    
    let length = 0;
    const str = input as string;
    
    for (let i = 0; str[i] !== undefined; i++) {
        length++;
    }
    
    return length;
}

// Usage examples
try {
    console.log(findStringLength("Hello")); // 5
    console.log(findStringLength("")); // 0
    console.log(findStringLength("👋🌍")); // 2 (handles emojis correctly)
    // console.log(findStringLength(123)); // Error: Input must be a string
} catch (error) {
    console.error(error.message);
}

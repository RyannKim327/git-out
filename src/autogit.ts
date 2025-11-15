function getStringLength(str: string): number {
    let count = 0;
    for (let i = 0; str[i] !== undefined; i++) {
        count++;
    }
    return count;
}

// Usage
const text = "Hello, TypeScript!";
console.log(getStringLength(text)); // Output: 18
function getStringLength(str: string): number {
    let count = 0;
    while (str[count] !== undefined) {
        count++;
    }
    return count;
}

// Usage
const text = "Hello";
console.log(getStringLength(text)); // Output: 5
function getStringLength(str: string, count: number = 0): number {
    if (str[count] === undefined) {
        return count;
    }
    return getStringLength(str, count + 1);
}

// Usage
const text = "TypeScript";
console.log(getStringLength(text)); // Output: 10
function getStringLength(str: string): number {
    return [...str].reduce((count) => count + 1, 0);
}

// Usage
const text = "Programming";
console.log(getStringLength(text)); // Output: 12
function getStringLength(str: string): number {
    let count = 0;
    for (const char of str) {
        count++;
    }
    return count;
}

// Usage
const text = "Developers";
console.log(getStringLength(text)); // Output: 10

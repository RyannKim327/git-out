function getStringLength(str: string): number {
    let count = 0;
    for (let i = 0; i < str.length; i++) {  // Note: This still uses .length in the loop condition
        count++;
    }
    return count;
}

// Better approach - using a while loop with charAt()
function getStringLengthWithoutLength(str: string): number {
    let count = 0;
    let i = 0;
    while (str.charAt(i) !== '') {
        count++;
        i++;
    }
    return count;
}

// Usage
const text = "Hello World";
console.log(getStringLengthWithoutLength(text)); // Output: 11
function stringLength(str: string): number {
    let length = 0;
    let index = 0;
    
    // charAt(index) returns an empty string when index is out of bounds
    while (str.charAt(index) !== '') {
        length++;
        index++;
    }
    
    return length;
}
function recursiveStringLength(str: string, index: number = 0): number {
    // Base case: if we've reached the end of the string
    if (str.charAt(index) === '') {
        return 0;
    }
    
    // Recursive case: count current char + length of remaining string
    return 1 + recursiveStringLength(str, index + 1);
}

// Usage
const message = "TypeScript";
console.log(recursiveStringLength(message)); // Output: 10
function arrayMethodLength(str: string): number {
    // Convert string to array of characters and get array length
    // This technically uses array.length, but not string.length directly
    return [...str].length;
}

// Usage
const phrase = "Hello TypeScript";
console.log(arrayMethodLength(phrase)); // Output: 15
function pureIterationLength(str: string): number {
    let count = 0;
    let index = 0;
    
    try {
        while (true) {
            // This will throw an error when index is out of bounds
            void str.charAt(index);
            count++;
            index++;
        }
    } catch (e) {
        return count;
    }
}
function customStringLength(input: string): number {
    let length = 0;
    let position = 0;
    
    while (input.charAt(position) !== '') {
        length++;
        position++;
    }
    
    return length;
}

// Test it
const testString = "Hello, TypeScript!";
console.log(customStringLength(testString)); // Output: 18
console.log(testString.length); // Output: 18 (for comparison)

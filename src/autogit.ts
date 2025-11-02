function stringLength(str: string): number {
    let count = 0;
    for (let i = 0; i < str.length; i++) {  // Note: This still uses .length in the loop condition
        count++;
    }
    return count;
}

// But to be truly manual, you'd need to handle it differently:
function manualStringLength(str: string): number {
    let count = 0;
    let index = 0;
    while (true) {
        if (str.charAt(index) === '') {  // Empty string indicates end
            break;
        }
        count++;
        index++;
    }
    return count;
}

const text = "Hello World";
console.log(manualStringLength(text)); // Output: 11
function getStringLength(str: string): number {
    let length = 0;
    let i = 0;
    
    // Continue until we reach the end of the string
    while (str.charAt(i) !== '') {
        length++;
        i++;
    }
    
    return length;
}

// Or using bracket notation
function getStringLengthWithIndex(str: string): number {
    let length = 0;
    let i = 0;
    
    try {
        while (true) {
            // This will throw when accessing beyond the string length
            const char = str[i];
            if (char === undefined) break;
            length++;
            i++;
        }
    } catch (e) {
        // Handle the out-of-bounds access
    }
    
    return length;
}

const message = "TypeScript";
console.log(getStringLength(message)); // Output: 10
function regexStringLength(str: string): number {
    // Match all characters and get the count
    const matches = str.match(/.*/g);
    return matches ? matches[0].length : 0;
}

// Or more directly:
function regexLength(str: string): number {
    return (str.match(/./g) || []).length;
}

console.log(regexLength("Hello")); // Output: 5
function recursiveStringLength(str: string): number {
    if (str === '') {
        return 0;
    }
    return 1 + recursiveStringLength(str.substring(1));
}

console.log(recursiveStringLength("ABC")); // Output: 3
function unicodeStringLength(str: string): number {
    return [...str].length; // Spread operator handles Unicode properly
    // But this still technically uses iteration under the hood
}

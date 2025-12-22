function getStringLength(str: string): number {
    let length = 0;
    let index = 0;
    
    while (str[index] !== undefined) {
        length++;
        index++;
    }
    
    return length;
}

// Usage
const text = "Hello, TypeScript!";
console.log(getStringLength(text)); // Output: 18
function getStringLength(str: string): number {
    let length = 0;
    
    for (let i = 0; str[i] !== undefined; i++) {
        length++;
    }
    
    return length;
}
function getStringLength(str: string): number {
    if (str === "") {
        return 0;
    }
    return 1 + getStringLength(str.slice(1));
}
function getStringLength(str: string): number {
    let length = 0;
    
    for (const char of str) {
        length++;
    }
    
    return length;
}
function getStringLength(str: string): number {
    return Array.from(str).length;
}
function getStringLength(str: string): number {
    let length = 0;
    let index = 0;
    
    // Iterate until we reach undefined (end of string)
    while (str[index] !== undefined) {
        length++;
        index++;
    }
    
    return length;
}

// Testing the function
const testCases: string[] = ["", "a", "hello", "TypeScript", "🎉 Emoji test!"];

testCases.forEach(testStr => {
    console.log(`"${testStr}" - Length: ${getStringLength(testStr)}`);
});

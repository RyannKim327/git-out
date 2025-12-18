function countChar(str: string, char: string): number {
    return str.split(char).length - 1;
}

// Example usage
const text = "hello world";
console.log(countChar(text, "l")); // Output: 3
console.log(countChar(text, "o")); // Output: 2
function countChar(str: string, char: string): number {
    const matches = str.match(new RegExp(char, "g"));
    return matches ? matches.length : 0;
}

// Example usage
const text = "hello world";
console.log(countChar(text, "l")); // Output: 3
function countChar(str: string, char: string): number {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === char) {
            count++;
        }
    }
    return count;
}

// Example usage
const text = "hello world";
console.log(countChar(text, "l")); // Output: 3
function countChar(str: string, char: string): number {
    return [...str].reduce((count, currentChar) => 
        currentChar === char ? count + 1 : count, 0);
}

// Example usage
const text = "hello world";
console.log(countChar(text, "l")); // Output: 3
function countCharCaseInsensitive(str: string, char: string): number {
    return str.toLowerCase().split(char.toLowerCase()).length - 1;
}

// Example usage
const text = "Hello World";
console.log(countCharCaseInsensitive(text, "h")); // Output: 1
console.log(countCharCaseInsensitive(text, "L")); // Output: 3
function countMultipleChars(str: string, chars: string[]): { [key: string]: number } {
    const result: { [key: string]: number } = {};
    
    for (const char of chars) {
        result[char] = str.split(char).length - 1;
    }
    
    return result;
}

// Example usage
const text = "hello world";
console.log(countMultipleChars(text, ["l", "o", "h"]));
// Output: { l: 3, o: 2, h: 1 }

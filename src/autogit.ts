function countCharacter(str: string, char: string): number {
    return str.split(char).length - 1;
}

// Example usage
const text = "hello world";
const count = countCharacter(text, "l"); // Returns 3
console.log(count);
function countCharacterRegex(str: string, char: string): number {
    const matches = str.match(new RegExp(char, "g"));
    return matches ? matches.length : 0;
}

// Example usage
const text = "hello world";
const count = countCharacterRegex(text, "l"); // Returns 3
console.log(count);
function countCharacterLoop(str: string, char: string): number {
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
const count = countCharacterLoop(text, "l"); // Returns 3
console.log(count);
function countCharacterFilter(str: string, char: string): number {
    return Array.from(str).filter(c => c === char).length;
}

// Example usage
const text = "hello world";
const count = countCharacterFilter(text, "l"); // Returns 3
console.log(count);
function countCharacterReduce(str: string, char: string): number {
    return Array.from(str).reduce((count, c) => c === char ? count + 1 : count, 0);
}

// Example usage
const text = "hello world";
const count = countCharacterReduce(text, "l"); // Returns 3
console.log(count);
// Case insensitive counting
function countCharacterCaseInsensitive(str: string, char: string): number {
    return str.toLowerCase().split(char.toLowerCase()).length - 1;
}

// Multiple character sequences
function countSubstring(str: string, substring: string): number {
    return str.split(substring).length - 1;
}

// Example with multiple characters
const text = "banana";
const count = countSubstring(text, "na"); // Returns 2
console.log(count);
const countOccurrences = (str: string, char: string): number => 
    str.split(char).length - 1;

// Usage
console.log(countOccurrences("mississippi", "s")); // Returns 4

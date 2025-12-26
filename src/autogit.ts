function countOccurrences(str: string, char: string): number {
    return str.split(char).length - 1;
}

// Example usage
const text = "hello world";
const count = countOccurrences(text, "l"); // Returns 3
console.log(count);
function countOccurrences(str: string, char: string): number {
    const regex = new RegExp(char, "g");
    const matches = str.match(regex);
    return matches ? matches.length : 0;
}

// Example usage
const count = countOccurrences("hello world", "o"); // Returns 2
function countOccurrences(str: string, char: string): number {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === char) {
            count++;
        }
    }
    return count;
}

// Example usage
const count = countOccurrences("hello world", "h"); // Returns 1
function countOccurrences(str: string, char: string): number {
    return [...str].reduce((count, currentChar) => {
        return currentChar === char ? count + 1 : count;
    }, 0);
}

// Example usage
const count = countOccurrences("hello world", " "); // Returns 1
function countOccurrencesCaseInsensitive(str: string, char: string): number {
    const lowerStr = str.toLowerCase();
    const lowerChar = char.toLowerCase();
    return lowerStr.split(lowerChar).length - 1;
}

// Example usage
const count = countOccurrencesCaseInsensitive("Hello World", "h"); // Returns 1
function countOccurrences(str: string, char: string): number {
    if (char.length !== 1) {
        throw new Error("Second parameter must be a single character");
    }
    
    if (str.length === 0) {
        return 0;
    }
    
    return str.split(char).length - 1;
}

// Example usage
try {
    const text = "programming is fun";
    const char = "m";
    const result = countOccurrences(text, char);
    console.log(`Character "${char}" appears ${result} times in "${text}"`);
} catch (error) {
    console.error(error.message);
}

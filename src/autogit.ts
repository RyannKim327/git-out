function countOccurrences(text: string, char: string): number {
    return text.split(char).length - 1;
}

// Usage
const result = countOccurrences("hello world", "l");
console.log(result); // Output: 3
function countOccurrences(text: string, char: string): number {
    const regex = new RegExp(char, "g");
    const matches = text.match(regex);
    return matches ? matches.length : 0;
}

// Usage
const result = countOccurrences("hello world", "l");
console.log(result); // Output: 3
function countOccurrences(text: string, char: string): number {
    return [...text].reduce((count, currentChar) => 
        currentChar === char ? count + 1 : count, 0);
}

// Usage
const result = countOccurrences("hello world", "l");
console.log(result); // Output: 3
function countOccurrences(text: string, char: string): number {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === char) {
            count++;
        }
    }
    return count;
}

// Usage
const result = countOccurrences("hello world", "l");
console.log(result); // Output: 3
function countOccurrencesCaseInsensitive(text: string, char: string): number {
    const lowerText = text.toLowerCase();
    const lowerChar = char.toLowerCase();
    return lowerText.split(lowerChar).length - 1;
}

// Usage
const result = countOccurrencesCaseInsensitive("Hello World", "h");
console.log(result); // Output: 1 (counts both 'H' and 'h')

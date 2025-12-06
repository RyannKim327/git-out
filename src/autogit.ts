function countOccurrences(text: string, char: string): number {
    return text.split(char).length - 1;
}

// Example usage
const text = "hello world";
const count = countOccurrences(text, "l"); // Returns 3
function countOccurrences(text: string, char: string): number {
    const regex = new RegExp(char, "g");
    const matches = text.match(regex);
    return matches ? matches.length : 0;
}

// Example usage
const count = countOccurrences("hello world", "l"); // Returns 3
function countOccurrences(text: string, char: string): number {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === char) {
            count++;
        }
    }
    return count;
}

// Example usage
const count = countOccurrences("hello world", "l"); // Returns 3
function countOccurrences(text: string, char: string): number {
    return Array.from(text).reduce((count, currentChar) => {
        return currentChar === char ? count + 1 : count;
    }, 0);
}

// Example usage
const count = countOccurrences("hello world", "l"); // Returns 3
function countOccurrencesCaseInsensitive(text: string, char: string): number {
    const lowerText = text.toLowerCase();
    const lowerChar = char.toLowerCase();
    return lowerText.split(lowerChar).length - 1;
}

// Example usage
const count = countOccurrencesCaseInsensitive("Hello World", "h"); // Returns 1
function countOccurrences(
    text: string, 
    char: string, 
    caseSensitive: boolean = true
): number {
    if (char.length !== 1) {
        throw new Error("Character parameter must be exactly one character");
    }
    
    const searchText = caseSensitive ? text : text.toLowerCase();
    const searchChar = caseSensitive ? char : char.toLowerCase();
    
    return searchText.split(searchChar).length - 1;
}

// Usage examples
const result1 = countOccurrences("Hello World", "l"); // Returns 3
const result2 = countOccurrences("Hello World", "h", false); // Returns 1 (case-insensitive)

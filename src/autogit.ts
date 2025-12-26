function countOccurrences(text: string, char: string): number {
    return text.split(char).length - 1;
}

// Usage
const result = countOccurrences("hello world", "l");
console.log(result); // Output: 3
function countOccurrencesRegex(text: string, char: string): number {
    const matches = text.match(new RegExp(escapeRegExp(char), "g"));
    return matches ? matches.length : 0;
}

// Helper function to escape regex special characters
function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Usage
const result = countOccurrencesRegex("hello.world", ".");
console.log(result); // Output: 1
function countOccurrencesLoop(text: string, char: string): number {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === char) {
            count++;
        }
    }
    return count;
}

// Usage
const result = countOccurrencesLoop("hello world", "o");
console.log(result); // Output: 2
function countOccurrencesReduce(text: string, char: string): number {
    return [...text].reduce((count, currentChar) => 
        currentChar === char ? count + 1 : count, 0
    );
}

// Usage
const result = countOccurrencesReduce("hello world", " ");
console.log(result); // Output: 1
function countOccurrencesCaseInsensitive(text: string, char: string): number {
    const lowerText = text.toLowerCase();
    const lowerChar = char.toLowerCase();
    return lowerText.split(lowerChar).length - 1;
}

// Usage
const result = countOccurrencesCaseInsensitive("Hello World", "h");
console.log(result); // Output: 1
function countCharacterOccurrences(
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
console.log(countCharacterOccurrences("hello world", "l")); // 3
console.log(countCharacterOccurrences("Hello World", "h", false)); // 1

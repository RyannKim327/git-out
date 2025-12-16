function countOccurrences(text: string, char: string): number {
    if (char.length !== 1) {
        throw new Error('Character parameter must be a single character');
    }
    return text.split(char).length - 1;
}

// Usage
const result = countOccurrences("hello world", "l"); // Returns 3
function countOccurrences(text: string, char: string): number {
    if (char.length !== 1) {
        throw new Error('Character parameter must be a single character');
    }
    const matches = text.match(new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'));
    return matches ? matches.length : 0;
}

// Usage
const result = countOccurrences("hello world", "l"); // Returns 3
function countOccurrences(text: string, char: string): number {
    if (char.length !== 1) {
        throw new Error('Character parameter must be a single character');
    }
    
    let count = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === char) {
            count++;
        }
    }
    return count;
}

// Usage
const result = countOccurrences("hello world", "l"); // Returns 3
function countOccurrences(text: string, char: string): number {
    if (char.length !== 1) {
        throw new Error('Character parameter must be a single character');
    }
    
    return [...text].reduce((count, currentChar) => 
        currentChar === char ? count + 1 : count, 0
    );
}

// Usage
const result = countOccurrences("hello world", "l"); // Returns 3
function countOccurrences(text: string, char: string): number {
    if (char.length !== 1) {
        throw new Error('Character parameter must be a single character');
    }
    
    return [...text].filter(c => c === char).length;
}

// Usage
const result = countOccurrences("hello world", "l"); // Returns 3
function countOccurrencesCaseInsensitive(text: string, char: string): number {
    if (char.length !== 1) {
        throw new Error('Character parameter must be a single character');
    }
    
    const lowerText = text.toLowerCase();
    const lowerChar = char.toLowerCase();
    
    return lowerText.split(lowerChar).length - 1;
}

// Usage
const result = countOccurrencesCaseInsensitive("Hello World", "h"); // Returns 1

function countCharacter(text: string, char: string): number {
    return text.split(char).length - 1;
}

// Usage
const result = countCharacter("hello world", "l");
console.log(result); // Output: 3
function countCharacter(text: string, char: string): number {
    const regex = new RegExp(char, "g");
    const matches = text.match(regex);
    return matches ? matches.length : 0;
}

// Usage
const result = countCharacter("hello world", "l");
console.log(result); // Output: 3
function countCharacter(text: string, char: string): number {
    return text.length - text.replace(new RegExp(char, "g"), "").length;
}

// Usage
const result = countCharacter("hello world", "l");
console.log(result); // Output: 3
function countCharacter(text: string, char: string): number {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === char) {
            count++;
        }
    }
    return count;
}

// Usage
const result = countCharacter("hello world", "l");
console.log(result); // Output: 3
function countCharacter(text: string, char: string): number {
    return [...text].reduce((count, currentChar) => 
        currentChar === char ? count + 1 : count, 0
    );
}

// Usage
const result = countCharacter("hello world", "l");
console.log(result); // Output: 3
function countCharacterCaseInsensitive(text: string, char: string): number {
    const lowerText = text.toLowerCase();
    const lowerChar = char.toLowerCase();
    return lowerText.split(lowerChar).length - 1;
}

// Usage
const result = countCharacterCaseInsensitive("Hello World", "h");
console.log(result); // Output: 1 (case-insensitive)
function countMultipleCharacters(text: string, chars: string[]): Record<string, number> {
    const result: Record<string, number> = {};
    
    for (const char of chars) {
        result[char] = text.split(char).length - 1;
    }
    
    return result;
}

// Usage
const counts = countMultipleCharacters("hello world", ["l", "o", "h"]);
console.log(counts); // Output: { l: 3, o: 2, h: 1 }
function countCharacter(text: string, char: string): number {
    if (char.length !== 1) {
        throw new Error("Character parameter must be exactly one character");
    }
    return text.split(char).length - 1;
}

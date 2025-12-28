function countCharacter(text: string, char: string): number {
    return text.split(char).length - 1;
}

// Example usage
const text = "hello world";
const count = countCharacter(text, "l"); // Returns 3
function countCharacter(text: string, char: string): number {
    const matches = text.match(new RegExp(char, "g"));
    return matches ? matches.length : 0;
}

// Example usage
const text = "hello world";
const count = countCharacter(text, "l"); // Returns 3
function countCharacter(text: string, char: string): number {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === char) {
            count++;
        }
    }
    return count;
}

// Example usage
const text = "hello world";
const count = countCharacter(text, "l"); // Returns 3
function countCharacter(text: string, char: string): number {
    return [...text].reduce((count, currentChar) => 
        currentChar === char ? count + 1 : count, 0
    );
}

// Example usage
const text = "hello world";
const count = countCharacter(text, "l"); // Returns 3
function countCharacter(text: string, char: string): number {
    return [...text].filter(c => c === char).length;
}

// Example usage
const text = "hello world";
const count = countCharacter(text, "l"); // Returns 3
function countCharacter(text: string, char: string): number {
    if (char.length !== 1) {
        throw new Error("Second parameter must be a single character");
    }
    
    return text.split(char).length - 1;
}

// Example usage
const text = "hello world";
const count = countCharacter(text, "l"); // Returns 3

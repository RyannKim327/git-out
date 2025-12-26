function countChar(str: string, char: string): number {
    return str.split(char).length - 1;
}

// Example usage
const text = "hello world";
const count = countChar(text, "l"); // Returns 3
console.log(count);
function countChar(str: string, char: string): number {
    const matches = str.match(new RegExp(char, "g"));
    return matches ? matches.length : 0;
}

// Example usage
const text = "hello world";
const count = countChar(text, "l"); // Returns 3
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
const count = countChar(text, "l"); // Returns 3
function countChar(str: string, char: string): number {
    return [...str].reduce((count, currentChar) => 
        currentChar === char ? count + 1 : count, 0
    );
}

// Example usage
const text = "hello world";
const count = countChar(text, "l"); // Returns 3
function countCharCaseInsensitive(str: string, char: string): number {
    const lowerStr = str.toLowerCase();
    const lowerChar = char.toLowerCase();
    return lowerStr.split(lowerChar).length - 1;
}

// Example usage
const text = "Hello World";
const count = countCharCaseInsensitive(text, "h"); // Returns 1
const count2 = countCharCaseInsensitive(text, "H"); // Returns 1
function countChar(str: string, char: string): number {
    if (char.length !== 1) {
        throw new Error("Character parameter must be a single character");
    }
    return str.split(char).length - 1;
}

// Example usage
try {
    const text = "hello world";
    const count = countChar(text, "l"); // Returns 3
    // const invalid = countChar(text, "ll"); // Throws error
} catch (error) {
    console.error(error);
}

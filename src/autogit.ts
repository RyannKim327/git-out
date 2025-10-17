function countCharacter(str: string, char: string): number {
    return str.split(char).length - 1;
}

// Example usage
const text = "hello world";
console.log(countCharacter(text, 'l')); // Output: 3
console.log(countCharacter(text, 'o')); // Output: 2
function countCharacter(str: string, char: string): number {
    const matches = str.match(new RegExp(char, 'g'));
    return matches ? matches.length : 0;
}

// Example usage
const text = "hello world";
console.log(countCharacter(text, 'l')); // Output: 3
console.log(countCharacter(text, 'z')); // Output: 0
function countCharacter(str: string, char: string): number {
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
console.log(countCharacter(text, 'l')); // Output: 3
function countCharacterIgnoreCase(str: string, char: string): number {
    const regex = new RegExp(char, 'gi'); // 'i' for case-insensitive
    const matches = str.match(regex);
    return matches ? matches.length : 0;
}

// Example usage
const text = "Hello World";
console.log(countCharacterIgnoreCase(text, 'l')); // Output: 3
console.log(countCharacterIgnoreCase(text, 'H')); // Output: 1
const countCharacter = (str: string, char: string): number => 
    str.split('').reduce((count, charInStr) => 
        charInStr === char ? count + 1 : count, 0);

// Example usage
const text = "hello world";
console.log(countCharacter(text, 'l')); // Output: 3

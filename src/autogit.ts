function countCharacter(str: string, char: string): number {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === char) {
            count++;
        }
    }
    return count;
}

// Example usage:
const myString = "hello world";
const characterToCount = "o";
const result = countCharacter(myString, characterToCount);
console.log(`The character '${characterToCount}' occurs ${result} times.`);
function countCharacter(str: string, char: string): number {
    return str.split(char).length - 1;
}

// Example usage:
const myString = "hello world";
const characterToCount = "o";
const result = countCharacter(myString, characterToCount);
console.log(`The character '${characterToCount}' occurs ${result} times.`);

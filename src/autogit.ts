const countOccurrences = (str: string, char: string): number => {
    return str.split(char).length - 1;
};

// Example usage:
const myString = "hello world";
const count = countOccurrences(myString, "l");
console.log(count); // Output: 3
const countOccurrences = (str: string, char: string): number => {
    if (char.length !== 1) {
        throw new Error("Second argument must be a single character");
    }
    return str.split(char).length - 1;
};
const count = (str.match(/l/g) || []).length;
let count = 0;
for (let i = 0; i < str.length; i++) {
    if (str[i] === char) count++;
}

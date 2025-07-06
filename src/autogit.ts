function getStringLength(input: string): number {
    let count = 0;

    // Loop through each character in the string
    for (let char of input) {
        count++;
    }

    return count;
}

// Example usage
const myString = "Hello, TypeScript!";
const lengthOfString = getStringLength(myString);
console.log(`Length of the string: ${lengthOfString}`);
function getStringLength(input: string): number {
    let count = 0;

    // Using a traditional for loop
    for (let i = 0; i < input.length; i++) {
        count++;
    }

    return count;
}

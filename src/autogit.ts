function getStringLength(str: string): number {
    let count = 0;
    while (str[count] !== undefined) {
        count++;
    }
    return count;
}

// Example usage:
const myString = "hello";
console.log(getStringLength(myString)); // Output: 5

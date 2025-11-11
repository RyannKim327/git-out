/**
 * Calculates the length of a string without using the built-in 'length' property.
 * @param str - The input string.
 * @returns The number of characters (UTF-16 code units) in the string.
 */
function getStringLength(str: string): number {
    let count = 0;
    // Iterate until the index is out of bounds (character is undefined)
    while (str[count] !== undefined) {
        count++;
    }
    return count;
}
console.log(getStringLength("hello"));   // Output: 5
console.log(getStringLength("😀"));      // Output: 2 (UTF-16 surrogate pairs)
console.log(getStringLength(""));        // Output: 0

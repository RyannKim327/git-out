function removeVowels(input: string): string {
    return input.replace(/[aeiouAEIOU]/g, '');
}

// Example usage
const originalString = "Hello World!";
const stringWithoutVowels = removeVowels(originalString);
console.log(stringWithoutVowels); // Hll Wrld!
function removeVowels(input: string): string {
    const vowels = 'aeiouAEIOU';
    let result = '';

    for (let char of input) {
        if (!vowels.includes(char)) {
            result += char; // Add non-vowel characters to the result
        }
    }

    return result;
}

// Example usage
const originalString = "Hello World!";
const stringWithoutVowels = removeVowels(originalString);
console.log(stringWithoutVowels); // Hll Wrld!

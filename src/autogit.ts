function removeVowels(input: string): string {
    return input.replace(/[aeiouAEIOU]/g, '');
}

const originalString = "Hello World!";
const stringWithoutVowels = removeVowels(originalString);

console.log(stringWithoutVowels); // Hll Wrld!

function removeVowels(str: string): string {
    return str.replace(/[aeiou]/gi, '');
}

// Example usage
console.log(removeVowels("Hello World!")); // Output: "Hll Wrld!"
function removeVowels(str: string): string {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    return str
        .split('')
        .filter(char => !vowels.has(char))
        .join('');
}

// Example usage
console.log(removeVowels("TypeScript")); // Output: "TpScrpt"

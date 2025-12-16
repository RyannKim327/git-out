function removeVowels(str: string): string {
    return str.replace(/[aeiou]/gi, '');
}

// Usage
const result = removeVowels("Hello World");
console.log(result); // "Hll Wrld"
function removeVowels(str: string): string {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    return str
        .split('')
        .filter(char => !vowels.has(char.toLowerCase()))
        .join('');
}

// Usage
const result = removeVowels("TypeScript");
console.log(result); // "TypScrpt"
function removeVowels(str: string): string {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let result = '';
    
    for (const char of str) {
        if (!vowels.has(char.toLowerCase())) {
            result += char;
        }
    }
    
    return result;
}

// Usage
const result = removeVowels("Programming");
console.log(result); // "Prgrmmng"
function removeVowelsComprehensive(str: string): string {
    // This regex includes common accented vowels
    return str.replace(/[aeiouàèìòùáéíóúâêîôûäëïöü]/gi, '');
}

// Usage
const result = removeVowelsComprehensive("café naïve");
console.log(result); // "cf nv"
function removeVowels(str: string): string {
    const vowels = /[aeiou]/i;
    return Array.from(str)
        .reduce((acc, char) => vowels.test(char) ? acc : acc + char, '');
}

// Usage
const result = removeVowels("JavaScript");
console.log(result); // "JvScrpt"

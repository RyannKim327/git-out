function removeVowels(str: string): string {
    return str.replace(/[aeiou]/gi, '');
}

// Usage
const result = removeVowels("Hello World");
console.log(result); // "Hll Wrld"
function removeVowels(str: string): string {
    const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
    return str.split('').filter(char => !vowels.includes(char)).join('');
}

// Usage
const result = removeVowels("TypeScript");
console.log(result); // "TypScrpt"
function removeVowels(str: string): string {
    const vowels = /[aeiou]/i;
    return Array.from(str).filter(char => !vowels.test(char)).join('');
}

// Usage
const result = removeVowels("Programming");
console.log(result); // "Prgrmmng"
function removeVowels(str: string): string {
    const vowels = 'aeiouAEIOU';
    let result = '';
    
    for (let i = 0; i < str.length; i++) {
        if (!vowels.includes(str[i])) {
            result += str[i];
        }
    }
    
    return result;
}

// Usage
const result = removeVowels("JavaScript");
console.log(result); // "JvScrpt"
const removeVowels = (str: string): string => str.replace(/[aeiou]/gi, '');

// Usage
const result = removeVowels("Hello TypeScript");
console.log(result); // "Hll TypScrpt"
// Remove only lowercase vowels
const removeLowercaseVowels = (str: string): string => str.replace(/[aeiou]/g, '');

// Remove only uppercase vowels  
const removeUppercaseVowels = (str: string): string => str.replace(/[AEIOU]/g, '');

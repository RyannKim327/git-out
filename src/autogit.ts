function removeVowels(text: string): string {
    return text.replace(/[aeiouAEIOU]/g, '');
}

// Example usage
const result = removeVowels("Hello World!"); // "Hll Wrld!"
console.log(result);
function removeVowelsCaseInsensitive(text: string): string {
    return text.replace(/[aeiou]/gi, '');
}

// Example usage
const result = removeVowelsCaseInsensitive("Hello World!"); // "Hll Wrld!"
function removeVowelsWithFilter(text: string): string {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    return text.split('').filter(char => !vowels.has(char)).join('');
}

// Example usage
const result = removeVowelsWithFilter("TypeScript"); // "TypScrpt"
class VowelRemover {
    private vowels: Set<string> = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    
    removeVowels(text: string): string {
        return text.split('').filter(char => !this.vowels.has(char)).join('');
    }
}

// Example usage
const remover = new VowelRemover();
console.log(remover.removeVowels("Programming")); // "Prgrmmng"
function removeVowelsInternational(text: string): string {
    // This includes some common accented vowels
    return text.replace(/[aeiouAEIOUáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙäëïöüÄËÏÖÜ]/g, '');
}

// Example usage
const result = removeVowelsInternational("Café"); // "Cf"
function removeVowels<T extends string>(text: T): string {
    return text.replace(/[aeiouAEIOU]/g, '');
}

function reverseWords(str: string): string {
    return str.split(' ').reverse().join(' ');
}

// Example usage
const result = reverseWords("Hello World TypeScript");
console.log(result); // "TypeScript World Hello"
function reverseWordsWithTrim(str: string): string {
    return str.trim().split(/\s+/).reverse().join(' ');
}

// Example usage
const result1 = reverseWordsWithTrim("Hello   World   TypeScript");
console.log(result1); // "TypeScript World Hello"
function reverseWordsRegex(str: string): string {
    return str.match(/\S+/g)?.reverse().join(' ') || '';
}

// Example usage
const result2 = reverseWordsRegex("   Hello   World   TypeScript   ");
console.log(result2); // "TypeScript World Hello"
function reverseWordsPreserve(str: string): string {
    const words = str.match(/[^\s]+/g) || [];
    return words.reverse().join(' ');
}

// Example usage
const result3 = reverseWordsPreserve("Hello, World! TypeScript?");
console.log(result3); // "TypeScript? World! Hello,"
function reverseWordsFunctional(str: string): string {
    return str.trim().split(/\s+/).reduce((acc, word) => {
        return word + ' ' + acc;
    }, '').trim();
}

// Example usage
const result4 = reverseWordsFunctional("Hello World TypeScript");
console.log(result4); // "TypeScript World Hello"
class StringReverser {
    static reverseWords(input: string): string {
        if (!input || input.trim().length === 0) {
            return input;
        }
        
        const words = input.trim().split(/\s+/);
        return words.reverse().join(' ');
    }
    
    static reverseWordsWithCase(input: string, preserveCase: boolean = true): string {
        if (!input || input.trim().length === 0) {
            return input;
        }
        
        const words = input.trim().split(/\s+/);
        const reversedWords = words.reverse();
        
        if (!preserveCase) {
            return reversedWords.map(word => word.toLowerCase()).join(' ');
        }
        
        return reversedWords.join(' ');
    }
}

// Usage examples
const example1 = "The quick brown fox";
const example2 = "   JavaScript   TypeScript   Angular   ";
const example3 = "Hello WORLD Typescript";

console.log(StringReverser.reverseWords(example1)); 
// "fox brown quick The"

console.log(StringReverser.reverseWords(example2)); 
// "Angular TypeScript JavaScript"

console.log(StringReverser.reverseWordsWithCase(example3, false)); 
// "typescript world hello"

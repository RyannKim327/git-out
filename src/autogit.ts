function reverseWords(str: string): string {
    return str.split(' ').reverse().join(' ');
}

// Example usage
const text = "Hello world from TypeScript";
console.log(reverseWords(text)); // "TypeScript from world Hello"
function reverseWords(str: string): string {
    // Split by spaces, filter out empty strings, reverse, and join
    return str.split(/\s+/).filter(word => word.length > 0).reverse().join(' ');
}

// Example usage
const text = "Hello   world  from TypeScript";
console.log(reverseWords(text)); // "TypeScript from world Hello"
function reverseWords(str: string): string {
    return str.replace(/\S+/g, match => {
        return match.split('').reverse().join('');
    });
}

// Example usage
const text = "Hello world from TypeScript";
console.log(reverseWords(text)); // "olleH dlrow morf tpircSepyT"
// Note: This reverses individual characters in each word, not word order
function reverseWords(str: string): string {
    const words = str.match(/\S+/g) || [];
    const reversedWords = words.reverse();
    let result = str;
    let wordIndex = 0;
    
    return result.replace(/\S+/g, () => {
        return reversedWords[wordIndex++];
    });
}

// Example usage
const text = "Hello   world  from TypeScript";
console.log(reverseWords(text)); // "TypeScript   from  world Hello"
function reverseWords(str: string): string {
    const words = str.split(' ');
    const result: string[] = [];
    
    for (let i = words.length - 1; i >= 0; i--) {
        if (words[i].length > 0) {
            result.push(words[i]);
        }
    }
    
    return result.join(' ');
}
function reverseWords(input: string): string {
    if (!input || typeof input !== 'string') {
        return '';
    }
    
    // Split into words, filter empty strings, reverse, and join
    const words = input.split(/\s+/).filter(word => word.length > 0);
    return words.reverse().join(' ');
}

// Generic version that can work with any separator
function reverseWordsWithSeparator(input: string, separator: string = ' '): string {
    if (!input || typeof input !== 'string') {
        return '';
    }
    
    const parts = input.split(separator).filter(part => part.length > 0);
    return parts.reverse().join(separator);
}

// Usage examples
const sentence = "Hello world from TypeScript";
console.log(reverseWords(sentence)); // "TypeScript from world Hello"

const csvData = "apple,banana,cherry,date";
console.log(reverseWordsWithSeparator(csvData, ',')); // "date,cherry,banana,apple"

function reverseWords(str: string): string {
    return str.split(' ').reverse().join(' ');
}

// Example usage
console.log(reverseWords("Hello World TypeScript")); 
// Output: "TypeScript World Hello"
function reverseWordsPreserveSpacing(str: string): string {
    // Split on one or more spaces to handle multiple spaces
    return str.split(/\s+/).reverse().join(' ');
}

// Example usage
console.log(reverseWordsPreserveSpacing("Hello   World  TypeScript")); 
// Output: "TypeScript World Hello"
function reverseWordsExactSpacing(str: string): string {
    const words = str.match(/\S+|\s+/g) || [];
    const reversedWords = words.filter(word => /\S/.test(word)).reverse();
    const spaces = words.filter(word => /^\s+$/.test(word));
    
    let result = '';
    for (let i = 0; i < reversedWords.length; i++) {
        result += reversedWords[i];
        if (i < spaces.length) {
            result += spaces[i];
        }
    }
    return result;
}

// Example usage
console.log(reverseWordsExactSpacing("Hello   World  TypeScript")); 
// Output: "TypeScript  World   Hello"
function reverseWordsRegex(str: string): string {
    return str.replace(/(\S+)(\s*)/g, (_, word, space) => {
        return '';
    }).trim();
}

// More practical approach using array manipulation
function reverseWordsSimple(str: string): string {
    const words: string[] = [];
    let currentWord = '';
    
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') {
            if (currentWord) {
                words.push(currentWord);
                currentWord = '';
            }
        } else {
            currentWord += str[i];
        }
    }
    
    if (currentWord) {
        words.push(currentWord);
    }
    
    return words.reverse().join(' ');
}
function reverseWordsTyped(str: string): string {
    const words: string[] = str.trim().split(/\s+/);
    const reversed: string[] = words.reverse();
    return reversed.join(' ');
}

// Example with string array type
const reverseWordsArray = (str: string): string => {
    return str.split(' ').reverse().join(' ');
};
function reverseWords(str: string): string {
    return str.split(' ').reverse().join(' ');
}

// Test cases
const testCases: [string, string][] = [
    ["Hello World", "World Hello"],
    ["TypeScript is awesome", "awesome is TypeScript"],
    ["a b c", "c b a"],
    ["Single", "Single"],
    ["", ""]
];

testCases.forEach(([input, expected]) => {
    const result = reverseWords(input);
    console.log(`"${input}" -> "${result}" (Expected: "${expected}")`);
});

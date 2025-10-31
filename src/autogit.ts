function longestCommonPrefix(strings: string[]): string {
    if (strings.length === 0) return '';
    if (strings.length === 1) return strings[0];
    
    // Sort to handle edge cases and potentially optimize
    const sortedStrings = [...strings].sort();
    const first = sortedStrings[0];
    const last = sortedStrings[sortedStrings.length - 1];
    
    let prefix = '';
    for (let i = 0; i < Math.min(first.length, last.length); i++) {
        if (first[i] === last[i]) {
            prefix += first[i];
        } else {
            break;
        }
    }
    
    return prefix;
}

// Example usage
const strings = ['flower', 'flow', 'flight'];
console.log(longestCommonPrefix(strings)); // Output: "fl"
function longestCommonPrefix(strings: string[]): string {
    if (strings.length === 0) return '';
    
    return strings.reduce((prefix, currentString) => {
        let i = 0;
        while (i < prefix.length && i < currentString.length && prefix[i] === currentString[i]) {
            i++;
        }
        return prefix.substring(0, i);
    });
}

// Example usage
const strings = ['flower', 'flow', 'flight'];
console.log(longestCommonPrefix(strings)); // Output: "fl"
function longestCommonPrefix(strings: string[]): string {
    if (strings.length === 0) return '';
    
    let prefix = strings[0];
    
    for (let i = 1; i < strings.length; i++) {
        while (strings[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === '') return '';
        }
    }
    
    return prefix;
}

// Example usage
const strings = ['flower', 'flow', 'flight'];
console.log(longestCommonPrefix(strings)); // Output: "fl"
function longestCommonPrefix(strings: string[]): string {
    if (strings.length === 0) return '';
    
    for (let i = 0; i < strings[0].length; i++) {
        const char = strings[0][i];
        for (let j = 1; j < strings.length; j++) {
            if (i === strings[j].length || strings[j][i] !== char) {
                return strings[0].substring(0, i);
            }
        }
    }
    
    return strings[0];
}

// Example usage
const strings = ['flower', 'flow', 'flight'];
console.log(longestCommonPrefix(strings)); // Output: "fl"
function longestCommonPrefix<T extends string>(strings: T[]): string {
    if (strings.length === 0) return '';
    if (strings.length === 1) return strings[0];
    
    const minLength = Math.min(...strings.map(str => str.length));
    let prefix = '';
    
    for (let i = 0; i < minLength; i++) {
        const currentChar = strings[0][i];
        if (strings.every(str => str[i] === currentChar)) {
            prefix += currentChar;
        } else {
            break;
        }
    }
    
    return prefix;
}

// Example usage
const strings = ['flower', 'flow', 'flight'] as const;
console.log(longestCommonPrefix(strings)); // Output: "fl"
function longestCommonPrefix(strings: string[]): string {
    // Handle empty array
    if (strings.length === 0) return '';
    
    // Handle single string
    if (strings.length === 1) return strings[0];
    
    // Handle empty strings
    if (strings.some(str => str.length === 0)) return '';
    
    // Use one of the methods above
    // ...
}

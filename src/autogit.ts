function longestCommonPrefix(strings: string[]): string {
    if (strings.length === 0) return '';
    if (strings.length === 1) return strings[0];
    
    let prefix = strings[0];
    
    for (let i = 1; i < strings.length; i++) {
        const current = strings[i];
        let j = 0;
        
        // Compare each character until mismatch
        while (j < prefix.length && j < current.length && prefix[j] === current[j]) {
            j++;
        }
        
        prefix = prefix.substring(0, j);
        
        // Early exit if no common prefix
        if (prefix === '') return '';
    }
    
    return prefix;
}

// Example usage
const strings = ['flower', 'flow', 'flight'];
console.log(longestCommonPrefix(strings)); // Output: "fl"
function longestCommonPrefix(strings: string[]): string {
    if (strings.length === 0) return '';
    
    return strings.reduce((prefix, current) => {
        let i = 0;
        while (i < prefix.length && i < current.length && prefix[i] === current[i]) {
            i++;
        }
        return prefix.substring(0, i);
    });
}

// Example usage
const strings = ['dog', 'racecar', 'car'];
console.log(longestCommonPrefix(strings)); // Output: ""
function longestCommonPrefix(strings: string[]): string {
    if (strings.length === 0) return '';
    
    // Sort the array to compare only first and last elements
    strings.sort();
    const first = strings[0];
    const last = strings[strings.length - 1];
    
    let i = 0;
    while (i < first.length && i < last.length && first[i] === last[i]) {
        i++;
    }
    
    return first.substring(0, i);
}

// Example usage
const strings = ['interspecies', 'interstellar', 'interstate'];
console.log(longestCommonPrefix(strings)); // Output: "inters"
function longestCommonPrefix(strings: string[]): string {
    // Handle edge cases
    if (!strings || strings.length === 0) return '';
    if (strings.length === 1) return strings[0];
    
    // Find the shortest string to limit comparisons
    const minLength = Math.min(...strings.map(s => s.length));
    
    for (let i = 0; i < minLength; i++) {
        const char = strings[0][i];
        
        // Check if all strings have the same character at position i
        for (let j = 1; j < strings.length; j++) {
            if (strings[j][i] !== char) {
                return strings[0].substring(0, i);
            }
        }
    }
    
    return strings[0].substring(0, minLength);
}

// Example usage
const testCases = [
    ['flower', 'flow', 'flight'],
    ['dog', 'racecar', 'car'],
    [''],
    ['single'],
    ['prefix', 'prefix', 'prefix']
];

testCases.forEach(test => {
    console.log(`${test} -> "${longestCommonPrefix(test)}"`);
});
const longestCommonPrefix = (strings: string[]): string => {
    if (strings.length === 0) return '';
    
    const [first, ...rest] = strings;
    let prefix = first;
    
    for (const str of rest) {
        while (!str.startsWith(prefix)) {
            prefix = prefix.slice(0, -1);
            if (prefix === '') return '';
        }
    }
    
    return prefix;
};

// Example usage
console.log(longestCommonPrefix(['typescript', 'type', 'typing'])); // "ty"
function findLongestCommonPrefix(strings: readonly string[]): string {
    // Use readonly to prevent mutation if needed
    if (strings.length === 0) return '';
    
    let prefix = strings[0];
    
    for (let i = 1; i < strings.length; i++) {
        const current = strings[i];
        let j = 0;
        
        while (j < prefix.length && j < current.length && prefix[j] === current[j]) {
            j++;
        }
        
        prefix = prefix.substring(0, j);
        if (prefix === '') break;
    }
    
    return prefix;
}

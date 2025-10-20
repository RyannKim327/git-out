function longestCommonPrefix(strings: string[]): string {
    if (strings.length === 0) return '';
    if (strings.length === 1) return strings[0];
    
    let prefix = strings[0];
    
    for (let i = 1; i < strings.length; i++) {
        const currentString = strings[i];
        let j = 0;
        
        // Compare characters until mismatch or end of shorter string
        while (j < prefix.length && j < currentString.length && prefix[j] === currentString[j]) {
            j++;
        }
        
        prefix = prefix.substring(0, j);
        
        // Early exit if prefix becomes empty
        if (prefix === '') return '';
    }
    
    return prefix;
}

// Example usage
const strings = ['flower', 'flow', 'flight'];
console.log(longestCommonPrefix(strings)); // Output: "fl"
function longestCommonPrefixReduce(strings: string[]): string {
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
console.log(longestCommonPrefixReduce(['flower', 'flow', 'flight'])); // "fl"
function longestCommonPrefixSorted(strings: string[]): string {
    if (strings.length === 0) return '';
    
    // Sort to compare only first and last strings
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
console.log(longestCommonPrefixSorted(['flower', 'flow', 'flight'])); // "fl"
function longestCommonPrefixOptimized(strings: string[]): string {
    if (strings.length === 0) return '';
    
    // Find the shortest string to use as initial prefix
    const minLength = Math.min(...strings.map(s => s.length));
    let prefix = strings[0].substring(0, minLength);
    
    for (const str of strings) {
        for (let i = 0; i < prefix.length; i++) {
            if (str[i] !== prefix[i]) {
                prefix = prefix.substring(0, i);
                break;
            }
        }
        if (prefix === '') return '';
    }
    
    return prefix;
}
function longestCommonPrefix(strings: string[]): string {
    if (strings.length === 0) return '';
    if (strings.length === 1) return strings[0];
    
    let prefix = strings[0];
    
    for (let i = 1; i < strings.length; i++) {
        const currentString = strings[i];
        let j = 0;
        
        while (j < prefix.length && j < currentString.length && prefix[j] === currentString[j]) {
            j++;
        }
        
        prefix = prefix.substring(0, j);
        
        if (prefix === '') return '';
    }
    
    return prefix;
}

// Test cases
console.log(longestCommonPrefix(['flower', 'flow', 'flight'])); // "fl"
console.log(longestCommonPrefix(['dog', 'racecar', 'car']));    // ""
console.log(longestCommonPrefix(['apple', 'apple', 'apple']));  // "apple"
console.log(longestCommonPrefix(['']));                         // ""
console.log(longestCommonPrefix([]));                           // ""

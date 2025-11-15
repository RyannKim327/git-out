function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return "";
    
    let prefix = strs[0];
    
    for (let i = 1; i < strs.length; i++) {
        const current = strs[i];
        
        // Reduce prefix until it matches the beginning of current string
        while (current.indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === "") return "";
        }
    }
    
    return prefix;
}

// Example usage
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"]));    // ""
function longestCommonPrefixVertical(strs: string[]): string {
    if (strs.length === 0) return "";
    
    // Find the shortest string to avoid index out of bounds
    const shortest = Math.min(...strs.map(str => str.length));
    
    for (let i = 0; i < shortest; i++) {
        const char = strs[0][i];
        
        for (let j = 1; j < strs.length; j++) {
            if (strs[j][i] !== char) {
                return strs[0].substring(0, i);
            }
        }
    }
    
    return strs[0].substring(0, shortest);
}

// Example usage
console.log(longestCommonPrefixVertical(["flower", "flow", "flight"])); // "fl"
function longestCommonPrefixFunctional(strs: string[]): string {
    if (strs.length === 0) return "";
    
    return strs.reduce((prefix, current) => {
        while (current.indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === "") return "";
        }
        return prefix;
    }, strs[0]);
}

// Example usage
console.log(longestCommonPrefixFunctional(["flower", "flow", "flight"])); // "fl"
function longestCommonPrefixDivide(strs: string[]): string {
    if (strs.length === 0) return "";
    
    function commonPrefix(left: string, right: string): string {
        const minLength = Math.min(left.length, right.length);
        for (let i = 0; i < minLength; i++) {
            if (left[i] !== right[i]) {
                return left.substring(0, i);
            }
        }
        return left.substring(0, minLength);
    }
    
    function divideAndConquer(strs: string[], left: number, right: number): string {
        if (left === right) {
            return strs[left];
        }
        
        const mid = Math.floor((left + right) / 2);
        const leftPrefix = divideAndConquer(strs, left, mid);
        const rightPrefix = divideAndConquer(strs, mid + 1, right);
        
        return commonPrefix(leftPrefix, rightPrefix);
    }
    
    return divideAndConquer(strs, 0, strs.length - 1);
}

// Example usage
console.log(longestCommonPrefixDivide(["flower", "flow", "flight"])); // "fl"
const longestCommonPrefixOneLiner = (strs: string[]): string => {
    if (!strs.length) return "";
    
    return strs.reduce((a, b) => 
        a.length > b.length ? [a, b] : [b, a]
    ).reduce((prefix, str) => {
        while (!str.startsWith(prefix)) {
            prefix = prefix.slice(0, -1);
        }
        return prefix;
    });
};

// Example usage
console.log(longestCommonPrefixOneLiner(["flower", "flow", "flight"])); // "fl"
function longestCommonPrefixTyped(strs: readonly string[]): string {
    // Input validation
    if (!Array.isArray(strs)) {
        throw new Error("Input must be an array of strings");
    }
    
    if (strs.length === 0) return "";
    
    // Ensure all elements are strings
    if (!strs.every(str => typeof str === 'string')) {
        throw new Error("All array elements must be strings");
    }
    
    // Handle case with only one string
    if (strs.length === 1) return strs[0];
    
    let prefix = strs[0];
    
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === "") return "";
        }
    }
    
    return prefix;
}

// Example usage with different scenarios
const testCases = [
    ["flower", "flow", "flight"],
    ["dog", "racecar", "car"],
    ["interspecies", "interstellar", "interstate"],
    [""],
    ["single"],
    []
];

testCases.forEach(test => {
    console.log(`Input: ${JSON.stringify(test)} -> "${longestCommonPrefixTyped(test)}"`);
});
// This is typically the best choice
function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return "";
    
    for (let i = 0; i < strs[0].length; i++) {
        const char = strs[0][i];
        for (let j = 1; j < strs.length; j++) {
            if (i === strs[j].length || strs[j][i] !== char) {
                return strs[0].substring(0, i);
            }
        }
    }
    
    return strs[0];
}

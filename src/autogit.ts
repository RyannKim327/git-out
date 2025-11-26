function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return '';
    if (strs.length === 1) return strs[0];
    
    let prefix = strs[0];
    
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === '') return '';
        }
    }
    
    return prefix;
}

// Example usage
const strings = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strings)); // "fl"
function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return '';
    
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

// Example usage
const strings = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strings)); // "fl"
function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return '';
    
    return strs.reduce((prev, current) => {
        let i = 0;
        while (i < prev.length && i < current.length && prev[i] === current[i]) {
            i++;
        }
        return prev.substring(0, i);
    });
}

// Example usage
const strings = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strings)); // "fl"
function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return '';
    return divideAndConquer(strs, 0, strs.length - 1);
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

function commonPrefix(left: string, right: string): string {
    const minLength = Math.min(left.length, right.length);
    for (let i = 0; i < minLength; i++) {
        if (left[i] !== right[i]) {
            return left.substring(0, i);
        }
    }
    return left.substring(0, minLength);
}

// Example usage
const strings = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strings)); // "fl"
function longestCommonPrefix(strs: string[]): string {
    return strs.reduce((prefix, current) => 
        current.slice(0, prefix.length === current.length ? 
            [...prefix].findIndex((char, i) => char !== current[i]) : 
            [...current].findIndex((char, i) => i >= prefix.length || char !== prefix[i])
        )
    , strs[0] || '');
}

// More readable version of the one-liner
function longestCommonPrefixReadable(strs: string[]): string {
    if (strs.length === 0) return '';
    
    return strs.reduce((prefix, current) => {
        let i = 0;
        while (i < prefix.length && i < current.length && prefix[i] === current[i]) {
            i++;
        }
        return prefix.substring(0, i);
    }, strs[0]);
}
function longestCommonPrefixSafe(strs: string[]): string {
    // Handle empty array
    if (strs.length === 0) return '';
    
    // Handle array with empty strings
    if (strs.some(str => str.length === 0)) return '';
    
    // Handle single element array
    if (strs.length === 1) return strs[0];
    
    // Main logic (using vertical scanning)
    for (let i = 0; i < strs[0].length; i++) {
        const char = strs[0][i];
        for (let j = 1; j < strs.length; j++) {
            if (i >= strs[j].length || strs[j][i] !== char) {
                return strs[0].substring(0, i);
            }
        }
    }
    
    return strs[0];
}

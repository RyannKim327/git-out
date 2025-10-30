function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return "";
    
    let prefix = strs[0];
    
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === "") return "";
        }
    }
    
    return prefix;
}

// Example usage
const strings1 = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strings1)); // "fl"

const strings2 = ["dog", "racecar", "car"];
console.log(longestCommonPrefix(strings2)); // ""
function longestCommonPrefixVertical(strs: string[]): string {
    if (strs.length === 0) return "";
    
    const firstString = strs[0];
    
    for (let i = 0; i < firstString.length; i++) {
        const char = firstString[i];
        
        for (let j = 1; j < strs.length; j++) {
            if (i >= strs[j].length || strs[j][i] !== char) {
                return firstString.substring(0, i);
            }
        }
    }
    
    return firstString;
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
console.log(longestCommonPrefixFunctional(["interspecies", "interstellar", "interstate"])); // "inters"
function longestCommonPrefixDivideConquer(strs: string[]): string {
    if (strs.length === 0) return "";
    
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
console.log(longestCommonPrefixDivideConquer(["leetcode", "leet", "lee", "le"])); // "le"
function longestCommonPrefixSafe(strs: string[]): string {
    // Handle edge cases
    if (!strs || strs.length === 0) return "";
    if (strs.length === 1) return strs[0];
    
    // Find the shortest string to limit iterations
    const shortest = strs.reduce((a, b) => a.length <= b.length ? a : b);
    
    for (let i = 0; i < shortest.length; i++) {
        const currentChar = shortest[i];
        
        // Check if all strings have the same character at position i
        if (!strs.every(str => str[i] === currentChar)) {
            return shortest.substring(0, i);
        }
    }
    
    return shortest;
}

// Example with various test cases
const testCases = [
    ["flower", "flow", "flight"],
    ["dog", "racecar", "car"],
    ["interspecies", "interstellar", "interstate"],
    ["prefix", "prefix", "prefix"],
    [""],
    ["single"],
    ["a", "a", "b"] // No common prefix
];

testCases.forEach((test, index) => {
    console.log(`Test ${index + 1}:`, longestCommonPrefixSafe(test));
});

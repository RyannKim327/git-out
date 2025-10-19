function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return "";
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

// Example usage
const strings = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strings)); // "fl"
function longestCommonPrefixVertical(strs: string[]): string {
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

// Example usage
console.log(longestCommonPrefixVertical(["flower", "flow", "flight"])); // "fl"
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

function commonPrefix(str1: string, str2: string): string {
    const minLength = Math.min(str1.length, str2.length);
    
    for (let i = 0; i < minLength; i++) {
        if (str1[i] !== str2[i]) {
            return str1.substring(0, i);
        }
    }
    
    return str1.substring(0, minLength);
}

// Example usage
console.log(longestCommonPrefixDivideConquer(["flower", "flow", "flight"])); // "fl"
function longestCommonPrefixFunctional(strs: string[]): string {
    if (strs.length === 0) return "";
    
    return strs.reduce((prefix, current) => {
        while (current.indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1);
            if (!prefix) return "";
        }
        return prefix;
    }, strs[0]);
}

// Example usage
console.log(longestCommonPrefixFunctional(["flower", "flow", "flight"])); // "fl"
function longestCommonPrefixComplete(strs: string[]): string {
    // Handle edge cases
    if (!strs || strs.length === 0) return "";
    if (strs.length === 1) return strs[0];
    
    // Handle empty strings in array
    if (strs.some(str => str === "")) return "";
    
    const firstStr = strs[0];
    let prefix = "";
    
    for (let i = 0; i < firstStr.length; i++) {
        const currentChar = firstStr[i];
        
        // Check if all strings have the same character at position i
        const allMatch = strs.every(str => 
            i < str.length && str[i] === currentChar
        );
        
        if (allMatch) {
            prefix += currentChar;
        } else {
            break;
        }
    }
    
    return prefix;
}

// Test with various cases
console.log(longestCommonPrefixComplete(["flower", "flow", "flight"])); // "fl"
console.log(longestCommonPrefixComplete(["dog", "racecar", "car"]));     // ""
console.log(longestCommonPrefixComplete([""]));                          // ""
console.log(longestCommonPrefixComplete([]));                            // ""
console.log(longestCommonPrefixComplete(["a"]));                         // "a"

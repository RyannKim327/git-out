function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return '';
    
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
function longestCommonPrefixVertical(strs: string[]): string {
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
console.log(longestCommonPrefixVertical(strings)); // "fl"
function longestCommonPrefixDivideConquer(strs: string[]): string {
    if (strs.length === 0) return '';
    return divideAndConquer(strs, 0, strs.length - 1);
}

function divideAndConquer(strs: string[], left: number, right: number): string {
    if (left === right) {
        return strs[left];
    } else {
        const mid = Math.floor((left + right) / 2);
        const leftLCP = divideAndConquer(strs, left, mid);
        const rightLCP = divideAndConquer(strs, mid + 1, right);
        return commonPrefix(leftLCP, rightLCP);
    }
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
console.log(longestCommonPrefixDivideConquer(strings)); // "fl"
function longestCommonPrefixFunctional(strs: string[]): string {
    if (strs.length === 0) return '';
    
    return strs.reduce((prefix, current) => {
        let i = 0;
        while (i < prefix.length && i < current.length && prefix[i] === current[i]) {
            i++;
        }
        return prefix.substring(0, i);
    });
}

// Example usage
console.log(longestCommonPrefixFunctional(strings)); // "fl"
function longestCommonPrefixSafe(strs: string[]): string {
    // Handle edge cases
    if (strs.length === 0) return '';
    if (strs.length === 1) return strs[0];
    
    // Check for empty strings
    if (strs.some(str => str.length === 0)) return '';
    
    let prefix = '';
    const firstString = strs[0];
    
    for (let i = 0; i < firstString.length; i++) {
        const currentChar = firstString[i];
        
        // Check if all strings have the same character at position i
        const allMatch = strs.every(str => str[i] === currentChar);
        
        if (allMatch) {
            prefix += currentChar;
        } else {
            break;
        }
    }
    
    return prefix;
}

// Example usage with various test cases
console.log(longestCommonPrefixSafe(["flower", "flow", "flight"])); // "fl"
console.log(longestCommonPrefixSafe(["dog", "racecar", "car"]));    // ""
console.log(longestCommonPrefixSafe(["", "test"]));                 // ""
console.log(longstCommonPrefixSafe(["same", "same", "same"]));     // "same"

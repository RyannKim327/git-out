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
    } else {
        const mid = Math.floor((left + right) / 2);
        const leftPrefix = divideAndConquer(strs, left, mid);
        const rightPrefix = divideAndConquer(strs, mid + 1, right);
        return commonPrefix(leftPrefix, rightPrefix);
    }
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
function longestCommonPrefixFunctional(strs: string[]): string {
    if (strs.length === 0) return "";
    
    return strs.reduce((prefix, current) => {
        let i = 0;
        while (i < prefix.length && i < current.length && prefix[i] === current[i]) {
            i++;
        }
        return prefix.substring(0, i);
    });
}

// Example usage
console.log(longestCommonPrefixFunctional(["flower", "flow", "flight"])); // "fl"
function longestCommonPrefixRobust(strs: readonly string[]): string {
    // Type guard and validation
    if (!Array.isArray(strs) || strs.length === 0) {
        return "";
    }
    
    // Handle single string case
    if (strs.length === 1) {
        return strs[0];
    }
    
    let prefix = strs[0];
    
    for (let i = 1; i < strs.length; i++) {
        const current = strs[i];
        
        // Find the minimum length between current prefix and current string
        const minLength = Math.min(prefix.length, current.length);
        let j = 0;
        
        while (j < minLength && prefix[j] === current[j]) {
            j++;
        }
        
        prefix = prefix.substring(0, j);
        
        if (prefix === "") {
            return "";
        }
    }
    
    return prefix;
}

// Example with more comprehensive testing
const testCases = [
    ["flower", "flow", "flight"],
    ["dog", "racecar", "car"],
    ["interspecies", "interstellar", "interstate"],
    [""],
    ["same", "same", "same"],
    ["a"],
];

testCases.forEach((testCase, index) => {
    console.log(`Test ${index + 1}:`, longestCommonPrefixRobust(testCase));
});

function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) {
        return "";
    }
    
    if (strs.length === 1) {
        return strs[0];
    }
    
    // Start with the first string as the current prefix
    let prefix = strs[0];
    
    // Compare with each subsequent string
    for (let i = 1; i < strs.length; i++) {
        let j = 0;
        
        // Find the common prefix length between current prefix and strs[i]
        while (j < prefix.length && j < strs[i].length && 
               prefix[j] === strs[i][j]) {
            j++;
        }
        
        // Update prefix to the common portion
        prefix = prefix.substring(0, j);
        
        // If prefix is empty, no need to continue
        if (prefix === "") {
            return "";
        }
    }
    
    return prefix;
}

// Example usage:
const strings = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strings)); // Output: "fl"

const strings2 = ["dog", "racecar", "car"];
console.log(longestCommonPrefix(strings2)); // Output: ""

const strings3 = ["interspecies", "interstellar", "interstate"];
console.log(longestCommonPrefix(strings3)); // Output: "inters"
function longestCommonPrefixFunctional(strs: string[]): string {
    if (strs.length === 0) return "";
    
    const first = strs[0];
    
    return strs.reduce((prefix, str) => {
        let i = 0;
        while (i < prefix.length && i < str.length && prefix[i] === str[i]) {
            i++;
        }
        return prefix.substring(0, i);
    }, first);
}
interface StringSet {
    strings: string[];
}

function findLongestCommonPrefix(set: StringSet): string {
    return longestCommonPrefix(set.strings);
}

// Usage
const stringSet: StringSet = {
    strings: ["prefix", "preamble", "premiere"]
};
console.log(findLongestCommonPrefix(stringSet)); // "pre"

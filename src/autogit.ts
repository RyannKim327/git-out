function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) {
        return "";
    }
    
    if (strs.length === 1) {
        return strs[0];
    }
    
    // Start with the first string as the prefix
    let prefix = strs[0];
    
    // Compare with each subsequent string
    for (let i = 1; i < strs.length; i++) {
        let currentStr = strs[i];
        
        // Find the common prefix between current prefix and current string
        while (prefix !== "" && !currentStr.startsWith(prefix)) {
            // Shorten the prefix by one character and try again
            prefix = prefix.substring(0, prefix.length - 1);
        }
        
        // If prefix is empty, no common prefix exists
        if (prefix === "") {
            return "";
        }
    }
    
    return prefix;
}
// Example usage
const strings1 = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strings1)); // Output: "fl"

const strings2 = ["dog", "racecar", "car"];
console.log(longestCommonPrefix(strings2)); // Output: ""

const strings3 = ["interspecies", "interstellar", "interstate"];
console.log(longestCommonPrefix(strings3)); // Output: "inters"

const strings4 = ["apple", "apple", "apple"];
console.log(longestCommonPrefix(strings4)); // Output: "apple"

const emptyArray: string[] = [];
console.log(longestCommonPrefix(emptyArray)); // Output: ""
function longestCommonPrefixV2(strs: string[]): string {
    if (strs.length === 0) return "";
    
    const minLength = Math.min(...strs.map(s => s.length));
    
    for (let i = 0; i < minLength; i++) {
        const char = strs[0][i];
        
        // Check if all strings have the same character at position i
        for (let j = 1; j < strs.length; j++) {
            if (strs[j][i] !== char) {
                return strs[0].substring(0, i);
            }
        }
    }
    
    return strs[0].substring(0, minLength);
}

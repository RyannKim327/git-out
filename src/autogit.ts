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
function longestCommonPrefixReduce(strs: string[]): string {
    if (strs.length === 0) return "";
    
    return strs.reduce((prefix, current) => {
        while (current.indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === "") return "";
        }
        return prefix;
    }, strs[0]);
}
function findLongestCommonPrefix<T extends string>(strings: T[]): string {
    if (strings.length === 0) return "" as string;
    if (strings.length === 1) return strings[0];
    
    strings.sort((a, b) => a.length - b.length);
    const shortest = strings[0];
    
    for (let i = 0; i < shortest.length; i++) {
        const char = shortest[i];
        
        for (let j = 1; j < strings.length; j++) {
            if (strings[j][i] !== char) {
                return shortest.substring(0, i);
            }
        }
    }
    
    return shortest;
}

// Example with type safety
const words = ["typescript", "type", "typical"] as const;
const prefix = findLongestCommonPrefix(words); // Type: "typ"
// Test cases
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"]));    // ""
console.log(longestCommonPrefix(["interspecies", "interstellar", "interstate"])); // "inters"
console.log(longestCommonPrefix([""]));                         // ""
console.log(longestCommonPrefix(["a"]));                        // "a"

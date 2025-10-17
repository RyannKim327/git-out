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
console.log(longestCommonPrefixFunctional(["interspecies", "interstellar", "interstate"])); // "inters"
function longestCommonPrefixDivideConquer(strs: string[]): string {
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
    
    function divideAndConquer(l: number, r: number): string {
        if (l === r) return strs[l];
        
        const mid = Math.floor((l + r) / 2);
        const leftPrefix = divideAndConquer(l, mid);
        const rightPrefix = divideAndConquer(mid + 1, r);
        
        return commonPrefix(leftPrefix, rightPrefix);
    }
    
    return divideAndConquer(0, strs.length - 1);
}

// Example usage
console.log(longestCommonPrefixDivideConquer(["leetcode", "leet", "lee", "le"])); // "le"
class StringUtils {
    static longestCommonPrefix(strs: string[]): string {
        if (strs.length === 0) return "";
        
        const firstStr = strs[0];
        let result = "";
        
        for (let i = 0; i < firstStr.length; i++) {
            const currentChar = firstStr[i];
            
            // Check if all strings have the same character at position i
            const allSame = strs.every(str => 
                i < str.length && str[i] === currentChar
            );
            
            if (allSame) {
                result += currentChar;
            } else {
                break;
            }
        }
        
        return result;
    }
}

// Example usage
console.log(StringUtils.longestCommonPrefix(["apple", "ape", "april"])); // "ap"
// Test cases
console.log(longestCommonPrefix([])); // ""
console.log(longestCommonPrefix([""])); // ""
console.log(longestCommonPrefix(["a"])); // "a"
console.log(longestCommonPrefix(["abc", "abc"])); // "abc"
console.log(longestCommonPrefix(["abc", "abcd", "ab"])); // "ab"

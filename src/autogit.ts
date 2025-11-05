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
function longestCommonPrefixReduce(strs: string[]): string {
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
console.log(longestCommonPrefixReduce(strings)); // "fl"
function longestCommonPrefixDivide(strs: string[]): string {
    if (strs.length === 0) return '';
    
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
console.log(longestCommonPrefixDivide(strings)); // "fl"
function longestCommonPrefixBinary(strs: string[]): string {
    if (strs.length === 0) return '';
    
    function isCommonPrefix(strs: string[], length: number): boolean {
        const str1 = strs[0].substring(0, length);
        for (let i = 1; i < strs.length; i++) {
            if (!strs[i].startsWith(str1)) {
                return false;
            }
        }
        return true;
    }
    
    let minLen = Math.min(...strs.map(s => s.length));
    let low = 1;
    let high = minLen;
    
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (isCommonPrefix(strs, mid)) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    
    return strs[0].substring(0, Math.floor((low + high) / 2));
}

// Example usage
console.log(longestCommonPrefixBinary(strings)); // "fl"
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

// Test cases
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"]));    // ""
console.log(longestCommonPrefix(["apple", "apple", "apple"]));  // "apple"
console.log(longestCommonPrefix([""]));                         // ""
console.log(longestCommonPrefix(["a"]));                        // "a"
console.log(longestCommonPrefix([]));                           // ""

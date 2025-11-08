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
console.log(longestCommonPrefix(strings)); // Output: "fl"
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
const strings = ["flower", "flow", "flight"];
console.log(longestCommonPrefixVertical(strings)); // Output: "fl"
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
const strings = ["flower", "flow", "flight"];
console.log(longestCommonPrefixReduce(strings)); // Output: "fl"
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
    
    function lcp(strs: string[], left: number, right: number): string {
        if (left === right) return strs[left];
        
        const mid = Math.floor((left + right) / 2);
        const lcpLeft = lcp(strs, left, mid);
        const lcpRight = lcp(strs, mid + 1, right);
        
        return commonPrefix(lcpLeft, lcpRight);
    }
    
    return lcp(strs, 0, strs.length - 1);
}

// Example usage
const strings = ["flower", "flow", "flight"];
console.log(longestCommonPrefixDivide(strings)); // Output: "fl"
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
    
    let minLen = Math.min(...strs.map(str => str.length));
    let low = 1;
    let high = minLen;
    
    while (low <= high) {
        const middle = Math.floor((low + high) / 2);
        if (isCommonPrefix(strs, middle)) {
            low = middle + 1;
        } else {
            high = middle - 1;
        }
    }
    
    return strs[0].substring(0, Math.floor((low + high) / 2));
}

// Example usage
const strings = ["flower", "flow", "flight"];
console.log(longestCommonPrefixBinary(strings)); // Output: "fl"
function longestCommonPrefixOneLiner(strs: string[]): string {
    return strs.reduce((prefix, str) => 
        str.substring(0, prefix.length) === prefix ? prefix 
        : longestCommonPrefixOneLiner([prefix, str.slice(0, -1)])
    );
}

// Example usage
const strings = ["flower", "flow", "flight"];
console.log(longestCommonPrefixOneLiner(strings)); // Output: "fl"
function longestCommonPrefixSafe(strs: string[]): string {
    // Handle empty array
    if (strs.length === 0) return '';
    
    // Handle single string case
    if (strs.length === 1) return strs[0];
    
    // Handle empty strings
    if (strs.some(str => str.length === 0)) return '';
    
    return longestCommonPrefix(strs); // Use any of the above methods
}

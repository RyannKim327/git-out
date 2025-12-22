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

// Example usage:
const strings = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strings)); // Output: "fl"
function longestCommonPrefix(strs: string[]): string {
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

// Example usage:
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return '';
    
    return strs.reduce((prefix, current) => {
        let i = 0;
        while (i < prefix.length && i < current.length && prefix[i] === current[i]) {
            i++;
        }
        return prefix.substring(0, i);
    });
}

// Example usage:
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return '';
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

function commonPrefix(left: string, right: string): string {
    const minLength = Math.min(left.length, right.length);
    for (let i = 0; i < minLength; i++) {
        if (left[i] !== right[i]) {
            return left.substring(0, i);
        }
    }
    return left.substring(0, minLength);
}

// Example usage:
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
function longestCommonPrefix(strs: string[]): string {
    return strs.reduce((prefix, str) => 
        str.slice(0, [...prefix].findIndex((char, i) => char !== str[i]) || prefix.length)
    );
}

// Example usage:
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
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

// Test cases:
console.log(longCommonPrefix(["flower", "flow", "flight"])); // "fl"
console.log(longCommonPrefix(["dog", "racecar", "car"]));    // ""
console.log(longCommonPrefix(["interspecies", "interstellar", "interstate"])); // "inters"
console.log(longCommonPrefix([""]));                         // ""
console.log(longCommonPrefix(["a"]));                        // "a"

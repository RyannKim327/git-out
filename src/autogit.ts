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
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"]));    // ""
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
    
    function divideAndConquer(strs: string[], left: number, right: number): string {
        if (left === right) {
            return strs[left];
        }
        
        const mid = Math.floor((left + right) / 2);
        const leftPrefix = divideAndConquer(strs, left, mid);
        const rightPrefix = divideAndConquer(strs, mid + 1, right);
        
        return commonPrefix(leftPrefix, rightPrefix);
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
}
function longestCommonPrefixFunctional(strs: string[]): string {
    if (strs.length === 0) return "";
    
    const shortest = strs.reduce((a, b) => a.length <= b.length ? a : b);
    
    return shortest.split('')
        .map((char, index) => ({ char, index }))
        .takeWhile(({ char, index }) => 
            strs.every(str => str[index] === char)
        )
        .map(({ char }) => char)
        .join('');
}

// Add takeWhile polyfill for TypeScript
declare global {
    interface Array<T> {
        takeWhile(predicate: (value: T, index: number, array: T[]) => boolean): T[];
    }
}

Array.prototype.takeWhile = function<T>(predicate: (value: T, index: number, array: T[]) => boolean): T[] {
    const result: T[] = [];
    for (let i = 0; i < this.length; i++) {
        if (!predicate(this[i], i, this)) break;
        result.push(this[i]);
    }
    return result;
};
function longestCommonPrefixReduce(strs: string[]): string {
    return strs.reduce((prefix, current) => {
        let i = 0;
        while (i < prefix.length && i < current.length && prefix[i] === current[i]) {
            i++;
        }
        return prefix.substring(0, i);
    }, strs[0] || "");
}
function longestCommonPrefixSafe(strs: string[]): string {
    // Input validation
    if (!Array.isArray(strs)) {
        throw new Error("Input must be an array of strings");
    }
    
    if (strs.length === 0) {
        return "";
    }
    
    if (strs.some(str => typeof str !== 'string')) {
        throw new Error("All elements must be strings");
    }
    
    // Handle empty strings in array
    if (strs.some(str => str.length === 0)) {
        return "";
    }
    
    let prefix = strs[0];
    
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === "") return "";
        }
    }
    
    return prefix;
}
// Test cases
const testCases = [
    ["flower", "flow", "flight"],     // "fl"
    ["dog", "racecar", "car"],        // ""
    ["interspecies", "interstellar", "interstate"], // "inters"
    ["prefix", "prefix", "prefix"],   // "prefix"
    [""],                             // ""
    []                                // ""
];

testCases.forEach((test, i) => {
    console.log(`Test ${i + 1}:`, longestCommonPrefix(test));
});

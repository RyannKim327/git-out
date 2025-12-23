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

// Usage
const strings = ["flower", "flow", "flight"];
const result = longestCommonPrefix(strings); // "fl"
function longestCommonPrefix(strs: string[]): string {
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
function longestCommonPrefix(strs: string[]): string {
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
function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return "";
    
    return strs.reduce((prefix, current) => {
        while (current.indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1);
            if (prefix === "") return "";
        }
        return prefix;
    }, strs[0]);
}
function longestCommonPrefix(strs: string[]): string {
    // Handle edge cases
    if (strs.length === 0) return "";
    if (strs.length === 1) return strs[0];
    
    // Sort to make comparison easier (optional optimization)
    const sorted = [...strs].sort();
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    
    let i = 0;
    while (i < first.length && i < last.length && first[i] === last[i]) {
        i++;
    }
    
    return first.substring(0, i);
}

// Usage with type checking
const strings: string[] = ["flower", "flow", "flight"];
const result = longestCommonPrefix(strings);
console.log(result); // "fl"
class LongestCommonPrefix {
    static find(strs: string[]): string {
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
}

// Test cases
const testCases = [
    { input: ["flower", "flow", "flight"], expected: "fl" },
    { input: ["dog", "racecar", "car"], expected: "" },
    { input: ["interspecies", "interstellar", "interstate"], expected: "inters" },
    { input: [""], expected: "" },
    { input: ["a"], expected: "a" },
    { input: ["", ""], expected: "" }
];

testCases.forEach((testCase, index) => {
    const result = LongestCommonPrefix.find(testCase.input);
    console.log(`Test ${index + 1}:`, result === testCase.expected ? "PASS" : "FAIL");
    console.log(`  Input: ${testCase.input.join(", ")}`);
    console.log(`  Expected: "${testCase.expected}", Got: "${result}"`);
});

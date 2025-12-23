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
console.log(longestCommonPrefix(strings)); // "fl"
function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return "";
    
    for (let i = 0; i < strs[0].length; i++) {
        const char = strs[0][i];
        
        for (let j = 1; j < strs.length; j++) {
            if (i >= strs[j].length || strs[j][i] !== char) {
                return strs[0].substring(0, i);
            }
        }
    }
    
    return strs[0];
}

// Usage
const strings = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strings)); // "fl"
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

function commonPrefix(left: string, right: string): string {
    const minLength = Math.min(left.length, right.length);
    for (let i = 0; i < minLength; i++) {
        if (left[i] !== right[i]) {
            return left.substring(0, i);
        }
    }
    return left.substring(0, minLength);
}

// Usage
const strings = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strings)); // "fl"
function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return "";
    
    return strs.reduce((prefix, current) => {
        while (!current.startsWith(prefix)) {
            prefix = prefix.slice(0, -1);
            if (prefix === "") return "";
        }
        return prefix;
    }, strs[0]);
}

// Usage
const strings = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strings)); // "fl"
function longestCommonPrefix(strs: string[]): string {
    if (!Array.isArray(strs) || strs.length === 0) {
        return "";
    }
    
    // Handle case where array contains non-string values
    const validStrings = strs.filter(str => typeof str === 'string');
    if (validStrings.length === 0) return "";
    
    let prefix = validStrings[0];
    
    for (let i = 1; i < validStrings.length; i++) {
        const current = validStrings[i];
        
        // Find the minimum length between prefix and current string
        const minLength = Math.min(prefix.length, current.length);
        let j = 0;
        
        while (j < minLength && prefix[j] === current[j]) {
            j++;
        }
        
        prefix = prefix.substring(0, j);
        
        if (prefix === "") return "";
    }
    
    return prefix;
}

// Usage with type safety
const strings: string[] = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strings)); // "fl"
// Test function
function testLongestCommonPrefix() {
    const testCases = [
        { input: ["flower", "flow", "flight"], expected: "fl" },
        { input: ["dog", "racecar", "car"], expected: "" },
        { input: ["interspecies", "interstellar", "interstate"], expected: "inters" },
        { input: [""], expected: "" },
        { input: ["a"], expected: "a" },
        { input: ["", ""], expected: "" },
        { input: ["same", "same", "same"], expected: "same" },
        { input: [], expected: "" }
    ];

    testCases.forEach((testCase, index) => {
        const result = longestCommonPrefix(testCase.input);
        console.log(`Test ${index + 1}: ${result === testCase.expected ? "✓" : "✗"}`);
        console.log(`  Input: ${JSON.stringify(testCase.input)}`);
        console.log(`  Expected: "${testCase.expected}"`);
        console.log(`  Got: "${result}"`);
        console.log();
    });
}

testLongestCommonPrefix();

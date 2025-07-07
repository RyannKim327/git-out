function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return "";
    let prefix = strs[0];

    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            // Shorten the prefix until it matches the start of the current string
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === "") return "";
        }
    }

    return prefix;
}

// Example usage:
const strings = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strings)); // Output: "fl"
function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return "";

    for (let i = 0; i < strs[0].length; i++) {
        const char = strs[0][i];

        for (let j = 1; j < strs.length; j++) {
            // Check if current character matches or if index exceeds string length
            if (i >= strs[j].length || strs[j][i] !== char) {
                return strs[0].substring(0, i);
            }
        }
    }

    return strs[0];
}

// Example usage:
const strings = ["introduction", "integrate", "integer"];
console.log(longestCommonPrefix(strings)); // Output: "int"
function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return "";
    return strs.reduce((prefix, current) => {
        let i = 0;
        while (i < prefix.length && i < current.length && prefix[i] === current[i]) {
            i++;
        }
        return prefix.substring(0, i);
    }, strs[0]);
}

// Example usage:
const strings = ["interstellar", "interstate", "internal"];
console.log(longestCommonPrefix(strings)); // Output: "in"

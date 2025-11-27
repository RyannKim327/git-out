function longestCommonSubstring(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    // Create DP table
    const dp: number[][] = Array(m + 1)
        .fill(null)
        .map(() => Array(n + 1).fill(0));
    
    let maxLength = 0;
    let endIndex = 0;

    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndex = i - 1; // Store ending index in str1
                }
            } else {
                dp[i][j] = 0;
            }
        }
    }

    // Extract the substring
    if (maxLength === 0) return "";
    return str1.substring(endIndex - maxLength + 1, endIndex + 1);
}

// Example usage
const result = longestCommonSubstring("abcdef", "zcdemf");
console.log(result); // Output: "cde"
function longestCommonSubstringOptimized(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    let maxLength = 0;
    let endIndex = 0;
    
    // Use only previous row for DP
    let prev: number[] = Array(n + 1).fill(0);
    let curr: number[] = Array(n + 1).fill(0);

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                curr[j] = prev[j - 1] + 1;
                
                if (curr[j] > maxLength) {
                    maxLength = curr[j];
                    endIndex = i - 1;
                }
            } else {
                curr[j] = 0;
            }
        }
        
        // Swap arrays for next iteration
        [prev, curr] = [curr, prev];
    }

    return maxLength > 0 
        ? str1.substring(endIndex - maxLength + 1, endIndex + 1)
        : "";
}
interface SuffixTreeNode {
    children: Map<string, SuffixTreeNode>;
    indexes: number[];
}

class SuffixTree {
    root: SuffixTreeNode;

    constructor() {
        this.root = { children: new Map(), indexes: [] };
    }

    insert(str: string, index: number): void {
        let node = this.root;
        for (const char of str) {
            if (!node.children.has(char)) {
                node.children.set(char, { children: new Map(), indexes: [] });
            }
            node = node.children.get(char)!;
            node.indexes.push(index);
        }
    }

    findLongestCommonSubstring(str: string): string {
        let longest = "";
        let current = "";
        let node = this.root;

        for (const char of str) {
            if (node.children.has(char)) {
                current += char;
                node = node.children.get(char)!;
                
                if (current.length > longest.length) {
                    longest = current;
                }
            } else {
                current = "";
                node = this.root;
            }
        }

        return longest;
    }
}

function longestCommonSubstringSuffixTree(str1: string, str2: string): string {
    const tree = new SuffixTree();
    
    // Build suffix tree for first string
    for (let i = 0; i < str1.length; i++) {
        tree.insert(str1.substring(i), i);
    }

    return tree.findLongestCommonSubstring(str2);
}
function longestCommonSubstringBruteForce(str1: string, str2: string): string {
    let longest = "";
    
    for (let i = 0; i < str1.length; i++) {
        for (let j = i + 1; j <= str1.length; j++) {
            const substring = str1.substring(i, j);
            if (str2.includes(substring) && substring.length > longest.length) {
                longest = substring;
            }
        }
    }
    
    return longest;
}
// Test function
function testLongestCommonSubstring(): void {
    const testCases = [
        { str1: "abcdef", str2: "zcdemf", expected: "cde" },
        { str1: "hello", str2: "world", expected: "l" },
        { str1: "programming", str2: "program", expected: "program" },
        { str1: "abc", str2: "xyz", expected: "" }
    ];

    testCases.forEach(({ str1, str2, expected }, index) => {
        const result = longestCommonSubstring(str1, str2);
        console.log(`Test ${index + 1}:`);
        console.log(`Input: "${str1}", "${str2}"`);
        console.log(`Expected: "${expected}", Got: "${result}"`);
        console.log(`Pass: ${result === expected}`);
        console.log("---");
    });
}

testLongestSubstring();

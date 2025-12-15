function longestCommonSubstringBruteForce(str1: string, str2: string): string {
    let longest = '';
    
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

// Usage
const result = longestCommonSubstringBruteForce("abcdef", "zcdemno");
console.log(result); // "cde"
function longestCommonSubstring(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    const matrix: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    
    let maxLength = 0;
    let endIndex = 0;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1] + 1;
                
                if (matrix[i][j] > maxLength) {
                    maxLength = matrix[i][j];
                    endIndex = i - 1;
                }
            }
        }
    }
    
    return str1.substring(endIndex - maxLength + 1, endIndex + 1);
}

// Usage
const result = longestCommonSubstring("abcdefgh", "xyzcdefgvw");
console.log(result); // "cdefg"
interface LCSResult {
    substring: string;
    length: number;
    position1: number;
    position2: number;
}

function longestCommonSubstringEnhanced(str1: string, str2: string): LCSResult[] {
    const m = str1.length;
    const n = str2.length;
    const matrix: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    
    let maxLength = 0;
    const results: LCSResult[] = [];
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1] + 1;
                
                if (matrix[i][j] > maxLength) {
                    maxLength = matrix[i][j];
                    results.length = 0; // Clear previous results
                }
                
                if (matrix[i][j] === maxLength && maxLength > 0) {
                    const substring = str1.substring(i - maxLength, i);
                    results.push({
                        substring,
                        length: maxLength,
                        position1: i - maxLength,
                        position2: j - maxLength
                    });
                }
            }
        }
    }
    
    return results;
}

// Usage
const results = longestCommonSubstringEnhanced("abcxyzdef", "xyzabcdef");
results.forEach(result => {
    console.log(`Substring: "${result.substring}", Length: ${result.length}`);
});
class LongestCommonSubstringFinder {
    constructor(private str1: string, private str2: string) {}
    
    find(): string {
        const m = this.str1.length;
        const n = this.str2.length;
        const matrix: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
        
        let maxLength = 0;
        let endIndex = 0;
        
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (this.str1[i - 1] === this.str2[j - 1]) {
                    matrix[i][j] = matrix[i - 1][j - 1] + 1;
                    
                    if (matrix[i][j] > maxLength) {
                        maxLength = matrix[i][j];
                        endIndex = i - 1;
                    }
                }
            }
        }
        
        return this.str1.substring(endIndex - maxLength + 1, endIndex + 1);
    }
    
    findAll(): string[] {
        const results = longestCommonSubstringEnhanced(this.str1, this.str2);
        return [...new Set(results.map(r => r.substring))]; // Remove duplicates
    }
    
    getLength(): number {
        return this.find().length;
    }
}

// Usage
const finder = new LongestCommonSubstringFinder("programming", "programmer");
console.log(finder.find()); // "programm"
console.log(finder.getLength()); // 8
console.log(finder.findAll()); // ["programm"]
// Test performance
function testPerformance(str1: string, str2: string): void {
    console.time('Brute Force');
    const result1 = longestCommonSubstringBruteForce(str1, str2);
    console.timeEnd('Brute Force');
    
    console.time('Dynamic Programming');
    const result2 = longestCommonSubstring(str1, str2);
    console.timeEnd('Dynamic Programming');
    
    console.log(`Results: "${result1}" vs "${result2}"`);
}

// Test with different string lengths
testPerformance("short", "sort");
testPerformance("abcdefghijklmnopqrstuvwxyz", "xyzabcdefghijklmnopqrstuvw");

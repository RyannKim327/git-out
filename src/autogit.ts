function naiveStringMatch(text: string, pattern: string): number[] {
    const positions: number[] = [];
    const n = text.length;
    const m = pattern.length;

    for (let i = 0; i <= n - m; i++) {
        let match = true;
        for (let j = 0; j < m; j++) {
            if (text[i + j] !== pattern[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            positions.push(i);
        }
    }
    return positions;
}
function kmpStringMatch(text: string, pattern: string): number[] {
    const positions: number[] = [];
    const n = text.length;
    const m = pattern.length;
    
    // Build prefix table (longest prefix suffix)
    const prefixTable: number[] = new Array(m).fill(0);
    let length = 0;
    let i = 1;
    
    while (i < m) {
        if (pattern[i] === pattern[length]) {
            length++;
            prefixTable[i] = length;
            i++;
        } else {
            if (length !== 0) {
                length = prefixTable[length - 1];
            } else {
                prefixTable[i] = 0;
                i++;
            }
        }
    }

    // Perform matching
    i = 0; // index for text
    let j = 0; // index for pattern
    
    while (i < n) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }
        
        if (j === m) {
            positions.push(i - j);
            j = prefixTable[j - 1];
        } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = prefixTable[j - 1];
            } else {
                i++;
            }
        }
    }
    
    return positions;
}
function boyerMooreStringMatch(text: string, pattern: string): number[] {
    const positions: number[] = [];
    const n = text.length;
    const m = pattern.length;
    
    // Precompute bad character table
    const badChar: Record<string, number> = {};
    for (let i = 0; i < m; i++) {
        badChar[pattern[i]] = i;
    }
    
    let shift = 0;
    while (shift <= n - m) {
        let j = m - 1;
        
        while (j >= 0 && pattern[j] === text[shift + j]) {
            j--;
        }
        
        if (j < 0) {
            positions.push(shift);
            shift += (shift + m < n) ? m - (badChar[text[shift + m]] || -1) : 1;
        } else {
            const badCharShift = j - (badChar[text[shift + j]] || -1);
            shift += Math.max(1, badCharShift);
        }
    }
    
    return positions;
}
function rabinKarpStringMatch(text: string, pattern: string): number[] {
    const positions: number[] = [];
    const n = text.length;
    const m = pattern.length;
    
    // Prime number for hashing
    const prime = 101;
    let patternHash = 0;
    let textHash = 0;
    let h = 1;
    
    // Calculate h = prime^(m-1)
    for (let i = 0; i < m - 1; i++) {
        h = (h * 256) % prime;
    }
    
    // Calculate initial hash values
    for (let i = 0; i < m; i++) {
        patternHash = (256 * patternHash + pattern.charCodeAt(i)) % prime;
        textHash = (256 * textHash + text.charCodeAt(i)) % prime;
    }
    
    for (let i = 0; i <= n - m; i++) {
        if (patternHash === textHash) {
            // Verify actual match to prevent hash collisions
            let match = true;
            for (let j = 0; j < m; j++) {
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                positions.push(i);
            }
        }
        
        // Calculate hash for next window
        if (i < n - m) {
            textHash = (256 * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % prime;
            if (textHash < 0) textHash += prime;
        }
    }
    
    return positions;
}
// Example usage
const text = "ababcabcabababd";
const pattern = "ababd";

console.log("Naive:", naiveStringMatch(text, pattern));
console.log("KMP:", kmpStringMatch(text, pattern));
console.log("Boyer-Moore:", boyerMooreStringMatch(text, pattern));
console.log("Rabin-Karp:", rabinKarpStringMatch(text, pattern));

// Performance comparison
function measurePerformance(fn: Function, text: string, pattern: string) {
    const start = performance.now();
    const result = fn(text, pattern);
    const end = performance.now();
    return { result, time: end - start };
}
// Simplified Aho-Corasick implementation
class AhoCorasick {
    private patterns: string[];
    
    constructor(patterns: string[]) {
        this.patterns = patterns;
    }
    
    search(text: string): Map<string, number[]> {
        const results = new Map<string, number[]>();
        
        this.patterns.forEach(pattern => {
            const matches = kmpStringMatch(text, pattern);
            if (matches.length > 0) {
                results.set(pattern, matches);
            }
        });
        
        return results;
    }
}

// Usage
const ac = new AhoCorasick(["abc", "ab", "bc"]);
console.log(ac.search("abcabcab"));

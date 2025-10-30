function naiveStringMatch(text: string, pattern: string): number[] {
    const matches: number[] = [];
    const n = text.length;
    const m = pattern.length;

    for (let i = 0; i <= n - m; i++) {
        let j = 0;
        while (j < m && text[i + j] === pattern[j]) {
            j++;
        }
        if (j === m) {
            matches.push(i);
        }
    }
    
    return matches;
}
function kmpStringMatch(text: string, pattern: string): number[] {
    const matches: number[] = [];
    const n = text.length;
    const m = pattern.length;
    
    // Build prefix function (longest prefix which is also suffix)
    const prefix: number[] = new Array(m).fill(0);
    let k = 0;
    
    for (let i = 1; i < m; i++) {
        while (k > 0 && pattern[k] !== pattern[i]) {
            k = prefix[k - 1];
        }
        if (pattern[k] === pattern[i]) {
            k++;
        }
        prefix[i] = k;
    }
    
    // Perform matching
    k = 0;
    for (let i = 0; i < n; i++) {
        while (k > 0 && pattern[k] !== text[i]) {
            k = prefix[k - 1];
        }
        if (pattern[k] === text[i]) {
            k++;
        }
        if (k === m) {
            matches.push(i - m + 1);
            k = prefix[k - 1];
        }
    }
    
    return matches;
}
function boyerMooreMatch(text: string, pattern: string): number[] {
    const matches: number[] = [];
    const n = text.length;
    const m = pattern.length;
    
    // Build bad character table
    const badChar: Record<string, number> = {};
    for (let i = 0; i < m; i++) {
        badChar[pattern[i]] = i;
    }
    
    let s = 0;
    while (s <= n - m) {
        let j = m - 1;
        
        // Find mismatch from right
        while (j >= 0 && pattern[j] === text[s + j]) {
            j--;
        }
        
        if (j < 0) {
            matches.push(s);
            s += (s + m < n) ? m - (badChar[text[s + m]] || -1) : 1;
        } else {
            s += Math.max(1, j - (badChar[text[s + j]] || -1));
        }
    }
    
    return matches;
}
function rabinKarpMatch(text: string, pattern: string): number[] {
    const matches: number[] = [];
    const n = text.length;
    const m = pattern.length;
    
    if (m === 0 || n < m) return matches;
    
    // Choose a prime number for hashing
    const prime = 101;
    let patternHash = 0;
    let textHash = 0;
    let h = 1;
    
    // Calculate h = prime^(m-1)
    for (let i = 0; i < m - 1; i++) {
        h = (h * prime) % Number.MAX_SAFE_INTEGER;
    }
    
    // Calculate initial hash values
    for (let i = 0; i < m; i++) {
        patternHash = (prime * patternHash + pattern.charCodeAt(i)) % Number.MAX_SAFE_INTEGER;
        textHash = (prime * textHash + text.charCodeAt(i)) % Number.MAX_SAFE_INTEGER;
    }
    
    for (let i = 0; i <= n - m; i++) {
        if (patternHash === textHash) {
            // Verify to avoid hash collisions
            let j = 0;
            while (j < m && text[i + j] === pattern[j]) {
                j++;
            }
            if (j === m) {
                matches.push(i);
            }
        }
        
        if (i < n - m) {
            textHash = (prime * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % Number.MAX_SAFE_INTEGER;
            if (textHash < 0) {
                textHash += Number.MAX_SAFE_INTEGER;
            }
        }
    }
    
    return matches;
}
class StringMatcher {
    static methods = {
        NAIVE: 'naive',
        KMP: 'kmp',
        BOYER_MOORE: 'boyerMoore',
        RABIN_KARP: 'rabinKarp'
    } as const;

    static match(text: string, pattern: string, method: keyof typeof StringMatcher.methods = 'KMP'): number[] {
        switch (method) {
            case 'naive':
                return this.naiveMatch(text, pattern);
            case 'kmp':
                return this.kmpMatch(text, pattern);
            case 'boyerMoore':
                return this.boyerMooreMatch(text, pattern);
            case 'rabinKarp':
                return this.rabinKarpMatch(text, pattern);
            default:
                throw new Error(`Unknown method: ${method}`);
        }
    }

    private static naiveMatch(text: string, pattern: string): number[] {
        // Implementation as above
    }

    private static kmpMatch(text: string, pattern: string): number[] {
        // Implementation as above
    }

    private static boyerMooreMatch(text: string, pattern: string): number[] {
        // Implementation as above
    }

    private static rabinKarpMatch(text: string, pattern: string): number[] {
        // Implementation as above
    }
}

// Usage
const text = "ababcabcabababd";
const pattern = "ababd";

console.log(StringMatcher.match(text, pattern, 'KMP')); // [10]
console.log(StringMatcher.match(text, pattern, 'RABIN_KARP')); // [10]
// Test the algorithms
const testText = "THIS IS A TEST TEXT";
const testPattern = "TEST";

console.log("Naive:", naiveStringMatch(testText, testPattern));
console.log("KMP:", kmpStringMatch(testText, testPattern));
console.log("Boyer-Moore:", boyerMooreMatch(testText, testPattern));
console.log("Rabin-Karp:", rabinKarpMatch(testText, testPattern));

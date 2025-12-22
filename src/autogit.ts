class KMP {
    private pattern: string;
    private lps: number[]; // Longest Prefix Suffix array
    
    constructor(pattern: string) {
        this.pattern = pattern;
        this.lps = this.computeLPS();
    }
    
    private computeLPS(): number[] {
        const lps = new Array(this.pattern.length).fill(0);
        let len = 0; // length of the previous longest prefix suffix
        let i = 1;
        
        while (i < this.pattern.length) {
            if (this.pattern[i] === this.pattern[len]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len !== 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        
        return lps;
    }
    
    search(text: string): number[] {
        const matches: number[] = [];
        let i = 0; // index for text
        let j = 0; // index for pattern
        
        while (i < text.length) {
            if (this.pattern[j] === text[i]) {
                i++;
                j++;
            }
            
            if (j === this.pattern.length) {
                matches.push(i - j);
                j = this.lps[j - 1];
            } else if (i < text.length && this.pattern[j] !== text[i]) {
                if (j !== 0) {
                    j = this.lps[j - 1];
                } else {
                    i++;
                }
            }
        }
        
        return matches;
    }
}

// Usage
const kmp = new KMP("abc");
const positions = kmp.search("abcabcab");
console.log(positions); // [0, 3]
class BoyerMoore {
    private pattern: string;
    private badChar: Map<string, number>;
    
    constructor(pattern: string) {
        this.pattern = pattern;
        this.badChar = this.buildBadCharTable();
    }
    
    private buildBadCharTable(): Map<string, number> {
        const table = new Map<string, number>();
        for (let i = 0; i < this.pattern.length - 1; i++) {
            table.set(this.pattern[i], i);
        }
        return table;
    }
    
    search(text: string): number[] {
        const matches: number[] = [];
        const n = text.length;
        const m = this.pattern.length;
        
        let shift = 0;
        
        while (shift <= n - m) {
            let j = m - 1;
            
            // Compare from right to left
            while (j >= 0 && this.pattern[j] === text[shift + j]) {
                j--;
            }
            
            if (j < 0) {
                matches.push(shift);
                shift += (shift + m < n) ? m - (this.badChar.get(text[shift + m]) || -1) : 1;
            } else {
                const badCharShift = j - (this.badChar.get(text[shift + j]) || -1);
                shift += Math.max(1, badCharShift);
            }
        }
        
        return matches;
    }
}
class RabinKarp {
    private pattern: string;
    private patternHash: number;
    private prime: number = 101;
    
    constructor(pattern: string) {
        this.pattern = pattern;
        this.patternHash = this.calculateHash(pattern);
    }
    
    private calculateHash(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash * 256 + str.charCodeAt(i)) % this.prime;
        }
        return hash;
    }
    
    search(text: string): number[] {
        const matches: number[] = [];
        const n = text.length;
        const m = this.pattern.length;
        
        if (n < m) return matches;
        
        let textHash = this.calculateHash(text.substring(0, m));
        
        // Precompute 256^(m-1) mod prime
        let h = 1;
        for (let i = 0; i < m - 1; i++) {
            h = (h * 256) % this.prime;
        }
        
        for (let i = 0; i <= n - m; i++) {
            if (textHash === this.patternHash) {
                // Verify actual match to handle hash collisions
                if (text.substring(i, i + m) === this.pattern) {
                    matches.push(i);
                }
            }
            
            if (i < n - m) {
                textHash = (256 * (textHash - text.charCodeAt(i) * h) + 
                           text.charCodeAt(i + m)) % this.prime;
                
                if (textHash < 0) {
                    textHash += this.prime;
                }
            }
        }
        
        return matches;
    }
}
interface StringMatcher {
    search(text: string, pattern: string): number[];
    searchAll(text: string, pattern: string): number[];
}

class SimpleStringMatcher implements StringMatcher {
    search(text: string, pattern: string): number[] {
        const matches: number[] = [];
        let pos = text.indexOf(pattern);
        
        while (pos !== -1) {
            matches.push(pos);
            pos = text.indexOf(pattern, pos + 1);
        }
        
        return matches;
    }
    
    searchAll(text: string, pattern: string): number[] {
        return this.search(text, pattern);
    }
}
class StringMatchingBenchmark {
    static benchmark(matcher: StringMatcher, text: string, pattern: string, iterations: number = 1000): number {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            matcher.search(text, pattern);
        }
        
        const end = performance.now();
        return end - start;
    }
}

// Usage example
const text = "ababcabcabababd";
const pattern = "ababd";

const kmp = new KMP(pattern);
const bm = new BoyerMoore(pattern);
const rk = new RabinKarp(pattern);
const simple = new SimpleStringMatcher();

console.log("KMP matches:", kmp.search(text));
console.log("Boyer-Moore matches:", bm.search(text));
console.log("Rabin-Karp matches:", rk.search(text));
console.log("Simple matches:", simple.search(text, pattern));

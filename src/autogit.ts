class KMP {
    static buildPatternTable(pattern: string): number[] {
        const table = new Array(pattern.length).fill(0);
        let prefixIndex = 0;
        let suffixIndex = 1;

        while (suffixIndex < pattern.length) {
            if (pattern[prefixIndex] === pattern[suffixIndex]) {
                table[suffixIndex] = prefixIndex + 1;
                prefixIndex++;
                suffixIndex++;
            } else if (prefixIndex === 0) {
                table[suffixIndex] = 0;
                suffixIndex++;
            } else {
                prefixIndex = table[prefixIndex - 1];
            }
        }

        return table;
    }

    static search(text: string, pattern: string): number[] {
        if (pattern.length === 0) return [];
        
        const patternTable = this.buildPatternTable(pattern);
        const matches: number[] = [];
        let textIndex = 0;
        let patternIndex = 0;

        while (textIndex < text.length) {
            if (text[textIndex] === pattern[patternIndex]) {
                if (patternIndex === pattern.length - 1) {
                    matches.push(textIndex - pattern.length + 1);
                    patternIndex = patternTable[patternIndex] || 0;
                } else {
                    patternIndex++;
                }
                textIndex++;
            } else if (patternIndex > 0) {
                patternIndex = patternTable[patternIndex - 1];
            } else {
                textIndex++;
            }
        }

        return matches;
    }
}

// Usage
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";
console.log(KMP.search(text, pattern)); // [10]
class BoyerMoore {
    static buildBadCharTable(pattern: string): Map<string, number> {
        const table = new Map<string, number>();
        for (let i = 0; i < pattern.length - 1; i++) {
            table.set(pattern[i], pattern.length - i - 1);
        }
        return table;
    }

    static search(text: string, pattern: string): number[] {
        const matches: number[] = [];
        const badCharTable = this.buildBadCharTable(pattern);
        const patternLength = pattern.length;
        const textLength = text.length;

        let i = 0;
        while (i <= textLength - patternLength) {
            let j = patternLength - 1;
            
            while (j >= 0 && pattern[j] === text[i + j]) {
                j--;
            }

            if (j < 0) {
                matches.push(i);
                i += patternLength;
            } else {
                const shift = badCharTable.get(text[i + j]) || patternLength;
                i += Math.max(1, shift);
            }
        }

        return matches;
    }
}
class RabinKarp {
    private static readonly BASE = 256;
    private static readonly MOD = 997; // Prime number

    static search(text: string, pattern: string): number[] {
        const matches: number[] = [];
        const n = text.length;
        const m = pattern.length;
        
        if (m === 0 || n < m) return matches;

        // Calculate pattern hash and initial window hash
        let patternHash = 0;
        let windowHash = 0;
        let highestPower = 1;

        for (let i = 0; i < m; i++) {
            patternHash = (patternHash * this.BASE + pattern.charCodeAt(i)) % this.MOD;
            windowHash = (windowHash * this.BASE + text.charCodeAt(i)) % this.MOD;
            if (i > 0) {
                highestPower = (highestPower * this.BASE) % this.MOD;
            }
        }

        for (let i = 0; i <= n - m; i++) {
            if (windowHash === patternHash) {
                // Verify potential match
                if (text.substring(i, i + m) === pattern) {
                    matches.push(i);
                }
            }

            // Roll the hash
            if (i < n - m) {
                windowHash = (windowHash - text.charCodeAt(i) * highestPower) % this.MOD;
                windowHash = (windowHash * this.BASE + text.charCodeAt(i + m)) % this.MOD;
                windowHash = (windowHash + this.MOD) % this.MOD; // Handle negative values
            }
        }

        return matches;
    }
}
interface StringMatcher {
    search(text: string, pattern: string): number[];
}

class StringMatching {
    private static readonly matchers: Record<string, StringMatcher> = {
        kmp: new KMPMatcher(),
        boyermoore: new BoyerMooreMatcher(),
        rabinkarp: new RabinKarpMatcher()
    };

    static search(
        text: string, 
        pattern: string, 
        algorithm: keyof typeof StringMatching.matchers = 'kmp'
    ): number[] {
        return this.matchers[algorithm].search(text, pattern);
    }
}

// Usage examples
const text = "Hello world, welcome to TypeScript string matching!";
const pattern = "TypeScript";

console.log(StringMatching.search(text, pattern, 'kmp'));
console.log(StringMatching.search(text, pattern, 'boyermoore'));
console.log(StringMatching.search(text, pattern, 'rabinkarp'));
// Built-in methods (good for most cases)
const index = text.indexOf(pattern);
const allIndices = [...text.matchAll(new RegExp(pattern, 'g'))].map(m => m.index!);

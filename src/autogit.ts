class KMP {
    private pattern: string;
    private lps: number[];

    constructor(pattern: string) {
        this.pattern = pattern;
        this.lps = this.computeLPS(pattern);
    }

    private computeLPS(pattern: string): number[] {
        const lps = new Array(pattern.length).fill(0);
        let length = 0;
        let i = 1;

        while (i < pattern.length) {
            if (pattern[i] === pattern[length]) {
                length++;
                lps[i] = length;
                i++;
            } else {
                if (length !== 0) {
                    length = lps[length - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }

        return lps;
    }

    search(text: string): number[] {
        const indices: number[] = [];
        let i = 0; // index for text
        let j = 0; // index for pattern

        while (i < text.length) {
            if (this.pattern[j] === text[i]) {
                i++;
                j++;
            }

            if (j === this.pattern.length) {
                indices.push(i - j);
                j = this.lps[j - 1];
            } else if (i < text.length && this.pattern[j] !== text[i]) {
                if (j !== 0) {
                    j = this.lps[j - 1];
                } else {
                    i++;
                }
            }
        }

        return indices;
    }
}

// Usage
const kmp = new KMP("abc");
const result = kmp.search("abcabcabc");
console.log(result); // [0, 3, 6]
class BoyerMoore {
    private pattern: string;
    private badCharTable: Map<string, number>;
    private goodSuffixTable: number[];

    constructor(pattern: string) {
        this.pattern = pattern;
        this.badCharTable = this.buildBadCharTable(pattern);
        this.goodSuffixTable = this.buildGoodSuffixTable(pattern);
    }

    private buildBadCharTable(pattern: string): Map<string, number> {
        const table = new Map<string, number>();
        for (let i = 0; i < pattern.length; i++) {
            table.set(pattern[i], i);
        }
        return table;
    }

    private buildGoodSuffixTable(pattern: string): number[] {
        const table = new Array(pattern.length).fill(0);
        const prefixPos = this.computePrefix(pattern);

        for (let i = pattern.length - 1; i >= 0; i--) {
            const suffixLength = pattern.length - i - 1;
            if (prefixPos[suffixLength] > 0) {
                table[i] = pattern.length - prefixPos[suffixLength];
            } else {
                table[i] = pattern.length;
            }
        }

        return table;
    }

    private computePrefix(pattern: string): number[] {
        const prefix = new Array(pattern.length).fill(0);
        let k = 0;

        for (let i = 1; i < pattern.length; i++) {
            while (k > 0 && pattern[k] !== pattern[i]) {
                k = prefix[k - 1];
            }
            if (pattern[k] === pattern[i]) {
                k++;
            }
            prefix[i] = k;
        }

        return prefix;
    }

    search(text: string): number[] {
        const indices: number[] = [];
        let i = 0;

        while (i <= text.length - this.pattern.length) {
            let j = this.pattern.length - 1;

            while (j >= 0 && this.pattern[j] === text[i + j]) {
                j--;
            }

            if (j < 0) {
                indices.push(i);
                i += this.goodSuffixTable[0];
            } else {
                const badCharShift = j - (this.badCharTable.get(text[i + j]) ?? -1);
                const goodSuffixShift = this.goodSuffixTable[j];
                i += Math.max(1, Math.max(badCharShift, goodSuffixShift));
            }
        }

        return indices;
    }
}
class RabinKarp {
    private pattern: string;
    private patternHash: number;
    private base: number;
    private modulus: number;

    constructor(pattern: string, base: number = 256, modulus: number = 101) {
        this.pattern = pattern;
        this.base = base;
        this.modulus = modulus;
        this.patternHash = this.computeHash(pattern);
    }

    private computeHash(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash * this.base + str.charCodeAt(i)) % this.modulus;
        }
        return hash;
    }

    search(text: string): number[] {
        const indices: number[] = [];
        const n = text.length;
        const m = this.pattern.length;

        if (n < m) return indices;

        // Precompute base^(m-1) mod modulus
        let highestPower = 1;
        for (let i = 0; i < m - 1; i++) {
            highestPower = (highestPower * this.base) % this.modulus;
        }

        let textHash = this.computeHash(text.substring(0, m));

        for (let i = 0; i <= n - m; i++) {
            if (textHash === this.patternHash) {
                // Verify to avoid hash collisions
                if (text.substring(i, i + m) === this.pattern) {
                    indices.push(i);
                }
            }

            if (i < n - m) {
                textHash = (this.base * (textHash - text.charCodeAt(i) * highestPower) + 
                          text.charCodeAt(i + m)) % this.modulus;
                
                if (textHash < 0) {
                    textHash += this.modulus;
                }
            }
        }

        return indices;
    }
}
interface StringMatcher {
    search(text: string): number[];
}

class StringMatcherFactory {
    static create(pattern: string, algorithm: 'kmp' | 'boyermoore' | 'rabinkarp' = 'kmp'): StringMatcher {
        switch (algorithm) {
            case 'kmp':
                return new KMP(pattern);
            case 'boyermoore':
                return new BoyerMoore(pattern);
            case 'rabinkarp':
                return new RabinKarp(pattern);
            default:
                throw new Error(`Unknown algorithm: ${algorithm}`);
        }
    }
}

// Usage examples
const matcher = StringMatcherFactory.create("abc", "kmp");
const results = matcher.search("abcabcabc");
console.log(results); // [0, 3, 6]
// Simple built-in methods
const text = "hello world";
const pattern = "world";

// Returns first occurrence index
const index = text.indexOf(pattern);

// Returns all occurrences using regex
const allIndices = (text.match(new RegExp(pattern, "g")) || []).map(
    match => text.indexOf(match)
);

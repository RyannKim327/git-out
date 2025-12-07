class KMPMatcher {
    private pattern: string;
    private lps: number[];

    constructor(pattern: string) {
        this.pattern = pattern;
        this.lps = this.computeLPS();
    }

    private computeLPS(): number[] {
        const lps: number[] = new Array(this.pattern.length).fill(0);
        let len = 0;
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
const kmp = new KMPMatcher("abc");
const text = "abcabcabc";
const positions = kmp.search(text);
console.log("KMP matches at positions:", positions);
class BoyerMooreMatcher {
    private pattern: string;
    private badChar: Map<string, number>;
    private goodSuffix: number[];

    constructor(pattern: string) {
        this.pattern = pattern;
        this.badChar = this.precomputeBadChar();
        this.goodSuffix = this.precomputeGoodSuffix();
    }

    private precomputeBadChar(): Map<string, number> {
        const table = new Map<string, number>();
        for (let i = 0; i < this.pattern.length; i++) {
            table.set(this.pattern[i], i);
        }
        return table;
    }

    private precomputeGoodSuffix(): number[] {
        const m = this.pattern.length;
        const suffix = new Array(m).fill(0);
        const shift = new Array(m + 1).fill(0);

        // Case 1
        let i = m, j = m + 1;
        suffix[i - 1] = j;
        while (i > 0) {
            while (j <= m && this.pattern[i - 1] !== this.pattern[j - 1]) {
                if (shift[j] === 0) shift[j] = j - i;
                j = suffix[j - 1];
            }
            i--;
            j--;
            suffix[i] = j;
        }

        // Case 2
        j = suffix[0];
        for (i = 0; i <= m; i++) {
            if (shift[i] === 0) shift[i] = j;
            if (i === j) j = suffix[j];
        }

        return shift;
    }

    search(text: string): number[] {
        const matches: number[] = [];
        const n = text.length;
        const m = this.pattern.length;
        let s = 0;

        while (s <= n - m) {
            let j = m - 1;

            while (j >= 0 && this.pattern[j] === text[s + j]) {
                j--;
            }

            if (j < 0) {
                matches.push(s);
                s += this.goodSuffix[0];
            } else {
                const badCharShift = j - (this.badChar.get(text[s + j]) ?? -1);
                const goodSuffixShift = this.goodSuffix[j + 1];
                s += Math.max(badCharShift, goodSuffixShift);
            }
        }

        return matches;
    }
}

// Usage
const bm = new BoyerMooreMatcher("abc");
const text = "abcabcabc";
const positions = bm.search(text);
console.log("Boyer-Moore matches at positions:", positions);
class RabinKarpMatcher {
    private pattern: string;
    private patternHash: number;
    private prime: number;
    private base: number;
    private highestPower: number;

    constructor(pattern: string, base: number = 256, prime: number = 101) {
        this.pattern = pattern;
        this.base = base;
        this.prime = prime;
        this.patternHash = this.computeHash(pattern);
        this.highestPower = this.computeHighestPower();
    }

    private computeHash(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash * this.base + str.charCodeAt(i)) % this.prime;
        }
        return hash;
    }

    private computeHighestPower(): number {
        let power = 1;
        for (let i = 0; i < this.pattern.length - 1; i++) {
            power = (power * this.base) % this.prime;
        }
        return power;
    }

    search(text: string): number[] {
        const matches: number[] = [];
        const n = text.length;
        const m = this.pattern.length;

        if (n < m) return matches;

        let textHash = this.computeHash(text.substring(0, m));

        for (let i = 0; i <= n - m; i++) {
            if (textHash === this.patternHash) {
                // Verify to avoid hash collisions
                if (text.substring(i, i + m) === this.pattern) {
                    matches.push(i);
                }
            }

            if (i < n - m) {
                textHash = this.updateHash(textHash, text[i], text[i + m]);
            }
        }

        return matches;
    }

    private updateHash(oldHash: number, oldChar: string, newChar: string): number {
        let hash = oldHash;
        hash = (hash - this.highestPower * oldChar.charCodeAt(0)) % this.prime;
        hash = (hash * this.base + newChar.charCodeAt(0)) % this.prime;
        return hash < 0 ? hash + this.prime : hash;
    }
}

// Usage
const rk = new RabinKarpMatcher("abc");
const text = "abcabcabc";
const positions = rk.search(text);
console.log("Rabin-Karp matches at positions:", positions);
interface StringMatcher {
    search(text: string): number[];
}

function benchmark(matcher: StringMatcher, text: string, pattern: string, iterations: number = 1000): number {
    const start = performance.now();
    
    for (let i = 0; i < iterations; i++) {
        matcher.search(text);
    }
    
    const end = performance.now();
    return end - start;
}

function compareAlgorithms(text: string, pattern: string): void {
    const kmp = new KMPMatcher(pattern);
    const bm = new BoyerMooreMatcher(pattern);
    const rk = new RabinKarpMatcher(pattern);
    
    console.log(`Comparing algorithms for pattern: "${pattern}"`);
    console.log(`Text length: ${text.length}`);
    
    const kmpTime = benchmark(kmp, text, pattern);
    const bmTime = benchmark(bm, text, pattern);
    const rkTime = benchmark(rk, text, pattern);
    
    console.log(`KMP: ${kmpTime.toFixed(2)}ms`);
    console.log(`Boyer-Moore: ${bmTime.toFixed(2)}ms`);
    console.log(`Rabin-Karp: ${rkTime.toFixed(2)}ms`);
    
    // Verify all algorithms return same results
    const kmpResults = kmp.search(text);
    const bmResults = bm.search(text);
    const rkResults = rk.search(text);
    
    console.log(`All algorithms agree: ${arraysEqual(kmpResults, bmResults) && arraysEqual(bmResults, rkResults)}`);
}

function arraysEqual(a: number[], b: number[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
}

// Usage
const longText = "a".repeat(10000) + "abc" + "b".repeat(10000);
compareAlgorithms(longText, "abc");
export class StringMatcher {
    static searchAll(pattern: string, text: string, algorithm: 'kmp' | 'boyer-moore' | 'rabin-karp' = 'kmp'): number[] {
        switch (algorithm) {
            case 'kmp':
                return new KMPMatcher(pattern).search(text);
            case 'boyer-moore':
                return new BoyerMooreMatcher(pattern).search(text);
            case 'rabin-karp':
                return new RabinKarpMatcher(pattern).search(text);
            default:
                throw new Error(`Unknown algorithm: ${algorithm}`);
        }
    }

    static contains(pattern: string, text: string, algorithm: 'kmp' | 'boyer-moore' | 'rabin-karp' = 'kmp'): boolean {
        return this.searchAll(pattern, text, algorithm).length > 0;
    }
}

// Easy usage
const found = StringMatcher.contains("needle", "haystack with needle");
const positions = StringMatcher.searchAll("abc", "abcabcabc", "kmp");

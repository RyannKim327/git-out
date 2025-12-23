class KMP {
    private pattern: string;
    private lps: number[];

    constructor(pattern: string) {
        this.pattern = pattern;
        this.lps = this.computeLPS();
    }

    private computeLPS(): number[] {
        const lps: number[] = new Array(this.pattern.length).fill(0);
        let length = 0;
        let i = 1;

        while (i < this.pattern.length) {
            if (this.pattern[i] === this.pattern[length]) {
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
        const result: number[] = [];
        let i = 0; // index for text
        let j = 0; // index for pattern

        while (i < text.length) {
            if (this.pattern[j] === text[i]) {
                i++;
                j++;
            }

            if (j === this.pattern.length) {
                result.push(i - j);
                j = this.lps[j - 1];
            } else if (i < text.length && this.pattern[j] !== text[i]) {
                if (j !== 0) {
                    j = this.lps[j - 1];
                } else {
                    i++;
                }
            }
        }

        return result;
    }
}

// Usage
const kmp = new KMP("abc");
const positions = kmp.search("abcabcabc");
console.log(positions); // [0, 3, 6]
class BoyerMoore {
    private pattern: string;
    private badCharTable: Map<string, number>;

    constructor(pattern: string) {
        this.pattern = pattern;
        this.badCharTable = this.buildBadCharTable();
    }

    private buildBadCharTable(): Map<string, number> {
        const table = new Map<string, number>();
        const patternLength = this.pattern.length;

        for (let i = 0; i < patternLength - 1; i++) {
            table.set(this.pattern[i], patternLength - 1 - i);
        }

        return table;
    }

    search(text: string): number[] {
        const result: number[] = [];
        const patternLength = this.pattern.length;
        const textLength = text.length;

        let i = 0;
        while (i <= textLength - patternLength) {
            let j = patternLength - 1;

            while (j >= 0 && this.pattern[j] === text[i + j]) {
                j--;
            }

            if (j < 0) {
                result.push(i);
                i += patternLength;
            } else {
                const shift = this.badCharTable.get(text[i + j]) || patternLength;
                i += Math.max(1, shift);
            }
        }

        return result;
    }
}

// Usage
const bm = new BoyerMoore("abc");
const positions = bm.search("abcabcabc");
console.log(positions); // [0, 3, 6]
class RabinKarp {
    private pattern: string;
    private patternHash: number;
    private prime: number = 101;
    private base: number = 256;

    constructor(pattern: string) {
        this.pattern = pattern;
        this.patternHash = this.computeHash(pattern);
    }

    private computeHash(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (this.base * hash + str.charCodeAt(i)) % this.prime;
        }
        return hash;
    }

    search(text: string): number[] {
        const result: number[] = [];
        const patternLength = this.pattern.length;
        const textLength = text.length;

        if (patternLength > textLength) return result;

        let textHash = this.computeHash(text.substring(0, patternLength));
        let h = 1;

        // Calculate h = base^(patternLength-1) % prime
        for (let i = 0; i < patternLength - 1; i++) {
            h = (h * this.base) % this.prime;
        }

        for (let i = 0; i <= textLength - patternLength; i++) {
            if (textHash === this.patternHash) {
                // Verify actual match to avoid hash collisions
                if (text.substring(i, i + patternLength) === this.pattern) {
                    result.push(i);
                }
            }

            if (i < textLength - patternLength) {
                textHash = (this.base * (textHash - text.charCodeAt(i) * h) + 
                           text.charCodeAt(i + patternLength)) % this.prime;
                
                if (textHash < 0) {
                    textHash += this.prime;
                }
            }
        }

        return result;
    }
}

// Usage
const rk = new RabinKarp("abc");
const positions = rk.search("abcabcabc");
console.log(positions); // [0, 3, 6]
function simpleStringSearch(text: string, pattern: string): number[] {
    const result: number[] = [];
    const textLength = text.length;
    const patternLength = pattern.length;

    for (let i = 0; i <= textLength - patternLength; i++) {
        let j = 0;
        while (j < patternLength && text[i + j] === pattern[j]) {
            j++;
        }
        if (j === patternLength) {
            result.push(i);
        }
    }

    return result;
}

// Usage
const positions = simpleStringSearch("abcabcabc", "abc");
console.log(positions); // [0, 3, 6]
interface StringMatcher {
    search(text: string): number[];
}

function benchmark(matcher: StringMatcher, text: string, runs: number = 1000): number {
    const start = performance.now();
    for (let i = 0; i < runs; i++) {
        matcher.search(text);
    }
    return performance.now() - start;
}

// Example usage
const text = "a".repeat(10000) + "b" + "a".repeat(10000);
const pattern = "b";

const kmp = new KMP(pattern);
const bm = new BoyerMoore(pattern);
const rk = new RabinKarp(pattern);

console.log("KMP:", benchmark(kmp, text), "ms");
console.log("Boyer-Moore:", benchmark(bm, text), "ms");
console.log("Rabin-Karp:", benchmark(rk, text), "ms");

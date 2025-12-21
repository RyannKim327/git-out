class KMPStringMatcher {
    private pattern: string;
    private lps: number[];

    constructor(pattern: string) {
        this.pattern = pattern;
        this.lps = this.computeLPSArray();
    }

    private computeLPSArray(): number[] {
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
const kmp = new KMPStringMatcher("abc");
const text = "abcdeabcabc";
const matches = kmp.search(text);
console.log("KMP matches:", matches); // [0, 5, 8]
class BoyerMooreStringMatcher {
    private pattern: string;
    private badCharTable: Map<string, number>;
    private goodSuffixTable: number[];

    constructor(pattern: string) {
        this.pattern = pattern;
        this.badCharTable = this.buildBadCharTable();
        this.goodSuffixTable = this.buildGoodSuffixTable();
    }

    private buildBadCharTable(): Map<string, number> {
        const table = new Map<string, number>();
        for (let i = 0; i < this.pattern.length - 1; i++) {
            table.set(this.pattern[i], this.pattern.length - 1 - i);
        }
        return table;
    }

    private buildGoodSuffixTable(): number[] {
        const table = new Array(this.pattern.length).fill(this.pattern.length);
        let lastPrefixPosition = this.pattern.length;

        for (let i = this.pattern.length - 1; i >= 0; i--) {
            if (this.isPrefix(i + 1)) {
                lastPrefixPosition = i + 1;
            }
            table[this.pattern.length - 1 - i] = lastPrefixPosition - i + this.pattern.length - 1;
        }

        for (let i = 0; i < this.pattern.length - 1; i++) {
            const suffixLength = this.suffixLength(i);
            table[suffixLength] = this.pattern.length - 1 - i + suffixLength;
        }

        return table;
    }

    private isPrefix(position: number): boolean {
        for (let i = position, j = 0; i < this.pattern.length; i++, j++) {
            if (this.pattern[i] !== this.pattern[j]) {
                return false;
            }
        }
        return true;
    }

    private suffixLength(position: number): number {
        let length = 0;
        let i = position;
        let j = this.pattern.length - 1;

        while (i >= 0 && this.pattern[i] === this.pattern[j]) {
            length++;
            i--;
            j--;
        }

        return length;
    }

    search(text: string): number[] {
        const matches: number[] = [];
        let i = 0;

        while (i <= text.length - this.pattern.length) {
            let j = this.pattern.length - 1;

            while (j >= 0 && this.pattern[j] === text[i + j]) {
                j--;
            }

            if (j < 0) {
                matches.push(i);
                i += this.goodSuffixTable[0];
            } else {
                const badCharShift = this.badCharTable.get(text[i + j]) || this.pattern.length;
                const goodSuffixShift = this.goodSuffixTable[this.pattern.length - 1 - j];
                i += Math.max(badCharShift, goodSuffixShift);
            }
        }

        return matches;
    }
}

// Usage
const bm = new BoyerMooreStringMatcher("abc");
const matchesBM = bm.search("abcdeabcabc");
console.log("Boyer-Moore matches:", matchesBM); // [0, 5, 8]
class RabinKarpStringMatcher {
    private pattern: string;
    private patternHash: number;
    private base: number = 256;
    private prime: number = 101;

    constructor(pattern: string) {
        this.pattern = pattern;
        this.patternHash = this.hash(pattern);
    }

    private hash(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (this.base * hash + str.charCodeAt(i)) % this.prime;
        }
        return hash;
    }

    search(text: string): number[] {
        const matches: number[] = [];
        const n = text.length;
        const m = this.pattern.length;

        if (n < m) return matches;

        let textHash = this.hash(text.substring(0, m));
        let h = 1;

        // Calculate h = (base^(m-1)) % prime
        for (let i = 0; i < m - 1; i++) {
            h = (h * this.base) % this.prime;
        }

        for (let i = 0; i <= n - m; i++) {
            if (textHash === this.patternHash) {
                let match = true;
                for (let j = 0; j < m; j++) {
                    if (text[i + j] !== this.pattern[j]) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    matches.push(i);
                }
            }

            if (i < n - m) {
                textHash = (this.base * (textHash - text.charCodeAt(i) * h) + 
                           text.charCodeAt(i + m)) % this.prime;
                
                if (textHash < 0) {
                    textHash += this.prime;
                }
            }
        }

        return matches;
    }
}

// Usage
const rk = new RabinKarpStringMatcher("abc");
const matchesRK = rk.search("abcdeabcabc");
console.log("Rabin-Karp matches:", matchesRK); // [0, 5, 8]
function findAllOccurrences(text: string, pattern: string): number[] {
    const matches: number[] = [];
    let index = -1;
    
    while ((index = text.indexOf(pattern, index + 1)) !== -1) {
        matches.push(index);
    }
    
    return matches;
}

// Usage
const simpleMatches = findAllOccurrences("abcdeabcabc", "abc");
console.log("Simple matches:", simpleMatches); // [0, 5, 8]

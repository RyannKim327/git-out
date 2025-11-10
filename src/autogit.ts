class RabinKarp {
    private readonly base: number;
    private readonly modulus: number;

    constructor(base: number = 256, modulus: number = 101) {
        this.base = base;
        this.modulus = modulus;
    }

    /**
     * Search for pattern in text using Rabin-Karp algorithm
     * @param text - The text to search in
     * @param pattern - The pattern to search for
     * @returns Array of indices where pattern starts
     */
    search(text: string, pattern: string): number[] {
        const n = text.length;
        const m = pattern.length;
        const results: number[] = [];

        if (m === 0 || n < m) {
            return results;
        }

        // Precompute base^(m-1) % modulus
        let power = 1;
        for (let i = 0; i < m - 1; i++) {
            power = (power * this.base) % this.modulus;
        }

        // Compute hash for pattern and first window of text
        let patternHash = 0;
        let textHash = 0;

        for (let i = 0; i < m; i++) {
            patternHash = (this.base * patternHash + pattern.charCodeAt(i)) % this.modulus;
            textHash = (this.base * textHash + text.charCodeAt(i)) % this.modulus;
        }

        // Slide the pattern over text one by one
        for (let i = 0; i <= n - m; i++) {
            // Check if hash values match
            if (patternHash === textHash) {
                // If hash matches, check characters one by one
                let match = true;
                for (let j = 0; j < m; j++) {
                    if (text[i + j] !== pattern[j]) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    results.push(i);
                }
            }

            // Calculate hash for next window
            if (i < n - m) {
                textHash = (this.base * (textHash - text.charCodeAt(i) * power) + text.charCodeAt(i + m)) % this.modulus;
                
                // Ensure hash is positive
                if (textHash < 0) {
                    textHash += this.modulus;
                }
            }
        }

        return results;
    }
}
interface SearchResult {
    pattern: string;
    indices: number[];
}

class EnhancedRabinKarp {
    private readonly base: number;
    private readonly modulus: number;

    constructor(base: number = 256, modulus: number = 101) {
        this.base = base;
        this.modulus = modulus;
    }

    /**
     * Search for multiple patterns in text
     */
    searchMultiple(text: string, patterns: string[]): SearchResult[] {
        const results: SearchResult[] = [];

        for (const pattern of patterns) {
            const indices = this.search(text, pattern);
            results.push({ pattern, indices });
        }

        return results;
    }

    /**
     * Case-insensitive search
     */
    searchCaseInsensitive(text: string, pattern: string): number[] {
        return this.search(text.toLowerCase(), pattern.toLowerCase());
    }

    private search(text: string, pattern: string): number[] {
        const n = text.length;
        const m = pattern.length;
        const results: number[] = [];

        if (m === 0 || n < m) {
            return results;
        }

        let power = 1;
        for (let i = 0; i < m - 1; i++) {
            power = (power * this.base) % this.modulus;
        }

        let patternHash = 0;
        let textHash = 0;

        for (let i = 0; i < m; i++) {
            patternHash = (this.base * patternHash + pattern.charCodeAt(i)) % this.modulus;
            textHash = (this.base * textHash + text.charCodeAt(i)) % this.modulus;
        }

        for (let i = 0; i <= n - m; i++) {
            if (patternHash === textHash) {
                if (this.verifyMatch(text, pattern, i)) {
                    results.push(i);
                }
            }

            if (i < n - m) {
                textHash = this.calculateNextHash(textHash, text, i, m, power);
            }
        }

        return results;
    }

    private verifyMatch(text: string, pattern: string, startIndex: number): boolean {
        for (let j = 0; j < pattern.length; j++) {
            if (text[startIndex + j] !== pattern[j]) {
                return false;
            }
        }
        return true;
    }

    private calculateNextHash(currentHash: number, text: string, currentIndex: number, patternLength: number, power: number): number {
        let hash = (this.base * (currentHash - text.charCodeAt(currentIndex) * power) + text.charCodeAt(currentIndex + patternLength)) % this.modulus;
        return hash < 0 ? hash + this.modulus : hash;
    }
}
// Basic usage
const rk = new RabinKarp();
const text = "ABABDABACDABABCABAB";
const pattern = "ABABC";

const results = rk.search(text, pattern);
console.log("Pattern found at indices:", results); // [10]

// Enhanced usage
const enhancedRK = new EnhancedRabinKarp();

// Multiple patterns
const multipleResults = enhancedRK.searchMultiple(
    "The quick brown fox jumps over the lazy dog",
    ["quick", "fox", "lazy"]
);
console.log("Multiple patterns:", multipleResults);

// Case insensitive search
const caseInsensitiveResults = enhancedRK.searchCaseInsensitive(
    "Hello World hello WORLD",
    "hello"
);
console.log("Case insensitive:", caseInsensitiveResults); // [0, 12]
class OptimizedRabinKarp extends EnhancedRabinKarp {
    constructor() {
        // Use a larger prime number to reduce hash collisions
        super(256, 1000000007);
    }

    /**
     * Find all occurrences with minimal hash collisions
     */
    searchOptimized(text: string, pattern: string): number[] {
        const results: number[] = [];
        const n = text.length;
        const m = pattern.length;

        if (m === 0 || n < m) return results;

        // Precompute powers
        const powers = new Array(m);
        powers[0] = 1;
        for (let i = 1; i < m; i++) {
            powers[i] = (powers[i - 1] * this.base) % this.modulus;
        }

        // Compute hashes
        let patternHash = 0;
        let textHash = 0;

        for (let i = 0; i < m; i++) {
            patternHash = (patternHash + pattern.charCodeAt(i) * powers[m - 1 - i]) % this.modulus;
            textHash = (textHash + text.charCodeAt(i) * powers[m - 1 - i]) % this.modulus;
        }

        for (let i = 0; i <= n - m; i++) {
            if (patternHash === textHash && this.verifyMatch(text, pattern, i)) {
                results.push(i);
            }

            if (i < n - m) {
                textHash = (this.base * (textHash - text.charCodeAt(i) * powers[m - 1]) + text.charCodeAt(i + m)) % this.modulus;
                if (textHash < 0) textHash += this.modulus;
            }
        }

        return results;
    }
}

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
     * @returns Array of starting indices where pattern is found
     */
    search(text: string, pattern: string): number[] {
        const n = text.length;
        const m = pattern.length;
        const results: number[] = [];

        if (m === 0 || n < m) {
            return results;
        }

        // Precompute base^(m-1) mod modulus
        let h = 1;
        for (let i = 0; i < m - 1; i++) {
            h = (h * this.base) % this.modulus;
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
                // Check character by character to avoid hash collisions
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
                textHash = (this.base * (textHash - text.charCodeAt(i) * h) + 
                           text.charCodeAt(i + m)) % this.modulus;
                
                // Handle negative hash values
                if (textHash < 0) {
                    textHash += this.modulus;
                }
            }
        }

        return results;
    }
}
interface RabinKarpConfig {
    base?: number;
    modulus1?: number;
    modulus2?: number;
}

class EnhancedRabinKarp {
    private readonly base: number;
    private readonly modulus1: number;
    private readonly modulus2: number;

    constructor(config: RabinKarpConfig = {}) {
        this.base = config.base || 256;
        this.modulus1 = config.modulus1 || 101;
        this.modulus2 = config.modulus2 || 1000000007; // Large prime
    }

    /**
     * Compute hash using double hashing to reduce collisions
     */
    private computeHash(str: string, start: number, length: number, modulus: number): number {
        let hash = 0;
        for (let i = 0; i < length; i++) {
            hash = (this.base * hash + str.charCodeAt(start + i)) % modulus;
        }
        return hash;
    }

    /**
     * Search with double hashing for better accuracy
     */
    search(text: string, pattern: string): number[] {
        const n = text.length;
        const m = pattern.length;
        const results: number[] = [];

        if (m === 0 || n < m) {
            return results;
        }

        // Precompute base^(m-1) mod modulus
        const h1 = this.computePower(m - 1, this.modulus1);
        const h2 = this.computePower(m - 1, this.modulus2);

        // Compute hashes for pattern
        const patternHash1 = this.computeHash(pattern, 0, m, this.modulus1);
        const patternHash2 = this.computeHash(pattern, 0, m, this.modulus2);

        // Compute initial hashes for text window
        let textHash1 = this.computeHash(text, 0, m, this.modulus1);
        let textHash2 = this.computeHash(text, 0, m, this.modulus2);

        for (let i = 0; i <= n - m; i++) {
            // Double hash check for better collision resistance
            if (patternHash1 === textHash1 && patternHash2 === textHash2) {
                // Verify actual match to handle rare collisions
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
                textHash1 = this.updateHash(
                    textHash1, text.charCodeAt(i), text.charCodeAt(i + m), 
                    h1, this.modulus1
                );
                textHash2 = this.updateHash(
                    textHash2, text.charCodeAt(i), text.charCodeAt(i + m), 
                    h2, this.modulus2
                );
            }
        }

        return results;
    }

    private computePower(exponent: number, modulus: number): number {
        let result = 1;
        for (let i = 0; i < exponent; i++) {
            result = (result * this.base) % modulus;
        }
        return result;
    }

    private updateHash(
        currentHash: number, 
        oldChar: number, 
        newChar: number, 
        power: number, 
        modulus: number
    ): number {
        let hash = (currentHash - oldChar * power) % modulus;
        hash = (hash * this.base + newChar) % modulus;
        
        if (hash < 0) {
            hash += modulus;
        }
        
        return hash;
    }
}
// Basic usage
const rk = new RabinKarp();
const text = "abracadabra";
const pattern = "abra";

const indices = rk.search(text, pattern);
console.log(`Pattern found at indices: ${indices}`); // [0, 7]

// Enhanced version with double hashing
const enhancedRK = new EnhancedRabinKarp();
const indices2 = enhancedRK.search(text, pattern);
console.log(`Enhanced search found at indices: ${indices2}`); // [0, 7]

// Performance test
function benchmarkRabinKarp(): void {
    const longText = "a".repeat(1000000) + "needle" + "a".repeat(1000000);
    const pattern = "needle";
    
    console.time("Rabin-Karp Search");
    const rk = new EnhancedRabinKarp();
    const result = rk.search(longText, pattern);
    console.timeEnd("Rabin-Karp Search");
    console.log(`Found pattern at index: ${result[0]}`);
}

benchmarkRabinKarp();
class StringSearcher {
    private readonly rabinKarp: EnhancedRabinKarp;

    constructor() {
        this.rabinKarp = new EnhancedRabinKarp();
    }

    /**
     * Find all occurrences of pattern in text
     */
    findAll(text: string, pattern: string): number[] {
        return this.rabinKarp.search(text, pattern);
    }

    /**
     * Check if pattern exists in text
     */
    contains(text: string, pattern: string): boolean {
        return this.rabinKarp.search(text, pattern).length > 0;
    }

    /**
     * Find first occurrence of pattern in text
     */
    findFirst(text: string, pattern: string): number {
        const results = this.rabinKarp.search(text, pattern);
        return results.length > 0 ? results[0] : -1;
    }

    /**
     * Count occurrences of pattern in text
     */
    count(text: string, pattern: string): number {
        return this.rabinKarp.search(text, pattern).length;
    }
}

// Example usage of utility class
const searcher = new StringSearcher();
const result = searcher.findAll("hello world hello", "hello");
console.log(`Found at indices: ${result}`); // [0, 12]
console.log(`Count: ${searcher.count("hello world hello", "hello")}`); // 2

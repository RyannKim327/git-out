class RabinKarp {
    private readonly base: number;
    private readonly modulus: number;

    constructor(base: number = 256, modulus: number = 101) {
        this.base = base;
        this.modulus = modulus;
    }

    /**
     * Search for pattern in text using Rabin-Karp algorithm
     * @returns Array of starting indices where pattern is found
     */
    search(text: string, pattern: string): number[] {
        const n = text.length;
        const m = pattern.length;
        
        if (m === 0 || n < m) {
            return [];
        }

        // Precompute base^(m-1) mod modulus
        let h = 1;
        for (let i = 0; i < m - 1; i++) {
            h = (h * this.base) % this.modulus;
        }

        // Compute hash for pattern and first window of text
        const patternHash = this.computeHash(pattern, 0, m);
        let textHash = this.computeHash(text, 0, m);

        const results: number[] = [];

        // Slide the pattern over text one by one
        for (let i = 0; i <= n - m; i++) {
            // Check if hash values match
            if (patternHash === textHash) {
                // Double-check to avoid hash collisions
                if (this.verifyMatch(text, pattern, i)) {
                    results.push(i);
                }
            }

            // Calculate hash for next window
            if (i < n - m) {
                textHash = this.computeRollingHash(
                    text, 
                    textHash, 
                    i, 
                    m, 
                    h
                );
            }
        }

        return results;
    }

    /**
     * Compute initial hash for a substring
     */
    private computeHash(str: string, start: number, length: number): number {
        let hash = 0;
        for (let i = 0; i < length; i++) {
            hash = (this.base * hash + str.charCodeAt(start + i)) % this.modulus;
        }
        return hash;
    }

    /**
     * Compute rolling hash for the next window
     */
    private computeRollingHash(
        text: string, 
        currentHash: number, 
        currentIndex: number, 
        patternLength: number, 
        h: number
    ): number {
        // Remove leading character contribution
        let hash = (currentHash + this.modulus - 
                   (text.charCodeAt(currentIndex) * h) % this.modulus) % this.modulus;
        
        // Add trailing character contribution
        hash = (hash * this.base + 
               text.charCodeAt(currentIndex + patternLength)) % this.modulus;
        
        return hash;
    }

    /**
     * Verify actual match to handle hash collisions
     */
    private verifyMatch(text: string, pattern: string, start: number): boolean {
        for (let i = 0; i < pattern.length; i++) {
            if (text[start + i] !== pattern[i]) {
                return false;
            }
        }
        return true;
    }
}
// Example usage
const rabinKarp = new RabinKarp();

// Basic search
const text = "abracadabra";
const pattern = "abra";
const results = rabinKarp.search(text, pattern);
console.log(`Pattern found at indices: ${results}`); // [0, 7]

// Multiple occurrences
const text2 = "banananananananananananana";
const pattern2 = "nana";
const results2 = rabinKarp.search(text2, pattern2);
console.log(`Pattern found at indices: ${results2}`); // [2, 4, 6, 8, ...]

// No match found
const text3 = "hello world";
const pattern3 = "typescript";
const results3 = rabinKarp.search(text3, pattern3);
console.log(`Pattern found at indices: ${results3}`); // []
class MultiPatternRabinKarp extends RabinKarp {
    /**
     * Search for multiple patterns simultaneously
     */
    searchMultiple(text: string, patterns: string[]): Map<string, number[]> {
        const results = new Map<string, number[]>();
        
        for (const pattern of patterns) {
            const indices = this.search(text, pattern);
            results.set(pattern, indices);
        }
        
        return results;
    }
}

// Usage
const multiSearcher = new MultiPatternRabinKarp();
const text = "the quick brown fox jumps over the lazy dog";
const patterns = ["the", "fox", "dog", "cat"];
const results = multiSearcher.searchMultiple(text, patterns);

for (const [pattern, indices] of results) {
    console.log(`"${pattern}" found at: ${indices.join(', ')}`);
}
// Benchmark utility
function benchmarkRabinKarp(text: string, pattern: string, iterations: number = 1000) {
    const rabinKarp = new RabinKarp();
    const start = performance.now();
    
    for (let i = 0; i < iterations; i++) {
        rabinKarp.search(text, pattern);
    }
    
    const end = performance.now();
    return end - start;
}

// Compare with naive string search
function naiveSearch(text: string, pattern: string): number[] {
    const results: number[] = [];
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
            results.push(i);
        }
    }
    
    return results;
}

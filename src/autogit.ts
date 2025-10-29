class RabinKarp {
    private base: number;
    private modulus: number;

    constructor(base: number = 256, modulus: number = 101) {
        this.base = base;
        this.modulus = modulus;
    }

    /**
     * Simple hash function for strings
     */
    private hash(str: string, start: number, end: number): number {
        let hash = 0;
        for (let i = start; i < end; i++) {
            hash = (hash * this.base + str.charCodeAt(i)) % this.modulus;
        }
        return hash;
    }

    /**
     * Main search function using Rabin-Karp algorithm
     */
    search(text: string, pattern: string): number[] {
        const n = text.length;
        const m = pattern.length;
        const occurrences: number[] = [];

        if (m === 0 || n < m) {
            return occurrences;
        }

        // Calculate the highest power for rolling hash
        let highestPower = 1;
        for (let i = 0; i < m - 1; i++) {
            highestPower = (highestPower * this.base) % this.modulus;
        }

        // Calculate initial hashes
        const patternHash = this.hash(pattern, 0, m);
        let textHash = this.hash(text, 0, m);

        // Check the first window
        if (textHash === patternHash && this.verifyMatch(text, pattern, 0)) {
            occurrences.push(0);
        }

        // Slide the window over the text
        for (let i = 1; i <= n - m; i++) {
            // Remove the leftmost character and add the new rightmost character
            textHash = (textHash - text.charCodeAt(i - 1) * highestPower) % this.modulus;
            textHash = (textHash * this.base + text.charCodeAt(i + m - 1)) % this.modulus;
            
            // Ensure positive hash value
            if (textHash < 0) {
                textHash += this.modulus;
            }

            // Check for match
            if (textHash === patternHash && this.verifyMatch(text, pattern, i)) {
                occurrences.push(i);
            }
        }

        return occurrences;
    }

    /**
     * Verify actual match to handle hash collisions
     */
    private verifyMatch(text: string, pattern: string, start: number): boolean {
        const m = pattern.length;
        for (let i = 0; i < m; i++) {
            if (text.charCodeAt(start + i) !== pattern.charCodeAt(i)) {
                return false;
            }
        }
        return true;
    }
}
interface HashResult {
    hash1: number;
    hash2: number;
}

class EnhancedRabinKarp {
    private base1: number;
    private base2: number;
    private modulus1: number;
    private modulus2: number;

    constructor(
        base1: number = 256,
        base2: number = 131,
        modulus1: number = 1000000007,
        modulus2: number = 1000000009
    ) {
        this.base1 = base1;
        this.base2 = base2;
        this.modulus1 = modulus1;
        this.modulus2 = modulus2;
    }

    private doubleHash(str: string, start: number, end: number): HashResult {
        let hash1 = 0;
        let hash2 = 0;
        
        for (let i = start; i < end; i++) {
            const charCode = str.charCodeAt(i);
            hash1 = (hash1 * this.base1 + charCode) % this.modulus1;
            hash2 = (hash2 * this.base2 + charCode) % this.modulus2;
        }
        
        return { hash1, hash2 };
    }

    search(text: string, pattern: string): number[] {
        const n = text.length;
        const m = pattern.length;
        const occurrences: number[] = [];

        if (m === 0 || n < m) {
            return occurrences;
        }

        // Calculate highest powers for rolling hash
        let highestPower1 = 1;
        let highestPower2 = 1;
        for (let i = 0; i < m - 1; i++) {
            highestPower1 = (highestPower1 * this.base1) % this.modulus1;
            highestPower2 = (highestPower2 * this.base2) % this.modulus2;
        }

        // Calculate pattern hashes
        const patternHashes = this.doubleHash(pattern, 0, m);
        
        // Calculate initial text window hashes
        let textHashes = this.doubleHash(text, 0, m);

        // Check first window
        if (this.matchesHash(textHashes, patternHashes) && 
            this.verifyMatch(text, pattern, 0)) {
            occurrences.push(0);
        }

        // Slide window
        for (let i = 1; i <= n - m; i++) {
            // Update hash1
            textHashes.hash1 = (
                textHashes.hash1 - 
                text.charCodeAt(i - 1) * highestPower1
            ) % this.modulus1;
            textHashes.hash1 = (
                textHashes.hash1 * this.base1 + 
                text.charCodeAt(i + m - 1)
            ) % this.modulus1;
            if (textHashes.hash1 < 0) textHashes.hash1 += this.modulus1;

            // Update hash2
            textHashes.hash2 = (
                textHashes.hash2 - 
                text.charCodeAt(i - 1) * highestPower2
            ) % this.modulus2;
            textHashes.hash2 = (
                textHashes.hash2 * this.base2 + 
                text.charCodeAt(i + m - 1)
            ) % this.modulus2;
            if (textHashes.hash2 < 0) textHashes.hash2 += this.modulus2;

            // Check for match
            if (this.matchesHash(textHashes, patternHashes) && 
                this.verifyMatch(text, pattern, i)) {
                occurrences.push(i);
            }
        }

        return occurrences;
    }

    private matchesHash(textHashes: HashResult, patternHashes: HashResult): boolean {
        return textHashes.hash1 === patternHashes.hash1 && 
               textHashes.hash2 === patternHashes.hash2;
    }

    private verifyMatch(text: string, pattern: string, start: number): boolean {
        const m = pattern.length;
        for (let i = 0; i < m; i++) {
            if (text.charCodeAt(start + i) !== pattern.charCodeAt(i)) {
                return false;
            }
        }
        return true;
    }
}
// Basic usage
const rk = new RabinKarp();
const text = "hello world, welcome to the world of programming";
const pattern = "world";

const positions = rk.search(text, pattern);
console.log(`Pattern found at positions: ${positions}`); 
// Output: Pattern found at positions: 6,24

// Enhanced usage
const enhancedRk = new EnhancedRabinKarp();
const code = `function calculate(a, b) {
    return a + b;
}`;
const funcPattern = "function";

const funcPositions = enhancedRk.search(code, funcPattern);
console.log(`Function keyword found at: ${funcPositions}`);
// Output: Function keyword found at: 0

// Multiple patterns search
function searchMultiplePatterns(text: string, patterns: string[]): Map<string, number[]> {
    const rk = new EnhancedRabinKarp();
    const results = new Map<string, number[]>();
    
    for (const pattern of patterns) {
        results.set(pattern, rk.search(text, pattern));
    }
    
    return results;
}

// Example with multiple patterns
const document = "The quick brown fox jumps over the lazy dog. Brown is a nice color.";
const patterns = ["brown", "the", "fox"];
const multiResults = searchMultiplePatterns(document, patterns);

for (const [pattern, positions] of multiResults) {
    console.log(`"${pattern}" found at: ${positions}`);
}

class RabinKarp {
    private static readonly d: number = 256; // Number of characters in the input alphabet
    private static readonly q: number = 101;  // A prime number

    public static search(text: string, pattern: string): number[] {
        const M: number = pattern.length;
        const N: number = text.length;
        const result: number[] = [];

        const patternHash: number = this.hash(pattern, M);
        let textHash: number = this.hash(text, M);
        let h: number = 1;

        // The value of h would be "pow(d, M-1)%q"
        for (let i = 0; i < M - 1; i++) {
            h = (h * this.d) % this.q;
        }

        // Slide the pattern over text one by one
        for (let i = 0; i <= N - M; i++) {
            // Check the hash values of the current window of text and pattern
            if (patternHash === textHash) {
                // Check for characters one by one
                let j: number;
                for (j = 0; j < M; j++) {
                    if (text[i + j] !== pattern[j]) {
                        break;
                    }
                }
                if (j === M) {
                    result.push(i); // Pattern found at index i
                }
            }

            // Calculate hash value for the next window of text: Remove leading digit, add trailing digit
            if (i < N - M) {
                textHash = (this.d * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + M)) % this.q;

                // We might get negative value of textHash, converting it to positive
                if (textHash < 0) {
                    textHash += this.q;
                }
            }
        }

        return result;
    }

    private static hash(str: string, length: number): number {
        let hash: number = 0;
        for (let i = 0; i < length; i++) {
            hash = (this.d * hash + str.charCodeAt(i)) % this.q;
        }
        return hash;
    }
}

// Example usage
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";
const result = RabinKarp.search(text, pattern);
console.log("Pattern found at indices:", result);

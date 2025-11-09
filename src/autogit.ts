function naiveSearch(text: string, pattern: string): number[] {
  const indices: number[] = [];
  const n = text.length;
  const m = pattern.length;

  for (let i = 0; i <= n - m; i++) {
    let j = 0;
    while (j < m && text[i + j] === pattern[j]) {
      j++;
    }
    if (j === m) {
      indices.push(i);
    }
  }

  return indices;
}
function boyerMooreHorspool(text: string, pattern: string): number[] {
  const indices: number[] = [];
  const n = text.length;
  const m = pattern.length;
  
  if (m === 0) return indices;

  // Preprocessing: create bad character table
  const badCharTable: Record<string, number> = {};
  for (let i = 0; i < m - 1; i++) {
    badCharTable[pattern[i]] = m - i - 1;
  }

  let i = 0;
  while (i <= n - m) {
    let j = m - 1;
    
    // Compare from right to left
    while (j >= 0 && pattern[j] === text[i + j]) {
      j--;
    }
    
    if (j < 0) {
      indices.push(i);
      i++;
    } else {
      // Use the bad character table to shift
      const shift = badCharTable[text[i + m - 1]] || m;
      i += shift;
    }
  }

  return indices;
}
function kmpSearch(text: string, pattern: string): number[] {
  const indices: number[] = [];
  const n = text.length;
  const m = pattern.length;
  
  if (m === 0) return indices;

  // Precompute prefix function (longest proper prefix which is also suffix)
  const prefixTable: number[] = new Array(m).fill(0);
  let k = 0;
  
  for (let i = 1; i < m; i++) {
    while (k > 0 && pattern[k] !== pattern[i]) {
      k = prefixTable[k - 1];
    }
    if (pattern[k] === pattern[i]) {
      k++;
    }
    prefixTable[i] = k;
  }

  // Search phase
  let j = 0;
  for (let i = 0; i < n; i++) {
    while (j > 0 && pattern[j] !== text[i]) {
      j = prefixTable[j - 1];
    }
    if (pattern[j] === text[i]) {
      j++;
    }
    if (j === m) {
      indices.push(i - m + 1);
      j = prefixTable[j - 1];
    }
  }

  return indices;
}
function rabinKarpSearch(text: string, pattern: string): number[] {
  const indices: number[] = [];
  const n = text.length;
  const m = pattern.length;
  
  if (m === 0 || n < m) return indices;

  const base = 256; // Base for ASCII
  const mod = 997; // Large prime modulus to avoid overflow

  // Compute pattern hash and initial text window hash
  let patternHash = 0;
  let textHash = 0;
  let h = 1;

  // Compute h = base^(m-1) mod mod
  for (let i = 0; i < m - 1; i++) {
    h = (h * base) % mod;
  }

  for (let i = 0; i < m; i++) {
    patternHash = (base * patternHash + pattern.charCodeAt(i)) % mod;
    textHash = (base * textHash + text.charCodeAt(i)) % mod;
  }

  for (let i = 0; i <= n - m; i++) {
    // Check hash first, then verify actual string
    if (textHash === patternHash) {
      let j = 0;
      while (j < m && text[i + j] === pattern[j]) {
        j++;
      }
      if (j === m) {
        indices.push(i);
      }
    }

    // Update rolling hash for next window
    if (i < n - m) {
      textHash = (base * (textHash - text.charCodeAt(i) * h) + 
                 text.charCodeAt(i + m)) % mod;
      
      // Handle negative hash values
      if (textHash < 0) {
        textHash += mod;
      }
    }
  }

  return indices;
}
// Test the algorithms
const text = "ababcababcabcabc";
const pattern = "abc";

console.log("Naive:", naiveSearch(text, pattern));
console.log("Boyer-Moore-Horspool:", boyerMooreHorspool(text, pattern));
console.log("KMP:", kmpSearch(text, pattern));
console.log("Rabin-Karp:", rabinKarpSearch(text, pattern));

// Performance comparison
function benchmark(text: string, pattern: string, iterations: number = 1000) {
  const algorithms = {
    naive: naiveSearch,
    horspool: boyerMooreHorspool,
    kmp: kmpSearch,
    rabinKarp: rabinKarpSearch
  };

  for (const [name, fn] of Object.entries(algorithms)) {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      fn(text, pattern);
    }
    const time = performance.now() - start;
    console.log(`${name}: ${time.toFixed(2)}ms`);
  }
}

benchmark(text.repeat(10), pattern);
class StringMatcher {
  private algorithms = {
    naive: this.naiveSearch,
    horspool: this.boyerMooreHorspool,
    kmp: this.kmpSearch,
    rabinKarp: this.rabinKarpSearch
  };

  search(text: string, pattern: string, algorithm: keyof typeof this.algorithms = 'horspool'): number[] {
    return this.algorithms[algorithm](text, pattern);
  }

  // Implement all the algorithms as methods...
  private naiveSearch(text: string, pattern: string): number[] {
    // Implementation from above
  }

  // ...other algorithm implementations
}

// Usage
const matcher = new StringMatcher();
const results = matcher.search("hello world", "world", "kmp");

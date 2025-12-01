function naiveStringMatch(text: string, pattern: string): number[] {
  const positions: number[] = [];
  const n = text.length;
  const m = pattern.length;

  for (let i = 0; i <= n - m; i++) {
    let j = 0;
    while (j < m && text[i + j] === pattern[j]) {
      j++;
    }
    if (j === m) {
      positions.push(i);
    }
  }
  
  return positions;
}
function kmpStringMatch(text: string, pattern: string): number[] {
  const positions: number[] = [];
  const n = text.length;
  const m = pattern.length;
  
  // Build prefix table (longest proper prefix which is also suffix)
  const prefixTable = buildPrefixTable(pattern);
  
  let i = 0; // index for text
  let j = 0; // index for pattern
  
  while (i < n) {
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }
    
    if (j === m) {
      positions.push(i - j);
      j = prefixTable[j - 1];
    } else if (i < n && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = prefixTable[j - 1];
      } else {
        i++;
      }
    }
  }
  
  return positions;
}

function buildPrefixTable(pattern: string): number[] {
  const m = pattern.length;
  const prefixTable: number[] = new Array(m);
  let len = 0;
  
  prefixTable[0] = 0;
  let i = 1;
  
  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      prefixTable[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = prefixTable[len - 1];
      } else {
        prefixTable[i] = 0;
        i++;
      }
    }
  }
  
  return prefixTable;
}
function boyerMooreStringMatch(text: string, pattern: string): number[] {
  const positions: number[] = [];
  const n = text.length;
  const m = pattern.length;
  
  // Bad character heuristic table
  const badCharTable = buildBadCharTable(pattern);
  
  let s = 0; // shift
  
  while (s <= n - m) {
    let j = m - 1;
    
    // Reduce j while characters match
    while (j >= 0 && pattern[j] === text[s + j]) {
      j--;
    }
    
    if (j < 0) {
      positions.push(s);
      s += (s + m < n) ? m - badCharTable[text[s + m].charCodeAt(0)] || 0 : 1;
    } else {
      s += Math.max(1, j - (badCharTable[text[s + j].charCodeAt(0)] || 0));
    }
  }
  
  return positions;
}

function buildBadCharTable(pattern: string): number[] {
  const table: number[] = new Array(256).fill(-1);
  
  for (let i = 0; i < pattern.length; i++) {
    table[pattern[i].charCodeAt(0)] = i;
  }
  
  return table;
}
function rabinKarpStringMatch(text: string, pattern: string): number[] {
  const positions: number[] = [];
  const n = text.length;
  const m = pattern.length;
  
  if (m > n) return positions;
  
  const prime = 101; // A prime number
  const d = 256; // Number of characters in input alphabet
  
  let patternHash = 0;
  let textHash = 0;
  let h = 1;
  
  // Calculate h = d^(m-1) % prime
  for (let i = 0; i < m - 1; i++) {
    h = (h * d) % prime;
  }
  
  // Calculate initial hash values
  for (let i = 0; i < m; i++) {
    patternHash = (d * patternHash + pattern.charCodeAt(i)) % prime;
    textHash = (d * textHash + text.charCodeAt(i)) % prime;
  }
  
  // Slide the pattern over text one by one
  for (let i = 0; i <= n - m; i++) {
    // Check hash values first
    if (patternHash === textHash) {
      // If hash matches, check character by character
      let j = 0;
      while (j < m && text[i + j] === pattern[j]) {
        j++;
      }
      if (j === m) {
        positions.push(i);
      }
    }
    
    // Calculate hash for next window
    if (i < n - m) {
      textHash = (d * (textHash - text.charCodeAt(i) * h) + 
                 text.charCodeAt(i + m)) % prime;
      
      // Convert negative hash to positive
      if (textHash < 0) {
        textHash += prime;
      }
    }
  }
  
  return positions;
}
// Example usage
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";

console.log("Naive:", naiveStringMatch(text, pattern));
console.log("KMP:", kmpStringMatch(text, pattern));
console.log("Boyer-Moore:", boyerMooreStringMatch(text, pattern));
console.log("Rabin-Karp:", rabinKarpStringMatch(text, pattern));
interface StringMatchResult {
  positions: number[];
  algorithm: string;
  executionTime: number;
}

function matchString(
  text: string, 
  pattern: string, 
  algorithm: 'naive' | 'kmp' | 'boyermoore' | 'rabinkarp' = 'kmp'
): StringMatchResult {
  const startTime = performance.now();
  let positions: number[];
  
  switch (algorithm) {
    case 'naive':
      positions = naiveStringMatch(text, pattern);
      break;
    case 'kmp':
      positions = kmpStringMatch(text, pattern);
      break;
    case 'boyermoore':
      positions = boyerMooreStringMatch(text, pattern);
      break;
    case 'rabinkarp':
      positions = rabinKarpStringMatch(text, pattern);
      break;
    default:
      positions = [];
  }
  
  const executionTime = performance.now() - startTime;
  
  return {
    positions,
    algorithm,
    executionTime
  };
}

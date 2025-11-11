function longestCommonPrefix(strings: string[]): string {
  if (strings.length === 0) return '';
  
  return strings.reduce((prev, next) => {
    let i = 0;
    while (i < prev.length && i < next.length && prev[i] === next[i]) {
      i++;
    }
    return prev.slice(0, i);
  });
}

// Usage
const strings = ['flower', 'flow', 'flight'];
console.log(longestCommonPrefix(strings)); // Output: "fl"
function longestCommonPrefix(strings: string[]): string {
  if (strings.length === 0) return '';
  
  let prefix = strings[0];
  
  for (let i = 1; i < strings.length; i++) {
    while (strings[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (prefix === '') return '';
    }
  }
  
  return prefix;
}
function longestCommonPrefix(strings: string[]): string {
  if (strings.length === 0) return '';
  
  for (let i = 0; i < strings[0].length; i++) {
    const char = strings[0][i];
    
    for (let j = 1; j < strings.length; j++) {
      if (i === strings[j].length || strings[j][i] !== char) {
        return strings[0].slice(0, i);
      }
    }
  }
  
  return strings[0];
}
function longestCommonPrefix(strings: string[]): string {
  if (strings.length === 0) {
    throw new Error('Input array cannot be empty');
  }
  
  if (strings.some(str => typeof str !== 'string')) {
    throw new Error('All elements must be strings');
  }
  
  return strings.reduce((commonPrefix, currentString) => {
    let i = 0;
    while (
      i < commonPrefix.length &&
      i < currentString.length &&
      commonPrefix[i] === currentString[i]
    ) {
      i++;
    }
    return commonPrefix.slice(0, i);
  });
}

// Usage with error handling
try {
  const result = longestCommonPrefix(['typescript', 'type', 'typing']);
  console.log(result); // Output: "typ"
} catch (error) {
  console.error(error.message);
}
function longestCommonPrefix(
  strings: string[],
  validateInput: boolean = true
): string {
  if (validateInput) {
    if (strings.length === 0) return '';
    if (strings.some(str => typeof str !== 'string')) return '';
  }
  
  return strings.reduce((prev, curr) => {
    let i = 0;
    const minLength = Math.min(prev.length, curr.length);
    
    while (i < minLength && prev[i] === curr[i]) {
      i++;
    }
    
    return prev.slice(0, i);
  });
}
// Test cases
console.log(longestCommonPrefix([])); // ''
console.log(longestCommonPrefix([''])); // ''
console.log(longestCommonPrefix(['a'])); // 'a'
console.log(longestCommonPrefix(['', 'a'])); // ''
console.log(longestCommonPrefix(['abc', 'abc'])); // 'abc'
console.log(longestCommonPrefix(['abc', 'abcd'])); // 'abc'

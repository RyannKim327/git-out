function removeVowels(str: string): string {
  return str.replace(/[aeiouAEIOU]/g, '');
}

// Example usage:
console.log(removeVowels("Hello World")); // "Hll Wrld"

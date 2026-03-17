function reverseStr(str: string): string {
  // 1️⃣  Split the string into an array of characters
  // 2️⃣  Reverse the array in‑place
  // 3️⃣  Join the array back into a string
  return str.split('').reverse().join('');
}

// Example
console.log(reverseStr('hello')); // → "olleh"

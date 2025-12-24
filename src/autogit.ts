function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

// Usage
const reversed = reverseString('hello'); // 'olleh'
function reverseString(str: string): string {
  return [...str].reverse().join('');
}

// Usage
const reversed = reverseString('typescript'); // 'tpircsepyt'
function reverseString(str: string): string {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

// Usage
const reversed = reverseString('hello world'); // 'dlrow olleh'
function reverseString(str: string): string {
  if (str === '') return '';
  return reverseString(str.substr(1)) + str.charAt(0);
}

// Usage
const reversed = reverseString('recursion'); // 'noisrucer'
function reverseString(str: string): string {
  return str.split('').reduce((reversed, char) => char + reversed, '');
}

// Usage
const reversed = reverseString('reduce'); // 'ecuder'
function reverseString(str: string): string {
  // Handle null/undefined
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  
  return str.split('').reverse().join('');
}

// Usage examples
console.log(reverseString('hello'));       // 'olleh'
console.log(reverseString('typescript'));  // 'tpircsepyt'
console.log(reverseString(''));            // ''
console.log(reverseString('a'));           // 'a'
function reverseStringUnicode(str: string): string {
  return Array.from(str).reverse().join('');
}

// Usage
console.log(reverseStringUnicode('hello🌍')); // '🌍olleh'

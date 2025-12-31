const reversed = (str: string): string => str.split('').reverse().join('');
console.log(reversed('hello')); // "olleh"
const reversed = (str: string): string => [...str].reverse().join('');
// or
const reversed = (str: string): string => Array.from(str).reverse().join('');

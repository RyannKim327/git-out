function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

console.log(reverseString('hello')); // "olleh"
function reverseStringManual(str: string): string {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

console.log(reverseStringManual('world')); // "dlrow"
console.assert(reverseString('abc') === 'cba');
console.assert(reverseStringManual('abc') === 'cba');

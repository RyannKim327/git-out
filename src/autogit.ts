function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

console.log(reverseString('hello')); // "olleh"
function reverseStringManual(str: string): string {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

console.log(reverseStringManual('TypeScript')); // "tpircSpeyT"

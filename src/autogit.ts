const reversed = (str: string): string =>
  [...str].reverse().join('');

// usage
console.log(reversed('hello')); // "olleh"

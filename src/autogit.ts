const reversed = (str: string): string => [...str].reverse().join('');
console.log(reversed('hello')); // "olleh"
console.log(reversed('🙂😀🙃')); // "🙃😀🙂"
const reversed = (s: string) => s.split('').reverse().join('');

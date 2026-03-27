const text = 'The quick brown fox';

const containsFox = text.includes('fox');     // true
const containsDog = text.includes('dog');     // false

console.log(`fox? ${containsFox}, dog? ${containsDog}`);
const idx = text.indexOf('brown');   // 10
const missing = text.indexOf('cat'); // -1

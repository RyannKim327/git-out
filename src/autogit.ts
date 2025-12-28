const text = 'hello world';
const needle = 'world';

if (text.includes(needle)) {
  console.log('found');
}
if (text.indexOf(needle) !== -1) {
  console.log('found');
}
const found = /world/i.test(text);   // i = ignore case

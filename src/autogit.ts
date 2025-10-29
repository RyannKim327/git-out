const str = 'The quick brown fox';
const needle = 'brown';

if (str.includes(needle)) {
  console.log('Found!');
}
if (str.indexOf(needle) !== -1) {
  console.log('Found!');
}
const regex = /brown/i;   // the i flag makes it case-insensitive
if (regex.test(str)) {
  console.log('Found!');
}

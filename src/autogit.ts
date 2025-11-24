const str = 'hello world';
if (str.includes('world')) {
  console.log('found');
}
if (str.indexOf('world') !== -1) {
  console.log('found');
}
if (/world/i.test(str)) {
  console.log('found');
}

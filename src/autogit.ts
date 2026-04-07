const original = "Hello, World!";
const lower = original.toLowerCase();   // "hello, world!"
const turkish = "İSTANBUL";            // note the dotted capital İ
const lowerTurkish = turkish.toLowerCase('tr-TR'); // "istanbul"
function toLowerSafe(s?: string) {
  return s?.toLowerCase() ?? "";
}

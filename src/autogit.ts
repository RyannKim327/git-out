const str = "123";
const num = parseInt(str, 10); // Always include the radix (10 for decimal)
console.log(num); // 123 (number)
const str = "456";
const num = Number(str);
console.log(num); // 456 (number)
const str = "789";
const num = +str;
console.log(num); // 789 (number)

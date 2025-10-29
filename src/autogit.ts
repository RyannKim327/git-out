let str: string = "42";
let num: number = parseInt(str, 10); // 10 is for base-10
console.log(num); // 42
let str: string = "42";
let num: number = Number(str);
console.log(num); // 42
let str: string = "42";
let num: number = +str;
console.log(num); // 42
let str: string = "42.9";
let num: number = Math.floor(Number(str)); // or Math.round, Math.trunc
console.log(num); // 42

const numbers = [4, 8, 15, 16, 23, 42];
const sum = numbers.reduce((total, number) => total + number, 0);
const max = Math.max(...numbers);
const greater_than_10 = numbers.filter(number => number > 10);
console.log("Сумма:", sum);
console.log("Максимальное число:", max);
console.log("Числа больше 10:", greater_than_10);
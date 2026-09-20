const numbers = [4, 8, 15, 16, 23, 42];
let sum = 0;
let max = numbers[0];
let greater_than_10 = [];
for (let i = 0; i < numbers.length; i++) {
    sum = sum + numbers[i];
    if (numbers[i] > max) {
        max = numbers[i];
    }
    if (numbers[i] > 10) {
        greater_than_10.push(numbers[i]);
    }
}
console.log("Сумма:", sum);
console.log("Максимальное число:", max);
console.log("Числа больше 10:", greater_than_10);


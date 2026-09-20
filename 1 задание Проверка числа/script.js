
let number = Number(prompt("Введите число:"));
checkNumber(number);

function checkNumber(number) {
    if (number > 0) {
        console.log("Число положительное");
    } else if (number < 0) {
        console.log("Число отрицательное");
    } else {
        console.log("Число равно нулю");
    }

    if (number % 2 === 0) {
        console.log("Число чётное");
    } else {
        console.log("Число нечётное");
    }
}

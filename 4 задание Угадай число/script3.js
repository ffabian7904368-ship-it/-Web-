const user_number = Number(prompt("Введите число от 1 до 10:"));
const secret_number = Math.floor(Math.random() * 10) + 1;
guess_number(user_number, secret_number);
function guess_number(user_number, secret_number) {
    if (user_number === secret_number) {
        console.log("Угадал");
    } else if (user_number < secret_number) {
        console.log("Загаданное число больше");
    } else {
        console.log("Загаданное число меньше");
    }
}

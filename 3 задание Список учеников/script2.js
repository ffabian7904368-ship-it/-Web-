const students = [
    { name: "Иван", grade: 3 },
    { name: "Петр", grade: 2 },
    { name: "Василий", grade: 4 },
    { name: "Анастасия", grade: 5 },
    { name: "Наталья", grade: 4 }
];
const min_grade = 3;
let sum = 0;
console.log("Ученики с оценкой выше", min_grade, ":");
for (let i = 0; i < students.length; i++) {
    if (students[i].grade > min_grade) {
        console.log(students[i].name);
    }
    sum += students[i].grade;
}
const average = sum / students.length;  
console.log("Средняя оценка:", average);